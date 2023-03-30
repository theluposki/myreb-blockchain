import { mineBlock, GENESIS, blockHash } from "./block.js";

let chain = [GENESIS()]

export const addBlock = (data) => {
  const lastBlock = chain[chain.length - 1]

  const block = mineBlock(lastBlock, data)

  chain.push(block)

  return block
}

const isValidChain = (chain) => {
  if(JSON.stringify(chain[0]) !== JSON.stringify(GENESIS())) return false

  for (let i=1; i< chain.length; i++) {
    const block = chain[i]
    const lastBlock = chain[i-1]

    if(block.lastHash !== lastBlock.hash || block.hash !== blockHash(block)) {
      return false
    }
  }

  return true
}

const replaceChain = (newChain) => {
  if(newChain.length <= chain.length) {
    console.log("O recebimento não é mais longo que a cadeia atual")
    return
  } else if(!isValidChain(newChain)){
    console.log("A cadeia recebida não é válida")
    return 
  }
  console.log("Substituindo o blockchain pela nova cadeia")
  chain = newChain
}
