const { Sequelize } = require('sequelize');
const sequelizeConfig = require('../sequelize-config');
const PlaybookModel = require('./playbook');
const JobModel = require('./job');

const sequelize = new Sequelize(sequelizeConfig[process.env.NODE_ENV || 'development']);

const Playbook = PlaybookModel(sequelize, Sequelize);
const Job = JobModel(sequelize, Sequelize);

Playbook.hasMany(Job);
Job.belongsTo(Playbook);

module.exports = {
  sequelize,
  Playbook,
  Job,
};
