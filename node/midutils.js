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
exports.checkLength = exports.isUserLogged = exports.isUserAdmin = exports.isUserMod = exports.validateProperties = exports.isImage = exports.getLimiter = exports.nullCheckLimit = exports.returnError = exports.return404 = exports.return500 = exports.return403 = exports.returnMissingRequest = exports.return400 = exports.return200 = exports.returnInsert = exports.return201 = exports.returnData = exports.asyncWrapper = void 0;
function asyncWrapper(callback, callbackerr) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, callback()];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    callbackerr(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.asyncWrapper = asyncWrapper;
function returnData(res, object) {
    res.status(200);
    res.send(JSON.stringify(object));
    return true;
}
exports.returnData = returnData;
function return201(res, response) {
    if (response === void 0) { response = "201"; }
    res.status(201);
    res.send(JSON.stringify({ response: 201 }));
    return true;
}
exports.return201 = return201;
function returnInsert(res, newId) {
    res.status(201);
    res.send(JSON.stringify({ newId: newId }));
    return true;
}
exports.returnInsert = returnInsert;
function return200(res, response) {
    if (response === void 0) { response = "200"; }
    res.status(200);
    res.send(JSON.stringify({ response: 200 }));
    return true;
}
exports.return200 = return200;
function return400(res, response) {
    if (response === void 0) { response = "400"; }
    res.status(400);
    res.send(JSON.stringify({ response: 400 }));
    return false;
}
exports.return400 = return400;
function returnMissingRequest(res, missing) {
    var missingValues = "";
    missing.forEach(function (m) { return missingValues = missingValues + " " + m; });
    res.status(400);
    res.send(JSON.stringify({ response: "missing data in request: " + missingValues }));
    return false;
}
exports.returnMissingRequest = returnMissingRequest;
function return403(res, response) {
    if (response === void 0) { response = "403"; }
    res.status(403);
    res.send(JSON.stringify({ response: response }));
    return false;
}
exports.return403 = return403;
function return500(res, response) {
    if (response === void 0) { response = "500"; }
    res.status(500);
    res.send(JSON.stringify({ response: response }));
    return false;
}
exports.return500 = return500;
function return404(res, response) {
    if (response === void 0) { response = "404"; }
    res.status(404);
    res.send(JSON.stringify({ response: response }));
    return false;
}
exports.return404 = return404;
function returnError(res, err) {
    res.status(500);
    res.send(JSON.stringify({ serverError: err.toString() }));
    return false;
}
exports.returnError = returnError;
function nullCheckLimit(data) {
    if (data.limit == null) {
        data.limit = 1000000;
    }
    if (data.offset == null) {
        data.offset = 0;
    }
}
exports.nullCheckLimit = nullCheckLimit;
function getLimiter(limit, offset) {
    var limiter = { limit: 100000, offset: 0 };
    if (limit > 0) {
        limiter.limit = limit;
    }
    if (offset >= 0) {
        limiter.offset = offset;
    }
    return limiter;
}
exports.getLimiter = getLimiter;
function isImage(file) {
    return !(file.mimetype !== "image/png" && file.mimetype !== "image/jpg" && file.mimetype !== "image/jpeg");
}
exports.isImage = isImage;
function validateProperties(res, objectToCheck, toCheck) {
    var found = [];
    for (var _i = 0, toCheck_1 = toCheck; _i < toCheck_1.length; _i++) {
        var propName = toCheck_1[_i];
        if (objectToCheck[propName] === undefined)
            found.push(propName);
    }
    if (found.length > 0) {
        returnMissingRequest(res, found);
        return false;
    }
    return true;
}
exports.validateProperties = validateProperties;
var isUserMod = function (req) {
    if (req.session == null)
        return false;
    if (req.session.user == null)
        return false;
    if (req.session.user.permission != null && req.session.user.permission > 1)
        return true;
    return false;
};
exports.isUserMod = isUserMod;
var isUserAdmin = function (req) {
    if (req.session == null)
        return false;
    if (req.session.user == null)
        return false;
    if (req.session.user.permission != null && req.session.user.permission > 2)
        return true;
    return false;
};
exports.isUserAdmin = isUserAdmin;
var isUserLogged = function (req) {
    if (req.session == null)
        return false;
    if (req.session.user == null)
        return false;
    if (req.session.user.permission != null && req.session.user.permission > 0)
        return true;
    return false;
};
exports.isUserLogged = isUserLogged;
var checkLength = function (res, text, max) {
    if (text.length > max) {
        return400(res, "String too long, maximum length: " + max);
        return false;
    }
    return true;
};
exports.checkLength = checkLength;
