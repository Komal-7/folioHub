import React, { useEffect, useRef, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import PublishIcon from '@mui/icons-material/Publish';
import api from '../utils/apiAxios';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider';
import { initGrapesStudio } from '../utils/initGrape';

const EditorPage = () => {
  const { templateId } = useParams<{ templateId: string }>();
  const location = useLocation();
  const { selectedProjectName, selectedProjectUrl } = location.state || {};
  const navigate = useNavigate();
  const { user } = useAuth();
  const grapeEditor = useRef<any>(null);
  const grapeProject = useRef<any>(null);
  const [projectId, setProjectId] = useState<string>("");
  const [projectUrl, setProjectUrl] = useState('')
  const [projectName, setProjectName] = useState("");
  const [error, setError] = useState(false);
  const [saveLoad, setSaveLoad] = useState(false)
  const [deployLoad, setDeployLoad] = useState(false)

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

    if(selectedProjectUrl){
      setProjectId(templateId || "");
      setProjectName(selectedProjectName);
      setProjectUrl(selectedProjectUrl)
    }else{
      fetchTemplate()
    };
  }, [templateId]);

  const handleSave = async () => {
    if (!projectName.trim()) {
      setError(true);
      return;
    }
    setSaveLoad(true)
    setError(false);
    try {
      const response = await api.post("/save-project", { project_json: grapeProject.current, project_id: projectId, project_name: projectName });
      setProjectId(response.data.project_id)
      setSaveLoad(false)
    } catch (err:any) {
      console.error("Error:", err?.response?.data || err?.message);
      setSaveLoad(false)
    }
  };

  const handleDeploy = async () => {
    try {
      if (!projectName.trim()) {
        setError(true);
        return;
      }
      setDeployLoad(true)
      setError(false);
      const files = await grapeEditor.current.runCommand('studio:projectFiles', { styles: 'inline' })
      // For simplicity, we'll "publish" only the first page.
      const firstPage = files.find((file: { mimeType: string; }) => file.mimeType === 'text/html');
      const websiteData = {
        project_id: projectId,
        sitename: user?.username,
        html: firstPage.content,
      };
      //save first if not saved
      await handleSave();
      const res = await api.post('/deploy',websiteData)
      console.log("deployed",res)
      setDeployLoad(false)
      navigate('/my-projects')
    } catch (err:any) {
      console.error("Error:", err?.response?.data || err?.message);
      setDeployLoad(false)
    }
  } 
  
  
  return (
    <Box bgcolor={'#ededff'}>
      <Box pt={2} bgcolor={'#ededff'}>
        <Box height={52} display={'flex'} alignItems={'center'} borderRadius={'10px 10px 0px 0px'}>
          <Box sx={{marginLeft: 2, flexGrow:1}}>
            <TextField
              sx={{
                '& label.Mui-focused': {
                  color: error ? 'red' : '#5b5bfc', // Color when focused
                },
                '& label.MuiInputLabel-root': {
                  color: error ? 'red' : '#5b5bfc', // Default color
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#5b5bfc',
                  },
                  '&:hover fieldset': {
                    borderColor: error ? 'red' : '#5b5bfc',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: error ? 'red' : '#5b5bfc',
                  },
                },
              }}
              size='small'
              required
              id="name"
              label="Project Name"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              error={error}
            />
          </Box>
          <Button loading={saveLoad} loadingPosition="start" onClick={handleSave} variant="outlined" sx={{color: '#5b5bfc', marginRight: '8px', border: '1px solid #5b5bfc'}} startIcon={<SaveAsIcon />}>
            Save
          </Button>
          <Button loading={deployLoad} loadingPosition="start" onClick={handleDeploy} variant="contained" sx={{backgroundColor: 'white', color: '#5b5bfc', marginRight: '8px', border: '1px solid #5b5bfc'}} endIcon={<PublishIcon />}>
            Deploy
          </Button>
        </Box>
        <Box height={'calc(100vh - 132px)'} ref={containerRef} />
      </Box>
    </Box>
  );
};

export default EditorPage;