import type { ContentItem } from "./app-context"

export const platforms = [
  { value: "youtube", label: "YouTube" },
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "twitter", label: "Twitter/X" },
]

export const skills = [
  { value: "coding", label: "Coding" },
  { value: "design", label: "Design" },
  { value: "editing", label: "Video Editing" },
  { value: "marketing", label: "Marketing" },
  { value: "ai-tools", label: "AI Tools" },
  { value: "photography", label: "Photography" },
  { value: "writing", label: "Content Writing" },
  { value: "business", label: "Business" },
]

export const levels = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
]

export const contentTypes = {
  youtube: "video",
  instagram: "reel",
  tiktok: "short",
  linkedin: "spotlight",
  twitter: "short",
} as const

export function generateMockContent(
  platform: string,
  skill: string,
  level: string
): ContentItem[] {
  const contentType = contentTypes[platform as keyof typeof contentTypes] || "video"
  const skillLabel = skills.find((s) => s.value === skill)?.label || skill
  const platformLabel = platforms.find((p) => p.value === platform)?.label || platform

  const creators = [
    "TechMaster Pro",
    "Creative Studios",
    "Learn With Sam",
    "Digital Academy",
    "Skill Builder",
    "Pro Tutorials",
    "Growth Hacker",
    "Design Lab",
  ]

  const thumbnails = [
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1522542550221-31fd8575f3e5?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=225&fit=crop",
    "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&h=225&fit=crop",
  ]

  const titles = {
    coding: [
      `${level === "beginner" ? "Introduction to" : level === "intermediate" ? "Mastering" : "Advanced"} JavaScript Fundamentals`,
      `Building Modern Web Apps with React`,
      `Python for ${level === "beginner" ? "Beginners" : level === "intermediate" ? "Data Science" : "Machine Learning"}`,
      `Full Stack Development Guide`,
      `CSS Tricks and Tips`,
      `API Design Best Practices`,
      `Git & GitHub Workflow`,
      `TypeScript Deep Dive`,
      `Node.js Backend Development`,
      `Database Design Patterns`,
      `Testing Your Code`,
      `Clean Code Principles`,
    ],
    design: [
      `UI/UX Design ${level === "beginner" ? "Basics" : level === "intermediate" ? "Principles" : "Masterclass"}`,
      `Figma Tutorial for ${level}s`,
      `Color Theory in Design`,
      `Typography Fundamentals`,
      `Creating Design Systems`,
      `Mobile App Design`,
      `Logo Design Process`,
      `Web Design Trends 2025`,
      `Responsive Design Guide`,
      `Prototyping Techniques`,
      `Design Psychology`,
      `Visual Hierarchy`,
    ],
    editing: [
      `Video Editing ${level === "beginner" ? "101" : level === "intermediate" ? "Techniques" : "Pro Tips"}`,
      `Adobe Premiere Pro Tutorial`,
      `DaVinci Resolve Guide`,
      `Color Grading Secrets`,
      `Sound Design Basics`,
      `Motion Graphics`,
      `Cinematic Transitions`,
      `YouTube Video Editing`,
      `Short-form Content Editing`,
      `VFX for Beginners`,
      `Audio Mixing Tips`,
      `Storytelling Through Editing`,
    ],
    marketing: [
      `Digital Marketing ${level === "beginner" ? "Fundamentals" : level === "intermediate" ? "Strategies" : "Advanced Tactics"}`,
      `Social Media Marketing`,
      `Content Marketing Guide`,
      `SEO Optimization`,
      `Email Marketing Mastery`,
      `Growth Hacking Techniques`,
      `Brand Building`,
      `Analytics & Metrics`,
      `Influencer Marketing`,
      `PPC Advertising`,
      `Marketing Psychology`,
      `Conversion Optimization`,
    ],
    "ai-tools": [
      `AI Tools ${level === "beginner" ? "Overview" : level === "intermediate" ? "Workflows" : "Expert Techniques"}`,
      `ChatGPT Prompting Guide`,
      `Midjourney Masterclass`,
      `AI for Productivity`,
      `Automating with AI`,
      `AI Content Creation`,
      `Machine Learning Basics`,
      `AI in Business`,
      `Copilot for Developers`,
      `AI Image Generation`,
      `Voice AI Tools`,
      `AI Ethics & Best Practices`,
    ],
    photography: [
      `Photography ${level === "beginner" ? "Basics" : level === "intermediate" ? "Techniques" : "Professional Tips"}`,
      `Camera Settings Guide`,
      `Lighting Fundamentals`,
      `Portrait Photography`,
      `Landscape Shots`,
      `Product Photography`,
      `Photo Editing in Lightroom`,
      `Composition Rules`,
      `Street Photography`,
      `Night Photography`,
      `Mobile Photography`,
      `Building Your Portfolio`,
    ],
    writing: [
      `Content Writing ${level === "beginner" ? "101" : level === "intermediate" ? "Skills" : "Advanced"}`,
      `Copywriting Fundamentals`,
      `SEO Writing Guide`,
      `Storytelling Techniques`,
      `Blog Writing Tips`,
      `Technical Writing`,
      `Social Media Captions`,
      `Email Writing`,
      `Script Writing`,
      `Headline Crafting`,
      `Editing Your Work`,
      `Finding Your Voice`,
    ],
    business: [
      `Business ${level === "beginner" ? "Fundamentals" : level === "intermediate" ? "Strategies" : "Growth Tactics"}`,
      `Entrepreneurship Guide`,
      `Startup Essentials`,
      `Financial Planning`,
      `Leadership Skills`,
      `Negotiation Tactics`,
      `Project Management`,
      `Business Analytics`,
      `Sales Techniques`,
      `Team Building`,
      `Strategic Planning`,
      `Scaling Your Business`,
    ],
  }

  const durations = contentType === "short" || contentType === "reel" 
    ? ["0:30", "0:45", "1:00", "1:15", "1:30"]
    : ["5:30", "8:45", "12:20", "15:00", "18:30", "22:15", "25:00", "30:45"]

  const skillTitles = titles[skill as keyof typeof titles] || titles.coding

  return skillTitles.map((title, index) => ({
    id: `${platform}-${skill}-${level}-${index}`,
    title: `${title} | ${platformLabel}`,
    thumbnail: thumbnails[index % thumbnails.length],
    creator: creators[index % creators.length],
    platform: platformLabel,
    skill: skillLabel,
    level,
    duration: durations[index % durations.length],
    likes: Math.floor(Math.random() * 50000) + 1000,
    views: `${(Math.random() * 900 + 100).toFixed(0)}K`,
    type: contentType as ContentItem["type"],
    liked: false,
    saved: false,
    progress: 0,
    inPlan: false,
  }))
}

export const chatbotQuestions = [
  {
    id: "skillLevel",
    question: "What's your current skill level in this area?",
    options: [
      "Complete beginner - I'm just starting out",
      "Some basics - I know the fundamentals",
      "Intermediate - I can work independently",
      "Advanced - Looking to master specific topics",
    ],
  },
  {
    id: "goals",
    question: "What are your main learning goals? (Select all that apply)",
    options: [
      "Career advancement or job change",
      "Personal projects or hobbies",
      "Freelance or side income",
      "General knowledge and curiosity",
      "Academic or certification purposes",
    ],
    multiSelect: true,
  },
  {
    id: "priorKnowledge",
    question: "What related skills or knowledge do you already have?",
    options: [
      "None - This is completely new to me",
      "Related field experience",
      "Self-taught basics",
      "Formal education in similar area",
      "Professional experience",
    ],
  },
  {
    id: "timeAvailability",
    question: "How much time can you dedicate to learning each week?",
    options: [
      "Less than 2 hours",
      "2-5 hours",
      "5-10 hours",
      "10-20 hours",
      "More than 20 hours",
    ],
  },
  {
    id: "learningStyle",
    question: "How do you learn best?",
    options: [
      "Watching videos and tutorials",
      "Hands-on practice and projects",
      "Reading and documentation",
      "Interactive exercises",
      "Mix of everything",
    ],
  },
]
