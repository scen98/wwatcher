import { return500, returnData, returnError } from "./midutils";

const express = require("express");
const app = express();
const path = require("path");
const backendPath = "/wwatcher/node";
const axios = require('axios').default;

app.use("/wwatcher/static", express.static(__dirname + "/public/static"));
app.use("/wwatcher/manifest.json", express.static(__dirname + "/public/manifest.json"));
app.use("/wwatcher/favicon.ico", express.static(__dirname + "/public/favicon.ico"));
app.use("/wwatcher/robots.txt", express.static(__dirname + "/public/robots.txt"));

app.get([
    "/wwatcher/fooldal",
    "/wwatcher/terkep",
    "/wwatcher/helyszin"
], function (req, res){
    res.sendFile(path.join(__dirname, "./public", "index.html"));
});

app.use(backendPath + "/img", express.static(__dirname + "/img"));
app.use(backendPath + "/json", express.static(__dirname + "/json"));

app.listen(4000, ()=>{
    console.log("WWatcher running.");
});