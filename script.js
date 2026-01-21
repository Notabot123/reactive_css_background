/* -----------------------------------------------------------
   INPUT LISTENER (debounced)
   ----------------------------------------------------------- */

document.getElementById("textInput").addEventListener("input", (e) => {
    debouncedSentiment(e.target.value);
});


/* -----------------------------------------------------------
   DEBOUNCE FUNCTION
   Waits until user stops typing before calling backend
   ----------------------------------------------------------- */

function debounce(fn, delay = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

const debouncedSentiment = debounce(async (text) => {
    const sentiment = await getSentiment(text);

    if (sentiment !== null) {
        smoothSentimentUpdate(sentiment);
        rippleFromInput();
    }
}, 300);


/* -----------------------------------------------------------
   BACKEND SENTIMENT CALL
   ⚠️ THIS IS WHERE YOU WILL SWITCH FROM RANDOM → REAL API
   ----------------------------------------------------------- */

async function getSentiment(text) {

    /*  
        🔄 CURRENT BEHAVIOUR (demo mode)
        Generates a random sentiment between -1 and +1.
        Replace this block with your real API call later.
    */

    // -------------------------------
    // DEMO MODE — REMOVE LATER
    // -------------------------------
    return Math.random() * 2 - 1;



    /*  
        ✅ REAL API CALL (uncomment when ready)

    try {
        const response = await fetch("/api/sentiment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        return data.sentiment;   // adjust key if needed
    } catch (err) {
        console.error("Sentiment API error:", err);
        return null;
    }

    */

}


/* -----------------------------------------------------------
   SENTIMENT SMOOTHING (moving average)
   Makes transitions less jumpy
   ----------------------------------------------------------- */

let sentimentHistory = [];
const SMOOTHING_WINDOW = 4;

function smoothSentimentUpdate(newValue) {
    sentimentHistory.push(newValue);

    if (sentimentHistory.length > SMOOTHING_WINDOW) {
        sentimentHistory.shift();
    }

    const avg =
        sentimentHistory.reduce((a, b) => a + b, 0) /
        sentimentHistory.length;

    applySentimentColor(avg);
}


/* -----------------------------------------------------------
   APPLY SENTIMENT COLOR
   Converts sentiment → color and updates CSS variable
   ----------------------------------------------------------- */

function applySentimentColor(sentiment) {
    // Smooth gradient from red → green
    const t = (sentiment + 1) / 2; // convert -1..1 → 0..1

    const r = Math.round(255 * (1 - t));
    const g = Math.round(255 * t);
    const b = 80;

    const color = `rgb(${r}, ${g}, ${b})`;

    document.documentElement.style.setProperty("--sentiment-color", color);
}


/* -----------------------------------------------------------
   RIPPLE EFFECT (from input field)
   ----------------------------------------------------------- */

function rippleFromInput() {
    const input = document.getElementById("textInput");
    const rect = input.getBoundingClientRect();

    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    spawnRipple(x, y);
}

function spawnRipple(x, y) {
    const ripple = document.createElement("div");
    ripple.className = "ripple-spot";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";

    document.body.appendChild(ripple);

    setTimeout(() => ripple.remove(), 1000);
}
