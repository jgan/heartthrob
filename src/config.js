const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

class Config {
    constructor(configPath = './config/default') {
        this.configPath = path.resolve(configPath);
        this.boyfriendCards = [];
        this.descriptors = [];
        this.load();
    }

    load() {
        this.loadBoyfriendCards();
        this.loadDescriptors();
    }

    loadBoyfriendCards() {
        const cardsDir = path.join(this.configPath, 'boyfriend-cards');
        const files = fs.readdirSync(cardsDir);
        
        this.boyfriendCards = files
            .filter(file => file.endsWith('.png'))
            .map(file => ({
                name: path.basename(file, '.png'),
                imagePath: path.join(cardsDir, file)
            }));
    }

    loadDescriptors() {
        const descriptorsPath = path.join(this.configPath, 'descriptors.csv');
        const content = fs.readFileSync(descriptorsPath, 'utf-8');
        
        const records = csv.parse(content, {
            columns: true,
            skip_empty_lines: true
        });

        // Group descriptors by category
        this.descriptors = records.reduce((acc, record) => {
            const category = record.CATEGORY;
            if (!acc[category]) {
                acc[category] = [];
            }
            acc[category].push({
                color: record.COLOR,
                category: record.CATEGORY,
                number: record.Nunmber,
                text: record.TEXT,
                source: record['WHO WROTE']
            });
            return acc;
        }, {});
    }

    getBoyfriendCards() {
        return this.boyfriendCards;
    }

    getDescriptors(category) {
        return category ? this.descriptors[category] : this.descriptors;
    }
}

module.exports = Config;
