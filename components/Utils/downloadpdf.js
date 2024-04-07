// import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import numberToWords from "number-to-words";

const createPdfContent = async (data) => {
  const element = document.createElement("div");
  element.style.width = "210mm"; // Set width to A4 paper size
  element.style.minHeight = "297mm";
  element.innerHTML = `
    <div style="padding: 20px;">
      <div style=" display: flex; justify-content: space-between; align-items: item-center;">
        <div id="image-container" >
          <img src="/images/logo1.png" alt="logo" style="width: 200px; height: auto; margin-bottom: 20px; margin-left: 20px;" />
        </div>
        <div>
          <h5 style="color: black;"> Original for Recipient </h5>
        </div>
      </div>

      <div id="invoice-container" style="color: #000; padding: 20px;">
        <div style="display: flex; justify-content: space-between;">
          <div>
            <h3 style="margin: 0; color: #333; margin-bottom: 10px; color: #817e7e">${
              data.companyName
            }</h3>
            <p style="margin: 2px; font-size: 12px; color: #817e7e">PAN: GAUPP7041E</p>
            <p style="margin: 2px; font-size: 12px; color: #817e7e">${data.companyAddress}</p>
            <p style="margin: 2px; font-size: 12px; color: #817e7e">GST: ${data.companyGST}</p>
            <p style="margin: 2px; font-size: 12px; color: #817e7e">CIN No: U62099MH2023PTC410030</p>
            <p style="margin: 2px; font-size: 12px; color: #817e7e">Mobile: ${
              data.companyMobile
            }</p>
            <p style="margin: 2px; font-size: 12px; color: #817e7e">Email: ${
              data.companyEmail
            }</p>
          </div>
          <div style="text-align: right;">
          <p style="font-size: 20px; font-weight: 600">TAX INVOICE</p>
            <p style="margin: 2px; font-size: 12px; color: #817e7e;"><strong>Invoice No:</strong> 
             2324-11-0001 </p>
            <p style="margin: 2px; font-size: 12px;"><strong>Date:</strong> 01/02/2024</p>
          </div>
        </div>
        
        <div style="">
          <div>
            <div style=" margin-top: 20px; margin-bottom: 10px">
              <p style="margin: 2px; font-size: 16px; color: #817e7e"><strong>Bill To:</strong> 
              <div style=" font-size: 16px; font-weight: 600;">
                ${data.clientName}
              </div></p>
              <p style="margin: 2px; font-size: 12px;">${data.clientDetails}</p>
              <p style="margin: 2px; font-size: 12px;">Dadar West</p>
              <p style="margin: 2px; font-size: 12px;">Mumbai-400066</p>
              <p style="margin: 2px; font-size: 12px;">Maharashtra-India</p>
              <p style="margin: 2px; font-size: 12px;">GST: ${data.companyGST}</p>
              <p style="margin: 2px; font-size: 12px; margin-top: 10px">Place of Supply: Maharashtra</p>
            </div>
            
            <table style="width: 100%; margin-top: 20px; text-align: center; border: 1px solid #c2c2c2;">
              <thead style="background-color: #3b3d39; text-align: left; border: none; ">
                <tr style=" color: #fff; text-align: center; border: none; height: 40px;">
                  <th style="font-size: 12px; border: none; font-weight: 400;">Sr No</th>
                  <th style="font-size: 12px; border: none; font-weight: 400;">Item & Description</th>
                  <th style="font-size: 12px; border: none; font-weight: 400; text-align: center;">HSN Code</th>
                  <th style="font-size: 12px; border: none; font-weight: 400;">QTY</th>
                  <th style="font-size: 12px; border: none; font-weight: 400; text-align: center;">Rate</th>
                  <th style="font-size: 12px; border: none; font-weight: 400; text-align: center;">Amount</th> 
                </tr>
              </thead>
              <tbody>
                ${data.items
                  .map(
                    (item, index) => `
                      <tr style="background-color: #fff; ">
                        <td style="font-size: 12px; border: none; text-align: center;">${
                          index + 1
                        }</td>
                        <td style="font-size: 12px; border: none; text-align: left;">${
                          item.description
                        }</td>
                        <td style="font-size: 12px; border: none; text-align: center;">99367</td> <!-- Need to add field in array HSN Code -->
                        <th style="font-size: 12px; border: none; font-weight: 400; text-align: center;">5</th>
                        <th style="font-size: 12px; border: none; font-weight: 400; text-align: center;">100</th>
                        <td style="font-size: 12px; border: none;">${
                          item.amount
                        }</td>
                      </tr>
                    `
                  )
                  .join("")}
                <!-- Subtotal -->
                <tr style="border-bottom: none;">
                  <td colspan="5" style="padding: 8px; border: none; text-align: right; font-weight: 500; font-size: 14px;">Subtotal</td>
                  <td style="padding: 8px; border: none; font-size: 12px;">500.00</td>
                </tr>
                <!-- GST(18%) -->
                <tr style="border-bottom: none; ">
                  <td colspan="5" style="padding: 8px; border: none; text-align: right; font-weight: 500; font-size: 14px;">CGST(9%)</td>
                  <td style="padding: 8px; border: none; font-size: 12px;">45.00</td>
                </tr>
                <tr style="border-bottom: none; ">
                  <td colspan="5" style="padding: 8px; border: none; text-align: right; font-weight: 500; font-size: 14px;">SGST(9%)</td>
                  <td style="padding: 8px; border: none; font-size: 12px;">45.00</td>
                </tr>
                <!-- GST(18%) -->
                <tr style="border-bottom: none; ">
                  <td colspan="5" style="padding: 8px; border: none; text-align: right; font-weight: 500; font-size: 14px;">Total</td>
                  <td style="padding: 8px; border: none; font-size: 12px; background-color: #ddd;">590</td>
                </tr>
               <tr style="border-bottom: none; border-top: 1px solid #c2c2c2; height: 40px;">
                  <td colspan="6" style=" border: none; text-align: right; font-weight: 500; font-size: 12px; text-align: left;">Amount In Words: <span style="font-size: 12px;" >${data.totalAmount} Only/-</span></td>
               </tr>


              </tbody>
            </table>

          </div>
        </div>
      </div>

      <div style="margin-top: 20px; display: flex; flex-direction: column; bottom: 0; padding: 20px;">
        <div style=" margin-top: 15px;">
          <p style="font-size: 15px; font-weight: 500; color: ##838181;">Declaration:</p>
          <p style="margin: 0px; padding: 0px; font-size: 12px; color: black;">This is a computer generated invoice.</p>
        </div>
        <div style=" margin-top: 15px;">
          <p style="font-size: 15px; font-weight: 500; color: ##838181;">Terms and Conditions:</p>
          <p style="margin: 0px; padding: 0px; font-size: 12px; color: black;"> 1. Service termination shall happen automatically at the end of service period unless renewed.</p>
          <p style="margin: 0px; padding: 0px; font-size: 12px; color: black;"> 2. Service shall be available only on advance pre-payment</p>
        </div> 
      </div>
    </div>
  `;
  return element;
};

const generatePdf = async (data) => {
  const pdf = new jsPDF();

  try {
    const content = await createPdfContent(data);
    document.body.appendChild(content);
    const canvas = await html2canvas(content, {
      scale: 4,
      logging: true,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");
    pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
    document.body.removeChild(content);

    return pdf;
  } catch (error) {
    console.error("Error generating PDF", error);
    document.body.removeChild(content);
    return null;
  }
};

const displayPdfInPopup = (pdf) => {
  const pdfBlob = pdf.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  const modal = document.createElement("div");
  modal.style.width = "80%";
  modal.style.height = "80%";
  modal.style.position = "fixed";
  modal.style.top = "10%";
  modal.style.left = "10%";
  modal.style.backgroundColor = "white";
  modal.style.zIndex = "1000";
  modal.style.padding = "20px";
  const closeButton = document.createElement("button");
  closeButton.textContent = "X";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.padding = "5px 10px";
  closeButton.style.cursor = "pointer";
  closeButton.style.background = "gray";
  closeButton.style.color = "white";
  closeButton.addEventListener("click", () => {
    document.body.removeChild(modal);
    URL.revokeObjectURL(pdfUrl);
  });

  const iframe = document.createElement("iframe");
  iframe.src = pdfUrl;
  iframe.style.width = "100%";
  iframe.style.height = "100%";
  iframe.style.border = "none"; // Remove iframe border
  modal.appendChild(closeButton);
  modal.appendChild(iframe);
  document.body.appendChild(modal);
};

const downloadPdfFile = (pdf, fileName) => {
  const pdfBlob = pdf.output("blob");
  const link = document.createElement("a");
  link.href = URL.createObjectURL(pdfBlob);
  link.download = fileName || "download.pdf";
  document.body.appendChild(link); // Append to body to ensure it works in all browsers
  link.click();
  document.body.removeChild(link); // Remove the link when done
  URL.revokeObjectURL(link.href); // Clean up
};

const handlePdfActions = async (data, action) => {
  const pdf = await generatePdf(data);
  if (pdf) {
    if (action === "download") {
      downloadPdfFile(pdf);
    } else if (action === "view") {
      displayPdfInPopup(pdf);
    }
  }
};

export default handlePdfActions;