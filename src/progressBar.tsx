import "./progressBar.css"
import React, {useEffect, useState} from "react";

export default function ProgressBar(props: any) {
    const [curPercentage, setCurPercentage] = useState(0)

    const { value = 0, increaseDuration = 1000, divideCount = 5, 
        color, divide = true, 
        maxValue = 100} = props;

    useEffect(()=> {
        animateProgressBar(value, increaseDuration);
    },[value])

    const getDivideCount = (): number[]  => {
        let arr = [];
        for (let i = 0; i < divideCount; i++) arr.push(i);
        return arr;
    };

    const percentageRef = React.createRef<HTMLDivElement>();
    
    const animateProgressBar = (targetPercentage: number, duration: number) => {
        const percentageElement = percentageRef.current as HTMLDivElement;
        percentageElement.style.backgroundColor = color;
        const startPercentage = curPercentage;

        const startTime = performance.now();
        const updatePercentage = (timestamp: number) => {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentPercentage = startPercentage + (targetPercentage - startPercentage) * progress;

            percentageElement.style.width = currentPercentage + "%";
            setCurPercentage(targetPercentage)

            if (progress < 1) {
                requestAnimationFrame(updatePercentage);
            } 
        }
        requestAnimationFrame(updatePercentage);
    }

    
    return (
        <div style={{ display: "flex" }}> 
            <div className="progress-bar-wrapper">
                <div className="progress-bar progress-bg">
                    <div
                        ref={percentageRef}
                        className="percentage"
                    >
                        <div
                        className="cur-progress-text"
                        >
                            { value }%
                        </div>
                    </div>  
                    {
                    divide ?
                    <div
                        className="divide-bar"
                    >
                        {
                            getDivideCount().map( i => (
                                i < divideCount -1?
                                    <div key={i} style={{flexGrow: 1, "borderRight": "1px solid"}}>
                                    </div>
                                :
                                    <div key={i} style={{flexGrow: 1}}>
                                    </div>
                            ))
                        }
                    </div> : 
                    <div></div>
                    }
                </div>
                {
                divide ?
                <div
                    className="divide-count"
                >
                    {
                        getDivideCount().map( i => (
                            <div key={i}>
                                { (maxValue / divideCount) * i }
                            </div>
                        ))
                    }
                    <div>{ maxValue }</div>
                </div> : 
                <div></div>
                }
            </div>
            {/* {
            numToRight ? 
            <div
            className="cur-progress"
            >
                { value }%
            </div> : null
            } */}

        </div>
    )
}