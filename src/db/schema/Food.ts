import mongoose, { ObjectId, Schema, Types, model } from 'mongoose';

interface IFood {
  _id: ObjectId;
  name: string;
  decreaseHungerLv: number;
  img: string;
}

const foodSchema = new Schema<IFood>();
export const Food = model<IFood>('Food', foodSchema);
