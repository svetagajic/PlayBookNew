import React, { useState } from 'react';
import axios from 'axios';

const AddPlaybook = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);

    // Read the contents of the file as text
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const fileContent = JSON.parse(e.target.result);
        console.log('File content as JSON:', fileContent);
      } catch (error) {
        console.error('Error parsing file content:', error);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleUpload = async () => {
    if (file) {
      // Read the contents of the file as text
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const fileContent = JSON.parse(e.target.result);

          // Now you can use fileContent as the JSON data to send to the backend
          const response = await axios.post('/orchestrator/playbook/', fileContent);
          console.log('Playbook added successfully:', response.data);
        } catch (error) {
          console.error('Error parsing file content or adding playbook:', error);
        }
      };
      reader.readAsText(file);
    } else {
      console.error('No file selected.');
    }
  };

  return (
    <div>
      <h1>Add Playbook</h1>
      <input type="file" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload}>Upload Playbook</button>
    </div>
  );
};

export default AddPlaybook;
