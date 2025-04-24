import { Paper, styled } from "@mui/material";

export const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
      backgroundColor: '#1A2027',
    }),
    height: '45px',
    paddingBottom: '5px',
    paddingLeft: '10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexGrow: 1,
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    borderRadius: '15px',
    transition: 'all 0.5s ease',
    position: 'relative',
    cursor: 'pointer',
      '&:hover': {
        transform: 'scale(1.05)',
        boxShadow: '0 0 20px #2A2F69'
      },
      
      '&:hover::before': {
        opacity: 1,
        transform: 'rotate(-45deg) translateY(100%)'
      }
}));