import { useState, useEffect } from 'react';
import { BookOpen, RotateCcw, ArrowRight, Check, Loader2, Wand2, Play, Clock, Award } from 'lucide-react';
import { Button } from './ui/button';
import { CourseData } from '../types';

interface CourseGenerationPreviewProps {
  courseData: Partial<CourseData>;
  onComplete: () => void;
}

const GENERATION_STEPS = [
  'Analyzing your course outline...',
  'Generating curriculum structure...',
  'Creating module content...',
  'Setting up learning paths...',
  'Configuring assessments...',
  'Almost ready...',
];

export function CourseGenerationPreview({ 
  courseData, 
  onComplete 
}: CourseGenerationPreviewProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isGenerating, setIsGenerating] = useState(true);
  const [headerVersion, setHeaderVersion] = useState(1);
  const [isRegeneratingHeader, setIsRegeneratingHeader] = useState(false);

  useEffect(() => {
    if (isGenerating && currentStep < GENERATION_STEPS.length) {
      const timer = setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 800);
      return () => clearTimeout(timer);
    } else if (currentStep >= GENERATION_STEPS.length) {
      setIsGenerating(false);
    }
  }, [currentStep, isGenerating]);

  const handleRegenerateHeader = () => {
    setIsRegeneratingHeader(true);
    setTimeout(() => {
      setHeaderVersion(headerVersion + 1);
      setIsRegeneratingHeader(false);
    }, 1500);
  };

  const handleContinue = () => {
    onComplete();
  };

  return (
    <div className="min-h-screen bg-muted flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            {isGenerating ? (
              <div className="size-12 bg-primary rounded-full flex items-center justify-center">
                <Loader2 className="size-6 text-white animate-spin" />
              </div>
            ) : (
              <div className="size-12 bg-primary rounded-full flex items-center justify-center">
                <Check className="size-6 text-white" />
              </div>
            )}
          </div>
          <h1 className="text-foreground text-3xl mb-3">
            {isGenerating ? 'Creating your course...' : 'Your course is ready!'}
          </h1>
          <p className="text-muted-foreground text-lg">
            {isGenerating 
              ? 'Hang tight while we set everything up for you' 
              : `Awesome! We now have everything we need to help you launch ${courseData.title}.`
            }
          </p>
        </div>

        {/* Loading Steps */}
        {isGenerating && (
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="space-y-3">
              {GENERATION_STEPS.map((step, index) => {
                const isComplete = index < currentStep;
                const isActive = index === currentStep;
                const isPending = index > currentStep;

                return (
                  <div 
                    key={index} 
                    className={`flex items-center gap-3 transition-all duration-300 ${
                      isPending ? 'opacity-40' : 'opacity-100'
                    }`}
                  >
                    <div className={`size-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                      isComplete ? 'bg-green-500' :
                      isActive ? 'bg-primary animate-pulse' :
                      'bg-border'
                    }`}>
                      {isComplete && <Check className="size-4 text-white" />}
                      {isActive && <Loader2 className="size-3 text-white animate-spin" />}
                    </div>
                    <span className={`text-foreground ${isActive ? 'font-medium' : ''}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Preview Section (shows after generation) */}
        {!isGenerating && (
          <div className="space-y-4">
            {/* Course Preview Card */}
            <div className="bg-card rounded-xl overflow-hidden border border-border">
              {/* Header Image */}
              <div className="relative h-64 bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex items-center justify-center overflow-hidden">
                {/* Placeholder pattern for header */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(0,0,0,.05) 35px, rgba(0,0,0,.05) 70px)',
                  }} />
                </div>
                
                {/* Course Name Overlay */}
                <div className="relative z-10 text-center px-6">
                  <div className="inline-flex items-center justify-center size-16 bg-white/20 backdrop-blur-sm rounded-full mb-3">
                    <BookOpen className="size-8 text-white" />
                  </div>
                  <h2 className="text-white text-4xl font-bold drop-shadow-lg mb-2">
                    {courseData.title}
                  </h2>
                  <p className="text-white/90 text-lg drop-shadow-md">
                    {courseData.description?.split('.')[0]}.
                  </p>
                </div>

                {/* Regenerate Button Overlay */}
                <div className="absolute top-4 right-4">
                  <Button
                    onClick={handleRegenerateHeader}
                    disabled={isRegeneratingHeader}
                    size="sm"
                    className="bg-white hover:bg-white/90 text-foreground shadow-lg"
                  >
                    {isRegeneratingHeader ? (
                      <>
                        <Loader2 className="size-3 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <RotateCcw className="size-3 mr-2" />
                        Regenerate Header
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Course Info Section */}
              <div className="p-6 bg-card">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-foreground mb-1">
                      Start Learning: {courseData.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {courseData.description}
                    </p>
                  </div>
                </div>

                {/* Course Modules Preview */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-foreground mb-3">Course Modules</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="size-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-700 font-medium text-sm">1</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">Introduction & Getting Started</p>
                        <p className="text-muted-foreground text-xs">3 lessons • 45 min</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="size-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-700 font-medium text-sm">2</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">Core Concepts</p>
                        <p className="text-muted-foreground text-xs">5 lessons • 1.5 hours</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                      <div className="size-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-700 font-medium text-sm">3</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-foreground text-sm font-medium truncate">Advanced Techniques</p>
                        <p className="text-muted-foreground text-xs">4 lessons • 1 hour</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex gap-6 py-4 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Play className="size-4 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium text-foreground">12 Lessons</div>
                      <div className="text-xs text-muted-foreground">Total content</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-4 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium text-foreground">3.5 Hours</div>
                      <div className="text-xs text-muted-foreground">Duration</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="size-4 text-purple-600" />
                    <div>
                      <div className="text-sm font-medium text-foreground">Certificate</div>
                      <div className="text-xs text-muted-foreground">Upon completion</div>
                    </div>
                  </div>
                </div>

                {/* Enroll Button Mockup */}
                <div className="pt-4 border-t border-border">
                  <div className="flex gap-2">
                    <div className="flex-1 px-4 py-2.5 bg-primary text-white text-center rounded-lg opacity-50 cursor-not-allowed">
                      Enroll Now
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-6">
              <div className="flex items-start gap-4">
                <div className="size-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                  <Wand2 className="size-5 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-medium mb-1">Personalization Tips</h4>
                  <p className="text-muted-foreground text-sm mb-3">
                    Your course is ready! You can customize content, add videos, quizzes, and configure settings once you enter the builder.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <div className="px-3 py-1 bg-card border border-purple-200 rounded-full text-foreground text-xs">
                      Video Lessons
                    </div>
                    <div className="px-3 py-1 bg-card border border-purple-200 rounded-full text-foreground text-xs">
                      Quizzes & Tests
                    </div>
                    <div className="px-3 py-1 bg-card border border-purple-200 rounded-full text-foreground text-xs">
                      Pricing Options
                    </div>
                    <div className="px-3 py-1 bg-card border border-purple-200 rounded-full text-foreground text-xs">
                      Certificates
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Continue Button */}
            <div className="flex justify-center pt-4">
              <Button
                onClick={handleContinue}
                size="lg"
                className="bg-primary text-white hover:bg-primary/90 px-8 text-lg h-12"
              >
                Continue to Builder
                <ArrowRight className="size-5 ml-2" />
              </Button>
            </div>
          </div>
        )}

        {/* Bottom Text */}
        {isGenerating && (
          <div className="text-center mt-8">
            <p className="text-muted-foreground text-sm">
              This usually takes about 10-15 seconds
            </p>
          </div>
        )}
      </div>
    </div>
  );
}