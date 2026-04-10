import { Model, DataTypes } from "@projectinvicta/nails";
import Tool from "./Tool.ts";
import User from "./User.ts";

export const schema = {
  startDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  totalCost: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'cancelled'),
    defaultValue: 'pending',
  },
  RenterId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
  OwnerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  },
};

export default class Rental extends Model { };

export async function afterInitializeAll() {
  Rental.belongsTo(Tool);
  Rental.belongsTo(User, {
    as: "Owner", foreignKey: {
      name: 'OwnerId',
    },
  });
  Rental.belongsTo(User, {
    as: "Renter",
    foreignKey: {
      name: 'RenterId',
    },
  });
}
