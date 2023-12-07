import { parse } from "yaml";
import { generateSlug } from "./slugify";

export const parseYaml = (yamlContent: string) => {
  try {
    return parse(yamlContent);
  } catch (error) {
    console.error("Error parsing YAML content:", error);
    return null;
  }
};

export const getMetadata = (
  metadata: StartupMetadata,
  summaryItems: SummaryItem[]
) => {
  if (metadata && metadata.incubator === "mission-apprentissage") {
    const summaryItem = summaryItems.find(
      (item: SummaryItem) =>
        metadata.link?.replace(/\/$/, "") === item.url.replace(/\/$/, "")
    );
    metadata.status = summaryItem?.status ?? null;
    metadata.slug = generateSlug(metadata.title);

    return metadata;
  }
  return null;
};
