'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    name: DataTypes.STRING
  }, {});
  Section.associate = function(models) {
    // associations can be defined here
    models.Section.belongsTo(models.Abbreviation,{
      foreignKey: {
        name: 'abbreviation_id',
        allowNull: false
      }
    });
  };
  return Section;
};