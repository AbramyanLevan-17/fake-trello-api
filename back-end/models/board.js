'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Board extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Board.belongsTo(models.User,{
        foreignKey: 'user_id',
        as: 'user',
      })
      Board.hasMany(models.Card,{
        foreignKey: 'board_id',
        as: 'cards',
        onDelete: 'CASCADE',
        hooks: true, 
      })
    }
  };
  Board.init({
    board_name: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Board',
  });
  return Board;
};