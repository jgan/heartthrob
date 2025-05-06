const fs = require('fs');
const path = require('path');
const csv = require('csv-parse/sync');

const { app } = require('electron')

class Config {
    constructor(configPath = './config/default') {
        this.configPath = path.resolve(configPath);
        this.hunks = [];
        this.descriptors = [];
        this.validImageExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
        this.load();
    }

    load() {
        this.loadHunks();
        this.loadDescriptors();
    }

    loadHunks() {
        const hunksDir = path.join(this.configPath, 'hunks');
        const files = fs.readdirSync(hunksDir);
        
        this.hunks = files
            .filter(file => this.validImageExtensions.includes(path.extname(file).toLowerCase()))
            .map(file => ({
                name: path.basename(file, path.extname(file)),
                imagePath: `config://hunks/${file}`
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

    getHunks() {
        return this.hunks;
    }

    getDescriptors(category) {
        return category ? this.descriptors[category] : this.descriptors;
    }
}

module.exports = Config;
