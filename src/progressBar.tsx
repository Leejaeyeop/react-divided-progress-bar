"use client";
import "./progressBar.css";
import { useEffect, useRef, useMemo, forwardRef } from "react";
import { COLOR_CLASS, COLOR_INFO } from "./progressBarConfig";

export type ProgressBarProps = {
  value?: number;
  maxValue?: number;
  increaseDuration?: number;
  divide?: boolean;
  sections?: number;
  color?: (typeof COLOR_CLASS)[number];
  colorChange?: boolean;
  stripped?: boolean;
  animated?: boolean;
};

export const ProgressBarStyle = {
  color: COLOR_CLASS,
};

const ProgressBar = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ProgressBarProps
>(({ className, ...props }, ref) => {
  const targetPercentage = useRef(0);

  const {
    value = 0,
    increaseDuration = 1000,
    color = "primary",
    colorChange = false,
    divide = true,
    maxValue = 100,
    animated = false,
    stripped = false,
  } = props;
  let { sections = 2 } = props;
  if (sections < 1) {
    sections = 1;
  }

  const getSections = useMemo((): number[] => {
    let arr = [];
    for (let i = 0; i < sections; i++) arr.push(i);
    return arr;
  }, [sections]);

  const progressRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const progressElement = progressRef.current as HTMLDivElement;
    const progressBarElement = progressBarRef.current as HTMLDivElement;

    progressElement.className = "progress";
    progressBarElement.className = "progress-bar";

    progressElement.classList.add(`bg-${color}`);
    progressBarElement.classList.add(`bg-${color}`);

    if (stripped) {
      progressElement.classList.add("progress-bar-striped");
    }
    if (animated) {
      progressElement.classList.add("progress-bar-animated");
    }
  }, [color, stripped, animated]);

  useEffect(() => {
    const progressAnimation: KeyframeAnimationOptions = {
      duration: 1,
      easing: "ease-out",
      fill: "forwards",
      iterations: 1,
    };

    const getCurColor = (currentPercentage: number): string => {
      let r,
        g,
        b = 0;
      const [beginR, beginG, beginB] =
        color in COLOR_INFO
          ? COLOR_INFO[color].begin
          : COLOR_INFO.primary.begin;
      const [endR, endG, endB] =
        color in COLOR_INFO ? COLOR_INFO[color].end : COLOR_INFO.primary.end;

      r = Math.floor((endR - beginR) * (currentPercentage * 0.01));
      g = Math.floor((endG - beginG) * (currentPercentage * 0.01));
      b = Math.floor((endB - beginB) * (currentPercentage * 0.01));

      return `rgb(${beginR + r}, ${beginG + g}, ${beginB + b})`;
    };

    const animateProgressBar = (duration: number) => {
      const progressBarElement = progressBarRef.current as HTMLDivElement;
      const progressElement = progressRef.current as HTMLDivElement;
      const startPercentage =
        (parseInt(getComputedStyle(progressElement).getPropertyValue("width")) /
          parseInt(
            getComputedStyle(progressBarElement).getPropertyValue("width")
          )) *
        100;
      progressElement.animate(
        [
          {
            width: startPercentage + "%",
            backgroundColor: colorChange
              ? getCurColor(startPercentage)
              : undefined,
          },
          {
            width: targetPercentage.current + "%",
            backgroundColor: colorChange
              ? getCurColor(targetPercentage.current)
              : undefined,
          },
        ],
        {
          ...progressAnimation,
          duration,
        }
      );
    };

    if (value > maxValue) {
      targetPercentage.current = maxValue;
    } else if (value < 0) {
      targetPercentage.current = 0;
    } else {
      targetPercentage.current = value;
    }

    animateProgressBar(increaseDuration >= 0 ? increaseDuration : 0);
  }, [value, increaseDuration, maxValue, colorChange, color]);

  return (
    <div ref={ref} className={[className, "progress-bar-container"].join(" ")}>
      <div ref={progressBarRef} className="progress-bar">
        <div ref={progressRef} className="progress">
          <div className="cur-progress-text">{value}%</div>
        </div>
        {divide ? (
          <div className="divide-bar-container">
            {getSections.map((i) =>
              i < sections - 1 ? (
                <div key={i} className="divide-bar"></div>
              ) : (
                <div key={i}></div>
              )
            )}
          </div>
        ) : null}
      </div>
      {divide ? (
        <div className="divide-count">
          {getSections.map((i) => (
            <div key={i}>{((maxValue / sections) * i).toFixed(0)}</div>
          ))}
          <div>{maxValue}</div>
        </div>
      ) : null}
    </div>
  );
});

export default ProgressBar;
