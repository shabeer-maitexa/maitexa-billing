import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PayFee.css';
import axiosInstance from '../Axios';
import Navbar from '../Components/Navbar';
import { useNavigate } from 'react-router-dom';


const PayFee = () => {
    const [usersData, setUsersData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [courseFilter, setCourseFilter] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [emailFilter, setEmailFilter] = useState('');
    const [courses, setCourses] = useState([])
    const [isNewPayment, setIsNewPayment] = useState(null);

    const navigate = useNavigate()


    // useEffect
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
    }, [courseFilter, statusFilter, emailFilter, isNewPayment]);


    // create dynamic query
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
    if (setIsNewPayment) {
        queryParams += (queryParams ? '&' : '') + `is_new_user=${isNewPayment}`;
    }

    // fetch courses from backend
    const getCourses = async () => {
        try {
            const response = await axiosInstance.get('/fee/list-courses/')
            setCourses(response.data)
        } catch {
            console.log('fething courses error');
        }
    }


    // function for handling pay fee
    const handlePayEMI = (uuid, IsNewUser) => {
        if (IsNewUser) {
            navigate(`/payfeesform/${uuid}`)
        } else {
            navigate(`/payemi/${uuid}`)
        }
    };


    // details button function
    const clickDetailsHandle = (uuid) => {
        navigate(`/invoiceDetails/${uuid}`)
    };


    return (
        <div className="pay-fee-container font-style">
            <Navbar />
            <h2 className="page-title">Fee Payments</h2>

            <div className="toggle-container" style={{ textAlign: 'center', margin: '40px' }}>
                <div onClick={() => setIsNewPayment(true)} className="toggle-option btn-new-user">
                    New User
                </div>
                <div onClick={() => setIsNewPayment(false)} className="toggle-option btn-existing-user">
                    Existing
                </div>
            </div>


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
                        courses.map((course) => {
                            return <option value={course.uuid}>{course.course_name}</option>
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
                        {!isNewPayment ? <th>Payment Status</th> : ''}
                        {!isNewPayment ? <th>Domain fee</th> : ''}
                        {!isNewPayment ? <th>Fee With Discount</th> : ''}
                        {!isNewPayment ? <th>Fee With Gst(18%)</th> : ''}
                        {!isNewPayment ? <th>Paid Fees</th> : ''}
                        {!isNewPayment ? <th>Balance Due</th> : ''}
                        {!isNewPayment ? <th>Payment Details</th> : ''}
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((user) => (
                        <tr key={user.id} className={user.payement_status === 'Paid' ? 'paid' : user.payement_status === 'Unpaid' ? 'unpaid' : ''}>
                            <td>{user.profile.first_name}</td>
                            <td>{user.profile.email}</td>
                            <td>{user.course_name}</td>
                            {!isNewPayment ? <td>{user.payement_status}</td> : ''}
                            {!isNewPayment ? <td>{user.domain_fee}</td>
                                : ''}
                            {!isNewPayment ? <td>{user.amount_with_discount}</td> : ''}
                            {!isNewPayment ? <td>{user.amount_with_gst}</td> : ''}
                            {!isNewPayment ? <td>{user.paid_amount}</td> : ''}
                            {!isNewPayment ? <td>{user.balance}</td> : ''}


                            {!isNewPayment ? <td>
                                <button
                                    className='btn btn-warning'
                                    onClick={() => clickDetailsHandle(user.uuid)}
                                    disabled={user.is_new_payment}
                                >
                                    {!user.is_new_payment ? 'Details' : 'No Details'}
                                </button>
                            </td> : ''}


                            <td>
                                <button
                                    className={`pay-btn ${user.payement_status === 'Unpaid' ? 'pay-btn-unpaid' : 'bg-success'}`}
                                    onClick={() => handlePayEMI(user.uuid, user.is_new_payment)}
                                    disabled={user.payement_status === 'Paid'}
                                >
                                    {user.payement_status === 'Paid' ? 'Completed' : 'Payment'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PayFee;
