module.exports = {
    up: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'roleId', {
                type: Sequelize.STRING,
                allowNull: true,
            })
        ])
    },

    down: (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'roleId', {
                type: Sequelize.INTEGER,
                allowNull: true,
            })
        ])
    }
};