#!/bin/bash

node src/index.js \
	--artefact 'example/TimelockController.json' \
	--selector 'grantRole(bytes32,address)' \
	--args     '["0x0000000000000000000000000000000000000000000000000000000000000000","0x0000000000000000000000000000000000000000"]' \
	--execute  1 \
	--provider 'http://localhost:8545' \
	--address  '0x0000000000000000000000000000000000000000' \
	--confirm  1
