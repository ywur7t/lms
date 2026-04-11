import structures from "../data";
import Box from "@mui/material/Box";
import BuildCard from "../main/components/BuildCard";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Link as RouterLink } from "react-router-dom";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Building() {
  const { id } = useParams();
  const building = structures[Number(id)];

  return (
    <Container maxWidth="lg">
      <Navbar active={"1"} />

      <Breadcrumbs sx={{ mt: 2, mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          Главная
        </Link>

        <Typography color="text.primary">{building?.title}</Typography>
      </Breadcrumbs>

      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          p: 2,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <BuildCard building={building} index={Number(id)} />
      </Box>
    </Container>
  );
}
export default Building;
