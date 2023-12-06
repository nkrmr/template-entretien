interface Startup {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string;
  _links: {
    self: string;
    git: string;
    html: string;
  };
}

interface Summary {
  name: string;
  slug: string;
  content: string;
}

interface SummaryItem {
  name: string;
  slug: string;
  content: string;
  url: string;
  status: string;
}
