import axios from "axios";
import { Router } from "express";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const handleClick = async () => {};

  return (
    <div>
      <h1>Line Walker</h1>
      <button onClick={handleClick}>
        <a href="https://linewalker.onrender.com/user">login</a>
      </button>
    </div>
  );
}
