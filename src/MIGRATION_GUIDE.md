# PublicEventLanding Tab-Based Migration - Implementation Guide

## ✅ COMPLETED

### 1. Created All Tabbed Components
- ✅ **PublicEventLandingV1Tabbed.tsx** - Professional dark theme
- ✅ **PublicEventLandingV2Tabbed.tsx** - Balanced clean style
- ✅ **PublicEventLandingV3Tabbed.tsx** - Community-focused purple theme
- ✅ **PublicEventLandingV4Tabbed.tsx** - Minimal (already existed)
- ✅ **PublicEventLandingV5Tabbed.tsx** - Playful with gradients

### 2. Updated PublicEventLanding.tsx
- ✅ Imported all 5 tabbed components (V1-V5)
- ✅ Replaced V1 section with `<PublicEventLandingV1Tabbed />` (lines 1314-1525)

## ⏳ REMAINING WORK

### 3. Replace V2, V3, and V5 in PublicEventLanding.tsx

You need to replace the old implementations with the new tabbed components.

#### **V2 Replacement** (around lines 1346-1543)

**Find this:**
```tsx
{/* V2: BALANCED */}
{uiVersion === 'v2' && (
  <div className="max-w-4xl mx-auto px-6 py-4">
    {/* ... lots of old V2 code ... */}
  </div>
)}
```

**Replace with:**
```tsx
{/* V2: BALANCED - Tab-Based Layout */}
{uiVersion === 'v2' && (
  <PublicEventLandingV2Tabbed
    event={event}
    onEnterLiveEvent={onEnterLiveEvent}
    onJoinLeapSpace={onJoinLeapSpace}
    ShareMenu={ShareMenu}
    AddToCalendarButton={AddToCalendarButton}
    TrustBadges={TrustBadges}
    isSaved={isSaved}
    setIsSaved={setIsSaved}
    setAskOrganizerOpen={setAskOrganizerOpen}
    setAttendeeListOpen={setAttendeeListOpen}
    spotsRemaining={spotsRemaining}
    isPaidEvent={isPaidEvent}
    hostStats={hostStats}
    attendees={attendees}
    attendeeStats={attendeeStats}
    leapSpaceInfo={leapSpaceInfo}
    agenda={agenda}
    whatsIncluded={whatsIncluded}
    learningOutcomes={learningOutcomes}
    resources={resources}
    preWorkLinks={preWorkLinks}
    reviews={reviews}
    averageRating={averageRating}
    totalReviews={totalReviews}
    faqs={faqs}
    chatMessages={chatMessages}
  />
)}
```

#### **V3 Replacement** (around lines 1545-1929)

**Find this:**
```tsx
{/* V3: COMMUNITY */}
{uiVersion === 'v3' && (
  <div className="max-w-4xl mx-auto px-6 py-4">
    {/* ... lots of old V3 code ... */}
  </div>
)}
```

**Replace with:**
```tsx
{/* V3: COMMUNITY - Tab-Based Layout */}
{uiVersion === 'v3' && (
  <PublicEventLandingV3Tabbed
    event={event}
    onEnterLiveEvent={onEnterLiveEvent}
    onJoinLeapSpace={onJoinLeapSpace}
    ShareMenu={ShareMenu}
    AddToCalendarButton={AddToCalendarButton}
    TrustBadges={TrustBadges}
    isSaved={isSaved}
    setIsSaved={setIsSaved}
    setAskOrganizerOpen={setAskOrganizerOpen}
    setAttendeeListOpen={setAttendeeListOpen}
    spotsRemaining={spotsRemaining}
    isPaidEvent={isPaidEvent}
    hostStats={hostStats}
    attendees={attendees}
    attendeeStats={attendeeStats}
    leapSpaceInfo={leapSpaceInfo}
    agenda={agenda}
    whatsIncluded={whatsIncluded}
    learningOutcomes={learningOutcomes}
    resources={resources}
    preWorkLinks={preWorkLinks}
    reviews={reviews}
    averageRating={averageRating}
    totalReviews={totalReviews}
    faqs={faqs}
    chatMessages={chatMessages}
  />
)}
```

#### **V5 Replacement** (around lines 1963-2322)

**Find this:**
```tsx
{/* V5: PLAYFUL */}
{uiVersion === 'v5' && (
  <div className="bg-purple-50 min-h-full">
    {/* ... lots of old V5 code ... */}
  </div>
)}
```

**Replace with:**
```tsx
{/* V5: PLAYFUL - Tab-Based Layout */}
{uiVersion === 'v5' && (
  <PublicEventLandingV5Tabbed
    event={event}
    onEnterLiveEvent={onEnterLiveEvent}
    onJoinLeapSpace={onJoinLeapSpace}
    ShareMenu={ShareMenu}
    AddToCalendarButton={AddToCalendarButton}
    TrustBadges={TrustBadges}
    isSaved={isSaved}
    setIsSaved={setIsSaved}
    setAskOrganizerOpen={setAskOrganizerOpen}
    setAttendeeListOpen={setAttendeeListOpen}
    spotsRemaining={spotsRemaining}
    isPaidEvent={isPaidEvent}
    hostStats={hostStats}
    attendees={attendees}
    attendeeStats={attendeeStats}
    leapSpaceInfo={leapSpaceInfo}
    agenda={agenda}
    whatsIncluded={whatsIncluded}
    learningOutcomes={learningOutcomes}
    resources={resources}
    preWorkLinks={preWorkLinks}
    reviews={reviews}
    averageRating={averageRating}
    totalReviews={totalReviews}
    faqs={faqs}
    chatMessages={chatMessages}
    savedCount={savedCount}
  />
)}
```

### 4. Remove AppVersion from Codebase

AppVersion was an old versioning system (v1-v8) that's no longer used. Remove it from:

#### **types.ts** (line 110)
Delete this line:
```tsx
export type AppVersion = 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | 'v8';
```

#### **App.tsx**
Remove these lines/references:
- Import: Remove `AppVersion` from line 55
- State: Remove `const [appVersion, setAppVersion] = useState<AppVersion>('v1');` (line 319)
- Remove all `appVersion={appVersion}` prop passes
- Remove all `onVersionChange={setAppVersion}` prop passes  
- Remove from WelcomeScreen props (lines 1236-1237)

#### **BuilderView.tsx**
- Import: Remove `AppVersion` from line 3
- Props: Remove `appVersion?: AppVersion;` from line 13
- Props: Remove `onVersionChange?: (version: AppVersion) => void;` from line 14
- Default prop: Remove `appVersion = 'v1',` from line 59

#### **ChatFlow.tsx**
- Import: Remove `AppVersion` from line 6
- Props: Remove `appVersion?: AppVersion;` from line 30
- Props: Remove `onVersionChange?: (version: AppVersion) => void;` from line 31

#### **CommunityBuilderView.tsx and EventBuilderViewV2.tsx**
- Same pattern: remove AppVersion imports, props, and usages

## 📊 Summary

### What Each Tab Contains:
- **Overview**: Event details, urgency, host info, social proof
- **Agenda**: Timeline and schedule
- **Learn**: What's included, learning outcomes, certificates
- **Community**: Host profile, attendee list, LeapSpace CTA
- **Resources**: Downloads, pre-work materials, links
- **Reviews**: Ratings, reviews, FAQ
- **Chat**: LeapcastSDK (replaces right panel)

### Design Consistency:
- All versions maintain their unique visual personality
- Register CTA always visible in top bar
- Left sidebar navigation consistent across all versions
- Chat tab houses LeapcastSDK instead of right panel

## 🎯 Next Steps

1. Open `/components/PublicEventLanding.tsx`
2. Use Find & Replace to locate and replace V2, V3, V5 sections
3. Remove AppVersion from types.ts
4. Remove AppVersion imports and props from all components
5. Test each UI version (v1-v5) to ensure tab navigation works
6. Verify LeapcastSDK appears in Chat tab for all versions

## 🔍 Quick Test

After completing the changes, test by:
```tsx
// In PublicEventLanding.tsx, change line 73:
const [uiVersion, setUiVersion] = useState<'v1' | 'v2' | 'v3' | 'v4' | 'v5'>('v1'); // Try each version
```

All versions should now show:
- Top bar with title and Register CTA
- Left sidebar with 7 tabs
- Content area with tab-specific content
- No right panel (LeapcastSDK moved to Chat tab)
