import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  console.log(import.meta.env.VITE_BACKEND_URL);

  useEffect(() => {
    async function ping() {
      try {
        const res = await fetch(import.meta.env.VITE_BACKEND_URL + "/ping");
        const data = await res.json();
        console.log(data);
      } catch (e) {
        console.error(e);
      }
    }
    ping();
  }, []);

  return (
    <>
      <button>login</button>
      <button>logout</button>
    </>
  );
}

export default App;
