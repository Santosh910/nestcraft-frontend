import React, { useState } from 'react';
import axios from 'axios';

function Homepage2() {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [uploadedData, setUploadedData] = useState(null);

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('category', category);
    formData.append('description', description);
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/categories/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setUploadedData(response.data);
    } catch (error) {
      console.error('Error uploading data: ', error);
    }
  };

  return (
    <div>
      <h1>Upload Data</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category:</label>
          <input type="text" value={category} onChange={handleCategoryChange} />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={handleDescriptionChange}></textarea>
        </div>
        <div>
          <label>Image:</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} />
        </div>
        <button type="submit">Upload</button>
      </form>
      {uploadedData && (
        <div>
          <h2>Uploaded Data:</h2>
          <p>Category: {uploadedData.category}</p>
          <p>Description: {uploadedData.description}</p>
          <img src={`http://localhost:8000/temp/${uploadedData.imageUrl}`} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default Homepage2
