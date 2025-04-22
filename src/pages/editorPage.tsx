import React, { useEffect, useRef, useState } from 'react';
// import GrapesEditor from '../components/GrapesEditor';
import { Box, Button } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import api from '../utils/apiAxios';
import { useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import { initGrapesStudio } from '../utils/initGrape';

const EditorPage = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const { user } = useAuth();
  const grapeEditor = useRef<any>(null);
  const grapeProject = useRef<any>(null);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectUrl, setProjectUrl] = useState('')

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current && projectUrl) {
      initGrapesStudio(containerRef.current, projectUrl, (editor,project) => {
        grapeEditor.current = editor;
        grapeProject.current = project;
      });
    }
    return () => {
      grapeEditor.current?.destroy?.(); // cleanup if needed
    };
  }, [projectUrl]);
  useEffect(() => {
    const fetchTemplate = async () => {
      const res = await api.get(`/template/${templateId}`);
      const data = res.data.template;

      setProjectUrl(data.template_json);
    };

    fetchTemplate();
  }, [templateId]);

  const handleSave = async () => {
      try {
        const response = await api.post("/save-project", { project_json: grapeProject.current, project_id: projectId });
        console.log("Success:", response.data);
        setProjectId(response.data.project_id)
      } catch (err:any) {
        console.error("Error:", err?.response?.data || err?.message);
      }
  };

  const handleDeploy = async () => {
    try {
      const files = await grapeEditor.current.runCommand('studio:projectFiles', { styles: 'inline' })
      // For simplicity, we'll "publish" only the first page.
      const firstPage = files.find((file: { mimeType: string; }) => file.mimeType === 'text/html');
      const websiteData = {
        username: user?.username,
        html: firstPage.content,
      };
      // const res = await api.post('/deploy',websiteData)
    } catch (err:any) {
      console.error("Error:", err?.response?.data || err?.message);
    }
  } 
  
  
  return (
    <Box bgcolor={'#ededff'}>
      <Box pt={2} bgcolor={'#ededff'}>
        <Box height={52} display={'flex'} alignItems={'center'} justifyContent={'end'} borderRadius={'10px 10px 0px 0px'}>
          <Button onClick={handleSave} variant="outlined" sx={{color: '#5b5bfc', marginRight: '8px', border: '1px solid #5b5bfc'}} startIcon={<SaveAsIcon />}>
            Save
          </Button>
          <Button onClick={handleDeploy} variant="contained" sx={{backgroundColor: 'white', color: '#5b5bfc', marginRight: '8px', border: '1px solid #5b5bfc'}} endIcon={<PublishIcon />}>
            Deploy
          </Button>
        </Box>
        <Box height={'calc(100vh - 132px)'} ref={containerRef} />
      </Box>
    </Box>
  );
};

export default EditorPage;