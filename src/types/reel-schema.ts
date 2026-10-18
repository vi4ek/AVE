export type SceneType =
  | "hook"
  | "search"
  | "terminal"
  | "metrics"
  | "poll"
  | "cta";

export interface SceneConfig {
  id: string;
  type: SceneType;
  durationInSeconds: number;
  title: string;
  subtitle?: string;
  highlightText?: string;
  highlightColor?: string;
  params?: {
    searchQuery?: string;
    targetUrl?: string;
    command?: string;
    streamText?: string;
    metrics?: { label: string; value: string; color?: string }[];
    pollQuestion?: string;
    pollOption1?: string;
    pollOption2?: string;
    pollPercentage?: number;
    ctaButtonText?: string;
  };
}

export interface DynamicReelConfig {
  id: string;
  title: string;
  audioFile?: string;
  bgmFile?: string;
  captionsFile?: string;
  fps?: number;
  theme?: "ambient-slate" | "obsidian-amber" | "cyber-cyan";
  scenes: SceneConfig[];
}
