import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        mt: 5,
        py: 3,
        textAlign: "center",
        borderTop: "1px solid #ddd",
        bgcolor: "#fff"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © 2026 Самые высокие здания мира
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ------------------------
      </Typography>
    </Box>
  );
}

export default Footer;