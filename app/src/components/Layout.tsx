import React from "react";
import {
  Container,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Layoput = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" component="div">
            Template
          </Typography>
        </Toolbar>
      </AppBar>
      {children}
    </Container>
  );
};

export default Layoput;
