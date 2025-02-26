import React from 'react';
import { Paper, Typography, Button } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error('Error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Paper sx={{ p: 3, textAlign: 'center' }}>
                    <Typography variant="h6" color="error" gutterBottom>
                        Something went wrong.
                    </Typography>
                    <Button 
                        variant="contained" 
                        onClick={() => window.location.reload()}
                    >
                        Reload Page
                    </Button>
                </Paper>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary; 