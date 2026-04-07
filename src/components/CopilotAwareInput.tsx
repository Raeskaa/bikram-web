import { useEffect, useRef } from 'react';
import { useCopilot } from '../contexts/CopilotContext';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface CopilotAwareInputProps {
  fieldName: string;
  value?: string;
  type?: 'input' | 'textarea';
  [key: string]: any;
}

export function CopilotAwareInput({ fieldName, value, type = 'input', ...props }: CopilotAwareInputProps) {
  const { setCurrentFocus } = useCopilot();
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  const handleFocus = () => {
    setCurrentFocus({
      type: 'field',
      name: fieldName,
      value: value
    });
  };

  const handleBlur = () => {
    // Optional: Clear focus when user leaves the field
    // setCurrentFocus(undefined);
  };

  if (type === 'textarea') {
    return (
      <Textarea
        ref={inputRef as any}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={value}
        {...props}
      />
    );
  }

  return (
    <Input
      ref={inputRef as any}
      onFocus={handleFocus}
      onBlur={handleBlur}
      value={value}
      {...props}
    />
  );
}
