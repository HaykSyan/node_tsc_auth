'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.type.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      login: Sequelize.type.STRING,
      name: Sequelize.type.STRING,
      email: Sequelize.type.STRING,
      password: Sequelize.type.STRING,
      forgot_token: Sequelize.type.STRING,
    })
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.dropTable('users');
  }
};
