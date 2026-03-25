import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import {Link} from "react-router-dom"
import { useLocation } from "react-router-dom";
import Container from "@mui/material/Container";

// interface ComponentProps {
//   active: string;
// }
// { active }: ComponentProps
function Navbar() {

    const location = useLocation();
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = (newOpen: boolean) => () => {setOpen(newOpen);};

    return (
        <AppBar>
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <Link to="/"> 
                <Button variant={location.pathname === "/" ? "contained":"text"} color="info" size="medium"> Main </Button> 
                </Link>
                <Link to="/tables"> 
                <Button variant={location.pathname === "/tables" ? "contained":"text"} color="info" size="medium"> Tables </Button> 
                </Link>
                <Link to="/graphics"> 
                <Button variant={location.pathname === "/graphics" ? "contained":"text"} color="info" size="medium"> Graphics </Button> 
                </Link>
                <Link to="/testing"> 
                <Button variant={location.pathname === "/testing" ? "contained":"text"} color="info" size="medium"> Tesing </Button> 
                </Link>

                <Link to="/crud"> 
                <Button variant={location.pathname === "/crud" ? "contained":"text"} color="info" size="medium"> Crud </Button> 
                </Link>
            </Box>

            <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton aria-label="Menu button" onClick={toggleDrawer(true)} > <MenuIcon /> </IconButton>

                <Drawer anchor="top" open={open} onClose={toggleDrawer(false)} >
                    <Box>                        
                        <IconButton onClick={toggleDrawer(false)} > <CloseRoundedIcon /> </IconButton>                       

                        <Link to="/"> 
                        <MenuItem selected={location.pathname === "/"} > Main </MenuItem> 
                        </Link>
                        <Link to="/tables"> 
                        <MenuItem selected={location.pathname === "/tables"} > Tables </MenuItem> 
                        </Link>
                        <Link to="/graphics"> 
                        <MenuItem selected={location.pathname === "/graphics"} > Graphics </MenuItem> 
                        </Link>
                        <Link to="/testing"> 
                        <MenuItem selected={location.pathname === "/testing"} > Testing </MenuItem> 
                        </Link>
                        <Link to="/crud"> 
                        <MenuItem selected={location.pathname === "/crud"} > Crud </MenuItem> 
                        </Link>
                    </Box>
                </Drawer>

            </Box>
        </AppBar>
    );
}
export default Navbar;
