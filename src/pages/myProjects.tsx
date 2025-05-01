import { useEffect, useState } from 'react';
import { Box, IconButton, Tooltip, Typography } from '@mui/material';
import api from '../utils/apiAxios';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useAuth } from '../utils/AuthProvider';
import Grid from '@mui/material/Grid';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

interface ProjectType {
    deployed_url:string | null;
    is_deployed:boolean;
    project_id:string;
    project_name: string;
    s3Key: string;
    updatedAt: Date;
    user_id: string;
}
const MyProjects = () => {
  const [projects, setProjects] = useState<ProjectType[]>([])
  const navigate = useNavigate();
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);
  const [code,setCode] = useState('')
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  useEffect(() => {
    const fetchProjects = async () => {
        try{
            const res = await api.get(`/projects`);
            const allProjects = res.data.projects;
            setProjects(allProjects);
        }catch(error){
            console.error("Error fetching projects:", error);
        }
    };
    fetchProjects();
  }, []);
  useEffect(()=>{
    if(user && projects){
        const deployedProject = projects.find(item => item.is_deployed);
        if (deployedProject) {
            setCode(`${process.env.REACT_APP_URL}/portfolio/${user.username}`);
        }
    }
  }
  ,[user,projects])

  const handleClick = (projectId: string, projectName: string, s3Key: string) => {
    navigate(`/editor/${projectId}`, {
      state: { selectedProjectName: projectName, selectedProjectUrl: s3Key },
    });
  };
  
  return (
    <Box bgcolor={'#ededff'} height={'100vh'} sx={{fontFamily: "EB Garamond"}}>
        {code && 
            (<Box pt={4} display={'flex'} justifyContent={'center'} alignItems={'center'}>
                <Box pr={1} display={'flex'}>
                    <Typography color="success.main" fontSize={'24px'} fontWeight={600} fontFamily="EB Garamond">
                        Portfolio URL 
                    </Typography>
                    <ArrowRightIcon color="success" fontSize="large" />
                </Box>
                <Box
                    sx={{
                        position: 'relative',
                        bgcolor: '#f5f5f5',
                        p: 2,
                        fontFamily: 'monospace',
                        overflowX: 'auto',
                        width: '500px',
                        border: '1px solid #ccc',
                        borderRadius: 2,
                    }}
                    >
                    <Typography variant="body2" component="pre" sx={{ m: 0 }}>
                        {code}
                    </Typography>

                    <Tooltip title={copied ? 'Copied!' : 'Copy'}>
                        <IconButton
                        onClick={handleCopy}
                        size="small"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        >
                        <ContentCopyIcon fontSize="small" />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>)
        }
        <Box sx={{ flexGrow: 1, p: 2 }}>
            <Grid container spacing={2}>
                {projects.map((item) => (
                <Grid item xs={12} sm={6} md={4} key={item.project_id}>
                    <Box
                    onClick={() => handleClick(item.project_id, item.project_name, item.s3Key)}
                    sx={{
                        p: 2,
                        border: '1px solid #ccc',
                        borderRadius: 2,
                        cursor: 'pointer',
                        transition: '0.2s',
                        '&:hover': {
                        boxShadow: 3,
                        borderColor: '#999',
                        },
                    }}
                    >
                    {item.is_deployed && (
                        <Box display="flex" alignItems="center" gap={1} mb={1}>
                        <CheckCircleIcon color="success" fontSize="small" />
                        <Typography color="success.main" fontWeight={600} fontFamily="EB Garamond">
                            Deployed
                        </Typography>
                        </Box>
                    )}
                    <Typography variant="h6" color="primary" fontFamily="EB Garamond">
                        {item.project_name}
                    </Typography>
                    <Typography variant="body2">
                        Updated At:{' '}
                        {new Date(item.updatedAt).toLocaleDateString()},{' '}
                        {new Date(item.updatedAt).toLocaleTimeString()}
                    </Typography>
                    </Box>
                </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
  );
};

export default MyProjects;