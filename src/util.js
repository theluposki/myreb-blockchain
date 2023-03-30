import elliptic from "elliptic"
import { randomUUID, createHash } from "node:crypto"

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
    }
}