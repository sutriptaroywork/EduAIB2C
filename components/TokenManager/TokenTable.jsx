// import React from 'react';
// import DataTable from 'react-data-table-component';
 
// const TokenTable = ({ data, columns }) => {
 
//   const customStyles = {
//     headCells: {
//       style: {
//         justifyContent: "center",
//         backgroundColor: "#eee8fe",
//         color: "#9362F3",
//         fontSize: "16px",
//         fontWeight: "800",
//         border: "1px solid #B9B9B9", // Add borders to cells
//         borderBottomStyle: "none",
//       },
//     },
//     cells: {
//       style: {
//         border: "0.1px solid #B9B9B9", // Add borders to cells
//         borderBottomStyle: "none",
//         borderleftStyle: "none",
//         borderrightStyle: "none",
//         color: "#1f1f1f",
//         fontWeight: "600",
//         justifyContent: "center",
//         backgroundColor: "white", // Set background color of td to white
//         // fontWeight: "bold",
//       },
//     },
//     rows: {
//       style: {
//         margin: 0,
//         padding: 0,
//         borderBottomStyle: "none",
//         borderleftStyle: "none",
//         borderrightStyle: "none",
//         justifyContent: "center",
//       },
//     },
//     table: {
//       style: {
//         borderCollapse: "collapse", // Ensures that the border is collapsed (for a cleaner look)
//         borderRadius: "20px", // Add border radius
//       },
//     },
//     pagination: {
//       style: {
//         justifyContent: "center", // Center align the pagination
//       },
//     },
//   }
 
//   return (
//     <DataTable
//       columns={columns}
//       data={data}
//       pagination
//       paginationPerPage={10}
//       paginationRowsPerPageOptions={[10, 20, 30]}
//       noHeader
//       striped
//       highlightOnHover
//       dense
//       customStyles={customStyles}
//     />
//   );
// };
 
// export default TokenTable;