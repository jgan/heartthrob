class Suitor {
    constructor(card, descriptors) {
        this.card = card;
        this.descriptors = descriptors;
    }
}

class Game {
    constructor(config) {
        this.config = config;
        this.suitors = [];
        this.initialize();
    }

    initialize() {
        // Get all available resources
        const cards = this.config.getBoyfriendCards();
        const descriptors = this.config.getDescriptors();
        
        // Shuffle arrays to randomize selection
        const shuffledCards = this.shuffleArray([...cards]);
        const shuffledDescriptors = {};
        
        // Shuffle descriptors for each category
        Object.keys(descriptors).forEach(category => {
            shuffledDescriptors[category] = this.shuffleArray([...descriptors[category]]);
        });

        // Create three suitors
        for (let i = 0; i < 3; i++) {
            // Select a unique card
            const card = shuffledCards[i];
            
            // Select one descriptor from each category
            const suitorDescriptors = {};
            Object.keys(descriptors).forEach(category => {
                // Get the next available descriptor for this category
                suitorDescriptors[category] = shuffledDescriptors[category][i];
            });

            this.suitors.push(new Suitor(card, suitorDescriptors));
        }
    }

    // Fisher-Yates shuffle algorithm
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    getSuitors() {
        return this.suitors;
    }
}

module.exports = Game; 
