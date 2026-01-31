"use client"

import React, { createContext, useContext, useState, useEffect, useCallback } from "react"

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  createdAt: Date
}

export interface LearningPreferences {
  platform: string
  skill: string
  level: string
}

export interface OnboardingData {
  skillLevel: string
  goals: string[]
  priorKnowledge: string
  timeAvailability: string
  learningStyle: string
}

export interface ContentItem {
  id: string
  title: string
  thumbnail: string
  creator: string
  platform: string
  skill: string
  level: string
  duration: string
  likes: number
  views: string
  type: "video" | "reel" | "short" | "spotlight"
  liked: boolean
  saved: boolean
  progress: number
  inPlan: boolean
}

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  earnedAt?: Date
  unlocked: boolean
}

export interface LearningSession {
  date: Date
  skill: string
  duration: number
  contentId: string
}

export interface UserStats {
  totalScreenTime: number
  currentStreak: number
  longestStreak: number
  skillsLearning: number
  completedContent: number
  savedContent: number
  timePerSkill: Record<string, number>
  progressPerSkill: Record<string, number>
  learningHistory: LearningSession[]
  achievements: Achievement[]
}

interface AppContextType {
  user: User | null
  setUser: (user: User | null) => void
  isAuthenticated: boolean
  preferences: LearningPreferences | null
  setPreferences: (prefs: LearningPreferences) => void
  onboardingData: OnboardingData | null
  setOnboardingData: (data: OnboardingData) => void
  onboardingComplete: boolean
  setOnboardingComplete: (complete: boolean) => void
  content: ContentItem[]
  setContent: React.Dispatch<React.SetStateAction<ContentItem[]>>
  toggleLike: (id: string) => void
  toggleSave: (id: string) => void
  togglePlan: (id: string) => void
  updateProgress: (id: string, progress: number) => void
  stats: UserStats
  updateStats: (updates: Partial<UserStats>) => void
  addLearningSession: (session: Omit<LearningSession, "date">) => void
  logout: () => void
}

const defaultAchievements: Achievement[] = [
  { id: "1", title: "First Steps", description: "Complete your first lesson", icon: "trophy", unlocked: false },
  { id: "2", title: "Week Warrior", description: "Maintain a 7-day streak", icon: "flame", unlocked: false },
  { id: "3", title: "Bookworm", description: "Save 10 pieces of content", icon: "bookmark", unlocked: false },
  { id: "4", title: "Social Learner", description: "Like 20 videos", icon: "heart", unlocked: false },
  { id: "5", title: "Dedicated", description: "Spend 10 hours learning", icon: "clock", unlocked: false },
  { id: "6", title: "Multi-skilled", description: "Learn 3 different skills", icon: "star", unlocked: false },
]

const defaultStats: UserStats = {
  totalScreenTime: 0,
  currentStreak: 0,
  longestStreak: 0,
  skillsLearning: 0,
  completedContent: 0,
  savedContent: 0,
  timePerSkill: {},
  progressPerSkill: {},
  learningHistory: [],
  achievements: defaultAchievements,
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<User | null>(null)
  const [preferences, setPreferencesState] = useState<LearningPreferences | null>(null)
  const [onboardingData, setOnboardingDataState] = useState<OnboardingData | null>(null)
  const [onboardingComplete, setOnboardingCompleteState] = useState(false)
  const [content, setContent] = useState<ContentItem[]>([])
  const [stats, setStats] = useState<UserStats>(defaultStats)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedUser = localStorage.getItem("loopr_user")
    const savedPrefs = localStorage.getItem("loopr_preferences")
    const savedOnboarding = localStorage.getItem("loopr_onboarding")
    const savedOnboardingComplete = localStorage.getItem("loopr_onboarding_complete")
    const savedContent = localStorage.getItem("loopr_content")
    const savedStats = localStorage.getItem("loopr_stats")

    if (savedUser) setUserState(JSON.parse(savedUser))
    if (savedPrefs) setPreferencesState(JSON.parse(savedPrefs))
    if (savedOnboarding) setOnboardingDataState(JSON.parse(savedOnboarding))
    if (savedOnboardingComplete) setOnboardingCompleteState(JSON.parse(savedOnboardingComplete))
    if (savedContent) setContent(JSON.parse(savedContent))
    if (savedStats) setStats(JSON.parse(savedStats))
  }, [])

  const setUser = useCallback((newUser: User | null) => {
    setUserState(newUser)
    if (newUser) {
      localStorage.setItem("loopr_user", JSON.stringify(newUser))
    } else {
      localStorage.removeItem("loopr_user")
    }
  }, [])

  const setPreferences = useCallback((prefs: LearningPreferences) => {
    setPreferencesState(prefs)
    localStorage.setItem("loopr_preferences", JSON.stringify(prefs))
  }, [])

  const setOnboardingData = useCallback((data: OnboardingData) => {
    setOnboardingDataState(data)
    localStorage.setItem("loopr_onboarding", JSON.stringify(data))
  }, [])

  const setOnboardingComplete = useCallback((complete: boolean) => {
    setOnboardingCompleteState(complete)
    localStorage.setItem("loopr_onboarding_complete", JSON.stringify(complete))
  }, [])

  const toggleLike = useCallback((id: string) => {
    setContent((prev) => {
      const updated = prev.map((item) =>
        item.id === id
          ? { ...item, liked: !item.liked, likes: item.liked ? item.likes - 1 : item.likes + 1 }
          : item
      )
      localStorage.setItem("loopr_content", JSON.stringify(updated))
      return updated
    })
  }, [])

  const toggleSave = useCallback((id: string) => {
    setContent((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, saved: !item.saved } : item
      )
      localStorage.setItem("loopr_content", JSON.stringify(updated))
      return updated
    })
  }, [])

  const togglePlan = useCallback((id: string) => {
    setContent((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, inPlan: !item.inPlan } : item
      )
      localStorage.setItem("loopr_content", JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateProgress = useCallback((id: string, progress: number) => {
    setContent((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, progress: Math.min(100, progress) } : item
      )
      localStorage.setItem("loopr_content", JSON.stringify(updated))
      return updated
    })
  }, [])

  const updateStats = useCallback((updates: Partial<UserStats>) => {
    setStats((prev) => {
      const updated = { ...prev, ...updates }
      localStorage.setItem("loopr_stats", JSON.stringify(updated))
      return updated
    })
  }, [])

  const addLearningSession = useCallback((session: Omit<LearningSession, "date">) => {
    setStats((prev) => {
      const newSession = { ...session, date: new Date() }
      const updated = {
        ...prev,
        totalScreenTime: prev.totalScreenTime + session.duration,
        timePerSkill: {
          ...prev.timePerSkill,
          [session.skill]: (prev.timePerSkill[session.skill] || 0) + session.duration,
        },
        learningHistory: [...prev.learningHistory, newSession],
      }
      localStorage.setItem("loopr_stats", JSON.stringify(updated))
      return updated
    })
  }, [])

  const logout = useCallback(() => {
    setUserState(null)
    setPreferencesState(null)
    setOnboardingDataState(null)
    setOnboardingCompleteState(false)
    setContent([])
    setStats(defaultStats)
    localStorage.removeItem("loopr_user")
    localStorage.removeItem("loopr_preferences")
    localStorage.removeItem("loopr_onboarding")
    localStorage.removeItem("loopr_onboarding_complete")
    localStorage.removeItem("loopr_content")
    localStorage.removeItem("loopr_stats")
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: !!user,
        preferences,
        setPreferences,
        onboardingData,
        setOnboardingData,
        onboardingComplete,
        setOnboardingComplete,
        content,
        setContent,
        toggleLike,
        toggleSave,
        togglePlan,
        updateProgress,
        stats,
        updateStats,
        addLearningSession,
        logout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}
