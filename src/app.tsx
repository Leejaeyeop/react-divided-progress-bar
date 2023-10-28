import ProgressBar from './progressBar';
import { useState } from 'react';


export default function App() {
    const [number, setNumber] = useState(10);

    return  (
        <div style={{width: "50%"}}>
            <ProgressBar 
            value={number}
            divideCount={5}
            maxValue={100}
            color="info"
            />
            <button onClick={() => setNumber(number+1)}>Plus Test</button>
            <button onClick={() => setNumber(number-1)}>Minus Test</button>
        </div>
    )
}