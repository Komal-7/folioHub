import { Card, CardContent, CardHeader, Typography, Box, Divider } from '@mui/material';
import { useAuth } from '../utils/AuthProvider';

const MyAccount = () => {
    const { user } = useAuth();

  return (
    <Card sx={{ maxWidth: 600, margin: 'auto', mt: 5, p: 2 }}>
      <CardHeader title="My Account" />
      <Divider />
      <CardContent>
        <Box mb={2}>
          <Typography variant="subtitle2" color="text.secondary">Username</Typography>
          <Typography variant="body1">{user?.username}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2" color="text.secondary">Portfolio Site name</Typography>
          <Typography variant="body1">{user?.username}</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">Email</Typography>
          <Typography variant="body1">{user?.email}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MyAccount;
