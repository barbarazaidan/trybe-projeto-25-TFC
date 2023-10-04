import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import SequelizeTeamModel from './TeamModel';

class SequelizeMatchModel extends Model<InferAttributes<SequelizeMatchModel>,
InferCreationAttributes<SequelizeMatchModel>> {
  declare id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

SequelizeMatchModel.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'teams',
      key: 'id',
    },
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
  underscored: true,
});

SequelizeMatchModel.belongsTo(SequelizeTeamModel, {
  foreignKey: 'homeTeamId', as: 'homeTeam',
});

SequelizeMatchModel.belongsTo(SequelizeTeamModel, {
  foreignKey: 'awayTeamId', as: 'awayTeam',
});

SequelizeTeamModel.hasMany(SequelizeMatchModel, { foreignKey: 'homeTeamId' });
SequelizeTeamModel.hasMany(SequelizeMatchModel, { foreignKey: 'awayTeamId' });

export default SequelizeMatchModel;
