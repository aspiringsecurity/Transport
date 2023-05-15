import {
  typesBundle as bifrostTypesBundle,
  types as bifrostTypes,
  typesAlias as bifrostTypeAlias,
  rpc as bifrostRpc,
  signedExtensions as bifrostSignedExtensions
} from '@bifrost-finance/type-definitions';
import {
  OverrideBundleType,
  OverrideModuleType,
  RegistryTypes,
  DefinitionRpc,
  DefinitionRpcSub
} from '@polkadot/types/types';

import './interfaces/augment-api-consts';
import './interfaces/augment-api-query';
import './interfaces/augment-api-rpc';
import './interfaces/augment-api-tx';
import './interfaces/augment-types';

export const types: RegistryTypes = bifrostTypes;

export const rpc: Record<string, Record<string, DefinitionRpc | DefinitionRpcSub>> = bifrostRpc;

export const typesAlias: Record<string, OverrideModuleType> = bifrostTypeAlias;

export const typesBundle = bifrostTypesBundle as unknown as OverrideBundleType;

export const signedExtensions = bifrostSignedExtensions;
