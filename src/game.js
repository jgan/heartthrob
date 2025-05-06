class Hunk {
    constructor(card, descriptors) {
        this.card = card;
        this.descriptors = descriptors;
    }
}

class Game {
    constructor(config) {
        this.config = config;
        this.hunks = [];
        this.initialize();
    }

    initialize() {
        // Get all descriptors
        const descriptors = this.config.getDescriptors();
        
        // Shuffle descriptors for each category
        const shuffledDescriptors = {};
        for (const [category, categoryDescriptors] of Object.entries(descriptors)) {
            shuffledDescriptors[category] = [...categoryDescriptors].sort(() => Math.random() - 0.5);
        }

        // Create three hunks
        const cards = this.config.getHunks();
        const shuffledCards = [...cards].sort(() => Math.random() - 0.5).slice(0, 3);

        for (const card of shuffledCards) {
            const hunkDescriptors = {};
            
            // Assign one descriptor from each category
            for (const category of Object.keys(descriptors)) {
                hunkDescriptors[category] = shuffledDescriptors[category][0];
                shuffledDescriptors[category].shift(); // Remove used descriptor
            }

            this.hunks.push(new Hunk(card, hunkDescriptors));
        }
    }

    getHunks() {
        return this.hunks;
    }
}

module.exports = Game; 
