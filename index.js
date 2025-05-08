require('dotenv').config();  // .env dosyasını yükle

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');  
const deviceRoutes = require('./routes/deviceRoutes');

const app = express();
const PORT = 5000;

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(cors());  
app.use(express.json());

app.use('/api/devices', deviceRoutes);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.log('MongoDB connection error: ', err);
  }
}

connectToDatabase();

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
