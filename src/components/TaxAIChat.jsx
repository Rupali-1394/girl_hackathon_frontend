import React, { useState } from 'react';
import axios from 'axios';
import { 
    Paper, 
    TextField, 
    Button, 
    Box, 
    Typography,
    List,
    ListItem,
    Avatar,
    CircularProgress,
    Alert
} from '@mui/material';
import { Person, SmartToy, Send } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

const TaxAIChat = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            text: input.trim(),
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError(null);

        console.log('API URL:', process.env.REACT_APP_API_URL);

        try {
            const response = await axios({
                method: 'post',
                url: `${process.env.REACT_APP_API_URL}/ai/chat`,
                data: { message: userMessage.text },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Response:', response.data);

            if (!response.data || !response.data.message) {
                throw new Error('Invalid response from server');
            }

            setMessages(prev => [...prev, {
                text: response.data.message,
                sender: 'ai',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            console.error('Chat Error:', error);
            setError(
                error.response?.data?.error || 
                error.message || 
                'Failed to get response. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    const renderMessage = (text) => (
        <ReactMarkdown
            components={{
                p: ({ children }) => (
                    <Typography 
                        variant="body1" 
                        sx={{ mb: 1, lineHeight: 1.6 }}
                    >
                        {children}
                    </Typography>
                ),
                ul: ({ children }) => (
                    <Box component="ul" sx={{ pl: 2, mb: 1 }}>
                        {children}
                    </Box>
                ),
                li: ({ children }) => (
                    <Box component="li" sx={{ mb: 0.5 }}>
                        {children}
                    </Box>
                )
            }}
        >
            {text}
        </ReactMarkdown>
    );

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 2, 
                height: '600px', 
                display: 'flex', 
                flexDirection: 'column'
            }}
        >
            <Typography variant="h6" gutterBottom>
                Tax AI Assistant
            </Typography>

            {error && (
                <Alert 
                    severity="error" 
                    onClose={() => setError(null)}
                    sx={{ mb: 2 }}
                >
                    {error}
                </Alert>
            )}

            <Box 
                sx={{ 
                    flexGrow: 1, 
                    overflow: 'auto',
                    mb: 2
                }}
            >
                <List>
                    {messages.map((message, index) => (
                        <ListItem
                            key={index}
                            sx={{
                                flexDirection: 'column',
                                alignItems: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 2
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                                    gap: 1
                                }}
                            >
                                <Avatar>
                                    {message.sender === 'user' ? <Person /> : <SmartToy />}
                                </Avatar>
                                <Paper 
                                    elevation={1}
                                    sx={{ 
                                        p: 2,
                                        maxWidth: '80%',
                                        bgcolor: message.sender === 'user' ? 'primary.light' : 'grey.50'
                                    }}
                                >
                                    {message.sender === 'user' ? (
                                        <Typography>{message.text}</Typography>
                                    ) : (
                                        renderMessage(message.text)
                                    )}
                                </Paper>
                            </Box>
                        </ListItem>
                    ))}
                    {loading && (
                        <ListItem>
                            <CircularProgress size={24} />
                        </ListItem>
                    )}
                </List>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about tax-related questions..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={loading}
                />
                <Button
                    variant="contained"
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    endIcon={<Send />}
                >
                    Send
                </Button>
            </Box>
        </Paper>
    );
};

export default TaxAIChat; 