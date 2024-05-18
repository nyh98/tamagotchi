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

interface IUser {
  _id: ObjectId;
  email: string;
  password: string;
  pets: Array<{
    petId: ObjectId;
    phase: number;
    hungy: number;
    bored: number;
    nextLvTime: Date;
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
      hungy: number;
      bored: number;
      nextLvTime: Date;
      stoolCount: number;
      isAlive: boolean;
    }>;
    foods: HydratedArraySubdocument<{ foodId: ObjectId; count: number }>;
  }
>;

type UserModelType = Model<IUser, {}, {}, {}, UserHydratedDocument>;

const userSchema = new Schema<IUser, UserModelType, DefaultSchemaOptions, IUser, UserHydratedDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  pets: [
    {
      petId: { type: Types.ObjectId, ref: 'Pet', unique: true },
      phase: { type: Number, required: true },
      hungy: { type: Number, required: true },
      bored: { type: Number, required: true },
      stoolCount: { type: Number, required: true },
      nextLvTime: { type: Date, default: new Date() },
      isAlive: { type: Boolean, required: true },
    },
  ],
  foods: [{ foodId: { type: Types.ObjectId, ref: 'Food', unique: true }, count: { Number } }],
  lastRequest: { type: Date },
});

const User = model<IUser, UserModelType>('User', userSchema);

export default User;
