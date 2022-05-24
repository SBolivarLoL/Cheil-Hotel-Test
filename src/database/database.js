import mysql from "mysql2/promise";
import config from "./../config";

/* Creating a connection to the database. */
const connection = mysql.createConnection({
  host: config.host,
  port: 3306,
  database: config.database,
  user: config.user,
  password: config.password
});

const getConnection = () => {
  return connection;
}

module.exports = {
  getConnection
};