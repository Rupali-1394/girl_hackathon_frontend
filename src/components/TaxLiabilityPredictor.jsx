import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Button,
    LinearProgress,
} from '@mui/material';
import {
    TrendingUp,
    CalendarToday,
    Notifications
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as ChartTooltip } from 'recharts';

const TaxLiabilityPredictor = ({ taxHistory }) => {
    // Example prediction logic
    const predictFutureLiability = (history) => {
        const now = new Date();
        const predictions = [];
        
        // Simple linear projection based on history
        const baseAmount = history?.[history.length - 1]?.taxAmount || 0;
        const growthRate = 0.05; // 5% projected growth

        for (let i = 1; i <= 12; i++) {
            const futureDate = new Date(now.getFullYear(), now.getMonth() + i, 1);
            predictions.push({
                date: futureDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
                predicted: baseAmount * (1 + growthRate * i),
                recommended_savings: (baseAmount * (1 + growthRate * i)) / 12
            });
        }

        return predictions;
    };

    const predictions = predictFutureLiability(taxHistory);
    const nextPayment = predictions[0]?.recommended_savings || 0;
    const progressPercent = 65; // Example progress

    const addToCalendar = () => {
        // Google Calendar API integration would go here
        alert('Tax payment reminder added to your calendar');
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <TrendingUp sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                    Tax Liability Predictor
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Box sx={{ height: 300 }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={predictions}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <ChartTooltip />
                                <Line 
                                    type="monotone" 
                                    dataKey="predicted" 
                                    stroke="#8884d8" 
                                    name="Predicted Tax"
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper elevation={2} sx={{ p: 2, bgcolor: 'background.default' }}>
                        <Typography variant="h6" gutterBottom>
                            Next Payment Planning
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                            <Typography color="textSecondary" gutterBottom>
                                Recommended Monthly Savings
                            </Typography>
                            <Typography variant="h4" color="primary">
                                ${nextPayment.toFixed(2)}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography color="textSecondary" gutterBottom>
                                Progress Towards Next Payment
                            </Typography>
                            <LinearProgress 
                                variant="determinate" 
                                value={progressPercent} 
                                sx={{ height: 10, borderRadius: 5 }}
                            />
                            <Typography variant="caption" sx={{ mt: 0.5, display: 'block' }}>
                                {progressPercent}% saved
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <Button
                                variant="outlined"
                                startIcon={<CalendarToday />}
                                onClick={addToCalendar}
                                size="small"
                            >
                                Add Reminder
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Notifications />}
                                size="small"
                            >
                                Set Alert
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default TaxLiabilityPredictor; 