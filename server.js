const app = require('./app')

const mongoose = require('mongoose');
const { setupFolder } = require('./middlewares/helpers/avatarHelper');
require('dotenv').config();
const { DB_HOST: urlDb } = process.env;
const connection = mongoose.connect(urlDb)
const path = require("path");

const tempDir = path.join(process.cwd(), "public/temp");
const storeImageDir = path.join(process.cwd(), "public/avatars");

const startServer = async () => {
  try {
    await connection;
    console.log('Database connection successful');
    app.listen(3000, async () => {
      console.log("Server running. Use our API on port: 3000")
      await setupFolder(tempDir)
      await setupFolder(storeImageDir)
    })
  } catch (error) {
    console.log('Database connection failed')
    console.log(error);
    process.exit(1)
    
  }
}
startServer();


