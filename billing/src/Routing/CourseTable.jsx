import React, { useEffect, useState } from 'react';
import axiosInstance from '../Axios';
import './CourseTable.css';
import Navbar from '../Components/Navbar';

const CourseTable = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [newCourse, setNewCourse] = useState({
        course_name: '',
        course_duration: '',
        course_description: '',
        course_type: ''
    });
    const [isUpdating, setIsUpdating] = useState(false);
    const [currentCourseId, setCurrentCourseId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');

    const fetchCourses = async () => {
        try {
            const response = await axiosInstance.get('/fee/list-courses/');
            setCourses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCourse(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddOrUpdateCourse = async (e) => {
        e.preventDefault();
        try {
            if (isUpdating && currentCourseId) {
                await axiosInstance.post(`/fee/update-a-course/${currentCourseId}/`, newCourse);
                setSuccessMessage('Course updated successfully!');
            } else {
                await axiosInstance.post('/fee/create-a-course/', newCourse);
                setSuccessMessage('Domain added successfully!');
            }
            fetchCourses();
            setShowModal(false);
            setNewCourse({ course_name: '', course_duration: '', course_description: '', course_type: '' });
            setIsUpdating(false);
            setCurrentCourseId(null);

            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error saving course:', error);
        }
    };

    const handleUpdateCourse = (course) => {
        setIsUpdating(true);
        setCurrentCourseId(course.id);
        setNewCourse({
            course_name: course.course_name,
            course_duration: course.course_duration,
            course_description: course.course_description,
            course_type: course.course_type
        });
        setShowModal(true);
    };

    return (
        <div className="courseTable-container font-style">
            <Navbar />
            <div className="courseTable-header">
                <h1 className="courseTable-title">Domain List</h1>
                <button className="courseTable-addButton" onClick={() => {
                    setIsUpdating(false);
                    setShowModal(true);
                    setNewCourse({ course_name: '', course_duration: '', course_description: '', course_type: '' });
                }}>
                    Add Domain
                </button>
            </div>

            {successMessage && (
                <div className="courseTable-successMessage">
                    {successMessage}
                </div>
            )}

            <table className="courseTable-table ">
                <thead>
                    <tr>
                        <th>Course ID</th>
                        <th>Domain Name</th>
                        <th>Duration</th>
                        <th>Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course) => (
                        <tr key={course.id} className="courseTable-row">
                            <td>{course.id}</td>
                            <td>{course.course_name}</td>
                            <td>{course.course_duration}</td>
                            <td>{course.course_type}</td>
                            <td>
                                <button
                                    className="courseTable-updateButton"
                                    onClick={() => handleUpdateCourse(course)}
                                >
                                    Update
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {showModal && (
                <div className="courseTable-modal">
                    <div className="courseTable-modalContent">
                        <span className="courseTable-closeButton" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>{isUpdating ? 'Update Domain' : 'Add New Domain'}</h2>
                        <form onSubmit={handleAddOrUpdateCourse} className="courseTable-form">
                            <label>
                                Type:
                                <select
                                    name="course_type"
                                    value={newCourse.course_type}
                                    onChange={handleInputChange}
                                    required
                                    className="courseTable-input"
                                >
                                    <option value="">Select a Domain Type</option>
                                    <option value="internship">Internship</option>
                                    <option value="academic">Academic</option>
                                </select>
                            </label>
                            <label>
                                Domain Name:
                                <input
                                    type="text"
                                    name="course_name"
                                    value={newCourse.course_name}
                                    onChange={handleInputChange}
                                    required
                                    className="courseTable-input"
                                />
                            </label>
                            <label>
                                Domain Description:
                                <textarea
                                    type="textarea"
                                    name="course_description"
                                    value={newCourse.course_description}
                                    onChange={handleInputChange}
                                    required
                                    rows="4"
                                    cols="50" 
                                    className="courseTable-input"
                                />
                            </label>
                            <label>
                                Duration:
                                <select
                                    name="course_duration"
                                    value={newCourse.course_duration}
                                    onChange={handleInputChange}
                                    required
                                    className="courseTable-input font-style"
                                >
                                    <option value="">Select Duration</option>
                                    <option value="4">4 Months</option>
                                    <option value="6">6 Months</option>
                                    <option value="8">8 Months</option>
                                </select>
                            </label>
                            <button type="submit" className="courseTable-submitButton">
                                {isUpdating ? 'Update Domain' : 'Add Domain'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseTable;
