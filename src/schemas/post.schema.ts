import {Schema, Types} from 'mongoose';

interface Post {
    title: string;
    description: string;
    author: Types.ObjectId;
}

export const PostSchema = new Schema<Post>({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});

