const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('country', {
    name: {
      type: DataTypes.STRING(350),
      allowNull: false
    },
    cca3: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notId(value) {
          if(value.length !== 3) throw new Error('Id must contain three characters')
        }
      }
    },
    flags: {
      type: DataTypes.STRING(350),
      allowNull: false
    },  
    flag: {
      type: DataTypes.STRING(50)
    },
    continents: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: false
    },
    capital: {
      type: DataTypes.ARRAY(DataTypes.STRING(50)),
      allowNull: true
    },
    subregion: {
      type: DataTypes.STRING(350)
    },
    area: {
      type: DataTypes.FLOAT
    },
    population: {
      type: DataTypes.INTEGER
    }
  }, {
    timestamps: false
  });
};
