"use client"
import * as PhosphorIcons from "@phosphor-icons/react";

// Simple hash function to convert chapter name to a number
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

export function getChapterIcon(chapterName: string) {
  const iconKeys = Object.keys(PhosphorIcons);
  const index = hashString(chapterName) % iconKeys.length;
  const iconKey = iconKeys[index];
  return PhosphorIcons[iconKey as keyof typeof PhosphorIcons];
}
