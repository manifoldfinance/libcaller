/**
* @file MulitCaller
* @summary MulitCaller enables atomic JSON-RPC requests for EVM chains
* 
*/

import { JsonRpcProvider } from '@ethersproject/providers';
import set from 'lodash.set';
import { multicall } from '../utils';

/**
* @class Multicaller
* @param {string} network
*/

export default class Multicaller {
  public network: string;
  public provider: JsonRpcProvider;
  public abi: any[];
  public options: any = {};
  public calls: any[] = [];
  public paths: any[] = [];
 
/**
* Multicaller Constructor
* @constructor
* @param {string} network - the blockchain network
* @param JsonRpcProvider - JSON RPC Provider
* @param {object} abi - ABI artifact 
*/
  constructor(
    network: string,
    provider: JsonRpcProvider,
    abi: any[],
    options?
  ) {
    this.network = network;
    this.provider = provider;
    this.abi = abi;
    this.options = options || {};
  }

  call(path, address, fn, params?): Multicaller {
    this.calls.push([address, fn, params]);
    this.paths.push(path);
    return this;
  }

  async execute(from?: any): Promise<any> {
    const obj = from || {};
    const result = await multicall(
      this.network,
      this.provider,
      this.abi,
      this.calls,
      this.options
    );
    this.paths.forEach((path, i) => set(obj, path, result[i][0]));
    this.calls = [];
    this.paths = [];
    return obj;
  }
}
