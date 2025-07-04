const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
//const PORT = process.env.PORT || 5000;

// Enable CORS if needed (for frontend-backend separation)
app.use(cors());

// Serve frontend files
app.use(express.static('public'));

// Serve music folders and cover images
app.use('/songs', express.static(path.join(__dirname, 'songs')));

// API: Get all playlist folder names
app.get('/api/playlists', (req, res) => {
    const folders = fs.readdirSync('./songs', { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    res.json(folders);
});

// API: Get all .mp3 files from a playlist folder
app.get('/api/songs/:folder', (req, res) => {
    const folderPath = path.join(__dirname, 'songs', req.params.folder);
    if (!fs.existsSync(folderPath)) return res.status(404).send("Folder not found");

    const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.mp3'));
    res.json(files);
});

// API: Get album metadata (info.json)
app.get('/api/info/:folder', (req, res) => {
    const infoPath = path.join(__dirname, 'songs', req.params.folder, 'info.json');
    if (!fs.existsSync(infoPath)) return res.status(404).send("Info not found");

    try {
        const data = fs.readFileSync(infoPath, 'utf-8');
        res.json(JSON.parse(data));
    } catch (err) {
        res.status(500).send("Invalid JSON format");
    }
});

//Start the server
app.listen(PORT, () => {
   console.log(`✅ Server running at http://localhost:${PORT}`);
});

/*app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});*/

