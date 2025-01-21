const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// 앱 초기화
const app = express();
const PORT = 3001;

// 미들웨어 설정
app.use(cors());
app.use(bodyParser.json());

const MONGO_URI = 'mongodb+srv://wogns:quti7499@cluster0.dtkzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

// MongoDB 연결
mongoose
  .connect('mongodb://localhost:27017/clothingGame', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 데이터 스키마 정의
const GameDataSchema = new mongoose.Schema({
  shirt: { x: Number, y: Number },
  pants: { x: Number, y: Number },
  eyes: { x: Number, y: Number },
});

const GameData = mongoose.model('GameData', GameDataSchema);

// API 엔드포인트
app.post('/save', async (req, res) => {
  const newData = new GameData(req.body);
  try {
    await newData.save();
    res.status(200).send('Game data saved successfully!');
  } catch (err) {
    res.status(500).send('Error saving data: ' + err.message);
  }
});

// 서버 시작
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
