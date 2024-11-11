import React from 'react';
import Navbar from '../Components/Navbar';
import './Dashboard.css';
import { Link } from 'react-router-dom';
import FeesGraph from './Reports';


export default function Dashboard() {
    return (
        <div className="dashboard-container-custom pt-5 font-style">
            {/* <Navbar /> */}
            <div className="dashboard-content-custom">

                {/* Main Content */}
                <div className="dashboard-main-content-custom">
                    <div className="dashboard-main-container-custom">
                        <h3 className="dashboard-welcome-title-custom text-dark font-style">Welcome to the Dashboard</h3>
                        <div className="row">
                            <div className="col-lg-2"></div>
                            <div className="col">

                                <div className="dashboard-cards-row-custom">
                                    {/* Card 1: New Admission */}
                                    <div className="dashboard-card-custom">
                                        <div className="dashboard-card-body-custom">
                                            <h5 className="dashboard-card-title-custom text-light ">New Admission</h5>
                                            <p className="dashboard-card-text-custom">Add new student admission details and manage registrations.</p>
                                            <Link className="dashboard-card-button-custom" to="/registration">Register</Link>
                                        </div>
                                    </div>

                                    {/* Card 2: Fees Collection */}
                                    <div className="dashboard-card-custom">
                                        <div className="dashboard-card-body-custom">
                                            <h5 className="dashboard-card-title-custom text-light">Fees Collection</h5>
                                            <p className="dashboard-card-text-custom mr-4">Track and manage student fee payments .</p> <br />
                                            <Link className="dashboard-card-button-custom" to="/payfees">Pay Fees</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                                <FeesGraph />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
