'use strict';

const randomString = require('randomstring');
const bcrypt = require('bcrypt');
const maxPasswordLen = 15;
const maxVerifTokenLen = 64;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: { 
      type: DataTypes.STRING,
      unique: true,
    },
    password: { 
      type: DataTypes.STRING,
    },
    is_active: { 
      type: DataTypes.BOOLEAN,
    },
    verification_token: DataTypes.STRING,
  },{
    hooks: {
      beforeCreate: function(user) {
        console.log("User id: " + user.id);
        console.log("Username:" + user.username);
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(user.password, salt);

        user.verification_token = randomString.generate({
          length: maxVerifTokenLen
        });
    
        user.is_active = false;
      }
    }
  });

  User.associate = function(models) {
  
  };

  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  }

  return User;
};