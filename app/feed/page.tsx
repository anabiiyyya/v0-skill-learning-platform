"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/app-context"
import { generateMockContent, platforms, skills, levels } from "@/lib/mock-data"
import { FeedHeader } from "@/components/feed/feed-header"
import { FeedSidebar } from "@/components/feed/feed-sidebar"
import { ContentCard } from "@/components/feed/content-card"
import { ContentModal } from "@/components/feed/content-modal"
import type { ContentItem } from "@/lib/app-context"

export default function FeedPage() {
  const router = useRouter()
  const { isAuthenticated, preferences, onboardingComplete, content, setContent } = useApp()
  const [mounted, setMounted] = useState(false)
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [filter, setFilter] = useState<"all" | "saved" | "plan">("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/")
    } else if (mounted && !preferences) {
      router.push("/select")
    } else if (mounted && !onboardingComplete) {
      router.push("/onboarding")
    }
  }, [mounted, isAuthenticated, preferences, onboardingComplete, router])

  useEffect(() => {
    if (mounted && preferences && content.length === 0) {
      const mockContent = generateMockContent(
        preferences.platform,
        preferences.skill,
        preferences.level
      )
      setContent(mockContent)
    }
  }, [mounted, preferences, content.length, setContent])

  if (!mounted || !isAuthenticated || !preferences || !onboardingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const filteredContent = content.filter((item) => {
    if (filter === "saved") return item.saved
    if (filter === "plan") return item.inPlan
    return true
  })

  const platformLabel = platforms.find((p) => p.value === preferences.platform)?.label
  const skillLabel = skills.find((s) => s.value === preferences.skill)?.label
  const levelLabel = levels.find((l) => l.value === preferences.level)?.label

  return (
    <div className="min-h-screen bg-background">
      <FeedHeader
        onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        filter={filter}
        onFilterChange={setFilter}
      />
      
      <div className="flex">
        <FeedSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          platform={platformLabel || ""}
          skill={skillLabel || ""}
          level={levelLabel || ""}
        />

        <main className="flex-1 p-4 lg:p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto">
            {/* Feed header info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-1">Your Learning Feed</h1>
              <p className="text-muted-foreground">
                {platformLabel} content for {skillLabel} ({levelLabel} level)
              </p>
            </div>

            {/* Content grid */}
            {filteredContent.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredContent.map((item) => (
                  <ContentCard
                    key={item.id}
                    content={item}
                    onClick={() => setSelectedContent(item)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">No content found</h2>
                <p className="text-muted-foreground">
                  {filter === "saved"
                    ? "You haven't saved any content yet."
                    : filter === "plan"
                    ? "You haven't added anything to your learning plan."
                    : "No content available for your selection."}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Content modal */}
      {selectedContent && (
        <ContentModal
          content={selectedContent}
          onClose={() => setSelectedContent(null)}
        />
      )}
    </div>
  )
}
