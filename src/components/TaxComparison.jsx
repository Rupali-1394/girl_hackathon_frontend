import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TaxComparison = ({ currentTax, previousTax }) => {
    const formatCurrency = (val) => {
        return val ? Number(val) : 0;
    };

    const data = [
        {
            name: 'Income',
            Current: formatCurrency(currentTax.annualIncome),
            Previous: formatCurrency(previousTax.annualIncome)
        },
        {
            name: 'Tax Amount',
            Current: formatCurrency(currentTax.taxAmount),
            Previous: formatCurrency(previousTax.taxAmount)
        },
        {
            name: 'Net Income',
            Current: formatCurrency(currentTax.netIncome),
            Previous: formatCurrency(previousTax.netIncome)
        }
    ];

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Tax Comparison</Typography>
            <Box sx={{ width: '100%', height: 300 }}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    <Legend />
                    <Bar dataKey="Current" fill="#8884d8" name="Current Calculation" />
                    <Bar dataKey="Previous" fill="#82ca9d" name="Previous Calculation" />
                </BarChart>
            </Box>
        </Paper>
    );
};

export default TaxComparison; 