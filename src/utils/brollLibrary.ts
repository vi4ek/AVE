import { staticFile } from "remotion";
import catalogData from "../../public/b_rolls/catalog.json";

export interface BrollItem {
  id: number;
  filename: string;
  path: string;
  type: "image" | "video" | "graphic";
  aspectRatio: string;
  niche: string;
  tags: string[];
  emotion: string;
  description: string;
  whereToUse: string;
  howToUse: string;
  recommendedSFX: string;
}

export const BROLL_CATALOG: BrollItem[] = catalogData as BrollItem[];

/**
 * Get a B-roll item by its numerical ID (1, 2, 3...)
 */
export function getBroll(id: number): BrollItem | undefined {
  return BROLL_CATALOG.find((item) => item.id === id);
}

/**
 * Get the static asset URL for a B-roll by ID
 */
export function getBrollUrl(id: number): string {
  const item = getBroll(id);
  if (!item) {
    throw new Error(`B-Roll with ID #${id} not found in catalog.`);
  }
  return staticFile(`b_rolls/${item.filename}`);
}

/**
 * Find all B-rolls matching a specific niche or tag
 */
export function getBrollsByTag(tag: string): BrollItem[] {
  const query = tag.toLowerCase();
  return BROLL_CATALOG.filter(
    (item) =>
      item.tags.some((t) => t.toLowerCase().includes(query)) ||
      item.niche.toLowerCase().includes(query)
  );
}
