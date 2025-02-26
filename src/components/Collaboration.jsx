import React, { useState } from 'react';
import {
    Paper,
    Typography,
    Box,
    Grid,
    TextField,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Chip,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert
} from '@mui/material';
import {
    Share,
    PersonAdd,
    Edit,
    Delete,
    LockOpen
} from '@mui/icons-material';

const Collaboration = ({ taxData }) => {
    const [collaborators, setCollaborators] = useState([
        { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Editor' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Viewer' }
    ]);
    const [openInvite, setOpenInvite] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState('Viewer');
    const [shareLink, setShareLink] = useState('');

    const handleInvite = () => {
        if (inviteEmail) {
            const newCollaborator = {
                id: collaborators.length + 1,
                name: inviteEmail.split('@')[0],
                email: inviteEmail,
                role: inviteRole
            };
            setCollaborators([...collaborators, newCollaborator]);
            setInviteEmail('');
            setOpenInvite(false);
        }
    };

    const generateShareLink = () => {
        const link = `https://yourdomain.com/share/${Math.random().toString(36).substr(2, 9)}`;
        setShareLink(link);
    };

    const removeCollaborator = (id) => {
        setCollaborators(collaborators.filter(c => c.id !== id));
    };

    return (
        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">
                    Collaboration Hub
                </Typography>
                <Box>
                    <Button
                        variant="outlined"
                        startIcon={<Share />}
                        onClick={generateShareLink}
                        sx={{ mr: 1 }}
                    >
                        Share Link
                    </Button>
                    <Button
                        variant="contained"
                        startIcon={<PersonAdd />}
                        onClick={() => setOpenInvite(true)}
                    >
                        Invite
                    </Button>
                </Box>
            </Box>

            {shareLink && (
                <Alert 
                    severity="info" 
                    sx={{ mb: 2 }}
                    onClose={() => setShareLink('')}
                >
                    Share Link: {shareLink}
                </Alert>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography variant="subtitle1" gutterBottom>
                        Active Collaborators
                    </Typography>
                    <List>
                        {collaborators.map((collaborator) => (
                            <ListItem
                                key={collaborator.id}
                                secondaryAction={
                                    <Box>
                                        <Chip 
                                            size="small"
                                            icon={collaborator.role === 'Editor' ? <Edit /> : <LockOpen />}
                                            label={collaborator.role}
                                            color={collaborator.role === 'Editor' ? 'primary' : 'default'}
                                            sx={{ mr: 1 }}
                                        />
                                        <IconButton 
                                            edge="end" 
                                            aria-label="delete"
                                            onClick={() => removeCollaborator(collaborator.id)}
                                        >
                                            <Delete />
                                        </IconButton>
                                    </Box>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        {collaborator.name[0].toUpperCase()}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={collaborator.name}
                                    secondary={collaborator.email}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Grid>
            </Grid>

            <Dialog open={openInvite} onClose={() => setOpenInvite(false)}>
                <DialogTitle>Invite Collaborator</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="outlined"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                    />
                    <TextField
                        select
                        margin="dense"
                        label="Role"
                        fullWidth
                        variant="outlined"
                        value={inviteRole}
                        onChange={(e) => setInviteRole(e.target.value)}
                        SelectProps={{
                            native: true,
                        }}
                    >
                        <option value="Viewer">Viewer</option>
                        <option value="Editor">Editor</option>
                    </TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenInvite(false)}>Cancel</Button>
                    <Button onClick={handleInvite} variant="contained">
                        Send Invitation
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default Collaboration; 