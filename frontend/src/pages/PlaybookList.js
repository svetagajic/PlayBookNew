import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Axios from 'axios';

const fetchPlaybooksFromBackend = async () => {
  try {
    const response = await Axios.get('http://localhost:3001/api/playbooks');

    console.log(response);

    return response.data; // Assuming the response contains an array of playbooks
  } catch (error) {
    console.error('Error fetching playbooks:', error);
    return []; // Return an empty array in case of an error
  }
};
function PlaybookList() {
  const [playbooks, setPlaybooks] = useState([]);

  useEffect(() => {
    // Fetch playbooks from the backend when the component mounts
    fetchPlaybooksFromBackend().then((data) => {
      setPlaybooks(data);
    });
  }, []); // The empty dependency array ensures this effect runs once on component mount


  return (
    <div className="container mt-4">
      <h1 className="mb-4">Playbooks List</h1>
      {playbooks.map((playbook, index) => (
        <div className="card mb-4" key={index}>
          <div className="card-body">
            <h2 className="card-title">{playbook.name}</h2>
            <ul className="list-group">
              {playbook.tasks.map((task) => (
                <li className="list-group-item" key={task.id}>
                  <strong>{task.name}</strong> - {task.module}
                  <br />
                  Command: {task.command}
                  <br />
                  Dependent On: {task.dependent_on.join(', ')}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaybookList;
