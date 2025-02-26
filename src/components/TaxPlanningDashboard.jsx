import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Slider,
    TextField,
    Card,
    CardContent
} from '@mui/material';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const TaxPlanningDashboard = ({ initialData }) => {
    const [scenarios, setScenarios] = useState({
        income: 75000,
        investments: 10000,
        deductions: 12000
    });

    const [projections, setProjections] = useState([]);

    const calculateProjections = () => {
        // This is a simplified calculation - replace with actual tax calculation logic
        const monthlyData = [];
        let cumulativeIncome = 0;
        let cumulativeTax = 0;

        for (let month = 1; month <= 12; month++) {
            cumulativeIncome = (scenarios.income / 12) * month;
            const monthlyInvestmentReturn = (scenarios.investments * 0.06) / 12;
            const monthlyDeduction = scenarios.deductions / 12;
            
            const taxableIncome = cumulativeIncome + monthlyInvestmentReturn - monthlyDeduction;
            cumulativeTax = taxableIncome * 0.24; // Simplified tax rate

            monthlyData.push({
                month: `Month ${month}`,
                income: cumulativeIncome,
                tax: cumulativeTax,
                netIncome: cumulativeIncome - cumulativeTax
            });
        }

        setProjections(monthlyData);
    };

    useEffect(() => {
        calculateProjections();
    }, [calculateProjections, scenarios]);

    const handleScenarioChange = (field, value) => {
        setScenarios(prev => ({
            ...prev,
            [field]: Number(value)
        }));
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Typography variant="h6" gutterBottom>
                Interactive Tax Planning Dashboard
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>Annual Income</Typography>
                            <Slider
                                value={scenarios.income}
                                onChange={(e, value) => handleScenarioChange('income', value)}
                                min={0}
                                max={200000}
                                step={1000}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `$${value.toLocaleString()}`}
                            />
                            <TextField
                                fullWidth
                                value={scenarios.income}
                                onChange={(e) => handleScenarioChange('income', e.target.value)}
                                type="number"
                                size="small"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>Investments</Typography>
                            <Slider
                                value={scenarios.investments}
                                onChange={(e, value) => handleScenarioChange('investments', value)}
                                min={0}
                                max={100000}
                                step={1000}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `$${value.toLocaleString()}`}
                            />
                            <TextField
                                fullWidth
                                value={scenarios.investments}
                                onChange={(e) => handleScenarioChange('investments', e.target.value)}
                                type="number"
                                size="small"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography gutterBottom>Deductions</Typography>
                            <Slider
                                value={scenarios.deductions}
                                onChange={(e, value) => handleScenarioChange('deductions', value)}
                                min={0}
                                max={50000}
                                step={500}
                                valueLabelDisplay="auto"
                                valueLabelFormat={value => `$${value.toLocaleString()}`}
                            />
                            <TextField
                                fullWidth
                                value={scenarios.deductions}
                                onChange={(e) => handleScenarioChange('deductions', e.target.value)}
                                type="number"
                                size="small"
                            />
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12}>
                    <Box sx={{ height: 400 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={projections}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="month" />
                                <YAxis />
                                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                                <Legend />
                                <Line type="monotone" dataKey="income" stroke="#8884d8" name="Gross Income" />
                                <Line type="monotone" dataKey="tax" stroke="#82ca9d" name="Tax" />
                                <Line type="monotone" dataKey="netIncome" stroke="#ffc658" name="Net Income" />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TaxPlanningDashboard; 