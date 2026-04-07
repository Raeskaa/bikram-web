# 🎯 Global Chrome - Complete Specification

## 📋 Executive Summary

The **Global Chrome** is the foundational layer that wraps the entire application. It must be built **once, perfectly** because:

1. ✅ Visible on every page (except full-screen modes)
2. ✅ Contains all global state and context
3. ✅ Provides services to all child components
4. ✅ Changes to it affect the entire application
5. ✅ Must be rock-solid before building features

**Current Status: 60% complete**
- ✅ Visual structure exists
- ❌ State management is broken
- ❌ Context system is missing
- ❌ Core features are non-functional

**Goal: Build it to 100%, then NEVER touch the core again**

---

## 🏗️ ARCHITECTURE OVERVIEW

```
┌─────────────────────────────────────────────────────────────────┐
│  GLOBAL CHROME SYSTEM                                           │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  GlobalChromeProvider (Context)                          │   │
│  │  ├─ AuthContext        (user, permissions, session)     │   │
│  │  ├─- AppStateContext    (navigation, mode, history)      │   │
│  │  ├─ LeapyContext       (AI context, suggestions)        │   │
│  │  ├─ NotificationContext (alerts, toasts, inbox)         │   │
│  │  └─ PreferencesContext (theme, locale, shortcuts)       │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                     │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │  GlobalChromeLayout (UI)                                 │   │
│  │  ├─ TopBar           (banner, header, actions)          │   │
│  │  ├─ Sidebar          (navigation, recent, favorites)    │   │
│  │  ├─ MainContent      (children - page content)          │   │
│  │  ├─ LeapyPanel       (AI assistant sidebar)             │   │
│  │  ├─ CommandPalette   (⌘K search)                        │   │
│  │  ├─ NotificationCenter (bell dropdown)                   │   │
│  │  └─ FloatingElements  (minimized meeting, etc.)         │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📐 LAYER 1: CONTEXT SYSTEM

### 1.1 GlobalChromeProvider

**File:** `/contexts/GlobalChromeContext.tsx`

**Purpose:** Single source of truth for ALL global state

```typescript
import { createContext, useContext, ReactNode, useState, useEffect } from 'react'

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================

interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'creator' | 'learner' | 'both'
  subscription: {
    tier: 'free' | 'pro' | 'enterprise'
    features: string[]
    limits: {
      maxCommunities: number
      maxCourses: number
      maxEvents: number
      maxMembers: number
    }
  }
  preferences: UserPreferences
  onboarding: {
    completed: boolean
    currentStep?: string
  }
}

interface UserPreferences {
  mode: 'creator' | 'learner'  // Current active mode
  theme: 'light' | 'dark' | 'auto'
  locale: string
  notifications: {
    email: boolean
    push: boolean
    inApp: boolean
    digest: 'realtime' | 'daily' | 'weekly'
  }
  leapy: {
    enabled: boolean
    proactive: boolean  // Auto-suggestions
    position: 'right' | 'left'
  }
  shortcuts: Record<string, string>
}

interface NavigationState {
  currentPath: string
  previousPath: string | null
  history: string[]  // Last 20 paths
  breadcrumbs: Breadcrumb[]
}

interface Breadcrumb {
  label: string
  path: string
  icon?: string
}

interface LeapyState {
  isOpen: boolean
  context: {
    page: string           // '/communities/abc123'
    pageType: 'list' | 'detail' | 'editor' | 'dashboard'
    contentType: 'community' | 'course' | 'event' | null
    contentId: string | null
    section: string | null  // 'members' | 'analytics' | etc.
    focusedElement: string | null
    focusedField: string | null
    isEmpty: boolean
  }
  recentActions: Action[]  // Last 50 actions
  suggestions: Suggestion[]
  conversationHistory: LeapyMessage[]
}

interface Action {
  id: string
  type: string  // 'member.invited', 'course.created', etc.
  timestamp: Date
  userId: string
  metadata: Record<string, any>
  success: boolean
}

interface Suggestion {
  id: string
  type: 'action' | 'tip' | 'warning' | 'growth' | 'ai-generate'
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  action?: {
    type: string
    payload?: any
  }
  icon: string
  cta?: string
  dismissible: boolean
  expiresAt?: Date
}

interface LeapyMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  context?: any
}

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  category: 'system' | 'community' | 'course' | 'event' | 'social'
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionable: boolean
  action?: {
    label: string
    onClick: () => void
  }
  link?: string
  avatar?: string
  metadata?: Record<string, any>
}

interface RecentItem {
  type: 'community' | 'course' | 'event'
  id: string
  title: string
  timestamp: Date
  thumbnail?: string
}

interface FavoriteItem {
  type: 'community' | 'course' | 'event'
  id: string
  title: string
  addedAt: Date
  thumbnail?: string
}

// ============================================================================
// CONTEXT STATE
// ============================================================================

interface GlobalChromeState {
  // Authentication
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  
  // Navigation
  navigation: NavigationState
  
  // UI State
  sidebarOpen: boolean
  sidebarCollapsed: boolean
  
  // Leapy AI
  leapy: LeapyState
  
  // Notifications
  notifications: Notification[]
  unreadCount: number
  
  // Recent & Favorites
  recentItems: RecentItem[]
  favorites: FavoriteItem[]
  
  // Global modals
  commandPaletteOpen: boolean
  feedbackModalOpen: boolean
  
  // Meeting state (for floating window)
  activeMeeting: {
    eventId: string
    eventTitle: string
    isMinimized: boolean
    audioEnabled: boolean
    videoEnabled: boolean
  } | null
}

// ============================================================================
// CONTEXT ACTIONS
// ============================================================================

interface GlobalChromeActions {
  // Auth
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  updateUser: (updates: Partial<User>) => Promise<void>
  updatePreferences: (prefs: Partial<UserPreferences>) => Promise<void>
  
  // Navigation
  navigate: (path: string) => void
  goBack: () => void
  updateBreadcrumbs: (crumbs: Breadcrumb[]) => void
  
  // Sidebar
  toggleSidebar: () => void
  collapseSidebar: (collapsed: boolean) => void
  
  // Leapy
  openLeapy: () => void
  closeLeapy: () => void
  toggleLeapy: () => void
  updateLeapyContext: (context: Partial<LeapyState['context']>) => void
  trackAction: (action: Omit<Action, 'id' | 'timestamp' | 'userId'>) => void
  sendLeapyMessage: (message: string) => Promise<void>
  dismissSuggestion: (id: string) => void
  executeSuggestion: (suggestion: Suggestion) => Promise<void>
  
  // Notifications
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void
  markAsRead: (id: string) => void
  markAllAsRead: () => void
  deleteNotification: (id: string) => void
  clearAllNotifications: () => void
  
  // Recent & Favorites
  addToRecent: (item: Omit<RecentItem, 'timestamp'>) => void
  addToFavorites: (item: Omit<FavoriteItem, 'addedAt'>) => void
  removeFromFavorites: (type: string, id: string) => void
  
  // Command Palette
  openCommandPalette: () => void
  closeCommandPalette: () => void
  
  // Meeting
  startMeeting: (eventId: string, eventTitle: string) => void
  minimizeMeeting: () => void
  maximizeMeeting: () => void
  endMeeting: () => void
  toggleMeetingAudio: () => void
  toggleMeetingVideo: () => void
}

type GlobalChromeContextType = GlobalChromeState & GlobalChromeActions

// ============================================================================
// CONTEXT IMPLEMENTATION
// ============================================================================

const GlobalChromeContext = createContext<GlobalChromeContextType | null>(null)

export function GlobalChromeProvider({ children }: { children: ReactNode }) {
  // ========== STATE ==========
  
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  const [navigation, setNavigation] = useState<NavigationState>({
    currentPath: '/',
    previousPath: null,
    history: [],
    breadcrumbs: []
  })
  
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  
  const [leapy, setLeapy] = useState<LeapyState>({
    isOpen: false,
    context: {
      page: '/',
      pageType: 'dashboard',
      contentType: null,
      contentId: null,
      section: null,
      focusedElement: null,
      focusedField: null,
      isEmpty: false
    },
    recentActions: [],
    suggestions: [],
    conversationHistory: []
  })
  
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [recentItems, setRecentItems] = useState<RecentItem[]>([])
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false)
  const [activeMeeting, setActiveMeeting] = useState<GlobalChromeState['activeMeeting']>(null)
  
  // ========== COMPUTED VALUES ==========
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  // ========== EFFECTS ==========
  
  // Initialize user from localStorage/API
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token')
        if (token) {
          // TODO: Validate token with API
          const userData = await fetchUserData(token)
          setUser(userData)
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error('Auth initialization failed:', error)
        localStorage.removeItem('auth_token')
      } finally {
        setIsLoading(false)
      }
    }
    
    initializeAuth()
  }, [])
  
  // Load preferences from localStorage
  useEffect(() => {
    if (user) {
      const savedPrefs = localStorage.getItem(`prefs_${user.id}`)
      if (savedPrefs) {
        const prefs = JSON.parse(savedPrefs)
        setUser(prev => prev ? { ...prev, preferences: { ...prev.preferences, ...prefs } } : null)
      }
    }
  }, [user?.id])
  
  // Track navigation changes
  useEffect(() => {
    const handleRouteChange = () => {
      const path = window.location.pathname
      setNavigation(prev => ({
        currentPath: path,
        previousPath: prev.currentPath,
        history: [path, ...prev.history].slice(0, 20),
        breadcrumbs: generateBreadcrumbs(path)
      }))
    }
    
    window.addEventListener('popstate', handleRouteChange)
    return () => window.removeEventListener('popstate', handleRouteChange)
  }, [])
  
  // Update Leapy suggestions when context changes
  useEffect(() => {
    const suggestions = generateSuggestions(leapy.context, leapy.recentActions, user)
    setLeapy(prev => ({ ...prev, suggestions }))
  }, [leapy.context, leapy.recentActions, user])
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K - Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCommandPaletteOpen(true)
      }
      
      // Command/Ctrl + L - Toggle Leapy
      if ((e.metaKey || e.ctrlKey) && e.key === 'l') {
        e.preventDefault()
        setLeapy(prev => ({ ...prev, isOpen: !prev.isOpen }))
      }
      
      // Command/Ctrl + \ - Toggle Sidebar
      if ((e.metaKey || e.ctrlKey) && e.key === '\\') {
        e.preventDefault()
        setSidebarOpen(prev => !prev)
      }
      
      // ESC - Close modals
      if (e.key === 'Escape') {
        setCommandPaletteOpen(false)
        if (leapy.isOpen) setLeapy(prev => ({ ...prev, isOpen: false }))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [leapy.isOpen])
  
  // ========== ACTIONS ==========
  
  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // TODO: API call
      const response = await api.login(email, password)
      localStorage.setItem('auth_token', response.token)
      setUser(response.user)
      setIsAuthenticated(true)
      
      addNotification({
        type: 'success',
        category: 'system',
        title: 'Welcome back!',
        message: `You're logged in as ${response.user.name}`,
        read: false,
        actionable: false
      })
    } catch (error) {
      addNotification({
        type: 'error',
        category: 'system',
        title: 'Login failed',
        message: error.message,
        read: false,
        actionable: false
      })
      throw error
    } finally {
      setIsLoading(false)
    }
  }
  
  const logout = async () => {
    try {
      await api.logout()
      localStorage.removeItem('auth_token')
      setUser(null)
      setIsAuthenticated(false)
      setNotifications([])
      setRecentItems([])
      setFavorites([])
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }
  
  const updateUser = async (updates: Partial<User>) => {
    if (!user) return
    
    try {
      const updatedUser = await api.updateUser(user.id, updates)
      setUser(updatedUser)
    } catch (error) {
      console.error('Update user failed:', error)
      throw error
    }
  }
  
  const updatePreferences = async (prefs: Partial<UserPreferences>) => {
    if (!user) return
    
    const newPrefs = { ...user.preferences, ...prefs }
    setUser({ ...user, preferences: newPrefs })
    
    // Save to localStorage
    localStorage.setItem(`prefs_${user.id}`, JSON.stringify(newPrefs))
    
    // Sync to server
    try {
      await api.updatePreferences(user.id, newPrefs)
    } catch (error) {
      console.error('Failed to sync preferences:', error)
    }
  }
  
  const navigate = (path: string) => {
    window.history.pushState(null, '', path)
    setNavigation(prev => ({
      currentPath: path,
      previousPath: prev.currentPath,
      history: [path, ...prev.history].slice(0, 20),
      breadcrumbs: generateBreadcrumbs(path)
    }))
  }
  
  const goBack = () => {
    if (navigation.previousPath) {
      navigate(navigation.previousPath)
    } else {
      window.history.back()
    }
  }
  
  const updateBreadcrumbs = (crumbs: Breadcrumb[]) => {
    setNavigation(prev => ({ ...prev, breadcrumbs: crumbs }))
  }
  
  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev)
  }
  
  const collapseSidebar = (collapsed: boolean) => {
    setSidebarCollapsed(collapsed)
  }
  
  const openLeapy = () => {
    setLeapy(prev => ({ ...prev, isOpen: true }))
  }
  
  const closeLeapy = () => {
    setLeapy(prev => ({ ...prev, isOpen: false }))
  }
  
  const toggleLeapy = () => {
    setLeapy(prev => ({ ...prev, isOpen: !prev.isOpen }))
  }
  
  const updateLeapyContext = (context: Partial<LeapyState['context']>) => {
    setLeapy(prev => ({
      ...prev,
      context: { ...prev.context, ...context }
    }))
  }
  
  const trackAction = (action: Omit<Action, 'id' | 'timestamp' | 'userId'>) => {
    if (!user) return
    
    const fullAction: Action = {
      ...action,
      id: generateId(),
      timestamp: new Date(),
      userId: user.id
    }
    
    setLeapy(prev => ({
      ...prev,
      recentActions: [fullAction, ...prev.recentActions].slice(0, 50)
    }))
    
    // Send to analytics
    analytics.track(fullAction)
  }
  
  const sendLeapyMessage = async (message: string) => {
    const userMessage: LeapyMessage = {
      id: generateId(),
      role: 'user',
      content: message,
      timestamp: new Date(),
      context: leapy.context
    }
    
    setLeapy(prev => ({
      ...prev,
      conversationHistory: [...prev.conversationHistory, userMessage]
    }))
    
    try {
      // TODO: AI API call
      const response = await api.sendLeapyMessage({
        message,
        context: leapy.context,
        history: leapy.conversationHistory
      })
      
      const assistantMessage: LeapyMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.message,
        timestamp: new Date()
      }
      
      setLeapy(prev => ({
        ...prev,
        conversationHistory: [...prev.conversationHistory, assistantMessage]
      }))
    } catch (error) {
      console.error('Leapy message failed:', error)
    }
  }
  
  const dismissSuggestion = (id: string) => {
    setLeapy(prev => ({
      ...prev,
      suggestions: prev.suggestions.filter(s => s.id !== id)
    }))
  }
  
  const executeSuggestion = async (suggestion: Suggestion) => {
    if (suggestion.action) {
      // Execute the action
      await handleSuggestionAction(suggestion.action)
    }
    
    // Remove from suggestions
    dismissSuggestion(suggestion.id)
    
    // Track execution
    trackAction({
      type: 'suggestion.executed',
      metadata: { suggestionId: suggestion.id, suggestionType: suggestion.type },
      success: true
    })
  }
  
  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const fullNotification: Notification = {
      ...notification,
      id: generateId(),
      timestamp: new Date()
    }
    
    setNotifications(prev => [fullNotification, ...prev])
    
    // Show toast for high-priority notifications
    if (notification.type === 'error' || notification.type === 'warning') {
      toast(notification.title, { description: notification.message })
    }
  }
  
  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }
  
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }
  
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id))
  }
  
  const clearAllNotifications = () => {
    setNotifications([])
  }
  
  const addToRecent = (item: Omit<RecentItem, 'timestamp'>) => {
    const fullItem: RecentItem = {
      ...item,
      timestamp: new Date()
    }
    
    // Remove duplicate if exists
    const filtered = recentItems.filter(i => !(i.type === item.type && i.id === item.id))
    
    // Add to front, keep last 20
    setRecentItems([fullItem, ...filtered].slice(0, 20))
  }
  
  const addToFavorites = (item: Omit<FavoriteItem, 'addedAt'>) => {
    // Check if already favorited
    const exists = favorites.some(f => f.type === item.type && f.id === item.id)
    if (exists) return
    
    const fullItem: FavoriteItem = {
      ...item,
      addedAt: new Date()
    }
    
    setFavorites([...favorites, fullItem])
  }
  
  const removeFromFavorites = (type: string, id: string) => {
    setFavorites(prev => prev.filter(f => !(f.type === type && f.id === id)))
  }
  
  const openCommandPalette = () => {
    setCommandPaletteOpen(true)
  }
  
  const closeCommandPalette = () => {
    setCommandPalette Open(false)
  }
  
  const startMeeting = (eventId: string, eventTitle: string) => {
    setActiveMeeting({
      eventId,
      eventTitle,
      isMinimized: false,
      audioEnabled: true,
      videoEnabled: true
    })
  }
  
  const minimizeMeeting = () => {
    setActiveMeeting(prev => prev ? { ...prev, isMinimized: true } : null)
  }
  
  const maximizeMeeting = () => {
    setActiveMeeting(prev => prev ? { ...prev, isMinimized: false } : null)
  }
  
  const endMeeting = () => {
    setActiveMeeting(null)
  }
  
  const toggleMeetingAudio = () => {
    setActiveMeeting(prev =>
      prev ? { ...prev, audioEnabled: !prev.audioEnabled } : null
    )
  }
  
  const toggleMeetingVideo = () => {
    setActiveMeeting(prev =>
      prev ? { ...prev, videoEnabled: !prev.videoEnabled } : null
    )
  }
  
  // ========== CONTEXT VALUE ==========
  
  const value: GlobalChromeContextType = {
    // State
    user,
    isAuthenticated,
    isLoading,
    navigation,
    sidebarOpen,
    sidebarCollapsed,
    leapy,
    notifications,
    unreadCount,
    recentItems,
    favorites,
    commandPaletteOpen,
    feedbackModalOpen,
    activeMeeting,
    
    // Actions
    login,
    logout,
    updateUser,
    updatePreferences,
    navigate,
    goBack,
    updateBreadcrumbs,
    toggleSidebar,
    collapseSidebar,
    openLeapy,
    closeLeapy,
    toggleLeapy,
    updateLeapyContext,
    trackAction,
    sendLeapyMessage,
    dismissSuggestion,
    executeSuggestion,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    addToRecent,
    addToFavorites,
    removeFromFavorites,
    openCommandPalette,
    closeCommandPalette,
    startMeeting,
    minimizeMeeting,
    maximizeMeeting,
    endMeeting,
    toggleMeetingAudio,
    toggleMeetingVideo
  }
  
  return (
    <GlobalChromeContext.Provider value={value}>
      {children}
    </GlobalChromeContext.Provider>
  )
}

// ============================================================================
// CUSTOM HOOK
// ============================================================================

export function useGlobalChrome() {
  const context = useContext(GlobalChromeContext)
  if (!context) {
    throw new Error('useGlobalChrome must be used within GlobalChromeProvider')
  }
  return context
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function generateBreadcrumbs(path: string): Breadcrumb[] {
  const segments = path.split('/').filter(Boolean)
  const breadcrumbs: Breadcrumb[] = [{ label: 'Home', path: '/', icon: 'home' }]
  
  let currentPath = ''
  for (const segment of segments) {
    currentPath += `/${segment}`
    const label = humanize(segment)
    breadcrumbs.push({ label, path: currentPath })
  }
  
  return breadcrumbs
}

function humanize(str: string): string {
  return str
    .replace(/-/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, l => l.toUpperCase())
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

function generateSuggestions(
  context: LeapyState['context'],
  actions: Action[],
  user: User | null
): Suggestion[] {
  // TODO: Implement intelligent suggestion engine
  return []
}

async function handleSuggestionAction(action: Suggestion['action']): Promise<void> {
  // TODO: Implement action handlers
}

async function fetchUserData(token: string): Promise<User> {
  // TODO: API call
  return {} as User
}

// Placeholder API
const api = {
  login: async (email: string, password: string) => ({ token: '', user: {} as User }),
  logout: async () => {},
  updateUser: async (id: string, updates: Partial<User>) => ({} as User),
  updatePreferences: async (id: string, prefs: UserPreferences) => {},
  sendLeapyMessage: async (payload: any) => ({ message: '' })
}

const analytics = {
  track: (action: Action) => {}
}

const toast = (title: string, options?: any) => {}
```

---

## 📐 LAYER 2: UI COMPONENTS

### 2.1 GlobalChromeLayout

**File:** `/components/GlobalChromeLayout.tsx`

```typescript
import { ReactNode } from 'react'
import { useGlobalChrome } from '@/contexts/GlobalChromeContext'
import { TopBar } from './chrome/TopBar'
import { Sidebar } from './chrome/Sidebar'
import { LeapyPanel } from './chrome/LeapyPanel'
import { CommandPalette } from './chrome/CommandPalette'
import { NotificationCenter } from './chrome/NotificationCenter'
import { MinimizedMeeting } from './chrome/MinimizedMeeting'
import { Toaster } from './ui/sonner'

interface GlobalChromeLayoutProps {
  children: ReactNode
  fullScreen?: boolean  // For pages like meeting room
}

export function GlobalChromeLayout({ children, fullScreen = false }: GlobalChromeLayoutProps) {
  const {
    sidebarOpen,
    sidebarCollapsed,
    leapy,
    commandPaletteOpen,
    activeMeeting
  } = useGlobalChrome()
  
  // Full screen mode (no chrome)
  if (fullScreen) {
    return <>{children}</>
  }
  
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Top Bar */}
      <TopBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && <Sidebar collapsed={sidebarCollapsed} />}
        
        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-50">
          {children}
        </main>
        
        {/* Leapy Panel */}
        {leapy.isOpen && <LeapyPanel />}
      </div>
      
      {/* Command Palette (⌘K) */}
      {commandPaletteOpen && <CommandPalette />}
      
      {/* Notification Center */}
      <NotificationCenter />
      
      {/* Minimized Meeting */}
      {activeMeeting?.isMinimized && <MinimizedMeeting />}
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
```

### 2.2 TopBar Component

**File:** `/components/chrome/TopBar.tsx`

```typescript
import { useGlobalChrome } from '@/contexts/GlobalChromeContext'
import { Menu, Search, Bell, Command, Calendar, Settings, LogOut } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import LeapyLogo from '@/imports/Button'
import TrueLeapLogo from '@/imports/Frame315115'

export function TopBar() {
  const {
    user,
    navigation,
    sidebarOpen,
    toggleSidebar,
    toggleLeapy,
    openCommandPalette,
    unreadCount,
    logout
  } = useGlobalChrome()
  
  return (
    <>
      {/* Banner */}
      <div className="bg-[#420D74] h-[33px] flex items-center justify-between px-5">
        <p className="text-white text-sm tracking-tight">
          Leaper V2.1 available, You can now create automations around events
        </p>
        <button className="text-white hover:opacity-80">×</button>
      </div>
      
      {/* Main Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm h-[73px] px-6 flex items-center justify-between">
        {/* Left */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label={sidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          >
            <Menu className="size-5 text-gray-700" />
          </button>
          <div className="w-[98px] h-[40px]">
            <TrueLeapLogo />
          </div>
        </div>
        
        {/* Center - Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          {navigation.breadcrumbs.map((crumb, i) => (
            <div key={crumb.path} className="flex items-center gap-2">
              {i > 0 && <span>/</span>}
              <button
                onClick={() => navigate(crumb.path)}
                className="hover:text-gray-900"
              >
                {crumb.label}
              </button>
            </div>
          ))}
        </div>
        
        {/* Right */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <button
            onClick={openCommandPalette}
            className="relative w-64 h-9 pl-9 pr-16 bg-gray-50 border border-gray-200 rounded-lg text-sm text-left text-gray-500 hover:border-gray-300 transition-colors"
          >
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <span>Search...</span>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-0.5 bg-white border border-gray-200 rounded">
              <Command className="size-2.5" />
              <span className="text-xs">K</span>
            </div>
          </button>
          
          {/* Stats Widget */}
          <div className="flex items-center gap-2 px-3 h-9 bg-gray-50 border border-gray-200 rounded-lg">
            <Calendar className="size-4 text-purple-600" />
            <div className="flex items-center gap-1 text-sm">
              <span className="font-medium text-gray-900">33</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">45</span>
            </div>
            <span className="text-purple-600 font-medium text-base">+</span>
          </div>
          
          {/* Notifications */}
          <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="size-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 size-2 bg-red-500 rounded-full" />
            )}
          </button>
          
          {/* Leapy Toggle */}
          <button
            onClick={toggleLeapy}
            className="size-9 flex items-center justify-center hover:opacity-80 transition-opacity"
            aria-label="Toggle Leapy AI Assistant"
          >
            <LeapyLogo />
          </button>
          
          {/* User Menu */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 hover:opacity-80">
                  <Avatar className="size-9">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="size-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout}>
                  <LogOut className="size-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <button className="px-4 h-9 bg-[#420D74] text-white rounded-md font-medium text-sm hover:bg-[#350a5f] transition-colors">
              Sign in
            </button>
          )}
        </div>
      </div>
    </>
  )
}
```

---

## 🎯 IMPLEMENTATION CHECKLIST

### Phase 1: Context System (Week 1)
- [ ] Create `/contexts/GlobalChromeContext.tsx`
- [ ] Implement all state management
- [ ] Implement all actions
- [ ] Add localStorage persistence
- [ ] Add keyboard shortcuts
- [ ] Write tests for context

### Phase 2: Core UI (Week 1)
- [ ] Create `GlobalChromeLayout.tsx`
- [ ] Build `TopBar.tsx` component
- [ ] Build `Sidebar.tsx` component (refactor existing)
- [ ] Build `LeapyPanel.tsx` (context-aware version)
- [ ] Build `CommandPalette.tsx` (⌘K search)
- [ ] Build `NotificationCenter.tsx`

### Phase 3: Integration (Week 2)
- [ ] Wrap `App.tsx` with `GlobalChromeProvider`
- [ ] Replace all local state with global context
- [ ] Remove props drilling (use `useGlobalChrome()` everywhere)
- [ ] Test all features work

### Phase 4: Polish (Week 2)
- [ ] Add loading states
- [ ] Add error boundaries
- [ ] Add accessibility (ARIA, keyboard nav)
- [ ] Add animations/transitions
- [ ] Mobile responsive design
- [ ] Documentation

---

## ✅ SUCCESS CRITERIA

**Global Chrome is COMPLETE when:**

1. ✅ All state lives in `GlobalChromeContext`
2. ✅ Zero props drilling (everything uses hooks)
3. ✅ Authentication works end-to-end
4. ✅ Navigation with browser history works
5. ✅ Search (⌘K) is functional
6. ✅ Notifications work (in-app + toast)
7. ✅ Leapy knows context on every page
8. ✅ Keyboard shortcuts work
9. ✅ Breadcrumbs auto-generate
10. ✅ Recent items track automatically
11. ✅ Everything persists across refreshes
12. ✅ Full TypeScript coverage
13. ✅ Comprehensive tests
14. ✅ Documentation complete

**Then we NEVER touch the core again** (only add new features via plugins).

---

**Should we start building this?** 🚀
