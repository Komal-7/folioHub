import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Chip, ImageList, ImageListItem, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import api from "../utils/apiAxios";
import { useNavigate } from "react-router-dom";

interface TemplateData {
  template_id: string;
  tags: string[];
  s3_preview: string;

}
const Home = () => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      const fetchTemplates = async () => {
        try {
          const response = await api.get("/templates");
          setTemplates(response.data?.templates);
        } catch (error) {
          console.error("Error fetching templates:", error);
        }
      };

      fetchTemplates();
    }, []);

    const searchFor = (value: string) => {
      setSearchValue(value.toLowerCase());
    };
  

    const handleTemplateClick = (templateId: string) => {
      navigate(`/editor/${templateId}`);
    };

    return (
        <Box sx={{backgroundColor: '#ededff', height: '100vh'}}>
          <Navbar />
            <Box
              alignItems="center" 
              justifyItems={'center'}
              margin={1}
            >
              
              <Typography variant="h3" sx={{fontFamily: "EB Garamond" , color: '#2d3159', marginBottom: 3}}>
                From Resume to Website — Effortless Portfolio Creation!
              </Typography>
              <Typography variant="h5" sx={{fontFamily: "EB Garamond" , color: '#2d3159', marginBottom: 2, fontSize: 30}}>
                Explore our templates to help you easily create your own design online
              </Typography>
              <SearchBar onSearch={searchFor}/>
              <ImageList gap={20}>
                {templates
                  .filter((template) => {
                    if (!searchValue) return true;
                    return template.tags.some(tag =>
                      tag.toLowerCase().includes(searchValue.toLowerCase())
                    );
                  })
                  .map((item) => (
                    <ImageListItem
                      key={item.template_id}
                      onClick={() => handleTemplateClick(item.template_id)}
                      sx={{
                        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px",
                        margin: 10,
                        cursor: "pointer",
                      }}
                    >
                      <img src={item.s3_preview} loading="lazy" />
                      <Box m={1} display="flex" flexWrap="wrap" gap={1}>
                        {item.tags.map((tag) => (
                          <Chip key={tag} label={`#${tag}`} variant="outlined" size="small" />
                        ))}
                      </Box>
                    </ImageListItem>
                  ))}
                </ImageList>
            </Box>
        </Box>
    );
  };
  export default Home;