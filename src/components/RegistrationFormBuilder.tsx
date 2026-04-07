import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import {
  Plus, Trash2, GripVertical, Eye, X, ChevronDown, ChevronUp,
  Type, Mail, Phone, Building2, MapPin, List, CheckSquare,
  Calendar, Link2, FileText, Hash
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'date' | 'url' | 'number';
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  description?: string;
}

interface RegistrationFormBuilderProps {
  eventId?: string;
  onSave?: (fields: FormField[]) => void;
  existingFields?: FormField[];
}

const defaultFields: FormField[] = [
  {
    id: 'name',
    type: 'text',
    label: 'Full Name',
    placeholder: 'Enter your full name',
    required: true,
  },
  {
    id: 'email',
    type: 'email',
    label: 'Email Address',
    placeholder: 'your.email@example.com',
    required: true,
  },
];

const fieldTypes = [
  { value: 'text', label: 'Text', icon: Type },
  { value: 'email', label: 'Email', icon: Mail },
  { value: 'phone', label: 'Phone', icon: Phone },
  { value: 'textarea', label: 'Long Text', icon: FileText },
  { value: 'select', label: 'Dropdown', icon: List },
  { value: 'checkbox', label: 'Checkbox', icon: CheckSquare },
  { value: 'date', label: 'Date', icon: Calendar },
  { value: 'url', label: 'URL', icon: Link2 },
  { value: 'number', label: 'Number', icon: Hash },
];

export function RegistrationFormBuilder({ 
  eventId, 
  onSave,
  existingFields 
}: RegistrationFormBuilderProps) {
  const [fields, setFields] = useState<FormField[]>(existingFields || defaultFields);
  const [previewMode, setPreviewMode] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [showAddField, setShowAddField] = useState(false);

  const addField = (type: FormField['type']) => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      type,
      label: `New ${type} field`,
      placeholder: `Enter ${type}`,
      required: false,
    };
    setFields([...fields, newField]);
    setEditingField(newField.id);
    setShowAddField(false);
  };

  const updateField = (id: string, updates: Partial<FormField>) => {
    setFields(fields.map(f => f.id === id ? { ...f, ...updates } : f));
  };

  const removeField = (id: string) => {
    // Prevent removing default fields
    if (id === 'name' || id === 'email') return;
    setFields(fields.filter(f => f.id !== id));
  };

  const moveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...fields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fields.length) return;
    [newFields[index], newFields[targetIndex]] = [newFields[targetIndex], newFields[index]];
    setFields(newFields);
  };

  const handleSave = () => {
    onSave?.(fields);
  };

  const renderFieldEditor = (field: FormField, index: number) => {
    const isEditing = editingField === field.id;
    const isDefault = field.id === 'name' || field.id === 'email';

    return (
      <Card key={field.id} className="mb-3">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => moveField(index, 'up')}
                disabled={index === 0}
                className="text-muted-foreground/60 hover:text-muted-foreground disabled:opacity-30"
              >
                <ChevronUp className="size-4" />
              </button>
              <GripVertical className="size-4 text-muted-foreground/60" />
              <button
                onClick={() => moveField(index, 'down')}
                disabled={index === fields.length - 1}
                className="text-muted-foreground/60 hover:text-muted-foreground disabled:opacity-30"
              >
                <ChevronDown className="size-4" />
              </button>
            </div>

            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-3">
                  <div>
                    <Label>Field Label</Label>
                    <Input
                      value={field.label}
                      onChange={(e) => updateField(field.id, { label: e.target.value })}
                      placeholder="Enter field label"
                    />
                  </div>
                  
                  <div>
                    <Label>Placeholder Text</Label>
                    <Input
                      value={field.placeholder}
                      onChange={(e) => updateField(field.id, { placeholder: e.target.value })}
                      placeholder="Enter placeholder"
                    />
                  </div>

                  {field.type === 'select' && (
                    <div>
                      <Label>Options (comma separated)</Label>
                      <Input
                        value={field.options?.join(', ') || ''}
                        onChange={(e) => updateField(field.id, { 
                          options: e.target.value.split(',').map(o => o.trim()).filter(Boolean)
                        })}
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}

                  <div>
                    <Label>Description (Optional)</Label>
                    <Input
                      value={field.description || ''}
                      onChange={(e) => updateField(field.id, { description: e.target.value })}
                      placeholder="Add helpful description"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={field.required}
                        onCheckedChange={(checked) => updateField(field.id, { required: checked })}
                        disabled={isDefault}
                      />
                      <Label>Required Field</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingField(null)}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{field.label}</span>
                      {field.required && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                      {isDefault && (
                        <Badge variant="secondary" className="text-xs">Default</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingField(field.id)}
                      >
                        Edit
                      </Button>
                      {!isDefault && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeField(field.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Type: {field.type} • Placeholder: {field.placeholder}
                  </p>
                  {field.description && (
                    <p className="text-xs text-muted-foreground">{field.description}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const renderPreview = () => {
    return (
      <div className="space-y-4">
        {fields.map((field) => (
          <div key={field.id}>
            <Label>
              {field.label}
              {field.required && <span className="text-red-600 ml-1">*</span>}
            </Label>
            {field.description && (
              <p className="text-xs text-muted-foreground mt-1">{field.description}</p>
            )}
            <div className="mt-2">
              {field.type === 'textarea' ? (
                <Textarea placeholder={field.placeholder} />
              ) : field.type === 'select' ? (
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option, i) => (
                      <SelectItem key={i} value={option.toLowerCase()}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'checkbox' ? (
                <div className="flex items-center gap-2">
                  <input type="checkbox" className="size-4" />
                  <span className="text-sm">{field.placeholder}</span>
                </div>
              ) : (
                <Input type={field.type} placeholder={field.placeholder} />
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Registration Form</h3>
          <p className="text-sm text-gray-600">
            Customize the information you collect from attendees
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPreviewMode(!previewMode)}
          >
            <Eye className="size-4 mr-2" />
            {previewMode ? 'Edit' : 'Preview'}
          </Button>
          <Button size="sm" onClick={handleSave}>
            Save Form
          </Button>
        </div>
      </div>

      {previewMode ? (
        <Card>
          <CardHeader>
            <CardTitle>Registration Form Preview</CardTitle>
          </CardHeader>
          <CardContent>
            {renderPreview()}
          </CardContent>
        </Card>
      ) : (
        <>
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {fields.map((field, index) => renderFieldEditor(field, index))}
            </div>
          </ScrollArea>

          {showAddField ? (
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">Add Field</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowAddField(false)}
                  >
                    <X className="size-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {fieldTypes.map((type) => {
                    const Icon = type.icon;
                    return (
                      <Button
                        key={type.value}
                        variant="outline"
                        className="h-auto py-3 flex flex-col items-center gap-2"
                        onClick={() => addField(type.value as FormField['type'])}
                      >
                        <Icon className="size-5" />
                        <span className="text-xs">{type.label}</span>
                      </Button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setShowAddField(true)}
            >
              <Plus className="size-4 mr-2" />
              Add Field
            </Button>
          )}
        </>
      )}

      <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-100">
        <div className="size-8 rounded bg-primary flex items-center justify-center flex-shrink-0">
          <CheckSquare className="size-4 text-white" />
        </div>
        <div className="text-xs text-muted-foreground">
          <p className="font-medium text-foreground mb-0.5">Form Tips</p>
          <p>Name and Email are required fields and cannot be removed. Keep forms short to increase registrations.</p>
        </div>
      </div>
    </div>
  );
}