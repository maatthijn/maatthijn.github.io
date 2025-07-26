import "../css/index.css";

export default function LoadingScreen() {
    return (
        <div className="loading-container d-flex flex-column align-items-center justify-content-center min-vh-100">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 400 100"
                fill="none"
                stroke="url(#grad)"
                strokeWidth="1"
            >
                <defs>
                    <linearGradient id="grad" x1="0" y1="0" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#ff8a00" />
                        <stop offset="100%" stopColor="#e52e71" />
                    </linearGradient>
                </defs>

                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="'Mrs Saint Delafield', cursive"
                    className="responsive-text"
                >
                    <tspan className="animated-letter delay-0">M</tspan>
                    <tspan className="animated-letter delay-1">a</tspan>
                    <tspan className="animated-letter delay-2">t</tspan>
                    <tspan className="animated-letter delay-3">t</tspan>
                    <tspan className="animated-letter delay-4">h</tspan>
                    <tspan className="animated-letter delay-5">i</tspan>
                    <tspan className="animated-letter delay-6">j</tspan>
                    <tspan className="animated-letter delay-7">n</tspan>
                </text>
            </svg>
        </div>
    )
};