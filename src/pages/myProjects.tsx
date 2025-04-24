import React, { useEffect, useState } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import api from '../utils/apiAxios';
import { Item } from '../components/shared-theme/customizations/item';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useNavigate } from 'react-router-dom';

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
  
  const handleClick = (projectId: string, projectName: string, s3Key: string) => {
    navigate(`/editor/${projectId}`, {
      state: { selectedProjectName: projectName, selectedProjectUrl: s3Key },
    });
  };
  
  return (
    <Box bgcolor={'#ededff'} height={'100vh'} sx={{fontFamily: "EB Garamond"}}>
        <Stack spacing={3} padding={6}>
            {projects.map((item:ProjectType)=>(
                <Box display={'flex'}>
                <Box width={105} display={'flex'} gap={'2px'} alignItems={'center'}>
                    {item.is_deployed && (
                        <>
                            <CheckCircleIcon color='success'/>
                            <Typography color='success' fontWeight={600} fontFamily={"EB Garamond"}>
                                Deployed
                            </Typography>
                        </>
                    )}
                </Box>
                <Item onClick={()=>handleClick(item.project_id,item.project_name,item.s3Key)} key={item.project_id}>
                    <Box color={'#2A2F69'} fontSize={24} fontFamily={"EB Garamond"}>{item.project_name}</Box>
                    <Typography>Updated At: {new Date(item.updatedAt).toLocaleDateString()}, {new Date(item.updatedAt).toLocaleTimeString()}</Typography>
                </Item>
                </Box>
            ))
            }
        </Stack>
    </Box>
  );
};

export default MyProjects;