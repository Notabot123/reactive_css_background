// Update sentiment and ripple on each keystroke
document.getElementById("textInput").addEventListener("input", () => {
    updateSentiment();
    rippleFromInput();
});

// Simple demo sentiment generator
function updateSentiment() {
    const sentiment = Math.random() * 2 - 1;
    const color = sentiment > 0 ? "#00ff7b" : "#ff3333";

    document.documentElement.style.setProperty('--sentiment-color', color);
}

// Create a ripple at the input field's center
function rippleFromInput() {
    const input = document.getElementById("textInput");
    const rect = input.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    spawnRipple(x, y);
}

// Create and animate a ripple element
function spawnRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-spot";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1000);
}
