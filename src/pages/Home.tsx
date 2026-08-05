import * as React from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  TrendingUp, 
  ChevronRight, 
  Map as MapIcon, 
  Smartphone, 
  Bell,
  Heart,
  MapPin,
  Navigation,
  AlertTriangle,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// ─── Animated Counter Component ─────────────────────────────────────────────
function AnimatedCounter({ 
  end, 
  duration = 2500, 
  suffix = "", 
  prefix = "",
  displayValue,
  liveIncrement = 0,
  liveIntervalMs = 3000,
}: { 
  end: number; 
  duration?: number; 
  suffix?: string; 
  prefix?: string;
  displayValue?: (val: number) => string;
  liveIncrement?: number;
  liveIntervalMs?: number;
}) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef<HTMLSpanElement>(null);
  const hasAnimated = React.useRef(false);
  const liveRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(end);
              // Start live incrementing after initial animation
              if (liveIncrement > 0) {
                liveRef.current = setInterval(() => {
                  setCount(prev => prev + liveIncrement);
                }, liveIntervalMs);
              }
            }
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
      if (liveRef.current) clearInterval(liveRef.current);
    };
  }, [end, duration, liveIncrement, liveIntervalMs]);

  const display = displayValue ? displayValue(count) : count.toLocaleString();

  return (
    <span ref={ref}>
      {prefix}{display}{suffix}
    </span>
  );
}

// ─── Before/After Split View Slider ─────────────────────────────────────────────────────────────────────────────────
function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = React.useState(50);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const isDragging = React.useRef(false);

  const handleMove = React.useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(2, Math.min(98, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleStart = React.useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    if ('touches' in e) {
      handleMove(e.touches[0].clientX);
    }
  }, [handleMove]);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging.current) handleMove(e.clientX);
    };
    const handleMouseUp = () => { isDragging.current = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging.current) handleMove(e.touches[0].clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [handleMove]);

  const satelliteImg = "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1200&q=85&auto=format";

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden cursor-col-resize select-none shadow-2xl shadow-black/30 border border-white/10"
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      {/* BEFORE — Satellite View (Full Background) */}
      <div className="absolute inset-0">
        <img
          src={satelliteImg}
          alt="Satellite view of neighborhood"
          className="w-full h-full object-cover"
        />
        {/* Subtle vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.3)_100%)]" />
        {/* Glassmorphism Badge — Satellite View */}
        <div className="absolute top-5 left-5 bg-black/40 backdrop-blur-xl border border-white/20 text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 shadow-lg shadow-black/20">
          <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]"></div>
          <span className="text-white/90">Satellite View</span>
        </div>
      </div>

      {/* AFTER — AI Flood Inundation Prediction (Clipped Overlay) */}
      <div 
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <div className="w-full h-full relative">
          {/* Same satellite base image */}
          <img
            src={satelliteImg}
            alt="Flood prediction overlay"
            className="w-full h-full object-cover"
          />
          {/* Translucent cyan/blue water inundation layer */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/20 via-blue-600/35 to-blue-900/50 mix-blend-multiply" />
          {/* Glowing water shimmer effect */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_60%,rgba(0,200,255,0.25)_0%,transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(0,150,255,0.2)_0%,transparent_50%)]" />
          {/* High-risk zones — glowing red/orange */}
          <div className="absolute top-[35%] left-[15%] w-[25%] h-[35%] rounded-[50%] bg-red-500/20 blur-xl border border-red-400/30 shadow-[0_0_40px_rgba(239,68,68,0.3)]" />
          <div className="absolute top-[45%] left-[50%] w-[20%] h-[30%] rounded-[50%] bg-orange-500/20 blur-xl border border-orange-400/25 shadow-[0_0_30px_rgba(249,115,22,0.25)]" />
          <div className="absolute top-[55%] left-[30%] w-[15%] h-[20%] rounded-[50%] bg-red-600/15 blur-lg border border-red-500/20 shadow-[0_0_25px_rgba(220,38,38,0.2)]" />
          {/* Subtle grid overlay for tech feel */}
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          {/* Dark edge vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,10,30,0.5)_100%)]" />
          {/* Glassmorphism Badge — AI Prediction */}
          <div className="absolute top-5 left-5 bg-red-600/50 backdrop-blur-xl border border-red-400/30 text-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-[0.15em] flex items-center gap-2.5 shadow-lg shadow-red-900/30">
            <AlertTriangle className="w-3.5 h-3.5 text-red-300 drop-shadow-[0_0_4px_rgba(252,165,165,0.6)]" />
            <span>AI Flood Prediction</span>
          </div>
          {/* AI Risk Legend — glassmorphism */}
          <div className="absolute bottom-5 right-5 bg-black/40 backdrop-blur-xl border border-white/15 rounded-2xl p-4 text-white text-[11px] shadow-xl shadow-black/30">
            <div className="font-bold mb-2.5 text-[10px] uppercase tracking-[0.15em] text-white/70">AI Risk Level</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div>
                <span className="text-white/80">Critical (&gt;2m depth)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_6px_rgba(249,115,22,0.4)]"></div>
                <span className="text-white/80">High (1–2m depth)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_6px_rgba(250,204,21,0.4)]"></div>
                <span className="text-white/80">Moderate (&lt;1m)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slider Divider Line */}
      <div 
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        <div className="w-[2px] h-full bg-white/90 shadow-[0_0_12px_rgba(255,255,255,0.4)]"></div>
        {/* Slider Handle Button — with pulse animation */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-col-resize">
          {/* Pulse ring */}
          <div className="absolute inset-0 w-14 h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/20 animate-ping" style={{ animationDuration: '2s' }}></div>
          {/* Main handle */}
          <div className="w-14 h-14 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3),0_0_40px_rgba(0,150,255,0.15)] flex items-center justify-center border-2 border-white/80 relative">
            <div className="flex items-center gap-0.5">
              <ChevronRight className="w-5 h-5 text-primary -scale-x-100" strokeWidth={2.5} />
              <ChevronRight className="w-5 h-5 text-primary" strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Emergency Locate Widget ────────────────────────────────────────────────
function EmergencyLocateWidget() {
  const [address, setAddress] = React.useState("");
  const [showResult, setShowResult] = React.useState(false);
  const [isLocating, setIsLocating] = React.useState(false);
  const [result, setResult] = React.useState<{ area: string; tier: string; color: string; description: string } | null>(null);

  const mockLocations = [
    { area: "Wuse Zone 4, Abuja", tier: "High Risk", color: "text-red-500", description: "This area is highly susceptible to flooding due to low elevation and proximity to the river basin. Immediate preparation is recommended." },
    { area: "Garki Sector 7, Abuja", tier: "Moderate Risk", color: "text-orange-500", description: "This area has moderate flood risk. Drainage infrastructure provides partial protection. Stay alert during heavy rainfall." },
    { area: "Maitama District, Abuja", tier: "Low Risk", color: "text-green-500", description: "This area has relatively low flood risk due to elevated terrain. Continue monitoring for extreme weather updates." },
    { area: "Gwarinpa Estate, Abuja", tier: "High Risk", color: "text-red-500", description: "Low-lying area with historical flood events. Pre-position emergency supplies and review evacuation routes." },
    { area: "Asokoro Zone, Abuja", tier: "Moderate Risk", color: "text-orange-500", description: "Moderate risk area with seasonal flooding potential. Ensure drainage channels are clear before rainy season." },
  ];

  const handleLocate = () => {
    setIsLocating(true);
    setTimeout(() => {
      const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      setResult(location);
      setShowResult(true);
      setIsLocating(false);
    }, 1500);
  };

  const handleAddressSubmit = () => {
    if (!address.trim()) return;
    setIsLocating(true);
    setTimeout(() => {
      const location = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      setResult({ ...location, area: address || location.area });
      setShowResult(true);
      setIsLocating(false);
    }, 1000);
  };

  return (
    <>
      <div className="mt-8 max-w-xl">
        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 shadow-lg">
          <MapPin className="h-4 w-4 text-accent ml-2 shrink-0" />
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address..."
            className="flex-1 bg-transparent text-white placeholder-white/50 outline-none text-sm px-2 min-w-0"
            onKeyDown={(e) => e.key === "Enter" && handleAddressSubmit()}
          />
          <Button
            onClick={handleLocate}
            disabled={isLocating}
            size="sm"
            className="bg-accent hover:bg-accent/90 text-white rounded-lg h-9 px-4 shrink-0 font-semibold"
          >
            {isLocating ? (
              <Navigation className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <Navigation className="h-4 w-4 mr-1.5" />
                Locate Me
              </>
            )}
          </Button>
        </div>
        <p className="text-white/50 text-xs mt-2 ml-1">Quick-test: Check your neighborhood's flood danger tier instantly</p>
      </div>

      {/* Result Modal */}
      {showResult && result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setShowResult(false)}
        >
          <motion.div
            initial={{ y: 30, scale: 0.95 }}
            animate={{ y: 0, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl p-6 max-w-sm w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className={cn("p-2.5 rounded-xl",
                  result.tier.includes("High") ? "bg-red-100" :
                  result.tier.includes("Moderate") ? "bg-orange-100" : "bg-green-100"
                )}>
                  <AlertTriangle className={cn("h-5 w-5",
                    result.tier.includes("High") ? "text-red-600" :
                    result.tier.includes("Moderate") ? "text-orange-600" : "text-green-600"
                  )} />
                </div>
                <h3 className="font-bold text-primary text-lg">Danger Tier</h3>
              </div>
              <button onClick={() => setShowResult(false)} className="p-1.5 hover:bg-muted rounded-lg transition-colors">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            
            <div className={cn("rounded-xl p-4 mb-4 border-2",
              result.tier.includes("High") ? "bg-red-50 border-red-200" :
              result.tier.includes("Moderate") ? "bg-orange-50 border-orange-200" : "bg-green-50 border-green-200"
            )}>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary text-sm">{result.area}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={cn("w-3 h-3 rounded-full animate-pulse",
                  result.tier.includes("High") ? "bg-red-500" :
                  result.tier.includes("Moderate") ? "bg-orange-500" : "bg-green-500"
                )}></div>
                <span className={cn("font-extrabold text-xl", result.color)}>{result.tier}</span>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              {result.description}
            </p>
            
            <div className="flex gap-2">
              <Button onClick={() => setShowResult(false)} variant="outline" className="flex-1">
                Close
              </Button>
              <Button asChild className="flex-1 bg-primary">
                <Link to="/map">View Map</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

// ─── Stats Data ─────────────────────────────────────────────────────────────
const stats = [
  { label: "Communities Protected", value: 450, suffix: "+", icon: ShieldCheck, display: (v: number) => v.toLocaleString(), liveIncrement: 1, liveIntervalMs: 12000 },
  { label: "Alerts Sent", value: 1200000, suffix: "+", icon: Bell, display: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${Math.floor(v / 1000)}K` : v.toLocaleString(), liveIncrement: 3, liveIntervalMs: 1500 },
  { label: "Predictions Made", value: 15000, suffix: "+", icon: Zap, display: (v: number) => v >= 1000 ? `${(v / 1000).toFixed(v >= 10000 ? 0 : 1)}K` : v.toLocaleString(), liveIncrement: 1, liveIntervalMs: 5000 },
  { label: "Lives Impacted", value: 2000000, suffix: "+", icon: Heart, display: (v: number) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${Math.floor(v / 1000)}K` : v.toLocaleString(), liveIncrement: 5, liveIntervalMs: 2000 },
];

const features = [
  {
    title: "AI Predictions",
    description: "Machine learning models analyze rainfall, river levels, and weather forecasts to predict risks.",
    icon: Zap,
    color: "text-accent"
  },
  {
    title: "Rural Inclusion",
    description: "Reaching every citizen through SMS and USSD, even without internet access.",
    icon: Smartphone,
    color: "text-secondary"
  },
  {
    title: "Real-time Map",
    description: "Interactive visual dashboard showing flood risk levels across the nation.",
    icon: MapIcon,
    color: "text-primary"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3e7e648e-5c2f-4a47-aba6-4028fbe92417/floodguard-ai-hero-background-000c75c9-1782463439044.webp" 
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-accent">Predict. Prepare. Protect.</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
              AI-Powered Flood <br />
              <span className="text-accent">Early Warning</span> System
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-6 leading-relaxed">
              Saving lives in Nigeria through Artificial Intelligence. 
              Get timely alerts, evacuation guidance, and real-time risk data 
              delivered directly to your phone.
            </p>

            {/* Dynamic Hero Metric Counters */}
            <div className="flex flex-wrap gap-6 mb-6">
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3">
                <ShieldCheck className="h-6 w-6 text-accent" />
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    <AnimatedCounter end={450} suffix="+" liveIncrement={1} liveIntervalMs={12000} />
                  </div>
                  <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Communities Protected</div>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-4 py-3">
                <Bell className="h-6 w-6 text-accent" />
                <div>
                  <div className="text-2xl font-extrabold text-white">
                    <AnimatedCounter end={1200000} suffix="+" displayValue={(v) => v >= 1000000 ? `${(v / 1000000).toFixed(1)}M` : v >= 1000 ? `${Math.floor(v / 1000)}K` : `${v}`} liveIncrement={3} liveIntervalMs={1500} />
                  </div>
                  <div className="text-xs text-white/60 font-medium uppercase tracking-wider">Alerts Sent</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg shadow-primary/20">
                <Link to="/map" className="flex items-center gap-2">
                  Check Flood Risk <ChevronRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-14 px-8 text-lg rounded-xl bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20">
                <Link to="/sms">Subscribe for Alerts</Link>
              </Button>
            </div>

            {/* Localized Emergency Widget */}
            <EmergencyLocateWidget />
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="bg-primary py-12 border-y border-white/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4 text-accent">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} displayValue={stat.display} liveIncrement={stat.liveIncrement} liveIntervalMs={stat.liveIntervalMs} />
                </div>
                <div className="text-xs md:text-sm text-primary-foreground/60 font-medium uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Split View Slider Section */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">AI-Powered Visualization</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">Before & After Flood Prediction</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Drag the slider to compare real satellite imagery with our AI-generated flood inundation predictions. 
              See exactly which areas are at risk before disaster strikes.
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <BeforeAfterSlider />
          </div>
          <div className="flex justify-center mt-6">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Navigation className="h-4 w-4 text-accent" />
              Drag the slider left and right to compare
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 african-pattern">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4">Our Vision</h2>
              <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-6 leading-tight">
                Africa's leading AI-powered disaster response platform.
              </h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                To become Africa's leading AI-powered disaster prediction and response platform, 
                ensuring that no life is lost to preventable flooding by empowering every community 
                with timely information, early warnings, and intelligent decision-making tools.
              </p>
              <div className="space-y-4">
                <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-border">
                  <div className="bg-secondary/10 p-3 rounded-lg text-secondary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Proactive Response</h4>
                    <p className="text-sm text-muted-foreground">Moving from reactive rescue to proactive preparation.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 bg-white rounded-xl shadow-sm border border-border">
                  <div className="bg-accent/10 p-3 rounded-lg text-accent">
                    <Users className="h-6 w-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-primary">Rural Focus</h4>
                    <p className="text-sm text-muted-foreground">Ensuring equal access for smartphone and non-smartphone users.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/3e7e648e-5c2f-4a47-aba6-4028fbe92417/rural-community-inclusion-25cded46-1782463439215.webp" 
                  alt="Rural Community"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-accent p-8 rounded-2xl shadow-xl max-w-[250px]">
                <p className="text-white font-bold text-xl italic leading-tight">
                  "FloodGuard saved our harvest last year in Lokoja."
                </p>
                <p className="text-white/80 text-sm mt-2">— Local Farmer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-4 text-center">How it Works</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold text-primary mb-6">A Complete Ecosystem for Safety</h3>
            <p className="text-muted-foreground">FLOODGUARD 9JA continuously collects and analyzes data from weather stations, satellites, and community reports to predict risks before they become disasters.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-border group"
              >
                <div className={cn("p-4 rounded-2xl bg-muted/50 w-fit mb-6 transition-colors group-hover:bg-primary/10", feature.color)}>
                  <feature.icon className="h-8 w-8" />
                </div>
                <h4 className="text-xl font-bold text-primary mb-4">{feature.title}</h4>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <WavesPattern />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-8 max-w-3xl mx-auto">
            Ready to protect your community from floods?
          </h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="h-14 px-10 text-lg rounded-xl bg-accent hover:bg-accent/90">
              <Link to="/download">Download Mobile App</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-14 px-10 text-lg rounded-xl text-white border-white/20 hover:bg-white/10 backdrop-blur-sm">
              <Link to="/dashboard">Agency Portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function WavesPattern() {
  return (
    <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0 100C100 100 100 150 200 150C300 150 300 100 400 100V400H0V100Z" fill="white" />
      <path d="M0 150C100 150 100 200 200 200C300 200 300 150 400 150V400H0V150Z" fill="white" fillOpacity="0.5" />
      <path d="M0 200C100 200 100 250 200 250C300 250 300 200 400 200V400H0V200Z" fill="white" fillOpacity="0.2" />
    </svg>
  );
}