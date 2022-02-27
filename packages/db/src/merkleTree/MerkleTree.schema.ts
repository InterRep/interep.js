import { Schema } from "mongoose"
import {
    findByGroupAndLevelAndIndex,
    findByGroupAndHash,
    getNumberOfActiveLeaves,
    getNumberOfNodes,
    findByGroupProviderAndHash,
    getGroupNamesByProvider
} from "./MerkleTree.statics"
import type {
    MerkleTreeNodeData,
    MerkleTreeNodeDocument,
    MerkleTreeNodeModel,
    MerkleTreeZeroData,
    MerkleTreeZeroModel,
    MerkleTreeZeroDocument,
    MerkleTreeRootBatchData,
    MerkleTreeRootBatchDocument,
    MerkleTreeRootBatchModel
} from "./MerkleTree.types"

const MerkleTreeNodeSchemaFields: Record<keyof MerkleTreeNodeData, any> = {
    group: {
        name: String,
        provider: String
    },
    level: Number,
    index: Number,
    parent: {
        type: Schema.Types.ObjectId,
        required: false,
        ref: "MerkleTreeNode"
    },
    siblingHash: String,
    hash: String
}

export const MerkleTreeNodeSchema = new Schema<MerkleTreeNodeDocument, MerkleTreeNodeModel>(MerkleTreeNodeSchemaFields)

MerkleTreeNodeSchema.statics.findByGroupAndLevelAndIndex = findByGroupAndLevelAndIndex
MerkleTreeNodeSchema.statics.findByGroupAndHash = findByGroupAndHash
MerkleTreeNodeSchema.statics.findByGroupProviderAndHash = findByGroupProviderAndHash
MerkleTreeNodeSchema.statics.getGroupNamesByProvider = getGroupNamesByProvider
MerkleTreeNodeSchema.statics.getNumberOfActiveLeaves = getNumberOfActiveLeaves
MerkleTreeNodeSchema.statics.getNumberOfNodes = getNumberOfNodes

export const MerkleTreeZeroSchemaFields: Record<keyof MerkleTreeZeroData, any> = {
    level: { type: Number, unique: true },
    hash: String
}

export const MerkleTreeZeroSchema = new Schema<MerkleTreeZeroDocument, MerkleTreeZeroModel>(MerkleTreeZeroSchemaFields)

const MerkleTreeRootBatchSchemaFields: Record<keyof MerkleTreeRootBatchData, any> = {
    group: {
        type: {
            name: { type: String, required: true },
            provider: { type: String, required: true }
        },
        required: true
    },
    roots: { type: [String], default: [] },
    transaction: {
        hash: String,
        blockNumber: Number
    }
}

export const MerkleTreeRootBatchSchema = new Schema<MerkleTreeRootBatchDocument, MerkleTreeRootBatchModel>(
    MerkleTreeRootBatchSchemaFields
)
