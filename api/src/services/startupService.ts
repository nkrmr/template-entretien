import axios from "axios";
import { getMetadata, parseYaml } from "../utils/metadata";
import { fetchStartupsData, fetchSummaryData } from "./githubService";

export async function fetchStartupData() {
  const [startupsResponse, summaryResponse] = await Promise.all([
    fetchStartupsData(),
    fetchSummaryData(),
  ]);

  const summaryItems = JSON.parse(
    Buffer.from(summaryResponse.content, "base64").toString("utf-8")
  );

  return (
    await Promise.all(
      startupsResponse
        .filter((file) => file.type === "file" && file.name.endsWith(".md"))
        .map((file) => axios.get(file.download_url))
    )
  )
    .map((response) => {
      try {
        const [yamlContent, markdownContent] = response.data
          .split("---")
          .slice(1, 3);

        const metadata = parseYaml(yamlContent);
        const getFormatedMetadata = getMetadata(metadata, summaryItems);

        if (getFormatedMetadata) {
          return { metadata: getFormatedMetadata, markdown: markdownContent };
        }
        return null;
      } catch (error) {
        console.error(`Error fetching content for file:`, error);
        return null;
      }
    })
    .filter((file) => file !== null);
}
