import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/apiAxios";

const UserPortfolio = () => {
  const { sitename } = useParams();
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const fetchHtml = async () => {
      try {
        const response = await api.get(`/portfolio/${sitename}`);
        setHtmlContent(response.data);
      } catch (err) {
        console.error("Error fetching portfolio:", err);
        setHtmlContent("<h1>Portfolio not found</h1>");
      }
    };

    fetchHtml();
  }, [sitename]);

  return (
    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
};

export default UserPortfolio;