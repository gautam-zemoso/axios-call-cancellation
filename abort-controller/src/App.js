import React, { useEffect, useReducer, useState } from "react";
import "./styles.css";

const randomId = (signal = null, delay = 3000) =>
  new Promise((accept, cancel) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    let timeout;

    const abortHandler = () => {
      clearTimeout(timeout);
      cancel("Cancelled");
    };

    const acceptHandler = (id) => {
      if (signal instanceof AbortSignal) {
        signal.removeEventListener("abort", abortHandler, {
          once: true
        });
      }
      accept(id);
    };

    timeout = setTimeout(acceptHandler, delay, id);

    if (signal instanceof AbortSignal) {
      signal.addEventListener("abort", abortHandler, {
        once: true
      });
    }
  });

const Resource = () => {
  const [resource, setResource] = useState(null);
  console.log("Inside Resource")
  useEffect(() => {
    const controller = new AbortController();

    randomId(controller.signal)
      .then((res) => setResource(res))
      .catch((e) => console.log(e, controller.signal.aborted));

    return () => controller.abort();
  }, []);

  return (
    <div>
      randomId: <p>{resource}</p>
    </div>
  );
};

export default function App() {
  const [show, toggle] = useReducer((x) => !x, false);
  return (
    <div className="App">
      <h1>Pseudo unique id generator</h1>

      <button onClick={toggle}>Toggle</button>

      {show && <Resource />}
    </div>
  );
}
