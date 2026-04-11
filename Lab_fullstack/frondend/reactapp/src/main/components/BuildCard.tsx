import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { styled } from "@mui/material/styles";
import { Link } from 'react-router-dom';

interface ComponentProps {
    building: {
        img: string,
        title: string,
        description: string[],

    };
    index: number;
}

const StyledTypography = styled(Typography)(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: "justify",
    marginBottom: theme.spacing(2),
}));

function BuildCard({ building, index }: ComponentProps) {
    return (
        <Card sx={{
            display: "flex",
            flexDirection: {
                // xs: index % 2 === 0 ? "row-reverse" : "row",
                xs: "column",
                md: index % 2 === 0 ? "row-reverse" : "row",
            },
            gap: 2,
        }}
        >
            <CardMedia
                component="img"
                alt={building.title}
                image={building.img}
                sx={{
    width: {
      xs: "100%", // 🔥 на мобиле во всю ширину
      md: 300
    },
    height: {
      xs: 200,
      md: "auto"
    },
    objectFit: "cover"
  }}

            />
            <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}
            >
                <CardContent>
                    <Typography gutterBottom variant="h5" >
                        {building.title}
                    </Typography>
                    {building.description.map((item, ind) => (
                        <StyledTypography key={ind} variant="body2">
                            {item}
                        </StyledTypography>
                    ))}
                </CardContent>
                <CardActions sx={{ justifyContent: 'start' }} >
                    <Link key={index} to={"/building/" + index}><Button size="small" sx={{ fontWeight: 700 }}>Подробнее</Button></Link>
                </CardActions>
            </Box>
        </Card>
    )
}
export default BuildCard;