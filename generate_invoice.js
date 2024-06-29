const fs = require('fs');
const htmlToPdf = require('html-pdf');

// Function to populate HTML template with sample data
function populateInvoiceTemplate() {
    const invoiceData = {
        companyLogoUrl: 'path/to/company_logo.png',
        invoiceNo: 'INV-001',
        orderNo: 'ORD-123',
        orderDate: '2024-06-27',
        invoiceDate: '2024-06-28',
        sellerName: 'Example Seller',
        sellerAddress: '123 Main St, City, State, Pincode',
        sellerPAN: 'ABCDE1234F',
        sellerGST: 'GSTIN123456789',
        buyerName: 'Example Buyer',
        buyerAddress: '456 Oak Ave, City, State, Pincode',
        shippingName: 'Example Receiver',
        shippingAddress: '789 Elm Blvd, City, State, Pincode',
        orderItems: [
            {
                description: 'Product 1',
                unitPrice: '100',
                quantity: '2',
                discount: '0',
                netAmount: '200',
                taxRate: '18',
                taxAmount: '36',
                totalAmount: '236'
            },
            {
                description: 'Product 2',
                unitPrice: '50',
                quantity: '1',
                discount: '5',
                netAmount: '45',
                taxRate: '18',
                taxAmount: '8.1',
                totalAmount: '53.1'
            }
            // Add more items as needed
        ],
        totalAmount: '289.1',
        amountInWords: 'Two Hundred Eighty-Nine Dollars and Ten Cents'
    };

    // Read and populate HTML template file
    let htmlContent = fs.readFileSync('./invoice_template.html', 'utf8');
    // Replace placeholders with actual data
    for (let key in invoiceData) {
        htmlContent = htmlContent.replace(new RegExp('{{ ' + key + ' }}', 'g'), invoiceData[key]);
    }

    return htmlContent;
}

// Function to generate PDF from HTML content
async function generateInvoicePDF(htmlContent, outputPath) {
    try {
        const pdf = await htmlToPdf.create(htmlContent, {
            format: 'A4',
            border: '10mm',
        }).toFile(outputPath);
        console.log('PDF generated:', pdf);
    } catch(error) {
        console.error('Error generating PDF:', error);
    }
}

// Example usage
const populatedHtml = populateInvoiceTemplate();
const outputPath = './generated_invoices/invoice.pdf'; // Path where PDF will be saved
generateInvoicePDF(populatedHtml, outputPath);
