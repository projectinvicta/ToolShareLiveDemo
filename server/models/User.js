import {Model, DataTypes} from "@projectinvicta/nails";
import Dog from "./Dog.js";
import Rental from "./Rental.js";
import Tool from "./Tool.js";

export const schema = {
  googleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}

export default class User extends Model {};

export async function afterInitialize() {
  // Add hooks here
}

export async function afterInitializeAll() {
  await User.hasMany(Dog);
  await User.hasMany(Tool);
  await User.hasMany(Rental, {as: "Rented", foreignKey: "RenterId"});
  await User.hasMany(Rental, {as: "Provided", foreignKey: "OwnerId"});
}
