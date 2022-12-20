"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var googleapis_1 = require("googleapis");
var opn = require("open");
var router = express_1.default.Router();
router.get("/", function (req, res, next) {
    var options = {
        clientId: process.env.client_id,
        clientSecret: process.env.client_secret,
        redirectUri: "http://localhost:3000/api/user",
    };
    var oauth2Client = new googleapis_1.google.auth.OAuth2(options);
    var scopes = [
        "https://www.googleapis.com/auth/fitness.location.read",
        "profile",
    ];
    var url = oauth2Client.generateAuthUrl({
        access_type: "offline",
        scope: scopes.join(" "),
    });
    res.redirect(url);
    res.end();
});
// router.get("/oauth2callback", async (req, res, next) => {
//   const code = req.query.code as string;
//   const { tokens } = await oauth2Client.getToken(code);
//   oauth2Client.credentials = tokens;
//   res.redirect("http://localhost:3000");
//   res.end;
// });
module.exports = router;
