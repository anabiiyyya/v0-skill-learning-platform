"use client"

import { Play, Sparkles, TrendingUp, Users } from "lucide-react"

export function AuthHero() {
  return (
    <div className="hidden lg:flex lg:w-1/2 xl:w-3/5 relative bg-gradient-to-br from-primary via-primary/90 to-accent overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-white/20 rounded-2xl backdrop-blur-sm animate-float flex items-center justify-center">
        <Play className="w-8 h-8 text-white" />
      </div>
      <div className="absolute top-40 right-32 w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm animate-float flex items-center justify-center" style={{ animationDelay: "0.5s" }}>
        <Sparkles className="w-7 h-7 text-white" />
      </div>
      <div className="absolute bottom-40 left-32 w-12 h-12 bg-white/20 rounded-xl backdrop-blur-sm animate-float flex items-center justify-center" style={{ animationDelay: "1s" }}>
        <TrendingUp className="w-6 h-6 text-white" />
      </div>
      <div className="absolute bottom-24 right-20 w-14 h-14 bg-white/20 rounded-2xl backdrop-blur-sm animate-float flex items-center justify-center" style={{ animationDelay: "1.5s" }}>
        <Users className="w-7 h-7 text-white" />
      </div>

      {/* Glow effects */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: "1s" }} />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">L</span>
            </div>
            <span className="text-3xl font-bold text-white">Loopr</span>
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight text-balance">
            Learn Skills Through
            <br />
            <span className="text-white/90">Social Content</span>
          </h1>
        </div>

        <p className="text-lg xl:text-xl text-white/80 mb-10 max-w-lg leading-relaxed">
          Transform your scroll time into skill time. Curated learning content from YouTube, Instagram, TikTok, and LinkedIn tailored to your goals.
        </p>

        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white/90">AI-powered personalized learning paths</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white/90">Track progress across multiple skills</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-white/90">Earn achievements and maintain streaks</span>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-6">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="w-10 h-10 rounded-full bg-white/30 border-2 border-white/50 flex items-center justify-center text-white text-sm font-medium"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div>
            <p className="text-white font-semibold">Join 10,000+ learners</p>
            <p className="text-white/70 text-sm">Already improving their skills</p>
          </div>
        </div>
      </div>
    </div>
  )
}
