import { useParams } from "react-router-dom";
import contentdata from "../../assets/contentdata";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Navbar/Navbar";
import Box from "@mui/material/Box";


function ContentPage() {

    const { id } = useParams();

  const item = contentdata.find((el) => el.id === Number(id));

  if (!item) return <div>Not found</div>;

    return (
        <>
      <Navbar />
      <Box sx={{margin: "3vw"}}>  
        <div style={{ padding: "20px" }}>
          <Typography variant="h2" sx={{margin:"0 0 5vh"}}>{item.title}</Typography>

          <div style={{display: "flex", margin: "0"}}>
            <img src={item.img} alt={item.title} style={{ width: "50vw", borderRadius: "10px", margin:"10px auto"}} />
            <Typography variant="body1"> {item.description.map((text) => (<p style={{margin:"3vh"}}>{text}</p>))} </Typography>
          </div>
        </div>
      </Box>
    </>
    )
} export default ContentPage;