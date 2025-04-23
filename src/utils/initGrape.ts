// initGrapes.ts
import createStudioEditor from '@grapesjs/studio-sdk';
import '@grapesjs/studio-sdk/style';
import axios from 'axios';
import api from './apiAxios';

export async function initGrapesStudio(rootElement: HTMLElement, projectUrl: string, onReady: (editor: any,project: any) => void) {
    
    await createStudioEditor({
      root: rootElement,
      licenseKey: '17bacf93f7ae46569df40f99ac7de2eadffe819b68f34632ae8c925ed2809eb4',
      actions: ({ actions }: any) =>
        actions.filter((a: { id: string }) => !['showCode', 'showImportCode'].includes(a.id)),
      project: {
        type: 'web',
      },
      assets: {
        storageType: 'self',
        onUpload: async ({ files }) => {
          const body = new FormData();
          for (const file of files) {
            body.append('files', file);
          }
          const response = await api.post('/assets', body, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          return response.data;
        },
        onLoad: async () => {
          const response = await api.get('/assets');
          return response.data.assets;
        },
        onDelete: async ({ assets }) => {
          await api.delete('/assets', {
            data: { assets }
          });
        }      
      },
      storage: {
        type: 'self',
        onSave: async ({ editor, project }: any) => {
          onReady(editor,project)
        },
        onLoad: async () => {
          const response = await axios.get(projectUrl);
          const project = response.data;
          return { project };
        },
        autosaveChanges: 50,
        autosaveIntervalMs: 10000
      }
    });
}
  