'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Card.belongsTo(models.Board,{
        foreignKey: 'board_id',
        as:'board',
      })
      Card.hasMany(models.List,{
        foreignKey: 'card_id',
        as: 'lists',
        onDelete: 'CASCADE',
        hooks: true, 
      })
    }
  };
  Card.init({
    card_name: DataTypes.STRING,
    board_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Card',
  });
  return Card;
};