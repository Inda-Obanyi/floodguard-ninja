import * as React from "react";
import { Apple, Smartphone, QrCode, Shield, Zap, Globe, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function DownloadApp() {
  const appFeatures = [
    { title: "Push Notifications", icon: Zap, desc: "Instant early warnings before floods occur." },
    { title: "Offline Access", icon: Globe, desc: "Access safety maps and tips even without data." },
    { title: "Flood Risk Map", icon: MapPin, desc: "Interactive map with live community risk levels." },
    { title: "AI Assistant", icon: MessageCircle, desc: "24/7 intelligent help in multiple languages." },
  ];

  return (
    <div className="py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-1.5 mb-6">
              <Shield className="h-4 w-4 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Official Mobile App</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">
              FloodGuard <span className="text-accent">Mobile</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-10 leading-relaxed max-w-xl">
              Take the power of FLOODGUARD 9JA everywhere. Our mobile application provides the most comprehensive disaster preparation tools for you and your family.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Button size="lg" className="h-16 px-8 rounded-2xl bg-black hover:bg-slate-900 group">
                <div className="flex items-center gap-4 text-left">
                  <Smartphone className="h-8 w-8 fill-white" />
                  <div>
                    <div className="text-[10px] opacity-70 uppercase font-bold">Download for</div>
                    <div className="text-lg font-bold">Android (APK)</div>
                  </div>
                </div>
              </Button>
              <Button size="lg" variant="outline" className="h-16 px-8 rounded-2xl border-slate-200 hover:bg-slate-50 group">
                <div className="flex items-center gap-4 text-left">
                  <Apple className="h-8 w-8 fill-slate-900" />
                  <div>
                    <div className="text-[10px] opacity-70 uppercase font-bold">Download for</div>
                    <div className="text-lg font-bold">iOS App Store</div>
                  </div>
                </div>
              </Button>
            </div>

            <div className="flex items-center gap-6 p-6 bg-muted/50 rounded-3xl border border-border">
              <div className="bg-white p-4 rounded-xl shadow-sm">
                <QrCode className="h-16 w-16 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-primary mb-1">Scan to Download</h4>
                <p className="text-sm text-muted-foreground">Quickly install FloodGuard on your device by scanning this code.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-6 relative z-10">
              {appFeatures.map((f, i) => (
                <Card key={i} className="border-none shadow-xl rounded-3xl group hover:scale-105 transition-transform">
                  <CardContent className="p-8">
                    <div className="bg-primary/5 p-4 rounded-2xl w-fit mb-6 transition-colors group-hover:bg-primary/10">
                      <f.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-bold text-primary mb-2">{f.title}</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            {/* Background Decoration */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[100px] z-0"></div>
            <div className="absolute top-[20%] right-[-10%] w-64 h-64 bg-primary/5 rounded-full blur-[80px] z-0"></div>
          </div>
        </div>
      </div>

      {/* App Screenshots Simulation */}
      <section className="mt-24 py-20 bg-primary overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">Experience Modern Safety</h2>
          </div>
          <div className="flex justify-center gap-8 md:gap-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-[200px] md:w-[280px] aspect-[9/19] bg-slate-900 rounded-[2.5rem] border-4 border-slate-800 shadow-2xl relative overflow-hidden shrink-0 transform rotate-3 even:-rotate-3 translate-y-8 even:translate-y-0">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-transparent"></div>
                <div className="p-4 pt-12">
                   <div className="h-4 w-1/2 bg-white/20 rounded mb-4"></div>
                   <div className="h-32 w-full bg-white/10 rounded-2xl mb-4"></div>
                   <div className="space-y-2">
                     <div className="h-3 w-full bg-white/10 rounded"></div>
                     <div className="h-3 w-3/4 bg-white/10 rounded"></div>
                   </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
