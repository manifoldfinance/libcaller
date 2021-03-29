'use strict';

const { BigNumber } = require('@ethersproject/bignumber');

function formatResult(value) {
	if (BigNumber.isBigNumber(value)) {
		return value.toString();
	} else if (Array.isArray(value)) {
		return Object.keys(value).reduce((acc, key) => Object.assign(acc, { [key]: formatResult(value[key]) }), Array());
	} else {
		return value;
	}
}

module.exports = formatResult;
