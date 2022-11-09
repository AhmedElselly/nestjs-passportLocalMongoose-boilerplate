import { Types } from "mongoose";

export interface Post extends Document {
    title: string;
    description: string;
    author: Types.ObjectId;
}