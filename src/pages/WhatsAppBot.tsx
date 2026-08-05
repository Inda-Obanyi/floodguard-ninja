import * as React from "react";
import { MessageSquare, Bell, Navigation, Shield, Info, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function WhatsAppBot() {
  const features = [
    { title: "Flood Alerts", icon: Bell, desc: "Receive automated alerts directly in your WhatsApp chats." },
    { title: "Risk Info", icon: Info, desc: "Type your location to get instant risk classification (Safe to Extreme)." },
    { title: "Emergency Help", icon: Shield, desc: "Quick access to emergency protocols and rescue contacts." },
    { title: "Shelter Locations", icon: Navigation, desc: "Find the nearest verified shelters with GPS directions." },
  ];

  return (
    <div className="py-16 md:py-24 bg-[#E5DDD5] min-h-[80vh] relative overflow-hidden">
      {/* WhatsApp Background Pattern Simulation */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none african-pattern"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 bg-[#25D366]/20 border border-[#25D366]/30 rounded-full px-4 py-1.5 mb-6">
                <MessageSquare className="h-4 w-4 text-[#075E54]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#075E54]">Interactive Chat</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold text-[#075E54] mb-6">
                Chat with <br />
                <span className="text-primary">FLOODGUARD 9JA</span>
              </h1>
              <p className="text-lg text-[#075E54]/80 mb-10 leading-relaxed max-w-xl">
                Get real-time assistance, safety tips, and risk updates through the world's most popular messaging app. Our intelligent WhatsApp bot is available in English, Pidgin, Hausa, Yoruba, and Igbo.
              </p>

              <div className="grid sm:grid-cols-2 gap-6 mb-10">
                {features.map((f, i) => (
                  <div key={i} className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                    <div className="bg-[#25D366]/20 p-2 rounded-lg w-fit mb-3">
                      <f.icon className="h-5 w-5 text-[#075E54]" />
                    </div>
                    <h4 className="font-bold text-[#075E54] mb-1">{f.title}</h4>
                    <p className="text-xs text-[#075E54]/70">{f.desc}</p>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-[#25D366] hover:bg-[#128C7E] text-white h-14 px-8 rounded-2xl text-lg shadow-xl shadow-[#25D366]/20 group">
                <a href="https://wa.me/2348053694199" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
                  Chat With FLOODGUARD 9JA on WhatsApp
                  <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                {/* Mock WhatsApp Chat UI */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="w-full max-w-[320px] bg-[#ECE5DD] rounded-[2.5rem] p-3 shadow-2xl border-[8px] border-slate-800 aspect-[9/19] flex flex-col overflow-hidden"
                >
                  <div className="bg-[#075E54] p-4 pt-10 text-white flex items-center gap-3">
                    <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center overflow-hidden">
                      <img src="https://api.dicebear.com/7.x/bottts/svg?seed=flood" alt="AI" className="w-full h-full" />
                    </div>
                    <div>
                      <div className="font-bold text-xs">FLOODGUARD 9JA</div>
                      <div className="text-[8px] opacity-80">online</div>
                    </div>
                  </div>
                  
                  <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcd2de5.png')] bg-contain">
                    <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-[10px] max-w-[80%]">
                      Hello! Welcome to FLOODGUARD 9JA early warning service. How can I help you today?
                    </div>
                    <div className="bg-[#DCF8C6] p-2 rounded-lg rounded-tr-none shadow-sm text-[10px] max-w-[80%] ml-auto">
                      Is Lokoja safe today?
                    </div>
                    <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-[10px] max-w-[80%]">
                      Checking current data for 📍 Lokoja... <br /><br />
                      Risk Level: 🔴 <span className="font-bold">HIGH RISK</span><br />
                      Recommendation: Prepare for evacuation within 48 hours.
                    </div>
                    <div className="bg-white p-2 rounded-lg rounded-tl-none shadow-sm text-[10px] max-w-[80%]">
                      Reply with "1" for nearest shelter.
                    </div>
                  </div>

                  <div className="p-2 bg-[#F0F0F0] flex gap-2">
                    <div className="flex-1 bg-white rounded-full h-8 flex items-center px-4 text-[10px] text-slate-400">Type a message</div>
                    <div className="bg-[#075E54] w-8 h-8 rounded-full flex items-center justify-center text-white">
                      <MessageSquare className="h-4 w-4 fill-white" />
                    </div>
                  </div>
                </motion.div>
                
                {/* Floating Elements */}
                <div className="absolute -top-10 -right-10 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 animate-bounce">
                  <div className="bg-red-500 w-2 h-2 rounded-full"></div>
                  <span className="text-xs font-bold text-slate-800">New Alert: High Risk</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
