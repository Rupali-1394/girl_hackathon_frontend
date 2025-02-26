import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';

const TaxForm = ({ onResult }) => {
    const [formData, setFormData] = useState({
        annualIncome: '',
        deductions: ''
    });

    const calculateTax = (income, deductions) => {
        const taxableIncome = Math.max(0, income - deductions);
        let tax = 0;

        // 2023 Tax Brackets (example)
        if (taxableIncome <= 11000) {
            tax = taxableIncome * 0.10;
        } else if (taxableIncome <= 44725) {
            tax = 1100 + (taxableIncome - 11000) * 0.12;
        } else if (taxableIncome <= 95375) {
            tax = 5147 + (taxableIncome - 44725) * 0.22;
        } else if (taxableIncome <= 182100) {
            tax = 16290 + (taxableIncome - 95375) * 0.24;
        } else if (taxableIncome <= 231250) {
            tax = 37104 + (taxableIncome - 182100) * 0.32;
        } else if (taxableIncome <= 578125) {
            tax = 52832 + (taxableIncome - 231250) * 0.35;
        } else {
            tax = 174238.25 + (taxableIncome - 578125) * 0.37;
        }

        return {
            annualIncome: income,
            deductions: deductions,
            taxableIncome: taxableIncome,
            taxAmount: Math.round(tax),
            netIncome: income - Math.round(tax),
            effectiveRate: ((tax / income) * 100).toFixed(2)
        };
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = calculateTax(
            parseFloat(formData.annualIncome) || 0,
            parseFloat(formData.deductions) || 0
        );
        onResult(result);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
            <Box component="form" onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Annual Income ($)"
                    name="annualIncome"
                    type="number"
                    value={formData.annualIncome}
                    onChange={handleChange}
                    margin="normal"
                    required
                />
                <TextField
                    fullWidth
                    label="Deductions ($)"
                    name="deductions"
                    type="number"
                    value={formData.deductions}
                    onChange={handleChange}
                    margin="normal"
                />
                <Button 
                    variant="contained" 
                    type="submit" 
                    sx={{ mt: 2 }}
                    fullWidth
                >
                    Calculate Tax
                </Button>
            </Box>
        </Paper>
    );
};

export default TaxForm;