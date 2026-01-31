"use client"

import React from "react"

import Image from "next/image"
import { useApp, type ContentItem } from "@/lib/app-context"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Heart, Bookmark, ListPlus, Play, Clock, Eye, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface ContentCardProps {
  content: ContentItem
  onClick: () => void
}

export function ContentCard({ content, onClick }: ContentCardProps) {
  const { toggleLike, toggleSave, togglePlan } = useApp()

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleLike(content.id)
    toast.success(content.liked ? "Removed from likes" : "Added to likes")
  }

  const handleSave = (e: React.MouseEvent) => {
    e.stopPropagation()
    toggleSave(content.id)
    toast.success(content.saved ? "Removed from saved" : "Saved for later")
  }

  const handlePlan = (e: React.MouseEvent) => {
    e.stopPropagation()
    togglePlan(content.id)
    toast.success(content.inPlan ? "Removed from learning plan" : "Added to learning plan")
  }

  const typeLabel = {
    video: "Video",
    reel: "Reel",
    short: "Short",
    spotlight: "Spotlight",
  }

  return (
    <Card
      className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 bg-card"
      onClick={onClick}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={content.thumbnail || "/placeholder.svg"}
          alt={content.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="w-6 h-6 text-primary fill-primary ml-1" />
          </div>
        </div>

        {/* Duration badge */}
        <Badge
          variant="secondary"
          className="absolute bottom-2 right-2 bg-black/70 text-white border-0"
        >
          <Clock className="w-3 h-3 mr-1" />
          {content.duration}
        </Badge>

        {/* Type badge */}
        <Badge
          className="absolute top-2 left-2"
          variant={content.type === "video" ? "default" : "secondary"}
        >
          {typeLabel[content.type]}
        </Badge>

        {/* Progress indicator */}
        {content.progress > 0 && (
          <div className="absolute bottom-0 left-0 right-0">
            <Progress value={content.progress} className="h-1 rounded-none" />
          </div>
        )}

        {/* Completed badge */}
        {content.progress === 100 && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-chart-4 flex items-center justify-center">
            <Check className="w-4 h-4 text-white" />
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-sm line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {content.title}
        </h3>

        {/* Creator */}
        <p className="text-xs text-muted-foreground mb-3">{content.creator}</p>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
          <span className="flex items-center gap-1">
            <Eye className="w-3 h-3" />
            {content.views}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3 h-3" />
            {content.likes.toLocaleString()}
          </span>
        </div>

        {/* Level badge */}
        <Badge variant="outline" className="mb-3 capitalize">
          {content.level}
        </Badge>

        {/* Actions */}
        <div className="flex items-center gap-1 pt-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1",
              content.liked && "text-accent"
            )}
            onClick={handleLike}
          >
            <Heart className={cn("w-4 h-4", content.liked && "fill-current")} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1",
              content.saved && "text-primary"
            )}
            onClick={handleSave}
          >
            <Bookmark className={cn("w-4 h-4", content.saved && "fill-current")} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "flex-1",
              content.inPlan && "text-chart-4"
            )}
            onClick={handlePlan}
          >
            <ListPlus className={cn("w-4 h-4", content.inPlan && "fill-current")} />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
