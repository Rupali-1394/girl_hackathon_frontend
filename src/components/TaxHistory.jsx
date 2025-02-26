import React from 'react';
import { 
    Paper, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow,
    Typography 
} from '@mui/material';

const TaxHistory = ({ calculations }) => {
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    };

    if (!calculations || calculations.length === 0) {
        return (
            <Paper elevation={3} sx={{ p: 2, mt: 2, textAlign: 'center' }}>
                <Typography variant="h6" gutterBottom>Tax Calculation History</Typography>
                <Typography color="textSecondary">
                    No calculations yet. Try calculating your taxes above.
                </Typography>
            </Paper>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
            <Typography variant="h6" gutterBottom>Tax Calculation History</Typography>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell align="right">Income</TableCell>
                            <TableCell align="right">Deductions</TableCell>
                            <TableCell align="right">Tax Amount</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {calculations.map((calc, index) => (
                            <TableRow key={index}>
                                <TableCell>{new Date(calc.timestamp).toLocaleDateString()}</TableCell>
                                <TableCell align="right">{formatCurrency(calc.annualIncome)}</TableCell>
                                <TableCell align="right">{formatCurrency(calc.deductions)}</TableCell>
                                <TableCell align="right">{formatCurrency(calc.taxAmount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default TaxHistory; 