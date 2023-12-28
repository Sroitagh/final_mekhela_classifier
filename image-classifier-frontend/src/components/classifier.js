import React, { useState } from 'react';
import axios from 'axios';
import './classifier.css';

const ClassifyScreen = () => {
  // State to hold the selected file and the result from the backend
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);

  // Function to handle file selection
  const handleFileChange = (event) => {
    if (event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      displayImagePreview(event.target.files);
    } else {
      setSelectedFile(null);
      displayImagePreview([]);
    }
  };

  // Function to delete the selected image
  const handleDeleteImage = () => {
    setSelectedFile(null);
    displayImagePreview([]);
  };

  // Function to handle file upload and classification
  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
    console.log("from_frontend____",formData);

    try {
      const response = await axios.post('http://localhost:5000/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log("from_backend____",response.data);
      setResult(response.data);

    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  // Function to display image preview
  const displayImagePreview = (files) => {
    const previewContainer = document.getElementById('divImageMediaPreview');
    previewContainer.innerHTML = '';

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const imgContainer = document.createElement('div');
        imgContainer.classList.add('img-container');

        const imgElement = document.createElement('img');
        imgElement.src = reader.result;
        imgElement.classList.add('img-preview');
        imgContainer.appendChild(imgElement);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'x';
        deleteButton.className = 'delete-button';
        deleteButton.addEventListener('click', handleDeleteImage);

        imgContainer.appendChild(deleteButton);
        previewContainer.appendChild(imgContainer);
      };
      reader.readAsDataURL(file);
    });
  };
  return (
    <div className="background-container">
      <h1 className="header-text">AN EFFECTIVE CLASSIFIER FOR MEKHELA SADOR</h1>
      <div className="centered-box">
        {/* File upload area */}
        <div className="file-drop-area">
          <label className="choose-file-button">
            Choose Files
            <input
              type="file"
              className="file-input"
              accept=".jpg,.jpeg,.png"
              onChange={handleFileChange}
            />
          </label>
          <span className="file-message">or drag and drop files here</span>
        </div>

        {/* Image preview container */}
        <div id="divImageMediaPreview" className="image-preview-container"></div>

        {/* Upload button */}
        <button onClick={handleUpload} className="btn btn-primary mt-3">
          Submit
        </button>

        {/* Display result */}
        {result && typeof result === 'object' && (
          <div className="result-box">
            <h2 className="mt-3">Result:</h2>
            <p>Predicted Label: {result.predicted_label}</p>
            <p>Confidence Score: {result.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassifyScreen;