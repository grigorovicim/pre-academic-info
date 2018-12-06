'use strict';
module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define('Section', {
    name: DataTypes.STRING
  }, {});
  Section.associate = function(models) {
    models.Section.belongsTo(models.Abbreviation,{
      foreignKey: {
        name: 'abbreviation_id',
        allowNull: false
      }
    });

    models.Section.hasMany(models.Course, {
      foreignKey: {
        name: 'section_id',
        allowNull: false
      }
    });

    models.Section.hasMany(models.Student, {
      foreignKey: {
        name: 'section_id',
        allowNull: false
      }
    });
  };
  return Section;
};