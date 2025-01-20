import { useState } from "react"

const containerStyle = {
    display: "flex",
    flexDirection: "row",
    gap: "16px",
    fontSize: "2rem",
    position: "relative"
}

const starContainerStyle = {
    display: "flex",
}

export default function ControlledStarRating({
    maxRating = 5, rated_fill = "#FA0",
    rated_stroke = "D90", not_rated_fill = "#222",
    not_rated_stroke = "#111", size = "20px",
    messages = [], defaultRating = 1, className = "",
    onSetRating }) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(1);

    function handleRating(rating) {
        setRating(rating);
        onSetRating(rating);
    }

    return (
        <main style={containerStyle}>
            {/* <p style={{color: }} >{messages.length == maxRating ? messages[tempRating ? tempRating - 1 : rating - 1] : tempRating || rating || ""}</p> */}
            <p className="star-rating-text" style={{ color: ((messages.length == maxRating) ? messages[tempRating ? tempRating - 1 : rating - 1].color : "violet") }} >
                {messages.length == maxRating ? messages[tempRating ? tempRating - 1 : rating - 1].msg : tempRating || rating || ""}
            </p>
            <div style={starContainerStyle}>
                {Array.from({ length: maxRating }, (_, i) => (<Star key={i}
                    fill={i + 1 <= ((tempRating) || (rating)) ? "gold" : "#333"}
                    stroke={i + 1 <= ((tempRating) || (rating)) ? "goldenrod" : "#222"}
                    size={size}
                    onRate={() => handleRating(i + 1)}
                    onHoverIn={() => setTempRating(i + 1)}
                    onHoverOut={() => setTempRating(0)}
                />))}
            </div>
        </main>
    )
}

function Star({ onRate, onHoverIn, onHoverOut, fill, stroke, size }) {
    const starStyle = {
        width: size,
        height: size,
        display: "block",
        cursor: "pointer",
    }

    return (
        <span role="button" style={starStyle}
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill={fill}
                stroke={stroke}
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07
                3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8
                2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54
                1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1
                1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        </span>
    )
}
