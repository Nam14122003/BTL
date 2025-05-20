import express from 'express';
import User from '../models/User';

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email, password, firstname, lastname, address, phone, captcha } = req.body;

  console.log(req.body); // Kiểm tra dữ liệu nhận được

  try {
    const user = new User({
      email,
      password,
      firstname,
      lastname,
      address,
      phone,
      captcha, // lưu captcha vào DB
    });

    await user.save();
    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).send({ error: 'Error registering user' });
  }
});

export default router;