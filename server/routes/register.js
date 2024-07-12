const express = require('express');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();

router.post('/register', async (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accessCode } = req.body;
  try {
    const response = await axios.post('http://20.244.56.144/test/register', {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accessCode
    });

    const { clientId, accessCode: registeredAccessCode, access_token } = response.data;

    res.status(200).json({
      message: 'Registration Successful',
      clientId,
      accessCode: registeredAccessCode,
      access_token,
      token_type: 'Bearer',
      expires_in: 1710835268,
    });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({
      message: 'Registration Failed',
      error: error.message,
    });
  }
});

module.exports = router;
