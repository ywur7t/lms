import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import contentdata from "../../assets/contentdata";

function ContentItem({ item, index, isPink }: any) {
  const getArea = () => {
    if (index === 0) return "one";
    if (index === 1) return "two";
    if (index === 2) return "three";
    if (index === 3) return "four";
  };

  const baseStyle = {
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
  };

  const theme = isPink
    ? { backgroundColor: "#e3a8b7", color: "#6A7A75" }
    : { backgroundColor: "#b8a9a1", color: "#6A7A75" };

  const isVertical = index === 0 || index === 1;

  // 🔹 ВЕРТИКАЛЬНЫЕ (1 и 2)
  if (isVertical) {
    return (
      <Box
        sx={{
          ...baseStyle,
          ...theme,
          gridArea: getArea(),
          flexDirection: "column",
        }}
      >
        
        {/* КАРТИНКА */}
        <Box
          component="img"
          src={item.img}
          sx={{
            order: isPink ? 0 : 2,
            width: "100%",
            height: "150px",
            objectFit: "cover",
            objectPosition: "top",
            borderRadius: "20px",
            mb: 2,
          }}
        />

        {/* ЗАГОЛОВОК */}
        <Typography
          variant="h5"
          sx={{
            order: 1,
            color: "#234F42",
          }}
        >
          {item.title}
        </Typography>

        {/* ТЕКСТ */}
        <Typography
          sx={{
            order: 2,
            display: "-webkit-box",
            WebkitLineClamp: 4,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textAlign: "justify",
          }}
        >
          {item.description.join(" ")}
        </Typography>

        <Link to={`/content/${item.id}`} style={{order:3}}><Typography sx={{ mt: 1, color: "blue",  }}>
          Подробнее →
        </Typography>
        </Link>
        

        
      </Box>
    );
  }

  // 🔹 ГОРИЗОНТАЛЬНЫЕ (3 и 4)
  return (
    <Box
      sx={{
        ...baseStyle,
        ...theme,
        gridArea: getArea(),
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
      }}
    >
      {/* КАРТИНКА */}
      <Box
        component="img"
        src={item.img}
        sx={{
          order: isPink ? 0 : 1,
          width: "120px",
          height: "120px",
          objectFit: "cover",
          borderRadius: "20px",
        }}
      />

      {/* ТЕКСТ */}
      <Box sx={{ order: 1 }}>
        <Typography variant="h6" sx={{ color: "#234F42" }}>
          {item.title}
        </Typography>

        <Typography
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textAlign: "justify",
          }}
        >
          {item.description.join(" ")}
        </Typography>
<Link to={`/content/${item.id}`}>
        <Typography sx={{ mt: 1, color: "blue" }}>
          Подробнее →
        </Typography>
        </Link>
      </Box>
    </Box>
  );
}

export default ContentItem;