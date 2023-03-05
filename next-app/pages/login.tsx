import { css } from "@emotion/react";
import { Avatar, Button } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";

import Image from "next/image";

const classes = {
  button: css`
    position: absolute;
    /* right: 46vw; */
    left: 50%;
    top: 50%;
    width: 220px;
    height: 50px;
    background-color: "#fff";
    transform: translate(-50%, -50%);
    &:hover {
      background: "#fff";
      box-shadow: "0 0 6px #4285f4";
    }
  `,
};

export default function Login() {
  const router = useRouter();
  const handleClick = async () => {};

  // const getSteps = async () => {
  //   const step = await axios
  //     .get("https://linewalker.onrender.com/user/steps")
  //     .then((data) => {
  //       console.log(data);
  //     });
  // };
  const handleSignin = () => {
    router.push("https://linewalker.onrender.com/user");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          objectFit: "cover",
          backgroundColor: "#888",
        }}
      >
        <Image
          src="/running.gif"
          alt="走っている人"
          // width={512}
          // height={288}
          objectFit="cover"
          layout="fill"
        />
        <div
          style={{
            position: "fixed",
            backgroundColor: "#fff",
            opacity: "50%",
            width: "100%",
            height: "100%",
          }}
        ></div>
      </div>
      <h1
        style={{
          position: "absolute",
          left: "50%",
          top: "25%",
          transform: "translate(-50%, -50%)",
          fontSize: "3.25rem",
          fontFamily: "cursive",
        }}
      >
        Line Walker
      </h1>
      <Button
        variant="outlined"
        color="primary"
        startIcon={
          <Avatar
            src={
              "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            }
          />
        }
        style={{ textTransform: "capitalize" }}
        css={classes.button}
        onClick={handleSignin}
      >
        Sign in with Google
      </Button>
    </div>
  );
}
