const express = require('express');
const expressStaticGzip = require('express-static-gzip');
const path = require('path');

const PORT = 3000 || process.env.PORT;

const app = express();

app.use('/', expressStaticGzip(path.resolve(__dirname, 'dist'), {}));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});