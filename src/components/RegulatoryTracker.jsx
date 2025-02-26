import React, { useState, useEffect } from 'react';
import {
    Paper,
    Typography,
    Box,
    List,
    ListItem,
    ListItemText,
    Chip,
    IconButton,
    Alert,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import {
    Notifications,
    TrendingUp,
    Article,
    Settings
} from '@mui/icons-material';

const RegulatoryTracker = ({ userProfile }) => {
    const [updates, setUpdates] = useState([
        {
            id: 1,
            title: 'New Tax Deduction Rules',
            category: 'Policy Change',
            relevance: 'High',
            date: '2024-02-25',
            description: 'Changes to standard deduction amounts for 2024 tax year.',
            impact: 'Affects individual taxpayers with income over $50,000'
        },
        {
            id: 2,
            title: 'Digital Asset Reporting Requirements',
            category: 'New Regulation',
            relevance: 'Medium',
            date: '2024-02-24',
            description: 'Updated cryptocurrency reporting guidelines.',
            impact: 'Affects investors in digital assets'
        }
    ]);

    const [preferences, setPreferences] = useState({
        industry: 'Technology',
        incomeLevel: 'Medium',
        notificationFrequency: 'Daily'
    });

    const [openSettings, setOpenSettings] = useState(false);

    const handleUpdatePreferences = () => {
        // Here you would update user preferences in backend
        setOpenSettings(false);
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Article sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="h6">
                        Regulatory Change Tracker
                    </Typography>
                </Box>
                <IconButton onClick={() => setOpenSettings(true)}>
                    <Settings />
                </IconButton>
            </Box>

            <Alert severity="info" sx={{ mb: 2 }}>
                Tracking tax law changes relevant to {preferences.industry} industry
                and {preferences.incomeLevel} income level
            </Alert>

            <List>
                {updates.map((update) => (
                    <ListItem
                        key={update.id}
                        sx={{
                            mb: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            flexDirection: 'column',
                            alignItems: 'flex-start'
                        }}
                    >
                        <Box sx={{ 
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1
                        }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                {update.title}
                            </Typography>
                            <Chip
                                label={update.relevance}
                                color={update.relevance === 'High' ? 'error' : 'primary'}
                                size="small"
                            />
                        </Box>
                        <Typography color="textSecondary" variant="body2" gutterBottom>
                            {update.date}
                        </Typography>
                        <Typography paragraph>
                            {update.description}
                        </Typography>
                        <Typography variant="body2" color="primary">
                            Impact: {update.impact}
                        </Typography>
                    </ListItem>
                ))}
            </List>

            <Dialog open={openSettings} onClose={() => setOpenSettings(false)}>
                <DialogTitle>Tracking Preferences</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Industry</InputLabel>
                        <Select
                            value={preferences.industry}
                            label="Industry"
                            onChange={(e) => setPreferences({ ...preferences, industry: e.target.value })}
                        >
                            <MenuItem value="Technology">Technology</MenuItem>
                            <MenuItem value="Healthcare">Healthcare</MenuItem>
                            <MenuItem value="Finance">Finance</MenuItem>
                            <MenuItem value="Retail">Retail</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Income Level</InputLabel>
                        <Select
                            value={preferences.incomeLevel}
                            label="Income Level"
                            onChange={(e) => setPreferences({ ...preferences, incomeLevel: e.target.value })}
                        >
                            <MenuItem value="Low">Low ($0 - $50,000)</MenuItem>
                            <MenuItem value="Medium">Medium ($50,000 - $100,000)</MenuItem>
                            <MenuItem value="High">High ($100,000+)</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <InputLabel>Notification Frequency</InputLabel>
                        <Select
                            value={preferences.notificationFrequency}
                            label="Notification Frequency"
                            onChange={(e) => setPreferences({ ...preferences, notificationFrequency: e.target.value })}
                        >
                            <MenuItem value="Daily">Daily</MenuItem>
                            <MenuItem value="Weekly">Weekly</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSettings(false)}>Cancel</Button>
                    <Button onClick={handleUpdatePreferences} variant="contained">
                        Save Preferences
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default RegulatoryTracker; 