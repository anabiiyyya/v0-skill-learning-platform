"use client"

import { useRouter } from "next/navigation"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { X, Home, LayoutDashboard, Bookmark, ListChecks, Trophy, Flame, Clock, Target, Settings } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeedSidebarProps {
  open: boolean
  onClose: () => void
  platform: string
  skill: string
  level: string
}

export function FeedSidebar({ open, onClose, platform, skill, level }: FeedSidebarProps) {
  const router = useRouter()
  const { stats, content } = useApp()

  const savedCount = content.filter((c) => c.saved).length
  const planCount = content.filter((c) => c.inPlan).length
  const completedCount = content.filter((c) => c.progress === 100).length
  const totalProgress = content.length > 0
    ? Math.round(content.reduce((acc, c) => acc + c.progress, 0) / content.length)
    : 0

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-card border-r z-40 transition-transform duration-300",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            {/* Mobile close button */}
            <div className="flex justify-end lg:hidden">
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Current learning */}
            <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
              <h3 className="font-semibold mb-3">Current Learning</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Platform</span>
                  <span className="font-medium">{platform}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skill</span>
                  <span className="font-medium">{skill}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Level</span>
                  <span className="font-medium capitalize">{level}</span>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-3 bg-transparent"
                onClick={() => router.push("/select")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Change
              </Button>
            </div>

            {/* Quick stats */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Quick Stats</h3>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Flame className="w-4 h-4 text-accent" />
                    <span className="text-xs text-muted-foreground">Streak</span>
                  </div>
                  <p className="text-xl font-bold">{stats.currentStreak}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-chart-4" />
                    <span className="text-xs text-muted-foreground">Completed</span>
                  </div>
                  <p className="text-xl font-bold">{completedCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <Bookmark className="w-4 h-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Saved</span>
                  </div>
                  <p className="text-xl font-bold">{savedCount}</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-1">
                    <ListChecks className="w-4 h-4 text-chart-3" />
                    <span className="text-xs text-muted-foreground">In Plan</span>
                  </div>
                  <p className="text-xl font-bold">{planCount}</p>
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-3">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">Overall Progress</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Completion</span>
                  <span className="font-medium">{totalProgress}%</span>
                </div>
                <Progress value={totalProgress} className="h-2" />
              </div>
            </div>

            {/* Navigation */}
            <div className="space-y-1">
              <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">Navigation</h3>
              
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/feed")}
              >
                <Home className="w-4 h-4 mr-3" />
                Feed
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => router.push("/dashboard")}
              >
                <LayoutDashboard className="w-4 h-4 mr-3" />
                Dashboard
              </Button>
            </div>

            {/* Goals reminder */}
            <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-accent" />
                <h3 className="font-semibold text-sm">Daily Goal</h3>
              </div>
              <p className="text-xs text-muted-foreground mb-2">
                Complete 2 more lessons to maintain your streak!
              </p>
              <div className="flex items-center gap-2">
                <Clock className="w-3 h-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {Math.floor(stats.totalScreenTime / 60)}h {stats.totalScreenTime % 60}m invested
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>
      </aside>
    </>
  )
}
