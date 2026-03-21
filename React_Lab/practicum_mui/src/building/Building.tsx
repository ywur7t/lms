import structures from "../data";
import Box from "@mui/material/Box";
import BuildCard from "../main/components/BuildCard";
import { useParams } from "react-router-dom";

function Building() {
  const { id } = useParams();
  const building = structures[Number(id)];

  return (
    <Box sx={{ maxWidth:1200, mx:"auto", p:2 }}>
      <BuildCard building={building} index={Number(id)} />
    </Box>
  );
}
export default Building;
