const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');

// Define the network
// Bitcoin - main network - mainnet
// Testnet - test network - testnet

const network = bitcoin.networks.testnet;

// Wallets derivations - HD
const path = `m/49'/1'/0'/0`;

// Create a mnemonic for seed
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// Create a master wallet`s node
let root = bip32.fromSeed(seed, network);

// Create a account - Pair Private Key and Public Key
let account = root.derivePath(path);
let node = account.derive(0).derive(0)

// Generate the address
let address = bitcoin.payments.p2pkh({ pubkey: node.publicKey, network }).address;

console.log("Generated Wallet")
console.log("Address: " + address)
console.log("Private Key: " + node.toWIF())
console.log("Public Key: " + node.publicKey)
console.log("Seed: " + mnemonic)