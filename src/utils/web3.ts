/**
* @file Web3
* @summary Sign Message / Get Block Number
*/
import { bufferToHex } from 'ethereumjs-util';

/**
* @exports signMessage
* @param [web3, msg, address]
* @returns {personal_sign', [msg, address]}
*/

export async function signMessage(web3, msg, address) {
  msg = bufferToHex(new Buffer(msg, 'utf8'));
  return await web3.send('personal_sign', [msg, address]);
}

/** 
* @exports getBlockNumber 
* @const blockNumber
*/
export async function getBlockNumber(provider) {
  try {
    const blockNumber: any = await provider.getBlockNumber();
    /** @type {number} */
    return parseInt(blockNumber);
  } catch (e) {
    return Promise.reject();
  }
}
