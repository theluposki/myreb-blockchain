import { DIFFICULTY, MINE_RATE } from "../config.js"
import { Util } from "../util.js"

export const GENESIS = () => {
  return Block({
    timestamp: Date.now(),
    lastHash: "0000",
    hash: "0000",
    data: { name: "Lucas"},
    nonce: 0,
    difficulty: DIFFICULTY
  })
}

const Block = ({ timestamp, lastHash, hash, data, nonce, difficulty }) => {
  return {
    timestamp,
    lastHash,
    hash,
    data: JSON.stringify(data),
    nonce,
    difficulty: difficulty || DIFFICULTY
  }
}


const adjustDifficulty = (lastBlock, currentTime) => {
  let { difficulty } = lastBlock;

  difficulty = lastBlock.timestamp + MINE_RATE > currentTime
      ? difficulty + 1
      : difficulty - 1;
      
  return difficulty;
}



const genHash = (timestamp, lastHash, data, nonce, difficulty) =>  {
  const str = `${timestamp}${lastHash}${data}${nonce}${difficulty}`;
  return Util.genHash(str);
}

export const blockHash = (block) => {
  const { timestamp, lastHash, data, nonce, difficulty } = block;

  return Block.hash(timestamp, lastHash, data, nonce, difficulty);
}


export const mineBlock = (lastBlock, data) => {
  let hash, timestamp;

  const lastHash = lastBlock.hash;

  let { difficulty } = lastBlock;

  console.log(difficulty)

  let nonce = 0;

  do {
    nonce++;
    timestamp = Date.now();
    difficulty = adjustDifficulty(lastBlock, timestamp);
    hash = genHash(timestamp, lastHash, data, difficulty);
    console.log(hash)
  } while (hash.substring(0, difficulty) !== "0".repeat(difficulty));

  return Block({ timestamp, lastHash, hash, data, nonce, difficulty });
}


