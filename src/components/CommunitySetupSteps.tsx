import { useState, useEffect } from 'react';
import { Sparkles, Check, Plus, RotateCcw, Wand2 } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { CommunityData } from '../types';
import { AICreditsIndicator } from './AICreditsIndicator';

interface CommunitySetupStepsProps {
  interactiveType: 'community-description' | 'community-name' | 'community-vibe';
  communityData?: Partial<CommunityData>;
  onSubmit: (data: Partial<CommunityData>) => void;
}

const DESCRIPTION_SUGGESTIONS = [
  'We bring together [your niche] who are embarking on new creative chapters to collaborate on hands-on projects, so that we can build visible portfolios, spark lasting inspiration, and refine practical skills.',
  'We bring together [your niche] navigating big life shifts to host supportive meetups and skill swaps, so that we can gain clear direction, boost confidence, and celebrate steady progress.',
  'We bring together [your niche] stepping into leadership or mentorship roles to run co-learning sessions and practice real-world scenarios, so that we can strengthen communication, expand our impact, and enjoy meaningful growth.',
];

const NAME_SUGGESTIONS = [
  'The Creative Collective',
  'Momentum Makers',
  'Visionary Circle',
  'Growth Hub',
  'Impact Community',
];

const VIBE_OPTIONS = [
  { id: 'professional', label: 'Professional & Polished', description: 'Formal networking with structured events' },
  { id: 'casual', label: 'Casual & Friendly', description: 'Relaxed conversations and informal meetups' },
  { id: 'inspirational', label: 'Inspirational & Uplifting', description: 'Motivational content and positive vibes' },
  { id: 'educational', label: 'Educational & Resourceful', description: 'Learning-focused with expert guidance' },
  { id: 'creative', label: 'Creative & Experimental', description: 'Bold ideas and artistic expression' },
];

export function CommunitySetupSteps({ 
  interactiveType, 
  communityData, 
  onSubmit 
}: CommunitySetupStepsProps) {
  const [description, setDescription] = useState('');
  const [selectedName, setSelectedName] = useState('');
  const [customName, setCustomName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState('');
  const [selectedSuggestions, setSelectedSuggestions] = useState<number[]>([]);
  const [highlightedText, setHighlightedText] = useState<{start: number, end: number} | null>(null);

  // Step 1: Community Description
  if (interactiveType === 'community-description') {
    const handleSelectSuggestion = (index: number) => {
      if (selectedSuggestions.includes(index)) {
        setSelectedSuggestions(selectedSuggestions.filter(i => i !== index));
      } else {
        setSelectedSuggestions([...selectedSuggestions, index]);
        setDescription(DESCRIPTION_SUGGESTIONS[index]);
      }
    };

    const handleSubmitDescription = () => {
      if (description.trim()) {
        onSubmit({ description: description.trim() });
      }
    };

    return (
      <div className="mt-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Great! How do any of these sound for a community description?
            </p>
            <AICreditsIndicator credits={8} />
          </div>

          {DESCRIPTION_SUGGESTIONS.map((suggestion, index) => {
            const isSelected = selectedSuggestions.includes(index);
            return (
              <div
                key={index}
                className={`relative p-4 rounded-lg border-2 transition-all cursor-pointer group ${
                  isSelected
                    ? 'border-primary bg-purple-50/50'
                    : 'border-border hover:border-border bg-card'
                }`}
                onClick={() => handleSelectSuggestion(index)}
              >
                <div className="flex items-start gap-3">
                  <div className={`size-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    isSelected ? 'border-primary bg-primary' : 'border-border bg-card'
                  }`}>
                    {isSelected && <Check className="size-3 text-white" />}
                  </div>
                  <p className="text-sm text-foreground flex-1 leading-relaxed">{suggestion}</p>
                  {isSelected && (
                    <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDescription(suggestion);
                        }}
                        className="px-2 py-1 rounded bg-primary text-white text-xs hover:bg-primary/90 transition-colors"
                      >
                        That's it
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDescription(suggestion);
                        }}
                        className="px-2 py-1 rounded border border-border text-foreground text-xs hover:bg-muted transition-colors"
                      >
                        Customize
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          <div className="pt-2">
            <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-primary" />
              Or write your own:
            </p>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="We bring together [who] to [do what], so that we can [achieve what]..."
              rows={4}
              className="resize-none"
            />
          </div>

          <Button
            onClick={handleSubmitDescription}
            disabled={!description.trim()}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Community Name
  if (interactiveType === 'community-name') {
    const handleSelectName = (name: string) => {
      setSelectedName(name);
      setCustomName('');
    };

    const handleSubmitName = () => {
      const finalName = customName.trim() || selectedName;
      if (finalName) {
        onSubmit({ title: finalName });
      }
    };

    return (
      <div className="mt-6 space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Do you like any of these names for your community?
            </p>
            <AICreditsIndicator credits={6} />
          </div>

          <div className="grid gap-2">
            {NAME_SUGGESTIONS.map((name, index) => {
              const isSelected = selectedName === name;
              return (
                <button
                  key={index}
                  onClick={() => handleSelectName(name)}
                  className={`p-3 rounded-lg border-2 text-left transition-all ${
                    isSelected
                      ? 'border-primary bg-purple-50/50'
                      : 'border-border hover:border-border bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`size-5 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-border bg-card'
                    }`}>
                      {isSelected && <Check className="size-3 text-white" />}
                    </div>
                    <span className="text-sm font-medium text-foreground">{name}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full"
          >
            <RotateCcw className="size-3 mr-2" />
            Load More
          </Button>

          <div className="pt-2">
            <p className="text-sm text-muted-foreground flex items-center gap-2 mb-3">
              <Sparkles className="size-4 text-primary" />
              Or create your own:
            </p>
            <Input
              value={customName}
              onChange={(e) => {
                setCustomName(e.target.value);
                setSelectedName('');
              }}
              placeholder="e.g., Creative Leaders Network"
              className="mb-3"
            />
          </div>

          <Button
            onClick={handleSubmitName}
            disabled={!customName.trim() && !selectedName}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Community Vibe/Brand Identity
  if (interactiveType === 'community-vibe') {
    const handleSelectVibe = (vibeId: string) => {
      setSelectedVibe(vibeId);
    };

    const handleSubmitVibe = () => {
      if (selectedVibe) {
        const selected = VIBE_OPTIONS.find(v => v.id === selectedVibe);
        onSubmit({ vibe: selected?.label || selectedVibe });
      }
    };

    return (
      <div className="mt-6 space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground flex items-center gap-2 mb-4">
            <Sparkles className="size-4 text-primary" />
            Choose the vibe that best represents your community:
          </p>

          <div className="grid gap-3">
            {VIBE_OPTIONS.map((vibe) => {
              const isSelected = selectedVibe === vibe.id;
              return (
                <button
                  key={vibe.id}
                  onClick={() => handleSelectVibe(vibe.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all group ${
                    isSelected
                      ? 'border-primary bg-purple-50/50'
                      : 'border-border hover:border-border bg-card'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`size-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      isSelected ? 'border-primary bg-primary' : 'border-border bg-card'
                    }`}>
                      {isSelected && <Check className="size-3 text-white" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground mb-1">{vibe.label}</p>
                      <p className="text-sm text-muted-foreground">{vibe.description}</p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <Button
            onClick={handleSubmitVibe}
            disabled={!selectedVibe}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Start Building
            <Sparkles className="size-4 ml-2" />
          </Button>
        </div>
      </div>
    );
  }

  return null;
}