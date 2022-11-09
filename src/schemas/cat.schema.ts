import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema } from 'mongoose';

// export type CatDocument = Cat & Document;

// @Schema()
// export class Cat {
//   @Prop()
//   name: string;

//   @Prop()
//   age: number;

//   @Prop()
//   breed: string;
// }

// export const CatSchema = SchemaFactory.createForClass(Cat);

export const CatSchema = new Schema({
    name: String,
    age: Number,
    breed: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
});
