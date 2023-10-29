import ProgressBar from "./dist/index"
import { useState } from 'react';

export default function App() {
    const [number, setNumber] = useState(50);
    // (function timeTest() {
    //   setTimeout(function() {
    //     setNumber(number+10)
    //     console.log(number)
    //   }, 1000);
    // })()
    return  (
        <div style={{width: "50%"}}>
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="primary"
                animated
                stripped
                colorChanging
            />
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="secondary"
                animated
                stripped
                colorChanging
            />
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="success"
                animated
                stripped
                colorChanging
            />            
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="info"
                animated
                stripped
                colorChanging
            />
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="warning"
                animated
                stripped
                colorChanging
            />
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="danger"
                animated
                stripped
                colorChanging
            />
            <ProgressBar 
                value={number}
                divideCount={5}
                maxValue={100}
                color="black"
                animated
                stripped
                colorChanging
            />
            <button onClick={() => setNumber(number+10)}>Plus Test</button>
            <button onClick={() => setNumber(number-10)}>Minus Test</button>
        </div>
    )
}
