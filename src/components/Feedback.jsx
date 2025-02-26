import React, { useState } from 'react';
import {
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Rating,
    Snackbar,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { Send, Star } from '@mui/icons-material';

const Feedback = () => {
    const [feedback, setFeedback] = useState({
        rating: 0,
        category: '',
        suggestion: '',
        email: ''
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success'
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Here you can add API call to save feedback
            console.log('Feedback submitted:', feedback);
            setSnackbar({
                open: true,
                message: 'Thank you for your feedback!',
                severity: 'success'
            });
            // Reset form
            setFeedback({
                rating: 0,
                category: '',
                suggestion: '',
                email: ''
            });
        } catch (error) {
            setSnackbar({
                open: true,
                message: 'Failed to submit feedback. Please try again.',
                severity: 'error'
            });
        }
    };

    const handleChange = (e) => {
        setFeedback({
            ...feedback,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
                Help Us Improve
            </Typography>
            <Typography color="textSecondary" paragraph>
                We value your feedback! Share your suggestions or report any issues.
            </Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Typography component="legend" sx={{ mr: 2 }}>
                        Rate your experience:
                    </Typography>
                    <Rating
                        name="rating"
                        value={feedback.rating}
                        onChange={(event, newValue) => {
                            setFeedback({ ...feedback, rating: newValue });
                        }}
                        icon={<Star fontSize="inherit" />}
                    />
                </Box>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Category</InputLabel>
                    <Select
                        name="category"
                        value={feedback.category}
                        label="Category"
                        onChange={handleChange}
                        required
                    >
                        <MenuItem value="feature">Feature Request</MenuItem>
                        <MenuItem value="bug">Bug Report</MenuItem>
                        <MenuItem value="improvement">Improvement Suggestion</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    name="suggestion"
                    label="Your Suggestion"
                    value={feedback.suggestion}
                    onChange={handleChange}
                    required
                    sx={{ mb: 2 }}
                />

                <TextField
                    fullWidth
                    type="email"
                    name="email"
                    label="Your Email (optional)"
                    value={feedback.email}
                    onChange={handleChange}
                    sx={{ mb: 2 }}
                    helperText="We'll only use this to follow up on your feedback"
                />

                <Button
                    type="submit"
                    variant="contained"
                    endIcon={<Send />}
                    sx={{ mt: 1 }}
                >
                    Submit Feedback
                </Button>
            </Box>

            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
            >
                <Alert 
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default Feedback; 