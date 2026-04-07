import { useState } from 'react';
import { Check, BookOpen, Users as UsersIcon, Target, Wand2, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { AICreditsIndicator } from './AICreditsIndicator';

interface CourseData {
  title?: string;
  description?: string;
  targetAudience?: string;
  learningOutcomes?: string[];
  outline?: any[];
}

interface CourseSetupStepsProps {
  interactiveType: 'course-title' | 'course-metadata' | 'course-outline';
  courseData?: Partial<CourseData>;
  onSubmit: (data: Partial<CourseData>) => void;
  onGenerateWithAI?: (type: string, field?: string) => void;
  onApproveOutline?: () => void;
}

export function CourseSetupSteps({ 
  interactiveType, 
  courseData, 
  onSubmit,
  onGenerateWithAI,
  onApproveOutline
}: CourseSetupStepsProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState(courseData?.description || '');
  const [targetAudience, setTargetAudience] = useState(courseData?.targetAudience || '');
  const [learningOutcomes, setLearningOutcomes] = useState<string[]>(courseData?.learningOutcomes || []);
  const [editingOutcome, setEditingOutcome] = useState<number | null>(null);

  // Step 1: Course Title
  if (interactiveType === 'course-title') {
    const handleSubmitTitle = () => {
      if (title.trim()) {
        onSubmit({ title: title.trim() });
      }
    };

    return (
      <div className="mt-6 space-y-4">
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Wand2 className="size-4 text-primary" />
            What would you like to name your course?
          </p>

          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Complete Web Development Bootcamp"
            className="text-base"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitTitle();
              }
            }}
          />

          <Button
            onClick={handleSubmitTitle}
            disabled={!title.trim()}
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  // Step 2: Course Metadata (Description, Target Audience, Learning Outcomes)
  if (interactiveType === 'course-metadata') {
    const handleAddOutcome = () => {
      setLearningOutcomes([...learningOutcomes, '']);
      setEditingOutcome(learningOutcomes.length);
    };

    const handleUpdateOutcome = (index: number, value: string) => {
      const updated = [...learningOutcomes];
      updated[index] = value;
      setLearningOutcomes(updated);
    };

    const handleDeleteOutcome = (index: number) => {
      setLearningOutcomes(learningOutcomes.filter((_, i) => i !== index));
    };

    const handleSubmitMetadata = () => {
      if (description.trim()) {
        onSubmit({ 
          description: description.trim(),
          targetAudience: targetAudience.trim(),
          learningOutcomes: learningOutcomes.filter(o => o.trim())
        });
      }
    };

    return (
      <div className="mt-6 space-y-5">
        {/* Description */}
        <div className="bg-muted border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              Course Description
            </label>
            <div className="flex items-center gap-2">
              <AICreditsIndicator credits={10} />
              <button
                onClick={() => onGenerateWithAI?.('metadata', 'description')}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Wand2 className="size-3" />
                Regenerate
              </button>
            </div>
          </div>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="resize-none bg-white"
          />
        </div>

        {/* Target Audience */}
        <div className="bg-muted border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <UsersIcon className="size-4 text-primary" />
              Target Audience
            </label>
            <button
              onClick={() => onGenerateWithAI?.('metadata', 'targetAudience')}
              className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
            >
              <Wand2 className="size-3" />
              Regenerate
            </button>
          </div>
          <Textarea
            value={targetAudience}
            onChange={(e) => setTargetAudience(e.target.value)}
            rows={2}
            className="resize-none bg-white"
          />
        </div>

        {/* Learning Outcomes */}
        <div className="bg-muted border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Target className="size-4 text-primary" />
              Learning Outcomes
            </label>
            <div className="flex gap-2">
              <button
                onClick={() => onGenerateWithAI?.('metadata', 'learningOutcomes')}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Wand2 className="size-3" />
                Regenerate
              </button>
              <button
                onClick={handleAddOutcome}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <Wand2 className="size-3" />
                Add
              </button>
            </div>
          </div>
          <div className="space-y-2">
            {learningOutcomes.map((outcome, index) => (
              <div key={index} className="flex items-start gap-2 bg-card p-3 rounded border border-border">
                <Check className="size-4 text-green-600 mt-0.5 flex-shrink-0" />
                {editingOutcome === index ? (
                  <Input
                    value={outcome}
                    onChange={(e) => handleUpdateOutcome(index, e.target.value)}
                    onBlur={() => setEditingOutcome(null)}
                    autoFocus
                    className="flex-1 text-sm"
                  />
                ) : (
                  <p 
                    className="flex-1 text-sm text-foreground cursor-pointer hover:text-muted-foreground"
                    onClick={() => setEditingOutcome(index)}
                  >
                    {outcome}
                  </p>
                )}
                <button
                  onClick={() => handleDeleteOutcome(index)}
                  className="text-muted-foreground hover:text-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSubmitMetadata}
            disabled={!description.trim()}
            className="flex-1 bg-primary hover:bg-primary/90"
            size="lg"
          >
            Continue to Outline
          </Button>
        </div>
      </div>
    );
  }

  // Step 3: Course Outline
  if (interactiveType === 'course-outline') {
    return (
      <div className="mt-6 space-y-5">
        <div className="bg-muted border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground flex items-center gap-2">
              <BookOpen className="size-4 text-primary" />
              Course Outline
            </h4>
            <div className="flex items-center gap-2">
              <AICreditsIndicator credits={18} />
              <button
                onClick={() => onGenerateWithAI?.('outline')}
                className="text-xs text-primary hover:text-primary/80 flex items-center gap-1"
              >
                <RotateCcw className="size-3" />
                Regenerate All
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {courseData?.outline?.map((module, index) => (
              <div key={index} className="bg-card border border-border rounded-lg p-4">
                <div className="flex items-start gap-3 mb-3">
                  <div className="size-8 bg-purple-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-purple-700">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium text-foreground mb-1">{module.title}</h5>
                    <Badge variant="secondary" className="text-xs">
                      {module.lessons?.length || 0} lessons
                    </Badge>
                  </div>
                </div>
                <ul className="ml-11 space-y-1.5">
                  {module.lessons?.map((lesson: string, lessonIndex: number) => (
                    <li key={lessonIndex} className="text-sm text-muted-foreground flex items-start gap-2">
                      <span className="text-muted-foreground mt-0.5">•</span>
                      <span>{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={onApproveOutline}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
        >
          Start Building Course
          <Wand2 className="size-4 ml-2" />
        </Button>
      </div>
    );
  }

  return null;
}