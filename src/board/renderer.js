const gameContainer = document.getElementById('game-container');

const displaySuitors = (suitors) => {
    try {
        console.log('Displaying suitors:', suitors);
        const suitorHTML = suitors.map(suitor => {
            try {
                console.log('Loading image for suitor:', suitor.card.name, 'path:', suitor.card.imagePath);
                return `
                    <div class="suitor-column">
                        <div class="boyfriend-card">
                            <div class="card-inner flipped" onclick="this.classList.toggle('flipped')">
                                <div class="card-front">
                                    <img src="app://${suitor.card.imagePath}" alt="${suitor.card.name}">
                                </div>
                                <div class="card-back">
                                </div>
                            </div>
                        </div>
                        <div class="descriptors">
                            ${Object.entries(suitor.descriptors).map(([category, descriptor]) => `
                                <div class="descriptor">
                                    <div class="descriptor-inner flipped" onclick="this.classList.toggle('flipped')">
                                        <div class="descriptor-front">
                                            <div>
                                                <strong>${category}:</strong><br>
                                                ${descriptor.text}
                                            </div>
                                        </div>
                                        <div class="descriptor-back"
                                            style="background-image: url('app:///Users/jgan/src/heart-throb-electron/config/default/card-backs/${descriptor.color}.png');">
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error processing suitor:', suitor.card.name, error);
                return null;
            }
        }).filter(html => html !== null);

        if (suitorHTML.length === 0) {
            throw new Error('No valid suitor HTML generated');
        }

        gameContainer.innerHTML = suitorHTML.join('');
    } catch (error) {
        console.error('Error displaying suitors:', error);
        gameContainer.innerHTML = '<p>Error loading suitors</p>';
    }
};

// Initialize the game when the page loads
window.versions.newGame().then(displaySuitors).catch(error => {
    console.error('Failed to start new game:', error);
    gameContainer.innerHTML = '<p>Error starting new game</p>';
});

// Add event listener for new game button
document.getElementById('new-game').addEventListener('click', () => {
    window.versions.newGame().then(displaySuitors).catch(error => {
        console.error('Failed to start new game:', error);
        gameContainer.innerHTML = '<p>Error starting new game</p>';
    });
});
