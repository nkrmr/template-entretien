import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import Layout from "../components/Layout";

function HomePage() {
  const [startUps, setStartUps] = useState<StartupData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/cfas-sheet")
      .then((response) => {
        setStartUps(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later.");
      });
  }, []);

  if (!startUps) {
    return <Layout>Loading...</Layout>;
  }

  if (error) {
    return (
      <Layout>
        <Typography color="error">{error}</Typography>
      </Layout>
    );
  }

  return (
    <Layout>
      <Breadcrumbs aria-label="breadcrumb">
        <Typography color="text.primary">Home</Typography>
      </Breadcrumbs>
      <Container>
        <Grid container spacing={3}>
          {startUps.map((startUp: StartupData) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={startUp.metadata.title}
              style={{ display: "flex" }}
            >
              <Card
                sx={{
                  width: "100%",
                  height: "30em",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  image="https://beta.gouv.fr/img/betagouv-rectangle.png"
                  alt="beta.gouv.fr logo"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {startUp.metadata.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {startUp.metadata.mission}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Link
                    to={`/startup/${startUp.metadata.slug}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button size="small">En savoir plus</Button>
                  </Link>
                  <Box sx={{ flexGrow: 1 }} />{" "}
                  {startUp.metadata?.status && (
                    <Chip
                      label={startUp.metadata.status.toUpperCase()}
                      color={
                        startUp.metadata.status === "up" ? "success" : "error"
                      }
                    />
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
}

export default HomePage;
