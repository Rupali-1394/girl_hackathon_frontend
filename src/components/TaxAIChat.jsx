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
    Alert,
    useTheme
} from '@mui/material';
import { Person, SmartToy, Send } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

const TaxAIChat = () => {
    const theme = useTheme();
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const chatColors = {
        userBg: theme.palette.primary.light,
        userText: theme.palette.primary.contrastText,
        aiBg: '#f5f7ff', // Light blue-gray background
        aiText: '#2c3e50', // Dark blue-gray text
        aiHighlight: theme.palette.primary.main
    };

    const handleSend = async () => {
        if (!input.trim() || loading) return;

        const userMessage = {
            text: input,
            sender: 'user',
            timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setLoading(true);
        setError(null);

        try {
            const { data } = await axios({
                method: 'post',
                url: 'http://localhost:5000/api/ai/chat',
                data: { message: input },
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            setMessages(prev => [...prev, {
                text: data.message,
                sender: 'ai',
                timestamp: new Date().toISOString()
            }]);
        } catch (error) {
            console.error('Error:', error);
            setError(error.response?.data?.error || 'Failed to connect to the server. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const renderMessage = (text) => {
        return (
            <ReactMarkdown
                components={{
                    h2: ({ children }) => (
                        <Typography 
                            variant="h6" 
                            sx={{ 
                                mt: 2, 
                                mb: 1, 
                                color: chatColors.aiHighlight,
                                fontWeight: 600
                            }}
                        >
                            {children}
                        </Typography>
                    ),
                    p: ({ children }) => (
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                mb: 1,
                                color: chatColors.aiText,
                                lineHeight: 1.6
                            }}
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
                        <Box 
                            component="li" 
                            sx={{ 
                                mb: 0.5,
                                color: chatColors.aiText
                            }}
                        >
                            {children}
                        </Box>
                    ),
                    strong: ({ children }) => (
                        <Box 
                            component="span" 
                            sx={{ 
                                fontWeight: 600,
                                color: chatColors.aiHighlight
                            }}
                        >
                            {children}
                        </Box>
                    )
                }}
            >
                {text}
            </ReactMarkdown>
        );
    };

    return (
        <Paper 
            elevation={3} 
            sx={{ 
                p: 2, 
                height: '600px', 
                display: 'flex', 
                flexDirection: 'column',
                bgcolor: '#ffffff',
                borderRadius: 2
            }}
        >
            <Typography 
                variant="h6" 
                gutterBottom 
                sx={{ 
                    color: theme.palette.primary.main,
                    fontWeight: 600,
                    pb: 1,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }}
            >
                Tax AI Assistant
            </Typography>
            
            {error && (
                <Alert 
                    severity="error" 
                    sx={{ 
                        mb: 2,
                        borderRadius: 1
                    }} 
                    onClose={() => setError(null)}
                >
                    {error}
                </Alert>
            )}
            
            <Box 
                sx={{ 
                    flexGrow: 1, 
                    overflow: 'auto', 
                    mb: 2,
                    px: 1,
                    '&::-webkit-scrollbar': {
                        width: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: '#f1f1f1',
                        borderRadius: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: '#c1c1c1',
                        borderRadius: '4px',
                        '&:hover': {
                            background: '#a1a1a1',
                        },
                    },
                }}
            >
                <List>
                    {messages.map((message, index) => (
                        <ListItem 
                            key={index}
                            sx={{
                                justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                                mb: 2,
                                alignItems: 'flex-start'
                            }}
                        >
                            <Box 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'flex-start',
                                    flexDirection: message.sender === 'user' ? 'row-reverse' : 'row',
                                    maxWidth: '80%'
                                }}
                            >
                                <Avatar 
                                    sx={{ 
                                        bgcolor: message.sender === 'user' ? 
                                            theme.palette.primary.main : 
                                            theme.palette.secondary.light,
                                        m: 1,
                                        mt: 2,
                                        boxShadow: 1
                                    }}
                                >
                                    {message.sender === 'user' ? <Person /> : <SmartToy />}
                                </Avatar>
                                <Paper 
                                    sx={{ 
                                        p: 2, 
                                        bgcolor: message.sender === 'user' ? 
                                            chatColors.userBg : 
                                            chatColors.aiBg,
                                        color: message.sender === 'user' ? 
                                            chatColors.userText : 
                                            chatColors.aiText,
                                        width: '100%',
                                        borderRadius: 2,
                                        boxShadow: 1
                                    }}
                                >
                                    {message.sender === 'user' ? (
                                        <Typography sx={{ color: 'inherit' }}>
                                            {message.text}
                                        </Typography>
                                    ) : (
                                        renderMessage(message.text)
                                    )}
                                </Paper>
                            </Box>
                        </ListItem>
                    ))}
                    {loading && (
                        <ListItem sx={{ justifyContent: 'flex-start' }}>
                            <CircularProgress size={24} sx={{ ml: 2 }} />
                        </ListItem>
                    )}
                </List>
            </Box>

            <Box 
                sx={{ 
                    display: 'flex', 
                    gap: 1,
                    p: 1,
                    bgcolor: '#f8f9fa',
                    borderRadius: 1
                }}
            >
                <TextField
                    fullWidth
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about tax-related questions..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    disabled={loading}
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            bgcolor: '#ffffff',
                            '&:hover': {
                                '& > fieldset': {
                                    borderColor: theme.palette.primary.main,
                                }
                            }
                        }
                    }}
                />
                <Button 
                    variant="contained" 
                    onClick={handleSend}
                    disabled={loading || !input.trim()}
                    sx={{
                        px: 3,
                        bgcolor: theme.palette.primary.main,
                        '&:hover': {
                            bgcolor: theme.palette.primary.dark,
                        }
                    }}
                >
                    {loading ? (
                        <CircularProgress size={24} sx={{ color: '#fff' }} />
                    ) : (
                        <Send />
                    )}
                </Button>
            </Box>
        </Paper>
    );
};

export default TaxAIChat; 