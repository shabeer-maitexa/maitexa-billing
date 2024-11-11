import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayFee.css';
import axiosInstance from '../Axios';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';

const BillingDetails = () => {
    const [usersData, setUsersData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [courseFilter, setCourseFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [courses, setCourses] = useState([]);

    const navigate=useNavigate()


    let queryParams = '';
    if (statusFilter) {
        queryParams += `payment_completed=${statusFilter}`;
    }
    if (courseFilter) {
        queryParams += (queryParams ? '&' : '') + `course_uuid=${courseFilter}`;
    }

    if (emailFilter) {
        queryParams += (queryParams ? '&' : '') + `email=${emailFilter}`;
    }



    const getCourses = async () => {
        try {
            const response = await axiosInstance.get('/fee/list-courses/')
            setCourses(response.data)

        } catch {
            console.log('fething courses error');
        }
    }


    useEffect(() => {
        // Fetch data from API
        axiosInstance.get(`/fee/list-coursefees/?${queryParams}`)
            .then(response => {
                setUsersData(response.data);
                setFilteredData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching data', error);
            });

            getCourses()
    }, [emailFilter,statusFilter,courseFilter]);


    const clickDetailsHandle = (uuid) => {
        navigate(`/invoiceDetails/${uuid}`)
    };

    return (
        <div className="pay-fee-container font-style">
            <Navbar/>
            <h2 className="page-title">Student Details</h2>

            {/* Filter Section */}
            <div className="filter-container">
                <input 
                    type="text" 
                    placeholder="Search by email" 
                    value={emailFilter} 
                    onChange={(e) => setEmailFilter(e.target.value)} 
                    className="filter-input"
                />
                <select 
                    value={courseFilter} 
                    onChange={(e) => setCourseFilter(e.target.value)} 
                    className="filter-select"
                >
                    <option value="">Select Course</option>
                    {
                        courses.map((course)=>{
                            return  <option value={course.uuid}>{course.course_name}</option>
                        })
                    }
                    
                </select>
                <select 
                    value={statusFilter} 
                    onChange={(e) => setStatusFilter(e.target.value)} 
                    className="filter-select"
                >
                    <option value="">Select Payment Status</option>
                    <option value="true">Paid</option>
                    <option value="false">Unpaid</option>
                </select>
            </div>

            {/* Table Section */}
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Course</th>
                        <th>Course Fee</th>
                        <th>Discount Percentage</th>
                        <th>Payment Status</th>
                        <th>Total Fees</th>
                        <th>Paid Fees</th>
                        <th>Balance Due</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((user) => (
                        <tr key={user.id} className={user.payement_status === 'Paid' ? 'paid' : user.payement_status === 'Unpaid' ? 'unpaid' : ''}>
                            <td>{user.profile.first_name}</td>
                            <td>{user.profile.email}</td>
                            <td>{user.course_name}</td>
                            <td>{user.total_fees}</td>
                            <td>{user.fee_discount}%</td>

                            <td className={user.payement_status == 'Paid' ? 'bg-success text-light':' bg-warning'} >{user.payement_status}</td>
                            <td>{user.amount_with_discount}</td>
                            <td>{user.paid_amount}</td>
                            <td>{user.amount_with_discount - user.paid_amount}</td>
                            <td>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => clickDetailsHandle(user.uuid)}
                                >
                                    Details
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BillingDetails;
