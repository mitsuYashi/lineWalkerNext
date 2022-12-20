import passport from "passport";
import { OAuth2Strategy as GoogleStrategy } from "passport-google-oauth";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      // アクセストークンを使用して、Fitness APIを呼び出すことができるようになります。
      done(null, { accessToken, refreshToken });
    }
  )
);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/fitness.activity.read"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => {
    // 認証が成功した場合の処理を記述します。
    // 例えば、アクセストークンをセッションに保存したり、トップページにリダイレクトしたりすることができます。
  }
);
