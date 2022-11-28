import { Button } from "@mui/material";
import axios from "axios";
import { signInAuth, signOutAuth, userToken } from "lib/firebase";

const Home = () => {
  const handleClick = () => {
    signInAuth().then((res) => {
      try {
        axios
          // .get(
          //   `https://content-fitness.googleapis.com/fitness/v1/users/me/dataSources/derived%3Acom.google.step_count.delta%3Acom.google.android.gms%3Aestimated_steps`,
          //   {
          //     headers: {
          //       Authorization: `Bearer ${res.accessToken}`,
          //     },
          //   }
          // )

          .post(
            `https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate?key=AIzaSyCsF2G6kG0ivGAfDg6bQoE21i5Yr_Guyg8`,
            {
              params: {
                aggregateBy: [
                  {
                    dataTypeName: "com.google.step_count.delta",
                    dataSourceId:
                      "derived:com.google.step_count.delta:com.google.android.gms:estimated_steps",
                  },
                ],
                bucketByTime: { durationMillis: 86400000 },
                startTimeMillis: 1438705622000,
                endTimeMillis: 1439310422000,
              },
            },
            {
              headers: {
                Authorization: `Bearer ${res.accessToken}`,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
          });
      } catch (err) {
        console.log(err);
      }
    });
  };

  const handleSignOut = () => {
    signOutAuth();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClick}>
        Google Login
      </Button>
      <Button variant="outlined" onClick={handleSignOut}>
        ログアウト
      </Button>
      <Button variant="outlined">歩数取得</Button>
    </div>
  );
};

export default Home;
