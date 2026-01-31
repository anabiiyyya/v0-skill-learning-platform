"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useApp } from "@/lib/app-context"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthHero } from "@/components/auth/auth-hero"

export default function AuthPage() {
  const router = useRouter()
  const { isAuthenticated, preferences, onboardingComplete } = useApp()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted && isAuthenticated) {
      if (!preferences) {
        router.push("/select")
      } else if (!onboardingComplete) {
        router.push("/onboarding")
      } else {
        router.push("/feed")
      }
    }
  }, [mounted, isAuthenticated, preferences, onboardingComplete, router])

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <main className="min-h-screen flex">
      <AuthHero />
      <AuthForm />
    </main>
  )
}
