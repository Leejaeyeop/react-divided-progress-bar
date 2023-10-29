'use client'
import "./progressBar.css"
import {useEffect, useState, useRef} from "react";

export type ProgressBarType = {
    value?: number,
    maxValue?: number,
    increaseDuration?: number,
    divide?: boolean
    divideCount?: number,
    color?: string,
    colorChanging?:boolean,
    stripped?: boolean,
    animated?: boolean
}

type ColorClass = {
    [color:string] : string
}

type ColorInfo = {
    [color:string] : {
        begin: number[],
        end: number[]
    }
}

export default function ProgressBar(props: ProgressBarType) {
    const curPercentage = useRef(0)
    const targetPercentage = useRef(0)
    const isAnimating = useRef(false)

    const { value = 0, increaseDuration = 1000, divideCount = 5, 
        color="info", colorChanging=false, divide = true, 
        maxValue = 100, animated = false, stripped = false} = props;
    
    const progressRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    useEffect(()=> {
        const colorClass: ColorClass = {
            "primary": "bg-primary",
            "secondary": "bg-secondary",
            "info": "bg-info",
            "success": "bg-success",
            "warning": "bg-warning",
            "danger": "bg-danger"
        }
        const defaultColorClass = "bg-info"

        const progressElement = progressRef.current as HTMLDivElement;
        const progressBarElement = progressBarRef.current as HTMLDivElement;
        
        progressElement.className = "progress"
        progressBarElement.className = "progress-bar"

        progressElement.classList.add(colorClass[color] ?? defaultColorClass);
        progressBarElement.classList.add(colorClass[color] ?? defaultColorClass);

        if(stripped) {
            progressElement.classList.add("progress-bar-striped");
        }
        if(animated) {
            progressElement.classList.add("progress-bar-animated");
        }
    },[color,stripped,animated])

    useEffect(()=> {
        const colorInfo: ColorInfo = {
            "primary": {
                begin: [144, 202, 249],
                end: [66, 165, 245]
            },
            "secondary": {
                begin: [227, 126, 255],
                end: [214, 67, 255]
            },
            "info": {
                begin: [144, 202, 249],
                end: [47, 162, 255]
            },
            "success": {
                begin: [47,198,128],
                end: [0,171,139]   
            },
            "warning": {
                begin: [255,193,7],
                end: [255,162,0]    
            },
            "danger": {
                begin: [255,149,160],
                end: [255,72,91]    
            }
        }
        
        const getCurColor = (currentPercentage: number):string => {
            let r,g,b = 0
            const [beginR, beginG, beginB] = colorInfo[color].begin ?? colorInfo.info.begin
            const [endR, endG, endB] = colorInfo[color].end ?? colorInfo.info.end
    
            r = Math.floor((endR - beginR)*(currentPercentage * 0.01))
            g = Math.floor((endG - beginG)*(currentPercentage * 0.01))
            b = Math.floor((endB - beginB)*(currentPercentage * 0.01))
    
            return `rgb(${beginR +r}, ${beginG +g}, ${beginB + b})`
        }

        const animateProgressBar = (duration: number) => {
            const startPercentage = curPercentage.current;
    
            const startTime = performance.now();
            const updatePercentage = (timestamp: number) => {
                const progressElement = progressRef.current as HTMLDivElement;
    
                const elapsed = timestamp - startTime;
                const progress = Math.min(elapsed / duration, 1);
    
                const currentPercentage = startPercentage + (targetPercentage.current - startPercentage) * progress;
    
                progressElement.style.width = currentPercentage + "%";
                if(colorChanging) {
                    progressElement.style.backgroundColor = getCurColor(currentPercentage)
                }
                curPercentage.current = currentPercentage
                
                if (progress < 1) {
                    requestAnimationFrame(updatePercentage);
                } else {
                    isAnimating.current = false
                }
            }
    
            requestAnimationFrame(updatePercentage);
        }

        if(value > maxValue) {
            targetPercentage.current = maxValue
        } else if (value < 0) {
            targetPercentage.current = 0
        } else {
            targetPercentage.current = value
        }

        if(!isAnimating.current) {
            isAnimating.current = true
            animateProgressBar(increaseDuration);
        }
    },[value,increaseDuration,isAnimating,maxValue,colorChanging,color])

    const getDivideCount = (): number[]  => {
        let arr = [];
        for (let i = 0; i < divideCount; i++) arr.push(i);
        return arr;
    };
    
    return (
        <div style={{ display: "flex" }}> 
            <div className="progress-bar-wrapper">
                <div ref={progressBarRef} className="progress-bar">
                    <div
                        ref={progressRef}
                        className="progress"
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