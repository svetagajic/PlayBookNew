import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Axios from 'axios';

const fetchPlaybooksFromBackend = async () => {
  try {
    const response = await Axios.get('orchestrator/playbook/');

    console.log(response.data);

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
      {playbooks && playbooks.map((playbook, index) => {
        console.log(playbook);  // Add this line to log the playbook
        return (
          <div className="card mb-4" key={index}>
            <div className="card-body">
              <h2 className="card-title">{playbook.Name}</h2>
              <ul className="list-group">
                {playbook.Jobs && playbook.Jobs.map((job) => {
                  console.log(job);  // Add this line to log each task
                  return (
                    <li className="list-group-item" key={job.id}>
                      <strong>{job.Name}</strong> - {job.module}
                      <br />
                      Job weight: {job.Weight}
                      <br />
                      Dependent On: {job.DependentOn}
                      <br />
                      State: {job.State}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );  
}

export default PlaybookList;
