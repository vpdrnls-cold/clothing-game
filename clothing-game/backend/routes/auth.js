const express = require('express');
const router = express.Router();
const User = require('../models/User'); // User 모델을 가져옵니다.

// 닉네임 생성 (가입)
router.post('/signup', async (req, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ message: '닉네임을 입력하세요.' });
  }

  try {
    const existingUser = await User.findOne({ nickname });
    if (existingUser) {
      return res.status(409).json({ message: '이미 존재하는 닉네임입니다.' });
    }

    const newUser = new User({ nickname });
    await newUser.save();
    res.status(201).json({ message: '닉네임 생성 완료!' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류로 닉네임 생성 실패.', error: err.message });
  }
});

// 닉네임 검증 (로그인)
router.post('/login', async (req, res) => {
  const { nickname } = req.body;

  if (!nickname) {
    return res.status(400).json({ message: '닉네임을 입력하세요.' });
  }

  try {
    const user = await User.findOne({ nickname });
    if (!user) {
      return res.status(404).json({ message: '닉네임이 존재하지 않습니다. 가입하기를 통해 닉네임을 생성하세요.' });
    }

    res.status(200).json({ message: '로그인 성공!' });
  } catch (err) {
    res.status(500).json({ message: '서버 오류로 로그인 실패.', error: err.message });
  }
});

module.exports = router;
