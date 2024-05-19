import {
  DefaultSchemaOptions,
  HydratedArraySubdocument,
  HydratedDocument,
  Model,
  ObjectId,
  Schema,
  Types,
  model,
} from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  password: string;
  pets: Array<{
    petId: ObjectId;
    phase: number;
    hungy: number;
    bored: number;
    nextLvTime: Date | null;
    stoolCount: number;
    isAlive: boolean;
  }>;
  foods: Array<{ foodId: ObjectId; count: number }>;
  lastRequest: Date;
}

type UserHydratedDocument = HydratedDocument<
  IUser,
  {
    pets: HydratedArraySubdocument<{
      petId: ObjectId;
      phase: number;
      hungry: number;
      bored: number;
      nextLvTime: Date | null;
      stoolCount: number;
      isAlive: boolean;
    }>[];
    foods: HydratedArraySubdocument<{ foodId: ObjectId; count: number }>[];
  }
>;

type UserModelType = Model<IUser, {}, {}, {}, UserHydratedDocument>;

const userSchema = new Schema<IUser, UserModelType, DefaultSchemaOptions, IUser, UserHydratedDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pets: [
    {
      petId: { type: Types.ObjectId, ref: 'Pet', unique: true },
      phase: { type: Number, required: true, default: 1 },
      hungry: { type: Number, required: true, default: 0 },
      bored: { type: Number, required: true, default: 0 },
      stoolCount: { type: Number, required: true, default: 0 },
      nextLvTime: { type: Date, default: new Date(Date.now() + 1000 * 60 * 10) },
      isAlive: { type: Boolean, required: true, default: true },
    },
  ],
  foods: [{ foodId: { type: Types.ObjectId, ref: 'Food', unique: true }, count: { type: Number, default: 1 } }],
  lastRequest: { type: Date },
});

const User = model<IUser, UserModelType>('User', userSchema);

export default User;
