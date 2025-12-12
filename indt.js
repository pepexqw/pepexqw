import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    alert(result.message);
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept=".png, .jpg, .ico" onChange={handleFileChange} required />
      <button type="submit">Загрузить</button>
    </form>
  );
}
