import { return400, return500, returnData, returnError } from "./midutils";

const express = require("express");
const app = express();
const path = require("path");
const backendPath = "/wwatcher/node";
const axios = require('axios').default;
const nameDay = require("./json/namedays.json");

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

app.get(backendPath + "/nameday", async (req,res)=>{
    try{
        getNameDay(req, res);
    } catch(err){
        returnError(res, err);
    }
});

function getNameDay(req, res){

    if(req.query.month == null || req.query.day == null || req.query.year == null){
        return return400(res, "Invalid parameters. Required: month, day");
    }    
    if(req.query.month > 12 || req.query.month < 1){
        return return400(res, "Invalid parameter range: month must be between 1 and 31");
    }
    if(req.query.day > 31 || req.query.day < 1){
        return return400(res, "Invalid parameter range: day must be between 1 and 12");
    } 
    const response = createNameDayResponse(req.query.year, req.query.month, req.query.day);
    return returnData(res, response);
}

function createNameDayResponse(year, month, day){
    const currentDate = new Date(year, month - 1, day);
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if(isLeap(year)){
        return {
            today: findNamesInLeapYear(currentDate),
            tomorrow: findNamesInLeapYear(tomorrow)
        }
    }
    return {
        today: findNames(currentDate),
        tomorrow: findNames(tomorrow)
    }
}

function findNames(date){
    return nameDay.find(n=> n.month === date.getMonth() + 1  && n.day === date.getDate()).names;
}

function findNamesInLeapYear(date){
    if(date.getMonth() === 1){
        if(date.getDate() === 24){
            return [];
        }
        if(date.getDate() > 24){
            return nameDay.find(n=> n.month === date.getMonth() + 1 && n.day === (date.getDate() - 1)).names;
        }
    }
    
    return findNames(date);
}

function isLeap(year) {
    return new Date(year, 1, 29).getDate() === 29;
  }

app.use(backendPath + "/img", express.static(__dirname + "/img"));
app.use(backendPath + "/json", express.static(__dirname + "/json"));

app.listen(4000, ()=>{
    console.log("WWatcher running.");
});