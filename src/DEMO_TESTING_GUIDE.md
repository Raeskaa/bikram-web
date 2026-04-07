# 🎯 LeapSpace - Connected Accounts Demo Guide

## What is "Connected Accounts"?

**Connected Accounts** is a duplicate detection system that identifies when the same user has logged in with different providers and offers to merge them into one unified LeapSpace account.

### Example Scenario:
- **Friday**: User logs in with Facebook → Creates LeapSpace account A
- **Sunday**: Same user logs in with Google on another device → Creates LeapSpace account B
- **Detection**: System recognizes both logins are the same person
- **Action**: Offers to merge both accounts so user can log in with either Facebook or Google

---

## 🆚 Connected Accounts vs Integrations

| Connected Accounts | Integrations |
|-------------------|--------------|
| Detects duplicate logins from the same user | Library of all possible login methods |
| Shows detected duplicates that need merging | Shows all 100+ social providers available |
| Product feature (not marketing) | Marketing/discovery page |
| Exists only when duplicates detected | Always available |

**Key Point**: Don't market "connecting accounts" separately. The Integrations page already handles that. Connected Accounts exists purely to **detect and merge duplicate sessions**.

---

## 📋 Quick Demo Setup

### **1. Open the App**
Check browser console for pre-loaded demo accounts:

```
🎯 DEMO ACCOUNTS FOR TESTING DUPLICATE DETECTION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. sarah.chen@gmail.com (Google - 5 courses)
2. john.doe@outlook.com (Microsoft - 8 courses)
3. demo@example.com (Email - 2 courses)
4. +1 (555) 123-4567 (Phone - 1 course)
5. alex.rivera@facebook.com (Facebook - 6 courses)
```

---

## 🧪 Testing Scenarios

### **Scenario 1: View Connected Accounts Page**

1. **Login** to the app
2. **Navigate** to Settings → Connected Accounts
3. **See the new UI:**
   - ✅ Clean white design (matches LeapSpace)
   - ✅ Purple accents (no gradients)
   - ✅ Detected duplicates at the top (if any)
   - ✅ Currently linked login methods below
   - ✅ Product-focused (no marketing fluff)

---

### **Scenario 2: Detected Duplicate (During Signup)**

1. **Sign Up** with email: `john.doe@outlook.com`
2. **System detects** this matches an existing account
3. **Shows Account Merge Screen:**
   - Side-by-side comparison
   - Microsoft account (8 courses) vs new Google attempt (0 courses)
   - Clear CTA: "Merge These Accounts" or "Keep Separate"

---

### **Scenario 3: Detected Duplicate (In Settings)**

1. **Navigate to** Settings → Connected Accounts
2. **See "Possible Duplicate Detected" section** at the top
3. **Shows:**
   - Two accounts detected (Microsoft login Sunday, Google login Friday)
   - Same name, similar email pattern, same location
   - Account data comparison (8 courses vs 0)
   - High confidence badge
4. **CTA Options:**
   - "Merge These Accounts" (purple button)
   - "Not Me" (gray button)

---

### **Scenario 4: Skipped Merge During Signup**

**User Story**: User clicked "Keep Separate" during signup, but later regrets it.

1. **Settings** → Connected Accounts
2. **Duplicate still shows** in "Possible Duplicate Detected" section
3. **User can now merge** from settings
4. **Data persists** until user takes action

---

### **Scenario 5: Linked Login Methods**

**After merging accounts:**

1. **Navigate to** Settings → Connected Accounts
2. **See "Login Methods" section:**
   - Facebook (Primary) - Linked Dec 15, 2024 - Used 2 hours ago
   - LinkedIn - Linked Jan 10, 2025 - Used 3 days ago
3. **User can:**
   - See which is primary
   - Remove non-primary methods
   - See last usage time

---

## 🎨 New UI Features

### **1. Duplicate Detection Section**
- Purple border and purple-50 background header
- Pulsing purple dot indicator
- High/Medium confidence badge
- Side-by-side account comparison cards
- Gray background cards with clear data
- Detection reason explanation
- Prominent merge CTA

### **2. Login Methods Section**
- Clean white cards with gray borders
- Provider icons (Google, Facebook, Microsoft, LinkedIn)
- Primary badge in purple
- Last usage timestamps
- Remove option for non-primary accounts
- Link to Integrations for adding more

### **3. Empty State**
- Shows when no duplicates detected
- Gray icon in circle
- "Scan manually" option
- Clean and minimal

### **4. Info Box**
- Gray background
- Explains how detection works
- Educational, not marketing

---

## 🔄 Merge Flow Logic

### **When Duplicate Detected:**
1. **System identifies** via:
   - Same/similar email addresses
   - Same name patterns
   - Same geographic location
   - Similar login timestamps

2. **Shows comparison:**
   - Account A: john.doe@outlook.com (Microsoft, 8 courses)
   - Account B: john.doe@gmail.com (Google, 0 courses)

3. **User chooses:**
   - **Merge**: Combines data, both providers work
   - **Not Me**: Keeps separate, won't ask again

4. **After merge:**
   - Both login methods available
   - All courses/data combined
   - User picks primary method

---

## 🗂️ Demo Accounts for Testing

| Account | Provider | Data | Purpose |
|---------|----------|------|---------|
| sarah.chen@gmail.com | Google | 5 courses, 3 communities | Show existing account with data |
| john.doe@outlook.com | Microsoft | 8 courses, 5 communities | Trigger duplicate detection |
| john.doe@gmail.com | Google | 0 courses (new) | Duplicate of john.doe@outlook.com |
| demo@example.com | Email | 2 courses, 1 community | Simple email duplicate test |
| +1 (555) 123-4567 | Phone | 1 course | Phone number duplicate test |

---

## 💡 Key Differences from Old UI

### **Before (Generic/Marketing):**
- ❌ "Available to Connect" with provider cards
- ❌ Marketing copy about benefits
- ❌ "Browse all 100+ integrations" (redundant)
- ❌ Yellow warning boxes
- ❌ Looked like an integration marketplace

### **After (Product-Focused):**
- ✅ Duplicate detection is PRIMARY focus
- ✅ Clean LeapSpace visual language
- ✅ Shows detected accounts prominently
- ✅ Simple list of linked methods
- ✅ Points to Integrations page (no duplication)
- ✅ Product feature, not marketing

---

## 🐛 Testing Tips

### **View Current State:**
```javascript
// Browser console:
JSON.parse(localStorage.getItem('leapspace_all_accounts'))
JSON.parse(localStorage.getItem('leapspace_user'))
```

### **Reset Everything:**
```javascript
localStorage.clear();
location.reload();
```

### **Simulate Duplicate:**
Try signing up with `john.doe@outlook.com` - system will detect the existing Microsoft account and show merge screen.

---

## 🎬 Demo Script for Stakeholders

**"Let me show you our duplicate account detection system..."**

1. **Context**: "Users often log in with different providers on different devices. Friday they use Facebook, Sunday they use Google."

2. **Problem**: "This creates duplicate accounts with split data."

3. **Solution**: "Our system automatically detects when the same person logs in twice."

4. **Show**: Navigate to Settings → Connected Accounts
   - "See this 'Possible Duplicate Detected' section?"
   - "It shows both accounts side-by-side with all the context"
   - "Same name, same location, similar email pattern"

5. **Action**: "User can merge with one click"
   - "All data combines"
   - "They can log in with either method going forward"

6. **Benefit**: "No lost data, better user experience, single unified account"

---

## ✅ Demo Checklist

- [ ] Cleared localStorage before demo
- [ ] Opened Settings → Connected Accounts
- [ ] Showed duplicate detection section
- [ ] Explained detection logic
- [ ] Showed merge CTA
- [ ] Explained login methods section
- [ ] Showed clean UI design (matches LeapSpace)
- [ ] Highlighted product focus (not marketing)
- [ ] Tested "Not Me" option
- [ ] Showed empty state (if applicable)

---

## 🚀 Engineering Handoff Notes

### **Backend Implementation Needed:**
1. **Detection Algorithm:**
   - Email similarity matching
   - Name pattern matching
   - Geographic correlation
   - Device fingerprinting (optional)

2. **Merge Logic:**
   - Combine user data (courses, communities, events)
   - Link multiple OAuth providers to one account
   - Set primary login method
   - Maintain separate provider tokens

3. **Persistence:**
   - Store detected duplicates
   - Track user decisions ("Not Me" = don't show again)
   - Audit log for merges

### **API Endpoints:**
```
GET  /api/accounts/duplicates - Get detected duplicates
POST /api/accounts/merge - Merge two accounts
POST /api/accounts/dismiss-duplicate - Mark as "Not Me"
GET  /api/accounts/login-methods - Get linked providers
DELETE /api/accounts/login-methods/:id - Remove provider
```

---

## 📞 Questions?

Check these files:
- `/App.tsx` - Demo account setup
- `/components/GlobalSettingsPage.tsx` - Connected Accounts UI
- `/components/auth/AccountMergeScreen.tsx` - Merge flow

Happy Testing! 🎯
