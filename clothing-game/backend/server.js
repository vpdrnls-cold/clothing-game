const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// 앱 초기화
const app = express();
const PORT = 3001;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // 최신 Express에서는 body-parser 대신 사용

// MongoDB 연결 URI
const MONGO_URI = 'mongodb+srv://wogns:quti7499@cluster0.dtkzk.mongodb.net/clothingGame?retryWrites=true&w=majority';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 데이터 스키마 정의 (닉네임 저장용)
const NicknameSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
});

const Nickname = mongoose.model('Nickname', NicknameSchema);

// 데이터 스키마 정의 (게임 데이터 저장용)
const GameDataSchema = new mongoose.Schema({
  shirt: { x: Number, y: Number },
  pants: { x: Number, y: Number },
  eyes: { x: Number, y: Number },
});

const GameData = mongoose.model('GameData', GameDataSchema);

// 닉네임 저장 API
app.post('/save-nickname', async (req, res) => {
  const { nickname } = req.body;
  if (!nickname) {
    return res.status(400).send('Nickname is required');
  }

  try {
    const newNickname = new Nickname({ nickname });
    await newNickname.save();
    res.status(200).json({ message: 'Nickname saved successfully!' });
  } catch (err) {
    res.status(500).send('Error saving nickname: ' + err.message);
  }
});

// 게임 데이터 저장 API
app.post('/save-game-data', async (req, res) => {
  const newData = new GameData(req.body);
  try {
    await newData.save();
    res.status(200).json({ message: 'Game data saved successfully!' });
  } catch (err) {
    res.status(500).send('Error saving game data: ' + err.message);
  }
});

// 서버 시작
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
