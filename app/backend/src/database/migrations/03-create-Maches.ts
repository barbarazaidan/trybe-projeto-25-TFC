import { Model, QueryInterface, DataTypes } from 'sequelize';
import MatchType from '../../Interfaces/Matches';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<MatchType>>('matches', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      homeTeamId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'home_team_id',
        references: {
            model: 'teams', 
            key: 'id'
        },
      },
      homeTeamGoals: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'home_team_goals',
      },
      awayTeamId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'away_team_id',
        references: {
            model: 'teams', 
            key: 'id'
        },
      },
      awayTeamGoals: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'away_team_goals',
      },
      inProgress: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        field: 'in_progress',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('matches');
  },
};