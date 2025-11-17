// pages/index.js

import { useState } from 'react';
import fs from 'fs';
import path from 'path';

const uploadDirectory = './public/zagryj';

// Создание директории для загрузок, если она не существует
if (!fs.existsSync(uploadDirectory)){
    fs.mkdirSync(uploadDirectory);
}

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    alert(data.message);
  };

  return (
    <div>
      <h1>Upload File</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} required />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

// Обработка API-запроса
export const config = {
  api: {
    bodyParser: false,
  },
};

export async function uploadHandler(req, res) {
  const data = [];

  req.on('data', chunk => {
    data.push(chunk);
  }).on('end', () => {
    const buffer = Buffer.concat(data);
    const filePath = path.join(uploadDirectory, req.headers['file-name']);

    fs.writeFileSync(filePath, buffer);
    res.status(200).json({ message: 'File uploaded successfully' });
  });
}
