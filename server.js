const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');

const upload = multer({
  limits: { fileSize: 15 * 1024 * 1024 },
  fileFilter: (req, file, cb) =>
    cb(null, ['image/jpeg', 'image/png'].includes(file.mimetype))
});

const Photo = mongoose.model('Photo', {
  name: String,
  contentType: String,
  data: Buffer
});

const app = express();
app.use(express.static('public'));

// Send each photo with its image embedded, so one request is enough
const toJson = p => ({ _id: p._id, src: `data:${p.contentType};base64,${p.data.toString('base64')}` });

app.get('/api/photos', async (req, res) => {
  res.json((await Photo.find()).map(toJson));
});

app.post('/api/photos', upload.single('photo'), async (req, res) => {
  const { originalname, mimetype, buffer } = req.file;
  const photo = await Photo.create({ name: originalname, contentType: mimetype, data: buffer });
  res.status(201).json(toJson(photo));
});

app.use((err, req, res, next) => res.status(400).json({ error: 'Please upload a .jpg or .png image under 15MB' }));

mongoose.connect('mongodb://127.0.0.1:27017/photo_album')
  .then(() => app.listen(3000, () => console.log('http://localhost:3000')));
