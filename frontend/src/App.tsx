import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5001/")
      .then((res) => res.text())
      .then((data) => setMessage(data));
  }, []);

  return (
    <>
      <p>{message}</p>
    </>
  );
}

export default App;
