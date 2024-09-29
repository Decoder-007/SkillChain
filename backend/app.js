const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(express.json());

const NODE_URL = process.env.NODE_URL;
const FAUCET_URL = process.env.FAUCET_URL;

app.post('/create-challenge', async (req, res) => {
    const { challengeId, title, description, validUntil } = req.body;
    try {
        const txPayload = {
            type: "entry_function_payload",
            function: "0x1::SkillChain::create_challenge",
            arguments: [challengeId, title, description, validUntil],
            type_arguments: []
        };
        const result = await axios.post(`${NODE_URL}/transactions`, txPayload);
        res.json({ txHash: result.data.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/submit-credential', async (req, res) => {
    const { credentialId, challengeId, skillName, timestamp } = req.body;
    try {
        const txPayload = {
            type: "entry_function_payload",
            function: "0x1::SkillChain::submit_credential",
            arguments: [credentialId, challengeId, skillName, timestamp],
            type_arguments: []
        };
        const result = await axios.post(`${NODE_URL}/transactions`, txPayload);
        res.json({ txHash: result.data.hash });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(3001, () => {
    console.log("SkillChain Backend running on port 3001");
});
