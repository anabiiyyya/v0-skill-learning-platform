"use client"

import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { useApp } from "@/lib/app-context"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, Moon, Sun, User, Settings, LogOut, LayoutDashboard, Bookmark, ListChecks, LayoutGrid, Bell } from "lucide-react"

interface FeedHeaderProps {
  onMenuClick: () => void
  filter: "all" | "saved" | "plan"
  onFilterChange: (filter: "all" | "saved" | "plan") => void
}

export function FeedHeader({ onMenuClick, filter, onFilterChange }: FeedHeaderProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const { user, logout } = useApp()

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMenuClick}
          >
            <Menu className="w-5 h-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-sm font-bold text-primary-foreground">L</span>
            </div>
            <span className="text-xl font-bold hidden sm:inline">Loopr</span>
          </div>
        </div>

        {/* Center section - Filter tabs */}
        <div className="hidden md:flex">
          <Tabs value={filter} onValueChange={(v) => onFilterChange(v as "all" | "saved" | "plan")}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all" className="gap-2">
                <LayoutGrid className="w-4 h-4" />
                <span className="hidden lg:inline">All Content</span>
              </TabsTrigger>
              <TabsTrigger value="saved" className="gap-2">
                <Bookmark className="w-4 h-4" />
                <span className="hidden lg:inline">Saved</span>
              </TabsTrigger>
              <TabsTrigger value="plan" className="gap-2">
                <ListChecks className="w-4 h-4" />
                <span className="hidden lg:inline">Learning Plan</span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Mobile filter */}
        <div className="md:hidden flex-1 flex justify-center">
          <Tabs value={filter} onValueChange={(v) => onFilterChange(v as "all" | "saved" | "plan")}>
            <TabsList className="bg-muted/50">
              <TabsTrigger value="all">
                <LayoutGrid className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="saved">
                <Bookmark className="w-4 h-4" />
              </TabsTrigger>
              <TabsTrigger value="plan">
                <ListChecks className="w-4 h-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
            <span className="sr-only">Notifications</span>
          </Button>

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
              <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                <LayoutDashboard className="w-4 h-4 mr-2" />
                Dashboard
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
  )
}
