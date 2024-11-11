import React, { useEffect, useState } from 'react';
import axiosInstance from '../Axios';
import './InvoiceDetails.css';
import { useParams } from 'react-router-dom';
import Navbar from '../Components/Navbar';



const InvoiceDetails = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const { uuid } = useParams();


    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axiosInstance.get(`/fee/list-invoice/?course_uuid=${uuid}`); // Adjust the URL to your API endpoint
                setInvoices(response.data);
                console.log(invoices,'invoices');
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                setLoading(false);
            }
        };

        fetchInvoices();
    }, []);

    if (loading) {
        return <p className="invoiceDetails-loading-message">Loading invoices...</p>;
    }

    const formatISTDate = (utcDate) => {
        const date = new Date(utcDate);
        return date.toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };


    return (
        <div className="invoiceDetails-container">
            <Navbar/>
            <h1 className="invoiceDetails-title">Invoice List</h1>
            <h6 className='text-dark text-start'>Name : {invoices[0].first_name}</h6>
            <h6 className='text-dark text-start'> Email : {invoices[0].email}</h6>
            <table className="invoiceDetails-table">
                <thead>
                    <tr>
                        <th>Invoice ID</th>
                        <th>Date</th>
                        <th>Amount Paid</th>
                        <th>Installment </th>
                        <th>Payment Status</th>
                        <th>Mode Of Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="invoiceDetails-row">
                            <td>{invoice.id}</td>
                            <td>{new Date(invoice.invoice_date).toLocaleString()}</td>
                            <td>₹{invoice.current_paid_amount_with_gst}</td>
                            <td>{invoice.installment_count}</td>
                            <td className={invoice.course.amount_with_gst <= invoice.course.paid_amount? 'bg-success text-light' : 'bg-warning'}>{invoice.course.amount_with_gst <= invoice.course.paid_amount ? 'Completed' : 'Pending Balance'}</td>
                            <td>{invoice.mode_of_payment}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default InvoiceDetails;
