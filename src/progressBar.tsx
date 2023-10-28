import "./progressBar.css"
import React, {useEffect, useState, useRef} from "react";

export default function ProgressBar(props: any) {
    const curPercentage = useRef(0)
    const targetPercentage = useRef(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const { value = 0, increaseDuration = 1000, divideCount = 5, 
        color="info", divide = true, 
        maxValue = 100} = props;

    const colorClass: any = {
        "info": "bg-info",
        "success": "bg-success",
        "warning": "bg-warning",
        "danger": "bg-danger"
    }
    const defaultColorClass = "bg-info"
    
    const progressRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);

    useEffect(()=> {
        const progressElement = progressRef.current as HTMLDivElement;
        const progressBarElement = progressBarRef.current as HTMLDivElement;
    
        progressElement.classList.add(colorClass[color] ?? defaultColorClass);
        progressBarElement.classList.add(colorClass[color] ?? defaultColorClass);
    },[])

    useEffect(()=> {
        if(value > maxValue) {
            targetPercentage.current = maxValue
        } else if (value < 0) {
            targetPercentage.current = 0
        } else {
            targetPercentage.current = value
        }
        
        if(!isAnimating) {
            setIsAnimating(true)
            animateProgressBar(increaseDuration);
        }
    },[value])

    const getDivideCount = (): number[]  => {
        let arr = [];
        for (let i = 0; i < divideCount; i++) arr.push(i);
        return arr;
    };


    const animateProgressBar = (duration: number) => {
        const startPercentage = curPercentage.current;

        const startTime = performance.now();
        const updatePercentage = (timestamp: number) => {
            const progressElement = progressRef.current as HTMLDivElement;

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentPercentage = startPercentage + (targetPercentage.current - startPercentage) * progress;

            progressElement.style.width = currentPercentage + "%";
            curPercentage.current = currentPercentage

            if (progress < 1) {
                requestAnimationFrame(updatePercentage);
            } else {
                setIsAnimating(false)
            }
        }

        requestAnimationFrame(updatePercentage);
    }

    
    return (
        <div style={{ display: "flex" }}> 
            <div className="progress-bar-wrapper">
                <div ref={progressBarRef} className="progress-bar">
                    <div
                        ref={progressRef}
                        className="progress"
                    >
                                                    {/* { value }% */}
                        <div
                        className="cur-progress-text"
                        >
                            { value }%
                        </div>
                    </div>  
                    {
                    divide ?
                    <div
                        className="divide-bar-container"
                    >
                        {
                            getDivideCount().map( i => (
                                i < divideCount -1?
                                    <div key={i} className="divide-bar">
                                    </div>
                                :
                                    <div key={i}>
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
                            <div key={i} style={{fontSize: "0.9rem"}}>
                                { ((maxValue / divideCount) * i).toFixed(0) }
                            </div>
                        ))
                    }
                    <div>{ maxValue }</div>
                </div> : 
                <div></div>
                }
            </div>
        </div>
    )
}