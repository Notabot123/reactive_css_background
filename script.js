// Simple demo sentiment function
// Replace this with your backend call when ready
function updateSentiment() {
    // Generate a random sentiment between -1 and +1
    const sentiment = Math.random() * 2 - 1;

    // Choose red for negative, green for positive
    const color = sentiment > 0 ? "#00ff7b" : "#ff3333";

    // Update the CSS variable controlling the gradient
    document.documentElement.style.setProperty('--sentiment-color', color);

    // Restart ripple animation
    document.body.classList.remove('ripple');

    // Force reflow so animation can restart
    void document.body.offsetWidth;

    // Add ripple class to trigger animation
    document.body.classList.add('ripple');
}
