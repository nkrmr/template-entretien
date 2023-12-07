import express from "express";
import { fetchStartupData } from "../services/startupService";

const router = express.Router();

router.get("/startups", async (req, res) => {
  try {
    const startupData = await fetchStartupData();
    res.json(startupData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

export default router;
