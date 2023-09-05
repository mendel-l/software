


import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import MainPagetitle from '../../layouts/MainPagetitle';
import { CSVLink } from 'react-csv';

const tableData = [
    {invoice : 'INV-00001', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-00002', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-00003', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-00004', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-00005', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-00006', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-00007', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-00008', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-00009', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000010', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000011', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000012', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000013', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000014', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000015', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000016', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000017', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000018', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000019', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000020', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000021', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000022', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},
    {invoice : 'INV-000023', customer: 'Ricky Antony',date: '14 May 2023', duedate: '25 May 2023', amount: '105', discount: '5', open: '120', adjust:'0.00', status:'Active'},
    {invoice : 'INV-000024', customer: 'Jack John',date: '25 May 2023', duedate: '01 June 2023', amount: '230', discount: '10', open: '150', adjust:'0.00', status:'Pending'},  
    
]

const headers = [
    { label: "Invoice", key: "invoice" },
    { label: "Customer", key: "customer" },
    { label: "Date", key: "date" },
    { label: "Due Date", key: "duedate" },
    { label: "Amount", key: "amount" },
    { label: "Discount", key: "discount" },
    { label: "Open", key: "open" },
    { label: "Adjustment", key: "adjust" },
    { label: "Status", key: "status" }
   
]
const csvlink = {
    headers : headers,
    data : tableData,
    filename: "csvfile.csv"
}

const Report = () => {          
    const [currentPage , setCurrentPage] = useState(1);
    const recordsPage = 10;
    const lastIndex = currentPage * recordsPage;
    const firstIndex = lastIndex - recordsPage;   
    const records = tableData.slice(firstIndex, lastIndex);
    const npage = Math.ceil(tableData.length / recordsPage)
    const number = [...Array(npage + 1).keys()].slice(1)
    function prePage (){
        if(currentPage !== 1){
            setCurrentPage(currentPage - 1)
        }
    }
    function changeCPage (id){
        setCurrentPage(id);
    }
    function nextPage (){
        if(currentPage !== npage){
            setCurrentPage(currentPage + 1)
        }
    }
    return (
        <>
            <MainPagetitle mainTitle="Reports" pageTitle="Generated Report"  parentTitle="Home" /> 
            <div className='container-fluid'>
                <div className='row'>
                    <div className="col-xl-12">
                        <div className="card">                            
                            <div className="card-body p-0">
                                <div className="table-responsive active-projects manage-client">   
                                    <div className="tbl-caption d-flex justify-content-between text-wrap align-items-center">
                                        <h4 className="heading mb-0">Generated Report</h4>
                                        <div>
                                            <CSVLink {...csvlink} className="btn btn-primary light btn-sm">
                                                <i className="fa-solid fa-file-excel" /> {" "} 
                                                Export Report
                                            </CSVLink> 
                                        </div>
                                        
                                    </div>          
                                    <div id="report-tblwrapper" className="dataTables_wrapper no-footer">
                                        <table id="reports-tbl" className="table ItemsCheckboxSec dataTable no-footer mb-0">
                                            <thead>
                                                <tr>
                                                    <th>Invoice #</th>
                                                    <th>Customer</th>
                                                    <th>Date</th>
                                                    <th>Due Date</th>
                                                    <th>Amount</th>
                                                    <th>Discount</th>
                                                    <th>Amount Open</th>
                                                    <th>Adjustment</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {records.map((item, index)=>(
                                                    <tr key={index}>
                                                        <td>
													        <Link to={"#"} className="text-primary">{item.invoice}</Link>
                                                        </td>   
                                                        <td><span>{item.customer}</span></td>
                                                        <td>
                                                            <span>{item.date}</span>
                                                        </td>
                                                        <td>
                                                            <span>{item.duedate}</span>
                                                        </td>	
                                                        <td>
                                                            <span className="text-secondary">{item.amount} $</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-secondary">{item.discount} $</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-secondary">{item.open} $</span>
                                                        </td>
                                                        <td>
                                                            <span className="text-secondary">{item.adjust}</span>
                                                        </td>
                                                        <td>
                                                            <span className={`badge light border-0 ${item.status === "Active" ? 'badge-success' : 'badge-danger'}`}>{item.status}</span>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            
                                        </table>
                                        <div className="d-sm-flex text-center justify-content-between align-items-center">
                                            
                                            <div className='dataTables_info'>
                                                Showing {lastIndex-recordsPage + 1} to{" "}                                    
                                                {tableData.length < lastIndex ? tableData.length : lastIndex}
                                                {" "}of {tableData.length} entries
                                            </div>
                                            <div
                                                className="dataTables_paginate paging_simple_numbers justify-content-center"
                                                id="example2_paginate"
                                            >
                                                <Link
                                                    className="paginate_button previous disabled"
                                                    to="#"                                        
                                                    onClick={prePage}
                                                >
                                                    <i className="fa-solid fa-angle-left" />
                                                </Link>
                                                <span>                                      
                                                    {number.map((n , i )=>(
                                                        <Link className={`paginate_button ${currentPage === n ? 'current' :  '' } `} key={i}                                            
                                                            onClick={()=>changeCPage(n)}
                                                        > 
                                                            {n}                                                

                                                        </Link>
                                                    ))}
                                                </span>
                                                <Link
                                                    className="paginate_button next"
                                                    to="#"                                        
                                                    onClick={nextPage}
                                                >
                                                    <i className="fa-solid fa-angle-right" />
                                                </Link>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Report;