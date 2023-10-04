import { Model, QueryInterface, DataTypes } from 'sequelize';
import TeamsType  from '../../Interfaces/Teams';

export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<TeamsType>>('teams', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      teamName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'team_name',
      },
    });
  },
  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('teams');
  },
};

// 700001757739 - letícia 300001327522 (prazo da reclamação 5 a 10 dias)
// 20231004034025362 JOABSON