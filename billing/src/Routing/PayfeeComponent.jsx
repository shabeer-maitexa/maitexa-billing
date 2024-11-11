import React, { useEffect, useState } from 'react';
import './PayFeeComponent.css'; // Custom CSS file for styling
import axiosInstance from '../Axios';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const PayFeeComponent = () => {
    const navigate = useNavigate();
    const { uuid } = useParams();

    const [amount, setAmount] = useState([])
    const [paidAmount, setPaidAmount] = useState([])


    const [details, setDetails] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        total_fees: '',
        current_installment: '',
        discount: '',
    });

    const [formData, setFormData] = useState({
        current_payment: '',
        uuid: uuid,
        mode_of_payment: '',
        total_fees:'',
        fee_discount: '',
        fee_with_gst:'',

    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));

    };


    const handleBlur = (e) => {
        const { total_fees, fee_discount } = formData
        let finalAmount = (total_fees ? total_fees : 0) - (fee_discount ? fee_discount : 0);
        finalAmount = Math.round(finalAmount + finalAmount * 0.18);

        setAmount(finalAmount)

    };


    const handleBlurAmount = (e) => {
        let paidAmount = parseFloat(e.target.value) || 0;
        paidAmount = Math.round(paidAmount + paidAmount * 0.18);
    
        setPaidAmount(paidAmount);
    };


    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post(`fee/pay-fee/?=${uuid}`, formData);
            navigate(`/invoices/${response.data.invoice_id}`);
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('Failed to submit the form. Please try again.');
        }
    };

    const getCourseFees = async () => {
        if (!uuid) {
            console.error('No UUID provided.');
            return;
        }

        try {
            const response = await axiosInstance.get(`fee/get-a-coursefees/?uuid=${uuid}`);
            setDetails(response.data.data);
        } catch (error) {
            console.error('Error fetching course fees:', error);
            alert('No data found. Please go back and try again.');
        }
    };

    useEffect(() => {
        getCourseFees();
    }, []);

    const paymentModes = [
        { value: 'credit_card', label: 'Credit Card' },
        { value: 'bank_transfer', label: 'Bank Transfer' },
        { value: 'cash', label: 'Cash' },
        { value: 'cheque', label: 'Cheque' },
        { value: 'upi', label: 'UPI' }
    ];

    return (
        <>
            <Navbar />
            <form className="bill-form" onSubmit={handleOnSubmit}>
                <div className="bill-header">
                    <h1>Fee Payment</h1>
                </div>

                <div className="bill-section row">
                    <div className="col">
                        <p><strong>Name:</strong> {details.first_name} {details.last_name}</p>
                        <p><strong>Email:</strong> {details.email}</p>
                        <p><strong>Phone:</strong> {details.phone}</p>
                    </div>
                    <div style={{ textAlign: 'right' }} className="col">
                        <p ><strong>GST:</strong>18%</p>
                    </div>
                </div>

                <div className="bill-section row">
                    <div className="col">
                        <label className="bill-label">
                            <span>Domain Fee:</span>
                            <input
                                className="bill-input"
                                type="text"
                                name="total_fees"
                                value={formData.total_fees}
                                onChange={handleChange}
                                required
                                onBlur={handleBlur}
                            />
                        </label>
                    </div>
                    <div className="col">
                        <label className="bill-label">
                            <span>Discount:</span>
                            <input
                                className="bill-input"
                                type="text"
                                name="fee_discount"
                                value={formData.fee_discount}
                                onChange={handleChange}
                                onBlur={handleBlur}

                            />
                        </label>
                    </div>
                </div>

                <div className="col bill-section row">
                    <div className="col">
                        <label className="bill-label">
                            <span>Total Amount (including GST):</span>
                            <h5>{amount ? amount + ' ₹' : 'loading..'}</h5>
                        </label>
                    </div>
                    <div className="col">
                        <div className="col">
                            <label className="bill-label">
                                <span>Amount to pay now:</span>
                                <input
                                    className="bill-input"
                                    type="text"
                                    name="current_payment"
                                    value={formData.current_payment}
                                    onChange={handleChange}
                                    required
                                    onBlur={handleBlurAmount}

                                />
                            </label>
                            <p>Amount : {formData.current_payment} ₹</p>
                            <p>GST : 18% </p>
                            <p>Total : {paidAmount ? paidAmount +' ₹' : 'loading..'} </p>

                        </div>
                    </div>
                </div>

                <div className="bill-section">
                    <label className="bill-label">
                        <span>Mode of Payment:</span>
                        <select
                            name="mode_of_payment"
                            value={formData.mode_of_payment}
                            onChange={handleChange}
                            required
                            className="bill-select"
                        >
                            <option value="">Select payment mode</option>
                            {paymentModes.map((obj) => (
                                <option key={obj.value} value={obj.value}>
                                    {obj.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <button className="bill-submit" type="submit">Pay Now</button>
            </form>
        </>
    );
};

export default PayFeeComponent;
