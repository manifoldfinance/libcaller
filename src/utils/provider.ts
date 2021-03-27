/**
* @file Provider
* @summary RPC Provider
*/

import { JsonRpcProvider } from '@ethersproject/providers';
import networks from '../networks.json';

/** @const providers */
const providers = {};

/**
* @exports getProvider
* @const url
* @type {string}
*/
export default function getProvider(network: string) {
  const url: string = networks[network].rpc[0];
  if (!providers[network]) providers[network] = new JsonRpcProvider(url);
  return providers[network];
}
