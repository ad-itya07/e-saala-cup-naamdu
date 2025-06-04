"use client"

import { create } from "zustand"
import { chapterData } from "./data"

interface ChapterState {
  activeSubject: "physics" | "chemistry" | "mathematics"
  selectedClasses: string[]
  selectedUnits: string[]
  showNotStarted: boolean
  showWeakChapters: boolean
  sortAscending: boolean
  filteredChapters: typeof chapterData

  setActiveSubject: (subject: "physics" | "chemistry" | "mathematics") => void
  setSelectedClasses: (classes: string[]) => void
  setSelectedUnits: (units: string[]) => void
  toggleNotStarted: () => void
  toggleWeakChapters: () => void
  toggleSort: () => void
}

export const useChapterStore = create<ChapterState>((set, get) => ({
  activeSubject: "physics",
  selectedClasses: [],
  selectedUnits: [],
  showNotStarted: false,
  showWeakChapters: false,
  sortAscending: true,
  filteredChapters: chapterData.filter((chapter) => chapter.subject.toLowerCase() === "physics"),

  setActiveSubject: (subject) => {
    set({ activeSubject: subject })
    const { selectedClasses, selectedUnits, showNotStarted, showWeakChapters, sortAscending } = get()
    set({
      filteredChapters: filterChapters(
        subject,
        selectedClasses,
        selectedUnits,
        showNotStarted,
        showWeakChapters,
        sortAscending,
      ),
    })
  },

  setSelectedClasses: (classes) => {
    set({ selectedClasses: classes })
    const { activeSubject, selectedUnits, showNotStarted, showWeakChapters, sortAscending } = get()
    set({
      filteredChapters: filterChapters(
        activeSubject,
        classes,
        selectedUnits,
        showNotStarted,
        showWeakChapters,
        sortAscending,
      ),
    })
  },

  setSelectedUnits: (units) => {
    set({ selectedUnits: units })
    const { activeSubject, selectedClasses, showNotStarted, showWeakChapters, sortAscending } = get()
    set({
      filteredChapters: filterChapters(
        activeSubject,
        selectedClasses,
        units,
        showNotStarted,
        showWeakChapters,
        sortAscending,
      ),
    })
  },

  toggleNotStarted: () => {
    const showNotStarted = !get().showNotStarted
    set({ showNotStarted })
    const { activeSubject, selectedClasses, selectedUnits, showWeakChapters, sortAscending } = get()
    set({
      filteredChapters: filterChapters(
        activeSubject,
        selectedClasses,
        selectedUnits,
        showNotStarted,
        showWeakChapters,
        sortAscending,
      ),
    })
  },

  toggleWeakChapters: () => {
    const showWeakChapters = !get().showWeakChapters
    set({ showWeakChapters })
    const { activeSubject, selectedClasses, selectedUnits, showNotStarted, sortAscending } = get()
    set({
      filteredChapters: filterChapters(
        activeSubject,
        selectedClasses,
        selectedUnits,
        showNotStarted,
        showWeakChapters,
        sortAscending,
      ),
    })
  },

  toggleSort: () => {
    const sortAscending = !get().sortAscending
    set({ sortAscending })
    const { activeSubject, selectedClasses, selectedUnits, showNotStarted, showWeakChapters } = get()
    set({
      filteredChapters: filterChapters(
        activeSubject,
        selectedClasses,
        selectedUnits,
        showNotStarted,
        showWeakChapters,
        sortAscending,
      ),
    })
  },
}))

// Helper function to filter chapters
function filterChapters(
  subject: "physics" | "chemistry" | "mathematics",
  classes: string[],
  units: string[],
  showNotStarted: boolean,
  showWeakChapters: boolean,
  sortAscending: boolean,
) {
  return chapterData
    .filter((chapter) => chapter.subject.toLowerCase() === subject)
    .filter((chapter) => classes.length === 0 || classes.includes(chapter.class))
    .filter((chapter) => units.length === 0 || units.includes(chapter.unit))
    .filter((chapter) => !showNotStarted || chapter.status === "Not Started")
    .filter((chapter) => !showWeakChapters || chapter.isWeakChapter)
    .sort((a, b) => {
      // Sort by total question count
      const totalA = Object.values(a.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
      const totalB = Object.values(b.yearWiseQuestionCount).reduce((sum, count) => sum + count, 0)
      return sortAscending ? totalA - totalB : totalB - totalA
    })
}
