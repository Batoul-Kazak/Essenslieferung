import { useState } from "react"

export default function TextExpander({
    revealTextColor = "green",
    hideTextColor = "blue", textClassName = "",
    revealText = "Show text", hideText = "Collapse text",
    text1 = "text1", children,
    onSetShowText, defaultTextState = false,

}) {
    const [showText, setShowText] = useState(defaultTextState);

    function handleToggle() {
        setShowText(showText => !showText);
        onSetShowText(showText => !showText);
    }

    return (
        <section>
            <div style={{ display: "flex", gap: "3px" }}>
                <p className={textClassName}>{text1} {showText && children}
                    <span style={{ fontWeight: "bold", marginLeft: "3px", cursor: "pointer", color: showText ? revealTextColor : hideTextColor }}
                        onClick={() => handleToggle(showText)}
                    >{showText ? hideText : revealText}</span>
                </p>
            </div>
        </section>
    );
}