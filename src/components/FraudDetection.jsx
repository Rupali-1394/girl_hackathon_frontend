import React from 'react';
import {
    Paper,
    Typography,
    Box,
    Alert,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Chip,
    Divider
} from '@mui/material';
import {
    Warning,
    ErrorOutline,
    CheckCircleOutline,
    Timeline
} from '@mui/icons-material';

const FraudDetection = ({ taxData }) => {
    // Example fraud detection rules
    const detectAnomalies = (data) => {
        const alerts = [];
        
        // Check for unusually high deductions
        if (data.deductions > data.annualIncome * 0.5) {
            alerts.push({
                severity: 'warning',
                message: 'Unusually high deductions detected',
                details: 'Deductions exceed 50% of annual income'
            });
        }

        // Check for round numbers (potential fake claims)
        if (data.deductions % 1000 === 0) {
            alerts.push({
                severity: 'info',
                message: 'Round number detected in deductions',
                details: 'Consider providing exact calculations'
            });
        }

        // Add more sophisticated checks here
        return alerts;
    };

    const anomalies = taxData ? detectAnomalies(taxData) : [];

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Timeline sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="h6">
                    Fraud Detection & Anomaly Analysis
                </Typography>
            </Box>

            {anomalies.length === 0 ? (
                <Alert icon={<CheckCircleOutline />} severity="success">
                    No anomalies detected in your tax calculations
                </Alert>
            ) : (
                <List>
                    {anomalies.map((alert, index) => (
                        <React.Fragment key={index}>
                            <ListItem>
                                <ListItemIcon>
                                    {alert.severity === 'warning' ? (
                                        <Warning color="warning" />
                                    ) : (
                                        <ErrorOutline color="info" />
                                    )}
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            {alert.message}
                                            <Chip
                                                label={alert.severity}
                                                size="small"
                                                color={alert.severity === 'warning' ? 'warning' : 'info'}
                                                sx={{ ml: 1 }}
                                            />
                                        </Box>
                                    }
                                    secondary={alert.details}
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))}
                </List>
            )}
        </Paper>
    );
};

export default FraudDetection; 