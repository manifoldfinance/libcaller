'use strict';

const prompts       = require('prompts');
const solidityTypes = require('./solidityTypes.js');

async function asyncReduce(functors)
{
	return await functors.reduce(
		async (promise, functor) => {
			const acc = await promise;
			acc.push(await functor());
			return acc;
		},
		Promise.resolve([])
	);
}

async function getParamType(param, name = param.name || '')
{
	if (param.baseType == 'array') {
		const { count } = await prompts({ type: 'number', name: 'count', message: `Length of "${name}[]"`, initial: 0 });
		if (count == undefined) throw 'Error';
		return await asyncReduce(Array(count).fill().map((_,i) => () => getParamType(param.arrayChildren, `${name}[${i}]`)));
	} else if (param.baseType == 'tuple') {
		return await asyncReduce(param.components.map(component => () => getParamType(component, `${name}.${component.name}`)));
	} else {
		const { value } = await prompts({ ...solidityTypes[param.baseType], name: 'value', message: `${name} (${param.baseType})` });
		if (value == undefined) throw 'Error';
		return value;
	}
}

async function getFunctionArgs(fragment)
{
	return await asyncReduce(fragment.inputs.map(param => () => getParamType(param)));
}

module.exports = getFunctionArgs;
