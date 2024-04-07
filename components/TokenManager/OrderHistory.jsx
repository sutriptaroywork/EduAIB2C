import React from "react";
import download from "../../public/images/download.png";
import Image from "next/image";
import { useSelector } from "react-redux";
import handlePdfActions from "../Utils/downloadpdf";
import DataTable from "react-data-table-component";
import { userProfileData } from "../../redux/slices/layoutSlice";
import numberToWords from "number-to-words";

const customStyles = {
  headCells: {
    style: {
      justifyContent: "center",
      backgroundColor: "#eee8fe",
      color: "#ffcc02",
      fontSize: "16px",
      fontWeight: "800",
      border: "1px solid #B9B9B9",
      borderBottomStyle: "none",
    },
  },
  cells: {
    style: {
      border: "0.1px solid #B9B9B9",
      borderBottomStyle: "none",
      borderleftStyle: "none",
      borderrightStyle: "none",
      color: "#1f1f1f",
      fontWeight: "600",
      justifyContent: "center",
      backgroundColor: "white",
    },
  },
  rows: {
    style: {
      margin: 0,
      padding: 0,
      borderBottomStyle: "none",
      borderleftStyle: "none",
      borderrightStyle: "none",
      justifyContent: "center",
    },
  },
  table: {
    style: {
      borderCollapse: "collapse",
      borderRadius: "20px",
    },
  },
  pagination: {
    style: {
      justifyContent: "center",
    },
  },
};

const OrderHistory = () => {
  const userOrderHistory = useSelector((state) => state?.userData?.data?.orderHistory);



  const pdf = {
    "orderId": "12345",
    "companyName": "shikshaML",
    "companyAddress": "1234 Business Ave, City, State, Zip",
    "companyGST": "27AABCU9603R1ZT",
    "companyMobile": "+1 234 567 8900",
    "companyEmail": "contact@xyzcorporation.com",
    "clientName": "ABC Industries",
    "clientDetails": "5678 Industry Rd, Other City, State, Zip",
    "invoiceNumber": "INV-2024-001",
    "totalAmount": numberToWords.toWords(590).replace(/^\w/, (c) => c.toUpperCase()),
    "items": [
      {
        "description": "Product or Service Description",
        "token": "ItemCode123",
        "amount": "500.00"
      }
    ],
    "declaration": "This is a computer-generated invoice and does not require a signature.",
    "note": "Thank you for your business!",
    "terms": "Please make the payment within 30 days."
  }


  const handleDownloadButtonClick = (rowId) => {
    handlePdfActions(pdf, "download");
  };
  const handleViewButtonClick = () => {
    handlePdfActions(pdf, "view");
  };

  const columns = [
    {
      name: "Purchase Date",
      cell: (row, index) => {
        const dateObject = new Date(row.orderDate);
        const formattedDate = dateObject.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
        return formattedDate;
      },
      selector: "orderDate",
      sortable: false,
      width: "15%",
    },
    {
      name: "Order ID",
      cell: (row, index) => row.orderId,
      selector: "orderId",
      sortable: false,
      width: "15%",
    },
    {
      name: "No. of Token Purchased",
      cell: (row, index) => row.orderedQuantity.toLocaleString(),
      selector: "orderedQuantity",
      sortable: false,
      width: "30%",
    },
    {
      name: "Amount in ₹",
      cell: (row, index) => row.amount.toLocaleString(),
      selector: "amount",
      sortable: false,
      width: "25%",
    },
    {
      name: "Invoice",
      cell: (row) => (
        <div className="flex items-center justify-center h-[20px]">
          <Image
            src={download}
            alt="Download Invoice"
            style={{ maxWidth: "50px", maxHeight: "20px" }}
            className="hover:cursor-pointer mr-4"
            onClick={() => handleDownloadButtonClick(row)}
          />
          <button onClick={() => handleViewButtonClick(row)}>View</button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <DataTable
        columns={columns}
        data={userOrderHistory}
        pagination
        paginationPerPage={10}
        paginationRowsPerPageOptions={[10, 20, 30]}
        customStyles={customStyles}
      />
    </div>
  );
};

export default OrderHistory;
