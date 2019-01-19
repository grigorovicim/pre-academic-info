'use strict';
module.exports = (sequelize, DataTypes) => {
  const Title = sequelize.define('Title', {
    label: DataTypes.STRING
  }, {});
  Title.associate = function(models) {
    // associations can be defined here
    models.Title.hasMany(models.Professor, {
      foreignKey: {
        name: 'title_id',
        allowNull: true
      }
    });
  };
  return Title;
};