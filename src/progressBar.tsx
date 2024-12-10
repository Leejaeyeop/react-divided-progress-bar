import "./progressBar.css";
import { useEffect, useRef, useMemo, forwardRef } from "react";
import { COLOR_CLASS, COLOR_INFO } from "./progressBarConfig";
import { clsx } from "clsx";
import React from "react";

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

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps & React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
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
  sections = Math.max(sections, 1);

  const progressRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);

  const getSections = useMemo((): number[] => {
    return Array.from({ length: sections }, (_, i) => i);
  }, [sections]);

  const getProgressBarClass = useMemo(() => clsx("progress-bar", `bg-${color}`), [color]);
  const getProgressClass = useMemo(
    () => clsx("progress", `bg-${color}`, stripped && "progress-bar-striped", animated && "progress-bar-animated"),
    [color, stripped, animated],
  );

  useEffect(() => {
    const progressAnimation: KeyframeAnimationOptions = {
      duration: 1,
      easing: "ease-out",
      fill: "forwards",
      iterations: 1,
    };

    const getCurColor = (currentPercentage: number): string => {
      const [beginR, beginG, beginB] = COLOR_INFO[color]?.begin || COLOR_INFO.primary.begin;
      const [endR, endG, endB] = COLOR_INFO[color]?.end || COLOR_INFO.primary.end;
      const r = Math.floor((endR - beginR) * (currentPercentage * 0.01));
      const g = Math.floor((endG - beginG) * (currentPercentage * 0.01));
      const b = Math.floor((endB - beginB) * (currentPercentage * 0.01));
      return `rgb(${beginR + r}, ${beginG + g}, ${beginB + b})`;
    };

    const animateProgressBar = (duration: number) => {
      const progressBarElement = progressBarRef.current!;
      const progressElement = progressRef.current!;
      const startPercentage =
        (parseInt(getComputedStyle(progressElement).getPropertyValue("width")) / parseInt(getComputedStyle(progressBarElement).getPropertyValue("width"))) *
        100;

      progressElement.animate(
        [
          { width: startPercentage + "%", backgroundColor: colorChange ? getCurColor(startPercentage) : undefined },
          { width: targetPercentage.current + "%", backgroundColor: colorChange ? getCurColor(targetPercentage.current) : undefined },
        ],
        {
          ...progressAnimation,
          duration,
        },
      );
    };

    targetPercentage.current = Math.min(Math.max(value, 0), maxValue);
    animateProgressBar(increaseDuration >= 0 ? increaseDuration : 0);
  }, [value, increaseDuration, maxValue, colorChange, color]);

  return (
    <div ref={ref} className={clsx(className, "progress-bar-container")}>
      <div ref={progressBarRef} className={getProgressBarClass}>
        <div ref={progressRef} className={getProgressClass}>
          <div className="cur-progress-text">{value}%</div>
        </div>
        {divide && (
          <div className="divide-bar-container">
            {getSections.map(i => (i < sections - 1 ? <div key={i} className="divide-bar"></div> : <div key={i}></div>))}
          </div>
        )}
      </div>
      {divide && (
        <div className="divide-count">
          {getSections.map(i => (
            <div key={i}>{((maxValue / sections) * i).toFixed(0)}</div>
          ))}
          <div>{maxValue}</div>
        </div>
      )}
    </div>
  );
});

export default ProgressBar;
