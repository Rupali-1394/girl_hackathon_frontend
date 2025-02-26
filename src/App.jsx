import React, { useState } from 'react';
import { Container, Box, Grid } from '@mui/material';
import LandingPage from './components/LandingPage';
import TaxForm from './components/TaxForm';
import TaxResult from './components/TaxResult';
import TaxAIChat from './components/TaxAIChat';
import TaxHistory from './components/TaxHistory';
import TaxReport from './components/TaxReport';
import TaxComparison from './components/TaxComparison';
import Feedback from './components/Feedback';
import FraudDetection from './components/FraudDetection';
import TaxLiabilityPredictor from './components/TaxLiabilityPredictor';
import Collaboration from './components/Collaboration';
import RegulatoryTracker from './components/RegulatoryTracker';
import TaxPlanningDashboard from './components/TaxPlanningDashboard';
import TaxOptimizationCoach from './components/TaxOptimizationCoach';

function App() {
    const [showCalculator, setShowCalculator] = useState(false);
    const [taxResult, setTaxResult] = useState(null);
    const [calculations, setCalculations] = useState([]);
    const [previousTax, setPreviousTax] = useState(null);

    const handleTaxResult = (result) => {
        setPreviousTax(taxResult);
        setTaxResult(result);
        setCalculations(prev => [...prev, { ...result, timestamp: new Date() }]);
    };

    if (!showCalculator) {
        return <LandingPage onGetStarted={() => setShowCalculator(true)} />;
    }

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TaxForm onResult={handleTaxResult} />
                        <TaxResult result={taxResult} />
                        {taxResult && <TaxReport taxData={taxResult} />}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <TaxAIChat />
                    </Grid>
                    <Grid item xs={12}>
                        <TaxHistory calculations={calculations} />
                    </Grid>
                    {previousTax && taxResult && (
                        <Grid item xs={12}>
                            <TaxComparison 
                                currentTax={taxResult} 
                                previousTax={previousTax} 
                            />
                        </Grid>
                    )}
                    <Grid item xs={12}>
                        <FraudDetection taxData={taxResult} />
                    </Grid>
                    <Grid item xs={12}>
                        <TaxLiabilityPredictor taxHistory={calculations} />
                    </Grid>
                    <Grid item xs={12}>
                        <Collaboration taxData={taxResult} />
                    </Grid>
                    <Grid item xs={12}>
                        <RegulatoryTracker />
                    </Grid>
                    <Grid item xs={12}>
                        <TaxPlanningDashboard />
                    </Grid>
                    <Grid item xs={12}>
                        <TaxOptimizationCoach taxData={taxResult} />
                    </Grid>
                    <Grid item xs={12}>
                        <Feedback />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
}

export default App;