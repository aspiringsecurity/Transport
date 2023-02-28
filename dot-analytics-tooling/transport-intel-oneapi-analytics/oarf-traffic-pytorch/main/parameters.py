import torch

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

class LayerParams:
    """
    Class which helps in creation of Parameters
    """
    def __init__(self, rnn_network: torch.nn.Module, layer_type: str):
        """
        __init__ method which gets executed upon initialization of the class
        @param rnn_network: RNN Cell / Network that is used to produce the hidden state
        @param layer_type: type of layer such as 'fc' for fullyconnected or 'gconv' for graph convolution
        """
        self._rnn_network = rnn_network
        self._params_dict = {}
        self._biases_dict = {}
        self._type = layer_type

    def get_weights(self, shape):
        """
        Obtain the weights using Neural Network Parameters with Gradients
        @param shape:
        @return:
        """
        if shape not in self._params_dict:
            nn_param = torch.nn.Parameter(torch.empty(*shape, device=device))
            torch.nn.init.xavier_normal_(nn_param)
            self._params_dict[shape] = nn_param
            # register neural network parameter - weights
            self._rnn_network.register_parameter('{}_weight_{}'.format(self._type, str(shape)),
                                                 nn_param)
        return self._params_dict[shape]

    def get_biases(self, length, bias_start=0.0):
        """
        Obtain the biases using Neural Network Parameters with Biases
        @param length:
        @param bias_start:
        @return:
        """
        if length not in self._biases_dict:
            biases = torch.nn.Parameter(torch.empty(length, device=device))
            torch.nn.init.constant_(biases, bias_start)
            self._biases_dict[length] = biases
            # register neural network parameter - biases
            self._rnn_network.register_parameter('{}_biases_{}'.format(self._type, str(length)),
                                                 biases)

        return self._biases_dict[length]