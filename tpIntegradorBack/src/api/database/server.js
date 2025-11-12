import express from "express";
import cors from "cors";
import mysql from "mysql2/promise"; // Si usás MySQL

const app = express();

//app.use(cors());
//app.use(express.json());

// test
app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente 🚀");
});

