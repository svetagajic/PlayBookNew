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
    depends: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    job_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });

  return Job;
};
