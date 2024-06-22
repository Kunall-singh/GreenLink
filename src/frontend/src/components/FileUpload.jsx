import React, { useState } from 'react';
import './FileUpload.css';

function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (event) => {
    setFiles(Array.from(event.target.files));
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    try {
      await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });
      alert('Files successfully uploaded!');
    } catch (error) {
      alert('Upload failed!');
      console.error('Error uploading files:', error);
    }
  };

  return (
    <div className="upload-container">
      <h1>Upload</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload Files</button>
    </div>
  );
}

export default FileUpload;
