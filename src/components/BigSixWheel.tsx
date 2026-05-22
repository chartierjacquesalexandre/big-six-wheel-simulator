import type { WheelSlice } from "../data/defaultWheel";
import { buildStopArray, type WheelStop } from "../utils/spinWheel";

type Props = {
  wheel: WheelSlice[];
  stopOrder?: string[];
  rotation: number;
  isSpinning: boolean;
  lastResult?: WheelStop;
};

const polarToCartesian = (cx: number, cy: number, r: number, angle: number) => {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(radians),
    y: cy + r * Math.sin(radians),
  };
};

const describeWedge = (startAngle: number, endAngle: number, outer = 210, inner = 112) => {
  const startOuter = polarToCartesian(250, 250, outer, endAngle);
  const endOuter = polarToCartesian(250, 250, outer, startAngle);
  const startInner = polarToCartesian(250, 250, inner, startAngle);
  const endInner = polarToCartesian(250, 250, inner, endAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;

  return [
    `M ${startOuter.x} ${startOuter.y}`,
    `A ${outer} ${outer} 0 ${largeArc} 0 ${endOuter.x} ${endOuter.y}`,
    `L ${startInner.x} ${startInner.y}`,
    `A ${inner} ${inner} 0 ${largeArc} 1 ${endInner.x} ${endInner.y}`,
    "Z",
  ].join(" ");
};

export function BigSixWheel({
  wheel,
  stopOrder,
  rotation,
  isSpinning,
  lastResult,
}: Props) {
  const stops = buildStopArray(wheel, stopOrder);
  const anglePerStop = stops.length > 0 ? 360 / stops.length : 0;

  return (
    <section className="panel xl:col-span-2">
      <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <p className="eyebrow">54-stop weighted wheel</p>
          <h2 className="section-title">Live wheel</h2>
        </div>
        {isSpinning && <span className="spin-state">Spinning</span>}
      </div>

      <div className="wheel-stage">
          <div className="pointer" />
          <svg
            className="wheel-svg"
            viewBox="0 0 500 500"
            role="img"
            aria-label="Big Six wheel with 54 weighted stops"
            style={{ transform: `rotate(${rotation}deg)` }}
          >
            <defs>
              <radialGradient id="wheelFace" cx="50%" cy="42%" r="58%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="68%" stopColor="#f8f0cf" />
                <stop offset="100%" stopColor="#c8b46c" />
              </radialGradient>
              <radialGradient id="wheelHub" cx="50%" cy="42%" r="65%">
                <stop offset="0%" stopColor="#19212f" />
                <stop offset="68%" stopColor="#080b12" />
                <stop offset="100%" stopColor="#000000" />
              </radialGradient>
              <filter id="softGlow">
                <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#f8d568" floodOpacity="0.45" />
              </filter>
            </defs>
            <circle cx="250" cy="250" r="242" fill="#030406" />
            <circle cx="250" cy="250" r="229" fill="#111827" />
            <circle cx="250" cy="250" r="216" fill="url(#wheelFace)" filter="url(#softGlow)" />
            {stops.map((stop, index) => {
              const start = index * anglePerStop;
              const end = start + anglePerStop;
              const mid = start + anglePerStop / 2;
              const outerTextPoint = polarToCartesian(250, 250, 188, mid);
              const innerTextPoint = polarToCartesian(250, 250, 142, mid);
              const accentPoint = polarToCartesian(250, 250, 104, mid);
              const badgeRotation = mid + 90;
              const textRotation = badgeRotation - 90;
              const isLast = lastResult?.id === stop.id;
              const display = stop.label === "Flag" ? "50" : stop.label === "Joker" ? "50" : stop.label;
              const isWideDisplay = display.length > 1;

              return (
                <g key={`${stop.id}-${index}`}>
                  <path
                    d={describeWedge(start, end, 216, 164)}
                    fill={stop.color}
                    stroke="#0b1020"
                    strokeWidth={isLast ? 3 : 1.2}
                    opacity={isLast ? 1 : 0.92}
                  />
                  <path
                    d={describeWedge(start, end, 160, 116)}
                    fill={stop.color === "#ffffff" ? "#eef2f7" : stop.color}
                    stroke={stop.color === "#ffffff" ? "#cbd5e1" : "#ffffff"}
                    strokeOpacity="0.45"
                    strokeWidth="1"
                    opacity="0.82"
                  />
                  <rect
                    x={outerTextPoint.x - (isWideDisplay ? 19 : 16)}
                    y={outerTextPoint.y - 10}
                    width={isWideDisplay ? 38 : 32}
                    height="20"
                    rx="10"
                    fill="#111111"
                    stroke="#f8fafc"
                    strokeWidth="2"
                    transform={`rotate(${badgeRotation} ${outerTextPoint.x} ${outerTextPoint.y})`}
                  />
                  <text
                    x={outerTextPoint.x}
                    y={outerTextPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${textRotation} ${outerTextPoint.x} ${outerTextPoint.y})`}
                    className={`wheel-label wheel-label-outer ${isWideDisplay ? "wheel-label-wide" : ""}`}
                    fill="#ffffff"
                  >
                    {display}
                  </text>
                  <text
                    x={innerTextPoint.x}
                    y={innerTextPoint.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${badgeRotation} ${innerTextPoint.x} ${innerTextPoint.y})`}
                    className="wheel-label wheel-label-inner"
                    fill={stop.color === "#ffffff" ? "#111827" : "#f8fafc"}
                  >
                    {stop.label === "Flag" ? "FLAG" : stop.label === "Joker" ? "JOKER" : stop.label}
                  </text>
                  <rect
                    x={accentPoint.x - 5}
                    y={accentPoint.y - 11}
                    width="10"
                    height="22"
                    rx="2"
                    fill={stop.color}
                    transform={`rotate(${badgeRotation} ${accentPoint.x} ${accentPoint.y})`}
                  />
                </g>
              );
            })}
            <circle cx="250" cy="250" r="110" fill="rgba(4,7,12,0.35)" stroke="#111827" strokeWidth="8" />
            <circle cx="250" cy="250" r="94" fill="none" stroke="#f8fafc" strokeDasharray="2 4" strokeOpacity="0.35" strokeWidth="8" />
            <circle cx="250" cy="250" r="76" fill="url(#wheelHub)" stroke="#f1c451" strokeWidth="2" />
            <text x="250" y="240" textAnchor="middle" className="wheel-center-title">
              BIG SIX
            </text>
            <text x="250" y="270" textAnchor="middle" className="wheel-center-subtitle">
              {stops.length} STOPS
            </text>
          </svg>
      </div>
    </section>
  );
}
