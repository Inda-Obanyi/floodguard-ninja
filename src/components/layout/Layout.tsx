import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "../ai/Chatbot";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col bg-background selection:bg-accent selection:text-white">
      <Header />
      <main className="flex-1 overflow-x-hidden">
        {children}
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}
