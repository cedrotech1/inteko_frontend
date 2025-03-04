import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null); // Initialize role state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // navigate('/Login');
    }
  }, [navigate]);

  useEffect(() => {
    const userString = localStorage.getItem('user');
    if (userString) {
      try {
        const user = JSON.parse(userString);
        setRole(user.role); // Set role state based on user object
      } catch (error) {
        console.error('Error parsing user object:', error);
      }
    } else {
      console.error('User object not found in local storage');
    }
  }, []);

  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link collapsed" href="/statistics">
            <i className="bi bi-grid"></i>
            <span>Dashboard</span>
          </a>
        </li>

        {/* Render items based on user role */}
 {role === 'admin' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../addusers">
        <i className="bi bi-person"></i>
        <span>Add Leaders Users</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../users">
        <i className="bi bi-person"></i>
        <span>List of Leaders</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../post_type">
        <i className="bi bi-person"></i>
        <span>Manage post type</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../notifications">
        <i className="bi bi-person"></i>
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../profile">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  </React.Fragment>
)}

{role === 'province_leader' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../post">
        <i className="bi bi-person-circle"></i>
        <span>Add post</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../notifications">
        <i className="bi bi-person"></i>
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../profile">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  
  </React.Fragment>
)}

{role === 'district_leader' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../post">
        <i className="bi bi-person-circle"></i>
        <span>Add post</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../notifications">
        <i className="bi bi-person"></i>
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../profile">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  </React.Fragment>
)}

{role === 'sector_leader' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../post">
        <i className="bi bi-person-circle"></i>
        <span>Add post</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../notifications">
        <i className="bi bi-person"></i>
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../profile">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  </React.Fragment>
)}

{role === 'cell_leader' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../post">
        <i className="bi bi-person-circle"></i>
        <span>Add post</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../notifications">
        <i className="bi bi-person"></i>
        <span>Notifications</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../profile">
        <i className="bi bi-gear"></i>
        <span>Settings</span>
      </a>
    </li>
  </React.Fragment>
)}

{role === 'village_leader' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../post">
        <i className="bi bi-person-circle"></i>
        <span>Add post</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../addcitizen">
        <i className="bi bi-journal-text"></i>
        <span>Add citizen</span>
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../users">
        <i className="bi bi-journal-text"></i>
        <span>View Village citizens</span>
      </a>
    </li>
  </React.Fragment>
)}

{role === 'citizen' && (
  <React.Fragment>
    <li className="nav-item">
      <a className="nav-link collapsed" href="../citizenpost">
        <i className="bi bi-person-circle"></i>
        <span>View posts</span>
      </a>
    </li>
  </React.Fragment>
)}




        <li className="nav-item">
          <a className="nav-link collapsed" href="../logout">
            <i className="bi bi-box-arrow-right"></i>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
