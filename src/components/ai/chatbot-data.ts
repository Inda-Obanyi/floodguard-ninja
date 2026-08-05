import type { LucideIcon } from "lucide-react";

export type Message = {
  role: "bot" | "user";
  content: string;
  isWarning?: boolean;
};

export type QuickQuestion = {
  question: string;
  icon: LucideIcon | string; // Allow string for now, will be mapped to component
};

export const SUGGESTED_QUESTIONS: QuickQuestion[] = [
  {
    question: "Flood risk in my area",
    icon: "MapPin",
  },
  {
    question: "What to do in a flood?",
    icon: "LifeBuoy",
  },
  {
    question: "High risk states?",
    icon: "CloudRain",
  },
  {
    question: "Emergency contacts",
    icon: "Info",
  },
];

export const INITIAL_CONVERSATION: Message[] = [
  {
    role: "user",
    content: "Will there be flooding in Kogi this week?",
  },
  {
    role: "bot",
    content: "High risk (78% probability). Heavy rainfall expected. Prepare evacuation plan now.",
    isWarning: true,
  },
];
