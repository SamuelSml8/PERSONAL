const express = require("express");
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://samuel8:t4ImxkPNMXAhIrLt@users-nodejs.eyxgrp5.mongodb.net/"
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", () => {
  console.log("Connected to MongoDB");
  //   MODEL
  userSchema = mongoose.Schema({
    name: String,
    email: String,
  });

  const user = mongoose.model("users2", userSchema);

  const port = 3000;
  const app = express();
  app.use(express.json());

  //* Obtener todos los usuarios que sean mayores de 18 años.
  app.get("/api/users/one", async (req, res) => {
    try {
      const users = await user.find({ age: { $gt: 18 } });
      res.json({
        ok: true,
        message: "users over 18 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener todos los usuarios que sean de Londres o de París.
  app.get("/api/users/two", async (req, res) => {
    try {
      const users = await user.find({ city: { $in: ["londres", "paris"] } });
      res.json({
        ok: true,
        message: "users in London or Paris",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener a todos los usuarios que ganen más de $2000 al mes y tengan menos de 30 años
  app.get("/api/users/three", async (req, res) => {
    try {
      const users = await user.find({
        salary: { $gt: 2000 },
        age: { $lt: 30 },
      });
      res.json({
        ok: true,
        message: "users with more than $2000 and less than 30 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener a todos los usuarios que sean de España y ganen más de $3000 al mes.
  app.get("/api/users/four", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["españa"] },
        salary: { $gt: 3000 },
      });
      res.json({
        ok: true,
        message: "users with more than $3000 in España",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener todos los usuarios que tengan entre 25 y 35 años.
  app.get("/api/users/five", async (req, res) => {
    try {
      const users = await user.find({
        age: { $gte: 25, $lte: 35 },
      });
      res.json({
        ok: true,
        message: "users between 25 and 35 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener a todos los usuarios que no sean de Estados Unidos.
  app.get("/api/users/six", async (req, res) => {
    try {
      const users = await user.find({
        country: { $ne: "estados unidos" },
      });
      res.json({
        ok: true,
        message: "users not in Estados Unidos",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener a todos los usuarios que sean de Londres y que ganen más de $2500 o que tengan más de 30 años.
  app.get("/api/users/seven", async (req, res) => {
    try {
      const users = await user.find({
        city: { $in: ["londres"] },
        $or: [{ salary: { $gt: 2500 } }, { age: { $gt: 30 } }],
      });
      res.json({
        ok: true,
        message:
          "users in London with more than $2500 or with more than 30 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener a todos los usuarios que sean de Australia y tengan un peso mayor a 140 libras.
  app.get("/api/users/eight", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["australia"] },
        weight: { $gt: 140 },
      });
      res.json({
        ok: true,
        message: "users in Australia with more than 140 libras",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener a todos los usuarios que no sean de Londres ni de París.
  app.get("/api/users/nine", async (req, res) => {
    try {
      const users = await user.find({
        city: { $nin: ["londres", "paris"] },
      });
      res.json({
        ok: true,
        message: "users not in London or Paris",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener a todos los usuarios que ganen menos de $2000 al mes o que tengan más de 40 años.
  app.get("/api/users/teen", async (req, res) => {
    try {
      const users = await user.find({
        salary: { $lt: 2000 },
        $or: [{ age: { $lt: 40 } }],
      });
      res.json({
        ok: true,
        message: "users with less than $2000 or with more than 40 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener a todos los usuarios que sean de Canadá y ganen más de $4000 al mes o que tengan una altura mayor a 180 cm.
  app.get("/api/users/eleven", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["canada"] },
        $or: [{ salary: { $gt: 4000 } }, { height: { $gt: 180 } }],
      });
      res.json({
        ok: true,
        message:
          "users in Canada with more than $4000 or with more than 180 cm of height",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener todos los usuarios que sean de Italia y tengan entre 20 y 30 años.
  app.get("/api/users/twelve", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["italia"] },
        age: { $gt: 20, $lte: 30 },
      });
      res.json({
        ok: true,
        message: "users between 20 and 30 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener todos los usuarios que no tengan un correo electrónico registrado.
  app.get("/api/users/thirteen", async (req, res) => {
    try {
      const users = await user.find({ email: { $exists: false } });
      res.json({
        ok: true,
        message: "users without email",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener todos los usuarios que sean de Francia y que su salario esté entre $3000 y $5000 al mes.
  app.get("/api/users/fourteen", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["francia"] },
        salary: { $gte: 3000, $lte: 5000 },
      });
      res.json({
        ok: true,
        message: "users in France with a salary between $3000 and $5000",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener todos los usuarios que sean de Brasil y que tengan un peso menor a 120 libras o más de 140 libras.
  app.get("/api/users/fifteen", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["brasil"] },
        $or: [{ weight: { $lt: 120 } }, { weight: { $gt: 140 } }],
      });
      res.json({
        ok: true,
        message: "users in Brazil with a weight between 120 and 140 libras",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener todos los usuarios que sean de Argentina o de Chile y que tengan una edad menor a 25 años.
  app.get("/api/users/sixteen", async (req, res) => {
    try {
      const users = await user.find({
        $or: [
          { country: { $in: ["argentina", "chile"] } },
          { age: { $lt: 25 } },
        ],
      });
      res.json({
        ok: true,
        message: "users in Argentina or Chile with less than 25 years of age",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener a todos los usuarios que no sean de España ni de México y que ganen menos de $3000 al mes.
  app.get("/api/users/seventeen", async (req, res) => {
    try {
      const users = await user.find({
        country: { $nin: ["espana", "mexico"] },
        salary: { $lt: 3000 },
      });
      res.json({
        ok: true,
        message: "users not in Spain or Mexico with less than $3000",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener todos los usuarios que sean de Alemania y que tengan un salario menor a $4000 o una edad mayor a 35 años.
  app.get("/api/users/eighteen", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["alemania"] },
        salary: { $lt: 4000 },
      });
      res.json({
        ok: true,
        message: "users in Alemania with a salary less than $4000",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //*   Obtener todos los usuarios que no sean de Colombia y que su altura sea menor a 170 cm.
  app.get("/api/users/eighteen", async (req, res) => {
    try {
      const users = await user.find({
        country: { $nin: ["colombia"] },
        height: { $lt: 170 },
      });
      res.json({
        ok: true,
        message: "users not in Colombia with a height less than 170 cm",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  //* Obtener todos los usuarios que sean de India y que no tengan un salario registrado.
  app.get("/api/users/nineteen", async (req, res) => {
    try {
      const users = await user.find({
        country: { $in: ["india"] },
        salary: { $exists: false },
      });
      res.json({
        ok: true,
        message: "users in India without a salary",
        data: users,
      });
    } catch (error) {
      res.json({
        ok: false,
        message: error.message,
        data: "",
      });
    }
  });

  app.listen(port, () => {
    console.log(`Server on port ${port}`);
  });
});
