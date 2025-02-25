import React, { useState } from 'react';
import { TextField, Button, Box, Paper } from '@mui/material';
import { calculateTax } from '../services/api';

const TaxForm = ({ onResult }) => {
    const [formData, setFormData] = useState({
        annualIncome: '',
        deductions: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await calculateTax(formData);
            onResult(result);
        } catch (error) {
            console.error('Error calculating tax:', error);
        }
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