'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      List.belongsTo(models.Card,{
        foreignKey: 'card_id',
        as: 'card',
      })
    }
  };
  List.init({
    list_name: DataTypes.STRING,
    description: DataTypes.STRING,
    card_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'List',
  });
  return List;
};