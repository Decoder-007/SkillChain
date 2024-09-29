import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [challengeId, setChallengeId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [validUntil, setValidUntil] = useState('');
  const [message, setMessage] = useState('');

  const createChallenge = async () => {
    try {
      const res = await axios.post('http://localhost:3001/create-challenge', {
        challengeId,
        title,
        description,
        validUntil
      });
      setMessage(`Transaction Hash: ${res.data.txHash}`);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h1>SkillChain</h1>
      <input
        type="text"
        placeholder="Challenge ID"
        value={challengeId}
        onChange={(e) => setChallengeId(e.target.value)}
      />
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Valid Until"
        value={validUntil}
        onChange={(e) => setValidUntil(e.target.value)}
      />
      <button onClick={createChallenge}>Create Challenge</button>
      <p>{message}</p>
    </div>
  );
}

export default App;
