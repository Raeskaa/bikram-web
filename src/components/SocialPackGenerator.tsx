import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { ScrollArea } from './ui/scroll-area';
import { 
  Instagram, 
  Linkedin, 
  Twitter, 
  Facebook, 
  Image, 
  Download, 
  Share2, 
  Copy, 
  Sparkles,
  Calendar,
  Hash,
  Type,
  Palette,
  Wand2,
  CheckCircle2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface SocialPackGeneratorProps {
  open: boolean;
  onClose: () => void;
  eventTitle?: string;
  eventDescription?: string;
  eventDate?: string;
}

interface PlatformAsset {
  platform: string;
  icon: any;
  color: string;
  assets: {
    type: string;
    size: string;
    caption: string;
    hashtags?: string[];
    image?: string;
  }[];
}

export function SocialPackGenerator({ 
  open, 
  onClose,
  eventTitle = "Advanced React Hooks Workshop",
  eventDescription = "Master React Hooks in this intensive 4-hour workshop. Build real projects with expert guidance.",
  eventDate = "Jan 20, 2026"
}: SocialPackGeneratorProps) {
  const [selectedPlatform, setSelectedPlatform] = useState<string>('instagram');
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);
  const [customizeTone, setCustomizeTone] = useState<'casual' | 'professional' | 'enthusiastic'>('professional');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);

  const platforms: PlatformAsset[] = [
    {
      platform: 'instagram',
      icon: Instagram,
      color: '#E4405F',
      assets: [
        {
          type: 'Feed Post',
          size: '1080x1080',
          caption: includeEmojis 
            ? `✨ ${eventTitle} this Saturday! ✨\n\nReady to level up your React skills? Join us for an intensive workshop where you'll learn:\n\n🎯 Custom Hooks\n⚡ Performance Optimization  \n🔧 Real-world Patterns\n💡 Best Practices\n\nSwipe → to see what we're building 👀\n\n📅 ${eventDate}\n⏰ 10am - 2pm EST\n🎟️ Limited to 50 spots\n\nLink in bio to register! 💜`
            : `${eventTitle}\n\n${eventDescription}\n\nDate: ${eventDate}\nTime: 10am - 2pm EST\nCapacity: 50 attendees\n\nLink in bio to register.`,
          hashtags: includeHashtags ? ['ReactJS', 'WebDev', 'CodingWorkshop', 'ReactHooks', 'LearnToCode', 'WebDevelopment', 'JavaScript', 'FrontendDev', 'Programming', 'TechWorkshop'] : [],
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1080&h=1080&fit=crop'
        },
        {
          type: 'Story',
          size: '1080x1920',
          caption: 'Workshop countdown! 🚀\n\nSwipe up to register',
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1080&h=1920&fit=crop'
        },
        {
          type: 'Carousel (3 slides)',
          size: '1080x1080 each',
          caption: '1️⃣ Event Details\n2️⃣ Agenda Breakdown\n3️⃣ Speaker Bio',
        }
      ]
    },
    {
      platform: 'linkedin',
      icon: Linkedin,
      color: '#0077B5',
      assets: [
        {
          type: 'Organic Post',
          size: '1200x627',
          caption: customizeTone === 'professional'
            ? `Excited to announce our ${eventTitle}.\n\nLed by industry experts with 10+ years of experience, this workshop will cover:\n\n• Custom hooks and advanced patterns\n• Performance optimization techniques\n• Real-world project implementation\n• Production-ready best practices\n\nDate: ${eventDate}, 10am - 2pm EST\nFormat: Interactive workshop with hands-on coding\nCapacity: Limited to 50 participants\n\nPerfect for intermediate to advanced developers looking to master React's most powerful features.\n\nRegister via link in comments. Early bird pricing ends Friday.`
            : `🚀 ${eventTitle} - ${eventDate}\n\nJoin us for a deep dive into React Hooks! This hands-on workshop is perfect for developers ready to level up.\n\nWhat you'll learn:\n✓ Custom hooks that save you hours\n✓ Performance optimization secrets\n✓ Patterns used by top companies\n\n50 spots only. Register now!`,
          hashtags: includeHashtags ? ['ReactJS', 'WebDevelopment', 'TechWorkshop', 'ProfessionalDevelopment', 'JavaScript'] : []
        },
        {
          type: 'Event Post',
          size: 'Native LinkedIn Event',
          caption: 'Auto-filled event details with speaker profiles linked'
        },
        {
          type: 'Document Carousel',
          size: 'PDF-style slides',
          caption: '5-slide presentation format with agenda, speaker, and testimonials'
        }
      ]
    },
    {
      platform: 'twitter',
      icon: Twitter,
      color: '#1DA1F2',
      assets: [
        {
          type: 'Tweet Thread',
          size: '5-7 tweets',
          caption: `🧵 Thread: ${eventTitle}\n\n1/ Want to master React Hooks? We're running an intensive workshop that will transform how you build React apps.\n\n${eventDate} | 10am-2pm EST | 50 spots\n\n2/ Here's what makes this workshop different:\n\n→ Build 3 real-world projects\n→ Learn patterns used by Netflix, Airbnb\n→ Hands-on coding (not just slides)\n→ Expert Q&A throughout\n\n3/ Topics we'll cover:\n\n• Custom hooks architecture\n• useCallback & useMemo mastery\n• Context + Hooks patterns\n• Testing strategies\n• Performance profiling\n\n4/ Your instructor: Former Meta engineer, 10 years React experience, built apps for 10M+ users.\n\n5/ Early bird: $39 (reg $49)\nLimited to 50 devs for quality experience\n\nRegister: [link]\n\n6/ Still not sure? Check testimonials from our last workshop (4.8/5 stars)\n\n7/ See you there! 🚀\n\nRT to help other devs level up ↻`,
          hashtags: includeHashtags ? ['ReactJS', 'WebDev', 'JavaScript', 'Coding'] : []
        },
        {
          type: 'Visual Tweet',
          size: 'Twitter Card',
          caption: `🚀 ${eventTitle} - ${eventDate}\n\n🎯 Build 3 real projects\n👨‍💻 Expert instructor\n🎟️ $49 (early bird $39)\n\n50 spots. Register ↓`,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=628&fit=crop'
        }
      ]
    },
    {
      platform: 'facebook',
      icon: Facebook,
      color: '#1877F2',
      assets: [
        {
          type: 'Event Page',
          size: 'Native Facebook Event',
          caption: 'Full event details synced with co-hosts tagged and discussion prompts'
        },
        {
          type: 'Group Post',
          size: 'Standard post',
          caption: `Hey everyone! 👋\n\nWe're hosting a ${eventTitle} and I immediately thought of this group!\n\nIf you've been wanting to:\n✓ Build more efficient React apps\n✓ Learn industry best practices\n✓ Connect with other developers\n\nThis is for you!\n\n📅 ${eventDate}, 10am-2pm EST\n💰 $49 (early bird $39 ends Friday)\n👥 Limited to 50 people\n\nDrop a comment if you're interested and I'll send you the link! 🚀`,
          image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=630&fit=crop'
        }
      ]
    }
  ];

  const selectedPlatformData = platforms.find(p => p.platform === selectedPlatform);

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      toast.success('Social pack generated successfully!');
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleDownload = (platform: string) => {
    toast.success(`Downloaded ${platform} assets!`);
  };

  const handleDownloadAll = () => {
    toast.success('Downloading all assets as ZIP file...');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <DialogTitle>Instant Social Pack</DialogTitle>
              <DialogDescription>
                AI-generated social media assets ready to publish
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="grid grid-cols-12 gap-6 h-full">
            {/* Left Sidebar - Settings */}
            <div className="col-span-3 border-r pr-6">
              <ScrollArea className="h-[calc(90vh-120px)]">
                <div className="space-y-6">
                  <div>
                    <h3 className="font-medium mb-3">Event Details</h3>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-xs text-muted-foreground">Event</Label>
                        <p className="text-sm font-medium">{eventTitle}</p>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Date</Label>
                        <p className="text-sm">{eventDate}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Customization</h3>
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm mb-2 block">Tone</Label>
                        <div className="grid grid-cols-1 gap-2">
                          {['casual', 'professional', 'enthusiastic'].map((tone) => (
                            <button
                              key={tone}
                              onClick={() => setCustomizeTone(tone as any)}
                              className={`px-3 py-2 text-xs rounded-md border text-left transition-colors ${
                                customizeTone === tone 
                                  ? 'bg-primary text-primary-foreground border-primary' 
                                  : 'bg-background hover:bg-muted'
                              }`}
                            >
                              {tone.charAt(0).toUpperCase() + tone.slice(1)}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Include Hashtags</Label>
                        <Switch 
                          checked={includeHashtags} 
                          onCheckedChange={setIncludeHashtags}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label className="text-sm">Include Emojis</Label>
                        <Switch 
                          checked={includeEmojis} 
                          onCheckedChange={setIncludeEmojis}
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-medium mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={handleGenerate}
                      >
                        <Wand2 className="w-4 h-4 mr-2" />
                        {generating ? 'Generating...' : 'Regenerate All'}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-start"
                        onClick={handleDownloadAll}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download All
                      </Button>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </div>

            {/* Main Content - Platform Tabs */}
            <div className="col-span-9">
              <Tabs value={selectedPlatform} onValueChange={setSelectedPlatform} className="h-full flex flex-col">
                <TabsList className="grid grid-cols-4 w-full">
                  {platforms.map((platform) => (
                    <TabsTrigger 
                      key={platform.platform} 
                      value={platform.platform}
                      className="flex items-center gap-2"
                    >
                      <platform.icon className="w-4 h-4" />
                      <span className="capitalize">{platform.platform}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>

                <ScrollArea className="flex-1 mt-4">
                  {platforms.map((platform) => (
                    <TabsContent key={platform.platform} value={platform.platform} className="mt-0">
                      <div className="space-y-4">
                        {/* Platform Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div 
                              className="w-12 h-12 rounded-xl flex items-center justify-center"
                              style={{ backgroundColor: `${platform.color}15` }}
                            >
                              <platform.icon 
                                className="w-6 h-6" 
                                style={{ color: platform.color }}
                              />
                            </div>
                            <div>
                              <h3 className="font-semibold capitalize">{platform.platform} Assets</h3>
                              <p className="text-sm text-muted-foreground">
                                {platform.assets.length} assets ready
                              </p>
                            </div>
                          </div>
                          <Button 
                            size="sm"
                            onClick={() => handleDownload(platform.platform)}
                          >
                            <Download className="w-4 h-4 mr-2" />
                            Download Pack
                          </Button>
                        </div>

                        {/* Assets Grid */}
                        <div className="grid gap-4">
                          {platform.assets.map((asset, index) => (
                            <Card key={index}>
                              <CardHeader>
                                <div className="flex items-start justify-between">
                                  <div>
                                    <CardTitle className="text-base">{asset.type}</CardTitle>
                                    <CardDescription className="flex items-center gap-2 mt-1">
                                      <Image className="w-3 h-3" />
                                      {asset.size}
                                    </CardDescription>
                                  </div>
                                  <Badge variant="secondary">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Ready
                                  </Badge>
                                </div>
                              </CardHeader>
                              <CardContent className="space-y-4">
                                {/* Preview Image */}
                                {asset.image && (
                                  <div className="relative rounded-lg overflow-hidden border bg-muted aspect-video">
                                    <img 
                                      src={asset.image} 
                                      alt={asset.type}
                                      className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                      <p className="text-white text-sm font-medium">{asset.type}</p>
                                    </div>
                                  </div>
                                )}

                                {/* Caption */}
                                <div>
                                  <div className="flex items-center justify-between mb-2">
                                    <Label className="text-xs font-medium flex items-center gap-1">
                                      <Type className="w-3 h-3" />
                                      Caption
                                    </Label>
                                    <Button 
                                      variant="ghost" 
                                      size="sm"
                                      onClick={() => handleCopy(asset.caption)}
                                    >
                                      <Copy className="w-3 h-3 mr-1" />
                                      Copy
                                    </Button>
                                  </div>
                                  <Textarea 
                                    value={asset.caption}
                                    readOnly
                                    className="min-h-[120px] text-sm font-mono resize-none"
                                  />
                                </div>

                                {/* Hashtags */}
                                {asset.hashtags && asset.hashtags.length > 0 && (
                                  <div>
                                    <Label className="text-xs font-medium flex items-center gap-1 mb-2">
                                      <Hash className="w-3 h-3" />
                                      Hashtags ({asset.hashtags.length})
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                      {asset.hashtags.map((tag, tagIndex) => (
                                        <Badge 
                                          key={tagIndex} 
                                          variant="outline"
                                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                                          onClick={() => handleCopy(`#${tag}`)}
                                        >
                                          #{tag}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {/* Action Buttons */}
                                <div className="flex gap-2 pt-2">
                                  <Button variant="outline" size="sm" className="flex-1">
                                    <Palette className="w-4 h-4 mr-2" />
                                    Customize
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex-1">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                  </Button>
                                  <Button size="sm" className="flex-1">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                  </Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </ScrollArea>
              </Tabs>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
