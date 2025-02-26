import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    LinearProgress,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import {
    CheckCircle,
    Warning,
    Chat,
    VideoCall
} from '@mui/icons-material';

const TaxOptimizationCoach = ({ taxData }) => {
    const [openSchedule, setOpenSchedule] = useState(false);
    
    const taxHealth = {
        score: 75,
        improvements: [
            {
                title: 'Maximize Retirement Contributions',
                status: 'incomplete',
                impact: 'high',
                description: 'Increasing your 401(k) contributions could reduce your taxable income.'
            },
            {
                title: 'Document Charitable Donations',
                status: 'complete',
                impact: 'medium',
                description: 'Well done on keeping records of your charitable contributions.'
            },
            {
                title: 'Review Business Expenses',
                status: 'incomplete',
                impact: 'high',
                description: 'Some business expenses might be eligible for deduction.'
            }
        ]
    };

    const getScoreColor = (score) => {
        if (score >= 80) return 'success.main';
        if (score >= 60) return 'warning.main';
        return 'error.main';
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                    Tax Optimization Coach
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<Chat />}
                        sx={{ mr: 1 }}
                    >
                        Chat with Advisor
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<VideoCall />}
                        onClick={() => setOpenSchedule(true)}
                    >
                        Schedule Session
                    </Button>
                </Box>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Tax Health Score
                            </Typography>
                            <Box sx={{ position: 'relative', display: 'inline-flex', width: '100%' }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={taxHealth.score}
                                    sx={{
                                        width: '100%',
                                        height: 20,
                                        borderRadius: 5,
                                        bgcolor: 'grey.200',
                                        '& .MuiLinearProgress-bar': {
                                            bgcolor: getScoreColor(taxHealth.score)
                                        }
                                    }}
                                />
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        top: 0
                                    }}
                                >
                                    {`${taxHealth.score}%`}
                                </Typography>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Improvement Opportunities
                            </Typography>
                            <List>
                                {taxHealth.improvements.map((item, index) => (
                                    <ListItem key={index}>
                                        <ListItemIcon>
                                            {item.status === 'complete' ? (
                                                <CheckCircle color="success" />
                                            ) : (
                                                <Warning color="warning" />
                                            )}
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.title}
                                            secondary={item.description}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Dialog open={openSchedule} onClose={() => setOpenSchedule(false)}>
                <DialogTitle>Schedule Coaching Session</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        Select a time for your virtual tax optimization session
                    </Typography>
                    {/* Add calendar/scheduling component here */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSchedule(false)}>Cancel</Button>
                    <Button variant="contained" onClick={() => setOpenSchedule(false)}>
                        Schedule
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default TaxOptimizationCoach; 