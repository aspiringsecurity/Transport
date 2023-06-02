import torch
from copy import copy

device = torch.device("cpu" if not torch.cuda.is_available() else "cuda:0")

class DCRNNSuperVisorMeta(type):
    """
    The supervisor meta class for DCRNNSupervisor Class
    """
    def __new__(self, class_name, bases, attrs):
        """
        The method which is called when a new class is created
        @param class_name: the class name
        @param bases: the base classes
        @param attrs: the class or instance attributes
        @return:
        """

        def fedavg(self):
            """
            The Fed Averaging Algorithm
            @return:
            """
            args = self.args
            assert args.setting == 'fedavg'
            self._logger.info('Fedavg now' + (' using SPDZ' if args.spdz else ''))
            model1, model2 = self.dcrnn_model, self.dcrnn_model2
            len1 = self._data['train_loader'].size
            len2 = self._data2['train_loader'].size
            len_total = len1 + len2
            if args.spdz:
                ratio_total = 10000
                ratio1 = round(ratio_total * len1 / len_total)  # integer share used by SPDZ
                ratio2 = round(ratio_total * len2 / len_total)
                new_params = list()
                params = [list(model1.parameters()), list(model2.parameters())]
                for param_i in range(len(params[0])):
                    spdz_params = list()
                    spdz_params.append(params[0][param_i].copy().cpu().fix_precision().share(*self.party_workers,
                                                                                             crypto_provider=self.crypto))
                    spdz_params.append(params[1][param_i].copy().cpu().fix_precision().share(*self.party_workers,
                                                                                             crypto_provider=self.crypto))
                    new_param = (spdz_params[0] * ratio1 + spdz_params[1] * ratio2).get().float_precision() / ratio_total
                    new_params.append(new_param)

                with torch.no_grad():
                    for model_params in params:
                        for param in model_params:
                            param *= 0

                    for param_index in range(len(params[0])):
                        if str(device) == 'cpu':
                            for model_params in params:
                                model_params[param_index].copy_(new_params[param_index])
                        else:
                            for model_params in params:
                                model_params[param_index].copy_(new_params[param_index].cuda())
            else:
                with torch.no_grad():
                    for p1, p2 in zip(model1.parameters(), model2.parameters()):
                        data = (p1.data * len1 + p2.data * len2) / len_total
                        p1.copy_(data)
                        p2.copy_(data)

        attributes = copy(attrs)
        attributes['fedavg'] = fedavg

        return type(class_name, bases, attributes)
