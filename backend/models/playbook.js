module.exports = (sequelize, DataTypes) => {
    const Playbook = sequelize.define('Playbook', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  
    return Playbook;
  };
  