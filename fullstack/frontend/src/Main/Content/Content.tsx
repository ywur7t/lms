import Box from "@mui/material/Box";
import contentdata from "../../assets/contentdata";
import ContentItem from "../Components/ContentItem";
import { Link } from "react-router-dom";

function Content() {
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
            gridTemplateColumns: "1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr",
            gridTemplateAreas: `
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
