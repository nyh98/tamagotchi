import { Schema, Types, model } from 'mongoose';

interface IFood {
  _id: Types.ObjectId;
  name: string;
  decreaseHungerLv: number;
  img: string;
}

const foodSchema = new Schema<IFood>({
  name: { type: String, required: true },
  decreaseHungerLv: { type: Number, required: true },
  img: { type: String, required: true },
});
export const Food = model<IFood>('Food', foodSchema);
