import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import gallerydata from '../../assets/gallerydata'

function Gallery() {
        
    return (
    // <Container sx={{ mt: 10}}>
      <Box sx={{ width: "100%", margin: "0 auto", mt:10 }}>
        <ImageList variant="quilted" cols={3} rowHeight={200}>
          
          <ImageListItem cols={2} rows={2}>
            <Link to={`/gallery/${gallerydata[0].id}`}>
              <img src={gallerydata[0].img} alt={gallerydata[0].title} style={{ width: "100%", height: "100%", objectFit: "cover"}}/>
              <ImageListItemBar title={gallerydata[0].title} />
            </Link>
          </ImageListItem>

          <ImageListItem cols={1} rows={1}>
            <Link to={`/gallery/${gallerydata[1].id}`}>
              <img src={gallerydata[1].img} alt={gallerydata[1].title} style={{ width: "100%", height: "100%", objectFit: "cover"}} />
              <ImageListItemBar title={gallerydata[1].title} />
            </Link>
          </ImageListItem>

          <ImageListItem cols={1} rows={1}>
            <Link to={`/gallery/${gallerydata[2].id}`}>
              <img src={gallerydata[2].img} alt={gallerydata[2].title} style={{ width: "100%", height: "100%", objectFit: "cover"}} />
              <ImageListItemBar title={gallerydata[2].title} />
            </Link>
          </ImageListItem>

          <ImageListItem cols={3} rows={1}>
            <Link to={`/gallery/${gallerydata[3].id}`}>
              <img src={gallerydata[3].img} alt={gallerydata[3].title} style={{ width: "100%", height: "100%", objectFit: "cover"}} />
              <ImageListItemBar title={gallerydata[3].title} />
            </Link>
          </ImageListItem>

        </ImageList>
      </Box>
    // </Container>
  );
} export default Gallery;