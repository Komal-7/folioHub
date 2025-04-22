// initGrapes.ts
import createStudioEditor from '@grapesjs/studio-sdk';
import '@grapesjs/studio-sdk/style';
import axios from 'axios';

export async function initGrapesStudio(rootElement: HTMLElement, projectUrl: string, onReady: (editor: any,project: any) => void) {
    
    await createStudioEditor({
      root: rootElement,
      licenseKey: 'YOUR_LICENSE_KEY',
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
          const response = await fetch('ASSETS_UPLOAD_URL', { method: 'POST', body });
          const result = await response.json();
          return result;
        },
        onDelete: async ({ assets }) => {
          const body = JSON.stringify(assets);
          await fetch('ASSETS_DELETE_URL', { method: 'DELETE', body });
        },
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
  