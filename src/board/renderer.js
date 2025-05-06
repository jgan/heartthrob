// Game state management
const gameContainer = document.getElementById('game-container');

const renderHunks = (hunks) => {
    try {
        console.log('Displaying hunks:', hunks);
        const hunkHTML = hunks.map(hunk => {
            try {
                console.log('Loading image for hunk:', hunk.card.name, 'path:', hunk.card.imagePath);
                return `
                    <div class="hunk-column">
                        <div class="boyfriend-card" data-controller="card">
                            <div class="card-inner" data-card-target="card" data-action="click->card#flip">
                                <div class="card-front" data-card-target="front">
                                    <img src="${hunk.card.imagePath}" alt="${hunk.card.name}">
                                </div>
                                <div class="card-back" data-card-target="back">
                                </div>
                            </div>
                        </div>
                        <div class="descriptors">
                            ${Object.entries(hunk.descriptors).map(([category, descriptor]) => `
                                <div class="descriptor" data-controller="card">
                                    <div class="card-inner" data-card-target="card" data-action="click->card#flip">
                                        <div class="card-front" data-card-target="front">
                                            <div>
                                                ${descriptor.text}
                                            </div>
                                        </div>
                                        <div class="card-back" data-card-target="back"
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

// IPC Event Handlers
const setupIpcHandlers = () => {
    // Listen for game updates from the main process
    window.versions.onGameUpdated((hunks) => {
        renderHunks(hunks);
    });
};

// Initialize the game
const initializeGame = async () => {
    try {
        const hunks = await window.versions.getHunks();
        renderHunks(hunks);
    } catch (error) {
        console.error('Error initializing game:', error);
        gameContainer.innerHTML = '<p>Error initializing game</p>';
    }
};

// Start the application
setupIpcHandlers();
initializeGame();
