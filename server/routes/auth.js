const express = require('express');
const router = express.Router();
const axios = require('axios');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.post('/auth', async (req, res) => {
    const { companyName, _id, ownerName, ownerEmail, rollNo } = req.body;
  
    try {
      const response = await axios.post('http://20.244.56.144/test/register/auth', {
        companyName,
        clientID: _id,
        ownerName,
        ownerEmail,
        rollNo
      });
  
      if (response.data.error) {
        return res.status(400).json({ message: response.data.error });
      }
  
      const { access_token } = response.data;
  
      const token = jwt.sign(
        { companyName, _id, ownerName, ownerEmail, rollNo },
        process.env.jwt,
        { expiresIn: '1710835268' }
      );
  
      res.status(200).json({
        token_type: 'Bearer',
        access_token: token,
        expires_in: 1710835268
      });
    } catch (error) {
      console.error('Authorization error:', error.message);
      res.status(500).json({
        message: 'Authorization Failed',
        error: error.message
      });
    }
  });
  
  module.exports = router;