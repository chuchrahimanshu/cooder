/*
  Setting up the MongoDB database using Mongoose,
  This file is directly included in "app.js"
*/

import mongoose from "mongoose";

(async () => {
  try {
    const database = await mongoose.connect(process.env.MONGODB_URI);
    if (!database) {
      console.log(`ERROR 💥 | MongoDB Connection | mongoose.config.js`);
    }

    const connectionString = database.connection._connectionString;
    console.log(`SUCCESS 🚀 - MongoDB connected on ${connectionString}`);
  } catch (error) {
    console.log(`ERROR 💥 | MongoDB Connection | ${error}`);
  }
})();

export default mongoose.connection;
