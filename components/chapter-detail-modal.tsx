"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  BookOpen,
  Target,
  TrendingUp,
} from "lucide-react";
import { getChapterIcon } from "@/lib/icons";

interface Chapter {
  subject: string;
  chapter: string;
  class: string;
  unit: string;
  yearWiseQuestionCount: Record<string, number>;
  questionSolved: number;
  status: string;
  isWeakChapter: boolean;
}

interface ChapterDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapter: Chapter | null;
  chapters: Chapter[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export default function ChapterDetailsModal({
  isOpen,
  onClose,
  chapter,
  chapters,
  currentIndex,
  onNavigate,
}: ChapterDetailsModalProps) {
  if (!chapter) return null;

  const ChapterIcon = getChapterIcon(chapter.chapter);
  const totalQuestions = Object.values(chapter.yearWiseQuestionCount).reduce(
    (sum, count) => sum + count,
    0
  );
  const completionPercentage =
    totalQuestions > 0 ? (chapter.questionSolved / totalQuestions) * 100 : 0;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500";
      case "In Progress":
        return "bg-yellow-500";
      case "Not Started":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getSubjectColor = (subject: string) => {
    switch (subject.toLowerCase()) {
      case "physics":
        return "bg-orange-500";
      case "chemistry":
        return "bg-green-500";
      case "mathematics":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      onNavigate(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < chapters.length - 1) {
      onNavigate(currentIndex + 1);
    }
  };

  const years = Object.keys(chapter.yearWiseQuestionCount).sort();
  const maxQuestions = Math.max(
    ...Object.values(chapter.yearWiseQuestionCount)
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`p-2 rounded-lg ${getSubjectColor(
                  chapter.subject
                )} text-white`}
              >
                <ChapterIcon className="w-5 h-5" />
              </div>
              <div>
                <DialogTitle className="text-xl font-semibold">
                  {chapter.chapter}
                </DialogTitle>
                <p className="text-sm text-muted-foreground">
                  {chapter.subject} • {chapter.class} • {chapter.unit}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {currentIndex + 1} of {chapters.length}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentIndex === chapters.length - 1}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-6">
          {/* Status and Progress Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Status</span>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  className={`${getStatusColor(chapter.status)} text-white`}
                >
                  {chapter.status}
                </Badge>
                {chapter.isWeakChapter && (
                  <Badge variant="destructive">Weak Chapter</Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Progress</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Questions Solved</span>
                  <span>
                    {chapter.questionSolved} / {totalQuestions}
                  </span>
                </div>
                <Progress value={completionPercentage} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {completionPercentage.toFixed(1)}% completed
                </p>
              </div>
            </div>
          </div>

          {/* Question Statistics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">Question Statistics</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-primary">
                  {totalQuestions}
                </div>
                <div className="text-xs text-muted-foreground">
                  Total Questions
                </div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-green-600">
                  {chapter.questionSolved}
                </div>
                <div className="text-xs text-muted-foreground">Solved</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-orange-600">
                  {totalQuestions - chapter.questionSolved}
                </div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
              <div className="text-center p-3 bg-muted rounded-lg">
                <div className="text-2xl font-bold text-blue-600">
                  {completionPercentage.toFixed(0)}%
                </div>
                <div className="text-xs text-muted-foreground">Complete</div>
              </div>
            </div>
          </div>

          {/* Year-wise Question Distribution */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                Year-wise Question Distribution
              </span>
            </div>

            <div className="space-y-3">
              {years.map((year) => {
                const count = chapter.yearWiseQuestionCount[year];
                const percentage =
                  maxQuestions > 0 ? (count / maxQuestions) * 100 : 0;

                return (
                  <div key={year} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{year}</span>
                      <span className="text-muted-foreground">
                        {count} questions
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button className="flex-1" size="lg">
              Start Practice
            </Button>
            <Button variant="outline" className="flex-1" size="lg">
              View Questions
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
