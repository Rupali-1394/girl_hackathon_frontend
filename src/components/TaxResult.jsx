import React from 'react';
import { Paper, Typography, Grid, Box } from '@mui/material';

const TaxResult = ({ result }) => {
    if (!result) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    const resultItems = [
        { label: 'Annual Income', value: result.annualIncome },
        { label: 'Deductions', value: result.deductions },
        { label: 'Taxable Income', value: result.taxableIncome },
        { label: 'Tax Amount', value: result.taxAmount },
        { label: 'Net Income', value: result.netIncome }
    ];

    return (
        <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
                Tax Calculation Results
            </Typography>
            <Grid container spacing={2}>
                {resultItems.map((item, index) => (
                    <Grid item xs={12} key={index}>
                        <Box display="flex" justifyContent="space-between">
                            <Typography>{item.label}:</Typography>
                            <Typography fontWeight="bold">
                                {formatCurrency(item.value)}
                            </Typography>
                        </Box>
                    </Grid>
                ))}
            </Grid>
        </Paper>
    );
};

export default TaxResult;