import axios from "axios";

const GITHUB_API_BASE_URL = "https://api.github.com/repos";

export async function fetchStartupsData() {
  const url = `${GITHUB_API_BASE_URL}/betagouv/beta.gouv.fr/contents/content/_startups`;
  const response = await axios.get<Startup[]>(url);
  return response.data;
}

export async function fetchSummaryData() {
  const url = `${GITHUB_API_BASE_URL}/mission-apprentissage/upptime/contents/history/summary.json`;
  const response = await axios.get<Summary>(url);
  return response.data;
}
