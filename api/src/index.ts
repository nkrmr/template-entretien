import Axios from "axios";
import express, { Express, Request, Response } from "express";
import { parse } from "yaml";
import cors from "cors";
import slugify from "slugify";
import { setupCache } from "axios-cache-interceptor";

const app: Express = express();
const port = 8080;

const corsOptions = {
  origin: "http://localhost:3000",
};

const axios = setupCache(Axios);

app.use(cors(corsOptions));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/cfas-sheet", async (req: Request, res: Response) => {
  try {
    // URLs to fetch data from GitHub repositories
    const startupsUrl =
      "https://api.github.com/repos/betagouv/beta.gouv.fr/contents/content/_startups";
    const summaryUrl =
      "https://api.github.com/repos/mission-apprentissage/upptime/contents/history/summary.json";

    // Fetching data from both URLs simultaneously
    const [startupsResponse, summaryResponse] = await Promise.all([
      axios.get<Startup[]>(startupsUrl),
      axios.get<Summary>(summaryUrl),
    ]);

    // Decoding the base64 encoded content from the summary response
    const decodedContent = Buffer.from(
      summaryResponse.data.content,
      "base64"
    ).toString("utf-8");

    const summaryItems: SummaryItem[] = JSON.parse(decodedContent);

    // Filtering the data to get only markdown files
    const mdFiles = startupsResponse.data.filter((file) =>
      file.name.endsWith(".md")
    );

    // Fetching the content of each markdown file
    const fileContents = await Promise.all(
      mdFiles.map((file) => axios.get(file.download_url))
    );

    // Parsing each file content
    const parsedFiles = fileContents.map((response) => {
      const splitContent = response.data.split("---");
      const yamlContent = splitContent[1];
      const markdownContent = splitContent.slice(2).join("---");

      try {
        // Parsing the YAML metadata
        const metadata = parse(yamlContent);
        // Processing only files content 'mission-apprentissage' from incubator
        if (metadata.incubator === "mission-apprentissage") {
          const status = null;

          // Finding the corresponding summary item to extract the status
          if (metadata.link) {
            const summaryItem = summaryItems.find(
              (item) =>
                metadata.link.replace(/\/$/, "") === item.url.replace(/\/$/, "")
            );

            metadata.status = summaryItem ? summaryItem.status : null;
          } else {
            metadata.status = status;
          }

          // Generating a slug from the title
          metadata.slug = slugify(metadata.title.toLowerCase());

          // Return formatted metadata and markdown content
          return {
            metadata,
            markdown: markdownContent,
          };
        }
      } catch (err) {
        const error = err as { code: string; message: string };
        if (error.code === "DUPLICATE_KEY") {
          console.warn(`Warning: Duplicate key in file`);
        } else {
          console.error(`Error parsing YAML in file `);
        }
      }
      return null;
    });

    res.json(parsedFiles.filter((file) => file !== null));
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).send("Error fetching data");
  }
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
