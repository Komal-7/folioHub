import { useEffect, useState } from "react";
import axios from "axios";
import { Box, ImageList, ImageListItem, ImageListItemBar, ListSubheader, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

interface TemplateData {
  id: string;
  img: string;
  tag: string;
}
const Home = () => {
    const [templates, setTemplates] = useState([])
    
    useEffect(()=>{
      getTemplates()
    },[]);
    const getTemplates = async() => {
      try {
        const url = `https://67b3ff48392f4aa94fa8e383.mockapi.io/api/v1/templates`
        const response = await axios.get(url);
        setTemplates(response.data)
      } catch (error) {
        console.error(error);
      }
    }
    return (
        <div>
          <Navbar />
            <p>This is a home page for your application.</p>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              minHeight="100vh"
              flexDirection={'column'}
            >
              
              <Typography variant="h3" gutterBottom>
                Check out the templates
              </Typography>
              <ImageList sx={{ height: 450 }} gap={20}>
                {templates.map((item:TemplateData) => (
                  <ImageListItem key={item.img}>
                    <img
                      srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=248&fit=crop&auto=format`}
                      alt={item.id}
                      loading="lazy"
                    />
                    <ImageListItemBar
                      title={item.tag}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
        </div>
    );
  };
  export default Home;