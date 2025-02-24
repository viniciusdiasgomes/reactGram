require("dotenv").config(); 
const mongoose = require("mongoose");
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;


const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.qv4ar.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const conn = async () => {
    try {
        await mongoose.connect(dbURI);
        console.log("✅ Conectado ao banco!");
    } catch (error) {
        console.error("❌ Erro ao conectar ao banco:", error);
        process.exit(1);
    }
};

conn();

module.exports = conn;
