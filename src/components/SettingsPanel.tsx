import { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface SettingsPanelProps {
  onClose: () => void;
}

export function SettingsPanel({ onClose }: SettingsPanelProps) {
  const [temperature, setTemperature] = useState([0.7]);
  const [maxTokens, setMaxTokens] = useState([2048]);
  const [topP, setTopP] = useState([0.9]);
  const [model, setModel] = useState('gemini-pro');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-gray-900">Model Settings</h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="size-4" />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select value={model} onValueChange={setModel}>
              <SelectTrigger id="model">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="gemini-pro">Gemini Pro</SelectItem>
                <SelectItem value="gemini-pro-vision">Gemini Pro Vision</SelectItem>
                <SelectItem value="gemini-ultra">Gemini Ultra</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Temperature</Label>
              <span className="text-gray-500 text-xs">{temperature[0].toFixed(2)}</span>
            </div>
            <Slider
              value={temperature}
              onValueChange={setTemperature}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            <p className="text-gray-500 text-xs">
              Controls randomness. Lower is more focused, higher is more creative.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Max Tokens</Label>
              <span className="text-gray-500 text-xs">{maxTokens[0]}</span>
            </div>
            <Slider
              value={maxTokens}
              onValueChange={setMaxTokens}
              min={256}
              max={4096}
              step={256}
              className="w-full"
            />
            <p className="text-gray-500 text-xs">
              Maximum length of the response.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Top P</Label>
              <span className="text-gray-500 text-xs">{topP[0].toFixed(2)}</span>
            </div>
            <Slider
              value={topP}
              onValueChange={setTopP}
              min={0}
              max={1}
              step={0.01}
              className="w-full"
            />
            <p className="text-gray-500 text-xs">
              Controls diversity via nucleus sampling.
            </p>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex gap-2 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onClose}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
