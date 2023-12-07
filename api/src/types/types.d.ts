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

interface Phase {
  name: string;
  start: string;
  end?: string;
}

interface StartupMetadata {
  title: string;
  mission: string;
  link: string;
  incubator: string;
  phases: Phase[];
  status: string | null;
  slug: string;
}
