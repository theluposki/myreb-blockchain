import elliptic from "elliptic"
import { randomUUID, createHash } from "node:crypto"
import { existsSync, readFileSync, writeFileSync } from "node:fs"
import { GENESIS } from "./blockchain/block.js"

const ec = new elliptic.ec("secp256k1")

export const Util = {
    genKeyPair() {
        return ec.genKeyPair()
    },

    genId() {
        return randomUUID()
    },

    genHash(data) {
        return createHash('sha256').update(JSON.stringify(data)).digest('hex')
    },

    verifySignature(publickey, signature, dataHash) {
        return ec.keyFromPublic(publickey, 'hex').verify(dataHash, signature)
    },

    readFile() {
      const file = "src/blockchain/chain.json"
      
      if(!existsSync(file)) {
        writeFileSync(file, JSON.stringify([GENESIS()]),null, 4)

        console.log("akiiiiiiiiiiiiii")

        const data = readFileSync(file, "utf-8")

        return JSON.parse(data)
      }
      
      const data = readFileSync(file, "utf-8")

      return JSON.parse(data)
    },

    writeFile(chain) {
      const result = writeFileSync("src/blockchain/chain.json", JSON.stringify(chain, null, 4), { encoding: "utf8", flag: "w+" })

     return result
    }
}
