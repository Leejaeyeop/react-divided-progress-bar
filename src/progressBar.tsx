import "./progressBar.css";
import { useEffect, useRef, useMemo, forwardRef } from "react";
import { COLOR_CLASS, COLOR_INFO } from "./progressBarConfig";
import { clsx } from "clsx";

// 타입 정의
export type ProgressBarColor = (typeof COLOR_CLASS)[number];
export type ProgressBarProps = {
  value?: number;
  maxValue?: number;
  increaseDuration?: number;
  divide?: boolean;
  sections?: number;
  color?: ProgressBarColor;
  colorChange?: boolean;
  stripped?: boolean;
  animated?: boolean;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

export const ProgressBarStyle = {
  color: COLOR_CLASS,
};

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      value = 0,
      maxValue = 100,
      increaseDuration = 1000,
      color = "primary",
      colorChange = false,
      divide = true,
      sections = 2,
      animated = false,
      stripped = false,
      ...restProps
    },
    ref,
  ) => {
    // Refs
    const progressRef = useRef<HTMLDivElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<Animation | null>(null);

    // Validated values
    const normalizedSections = Math.max(1, sections);
    const clampedValue = Math.min(Math.max(value, 0), maxValue);
    const percentage = (clampedValue / maxValue) * 100;

    // Memoized values
    const sectionsArray = useMemo(() => Array.from({ length: normalizedSections }, (_, i) => i), [normalizedSections]);

    const progressBarClass = useMemo(() => clsx("progress-bar", `bg-${color}`), [color]);

    const progressClass = useMemo(
      () => clsx("progress", `bg-${color}`, stripped && "progress-bar-striped", animated && "progress-bar-animated"),
      [color, stripped, animated],
    );

    // Color calculation
    const calculateColor = useMemo(
      () => (currentPercentage: number) => {
        const colorInfo = COLOR_INFO[color in COLOR_INFO ? color : "primary"];
        const [beginR, beginG, beginB] = colorInfo.begin;
        const [endR, endG, endB] = colorInfo.end;

        const r = Math.floor((endR - beginR) * (currentPercentage / 100));
        const g = Math.floor((endG - beginG) * (currentPercentage / 100));
        const b = Math.floor((endB - beginB) * (currentPercentage / 100));

        return `rgb(${beginR + r}, ${beginG + g}, ${beginB + b})`;
      },
      [color],
    );

    // Animation logic
    useEffect(() => {
      if (!progressBarRef.current || !progressRef.current) return;

      const progressBarElement = progressBarRef.current;
      const progressElement = progressRef.current;

      // Calculate current progress
      const currentWidth = parseFloat(getComputedStyle(progressElement).width);
      const containerWidth = parseFloat(getComputedStyle(progressBarElement).width);
      const startPercentage = containerWidth > 0 ? (currentWidth / containerWidth) * 100 : 0;

      // Cancel previous animation
      if (animationRef.current) {
        animationRef.current.cancel();
      }

      // Create new animation
      animationRef.current = progressElement.animate(
        [
          {
            width: `${startPercentage}%`,
            backgroundColor: colorChange ? calculateColor(startPercentage) : undefined,
          },
          {
            width: `${percentage}%`,
            backgroundColor: colorChange ? calculateColor(percentage) : undefined,
          },
        ],
        {
          duration: Math.max(0, increaseDuration),
          easing: "ease-out",
          fill: "forwards",
        },
      );

      return () => {
        if (animationRef.current) {
          animationRef.current.cancel();
        }
      };
    }, [percentage, increaseDuration, colorChange, calculateColor]);

    return (
      <div ref={ref} className={clsx(className, "progress-bar-container")} {...restProps}>
        <div ref={progressBarRef} className={progressBarClass}>
          <div ref={progressRef} className={progressClass}>
            <div className="cur-progress-text">{clampedValue}%</div>
          </div>
          {divide && (
            <div className="divide-bar-container">
              {sectionsArray.slice(0, -1).map(i => (
                <div key={i} className="divide-bar" />
              ))}
            </div>
          )}
        </div>
        {divide && (
          <div className="divide-count">
            {sectionsArray.map(i => (
              <div key={i}>{Math.floor((maxValue / normalizedSections) * i)}</div>
            ))}
            <div>{maxValue}</div>
          </div>
        )}
      </div>
    );
  },
);

ProgressBar.displayName = "ProgressBar";

export default ProgressBar;
