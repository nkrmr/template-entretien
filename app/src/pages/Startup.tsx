import { useEffect, useState } from "react";
import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Chip,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Markdown from "marked-react";
import { Link } from "react-router-dom";

import Layout from "../components/Layout";

function StartupPage() {
  const [startup, setStartup] = useState<StartupData>();
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams();

  useEffect(() => {
    axios
      .get("http://localhost:8080/cfas-sheet")
      .then((response) => {
        const foundStartup = response.data.find(
          (s: StartupData) => s.metadata.slug === slug
        );
        setStartup(foundStartup); // Set the found startup directly
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data. Please try again later."); // Set error message
      });
  }, [slug]);

  if (!startup) {
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
        <Link to="/">Home</Link>
        <Typography color="text.primary">{startup.metadata.title}</Typography>
      </Breadcrumbs>
      <Card>
        <CardMedia
          component="img"
          image="https://beta.gouv.fr/img/betagouv-rectangle.png"
          alt="Startup Image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {startup.metadata.title}
          </Typography>
          <Chip
            label={
              startup.metadata.status
                ? startup.metadata.status.toUpperCase()
                : "UNKNOWN"
            }
            color={startup.metadata.status === "up" ? "success" : "error"}
            sx={{ mb: 2 }}
          />
          <Typography variant="body2" color="text.secondary">
            {startup.metadata.mission}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Markdown>{startup.markdown}</Markdown>
          </Box>
        </CardContent>
      </Card>
    </Layout>
  );
}

export default StartupPage;
