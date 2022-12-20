import { OAuth2Client } from "google-auth-library";
import { google } from "googleapis";

export const getOAuth2Client = async (code: string): Promise<OAuth2Client> => {
  const options = {
    clientId: process.env.client_id,
    clientSecret: process.env.client_secret,
    redirectUri: "http://localhost:3000/api/user",
  };
  const oauth2Client = new google.auth.OAuth2(options);

  // https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=642993486547-p5r7aigcnjcr8287h5buse4vlemsbp5f.apps.googleusercontent.com&redirect_uri=http://localhost:8000&scope=https://www.googleapis.com/auth/fitness.location.read&access_type=offline"

  // const scopes = [
  //   "https://www.googleapis.com/auth/fitness.location.read",
  //   "profile",
  // ];
  // const url = oauth2Client.generateAuthUrl({
  //   access_type: "offline",
  //   scope: scopes.join(" "),
  // });

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.credentials = tokens;

  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      console.log(tokens.refresh_token);
    }
    console.log(tokens.access_token);
  });

  return oauth2Client;
};

export const authenticate = async (url: string) =>
  new Promise((resolve, rejects) => {});

export const getAccessToken = async (
  clientId: string,
  clientSecret: string,
  redirectUri: string
) => {
  // OAuth 2.0 クライアントを作成する
  const oAuth2Client = new google.google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUri
  );

  // アクセストークンを取得する
  const { tokens } = await oAuth2Client.getToken({
    scope: ["https://www.googleapis.com/auth/fitness.activity.read"],
  });

  return tokens.access_token;
};
