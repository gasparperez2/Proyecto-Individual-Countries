const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

  sequelize.define('activity', {
    name: {
      type: DataTypes.STRING(50)
    },
    difficulty: {
        type: DataTypes.INTEGER,
        // validate: {
        //     oneToFive(value) {
        //         if(value<1 && value>5) throw new Error('Difficulty must be between 1 to 5')
        //     }
        // }
    },
    duration: {
        type: DataTypes.STRING(50)
    },
    season: {
        type: DataTypes.STRING(300)
    }
  }, {
    timestamps: false
  });
};
