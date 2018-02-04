module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.changeColumn('Recipes', 'description', Sequelize.TEXT)


  // down: function(queryInterface, Sequelize) {
  //   return queryInterface.removeColumn('Services', 'service_price');
  // }
};
