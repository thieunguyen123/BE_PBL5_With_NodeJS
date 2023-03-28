const { Sequelize } = require('sequelize');



// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('test', 'root', 'thieuthieu123', {
  host: 'localhost',
  dialect: 'mysql',
});

async function connectDB () {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
   


module.exports = connectDB;