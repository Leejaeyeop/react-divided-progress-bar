import ProgressBar from "react-divided-progress-bar";

import { useState } from "react";

export default function App() {
  const [number, setNumber] = useState(90);

  //   useEffect(() => {
  //     const time = () =>
  //       setInterval(() => {
  //         setNumber((preNumber) => preNumber + 1);
  //       }, 1000);
  //     time();
  //     return () => clearInterval(time());
  //   }, []);
  return (
    <div>
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        increaseDuration={1000}
        color="primary"
        animated
        stripped
        colorChange
      />
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        color="secondary"
        animated
        stripped
        colorChange
      />
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        color="success"
        animated
        stripped
        colorChange
      />
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        color="info"
        animated
        stripped
        colorChange
      />
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        color="warning"
        animated
        stripped
        colorChange
      />
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        color="danger"
        animated
        stripped
        colorChange
      />
      <ProgressBar
        value={number}
        sections={5}
        maxValue={100}
        color="black"
        animated
        stripped
        increaseDuration={3000}
        colorChange
      />
      <button onClick={() => setNumber((p) => p + 10)}>Plus Test</button>
      <button onClick={() => setNumber((p) => p - 10)}>Minus Test</button>
    </div>
  );
}
