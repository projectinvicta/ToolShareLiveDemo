import {Model, DataTypes} from "@projectinvicta/nails";
import User from "./User.ts";
import Rental from "./Rental.ts";

export const schema = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pricePerDay: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '🔧',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 8),
    allowNull: true,
  },
  longitude: {
    type: DataTypes.DECIMAL(11, 8),
    allowNull: true,
  },
  available: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
};

export default class Tool extends Model {};

export async function afterInitializeAll() {
  await Tool.belongsTo(User);
  await Tool.hasMany(Rental);
}
