import { ethers } from 'ethers';

const provider = new ethers.providers.Web3Provider(window.ethereum);

await provider.send('eth_requestAccounts', []);

const signer = provider.getSigner();

const address = '0x847FB490b9255758738c1DBddD9E3049E9bC86c8';

const abi = [
  'function claim(uint256 _amountInFinney) public payable',
  'function merkleProof(bytes32[] memory proof) public',
];

const contract = new ethers.Contract(address, abi, signer);

document.getElementById('resolveProblem3').onclick = async () => {
  const res = await contract.claim(1);
  console.log(res);
}

const nodes = [
  'zkplayground',
  'zkpenguin',
  'zkpancake',
  'zkpolice',
  'zkpig',
  'zkpigeon',
  'zkpoison',
];

const leaves = nodes.map((ids) => ethers.utils.id(ids));

const tree = new window.MerkleTree(leaves, ethers.utils.keccak256, {
  sortPairs: true,
});

console.log(tree.toString());

const proof = tree.getHexProof(ethers.utils.id('zkplayground'));

document.getElementById('resolveProblem4').onclick = async () => {
  const res = await contract.merkleProof(proof);
  console.log(res);
};
