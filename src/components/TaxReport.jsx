import React from 'react';
import { Button } from '@mui/material';
import { PictureAsPdf } from '@mui/icons-material';
import { jsPDF } from 'jspdf';

const TaxReport = ({ taxData }) => {
    const generatePDF = () => {
        try {
            const doc = new jsPDF();
            
            // Add current date
            const date = new Date().toLocaleDateString();
            doc.setFontSize(10);
            doc.text(`Generated on: ${date}`, 20, 10);
            
            doc.setFontSize(16);
            doc.text('Tax Calculation Report', 20, 20);
            
            doc.setFontSize(12);
            doc.text(`Annual Income: $${taxData.annualIncome.toLocaleString()}`, 20, 40);
            doc.text(`Deductions: $${taxData.deductions.toLocaleString()}`, 20, 50);
            doc.text(`Tax Amount: $${taxData.taxAmount.toLocaleString()}`, 20, 60);
            doc.text(`Net Income: $${taxData.netIncome.toLocaleString()}`, 20, 70);
            
            doc.save('tax-report.pdf');
        } catch (error) {
            console.error('Error generating PDF:', error);
            alert('Failed to generate PDF. Please try again.');
        }
    };

    return (
        <Button
            variant="contained"
            startIcon={<PictureAsPdf />}
            onClick={generatePDF}
            sx={{ mt: 2 }}
        >
            Generate PDF Report
        </Button>
    );
};

export default TaxReport; 