import express from "express";
import { google } from "googleapis";
import { session } from "express-session";
const router = express.Router();

router.use(session);

router.get("/", (req, res, next) => {
  const options = {
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    redirectUri: "http://localhost:3000/api/user",
  };
  const oauth2Client = new google.auth.OAuth2(options);
  const scopes = [
    "https://www.googleapis.com/auth/fitness.location.read",
    "profile  ",
  ];
  const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes.join(" "),
  });
  res.redirect(url);
  res.end();
});

router.get("/oauth2callback", async (req, res, next) => {
  const options = {
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    redirectUri: "http://localhost:3000/api/user",
  };
  const oauth2Client = new google.auth.OAuth2(options);
  const code = req.query.code as string;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const { refresh_token } = await oauth2Client.refreshAccessToken();
  res.redirect("http://localhost:3000");
  res.end;
});

module.exports = router;
