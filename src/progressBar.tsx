import "./progressBar.css"
import React, {useEffect} from "react";

export default function ProgressBar(props: any) {
    const { curProgress = 0, increaseDuration = 1000, divideCount = 0, color, divide, numToRight, maxProgress = 100} = props;

    useEffect(()=> {
        console.log("실행")
        animateProgressBar(curProgress, increaseDuration);
    },[curProgress])

    const getDivideCount = () => {
        let arr = [];
        for (let i = 0; i < divideCount; i++) arr.push(i);
        return arr;
    };

    const percentageRef = React.createRef<HTMLDivElement>();
    
    function animateProgressBar(targetPercentage: number, duration: number) {
        const percentageElement = percentageRef.current as HTMLDivElement;
        percentageElement.style.backgroundColor = color;
        const startPercentage = 0;

        const startTime = performance.now();
        function updatePercentage(timestamp: number) {
            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentPercentage = startPercentage + (targetPercentage - startPercentage) * progress;

            percentageElement.style.width = currentPercentage + "%";

            if (progress < 1) {
                requestAnimationFrame(updatePercentage);
            }
        }
        requestAnimationFrame(updatePercentage);
    }

    
    return (
        <div style={{ display: "flex" }}> 
            <div className="progress-bar-wrapper">
                <div className="progress-bar">
                    <div
                        ref={percentageRef}
                        className="percentage"
                    ></div>
                </div>
                {/* <div
                    class="divide-count"
                    v-if="divide"
                >
                    <div
                        v-for="index in getDivideCount"
                        :key="index"
                    >
                        {{ (maxProgress / divideCount) * index }}
                    </div>
                    <div>{{ maxProgress }}</div>
                </div> */}
            </div>
            {
                numToRight ? 
                <div
                className="cur-progress"
                >
                    { curProgress }%
                </div> : null
            }

        </div>
    )
}