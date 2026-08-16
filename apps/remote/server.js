const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 80;

// Allow your Next.js shell to fetch the remote entry across origins
app.use(cors());

// Serve the root 'dist' folder statically
app.use(express.static(path.join(__dirname, 'dist'), {
    setHeaders: (res, filePath) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
    }
}));

app.listen(PORT, () => {
    console.log(`Remote Express server running on port ${PORT}`);
});