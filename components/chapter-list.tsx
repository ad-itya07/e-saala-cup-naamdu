"use client";

import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ModeToggle } from "@/components/mode-toggle";
import SubjectSidebar from "@/components/subject-sidebar";
import ChapterCard from "@/components/chapter-card";
import ChapterDetailsModal from "@/components/chapter-detail-modal";
import FilterBar from "@/components/filter-bar";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileHeader from "@/components/mobile-header";
import { chapterData } from "@/lib/data";
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

export default function ChapterList() {
  const [activeSubject, setActiveSubject] = useState<
    "physics" | "chemistry" | "mathematics"
  >("physics");
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [showNotStarted, setShowNotStarted] = useState(false);
  const [showWeakChapters, setShowWeakChapters] = useState(false);
  const [sortAscending, setSortAscending] = useState(true);

  // Modal state
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);

  const isMobile = useMediaQuery("(max-width: 768px)");

  // Get unique classes and units for filters
  const uniqueClasses = useMemo(() => {
    return [
      ...new Set(
        chapterData
          .filter((item) => item.subject.toLowerCase() === activeSubject)
          .map((item) => item.class)
      ),
    ];
  }, [activeSubject]);

  const uniqueUnits = useMemo(() => {
    return [
      ...new Set(
        chapterData
          .filter((item) => item.subject.toLowerCase() === activeSubject)
          .map((item) => item.unit)
      ),
    ];
  }, [activeSubject]);

  // Filter chapters based on selected filters
  const filteredChapters = useMemo(() => {
    return chapterData
      .filter((chapter) => chapter.subject.toLowerCase() === activeSubject)
      .filter(
        (chapter) =>
          selectedClasses.length === 0 ||
          selectedClasses.includes(chapter.class)
      )
      .filter(
        (chapter) =>
          selectedUnits.length === 0 || selectedUnits.includes(chapter.unit)
      )
      .filter((chapter) => !showNotStarted || chapter.status === "Not Started")
      .filter((chapter) => !showWeakChapters || chapter.isWeakChapter)
      .sort((a, b) => {
        // Sort by total question count
        const totalA = Object.values(a.yearWiseQuestionCount).reduce(
          (sum, count) => sum + count,
          0
        );
        const totalB = Object.values(b.yearWiseQuestionCount).reduce(
          (sum, count) => sum + count,
          0
        );
        return sortAscending ? totalA - totalB : totalB - totalA;
      });
  }, [
    activeSubject,
    selectedClasses,
    selectedUnits,
    showNotStarted,
    showWeakChapters,
    sortAscending,
  ]);

  const handleSort = () => {
    setSortAscending(!sortAscending);
  };

  const handleChapterClick = (chapter: Chapter, index: number) => {
    setSelectedChapter(chapter);
    setCurrentChapterIndex(index);
    setIsModalOpen(true);
  };

  const handleModalNavigate = (newIndex: number) => {
    if (newIndex >= 0 && newIndex < filteredChapters.length) {
      setSelectedChapter(filteredChapters[newIndex]);
      setCurrentChapterIndex(newIndex);
    }
  };

  const PhysicsSubjectIcon = getChapterIcon("physics");
  const ChemistrySubjectIcon = getChapterIcon("chemistry");
  const MathsSubjectIcon = getChapterIcon("maths");

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-background">
      {!isMobile && (
        <div className="w-64 border-r border-border">
          <SubjectSidebar
            activeSubject={activeSubject}
            setActiveSubject={setActiveSubject}
          />
        </div>
      )}

      <div className="flex-1">
        {isMobile ? (
          <div>
            <MobileHeader />
            <Tabs
              defaultValue="physics"
              className="w-full space-y-5"
              onValueChange={(value) => setActiveSubject(value as any)}
            >
              <div className="flex justify-center px-2 pb-5 border-b">
                <TabsList className="grid grid-cols-3 w-full max-w-sm gap-1 bg-transparent p-1 rounded-lg">
                  <TabsTrigger
                    value="physics"
                    className="text-xs px-2 py-1 rounded-lg data-[state=active]:bg-[#2c2c3e] data-[state=active]:shadow-md data-[state=active]:text-white"
                  >
                    <div className="flex flex-col items-center space-y-0.5">
                      <div className="bg-orange-500 text-white rounded p-1 mb-1">
                        <PhysicsSubjectIcon />
                      </div>
                      <span className="text-[11px] font-medium">Phy</span>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value="chemistry"
                    className="text-xs px-2 py-1 rounded-lg data-[state=active]:bg-[#2c2c3e] data-[state=active]:shadow-md"
                  >
                    <div className="flex flex-col items-center space-y-0.5">
                      <div className="bg-green-500 text-white rounded p-1">
                        <ChemistrySubjectIcon />
                      </div>
                      <span className="text-[11px] font-medium">Chem</span>
                    </div>
                  </TabsTrigger>

                  <TabsTrigger
                    value="mathematics"
                    className="text-xs px-2 py-1 rounded-lg data-[state=active]:bg-[#2c2c3e] data-[state=active]:shadow-md"
                  >
                    <div className="flex flex-col items-center space-y-0.5">
                      <div className="bg-blue-500 text-white rounded p-1">
                        <MathsSubjectIcon />
                      </div>
                      <span className="text-[11px] font-medium">Math</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* TabsContent for Physics */}
              <TabsContent value="physics" className="m-0">
                <FilterBar
                  uniqueClasses={uniqueClasses}
                  uniqueUnits={uniqueUnits}
                  selectedClasses={selectedClasses}
                  setSelectedClasses={setSelectedClasses}
                  selectedUnits={selectedUnits}
                  setSelectedUnits={setSelectedUnits}
                  showNotStarted={showNotStarted}
                  setShowNotStarted={setShowNotStarted}
                  showWeakChapters={showWeakChapters}
                  setShowWeakChapters={setShowWeakChapters}
                  handleSort={handleSort}
                  sortAscending={sortAscending}
                  chaptersCount={filteredChapters.length}
                />
                <div className="space-y-2 p-2">
                  {filteredChapters.map((chapter, index) => (
                    <ChapterCard
                      key={index}
                      chapter={chapter}
                      onClick={() => handleChapterClick(chapter, index)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="chemistry" className="m-0">
                <FilterBar
                  uniqueClasses={uniqueClasses}
                  uniqueUnits={uniqueUnits}
                  selectedClasses={selectedClasses}
                  setSelectedClasses={setSelectedClasses}
                  selectedUnits={selectedUnits}
                  setSelectedUnits={setSelectedUnits}
                  showNotStarted={showNotStarted}
                  setShowNotStarted={setShowNotStarted}
                  showWeakChapters={showWeakChapters}
                  setShowWeakChapters={setShowWeakChapters}
                  handleSort={handleSort}
                  sortAscending={sortAscending}
                  chaptersCount={filteredChapters.length}
                />
                <div className="space-y-2 p-2">
                  {filteredChapters.map((chapter, index) => (
                    <ChapterCard
                      key={index}
                      chapter={chapter}
                      onClick={() => handleChapterClick(chapter, index)}
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="mathematics" className="m-0">
                <FilterBar
                  uniqueClasses={uniqueClasses}
                  uniqueUnits={uniqueUnits}
                  selectedClasses={selectedClasses}
                  setSelectedClasses={setSelectedClasses}
                  selectedUnits={selectedUnits}
                  setSelectedUnits={setSelectedUnits}
                  showNotStarted={showNotStarted}
                  setShowNotStarted={setShowNotStarted}
                  showWeakChapters={showWeakChapters}
                  setShowWeakChapters={setShowWeakChapters}
                  handleSort={handleSort}
                  sortAscending={sortAscending}
                  chaptersCount={filteredChapters.length}
                />
                <div className="space-y-2 p-2">
                  {filteredChapters.map((chapter, index) => (
                    <ChapterCard
                      key={index}
                      chapter={chapter}
                      onClick={() => handleChapterClick(chapter, index)}
                    />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="p-4">
            <div className="flex justify-between items-start mb-4 w-full">
              {/* Left section: Icon, Heading, Subheading */}
              <div className="flex flex-col items-center text-center mx-auto gap-2">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <span
                    className={`inline-flex items-center justify-center w-6 h-6 rounded-md ${
                      activeSubject === "physics"
                        ? "bg-orange-500"
                        : activeSubject === "chemistry"
                        ? "bg-green-500"
                        : "bg-blue-500"
                    } text-white`}
                  >
                    {activeSubject === "physics" ? (
                      <PhysicsSubjectIcon />
                    ) : activeSubject === "chemistry" ? (
                      <ChemistrySubjectIcon />
                    ) : (
                      <MathsSubjectIcon />
                    )}
                  </span>
                  {activeSubject.charAt(0).toUpperCase() +
                    activeSubject.slice(1)}{" "}
                  PYQs
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Chapter-wise Collection of{" "}
                  {activeSubject.charAt(0).toUpperCase() +
                    activeSubject.slice(1)}{" "}
                  PYQs
                </p>
              </div>

              {/* Right section: Mode toggle */}
              <div className="absolute right-4 top-2">
                <ModeToggle />
              </div>
            </div>

            <FilterBar
              uniqueClasses={uniqueClasses}
              uniqueUnits={uniqueUnits}
              selectedClasses={selectedClasses}
              setSelectedClasses={setSelectedClasses}
              selectedUnits={selectedUnits}
              setSelectedUnits={setSelectedUnits}
              showNotStarted={showNotStarted}
              setShowNotStarted={setShowNotStarted}
              showWeakChapters={showWeakChapters}
              setShowWeakChapters={setShowWeakChapters}
              handleSort={handleSort}
              sortAscending={sortAscending}
              chaptersCount={filteredChapters.length}
            />

            <div className="space-y-2 mt-4">
              {filteredChapters.map((chapter, index) => (
                <ChapterCard
                  key={index}
                  chapter={chapter}
                  onClick={() => handleChapterClick(chapter, index)}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Chapter Details Modal */}
      <ChapterDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        chapter={selectedChapter}
        chapters={filteredChapters}
        currentIndex={currentChapterIndex}
        onNavigate={handleModalNavigate}
      />
    </div>
  );
}
