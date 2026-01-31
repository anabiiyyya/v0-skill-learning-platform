"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useApp } from "@/lib/app-context"
import { platforms, skills, levels } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  ChevronLeft,
  Moon,
  Sun,
  Flame,
  Trophy,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  Bookmark,
  Heart,
  Calendar,
  Award,
  LogOut,
  Settings,
  Home,
  BarChart3,
  User,
  Star,
  Zap,
  CheckCircle,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"
import { toast } from "sonner"

export default function DashboardPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, isAuthenticated, preferences, stats, content, logout } = useApp()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/")
    }
  }, [mounted, isAuthenticated, router])

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const platformLabel = platforms.find((p) => p.value === preferences?.platform)?.label
  const skillLabel = skills.find((s) => s.value === preferences?.skill)?.label
  const levelLabel = levels.find((l) => l.value === preferences?.level)?.label

  const savedCount = content.filter((c) => c.saved).length
  const likedCount = content.filter((c) => c.liked).length
  const completedCount = content.filter((c) => c.progress === 100).length
  const inProgressCount = content.filter((c) => c.progress > 0 && c.progress < 100).length
  const totalProgress = content.length > 0
    ? Math.round(content.reduce((acc, c) => acc + c.progress, 0) / content.length)
    : 0

  // Mock weekly activity data
  const weeklyData = [
    { day: "Mon", minutes: 45 },
    { day: "Tue", minutes: 30 },
    { day: "Wed", minutes: 60 },
    { day: "Thu", minutes: 25 },
    { day: "Fri", minutes: 50 },
    { day: "Sat", minutes: 90 },
    { day: "Sun", minutes: 40 },
  ]

  // Mock skill distribution data
  const skillDistribution = [
    { name: skillLabel || "Current Skill", value: 60, color: "hsl(var(--chart-1))" },
    { name: "Related Skills", value: 25, color: "hsl(var(--chart-2))" },
    { name: "Other", value: 15, color: "hsl(var(--chart-3))" },
  ]

  // Mock progress over time
  const progressData = [
    { week: "W1", progress: 10 },
    { week: "W2", progress: 25 },
    { week: "W3", progress: 35 },
    { week: "W4", progress: totalProgress },
  ]

  const handleLogout = () => {
    logout()
    toast.success("Logged out successfully")
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between h-16 px-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => router.push("/feed")}>
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back to Feed
            </Button>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">L</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline">Loopr Dashboard</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="rounded-full"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/feed")}>
                  <Home className="w-4 h-4 mr-2" />
                  Feed
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/select")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Change Preferences
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 lg:p-6 space-y-6">
        {/* Welcome section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold mb-1">Welcome back, {user?.name}!</h1>
            <p className="text-muted-foreground">
              Here{"'"}s your learning progress overview for {skillLabel} on {platformLabel}.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="py-2 px-4">
              <Target className="w-4 h-4 mr-2" />
              {levelLabel} Level
            </Badge>
            <Badge className="py-2 px-4 bg-accent">
              <Flame className="w-4 h-4 mr-2" />
              {stats.currentStreak} Day Streak
            </Badge>
          </div>
        </div>

        {/* Stats cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{Math.floor(stats.totalScreenTime / 60)}h {stats.totalScreenTime % 60}m</p>
                  <p className="text-xs text-muted-foreground">Total Screen Time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-chart-4/20 flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-chart-4" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedCount}</p>
                  <p className="text-xs text-muted-foreground">Completed Lessons</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{likedCount}</p>
                  <p className="text-xs text-muted-foreground">Liked Content</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-chart-3/20 flex items-center justify-center">
                  <Bookmark className="w-5 h-5 text-chart-3" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{savedCount}</p>
                  <p className="text-xs text-muted-foreground">Saved for Later</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="achievements" className="gap-2">
              <Trophy className="w-4 h-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Calendar className="w-4 h-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Progress chart */}
              <Card className="lg:col-span-2 border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Weekly Activity
                  </CardTitle>
                  <CardDescription>Minutes spent learning each day</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="day" className="text-xs" />
                        <YAxis className="text-xs" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="minutes"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary) / 0.2)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Skill distribution */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Skill Focus
                  </CardTitle>
                  <CardDescription>Time distribution by skill</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={skillDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={70}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {skillDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-4">
                    {skillDistribution.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: item.color }}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="font-medium">{item.value}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Progress over time */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Learning Progress
                </CardTitle>
                <CardDescription>Your progress over the past 4 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={progressData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="week" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar
                        dataKey="progress"
                        fill="hsl(var(--primary))"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Overall Course Progress</span>
                    <span className="text-primary font-bold">{totalProgress}%</span>
                  </div>
                  <Progress value={totalProgress} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-2">
                    {completedCount} completed, {inProgressCount} in progress, {content.length - completedCount - inProgressCount} not started
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.achievements.map((achievement) => (
                <Card
                  key={achievement.id}
                  className={`border-0 shadow-md transition-all ${
                    achievement.unlocked ? "bg-card" : "bg-muted/30 opacity-60"
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                          achievement.unlocked
                            ? "bg-primary/10"
                            : "bg-muted"
                        }`}
                      >
                        {achievement.icon === "trophy" && (
                          <Trophy className={`w-7 h-7 ${achievement.unlocked ? "text-primary" : "text-muted-foreground"}`} />
                        )}
                        {achievement.icon === "flame" && (
                          <Flame className={`w-7 h-7 ${achievement.unlocked ? "text-accent" : "text-muted-foreground"}`} />
                        )}
                        {achievement.icon === "bookmark" && (
                          <Bookmark className={`w-7 h-7 ${achievement.unlocked ? "text-chart-3" : "text-muted-foreground"}`} />
                        )}
                        {achievement.icon === "heart" && (
                          <Heart className={`w-7 h-7 ${achievement.unlocked ? "text-accent" : "text-muted-foreground"}`} />
                        )}
                        {achievement.icon === "clock" && (
                          <Clock className={`w-7 h-7 ${achievement.unlocked ? "text-chart-1" : "text-muted-foreground"}`} />
                        )}
                        {achievement.icon === "star" && (
                          <Star className={`w-7 h-7 ${achievement.unlocked ? "text-chart-4" : "text-muted-foreground"}`} />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{achievement.title}</h3>
                          {achievement.unlocked && (
                            <Badge variant="outline" className="text-xs">
                              <Zap className="w-3 h-3 mr-1" />
                              Earned
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.unlocked && achievement.earnedAt && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border-0 shadow-md bg-gradient-to-r from-primary/10 to-accent/10">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">Keep Going!</h3>
                    <p className="text-muted-foreground">
                      You{"'"}ve unlocked {stats.achievements.filter((a) => a.unlocked).length} of{" "}
                      {stats.achievements.length} achievements. Complete more lessons to unlock the rest!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Learning History
                </CardTitle>
                <CardDescription>Your recent learning sessions</CardDescription>
              </CardHeader>
              <CardContent>
                {stats.learningHistory.length > 0 ? (
                  <ScrollArea className="h-96">
                    <div className="space-y-4">
                      {stats.learningHistory
                        .slice()
                        .reverse()
                        .map((session, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50"
                          >
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                              <BookOpen className="w-5 h-5 text-primary" />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium">{session.skill} Session</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(session.date).toLocaleDateString()} at{" "}
                                {new Date(session.date).toLocaleTimeString()}
                              </p>
                            </div>
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {session.duration} min
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No history yet</h3>
                    <p className="text-muted-foreground mb-4">
                      Start watching content to build your learning history.
                    </p>
                    <Button onClick={() => router.push("/feed")}>
                      Go to Feed
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Streak calendar placeholder */}
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-accent" />
                  Streak Calendar
                </CardTitle>
                <CardDescription>Your daily learning streak</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-2">
                  {Array.from({ length: 28 }).map((_, index) => {
                    const isActive = Math.random() > 0.4
                    const isToday = index === 27
                    return (
                      <div
                        key={index}
                        className={`aspect-square rounded-md flex items-center justify-center text-xs ${
                          isToday
                            ? "bg-primary text-primary-foreground font-bold"
                            : isActive
                            ? "bg-primary/20 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                    )
                  })}
                </div>
                <div className="flex items-center justify-center gap-4 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary/20" />
                    <span className="text-muted-foreground">Active</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-muted" />
                    <span className="text-muted-foreground">Inactive</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded bg-primary" />
                    <span className="text-muted-foreground">Today</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
