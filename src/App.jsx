import React, { useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import LandingPage from './components/LandingPage';
import TaxForm from './components/TaxForm';
import TaxResult from './components/TaxResult';
import TaxAIChat from './components/TaxAIChat';

function App() {
    const [showCalculator, setShowCalculator] = useState(false);
    const [taxResult, setTaxResult] = useState(null);

    if (!showCalculator) {
        return <LandingPage onGetStarted={() => setShowCalculator(true)} />;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TaxForm onResult={setTaxResult} />
                        <TaxResult result={taxResult} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TaxAIChat />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;