import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/apiAxios";
import { GrapesEditor } from "../components/GrapesEditor";

const EditorPage = () => {
    const { templateId } = useParams<{ templateId: string }>();
    const [html, setHtml] = useState<string | null>(null);
    const [css, setCss] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchTemplate = async () => {
        const res = await api.get(`/template/${templateId}`);
        const data = res.data.template;

        const htmlRes = await api.get(data.s3_html, { responseType: "text" });
        const cssRes = await api.get(data.s3_css, { responseType: "text" });

        const htmlCode = htmlRes.data;
        const cssCode = cssRes.data;

        setHtml(htmlCode);
        setCss(cssCode);
      };
  
      fetchTemplate();
    }, [templateId]);
    return (
        
        <div>
        {html && css ? (
          <GrapesEditor html={html} css={css} />
        ) : (
          <p>Loading editor...</p>
        )}
      </div>
    );
}

export default EditorPage;