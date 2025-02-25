import React from 'react';
import { 
    Box, 
    Container, 
    Typography, 
    Grid, 
    Card, 
    CardContent, 
    Button,
    Stack
} from '@mui/material';
import { 
    CalculateOutlined, 
    AutoGraphOutlined, 
    SmartToyOutlined, 
    DocumentScannerOutlined 
} from '@mui/icons-material';

const features = [
    {
        icon: <CalculateOutlined sx={{ fontSize: 40 }} />,
        title: "Smart Tax Calculation",
        description: "AI-powered tax calculation with automatic deduction suggestions and optimization strategies."
    },
    {
        icon: <AutoGraphOutlined sx={{ fontSize: 40 }} />,
        title: "Tax Planning Insights",
        description: "Get personalized tax planning advice and future tax liability predictions."
    },
    {
        icon: <SmartToyOutlined sx={{ fontSize: 40 }} />,
        title: "AI Tax Assistant",
        description: "Chat with our AI assistant for tax-related questions and real-time guidance."
    },
    {
        icon: <DocumentScannerOutlined sx={{ fontSize: 40 }} />,
        title: "Document Analysis",
        description: "Upload tax documents for automatic analysis and data extraction."
    }
];

const LandingPage = ({ onGetStarted }) => {
    return (
        <Box sx={{ bgcolor: 'background.default', pt: 8, pb: 6 }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', mb: 8 }}>
                    <Typography
                        component="h1"
                        variant="h2"
                        color="primary"
                        gutterBottom
                        fontWeight="bold"
                    >
                        AI-Powered Tax Assistant
                    </Typography>
                    <Typography variant="h5" color="text.secondary" paragraph>
                        Simplify your tax calculations with artificial intelligence.
                        Get personalized tax advice, automatic deductions, and instant calculations.
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={2}
                        justifyContent="center"
                        sx={{ mt: 4 }}
                    >
                        <Button 
                            variant="contained" 
                            size="large"
                            onClick={onGetStarted}
                        >
                            Get Started
                        </Button>
                        <Button 
                            variant="outlined" 
                            size="large"
                        >
                            Learn More
                        </Button>
                    </Stack>
                </Box>

                <Grid container spacing={4}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card 
                                sx={{ 
                                    height: '100%', 
                                    display: 'flex', 
                                    flexDirection: 'column',
                                    transition: '0.3s',
                                    '&:hover': {
                                        transform: 'translateY(-5px)',
                                        boxShadow: 6
                                    }
                                }}
                            >
                                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                                    <Box sx={{ mb: 2 }}>
                                        {feature.icon}
                                    </Box>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {feature.title}
                                    </Typography>
                                    <Typography>
                                        {feature.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default LandingPage; 