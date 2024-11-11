import React, { useEffect, useState } from 'react';
import './Registration.css'; // Make sure to modify this file for enhanced styling
import axiosInstance from '../Axios';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const RegisterForm = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [success, setSuccess] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_b: '',
        course: '',
        address_line1: '',
        address_line2: '',
        city: '',
        state: '',
        zip_code: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };


    const getCourses = async () => {
        try {
            const response = await axiosInstance.get('/fee/list-courses/');
            setCourses(response.data);
        } catch {
            console.log('Fetching courses error');
        }
    };

    useEffect(() => {
        getCourses();
    }, []);


    console.log(formData);
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        if (!formData.first_name || !formData.last_name || !formData.email) {
            alert("Please fill in all required fields.");
            return;
        } else {
            try {
                const response = await axiosInstance.post('fee/registration/', formData);
                console.log('Form submitted successfully:', response.data);
                setSuccess(true)
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);

                setFormData({
                    first_name: '',
                    last_name: '',
                    email: '',
                    phone: '',
                    phone_b: '',
                    course: '',
                    address_line1: '',
                    address_line2: '',
                    city: '',
                    state: '',
                    zip_code: ''
                });
            } catch (error) {
                console.error('Error submitting the form:', error);
                alert('Failed to submit the form. Please try again.');
            }
        }
    };

    const handleClose = () => {
        setSuccess(false)
        console.log(success);
    }

    return (
        <>
            <Navbar />
            <form className="form mt-5 registration-container" onSubmit={handleOnSubmit}>
                <Link className="nav-link text-info text-right" to="/payfees">View Students</Link>
                <p className="title">New Bill</p>
                <p className="message">Add A Customer.</p>
                {
                    success ? <div className="success-overlay">
                        <h4 className="animated-h4"> <p className='text-dark' onClick={handleClose}>x</p> Registration Completed </h4>
                    </div> : ''
                }
                <div className="form-container">
                    <div className="column">
                        <label>
                            <span>Firstname</span>
                            <input
                                className="input"
                                type="text"
                                name="first_name"
                                required
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>Lastname</span>

                            <input
                                className="input"
                                type="text"
                                name="last_name"
                                required
                                value={formData.last_name}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>Email</span>

                            <input
                                className="input"
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>Contact Number</span>

                            <input
                                className="input"
                                type="text"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <span>Parent Contact Number</span>

                            <input
                                className="input"
                                type="text"
                                name="phone_b"
                                required
                                value={formData.phone_b}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <div className="column">
                        <label>
                            <span>Course</span>

                            <select
                                name="course"
                                value={formData.course}
                                onChange={handleChange}
                                required
                                className="input text-dark"
                            >
                                <option value="">Select Course</option>
                                {courses.map((course) => (
                                    <option key={course.id} value={course.id}>
                                        {course.course_name}
                                    </option>
                                ))}
                            </select>
                        </label>

                        <label>
                            <span>Address Line 1</span>

                            <input
                                className="input"
                                type="text"
                                name="address_line1"
                                value={formData.address_line1}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>Address Line 2</span>

                            <input
                                className="input"
                                type="text"
                                name="address_line2"
                                value={formData.address_line2}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>City</span>

                            <input
                                className="input"
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>State</span>

                            <input
                                className="input"
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleChange}
                            />
                        </label>

                        <label>
                            <span>Pin Code</span>

                            <input
                                className="input"
                                type="text"
                                name="zip_code"
                                value={formData.zip_code}
                                onChange={handleChange}
                            />
                        </label>
                    </div>
                </div>

                <button className="submit" type="submit">Create</button>
            </form>
        </>
    );
};

export default RegisterForm;
