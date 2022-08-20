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

const root = '0xe2de7e936cd2e3b398a5b5b89726a8d72148b93050d271cf91ffec3cc5598577';

const elements = [
  'zkpenguin',
  'zkpancake',
  'zkpolice',
  'zkpig',
  'zkplayground',
  'zkpigeon',
  'zkpoison'
];

const groups = perm(elements);

let target;

for (const nodes of groups) {
  const leaves = nodes.map((node) => ethers.utils.id(node));
  const tree = new window.MerkleTree(leaves, ethers.utils.keccak256, { sortPairs: true });
  if (tree.getHexRoot() === root) {
    target = tree;
    break;
  }
}

const leave = ethers.utils.id('zkplayground');

const proof = target.getHexProof(leave);

console.log(target.toString());

console.log(proof);

document.getElementById('resolveProblem4').onclick = async () => {
  const res = await contract.merkleProof(proof);
  console.log(res);
};

function perm(list) {
  var pls = [];
  if (list.length == 0) {
    pls.push([]);
  } else {
    allRotated(list).forEach(function (lt) {
      perm(lt.slice(1, lt.length)).forEach(function (tailPl) {
        var pl = [];
        pl.push(lt[0]);
        pls.push(pl.concat(tailPl));
      });
    });
  }
  return pls;
}

function allRotated(list) {
  function rotatedTo(i) {
    var rotated = [];
    rotated.push(list[i]);
    return rotated
      .concat(list.slice(0, i))
      .concat(list.slice(i + 1, list.length));
  }
  var all = [];
  for (var i = 0; i < list.length; i++) {
    all.push(rotatedTo(i));
  }
  return all;
}
