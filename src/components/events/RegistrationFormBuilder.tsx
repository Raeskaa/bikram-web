import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import {
  Plus,
  GripVertical,
  Trash2,
  ChevronDown,
  ChevronUp,
  Eye,
  Type,
  Mail,
  Phone,
  Link as LinkIcon,
  AlignLeft,
  ListChecks,
  CheckSquare,
  FileText,
  Lock,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { cn } from '../ui/utils';

interface FormField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'phone' | 'url';
  required: boolean;
  placeholder?: string;
  options?: string[];
  isDefault?: boolean;
}

const FIELD_TYPE_CONFIG: Record<string, { label: string; icon: any }> = {
  text: { label: 'Short Text', icon: Type },
  email: { label: 'Email', icon: Mail },
  textarea: { label: 'Long Text', icon: AlignLeft },
  select: { label: 'Dropdown', icon: ListChecks },
  checkbox: { label: 'Checkbox', icon: CheckSquare },
  phone: { label: 'Phone', icon: Phone },
  url: { label: 'URL / Link', icon: LinkIcon },
};

const DEFAULT_FIELDS: FormField[] = [
  { id: 'default-name', label: 'Full Name', type: 'text', required: true, placeholder: 'Enter your full name', isDefault: true },
  { id: 'default-email', label: 'Email Address', type: 'email', required: true, placeholder: 'you@example.com', isDefault: true },
];

const TEMPLATE_FIELDS: FormField[] = [
  { id: 'tpl-company', label: 'Company / Organization', type: 'text', required: false, placeholder: 'Your company name' },
  { id: 'tpl-role', label: 'Job Title / Role', type: 'text', required: false, placeholder: 'e.g. Product Manager' },
  { id: 'tpl-phone', label: 'Phone Number', type: 'phone', required: false, placeholder: '+1 (555) 000-0000' },
  { id: 'tpl-linkedin', label: 'LinkedIn Profile', type: 'url', required: false, placeholder: 'https://linkedin.com/in/...' },
  { id: 'tpl-reason', label: 'Why do you want to attend?', type: 'textarea', required: false, placeholder: 'Tell us about your interest...' },
  { id: 'tpl-experience', label: 'Experience Level', type: 'select', required: false, options: ['Beginner', 'Intermediate', 'Advanced', 'Expert'] },
  { id: 'tpl-dietary', label: 'Dietary Requirements', type: 'select', required: false, options: ['None', 'Vegetarian', 'Vegan', 'Gluten-free', 'Halal', 'Kosher', 'Other'] },
  { id: 'tpl-terms', label: 'I agree to the terms and conditions', type: 'checkbox', required: true },
  { id: 'tpl-newsletter', label: 'Subscribe to event updates', type: 'checkbox', required: false },
];

interface RegistrationFormBuilderProps {
  onUpdate?: (fields: FormField[]) => void;
}

export function RegistrationFormBuilder({ onUpdate }: RegistrationFormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>([...DEFAULT_FIELDS]);
  const [expandedField, setExpandedField] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [showAddField, setShowAddField] = useState(false);

  const updateFields = (updated: FormField[]) => {
    setFields(updated);
    onUpdate?.(updated);
  };

  const handleAddField = (template?: FormField) => {
    const newField: FormField = template
      ? { ...template, id: Date.now().toString(), isDefault: false }
      : {
          id: Date.now().toString(),
          label: 'New Field',
          type: 'text',
          required: false,
          placeholder: '',
        };
    updateFields([...fields, newField]);
    setExpandedField(newField.id);
    setShowAddField(false);
    toast.success('Field added');
  };

  const handleUpdateField = (id: string, updates: Partial<FormField>) => {
    updateFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const handleRemoveField = (id: string) => {
    updateFields(fields.filter(f => f.id !== id));
    toast('Field removed');
  };

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index <= DEFAULT_FIELDS.length) return;
    if (direction === 'down' && index >= fields.length - 1) return;
    const newFields = [...fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
    updateFields(newFields);
  };

  const customFields = fields.filter(f => !f.isDefault);
  const availableTemplates = TEMPLATE_FIELDS.filter(t => !fields.some(f => f.label === t.label));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-foreground font-semibold text-lg">Registration Form</h2>
          <p className="text-sm text-muted-foreground">
            {fields.length} fields ({fields.filter(f => f.required).length} required)
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-lg border-border"
            onClick={() => setShowPreview(!showPreview)}
          >
            <Eye className="size-3.5 mr-2" />
            {showPreview ? 'Edit' : 'Preview'}
          </Button>
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg shadow-none"
            onClick={() => setShowAddField(!showAddField)}
          >
            <Plus className="size-3.5 mr-2" />
            Add Field
          </Button>
        </div>
      </div>

      {/* Add Field Templates Panel */}
      {showAddField && (
        <div className="bg-card border border-border rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-foreground">Quick Add</h3>
            <button onClick={() => setShowAddField(false)} className="text-muted-foreground hover:text-foreground">
              <ChevronUp className="size-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {availableTemplates.map(tpl => {
              const TypeIcon = FIELD_TYPE_CONFIG[tpl.type]?.icon || Type;
              return (
                <button
                  key={tpl.id}
                  onClick={() => handleAddField(tpl)}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-border text-left hover:border-primary/30 hover:bg-primary/5 transition-colors"
                >
                  <TypeIcon className="size-3.5 text-muted-foreground flex-shrink-0" />
                  <span className="text-xs text-foreground truncate">{tpl.label}</span>
                </button>
              );
            })}
            <button
              onClick={() => handleAddField()}
              className="flex items-center gap-2 p-2.5 rounded-lg border border-dashed border-border text-left hover:border-primary/30 hover:bg-primary/5 transition-colors"
            >
              <Plus className="size-3.5 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground">Custom Field</span>
            </button>
          </div>
        </div>
      )}

      {showPreview ? (
        /* ── Preview Mode ── */
        <div className="bg-card border border-border rounded-xl p-6 space-y-5">
          <div className="border-b border-border pb-4 mb-2">
            <h3 className="text-foreground font-medium">Registration</h3>
            <p className="text-xs text-muted-foreground mt-1">Fill out the form below to register for this event.</p>
          </div>
          {fields.map(field => {
            const TypeIcon = FIELD_TYPE_CONFIG[field.type]?.icon || Type;
            return (
              <div key={field.id} className="space-y-1.5">
                <Label className="text-sm text-foreground font-normal flex items-center gap-1">
                  {field.label}
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
                {field.type === 'textarea' ? (
                  <div className="min-h-[80px] rounded-lg border border-border bg-muted/30 p-3 text-sm text-muted-foreground">
                    {field.placeholder || 'Type here...'}
                  </div>
                ) : field.type === 'select' ? (
                  <div className="h-10 rounded-lg border border-border bg-muted/30 px-3 flex items-center justify-between text-sm text-muted-foreground">
                    <span>{field.options?.[0] || 'Select...'}</span>
                    <ChevronDown className="size-4" />
                  </div>
                ) : field.type === 'checkbox' ? (
                  <div className="flex items-center gap-2">
                    <div className="size-4 rounded border border-border bg-muted/30" />
                    <span className="text-sm text-muted-foreground">{field.label}</span>
                  </div>
                ) : (
                  <div className="h-10 rounded-lg border border-border bg-muted/30 px-3 flex items-center text-sm text-muted-foreground">
                    {field.placeholder || 'Type here...'}
                  </div>
                )}
              </div>
            );
          })}
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground shadow-none mt-4" disabled>
            Register
          </Button>
        </div>
      ) : (
        /* ── Edit Mode ── */
        <div className="space-y-2">
          {fields.map((field, index) => {
            const TypeIcon = FIELD_TYPE_CONFIG[field.type]?.icon || Type;
            const isExpanded = expandedField === field.id;

            return (
              <div
                key={field.id}
                className={cn(
                  'bg-card border rounded-xl transition-all',
                  isExpanded ? 'border-primary ring-1 ring-primary/20' : 'border-border hover:border-primary/20'
                )}
              >
                {/* Collapsed Row */}
                <div
                  className="flex items-center gap-3 px-4 py-3 cursor-pointer"
                  onClick={() => setExpandedField(isExpanded ? null : field.id)}
                >
                  {!field.isDefault && (
                    <GripVertical className="size-4 text-muted-foreground/40 flex-shrink-0" />
                  )}
                  {field.isDefault && (
                    <Lock className="size-3.5 text-muted-foreground/40 flex-shrink-0" />
                  )}
                  <TypeIcon className="size-4 text-muted-foreground flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground flex-1">{field.label}</span>
                  <Badge variant="secondary" className="text-[10px] bg-muted text-muted-foreground border-border px-1.5 py-0">
                    {FIELD_TYPE_CONFIG[field.type]?.label || field.type}
                  </Badge>
                  {field.required && (
                    <Badge variant="secondary" className="text-[10px] bg-red-50 text-red-600 border-red-100 px-1.5 py-0">
                      Required
                    </Badge>
                  )}
                  {!field.isDefault && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveField(index, 'up'); }}
                        className="p-1 text-muted-foreground hover:text-foreground rounded"
                        disabled={index <= DEFAULT_FIELDS.length}
                      >
                        <ChevronUp className="size-3.5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleMoveField(index, 'down'); }}
                        className="p-1 text-muted-foreground hover:text-foreground rounded"
                        disabled={index >= fields.length - 1}
                      >
                        <ChevronDown className="size-3.5" />
                      </button>
                    </div>
                  )}
                  <ChevronDown className={cn('size-4 text-muted-foreground transition-transform', isExpanded && 'rotate-180')} />
                </div>

                {/* Expanded Editor */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-1 border-t border-border space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Label</Label>
                        <Input
                          value={field.label}
                          onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                          className="border-border h-8 text-sm"
                          disabled={field.isDefault}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Type</Label>
                        <Select
                          value={field.type}
                          onValueChange={(v) => handleUpdateField(field.id, { type: v as FormField['type'] })}
                          disabled={field.isDefault}
                        >
                          <SelectTrigger className="border-border h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(FIELD_TYPE_CONFIG).map(([key, conf]) => (
                              <SelectItem key={key} value={key}>
                                <span className="text-xs">{conf.label}</span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {field.type !== 'checkbox' && (
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Placeholder Text</Label>
                        <Input
                          value={field.placeholder || ''}
                          onChange={(e) => handleUpdateField(field.id, { placeholder: e.target.value })}
                          className="border-border h-8 text-sm"
                          placeholder="Enter placeholder text..."
                        />
                      </div>
                    )}

                    {field.type === 'select' && (
                      <div className="space-y-1.5">
                        <Label className="text-xs text-muted-foreground">Options (comma-separated)</Label>
                        <Input
                          value={(field.options || []).join(', ')}
                          onChange={(e) => handleUpdateField(field.id, {
                            options: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          })}
                          className="border-border h-8 text-sm"
                          placeholder="Option 1, Option 2, Option 3"
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-3">
                        <Label className="text-xs text-muted-foreground">Required</Label>
                        <button
                          onClick={() => handleUpdateField(field.id, { required: !field.required })}
                          className={cn(
                            'relative inline-flex h-5 w-9 items-center rounded-full transition-colors',
                            field.required ? 'bg-primary' : 'bg-muted border border-border'
                          )}
                        >
                          <span
                            className={cn(
                              'inline-block size-3.5 rounded-full bg-white transition-transform',
                              field.required ? 'translate-x-[18px]' : 'translate-x-[3px]'
                            )}
                          />
                        </button>
                      </div>
                      {!field.isDefault && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-7 text-xs text-red-600 border-red-200 hover:bg-red-50"
                          onClick={() => handleRemoveField(field.id)}
                        >
                          <Trash2 className="size-3 mr-1.5" />
                          Remove
                        </Button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Save */}
      <div className="flex justify-end pt-2">
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-none"
          onClick={() => toast.success('Registration form saved')}
        >
          <FileText className="size-3.5 mr-2" />
          Save Form
        </Button>
      </div>
    </div>
  );
}
