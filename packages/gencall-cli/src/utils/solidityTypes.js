'use strict';

const { isAddress } = require('@ethersproject/address');
const { BigNumber } = require('@ethersproject/bignumber');

/* ============ BEGIN: NOT EXPORTED BY @ethersproject/bignumber ============ */
const { isBytes, isHexString } = require('@ethersproject/bytes');
function isBigNumberish(value) {
  return (
    value != null &&
    (BigNumber.isBigNumber(value) ||
      (typeof value === 'number' && value % 1 === 0) ||
      (typeof value === 'string' && !!value.match(/^-?[0-9]+$/)) ||
      isHexString(value) ||
      typeof value === 'bigint' ||
      isBytes(value))
  );
}
/* ============ END: NOT EXPORTED BY @ethersproject/bignumber ============ */

module.exports = {
  int8: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**7),   max: 2**7   - 1 */,
  },
  int16: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**15),  max: 2**15  - 1 */,
  },
  int24: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**23),  max: 2**23  - 1 */,
  },
  int32: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**31),  max: 2**31  - 1 */,
  },
  int40: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**39),  max: 2**39  - 1 */,
  },
  int48: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**47),  max: 2**47  - 1 */,
  },
  int56: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**55),  max: 2**55  - 1 */,
  },
  int64: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**63),  max: 2**63  - 1 */,
  },
  int72: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**71),  max: 2**71  - 1 */,
  },
  int80: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**79),  max: 2**79  - 1 */,
  },
  int88: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**87),  max: 2**87  - 1 */,
  },
  int96: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**95),  max: 2**95  - 1 */,
  },
  int104: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**103), max: 2**103 - 1 */,
  },
  int112: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**111), max: 2**111 - 1 */,
  },
  int120: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**119), max: 2**119 - 1 */,
  },
  int128: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**127), max: 2**127 - 1 */,
  },
  int136: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**135), max: 2**135 - 1 */,
  },
  int144: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**143), max: 2**143 - 1 */,
  },
  int152: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**151), max: 2**151 - 1 */,
  },
  int160: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**159), max: 2**159 - 1 */,
  },
  int168: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**167), max: 2**167 - 1 */,
  },
  int176: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**175), max: 2**175 - 1 */,
  },
  int184: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**183), max: 2**183 - 1 */,
  },
  int192: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**191), max: 2**191 - 1 */,
  },
  int200: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**199), max: 2**199 - 1 */,
  },
  int208: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**207), max: 2**207 - 1 */,
  },
  int216: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**215), max: 2**215 - 1 */,
  },
  int224: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**223), max: 2**223 - 1 */,
  },
  int232: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**231), max: 2**231 - 1 */,
  },
  int240: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**239), max: 2**239 - 1 */,
  },
  int248: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**247), max: 2**247 - 1 */,
  },
  int256: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: -(2**255), max: 2**255 - 1 */,
  },
  uint8: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**8   - 1 */,
  },
  uint16: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**16  - 1 */,
  },
  uint24: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**24  - 1 */,
  },
  uint32: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**32  - 1 */,
  },
  uint40: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**40  - 1 */,
  },
  uint48: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**48  - 1 */,
  },
  uint56: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**56  - 1 */,
  },
  uint64: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**64  - 1 */,
  },
  uint72: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**72  - 1 */,
  },
  uint80: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**80  - 1 */,
  },
  uint88: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**88  - 1 */,
  },
  uint96: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**96  - 1 */,
  },
  uint104: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**104 - 1 */,
  },
  uint112: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**112 - 1 */,
  },
  uint120: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**120 - 1 */,
  },
  uint128: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**128 - 1 */,
  },
  uint136: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**136 - 1 */,
  },
  uint144: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**144 - 1 */,
  },
  uint152: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**152 - 1 */,
  },
  uint160: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**160 - 1 */,
  },
  uint168: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**168 - 1 */,
  },
  uint176: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**176 - 1 */,
  },
  uint184: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**184 - 1 */,
  },
  uint192: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**192 - 1 */,
  },
  uint200: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**200 - 1 */,
  },
  uint208: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**208 - 1 */,
  },
  uint216: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**216 - 1 */,
  },
  uint224: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**224 - 1 */,
  },
  uint232: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**232 - 1 */,
  },
  uint240: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**240 - 1 */,
  },
  uint248: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**248 - 1 */,
  },
  uint256: {
    type: 'text',
    validate: isBigNumberish,
    format: BigNumber.from /* min: 0,         max: 2**256 - 1 */,
  },
  bytes1: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{2}$/.exec(input),
  },
  bytes2: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{4}$/.exec(input),
  },
  bytes3: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{6}$/.exec(input),
  },
  bytes4: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{8}$/.exec(input),
  },
  bytes5: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{10}$/.exec(input),
  },
  bytes6: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{12}$/.exec(input),
  },
  bytes7: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{14}$/.exec(input),
  },
  bytes8: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{16}$/.exec(input),
  },
  bytes9: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{18}$/.exec(input),
  },
  bytes10: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{20}$/.exec(input),
  },
  bytes11: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{22}$/.exec(input),
  },
  bytes12: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{24}$/.exec(input),
  },
  bytes13: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{26}$/.exec(input),
  },
  bytes14: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{28}$/.exec(input),
  },
  bytes15: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{30}$/.exec(input),
  },
  bytes16: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{32}$/.exec(input),
  },
  bytes17: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{34}$/.exec(input),
  },
  bytes18: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{36}$/.exec(input),
  },
  bytes19: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{38}$/.exec(input),
  },
  bytes20: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{40}$/.exec(input),
  },
  bytes21: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{42}$/.exec(input),
  },
  bytes22: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{44}$/.exec(input),
  },
  bytes23: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{46}$/.exec(input),
  },
  bytes24: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{48}$/.exec(input),
  },
  bytes25: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{50}$/.exec(input),
  },
  bytes26: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{52}$/.exec(input),
  },
  bytes27: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{54}$/.exec(input),
  },
  bytes28: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{56}$/.exec(input),
  },
  bytes29: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{58}$/.exec(input),
  },
  bytes30: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{60}$/.exec(input),
  },
  bytes31: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{62}$/.exec(input),
  },
  bytes32: {
    type: 'text',
    validate: (input) => !!/^0x[0-9a-z]{64}$/.exec(input),
  },
  bytes: {
    type: 'text',
    validate: (input) => !!/^0x([0-9a-z]{2})*$/.exec(input),
  },
  address: { type: 'text', validate: isAddress },
  string: { type: 'text' },
};
