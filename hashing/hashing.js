"use strict";

var crypto = require("crypto");

// The Power of a Smile
// by Tupac Shakur
var poem = [
	"The power of a gun can kill",
	"and the power of fire can burn",
	"the power of wind can chill",
	"and the power of a mind can learn",
	"the power of anger can rage",
	"inside until it tears u apart",
	"but the power of a smile",
	"especially yours can heal a frozen heart",
];

var Blockchain = {
	blocks: [],
};

// Genesis block
Blockchain.blocks.push({
	index: 0,
	hash: "000000",
	data: "",
	timestamp: Date.now(),
});

for (let line of poem) {
	Blockchain.blocks.push(createBlock(line))
}

console.log(`Blockchain is valid: ${verifyChain(Blockchain)}`);

function createBlock(text) {
	const bl = {
		index: Blockchain.blocks.length,
		prevHash: getLast().hash,
		data: text,
		timestamp: Date.now()
	};
	bl.hash = blockHash(bl);
	return bl;
}

function verifyChain(blockchain) {
	return blockchain.blocks.every(verifyBlock);
}

function getLast() {
	return Blockchain.blocks[Blockchain.blocks.length - 1];
}

function verifyBlock(bl) {
	if (bl.index === 0 && bl.data === '' && bl.hash === '000000') {
		return true;
	}
	
	return bl.index > 0 && 
		Boolean(bl.data) &&
		bl.hash === blockHash(bl) && 
		bl.prevHash === getPrevious(bl).hash
}

function getPrevious(bl) {
	return Blockchain.blocks[bl.index - 1];
}

function blockHash(bl) {
	return crypto.createHash("sha256").update(
		`${bl.index} ${bl.prevHash} ${bl.data} ${bl.timestamp}`
	).digest("hex");
}


