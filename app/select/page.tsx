"use client"

import React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useApp } from "@/lib/app-context"
import { platforms, skills, levels } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Moon, Sun, ArrowRight, Youtube, Instagram, Linkedin, Sparkles, Code, Palette, Film, Megaphone, Bot, Camera, PenTool, Briefcase, ChevronLeft, Rocket } from "lucide-react"
import { toast } from "sonner"

const platformIcons: Record<string, React.ReactNode> = {
  youtube: <Youtube className="w-5 h-5" />,
  instagram: <Instagram className="w-5 h-5" />,
  tiktok: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>,
  linkedin: <Linkedin className="w-5 h-5" />,
  twitter: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
}

const skillIcons: Record<string, React.ReactNode> = {
  coding: <Code className="w-5 h-5" />,
  design: <Palette className="w-5 h-5" />,
  editing: <Film className="w-5 h-5" />,
  marketing: <Megaphone className="w-5 h-5" />,
  "ai-tools": <Bot className="w-5 h-5" />,
  photography: <Camera className="w-5 h-5" />,
  writing: <PenTool className="w-5 h-5" />,
  business: <Briefcase className="w-5 h-5" />,
}

export default function SelectPage() {
  const router = useRouter()
  const { user, isAuthenticated, setPreferences } = useApp()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [platform, setPlatform] = useState("")
  const [skill, setSkill] = useState("")
  const [level, setLevel] = useState("")

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/")
    }
  }, [mounted, isAuthenticated, router])

  const handleContinue = async () => {
    if (!platform || !skill || !level) {
      toast.error("Please select all options")
      return
    }

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))

    setPreferences({ platform, skill, level })
    toast.success("Preferences saved!")
    router.push("/onboarding")
    setIsLoading(false)
  }

  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 p-4 flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push("/")}>
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">L</span>
          </div>
          <span className="text-xl font-bold">Loopr</span>
        </div>
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
      </header>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            <span>Welcome, {user?.name}!</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3 text-balance">
            Customize Your Learning Experience
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Choose your preferred platform, skill, and level to get personalized content recommendations.
          </p>
        </div>

        <Card className="w-full max-w-4xl border-0 shadow-2xl bg-card/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-xl">Select Your Preferences</CardTitle>
            <CardDescription>All selections can be changed later from your dashboard</CardDescription>
          </CardHeader>
          <CardContent className="p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Platform Selection */}
              <div className="space-y-3">
                <Label htmlFor="platform" className="text-base font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <Youtube className="w-4 h-4" />
                  </div>
                  Platform
                </Label>
                <Select value={platform} onValueChange={setPlatform}>
                  <SelectTrigger id="platform" className="h-14 text-base">
                    <SelectValue placeholder="Choose platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((p) => (
                      <SelectItem key={p.value} value={p.value} className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{platformIcons[p.value]}</span>
                          <span>{p.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">Where do you prefer to learn?</p>
              </div>

              {/* Skill Selection */}
              <div className="space-y-3">
                <Label htmlFor="skill" className="text-base font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  Skill
                </Label>
                <Select value={skill} onValueChange={setSkill}>
                  <SelectTrigger id="skill" className="h-14 text-base">
                    <SelectValue placeholder="Choose skill" />
                  </SelectTrigger>
                  <SelectContent>
                    {skills.map((s) => (
                      <SelectItem key={s.value} value={s.value} className="py-3">
                        <div className="flex items-center gap-3">
                          <span className="text-muted-foreground">{skillIcons[s.value]}</span>
                          <span>{s.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">What do you want to learn?</p>
              </div>

              {/* Level Selection */}
              <div className="space-y-3">
                <Label htmlFor="level" className="text-base font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-chart-4/20 flex items-center justify-center text-chart-4">
                    <Rocket className="w-4 h-4" />
                  </div>
                  Level
                </Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="level" className="h-14 text-base">
                    <SelectValue placeholder="Choose level" />
                  </SelectTrigger>
                  <SelectContent>
                    {levels.map((l) => (
                      <SelectItem key={l.value} value={l.value} className="py-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            l.value === "beginner" ? "bg-chart-4" :
                            l.value === "intermediate" ? "bg-chart-1" :
                            "bg-accent"
                          }`} />
                          <span>{l.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">What{"'"}s your current level?</p>
              </div>
            </div>

            {/* Selected summary */}
            {platform && skill && level && (
              <div className="mt-8 p-4 rounded-xl bg-primary/5 border border-primary/20">
                <p className="text-sm text-center text-muted-foreground">
                  You{"'"}ll learn <span className="font-semibold text-foreground">{skills.find(s => s.value === skill)?.label}</span> at the{" "}
                  <span className="font-semibold text-foreground">{level}</span> level using{" "}
                  <span className="font-semibold text-foreground">{platforms.find(p => p.value === platform)?.label}</span> content.
                </p>
              </div>
            )}

            <div className="mt-8 flex justify-center">
              <Button
                size="lg"
                className="px-12 h-14 text-lg font-semibold"
                onClick={handleContinue}
                disabled={isLoading || !platform || !skill || !level}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Ready to Go <ArrowRight className="w-5 h-5" />
                  </span>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Steps indicator */}
        <div className="mt-8 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">1</div>
            <span className="text-sm font-medium hidden sm:inline">Sign Up</span>
          </div>
          <div className="w-8 h-px bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-medium">2</div>
            <span className="text-sm font-medium hidden sm:inline">Preferences</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">3</div>
            <span className="text-sm text-muted-foreground hidden sm:inline">Onboarding</span>
          </div>
          <div className="w-8 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-medium">4</div>
            <span className="text-sm text-muted-foreground hidden sm:inline">Learn</span>
          </div>
        </div>
      </div>
    </main>
  )
}
