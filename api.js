const express = require("express");
const cors = require("cors");
const { Client } = require("pg");
const app = express();
const port = 3000;

app.use(cors());

const klient = new Client({
  user: "db_1semesterprojekt_user",
  host: "dpg-clmq2effeb2c73eaooe0-a.frankfurt-postgres.render.com",
  database: "databasen",
  password: "ve0iwn4Dx9SvRv2JCS9HtudCR6nUzEpK",
  port: 5432,
  ssl: { rejectUnauthorized: false },
});

klient.connect();

app.get("/tallerken/", async (req, res) => {
  try {
    let queryData = await klient.query("select * from tallerken");
    res.json({
      ok: true,
      tallerken: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/personbil_udvikling/:bilType", async (req, res) => {
  try {
    const bilType = req.params.bilType;
    let queryData = await klient.query(
      "select * from personbil_udvikling where vehicletype_id =$1",
      [bilType]
    );
    res.json({
      ok: true,
      personbil_udvikling: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/vegetarer/", async (req, res) => {
  try {
    let queryData = await klient.query("select * from vegetarer_i_antal");
    res.json({
      ok: true,
      vegetarer: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/maaltider/", async (req, res) => {
  try {
    let queryData = await klient.query("select * from tallerken");
    res.json({
      ok: true,
      maaltider: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/vehicle_co2_emissions/:vehicletype", async (req, res) => {
  try {
    const vehicletype = req.params.vehicletype;
    let queryData = await klient.query(
      "select * from vehicle_co2_emissions  where vehicletype_id =$1",
      [vehicletype]
    );
    res.json({
      ok: true,
      vehicle_co2_emissions: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.post("/quizvote/:value", async (req, res) => {
  try {
    const votevalue = req.params.value;
    let queryData = await klient.query(
      "INSERT INTO Quiz(voted_for) VALUES ($1)",
      [votevalue]
    );
    res.json({
      ok: true,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/quizvote/results", async (req, res) => {
  try {
    let queryData = await klient.query("select * from Quiz_percentages");
    res.json({
      ok: true,
      results: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/yearly_co2_food", async (req, res) => {
  try {
    let queryData = await klient.query(
      "select * from yearly_co2_food"
    );
    res.json({
      ok: true,
      yearly_co2_food: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/yearly_co2_vehicle", async (req, res) => {
  try {
    let queryData = await klient.query(
      "select * from yearly_co2_vehicle"
    );
    res.json({
      ok: true,
      vehicle_co2_emissions: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.get("/leaderboard", async (req, res) => {
  try {
    let queryData = await klient.query(
      "select * from leaderboard"
    );
    res.json({
      ok: true,
      leaderboard: queryData.rows,
    });
  } catch (error) {
    res.json({
      ok: false,
      message: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});