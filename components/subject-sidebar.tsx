"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { getChapterIcon } from "@/lib/icons";
import { Separator } from "./ui/separator";
import { ChevronRight } from "lucide-react";

interface SubjectSidebarProps {
  activeSubject: "physics" | "chemistry" | "mathematics";
  setActiveSubject: (subject: "physics" | "chemistry" | "mathematics") => void;
}

export default function SubjectSidebar({
  activeSubject,
  setActiveSubject,
}: SubjectSidebarProps) {
  const PhysicsSubjectIcon = getChapterIcon("physics");
  const ChemistrySubjectIcon = getChapterIcon("chemistry");
  const MathsSubjectIcon = getChapterIcon("maths");

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-xl font-bold flex gap-3 items-center justify-center mb-2">
            <img
              src="./download.webp"
              height={25}
              width={25}
              className="rounded-full"
            />
            JEE Main
          </h1>
          <p className="text-xs text-muted-foreground">
            2025 - 2009 | 173 Papers | 15825 Qs
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Button
          variant="default"
          className={`w-full bg-background dark:text-white text-black hover:text-white justify-between flex ${activeSubject === "physics" ? "bg-blue-950 text-white dark:bg-blue-950 dark:text-white" : ""}`}
          onClick={() => setActiveSubject("physics")}
        >
          <div>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-orange-500 text-white mr-2">
              <PhysicsSubjectIcon />
            </span>
            Physics PYQs
          </div>
          <span>
            <ChevronRight className="rounded-full" />
          </span>
        </Button>

        <Button
          variant="default"
          className={`w-full bg-background dark:text-white text-black hover:text-white justify-between flex ${activeSubject === "chemistry" ? "bg-blue-950 text-white dark:bg-blue-950 dark:text-white" : ""}`}
          onClick={() => setActiveSubject("chemistry")}
        >
          <div>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-green-500 text-white mr-2">
              <ChemistrySubjectIcon />
            </span>
            Chemistry PYQs
          </div>
          <span>
            <ChevronRight className="rounded-full" />
          </span>
        </Button>

        <Button
          variant="default"
          className={`w-full bg-background dark:text-white text-black hover:text-white justify-between flex ${activeSubject === "mathematics" ? "bg-blue-950 text-white dark:bg-blue-950 dark:text-white" : ""}`}
          onClick={() => setActiveSubject("mathematics")}
        >
          <div>
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-md bg-blue-500 text-white mr-2">
              <MathsSubjectIcon />
            </span>
            Mathematics PYQs
          </div>
          <span>
            <ChevronRight className="rounded-full" />
          </span>
        </Button>
      </div>
    </div>
  );
}
