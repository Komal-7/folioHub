import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import StudioEditor from '@grapesjs/studio-sdk/react';
import '@grapesjs/studio-sdk/style';
import { Box } from '@mui/material';
import axios from 'axios';

const GrapesEditor = forwardRef((props:any, ref) => {
  const { projectUrl } = props
  const editorRef = useRef<any>(null);
  const getValue = (project:boolean = true) => {
    return (project) ? editorRef.current.project : editorRef.current.editor;
  };

  useImperativeHandle(ref, () => ({
    getValue: getValue,
  }));
  
  return (
    <Box height={'calc(100vh - 132px)'}>
      <StudioEditor
        // ref={editorRef}
        options={{
          licenseKey: '',
          actions: ({ actions }:any) => actions.filter((a: { id: string; }) => !['showCode', 'showImportCode'].includes(a.id)),
          project: { type: 'web' },
          assets: {
            storageType: 'self',
            onUpload: async ({ files }:any) => {
              // const form = new FormData();
              // for (const file of files) {
              //   form.append('files', file);
              // }
              // const res = await fetch('/api/upload-asset', {
              //   method: 'POST',
              //   body: form,
              // });
              // return await res.json();
            },
          },
          editorConfig: {
            toolbar: {
              // Remove specific buttons from the toolbar
              disable: [
                'view-code',   // Disable the "Show Code" button
                'import',      // Disable the "Import" button
              ]
            },
          },
          storage: {
            type: 'self',
            onSave: async ({ project, editor }:any) => {
              editorRef.current = { project, editor };
            },
            onLoad: async () => {
              const response = await axios.get(projectUrl);
              const project = response.data;
              return { project };
            },
            autosaveChanges: 50,
            autosaveIntervalMs: 10000
          }
        }}
      />
    </Box>
  );
});

export default GrapesEditor;
