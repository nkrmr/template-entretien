interface Phase {
  name: string;
  start: string;
}

interface Metadata {
  mission: string;
  incubator: string;
  contact: string;
  title: string;
  phases: Phase[];
  status: string | null;
  slug: string;
}

interface StartupData {
  metadata: Metadata;
  markdown: string;
}
