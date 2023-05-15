// Copyright 2021 @bifrost-finance/api authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import {
  rpc as bifrostRpc,
  signedExtensions as bifrostSignedExtensions,
  types as bifrostTypes,
  typesAlias as bifrostTypeAlias,
  typesBundle as bifrostTypesBundle
} from '@bifrost-finance/types';
import { ApiOptions } from '@polkadot/api/types';

export const defaultOptions: ApiOptions = {
  types: bifrostTypes,
  rpc: bifrostRpc
};

export const options = ({
  rpc = {},
  types = {},
  typesBundle = {},
  typesAlias = {},
  signedExtensions,
  ...otherOptions
}: ApiOptions = {}): ApiOptions => ({
  rpc: {
    ...bifrostRpc,
    ...rpc
  },
  types: {
    ...bifrostTypes,
    ...types
  },
  typesAlias: {
    ...bifrostTypeAlias,
    ...typesAlias
  },
  typesBundle: {
    ...typesBundle,
    spec: {
      ...bifrostTypesBundle
    }
  },
  signedExtensions: {
    ...bifrostSignedExtensions,
    ...signedExtensions
  },
  ...otherOptions
});
