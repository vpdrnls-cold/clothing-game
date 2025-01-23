const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // auth 라우트
const bodyParser = require('body-parser');

// 앱 초기화
const app = express();
const PORT = 3001;

// 미들웨어 설정
app.use(cors());
app.use(express.json()); // JSON 파싱 미들웨어
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB 연결 URI
const MONGO_URI = 'mongodb+srv://wogns:quti7499@cluster0.dtkzk.mongodb.net/clothingGame?retryWrites=true&w=majority';
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// 닉네임 저장 및 게임 데이터 저장 스키마
const NicknameSchema = new mongoose.Schema({
  nickname: { type: String, required: true, unique: true }, // 닉네임은 고유해야 함
});

const GameDataSchema = new mongoose.Schema({
  shirt: { x: Number, y: Number },
  pants: { x: Number, y: Number },
  eyes: { x: Number, y: Number },
  createdBy: { type: String, required: true }, // 닉네임 추가
});

const Nickname = mongoose.model('Nickname', NicknameSchema);
const GameData = mongoose.model('GameData', GameDataSchema);

// 라우트 설정
app.use('/api', authRoutes); // auth 관련 API 라우트 연결

// 게임 데이터 저장 API
app.post('/api/save-game-data', async (req, res) => {
  const { shirt, pants, eyes, createdBy } = req.body;

  if (!createdBy) {
    return res.status(400).json({ message: 'Created by (nickname) is required' });
  }

  try {
    const newGameData = new GameData({ shirt, pants, eyes, createdBy });
    await newGameData.save();
    res.status(200).json({ message: 'Game data saved successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving game data', error: err.message });
  }
});

// 닉네임 저장 API (이미 라우트로 처리되었으므로 필요 없을 수 있음)
// app.post('/api/save-nickname', async (req, res) => {
//   const { nickname } = req.body;
//   if (!nickname) {
//     return res.status(400).send('Nickname is required');
//   }
//   try {
//     const newNickname = new Nickname({ nickname });
//     await newNickname.save();
//     res.status(200).json({ message: 'Nickname saved successfully!' });
//   } catch (err) {
//     res.status(500).send('Error saving nickname: ' + err.message);
//   }
// });

// 서버 시작
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
