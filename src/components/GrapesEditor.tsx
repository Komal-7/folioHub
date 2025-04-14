import React, { useEffect } from 'react';
import createStudioEditor from '@grapesjs/studio-sdk';
import '@grapesjs/studio-sdk/style';

interface EditoProps {
    html: string | null;
    css: string | null;
}
export const GrapesEditor = (props: EditoProps) => {
    const {html, css} = props
  useEffect(() => {
    localStorage.removeItem('gjsProject');
      
    const editorRoot = document.getElementById('gjs-editor');
    if (editorRoot) {
      createStudioEditor({
          root: editorRoot,
          localStorage: undefined,
          project: {
              default: {
                  pages: [
                      {
                          name: 'Home',
                          component: `<style>${css}</style>${html}`,
                      },
                  ],
              },
          },
          licenseKey: ''
      });
    }
  }, []);

  return (
    <div
      id="gjs-editor"
      style={{
        height: 'calc(100vh - 170px)',
        width: '100%',
        border: '1px solid #ddd',
      }}
    />
  );
};
