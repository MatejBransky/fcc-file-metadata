const express = require('express');
const cors = require('cors');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.get('/hello', function(req, res) {
  res.json({ greetings: 'Hello, API' });
});

app.post('/api/fileanalyse', upload.any(), (req, res) => {
  const [file] = req.files;
  res.json(Object.assign({}, file, { buffer: undefined }));
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Node.js listening ...');
});
