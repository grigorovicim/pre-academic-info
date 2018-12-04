'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    personal_email: DataTypes.STRING,
    telephone_number: DataTypes.STRING,
    gender: DataTypes.INTEGER,
    date_of_birth: DataTypes.DATE,
    cnp: DataTypes.STRING
  }, {});
  Profile.associate = function(models) {
<<<<<<< HEAD
    // associations can be defined here
=======
>>>>>>> origin/develop
    models.Profile.belongsTo(models.User, {
      foreignKey: {
        name: 'user_id',
        allowNull: false,
      }
    });
<<<<<<< HEAD
=======

    models.Profile.hasOne(models.Professor, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });

    models.Profile.hasOne(models.Student, {
      foreignKey: {
        name: 'profile_id',
        allowNull: false,
      }
    });
>>>>>>> origin/develop
  };
  return Profile;
};