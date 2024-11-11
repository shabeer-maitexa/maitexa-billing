import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ children }) => {
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleNavbar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="d-flex font-style">
            <div className={`sidebar-container ${isExpanded ? 'expanded' : 'collapsed'}`}>
                <nav className="navbar navbar-dark bg-dark flex-column">
                    <button
                        className="btn btn-dark toggle-btn"
                        onClick={toggleNavbar}
                    >
                        {isExpanded ? '<<' : '>>'}
                    </button>
                    <div className={`sidebar-links ${isExpanded ? 'show' : 'hide'}`}>
                        <Link className="navbar-brand text-bold mb-3" to="/dashboard">Home</Link>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/payfees">Customers</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/courses">Courses</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/reports">Reports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link text-light" to="/login">Logout</Link>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
            <div className={`main-content ${isExpanded ? '' : 'collapsed'}`}>
                {children}
            </div>
        </div>
    );
};

export default Navbar;
