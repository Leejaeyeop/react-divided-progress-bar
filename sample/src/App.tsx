import ProgressBar from "react-divided-progress-bar"

import { useState } from 'react';

export default function App() {
    const [number, setNumber] = useState(90);
    return  (
        <div style={{width: "50%"}}>
            <ProgressBar 
                value={number}
                sections={2}
                maxValue={100}
                color="primary"
                animated
                stripped
                colorChange
                bgColor={false}
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
            {/* <button onClick={() => setNumber(number+10)}>Plus Test</button>
            <button onClick={() => setNumber(number-10)}>Minus Test</button> */}
        </div>
    )
}
