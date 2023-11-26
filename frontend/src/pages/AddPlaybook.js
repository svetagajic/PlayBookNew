import React, { useState } from 'react';
import axios from 'axios';

function AddPlaybook() {
  const [playbookData, setPlaybookData] = useState({
    name: '',
    file: null, // Store the uploaded file
  });

  const [message, setMessage] = useState(''); // State variable for displaying messages

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlaybookData({ ...playbookData, [name]: value });
  };

  const handleFileChange = (e) => {
    // Store the selected file in playbookData
    const selectedFile = e.target.files[0];
    setPlaybookData({ ...playbookData, file: selectedFile });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a FormData object to send the file and other data
    const formData = new FormData();
    formData.append('name', playbookData.name);
    formData.append('file', playbookData.file);

    console.log("KRECE1");

    try {
        const response = await axios.post('/api/', formData);
        
        //const values = await axios.get('/api/values/current');

      if (response.ok) {
        // Playbook added successfully, you can handle the response here
        setMessage('Playbook added successfully');
      } else {
        // Handle errors here       
        setMessage('Failed to add playbook');
      }
    } catch (error) {
      setMessage('Error: ' + error.message);
    }
    
  };

  return (
    <div>
      <h1>Add Playbook</h1>
      {message && <div className={message.startsWith('Error') ? 'error-message' : 'success-message'}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Playbook Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={playbookData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="file">Upload Playbook File:</label>
          <input
            type="file"
            id="file"
            name="file"
            accept=".yaml, .yml" // Specify allowed file types
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">Add Playbook</button>
      </form>
    </div>
  );
}

export default AddPlaybook;
