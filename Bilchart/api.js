const express = require("express");
const { Client } = require("pg");
const app = express();
const port = 3000;



const klient = new Client({
    user: "dtbnxqxt",
    host: "ella.db.elephantsql.com",
    database: "dtbnxqxt",
    password: "t3TRWO3wjuAFuDXdP6bmerLSDEbp6WOE",
    port: 5432
});



klient.connect();


app.get("/tallerken/", async (req, res) => {
    try {
        let queryData = await klient.query('select * from tallerken');
        res.json({
            "ok": true,
            "tallerken": queryData.rows,
        });
    } catch (error) {
        res.json({
            "ok": false,
            "message": error.message,
        });
    }
});

app.get("/personbil_udvikling/:bilType", async (req, res) => {
    try {
        const bilType = req.params.bilType;
        let queryData = await klient.query('select * from personbil_udvikling where vehicletype_id =$1', [bilType]);
        res.json({
            "ok": true,
            "personbil_udvikling": queryData.rows,
        });
    } catch (error) {
        res.json({
            "ok": false,
            "message": error.message,
        });
    }
});

app.get("/vegetarer/", async (req, res) => {
    try {
        let queryData = await klient.query('select * from vegetarer_i_antal');
        res.json({
            "ok": true,
            "vegetarer": queryData.rows,
        });
    } catch (error) {
        res.json({
            "ok": false,
            "message": error.message,
        });
    }
});


app.get("/maaltider/:maaltidId", async (req, res) => {
    try {
        const maaltidId = req.params.maaltidId;
        let queryData = await klient.query('select * from tallerken  where maaltid_id =$1', [maaltidId]);
        res.json({
            "ok": true,
            "maaltider": queryData.rows,
        });
    } catch (error) {
        res.json({
            "ok": false,
            "message": error.message,
        });
    }
});

app.get("/vehicle_co2_emissions/:vehicletype", async (req, res) => {
    try {
        const vehicletype = req.params.vehicletype;
        let queryData = await klient.query('select * from vehicle_co2_emissions  where vehicletype_id =$1', [vehicletype]);
        res.json({
            "ok": true,
            "vehicle_co2_emissions": queryData.rows,
        });
    } catch (error) {
        res.json({
            "ok": false,
            "message": error.message,
        });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});