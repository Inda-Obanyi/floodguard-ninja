import * as React from "react";
import { Camera, MapPin, AlertCircle, Send, CheckCircle2, Waves, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { storage } from "@/lib/storage";

export default function ReportFlood() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [filePreview, setFilePreview] = React.useState<string | null>(null);
  const [formData, setFormData] = React.useState({
    type: "",
    severity: "",
    location: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.type || !formData.severity || !formData.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      storage.saveReport({
        ...formData,
        image: filePreview || undefined
      });
      setFormData({ type: "", severity: "", location: "", description: "" });
      setIsSubmitting(false);
      setIsSuccess(true);
      toast.success("Report submitted successfully! AI is analyzing your data.");
    }, 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFilePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="py-12 md:py-20 bg-muted/30 min-h-[90vh]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-5xl font-extrabold text-primary mb-4 flex items-center justify-center gap-3">
              <AlertCircle className="h-10 w-10 text-destructive" />
              Community Intelligence
            </h1>
            <p className="text-muted-foreground text-lg">
              Report rising water levels, blocked drainages, or flooded roads in your area. 
              Your reports help our AI improve accuracy and save lives.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 rounded-3xl shadow-xl text-center border border-border"
              >
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="h-12 w-12 text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">Report Received!</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  Thank you for contributing to community safety. Emergency responders in your LGA have been notified.
                </p>
                <Button onClick={() => { setIsSuccess(false); setFilePreview(null); }} variant="outline" size="lg">Submit Another Report</Button>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="shadow-2xl border-none rounded-3xl overflow-hidden">
                  <CardHeader className="bg-primary text-primary-foreground p-8 text-white">
                    <CardTitle className="text-2xl">Flood Incident Report</CardTitle>
                    <CardDescription className="text-primary-foreground/70">Please provide as much detail as possible.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label>What are you reporting?</Label>
                          <Select onValueChange={(value) => updateField("type", value)} value={formData.type}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Incident Type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="rising">Rising River/Water Levels</SelectItem>
                              <SelectItem value="road">Flooded Road/Bridge</SelectItem>
                              <SelectItem value="drainage">Blocked/Overflowing Drainage</SelectItem>
                              <SelectItem value="home">Property Flooding</SelectItem>
                              <SelectItem value="other">Other Emergency</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Severity Level</Label>
                          <Select onValueChange={(value) => updateField("severity", value)} value={formData.severity}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Severity" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low - Minor Inconvenience</SelectItem>
                              <SelectItem value="med">Medium - Significant Impact</SelectItem>
                              <SelectItem value="high">High - Dangerous Situation</SelectItem>
                              <SelectItem value="extreme">Extreme - Life Threatening</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Specific Location</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                          <Input 
                            placeholder="e.g. Near the old bridge, Ganaja Road" 
                            className="pl-9" 
                            required 
                            value={formData.location}
                            onChange={(e) => updateField("location", e.target.value)}
                          />
                        </div>
                        <p className="text-[10px] text-muted-foreground">Your GPS coordinates will be automatically attached if you grant permission.</p>
                      </div>

                      <div className="space-y-2">
                        <Label>Describe the Situation</Label>
                        <Textarea 
                          placeholder="Tell us what you see... (e.g. The water has risen by 2 feet in the last hour)" 
                          className="min-h-[120px]"
                          required
                          value={formData.description}
                          onChange={(e) => updateField("description", e.target.value)}
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Photos or Videos</Label>
                        <div 
                          className={cn(
                            "border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center transition-colors relative overflow-hidden",
                            filePreview ? "border-primary" : "border-border hover:border-primary/50"
                          )}
                        >
                          {filePreview ? (
                            <div className="relative w-full aspect-video">
                              <img src={filePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                              <Button 
                                type="button" 
                                variant="destructive" 
                                size="sm" 
                                className="absolute top-2 right-2"
                                onClick={() => setFilePreview(null)}
                              >
                                Remove
                              </Button>
                            </div>
                          ) : (
                            <>
                              <div className="bg-primary/5 p-4 rounded-full mb-4">
                                <Camera className="h-8 w-8 text-primary" />
                              </div>
                              <p className="text-sm font-medium">Click to upload or drag and drop</p>
                              <p className="text-xs text-muted-foreground mt-1">PNG, JPG or MP4 (Max 20MB)</p>
                            </>
                          )}
                          <input 
                            type="file" 
                            accept="image/*,video/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={handleFileChange}
                          />
                        </div>
                      </div>

                      <Button type="submit" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 rounded-2xl" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <div className="flex items-center gap-2">
                            <Waves className="h-5 w-5 animate-bounce" />
                            Uploading Report...
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Send className="h-5 w-5" />
                            Submit Report to AI
                          </div>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
