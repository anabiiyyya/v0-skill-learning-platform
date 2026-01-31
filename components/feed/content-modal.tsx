"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useApp, type ContentItem } from "@/lib/app-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Heart, Bookmark, ListPlus, Play, Pause, Clock, Eye, User, ExternalLink, Volume2, VolumeX, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ContentModalProps {
  content: ContentItem
  onClose: () => void
}

export function ContentModal({ content, onClose }: ContentModalProps) {
  const { toggleLike, toggleSave, togglePlan, updateProgress, addLearningSession } = useApp()
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(content.progress)
  const [watchTime, setWatchTime] = useState(0)

  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 2, 100)
          return newProgress
        })
        setWatchTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, progress])

  // Save progress on close
  useEffect(() => {
    return () => {
      if (progress > content.progress) {
        updateProgress(content.id, progress)
        if (watchTime > 0) {
          addLearningSession({
            skill: content.skill,
            duration: Math.ceil(watchTime / 60),
            contentId: content.id,
          })
        }
      }
    }
  }, [progress, content.progress, content.id, content.skill, watchTime, updateProgress, addLearningSession])

  const handleLike = () => {
    toggleLike(content.id)
    toast.success(content.liked ? "Removed from likes" : "Added to likes")
  }

  const handleSave = () => {
    toggleSave(content.id)
    toast.success(content.saved ? "Removed from saved" : "Saved for later")
  }

  const handlePlan = () => {
    togglePlan(content.id)
    toast.success(content.inPlan ? "Removed from learning plan" : "Added to learning plan")
  }

  const handleProgressChange = (value: number[]) => {
    setProgress(value[0])
    updateProgress(content.id, value[0])
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="relative">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>

          {/* Video player area */}
          <div className="relative aspect-video bg-black">
            <Image
              src={content.thumbnail || "/placeholder.svg"}
              alt={content.title}
              fill
              className="object-cover"
            />
            
            {/* Play/Pause overlay */}
            <div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {!isPlaying && (
                <div className="w-20 h-20 rounded-full bg-white/90 flex items-center justify-center transition-transform hover:scale-110">
                  <Play className="w-8 h-8 text-primary fill-primary ml-1" />
                </div>
              )}
            </div>

            {/* Video controls */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <div className="space-y-2">
                {/* Progress bar */}
                <Slider
                  value={[progress]}
                  max={100}
                  step={1}
                  className="cursor-pointer"
                  onValueChange={handleProgressChange}
                />
                
                {/* Controls row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsPlaying(!isPlaying)}
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5" />
                      ) : (
                        <Play className="w-5 h-5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={() => setIsMuted(!isMuted)}
                    >
                      {isMuted ? (
                        <VolumeX className="w-5 h-5" />
                      ) : (
                        <Volume2 className="w-5 h-5" />
                      )}
                    </Button>
                    <span className="text-white text-sm">
                      {Math.floor((progress / 100) * parseInt(content.duration))}:{((progress / 100) * parseInt(content.duration) % 1 * 60).toFixed(0).padStart(2, "0")} / {content.duration}
                    </span>
                  </div>
                  <span className="text-white text-sm">{progress}% complete</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content info */}
          <div className="p-6">
            <DialogHeader className="mb-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <DialogTitle className="text-xl mb-2">{content.title}</DialogTitle>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {content.creator}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {content.views} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {content.duration}
                    </span>
                  </div>
                </div>
              </div>
            </DialogHeader>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{content.platform}</Badge>
              <Badge variant="outline">{content.skill}</Badge>
              <Badge variant="secondary" className="capitalize">{content.level}</Badge>
              <Badge variant="outline" className="capitalize">{content.type}</Badge>
            </div>

            {/* Progress section */}
            <div className="p-4 rounded-xl bg-muted/50 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Your Progress</span>
                <span className="text-sm text-muted-foreground">{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
              {progress === 100 && (
                <p className="text-sm text-chart-4 mt-2 flex items-center gap-1">
                  <span className="w-4 h-4 rounded-full bg-chart-4 flex items-center justify-center text-white text-xs">✓</span>
                  Completed! Great work!
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant={content.liked ? "default" : "outline"}
                className={cn(content.liked && "bg-accent hover:bg-accent/90")}
                onClick={handleLike}
              >
                <Heart className={cn("w-4 h-4 mr-2", content.liked && "fill-current")} />
                {content.liked ? "Liked" : "Like"}
                <span className="ml-2 text-xs">({content.likes.toLocaleString()})</span>
              </Button>
              <Button
                variant={content.saved ? "default" : "outline"}
                onClick={handleSave}
              >
                <Bookmark className={cn("w-4 h-4 mr-2", content.saved && "fill-current")} />
                {content.saved ? "Saved" : "Save"}
              </Button>
              <Button
                variant={content.inPlan ? "default" : "outline"}
                className={cn(content.inPlan && "bg-chart-4 hover:bg-chart-4/90")}
                onClick={handlePlan}
              >
                <ListPlus className="w-4 h-4 mr-2" />
                {content.inPlan ? "In Plan" : "Add to Plan"}
              </Button>
              <Button variant="outline" className="ml-auto bg-transparent">
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in {content.platform}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
