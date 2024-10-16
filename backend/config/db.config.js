

module.exports = {
  HOST: process.env.DB_HOST,
  USER: process.env.SQL_USER,
  PASSWORD: process.env.SQL_PASSWORD,
  DB: process.env.SQL_DATABASE_NAME,
  dialect: process.env.DB_DIALECT,
  pool: {
    max: 5,                                      //nombre maximum de connexion dans le pool
    min: 0,                                      //nombre minimum de connexion dans le pool
    acquire: 30000,                              //temps maximum, en millisecondes, que le pool essaiera d'obtenir une connexion avant de lancer une erreur
    idle: 10000                                  //temps maximum, en millisecondes, pendant lequel une connexion peut être inactive avant d'être libérée
  }
};