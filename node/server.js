"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var midutils_1 = require("./midutils");
var express = require("express");
var app = express();
var path = require("path");
var backendPath = "/wwatcher/node";
var axios = require('axios').default;
var nameDay = require("./json/namedays.json");
app.use("/wwatcher/static", express.static(__dirname + "/public/static"));
app.use("/wwatcher/manifest.json", express.static(__dirname + "/public/manifest.json"));
app.use("/wwatcher/favicon.ico", express.static(__dirname + "/public/favicon.ico"));
app.use("/wwatcher/robots.txt", express.static(__dirname + "/public/robots.txt"));
app.get([
    "/wwatcher/fooldal",
    "/wwatcher/terkep",
    "/wwatcher/helyszin"
], function (req, res) {
    res.sendFile(path.join(__dirname, "./public", "index.html"));
});
app.get(backendPath + "/nameday", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        try {
            getNameDay(req, res);
        }
        catch (err) {
            midutils_1.returnError(res, err);
        }
        return [2 /*return*/];
    });
}); });
function getNameDay(req, res) {
    if (req.query.month == null || req.query.day == null || req.query.year == null) {
        return midutils_1.return400(res, "Invalid parameters. Required: month, day");
    }
    if (req.query.month > 12 || req.query.month < 1) {
        return midutils_1.return400(res, "Invalid parameter range: month must be between 1 and 31");
    }
    if (req.query.day > 31 || req.query.day < 1) {
        return midutils_1.return400(res, "Invalid parameter range: day must be between 1 and 12");
    }
    var response = createNameDayResponse(req.query.year, req.query.month, req.query.day);
    return midutils_1.returnData(res, response);
}
function createNameDayResponse(year, month, day) {
    var currentDate = new Date(year, month - 1, day);
    var tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    if (isLeap(year)) {
        return {
            today: findNamesInLeapYear(currentDate),
            tomorrow: findNamesInLeapYear(tomorrow)
        };
    }
    return {
        today: findNames(currentDate),
        tomorrow: findNames(tomorrow)
    };
}
function findNames(date) {
    return nameDay.find(function (n) { return n.month === date.getMonth() + 1 && n.day === date.getDate(); }).names;
}
function findNamesInLeapYear(date) {
    if (date.getMonth() === 1) {
        if (date.getDate() === 24) {
            return [];
        }
        if (date.getDate() > 24) {
            return nameDay.find(function (n) { return n.month === date.getMonth() + 1 && n.day === (date.getDate() - 1); }).names;
        }
    }
    return findNames(date);
}
function isLeap(year) {
    return new Date(year, 1, 29).getDate() === 29;
}
app.use(backendPath + "/img", express.static(__dirname + "/img"));
app.use(backendPath + "/json", express.static(__dirname + "/json"));
app.listen(4000, function () {
    console.log("WWatcher running.");
});
