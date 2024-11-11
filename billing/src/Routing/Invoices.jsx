import React, { useEffect, useState } from 'react';
import './Invoice.css';
import { useParams } from 'react-router-dom';
import axiosInstance from '../Axios';
import Navbar from '../Components/Navbar';



const Invoice = () => {
  const { uuid } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [client, setClient] = useState(null);
  const [course, setCourse] = useState(null);

  // Fetching invoice data from the API
  const getInvoice = async () => {
    try {
      const response = await axiosInstance.get(`fee/update-invoice/?invoice_uuid=${uuid}`);
      setInvoice(response.data.data);
      setClient(response.data.user);
      setCourse(response.data.course);
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };


  const downloadPDFHandler = async () => {
    try {
      const response = await axiosInstance.get(`fee/download-invoice/?invoice_uuid=${uuid}`, {
        responseType: 'blob',
      });
  
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `invoice - ${client.email}.pdf`;  // Specify the default file name for download
  
      link.click();
      
      URL.revokeObjectURL(link.href);
  
    } catch (error) {
      console.error('Error fetching invoice:', error);
    }
  };
  

  useEffect(() => {
    getInvoice();
  }, []);

  if (!invoice) {
    return <div>Loading...</div>;
  }

  return (
    <div className="custom-invoice-container">
      <Navbar />
      <div className="custom-invoice-card ">
      <div className="btn btn-warning mb-3" onClick={downloadPDFHandler}>Download</div>

        <div className="row">
          <div className="col-lg-4">
            <h5>Maitexa info solutions</h5>
            <p className='invoice-company-address'>First floor,PV Building,Annie Hall Road,Calicut-02 <br />
              Phone:3424378923 | Mob:479229934
            </p>
          </div>
          <div className="col-lg-4">
            <h1 className='text-center'>Invoice</h1>
          </div>
          <div className="col-lg-4">
            <div className='invoice-logo' style={{paddingLeft:'40px'}}>
              <img src="/path-to-logo.png" alt="Company Logo" className="company-logo" />
              <p><strong>Company Name</strong></p></div>
          </div>

        </div>

        <div className="custom-invoice-header">
          <div className="header-left mt-2">
            {/* Billing Information */}
            <div className="custom-billing-info">
              <h4 className='rm-defaults'>Bill To:</h4>
              <p className='rm-defaults'><strong>{client?.name}</strong></p>
              <p className='rm-defaults'>{client?.address}</p>
              <p className='rm-defaults'>Email : {client?.email}</p>
              <p className='rm-defaults'>Ph : {client?.phone}</p>
              <p className='rm-defaults'>{client?.address_line1}</p>
              <p className='rm-defaults'>{client?.city},{client?.state},{client?.zip_code}</p>
            </div>
          </div>
          <div className="header-right mt-2">
            <div className="row" style={{ width: '340px', marginLeft: '50px' }}>
              <div className="col">
                <p className='rm-defaults'><strong>Invoice No:</strong> </p>
                <p className='rm-defaults'><strong>Invoice Date:</strong></p>
                <p className='rm-defaults'><strong>Joining Date:</strong></p>
                <p className='rm-defaults'><strong>Payment Method:</strong></p>
              </div>
              <div className="col">
                <p className='rm-defaults' style={{ textAlign: 'left' }}>{invoice.id}</p>
                <p className='rm-defaults' style={{ textAlign: 'left' }}> {new Date(invoice.invoice_date).toLocaleDateString()}</p>
                <p className='rm-defaults' style={{ textAlign: 'left' }}>{new Date(invoice.joining_date).toLocaleDateString()}</p>
                <p className='rm-defaults' style={{ textAlign: 'left' }}>{invoice.mode_of_payment.toUpperCase()}</p>
              </div>
            </div>

          </div>
        </div>



        {/* Table Section */}
        <div className="custom-table-section">
          <table className="custom-invoice-table">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Duration</th>
                <th>Installment</th>
                <th>Total Fee</th>
                <th>Discount</th>
                <th>Paid Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{invoice.course?.course.course_name}</td>
                <td>{invoice.course?.course.course_duration} Months</td>
                <td>{invoice.installment_count}</td>
                <td>₹{course?.amount_with_gst}</td>
                <td>₹{course.fee_discount}</td>
                <td>₹{invoice.current_paid_amount_with_gst}</td>
              </tr>
              <tr>
                <td>Total Amount In Words :- </td>
                <td style={{ textAlign: 'right' }} colSpan={4}>{invoice?.amount_in_words}</td>
                <td>₹{invoice?.current_paid_amount_with_gst}</td>
              </tr>
              <tr style={{ background: '#bce261' }}>
                <td style={{ textAlign: 'right' }} colSpan={5}>Balance</td>
                <td className='text-right'>₹{course?.balance}</td>
              </tr>

            </tbody>
          </table>
        </div>

        {/* Important Notes Section */}
        <div className="custom-important-notes">
          <h5>Important Notes:</h5>
          <ul>
            <li>This invoice is subject to mutually acceptable terms and conditions.</li>
            <li>The allocated time for daily classes is 1.5 hrs per day / 7-8 hrs a week.</li>
            <li>Course validity/due date: {new Date(invoice.course_duration).toLocaleDateString()}</li>
            <li>If you have any questions concerning this invoice, please contact us at: [email]</li>
          </ul>
        </div>

        <div className="invoice-regard mt-3">
          <p>Regards <br />
            Manager-Accounts</p>
        </div>

        {/* Footer */}
        <div className="custom-invoice-footer">
          Thank you for joining us !!! Start learning and get hired fast <br />
          <i className='text-muted'>This is computer generated invoice no signature required</i>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
