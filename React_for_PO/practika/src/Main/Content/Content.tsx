import Box from "@mui/material/Box";
import contentdata from "../../assets/contentdata";
import ContentItem from "../Components/ContentItem";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";


function Content() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const chunkArray = (arr: any[], size: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const groups = chunkArray(contentdata, 4);

  return (
    <Box sx={{ margin: "5vw" }}>
      {groups.map((group, groupIndex) => (
        <Box
          key={groupIndex}
          sx={{
            display: "grid",

            // 🔥 адаптив
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",

            // 🔥 на мобиле — просто поток
            gridTemplateRows: isMobile ? "auto" : "1fr 1fr",

            gridTemplateAreas: isMobile
              ? `
                "one"
                "two"
                "three"
                "four"
              `
              : `
                "one two three"
                "one two four"
              `,

            gap: 3,
            mb: 5,
          }}
        >
          {group.map((item, index) => (
            <ContentItem
              key={index}
              item={item}
              index={index}
              isPink={groupIndex % 2 === 1}
            />
          ))}
        </Box>
      ))}
    </Box>
  );
}
export default Content;
