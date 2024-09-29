const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;  // Use PORT from environment variable or default to 3000

app.use(express.json());

const filePath = './url.json';  // The JSON file where the URL will be stored

// Read URL from the file (or use a default if the file doesn't exist)
const readUrlFromFile = () => {
    if (fs.existsSync(filePath)) {
        const data = fs.readFileSync(filePath, 'utf8');
        const parsedData = JSON.parse(data);
        return parsedData.url;
    }
    return 'https://example.com';  // Default URL if the file is not found
};

// Write a URL to the file
const writeUrlToFile = (url) => {
    const data = JSON.stringify({ url });
    fs.writeFileSync(filePath, data);
};

// GET request to return the stored URL
app.get('/', (req, res) => {
    const storedUrl = readUrlFromFile();
    res.send({ url: storedUrl });
});

// POST request to update the URL
app.post('/update', (req, res) => {
    const { url } = req.body;

    if (url) {
        writeUrlToFile(url);
        res.send({ message: 'URL updated successfully', url });
    } else {
        res.status(400).send({ message: 'Invalid request: URL is required' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
