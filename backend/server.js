const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const API_KEY = 'd8cc8f3a64034e5eb5d694cb';

app.post('/api/convert', async (req, res) => {
  const { from, to, amount } = req.body;

  if (!from || !to || !amount) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${from}`);
    const data = await response.json();

    const rate = data.conversion_rates[to];

    if (!rate) {
      return res.status(400).json({ error: 'Invalid currency code' });
    }

    const convertedAmount = rate * amount;
    res.json({ result: convertedAmount, rate });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch exchange rate' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
