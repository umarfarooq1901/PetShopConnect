const mongoose = require("mongoose");
const { config } = require("dotenv");
config({ path: "./.env" });
const dbUrl = process.env.DB_URL;
const connectDb = async () => {
  try {
    await mongoose.connect(`${dbUrl}/petShop`);
    console.log("Db Connected successfully!");
  } catch (error) {
    console.log("Error while connecting to the Db", error);
  }
};

module.exports = connectDb;
