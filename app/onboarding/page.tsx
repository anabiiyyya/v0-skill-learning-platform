"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useApp, type OnboardingData } from "@/lib/app-context"
import { chatbotQuestions, skills } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Moon, Sun, Bot, User, ArrowRight, Check, Sparkles, ChevronLeft } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  type: "bot" | "user"
  content: string
  options?: string[]
  multiSelect?: boolean
}

export default function OnboardingPage() {
  const router = useRouter()
  const { user, isAuthenticated, preferences, setOnboardingData, setOnboardingComplete } = useApp()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  const skillLabel = skills.find(s => s.value === preferences?.skill)?.label || "your skill"

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/")
    } else if (mounted && !preferences) {
      router.push("/select")
    }
  }, [mounted, isAuthenticated, preferences, router])

  useEffect(() => {
    if (mounted && preferences && messages.length === 0) {
      // Initial greeting
      setTimeout(() => {
        setMessages([
          {
            id: "greeting",
            type: "bot",
            content: `Hi ${user?.name}! I'm your AI learning assistant. I'll help personalize your ${skillLabel} learning journey. Let me ask you a few quick questions to understand your goals better.`,
          },
        ])
      }, 500)

      // First question
      setTimeout(() => {
        addBotMessage(chatbotQuestions[0])
      }, 2000)
    }
  }, [mounted, preferences, messages.length, user?.name, skillLabel])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const addBotMessage = (question: typeof chatbotQuestions[0]) => {
    setIsTyping(true)
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: question.id,
          type: "bot",
          content: question.question,
          options: question.options,
          multiSelect: question.multiSelect,
        },
      ])
      setIsTyping(false)
    }, 1000)
  }

  const handleOptionSelect = (option: string) => {
    const question = chatbotQuestions[currentQuestion]
    
    if (question.multiSelect) {
      setSelectedOptions((prev) =>
        prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
      )
    } else {
      handleSubmitAnswer(option)
    }
  }

  const handleSubmitAnswer = (answer: string | string[]) => {
    const question = chatbotQuestions[currentQuestion]
    const answerValue = Array.isArray(answer) ? answer : [answer]
    
    // Add user message
    setMessages((prev) => [
      ...prev,
      {
        id: `answer-${question.id}`,
        type: "user",
        content: Array.isArray(answer) ? answer.join(", ") : answer,
      },
    ])

    // Save answer
    setAnswers((prev) => ({
      ...prev,
      [question.id]: question.multiSelect ? answerValue : answerValue[0],
    }))

    setSelectedOptions([])

    // Move to next question or finish
    if (currentQuestion < chatbotQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
      setTimeout(() => {
        addBotMessage(chatbotQuestions[currentQuestion + 1])
      }, 500)
    } else {
      // Finish onboarding
      finishOnboarding({
        ...answers,
        [question.id]: question.multiSelect ? answerValue : answerValue[0],
      })
    }
  }

  const finishOnboarding = async (finalAnswers: Record<string, string | string[]>) => {
    setIsAnalyzing(true)
    
    // Add analyzing message
    setMessages((prev) => [
      ...prev,
      {
        id: "analyzing",
        type: "bot",
        content: "Analyzing your responses and creating your personalized learning path...",
      },
    ])

    await new Promise((resolve) => setTimeout(resolve, 2500))

    const onboardingData: OnboardingData = {
      skillLevel: finalAnswers.skillLevel as string,
      goals: finalAnswers.goals as string[],
      priorKnowledge: finalAnswers.priorKnowledge as string,
      timeAvailability: finalAnswers.timeAvailability as string,
      learningStyle: finalAnswers.learningStyle as string,
    }

    setOnboardingData(onboardingData)
    setOnboardingComplete(true)

    // Add completion message
    setMessages((prev) => [
      ...prev,
      {
        id: "complete",
        type: "bot",
        content: `Perfect! Based on your responses, I've created a personalized learning path for ${skillLabel}. You'll see content tailored to your ${finalAnswers.skillLevel} level, focused on ${Array.isArray(finalAnswers.goals) ? finalAnswers.goals[0] : finalAnswers.goals}. Let's start learning!`,
      },
    ])

    setIsAnalyzing(false)

    setTimeout(() => {
      toast.success("Your learning path is ready!")
      router.push("/feed")
    }, 2000)
  }

  if (!mounted || !isAuthenticated || !preferences) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  const progress = ((currentQuestion + 1) / chatbotQuestions.length) * 100

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b p-4">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push("/select")}>
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
        </div>
      </header>

      {/* Progress bar */}
      <div className="max-w-3xl mx-auto w-full px-4 py-3">
        <div className="flex items-center gap-3">
          <Progress value={progress} className="flex-1 h-2" />
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            {currentQuestion + 1} / {chatbotQuestions.length}
          </span>
        </div>
      </div>

      {/* Chat container */}
      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pb-4">
        <Card className="h-[calc(100vh-200px)] flex flex-col border-0 shadow-xl bg-card/50 backdrop-blur-sm">
          {/* Chat header */}
          <div className="p-4 border-b flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold">Learning Assistant</h2>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-chart-4 animate-pulse" />
                {isTyping ? "Typing..." : isAnalyzing ? "Analyzing..." : "Online"}
              </p>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.type === "user" ? "justify-end" : "justify-start"
                  )}
                >
                  {message.type === "bot" && (
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}
                  <div
                    className={cn(
                      "max-w-[80%] rounded-2xl px-4 py-3",
                      message.type === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    )}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    
                    {/* Options */}
                    {message.type === "bot" && message.options && message.id === chatbotQuestions[currentQuestion]?.id && !isAnalyzing && (
                      <div className="mt-4 space-y-2">
                        {message.options.map((option) => (
                          <button
                            key={option}
                            onClick={() => handleOptionSelect(option)}
                            className={cn(
                              "w-full text-left p-3 rounded-xl border text-sm transition-all",
                              selectedOptions.includes(option)
                                ? "border-primary bg-primary/10 text-foreground"
                                : "border-border bg-background hover:border-primary/50 text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-3">
                              <div className={cn(
                                "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                                selectedOptions.includes(option)
                                  ? "border-primary bg-primary"
                                  : "border-muted-foreground"
                              )}>
                                {selectedOptions.includes(option) && (
                                  <Check className="w-3 h-3 text-primary-foreground" />
                                )}
                              </div>
                              <span>{option}</span>
                            </div>
                          </button>
                        ))}
                        
                        {message.multiSelect && selectedOptions.length > 0 && (
                          <Button
                            className="w-full mt-3"
                            onClick={() => handleSubmitAnswer(selectedOptions)}
                          >
                            Continue <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
                  {message.type === "user" && (
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Analyzing indicator */}
              {isAnalyzing && (
                <div className="flex justify-center py-4">
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-primary/10">
                    <Sparkles className="w-4 h-4 text-primary animate-pulse" />
                    <span className="text-sm text-primary font-medium">Creating your personalized path...</span>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Steps indicator */}
      <div className="py-4 flex justify-center">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-medium hidden sm:inline">Sign Up</span>
          </div>
          <div className="w-6 h-px bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">
              <Check className="w-3 h-3" />
            </div>
            <span className="text-xs font-medium hidden sm:inline">Preferences</span>
          </div>
          <div className="w-6 h-px bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-medium">3</div>
            <span className="text-xs font-medium hidden sm:inline">Onboarding</span>
          </div>
          <div className="w-6 h-px bg-border" />
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-xs font-medium">4</div>
            <span className="text-xs text-muted-foreground hidden sm:inline">Learn</span>
          </div>
        </div>
      </div>
    </main>
  )
}
