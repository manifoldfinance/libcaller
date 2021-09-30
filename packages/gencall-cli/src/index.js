#!/usr/bin/env node

'use strict';

const fs = require('fs-extra');
const isUrl = require('is-url');
const prompts = require('prompts');
const yargs = require('yargs');
const { Interface } = require('@ethersproject/abi');
const { Signer } = require('@ethersproject/abstract-signer');
const { isAddress } = require('@ethersproject/address');
const { Contract } = require('@ethersproject/contracts');
const { LedgerSigner } = require('@ethersproject/hardware-wallets');
const { isValidName } = require('@ethersproject/hash');
const { isValidMnemonic, defaultPath } = require('@ethersproject/hdnode');
const {
  getDefaultProvider,
  JsonRpcProvider,
} = require('@ethersproject/providers');
const { Wallet } = require('@ethersproject/wallet');
const getFunctionArgs = require('./utils/getParams.js');
const formatResult = require('./utils/formatResult.js');

console.log('\x1b[36m%s\x1b[0m', '  gencall shell utility ');
yargs.version();
yargs.help();

(async () => {
  const argv = yargs.option('address', { string: true }).argv;
  prompts.override(argv);

  const { artifact } = await prompts({
    type: 'text',
    name: 'artifact',
    message: 'Path to artifact',
    validate: fs.existsSync,
    format: (path) => JSON.parse(fs.readFileSync(path)),
    initial: 'build/contracts/YourContractABI.json',
  });
  if (artifact == undefined) {
    throw 'Undefined Artifact, Terminating';
  }
  if (!artifact.abi) {
    throw 'Invalid artifact - not of type ABI';
  }
  /** @const abi */
  const abi = new Interface(artifact.abi);
  const { selector } = await prompts({
    type: 'select',
    name: 'selector',
    message: 'Select function',
    choices: Object.keys(abi.functions).map((value) => ({ value })),
  });
  if (abi.functions[selector] == undefined) {
    throw 'Function Object Abort';
  }

  const fragment = abi.functions[selector];
  const readonly = ['view', 'pure'].includes(fragment.stateMutability);
  const params =
    (argv.args && JSON.parse(argv.args)) || (await getFunctionArgs(fragment));

  const { execute } = await prompts({
    type: 'select',
    name: 'execute',
    message: 'When',
    choices: [
      { title: 'Execute now', value: true },
      { title: 'Encode for later', value: false },
    ],
  });
  if (execute == undefined) {
    throw 'Ejected out of Encoding!';
  }

  if (!execute) {
    const data = abi.encodeFunctionData(selector, params);
    console.log('Encoded Function Call:', data);
    return;
  }

  const { provider } = await prompts([
    {
      type: 'select',
      name: 'provider',
      message: 'Select chain',
      choices: [
        { value: 'mainnet' },
        { value: 'rinkeby' },
        { value: 'ropsten' },
        { value: 'goerli'  },
        { value: 'kovan'   },
        { value: 'http://localhost:8545' },
        { title: 'custom endpoint', value: null },
      ],
      format: (chain) =>
        typeof chain == 'string' ? getDefaultProvider(chain) : chain,
    },
    {
      type: (_, { provider }) => !provider && 'text',
      name: 'provider',
      message: 'Custom Env Endpoint',
      initial: process.env.RPC_ENDPOINT,
      validate: isUrl,
      format: (endpoint) => new JsonRpcProvider(endpoint),
    },
  ]);
  if (provider == undefined) {
    throw 'Aborted';
  }

  const { chainId } = await provider.getNetwork();
  const { address: defaultAddress } =
    (artifact.networks && artifact.networks[chainId]) || {};
  const { address } = await prompts([
    {
      type: defaultAddress && 'select',
      name: 'address',
      message: 'Select instance',
      choices: [
        { value: defaultAddress },
        { title: 'other instance', value: null },
      ],
    },
    {
      type: (_, { address }) => !address && 'text',
      name: 'address',
      message: 'Select instance',
      initial: 'ychad.eth',
      validate: (address) => isAddress(address) || isValidName(address),
    },
  ]);
  if (address == undefined) {
    throw 'Ejected';
  }

  const contract = new Contract(address, abi, provider);

  const { signer } = await prompts([
    {
      type: !readonly && 'select',
      name: 'signer',
      message: 'Select wallet',
      choices: [
        { title: 'Private key', value: 'wallet' },
        { title: 'Mnemonic', value: 'mnemonic' },
        {
          title: 'JsonRpc signer',
          value: 'jsonrpc',
          disabled: !(provider instanceof JsonRpcProvider),
        },
        { title: 'Ledger', value: 'ledger' },
      ],
    },
    {
      type: (_, { signer }) => signer == 'wallet' && 'text',
      name: 'signer',
      message: 'Private key',
      initial: process.env.MNEMONIC,
      validate: (pk) => /^0x[0-9a-z]{64}$/.exec(pk),
      format: (pk) => new Wallet(pk, provider),
    },
    {
      type: (_, { signer }) => signer == 'mnemonic' && 'text',
      name: 'mnemonic',
      message: 'Mnemonic',
      validate: isValidMnemonic,
    },
    {
      type: (_, { signer }) => signer == 'mnemonic' && 'text',
      name: 'signer',
      message: 'Path',
      initial: defaultPath,
      format: (path, { mnemonic }) =>
        Wallet.fromMnemonic(mnemonic, path).connect(provider),
    },
    {
      type: (_, { signer }) => signer == 'jsonrpc' && 'number',
      name: 'signer',
      message: 'Index',
      initial: 0,
      min: 0,
      format: (index) => provider.getSigner(index),
    },
    {
      type: (_, { signer }) => signer == 'ledger' && 'text',
      name: 'signer',
      message: 'Path',
      initial: defaultPath,
      format: (path) => new LedgerSigner(provider, 'hid', path),
    },
  ]);
  if (!readonly && !signer instanceof Signer) {
    throw 'Aborted';
  }
  const { confirm } = await prompts({
    type: !readonly && 'confirm',
    name: 'confirm',
    message: 'Confirm',
  });
  if (!readonly && !confirm) throw 'Aborted';

  switch (fragment.stateMutability) {
    case 'view':
    case 'pure':
      console.log({
        result: formatResult(await contract[selector](...params)),
      });
      break;
    case 'payable':
    // TODO, add value
    case 'nonpayable':
      const tx = await contract.connect(signer)[selector](...params);
      const receipt = await tx.wait();
      console.log({ receipt });
      break;
  }
})().catch(console.error);
/** @exports gencall */
