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
                        <th>Total Amount</th>
                        <th>Amount Paid</th>
                        <th>Payment Status</th>
                        <th>Mode Of Payment</th>
                    </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                        <tr key={invoice.id} className="invoiceDetails-row">
                            <td>{invoice.id}</td>
                            <td>{formatISTDate(invoice.invoice_date)}</td>
                            <td>₹{invoice.total_amount}</td>
                            <td>₹{invoice.paid_amount}</td>
                            <td className={invoice.payment_status == 'Paid' ? 'bg-success text-light' : 'bg-warning'}>{invoice.payment_status == 'Paid' ? 'Completed' : 'Pending Balance'}</td>
                            <td>{invoice.mode_of_payment}</td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


export default InvoiceDetails;
