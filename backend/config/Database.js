import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const port = process.env.NODE_PORT;
const dbName = process.env.DATABASE_NAME;
const dbPassword = process.env.DATABASE_PASSWORD;
const dbHost = process.env.DATABASE_HOST;
const dbUsername = process.env.DATABASE_USERNAME;
const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: dbHost,
  dialect: "mysql",
  logging: console.log,
});
(async () => {
  try {
    // Tes koneksi
    await db.authenticate();
    console.log("Koneksi ke database berhasil!");

    // Sinkronisasi model
    await db.sync({ force: false }); // force: false mencegah drop table jika sudah ada
    console.log("Database synced!");
  } catch (error) {
    console.error("Koneksi ke database gagal:", error.message);
  }
})();

export default db;