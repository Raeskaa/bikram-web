import { useState } from 'react';
import { HardDrive, File, Folder, Search, Filter, Grid, List, MoreVertical, Download, Trash2, Share2, Plus, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { useAuth, isEmptyStateUser } from '../contexts/AuthContext';
import { SectionEmptyState } from './SectionEmptyState';

export function MyDrive() {
  const { currentUser } = useAuth();
  const isEmpty = isEmptyStateUser(currentUser);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const files = isEmpty ? [] : [
    { id: '1', name: 'Course_Outline.pdf', size: '1.2 MB', type: 'pdf', date: 'Feb 5, 2026' },
    { id: '2', name: 'Student_Feedback.xlsx', size: '450 KB', type: 'excel', date: 'Feb 4, 2026' },
    { id: '3', name: 'Lesson_1_Video.mp4', size: '124 MB', type: 'video', date: 'Feb 2, 2026' },
    { id: '4', name: 'Brand_Assets', size: '--', type: 'folder', date: 'Jan 30, 2026' },
  ];

  return (
    <div className="flex flex-col h-full bg-background">
      <div className="border-b border-border px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-foreground">My Drive</h1>
            <p className="text-sm text-muted-foreground">Manage your course assets and learner materials.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="h-10 rounded-lg px-4 text-xs font-semibold gap-2">
              <Folder className="size-4" /> New Folder
            </Button>
            <Button className="h-10 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 text-xs font-semibold gap-2 shadow-none">
              <Plus className="size-4" /> Upload
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input className="pl-10 h-10 bg-muted border-border rounded-xl text-sm" placeholder="Search your drive..." />
          </div>
          <div className="flex items-center gap-1 bg-muted p-1 rounded-xl border border-border">
            <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg ${viewMode === 'grid' ? 'bg-card text-primary' : 'text-muted-foreground'}`}><Grid className="size-4" /></button>
            <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-lg ${viewMode === 'list' ? 'bg-card text-primary' : 'text-muted-foreground'}`}><List className="size-4" /></button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        {files.length === 0 ? (
          <SectionEmptyState
            icon={HardDrive}
            title="Your drive is empty"
            description="Upload files, create folders, and organize assets for your courses, events, and communities."
            actionLabel="Upload Your First File"
            onAction={() => {}}
            secondaryLabel="New Folder"
            onSecondaryAction={() => {}}
            hint="Drag and drop files here or click upload"
          />
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {files.map(file => (
            <div key={file.id} className="bg-card border border-border p-5 rounded-2xl group hover:border-primary/20 transition-all cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${file.type === 'folder' ? 'bg-amber-50 text-amber-600' : 'bg-primary/10 text-primary'}`}>
                  {file.type === 'folder' ? <Folder className="size-6" /> : <File className="size-6" />}
                </div>
                <button className="text-muted-foreground/30 hover:text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="size-4" />
                </button>
              </div>
              <h3 className="text-sm font-semibold text-foreground truncate mb-1">{file.name}</h3>
              <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground uppercase tracking-normal">
                <span>{file.size}</span>
                <span>{file.date}</span>
              </div>
            </div>
          ))}
        </div>
        )}
      </div>
    </div>
  );
}
