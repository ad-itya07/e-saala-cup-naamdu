"use client";

import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectLabel,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "@/hooks/use-media-query";

interface FilterBarProps {
  uniqueClasses: string[];
  uniqueUnits: string[];
  selectedClasses: string[];
  setSelectedClasses: (classes: string[]) => void;
  selectedUnits: string[];
  setSelectedUnits: (units: string[]) => void;
  showNotStarted: boolean;
  setShowNotStarted: (show: boolean) => void;
  showWeakChapters: boolean;
  setShowWeakChapters: (show: boolean) => void;
  handleSort: () => void;
  sortAscending: boolean;
  chaptersCount: number;
}

export default function FilterBar({
  uniqueClasses,
  uniqueUnits,
  selectedClasses,
  setSelectedClasses,
  selectedUnits,
  setSelectedUnits,
  showNotStarted,
  setShowNotStarted,
  showWeakChapters,
  setShowWeakChapters,
  handleSort,
  sortAscending,
  chaptersCount,
}: FilterBarProps) {
  const toggleClass = (className: string) => {
    if (selectedClasses.includes(className)) {
      setSelectedClasses(selectedClasses.filter((c) => c !== className));
    } else {
      setSelectedClasses([...selectedClasses, className]);
    }
  };

  const toggleUnit = (unit: string) => {
    if (selectedUnits.includes(unit)) {
      setSelectedUnits(selectedUnits.filter((u) => u !== unit));
    } else {
      setSelectedUnits([...selectedUnits, unit]);
    }
  };

  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <div className="relative">
      {/* Filters Container */}
      <div
        id="filter-scroll-container"
        className={`${
          isMobile
            ? "flex overflow-x-auto gap-2 no-scrollbar scroll-smooth pr-10"
            : "flex flex-wrap gap-2"
        }`}
      >
        {/* Class Selector */}
        <div className="relative flex-shrink-0">
          <Select>
            <SelectTrigger className="w-24 h-9 rounded-xl">
              <SelectValue placeholder="Class" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-60">
                <SelectGroup>
                  <SelectLabel>Classes</SelectLabel>
                  {uniqueClasses.map((className) => (
                    <div
                      key={className}
                      className="flex items-center space-x-2 p-2"
                    >
                      <Checkbox
                        id={`class-${className}`}
                        checked={selectedClasses.includes(className)}
                        onCheckedChange={() => toggleClass(className)}
                      />
                      <Label htmlFor={`class-${className}`}>{className}</Label>
                    </div>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
          {selectedClasses.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {selectedClasses.length}
            </Badge>
          )}
        </div>

        {/* Unit Selector */}
        <div className="relative flex-shrink-0">
          <Select>
            <SelectTrigger className="w-24 h-9 rounded-xl">
              <SelectValue placeholder="Units" />
            </SelectTrigger>
            <SelectContent>
              <ScrollArea className="h-60">
                <SelectGroup>
                  <SelectLabel>Units</SelectLabel>
                  {uniqueUnits.map((unit) => (
                    <div key={unit} className="flex items-center space-x-2 p-2">
                      <Checkbox
                        id={`unit-${unit}`}
                        checked={selectedUnits.includes(unit)}
                        onCheckedChange={() => toggleUnit(unit)}
                      />
                      <Label htmlFor={`unit-${unit}`}>{unit}</Label>
                    </div>
                  ))}
                </SelectGroup>
              </ScrollArea>
            </SelectContent>
          </Select>
          {selectedUnits.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
              {selectedUnits.length}
            </Badge>
          )}
        </div>

        {/* Not Started Button */}
        <Button
          variant={showNotStarted ? "default" : "outline"}
          size="sm"
          onClick={() => setShowNotStarted(!showNotStarted)}
          className="h-9 rounded-xl flex-shrink-0"
        >
          Not Started
        </Button>

        {/* Weak Chapters Button */}
        <Button
          variant={showWeakChapters ? "default" : "outline"}
          size="sm"
          onClick={() => setShowWeakChapters(!showWeakChapters)}
          className="h-9 rounded-xl flex-shrink-0"
        >
          Weak Chapters
        </Button>
      </div>

      {/* Right Scroll Arrow Button */}
      {isMobile && (
        <button
          onClick={() => {
            const container = document.getElementById(
              "filter-scroll-container"
            );
            container?.scrollBy({ left: 100, behavior: "smooth" });
          }}
          className="absolute m-0 right-0 top-1/2 -translate-y-1/2 h-full w-10 flex items-center justify-center z-10 shadow backdrop-blur-sm opacity-80 transition rounded-l-full dark:bg-blend-darken"
        >
          <ChevronRight className="h-5 w-5 text-black dark:text-white" size={15} />
        </button>
      )}
    </div>
  );
}
