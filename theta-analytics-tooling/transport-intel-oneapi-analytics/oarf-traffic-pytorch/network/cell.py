import torch
from utils import utils
from main.parameters import LayerParams
from main.graphs import GatedReccurentUnitMeta

class Seq2SeqAttrs:
    """
    Parent class for EncoderModel and DecoderModel
    """
    def __init__(self, adj_mx, **model_kwargs):
        """
        Initialization function for Seq2SeqAttrs
        @param adj_mx: the adjacency matrix
        @param model_kwargs:
        """
        self.adj_mx = adj_mx
        self.max_diffusion_step = int(model_kwargs.get('max_diffusion_step', 2))
        self.cl_decay_steps = int(model_kwargs.get('cl_decay_steps', 1000))
        self.filter_type = model_kwargs.get('filter_type', 'laplacian')
        self.num_nodes = int(model_kwargs.get('num_nodes', 1))
        self.num_rnn_layers = int(model_kwargs.get('num_rnn_layers', 1))
        self.rnn_units = int(model_kwargs.get('rnn_units'))
        self.hidden_state_size = self.num_nodes * self.rnn_units

class DCGRUCell(torch.nn.Module, metaclass=GatedReccurentUnitMeta):
    """
    The DC Gated Recurrent Unit RNN Cell as a PyTorch Module with MetaClass = GatedReccurentUnitMeta
    """
    def __init__(self, num_units, adj_mx, max_diffusion_step, num_nodes, nonlinearity='tanh',
                 filter_type="laplacian", use_gc_for_ru=True):
        """

        :param num_units: Number of Hidden state units
        :param adj_mx: the adjacent matrix
        :param max_diffusion_step: diffusion value for the diffusion step
        :param num_nodes: Number of nodes
        :param nonlinearity: the activation function for producing nonlinearity
        :param filter_type: "laplacian", "random_walk", "dual_random_walk".
        :param use_gc_for_ru: whether to use Graph convolution to calculate the reset and update gates.
        """

        super().__init__()
        self._activation = torch.tanh if nonlinearity == 'tanh' else torch.relu
        # support other nonlinearities up here?
        self._num_nodes = num_nodes
        self._num_units = num_units
        self._max_diffusion_step = max_diffusion_step
        self._supports = []
        self._use_gc_for_ru = use_gc_for_ru
        supports = []
        if filter_type == "laplacian":
            supports.append(utils.calculate_scaled_laplacian(adj_mx, lambda_max=None))
        elif filter_type == "random_walk":
            supports.append(utils.calculate_random_walk_matrix(adj_mx).T)
        elif filter_type == "dual_random_walk":
            supports.append(utils.calculate_random_walk_matrix(adj_mx).T)
            supports.append(utils.calculate_random_walk_matrix(adj_mx.T).T)
        else:
            supports.append(utils.calculate_scaled_laplacian(adj_mx))
        for support in supports:
            self._supports.append(self._build_sparse_matrix(support))

        self._fc_params = LayerParams(self, 'fc')
        self._gconv_params = LayerParams(self, 'gconv')

    def forward(self, inputs, hx):
        """
        Gated recurrent unit (GRU) with Graph Convolution.
        :param inputs: (B, num_nodes * input_dim)
        :param hx: (B, num_nodes * rnn_units)

        :return
        - Output: A `2-D` tensor with shape `(B, num_nodes * rnn_units)`.
        """

        output_size = 2 * self._num_units
        if self._use_gc_for_ru:
            fn = self.graph_convolution
        else:
            fn = self.fully_connected
        value = torch.sigmoid(fn(inputs, hx, output_size, bias_start=1.0))
        value = torch.reshape(value, (-1, self._num_nodes, output_size))
        r, u = torch.split(tensor=value, split_size_or_sections=self._num_units, dim=-1)
        r = torch.reshape(r, (-1, self._num_nodes * self._num_units))
        u = torch.reshape(u, (-1, self._num_nodes * self._num_units))

        c = self.graph_convolution(inputs, r * hx, self._num_units)
        if self._activation is not None:
            c = self._activation(c)

        new_state = u * hx + (1.0 - u) * c

        return new_state