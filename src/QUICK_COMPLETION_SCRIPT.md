# QUICK COMPLETION SCRIPT

## Step 1: Replace V2, V3, V5 in PublicEventLanding.tsx

### Find & Replace V2:
**Search for:** `{/* V2: BALANCED */}`
**Select until:** The line with `)}` just before `{/* V3: COMMUNITY */}`
**Replace with:** Content of `/temp_v2_code.txt`

### Find & Replace V3:
**Search for:** `{/* V3: COMMUNITY */}`
**Select until:** The line with `)}` just before `{/* V4: MINIMAL */}`
**Replace with:** Content of `/temp_v3_code.txt`

### Find & Replace V5:
**Search for:** `{/* V5: PLAYFUL */}`
**Select until:** The line with `)}` just before `</div>` and `{/* Right Panel */}`
**Replace with:** Content of `/temp_v5_code.txt`

---

## Step 2: Remove AppVersion from App.tsx

### Find and delete these lines in App.tsx:

Around line 1373-1374 in ChatFlow section:
```tsx
appVersion={appVersion}
onVersionChange={setAppVersion}
```

Around line 1413-1414 in CommunityBuilderView section:
```tsx
appVersion={appVersion}
onVersionChange={setAppVersion}
```

Around line 1485-1486 in EventBuilderViewV2 section:
```tsx
appVersion={appVersion}
onVersionChange={setAppVersion}
```

Around line 1591-1592 in BuilderView section:
```tsx
appVersion={appVersion}
onVersionChange={setAppVersion}
```

---

## Step 3: Clean Up Component Files

### BuilderView.tsx
**Line 3:** Change from:
```tsx
import { CourseData, Conversation, Message, AppVersion } from '../types';
```
To:
```tsx
import { CourseData, Conversation, Message } from '../types';
```

**Lines 13-14:** Delete these lines:
```tsx
appVersion?: AppVersion;
onVersionChange?: (version: AppVersion) => void;
```

**Line 59:** Delete:
```tsx
appVersion = 'v1',
```

### ChatFlow.tsx
**Line 6:** Change from:
```tsx
import { Conversation, Message, CourseData, CommunityData, ThinkingStep, AppVersion } from '../types';
```
To:
```tsx
import { Conversation, Message, CourseData, CommunityData, ThinkingStep } from '../types';
```

**Lines 30-31:** Delete these lines:
```tsx
appVersion?: AppVersion;
onVersionChange?: (version: AppVersion) => void;
```

### CommunityBuilderView.tsx
Search for "AppVersion" and remove:
- Import statement
- Props in interface
- Default parameter

### EventBuilderViewV2.tsx
Search for "AppVersion" and remove:
- Import statement
- Props in interface  
- Default parameter

---

## Step 4: Test Everything

Change line 73 in PublicEventLanding.tsx to test each version:
```tsx
const [uiVersion, setUiVersion] = useState<'v1' | 'v2' | 'v3' | 'v4' | 'v5'>('v1');
```

Try 'v1', 'v2', 'v3', 'v4', 'v5' - all should show tab navigation!

---

## Step 5: Cleanup

Delete these temporary files:
- `/temp_v2_code.txt`
- `/temp_v3_code.txt`
- `/temp_v5_code.txt`
- `/MIGRATION_GUIDE.md`
- `/FINAL_STATUS.md`
- `/QUICK_COMPLETION_SCRIPT.md` (this file)

---

## ✅ Done!

You've successfully:
- ✅ Migrated all 5 PublicEventLanding versions to tab-based layout
- ✅ Moved LeapcastSDK to Chat tab (removed right panel)
- ✅ Removed old AppVersion system (v1-v8)
- ✅ Maintained unique design personality for each version
- ✅ Made Register CTA always visible in top bar
