module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dependent_on: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'created', // Default value is 'created'
    }
  });

  return Job;
};
