const gameContainer = document.getElementById('game-container');

const renderHunks = (hunks) => {
    try {
        console.log('Displaying hunks:', hunks);
        const hunkHTML = hunks.map(hunk => {
            try {
                console.log('Loading image for hunk:', hunk.card.name, 'path:', hunk.card.imagePath);
                return `
                    <div class="hunk-column">
                        <div class="boyfriend-card">
                            <div class="card-inner flipped" onclick="this.classList.toggle('flipped')">
                                <div class="card-front">
                                    <img src="${hunk.card.imagePath}" alt="${hunk.card.name}">
                                </div>
                                <div class="card-back">
                                </div>
                            </div>
                        </div>
                        <div class="descriptors">
                            ${Object.entries(hunk.descriptors).map(([category, descriptor]) => `
                                <div class="descriptor">
                                    <div class="descriptor-inner flipped" onclick="this.classList.toggle('flipped')">
                                        <div class="descriptor-front">
                                            <div>
                                                <strong>${category}:</strong><br>
                                                ${descriptor.text}
                                            </div>
                                        </div>
                                        <div class="descriptor-back"
                                            style="background-image: url('config://card-backs/${descriptor.color}.png');">
                                        </div>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
            } catch (error) {
                console.error('Error processing hunk:', hunk.card.name, error);
                return null;
            }
        }).filter(html => html !== null);

        if (hunkHTML.length === 0) {
            throw new Error('No valid hunk HTML generated');
        }

        gameContainer.innerHTML = hunkHTML.join('');
    } catch (error) {
        console.error('Error displaying hunks:', error);
        gameContainer.innerHTML = '<p>Error loading hunks</p>';
    }
};

// Listen for game updates from the main process
window.versions.onGameUpdated((hunks) => {
  renderHunks(hunks);
});

// Initial render
// window.versions.newGame();
window.versions.getHunks().then(hunks => {
    renderHunks(hunks);
  });
