import { ObjectId, Schema, model } from 'mongoose';

interface IPet {
  _id: ObjectId;
  imgs: Array<string>;
  name: string;
}

const petSchema = new Schema<IPet>({ imgs: [{ type: String }], name: { type: String, required: true } });

export const Pet = model<IPet>('Pet', petSchema);
