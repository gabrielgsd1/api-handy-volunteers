'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Posts', 'StartDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.addColumn('Posts', 'FinishDate', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Posts', 'StartDate');
    await queryInterface.removeColumn('Posts', 'FinishDate');
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
