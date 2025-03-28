import { useEffect, useState } from "react";
import axios from "axios";
import { Box, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import api from "../utils/apiAxios";

interface TemplateData {
  template_id: string;
  tags: string;
  s3_preview: string;

}
const Home = () => {
    const [templates, setTemplates] = useState<TemplateData[]>([]);

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

    const searchFor = (search:any) => { }

    return (
        <Box sx={{backgroundColor: '#ededff', height: '100vh'}}>
          <Navbar />
            <Box
              alignItems="center" 
              justifyItems={'center'}
              margin={5}
            >
              
              <Typography variant="h3" sx={{fontFamily: "EB Garamond" , color: '#2d3159', marginBottom: 3}}>
                From Resume to Website — Effortless Portfolio Creation!
              </Typography>
              <Typography variant="h5" sx={{fontFamily: "EB Garamond" , color: '#2d3159', marginBottom: 2, fontSize: 30}}>
                Explore our templates to help you easily create your own design online
              </Typography>
              <SearchBar onSearch={searchFor}/>
              <ImageList gap={20}>
                {templates.map((item:TemplateData) => (
                  <ImageListItem key={item.template_id} sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 10px", margin: 10}}>
                    <img
                      src={`${item.s3_preview}`}
                      loading="lazy"
                    />
                    {/* <ImageListItemBar
                      title={item.tags}
                    /> */}
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
        </Box>
    );
  };
  export default Home;