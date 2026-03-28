import { useParams, Link as RouterLink } from "react-router-dom";
import gallerydata from "../../assets/gallerydata";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Navbar from "../../Navbar/Navbar";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function GalleryPage() {
  const { id } = useParams();

  const item = gallerydata.find((el) => el.id === Number(id));

  if (!item) return <div>Not found</div>;

  return (
    <>
      <Navbar />

      <Box sx={{ margin: "3vw" }}>
        <Container maxWidth="lg">
          
          {/* 🔥 ХЛЕБНЫЕ КРОШКИ */}
          <Breadcrumbs sx={{ mb: 3 }}>
            <Link
              component={RouterLink}
              to="/"
              underline="hover"
              color="inherit"
            >
              Галерея
            </Link>

            <Typography color="text.primary">
              {item.title}
            </Typography>
          </Breadcrumbs>

          <Typography variant="h2" sx={{ mb: 5 }}>
            {item.title}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" }, // 🔥 адаптив
              gap: 3,
            }}
          >
            <Box
              component="img"
              src={item.img}
              alt={item.title}
              sx={{
                // width: { xs: "100%", md: "auto" },
                height: { xs: "100%", md: "50vh" },
                borderRadius: "10px",
              }}
            />

            <Box>
              <Typography variant="body1">
                {item.description.map((text, index) => (
                  <p key={index} style={{ margin: "3vh 0" }}>
                    {text}
                  </p>
                ))}
              </Typography>
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default GalleryPage;