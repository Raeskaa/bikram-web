import svgPaths from "./svg-2cggrsd44i";

interface FrameProps {
  onClick?: () => void;
}

export default function Frame({ onClick }: FrameProps) {
  return (
    <div 
      className="relative size-full cursor-pointer hover:opacity-80 transition-opacity"
      onClick={onClick}
      role="button"
      aria-label="Go to home"
    >
      <svg className="block size-full" fill="none" preserveAspectRatio="xMidYMid meet" viewBox="0 0 2919 404">
        <g id="Frame 9">
          <g id="Frame 7">
            <path d={svgPaths.p2e568a80} fill="var(--fill-0, #148D57)" id="Ellipse 64" />
            <circle cx="151.411" cy="177.839" fill="var(--fill-0, white)" id="Ellipse 62" r="67.7718" />
            <circle cx="431.147" cy="180.723" fill="var(--fill-0, white)" id="Ellipse 63" r="67.7718" />
            <path d={svgPaths.p3d6c5400} fill="var(--fill-0, #1AB16C)" id="Union" />
            <circle cx="150.956" cy="180.343" fill="var(--fill-0, black)" id="Ellipse 65" r="48.143" />
            <circle cx="426.762" cy="180.343" fill="var(--fill-0, black)" id="Ellipse 66" r="48.143" />
            <ellipse cx="156.668" cy="158.309" fill="var(--fill-0, white)" id="Ellipse 67" rx="16.3197" ry="8.15983" />
            <ellipse cx="420.945" cy="158.571" fill="var(--fill-0, white)" id="Ellipse 68" rx="16.3197" ry="8.15983" />
            <path d={svgPaths.pa787b00} id="Vector 23" stroke="var(--stroke-0, black)" strokeWidth="11.4238" />
          </g>
          <g id="Vector">
            <path d={svgPaths.p2d26ba00} fill="var(--fill-0, black)" />
            <path d={svgPaths.p1b167980} fill="var(--fill-0, black)" />
            <path d={svgPaths.p160fd5f0} fill="var(--fill-0, black)" />
            <path d={svgPaths.p9b5eb80} fill="black" />
            <path d={svgPaths.p39fe9580} fill="black" />
            <path d={svgPaths.p2c36ca80} fill="black" />
            <path d={svgPaths.p2e15fbc0} fill="black" />
            <path d={svgPaths.p35a0100} fill="black" />
            <path d={svgPaths.pe71bb80} fill="black" />
            <path d={svgPaths.p7fc800} fill="black" />
            <path d={svgPaths.pf6dd180} fill="black" />
            <path d={svgPaths.pbd63b80} fill="black" />
            <path d={svgPaths.p21626600} fill="black" />
            <path d={svgPaths.p3defc00} fill="var(--fill-0, black)" />
          </g>
        </g>
      </svg>
    </div>
  );
}