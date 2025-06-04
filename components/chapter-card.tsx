import { ArrowDown, ArrowUp } from "lucide-react";
import { getChapterIcon } from "@/lib/icons";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ChapterCardProps {
  chapter: {
    subject: string;
    chapter: string;
    class: string;
    unit: string;
    yearWiseQuestionCount: Record<string, number>;
    questionSolved: number;
    status: string;
    isWeakChapter: boolean;
  };
  onClick?: () => void;
}

export default function ChapterCard({ chapter, onClick }: ChapterCardProps) {
  // Get the latest two years from the yearWiseQuestionCount
  const years = Object.keys(chapter.yearWiseQuestionCount).sort(
    (a, b) => Number.parseInt(b) - Number.parseInt(a)
  );
  const latestYear = years[0];
  const secondLatestYear = years[1];

  // Calculate if there's an increase or decrease in questions from the second latest to the latest year
  const latestCount = chapter.yearWiseQuestionCount[latestYear] || 0;
  const secondLatestCount =
    chapter.yearWiseQuestionCount[secondLatestYear] || 0;
  const isIncreasing = latestCount > secondLatestCount;

  // Get total questions
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce(
    (sum, count) => sum + count,
    0
  );

  // Get random icon for the chapter
  const ChapterIcon = getChapterIcon(chapter.chapter);

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="border rounded-lg p-3 hover:bg-accent/50 transition-colors" onClick={onClick}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-primary">
            <ChapterIcon className="h-5 w-5" />
          </div>
          <div className="flex-row gap-2">
            <h3 className="font-medium">
              {!isMobile
                ? chapter.chapter
                : `${chapter.chapter.slice(0, 20)}${
                    chapter.chapter.length > 12 ? "..." : ""
                  }`}
            </h3>
            {isMobile && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {latestYear}: {latestCount} Qs
                </span>

                <span>
                  {isIncreasing ? (
                    <ArrowUp className="h-3 w-3 text-green-500" />
                  ) : (
                    <ArrowDown className="h-3 w-3 text-red-500" />
                  )}
                </span>

                <span className="text-sm text-muted-foreground"> | </span>
                <span className="text-sm text-muted-foreground">
                  {secondLatestYear}: {secondLatestCount} Qs
                </span>
              </div>
            )}
          </div>
        </div>

        {!isMobile && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {latestYear}: {latestCount} Qs
            </span>

            <span>
              {isIncreasing ? (
                <ArrowUp className="h-3 w-3 text-green-500" />
              ) : (
                <ArrowDown className="h-3 w-3 text-red-500" />
              )}
            </span>

            <span className="text-sm text-muted-foreground"> | </span>
            <span className="text-sm text-muted-foreground">
              {secondLatestYear}: {secondLatestCount} Qs
            </span>

            <span className="text-sm text-muted-foreground"> | </span>
            <span className="text-sm text-muted-foreground">113/205 Qs</span>
          </div>
        )}

        {isMobile && (
          <div className="border-l pl-2 ml-2 text-sm text-muted-foreground">
            <div className="text-sm font-medium">113/205 Qs</div>
          </div>
        )}
      </div>
    </div>
  );
}
