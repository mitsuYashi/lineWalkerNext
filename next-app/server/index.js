"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var createServer = require("http").createServer;
var bodyParser = require("body-parser").bodyParser;
var userRouter = require("./userRouter");
var dev = process.env.NODE_ENV !== "production";
var port = process.env.PORT || "3000";
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
app.prepare().then(function () {
    var server = (0, express_1.default)();
    server.use("/user", userRouter);
    server.all("*", function (req, res) {
        return handle(req, res);
    });
    server.listen(port, function (err) {
        if (err)
            throw err;
        console.log("> Ready on http://localhost:".concat(port, " - env ").concat(process.env.NODE_ENV));
    });
});
