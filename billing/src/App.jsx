import './App.css'
import {Routes, Route, Link } from 'react-router-dom';
import Login from './Routing/Login';
import Dashboard from './Routing/Dashboard';
import Customers from './Routing/Customers';
import Invoices from './Routing/Invoices';
import RegisterForm from './Routing/Registration';
import PayFee from './Routing/PayFee';
import PayFeeComponent from './Routing/PayfeeComponent';
import BillingDetails from './Routing/BillingDetails';
import InvoiceDetails from './Routing/InvoiceDetails';
import CourseTable from './Routing/CourseTable';
import Reports from './Routing/Reports';
import PayEmi from './Routing/PayEmi';
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/courses" element={<CourseTable />} />
        <Route path="/invoices/:uuid" element={<Invoices />} />
        <Route path="/registration" element={<RegisterForm />} />
        <Route path="/payfees" element={<PayFee />} />
        <Route path="/payfeesform/:uuid" element={<PayFeeComponent />} />
        <Route path="/invoicelist" element={< BillingDetails/>} />
        <Route path="/invoiceDetails/:uuid" element={< InvoiceDetails/>} />
        <Route path="/reports" element={< Reports/>} />
        <Route path="/payemi/:uuid" element={< PayEmi/>} />
      </Routes>
    </>
  )
}

export default App
