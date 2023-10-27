import ProgressBar from './progressBar';
import { useState } from 'react';


export default function App() {
    const [number, setNumber] = useState(10);

    return  (
        <div style={{width: "50%"}}>
            <ProgressBar 
            value={number}
            />
            <button onClick={() => setNumber(number+10)}>Plus Test</button>
            <button onClick={() => setNumber(number-10)}>Minus Test</button>
        </div>
    )
}