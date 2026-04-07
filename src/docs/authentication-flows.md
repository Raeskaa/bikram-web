# TrueLeap Authentication Flows Documentation

## Overview
TrueLeap uses a modern passwordless authentication system with optional password setup. The system supports 100+ social login integrations, email magic links, phone OTP, and includes account merging for duplicate detection.

---

## Core Authentication Methods

### Primary Methods
1. **Email Magic Link** (passwordless, default)
2. **Phone OTP** (passwordless, default)
3. **Social OAuth** (100+ providers)
4. **Password** (optional, set in Settings after initial login)

### Authentication Principles
- Passwordless by default
- Users can optionally add password later in Settings
- Geographic detection for regional optimization
- Account merging system for duplicate detection
- Guest mode with 1000 free credits

---

## Flow 1: New User - First Time Sign-in Attempt

### Scenario
User tries to sign in but doesn't have an account yet.

### User Journey

#### Step 1: User Clicks "Sign-in"
**Location:** Header (top-right), Homepage, or any gated feature  
**Action:** Opens Sign-in modal

#### Step 2: User Enters Credentials
**Options:**
- Email address
- Phone number
- Social provider (Google, Facebook, etc.)

#### Step 3: System Checks if User Exists
**Backend Logic:**
```
IF user NOT found in database:
  SHOW error message: "No account found. Please sign up first."
  SHOW prominent "Go to Sign-up" button
ELSE:
  Proceed to authentication flow
```

#### Step 4: User Redirected to Sign-up
**UI Change:**
- Error message appears: "No account found with this email/phone."
- CTA button: "Create Account" (purple, prominent)
- Link: "Go to Sign-up" (text link, secondary)

#### Step 5: User Enters Sign-up Information
**Required Fields:**
- Full Name
- Email OR Phone (whichever they tried to sign in with)
- Agree to Terms & Privacy Policy (checkbox)

**Optional Fields:**
- Profile picture (can skip)
- Organization name (can skip)

#### Step 6: Verification Process

**If Email:**
1. System sends magic link to email
2. User clicks link in email
3. Email verified ✓

**If Phone:**
1. System sends 6-digit OTP via SMS
2. User enters OTP in modal
3. Phone verified ✓

**If Social OAuth:**
1. OAuth provider handles verification
2. User grants permissions
3. Account created with OAuth profile data

#### Step 7: Account Creation
**Backend Actions:**
- Create user account in database
- Generate user ID
- Set authentication method
- Create default LeapSpace ("My Personal Space")
- Allocate initial credits (if applicable)
- Log authentication event

#### Step 8: First-Time Onboarding
**UI Flow:**
- Welcome screen: "Welcome to TrueLeap!"
- 4-step onboarding process:
  1. **Profile Setup** (add avatar, bio)
  2. **Interests Selection** (choose topics)
  3. **LeapSpace Setup** (name your first workspace)
  4. **Tour** (quick product walkthrough)

#### Step 9: User Taken to App
**Landing:** Home dashboard  
**State:** Logged in, first LeapSpace active  
**Actions Available:** Create courses, join communities, explore

---

## Flow 2: Existing User - Standard Sign-in

### Scenario
User has an account and signs in using their registered method.

### User Journey

#### Step 1: User Clicks "Sign-in"
**Location:** Header, homepage, or any gated feature  
**Action:** Opens Sign-in modal

#### Step 2: User Selects Sign-in Method

**Option A: Email**
1. User enters email address
2. User clicks "Continue"
3. System checks: Email exists ✓
4. Two sub-paths:

   **A1: Magic Link (Default)**
   - System sends magic link to email
   - Modal shows: "Check your email for sign-in link"
   - User clicks link in email
   - User automatically logged in
   - Redirected to app

   **A2: Password (If User Previously Set One)**
   - System detects password exists for this email
   - Shows password field
   - User enters password
   - Optional: "Forgot password?" link
   - User clicks "Sign in"
   - User logged in
   - Redirected to app

**Option B: Phone**
1. User enters phone number (with country code)
2. User clicks "Continue"
3. System checks: Phone exists ✓
4. Two sub-paths:

   **B1: OTP (Default)**
   - System sends 6-digit OTP via SMS
   - Modal shows OTP input fields (6 boxes)
   - User enters OTP
   - System validates OTP
   - User logged in
   - Redirected to app

   **B2: Password (If User Previously Set One)**
   - System detects password exists for this phone
   - Shows password field
   - User enters password
   - User clicks "Sign in"
   - User logged in
   - Redirected to app

**Option C: Social OAuth**
1. User clicks social provider button (e.g., "Continue with Google")
2. OAuth popup/redirect opens
3. User grants permissions
4. OAuth returns to TrueLeap
5. System validates OAuth token
6. User logged in
7. Redirected to app

#### Step 3: Session Management
**Backend Actions:**
- Create session token
- Set session cookie (httpOnly, secure)
- Log sign-in event
- Update last_login timestamp
- Check for LeapSpaces
- Load user preferences

#### Step 4: Landing in App
**Destination:** 
- If first login: Onboarding flow
- If returning user: Last visited page OR Home dashboard

**State:**
- User authenticated
- Current LeapSpace: Last used OR default
- Preferences loaded
- Notifications synced

---

## Flow 3: Existing User with Different Sign-in Method (Account Merging)

### Scenario
User signs in using a different method than they originally registered with. System detects duplicate account and triggers merge flow.

### Example Scenarios
- User signed up with email, now signs in with Google (same email)
- User signed up with Google, now signs in with phone (same phone linked to Google)
- User signed up with Facebook, now signs in with email (same email)

### User Journey

#### Step 1: User Attempts Sign-in with New Method
**Example:** User originally signed up with email, now clicks "Continue with Google"

#### Step 2: OAuth/Authentication Completes
**Backend receives:**
- New authentication method data
- Email address (from OAuth)
- User profile info

#### Step 3: System Detects Duplicate Account
**Detection Logic:**
```
Check for existing accounts with:
- Same email address
- Same phone number (if available)
- Same verified identity markers

IF match found:
  TRIGGER account merging flow
ELSE:
  Create new account (Flow 1)
```

#### Step 4: Merge Detection Modal Appears
**UI:**
- **Title:** "Account Already Exists"
- **Message:** "We found an existing account with the email address john@example.com. Would you like to connect this Google account to your existing TrueLeap account?"
- **Visual:** 
  - Left side: Existing account card (shows email/phone, avatar)
  - Right side: New method card (shows OAuth provider, new avatar if different)
  - Arrow between them: "Merge →"

**User Options:**
1. **"Yes, Merge Accounts"** (primary button, purple)
2. **"No, Create Separate Account"** (secondary button, outline)
3. **"Cancel"** (text link)

#### Step 5A: User Chooses "Yes, Merge Accounts"

**Verification Step:**
To prevent unauthorized account takeover, system requires verification of ORIGINAL account.

**Verification Modal:**
- **Title:** "Verify Your Identity"
- **Message:** "To merge accounts, please verify your original sign-in method."
- **Action:** 
  - If original was email: "Send verification code to j***@example.com"
  - If original was phone: "Send verification code to +1 *** *** **34"
  - If original was social: "Sign in with [Provider]"

**User verifies:**
1. User clicks verification method
2. Receives OTP or magic link or OAuth
3. User completes verification
4. System confirms: Both accounts belong to same person ✓

**Merge Process:**
```
Backend Actions:
1. Verify ownership of both accounts ✓
2. Add new auth method to existing account
3. Merge any data from new method:
   - Profile picture (if better quality)
   - Additional profile info
   - Connection metadata
4. Update `connected_accounts` table:
   - Add new OAuth provider
   - Link authentication methods
5. Invalidate temporary new account (if created)
6. Log merge event
7. Send confirmation email/SMS
```

**Success State:**
- **Modal:** "Accounts Merged Successfully!"
- **Message:** "Your Google account is now connected. You can sign in using either method."
- **CTA:** "Continue to App"

**Redirect:** User taken to app (Home or last visited page)

**New Capability:** 
- User can now sign in with EITHER method
- Both methods visible in Settings > Connected Accounts
- User can disconnect either method (must keep at least one)

#### Step 5B: User Chooses "No, Create Separate Account"

**Warning Modal:**
- **Title:** "Create Separate Account?"
- **Message:** "This will create a completely separate account. You'll need to manage two different TrueLeap accounts. Are you sure?"
- **Options:**
  - "Yes, Create Separate Account" (secondary)
  - "Go Back" (primary, recommended)

**If User Confirms:**
- New account created with different identifier
- No connection to existing account
- User must manage two separate accounts
- System adds note to prevent future merge suggestions for these specific accounts

#### Step 6: Connected Accounts Visible in Settings
**Location:** Settings > Connected Accounts tab

**Display:**
- Primary sign-in method (badge: "Primary")
- All connected methods listed
- Each shows:
  - Provider icon/name
  - Email/phone associated
  - Connection date
  - "Disconnect" button (disabled if only method)

**Actions:**
- Add more authentication methods
- Set primary method
- Disconnect methods (must keep ≥1)
- View connection history

---

## Flow 4: Guest/Ghost User (Explore Mode)

### Scenario
User wants to explore TrueLeap without creating an account. Gets 1000 free credits to test features.

### User Journey

#### Step 1: User Lands on TrueLeap
**Options:**
- Direct URL visit
- Marketing page
- Referral link

#### Step 2: User Sees Homepage as Guest
**UI State:**
- Header shows: "Sign-in" button (not "User Menu")
- No personalized content
- Generic welcome message
- Prompt: "Start exploring with 1000 free credits"

#### Step 3: User Clicks "Explore as Guest" OR Clicks on TrueLeap Logo
**Action:** 
- If clicks "Explore as Guest" button: Explicit choice
- If clicks TrueLeap logo: Implicit exploration mode

**Backend Actions:**
```
1. Generate temporary guest session ID
2. Create guest user object (in-memory or temporary DB entry)
3. Allocate 1000 credits
4. Set expiration (24 hours or session-based)
5. Track guest actions (analytics)
```

#### Step 4: Guest Enters App
**State:**
- `isGuest: true`
- `guestCredits: 1000`
- Session token (temporary)
- Limited permissions

**UI Indicators:**
- Sidebar shows credit counter: "Credits: 875/1000"
- Prompt button: "Sign up for more"
- Subtle badge: "Guest Mode" (top-right)

#### Step 5: Guest Explores Features
**Available Actions (Credit Costs):**
- View public courses (Free)
- View public communities (Free)
- View public events (Free)
- Create draft course (50 credits)
- Join community (25 credits)
- Register for event (25 credits)
- Use AI copilot (10 credits per query)
- Generate content (variable credits)

**Restricted Actions:**
- Cannot publish courses (requires account)
- Cannot create communities (requires account)
- Cannot host events (requires account)
- Cannot invite others (requires account)
- Cannot access some advanced features

**Credit Counter:**
- Visible in sidebar
- Updates in real-time
- Progress bar visualization
- Changes color when low:
  - Green: >500 credits
  - Yellow: 200-500 credits
  - Red: <200 credits

#### Step 6: Guest Runs Low on Credits
**Trigger:** Credits < 200

**Modal Appears:**
- **Title:** "You're Running Low on Credits!"
- **Message:** "Sign up for free to get unlimited access to TrueLeap."
- **Benefits List:**
  - ✓ Unlimited credits
  - ✓ Publish courses & communities
  - ✓ Save your progress
  - ✓ Access advanced features
  - ✓ Collaborate with others
- **CTA:** "Sign Up Free" (purple button)
- **Secondary:** "Continue as Guest" (text link)

#### Step 7A: Guest Chooses to Sign Up
**Flow:**
1. Guest clicks "Sign Up Free"
2. Sign-up modal opens (pre-filled with any guest data)
3. Guest completes sign-up (Flow 1)
4. **Migration happens:**

```
Backend Migration Process:
1. User completes sign-up
2. System creates permanent account
3. Migrate guest data:
   - Draft courses → User's account
   - Saved items → User's account
   - Preferences → User's account
   - Progress → User's account
4. Delete guest session
5. Upgrade to full account
6. Reset credits to unlimited (or account default)
7. Unlock all features
```

**Success State:**
- **Modal:** "Welcome to TrueLeap!"
- **Message:** "Your progress has been saved. You now have full access!"
- User taken to onboarding (Steps 2-4 of Flow 1)

#### Step 7B: Guest Chooses to Continue
**Flow:**
- Guest continues with limited credits
- Can explore until credits run out
- Persistent prompts to sign up

#### Step 8: Guest Credits Depleted (0 Credits)
**Blocking Modal:**
- **Title:** "You've Used All Your Credits"
- **Message:** "Sign up to continue using TrueLeap. It's free!"
- **CTA:** "Sign Up Now" (purple button)
- **No dismiss option** (must sign up to continue)

**Alternative Action:**
- Small text link: "Start a new guest session" (resets to new 1000 credits, loses progress)

#### Step 9: Guest Session Expiration
**Trigger:** 24 hours of inactivity OR user closes browser

**On Return:**
- Guest data lost (unless migrated)
- New guest session available
- Fresh 1000 credits
- Clean slate

**Prevention:**
- Auto-save guest progress to localStorage
- Prompt to sign up before session expires
- Warning: "Your session will expire in 1 hour"

---

## Edge Cases & Error Handling

### Edge Case 1: User Forgets Which Method They Used
**Scenario:** User tries email, but originally signed up with Google (different email)

**Solution:**
- System doesn't find account with entered email
- Shows: "No account found. Did you sign up with a different method?"
- Offers: "Try signing in with Google, Facebook, etc."
- Alternative: "Or create a new account"

### Edge Case 2: Magic Link Expires
**Scenario:** User clicks magic link after it expires (15-minute timeout)

**Solution:**
- Landing page shows: "This link has expired"
- CTA: "Request a new sign-in link"
- User clicks → new magic link sent
- Previous link invalidated

### Edge Case 3: OTP Entry Timeout
**Scenario:** User doesn't enter OTP within time limit (5 minutes)

**Solution:**
- OTP fields disabled
- Message: "Code expired. Request a new one."
- Button: "Resend Code"
- Rate limiting: Max 3 resends per 15 minutes

### Edge Case 4: OAuth Popup Blocked
**Scenario:** Browser blocks OAuth popup window

**Solution:**
- Detect popup blocked
- Show inline message: "Popup blocked. Please allow popups for TrueLeap."
- Alternative: "Use redirect method instead" (full page redirect vs popup)
- Instructions to enable popups

### Edge Case 5: OAuth Email Already Used with Different Provider
**Scenario:** User signed up with Google (email: john@gmail.com), now tries Facebook with same email

**Solution:**
- Trigger account merging flow (Flow 3)
- Verify identity with original method
- Connect both OAuth providers to same account

### Edge Case 6: User Changes Email After Initial Signup
**Scenario:** User signed up with old@email.com, changed to new@email.com in Settings, now tries to sign in with old@email.com

**Solution:**
- System detects email change history
- Message: "This email is no longer associated with your account. Sign in with new@email.com instead."
- Link to "Forgot which email I used?"
- Support contact option

### Edge Case 7: Multiple Accounts Legitimately Needed
**Scenario:** User actually wants separate personal and work accounts

**Solution:**
- Allow users to opt-out of account merging
- Store preference: "Don't suggest merging these accounts"
- LeapSpaces can handle multiple workspaces within ONE account
- Educate: "Did you know? You can have multiple LeapSpaces in one account!"

### Edge Case 8: Guest Closes Tab Mid-Session
**Scenario:** Guest exploring, closes browser, returns later

**Solution:**
**On return:**
- Check for guest session cookie
- If valid (< 24 hours): Restore session
- Load saved progress from localStorage
- Show: "Welcome back! You have X credits remaining."

**If expired:**
- Offer new guest session
- Lost progress notification
- "Want to save your work? Sign up now."

### Edge Case 9: Network Failure During Authentication
**Scenario:** User submits sign-in but network fails

**Solution:**
- Show loading state
- Detect network failure (timeout after 30 seconds)
- Error message: "Connection lost. Check your internet and try again."
- Retry button
- Don't clear form data

### Edge Case 10: Account Locked (Security)
**Scenario:** Too many failed sign-in attempts

**Solution:**
- After 5 failed attempts: Account temporarily locked (15 minutes)
- Message: "Too many failed attempts. Try again in 15 minutes."
- Alternative: "Reset password" or "Contact support"
- Email notification to user (security alert)

### Edge Case 11: User Signs Out Mid-Onboarding
**Scenario:** New user signs up, starts onboarding, then signs out

**Solution:**
- Save onboarding progress
- On next sign-in: Resume onboarding where they left off
- Option to skip remaining steps
- Can always access Settings to complete profile

### Edge Case 12: Geographic Restriction
**Scenario:** User from restricted country tries to sign up

**Solution:**
- Detect location (IP-based)
- If restricted: Show message explaining regional availability
- Alternative: "Coming soon to your region"
- Waitlist sign-up option
- VPN detection: Warn about violations if using VPN to bypass

---

## Technical Implementation Notes

### Backend Requirements

#### Database Schema

**users table:**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  phone VARCHAR(50) UNIQUE,
  full_name VARCHAR(255),
  avatar_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP,
  last_login TIMESTAMP,
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  account_status ENUM('active', 'suspended', 'deleted'),
  is_guest BOOLEAN DEFAULT FALSE,
  guest_credits INTEGER DEFAULT NULL,
  guest_session_expires TIMESTAMP DEFAULT NULL
);
```

**auth_methods table:**
```sql
CREATE TABLE auth_methods (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  method_type ENUM('email_magic', 'email_password', 'phone_otp', 'phone_password', 'oauth'),
  oauth_provider VARCHAR(100), -- 'google', 'facebook', etc.
  oauth_id VARCHAR(255), -- provider's user ID
  is_primary BOOLEAN DEFAULT FALSE,
  password_hash TEXT, -- NULL if passwordless
  connected_at TIMESTAMP,
  last_used TIMESTAMP
);
```

**account_merge_history table:**
```sql
CREATE TABLE account_merge_history (
  id UUID PRIMARY KEY,
  primary_user_id UUID REFERENCES users(id),
  merged_user_id UUID, -- account that was merged (may be deleted)
  merged_auth_method VARCHAR(100),
  merged_at TIMESTAMP,
  verified_by ENUM('otp', 'magic_link', 'oauth', 'password'),
  ip_address INET,
  user_agent TEXT
);
```

**guest_sessions table:**
```sql
CREATE TABLE guest_sessions (
  id UUID PRIMARY KEY,
  session_token VARCHAR(255) UNIQUE,
  credits_remaining INTEGER DEFAULT 1000,
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  last_activity TIMESTAMP,
  converted_to_user_id UUID REFERENCES users(id) -- NULL until conversion
);
```

**magic_links table:**
```sql
CREATE TABLE magic_links (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  token VARCHAR(255) UNIQUE,
  email VARCHAR(255),
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  used_at TIMESTAMP DEFAULT NULL,
  ip_address INET
);
```

**otp_codes table:**
```sql
CREATE TABLE otp_codes (
  id UUID PRIMARY KEY,
  phone VARCHAR(50),
  code VARCHAR(6),
  created_at TIMESTAMP,
  expires_at TIMESTAMP,
  verified_at TIMESTAMP DEFAULT NULL,
  attempts INTEGER DEFAULT 0
);
```

#### API Endpoints

**POST /auth/signup**
- Create new user account
- Request body: { email/phone, full_name, auth_method }
- Returns: user object, session token

**POST /auth/signin**
- Initiate sign-in process
- Request body: { identifier (email/phone), method }
- Returns: next_step ('otp', 'magic_link', 'password', 'oauth_redirect')

**POST /auth/verify-otp**
- Verify OTP code
- Request body: { phone, code }
- Returns: session token if valid

**GET /auth/magic-link/:token**
- Verify magic link
- Returns: session token if valid, redirect to app

**POST /auth/oauth/callback**
- Handle OAuth callback
- Request body: { provider, code }
- Returns: user object, session token, OR merge_required

**POST /auth/merge-accounts**
- Merge two accounts
- Request body: { primary_user_id, auth_method_to_add, verification_token }
- Returns: updated user object

**POST /auth/guest-session**
- Create guest session
- Returns: guest_token, credits

**POST /auth/convert-guest**
- Convert guest to full user
- Request body: { guest_token, signup_data }
- Returns: user object, migrated data

**POST /auth/signout**
- Destroy session
- Returns: success

### Frontend State Management

```typescript
// Auth Context State
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isGuest: boolean;
  guestCredits: number | null;
  authMethods: AuthMethod[];
  loading: boolean;
  error: string | null;
}

// Actions
type AuthAction =
  | { type: 'SIGNIN_START' }
  | { type: 'SIGNIN_SUCCESS'; payload: User }
  | { type: 'SIGNIN_ERROR'; payload: string }
  | { type: 'SIGNOUT' }
  | { type: 'GUEST_SESSION_START'; payload: { credits: number } }
  | { type: 'UPDATE_GUEST_CREDITS'; payload: number }
  | { type: 'CONVERT_GUEST_TO_USER'; payload: User }
  | { type: 'TRIGGER_MERGE_FLOW'; payload: MergeData };
```

### Security Considerations

1. **Rate Limiting:**
   - Max 5 sign-in attempts per 15 minutes per IP
   - Max 3 OTP requests per 15 minutes per phone
   - Max 3 magic link requests per 15 minutes per email

2. **Token Security:**
   - Magic links expire in 15 minutes
   - OTP codes expire in 5 minutes
   - Session tokens use httpOnly cookies
   - CSRF protection enabled

3. **Account Verification:**
   - Email/phone must be verified before full access
   - Account merging requires verification of BOTH accounts
   - Suspicious activity triggers additional verification

4. **Password Storage:**
   - bcrypt with salt rounds ≥ 12
   - Never stored in plaintext
   - Never transmitted in URLs

5. **Guest Session Security:**
   - Limit guest actions (no sensitive operations)
   - Expire sessions after 24 hours
   - Clear data on expiration
   - Rate limit guest session creation per IP

---

## UI/UX Specifications

### Sign-in Modal Design

**Dimensions:** 440px width, auto height  
**Position:** Centered on screen  
**Background:** White with subtle shadow  
**Border radius:** 16px  

**Structure:**
1. **Header**
   - Logo (centered)
   - Title: "Sign in to TrueLeap"
   - Close button (top-right)

2. **Body**
   - Input field (email or phone)
   - Continue button
   - Divider: "or continue with"
   - Social OAuth buttons (grid)
   - Link: "Don't have an account? Sign up"

3. **Footer**
   - Terms & Privacy links
   - Language selector

### Sign-up Modal Design

Same structure as sign-in, with additional fields:
- Full name input
- Terms acceptance checkbox
- "Create Account" button instead of "Continue"

### Account Merge Modal Design

**Unique Layout:**
- Two-column card view
- Left: Existing account details
- Right: New account/method details
- Center: Merge arrow icon
- Bottom: Action buttons

### Error States

**Display:**
- Red border on invalid input fields
- Error icon (!) before error message
- Error text in red (#DC2626)
- Shake animation on failed attempt

**Messages:**
- Clear, human-friendly language
- Actionable (tell user what to do)
- Provide alternatives

---

## Analytics & Tracking

### Events to Track

**Sign-up Flow:**
- `signup_started` - User opened sign-up modal
- `signup_method_selected` - Which method chosen
- `signup_verification_sent` - OTP/magic link sent
- `signup_completed` - Account created
- `signup_abandoned` - User closed modal mid-flow

**Sign-in Flow:**
- `signin_started`
- `signin_method_selected`
- `signin_success`
- `signin_failed` - With reason
- `magic_link_clicked`
- `otp_verified`

**Account Merging:**
- `merge_flow_triggered`
- `merge_accepted`
- `merge_rejected`
- `merge_completed`

**Guest Mode:**
- `guest_session_started`
- `guest_action` - With credit cost
- `guest_credits_low` - Triggered at <200
- `guest_credits_depleted`
- `guest_converted_to_user`
- `guest_session_expired`

### Metrics to Monitor

- Sign-up conversion rate
- Time to complete sign-up
- Most used authentication methods
- Account merge acceptance rate
- Guest to user conversion rate
- Average guest credits used before conversion
- Failed sign-in attempts (monitor for attacks)

---

## Support & Error Recovery

### Help Center Articles Needed

1. "How to sign in to TrueLeap"
2. "I forgot which sign-in method I used"
3. "How to connect multiple accounts"
4. "Understanding guest mode and credits"
5. "I didn't receive my magic link/OTP"
6. "How to change my primary sign-in method"
7. "Account security best practices"

### Support Contact Flow

**From Auth Modals:**
- Link: "Need help signing in?"
- Opens: In-app support chat OR email form
- Auto-includes: User's entered email/phone (for context)
- Asks: "What issue are you experiencing?"

**Priority Support for:**
- Account locked
- Cannot receive OTP/magic link
- Account merge issues
- Lost access to all auth methods

---

## Future Enhancements

### Planned Features

1. **Biometric Authentication**
   - Face ID / Touch ID on mobile
   - WebAuthn for desktop

2. **Passkeys Support**
   - FIDO2 standard
   - Cross-device passkeys

3. **Account Recovery**
   - Security questions
   - Trusted contacts
   - Recovery codes

4. **Enterprise SSO**
   - SAML 2.0
   - Active Directory integration
   - Custom OAuth providers

5. **Multi-factor Authentication (MFA)**
   - Authenticator app support (TOTP)
   - SMS backup codes
   - Hardware keys (YubiKey)

6. **Social Account Unlinking**
   - Disconnect OAuth providers
   - Maintain access via other methods

### Considerations for v2

- Anonymous user analytics (privacy-preserving)
- Progressive profiling (gather data over time)
- Adaptive authentication (risk-based)
- Device fingerprinting (fraud prevention)

---

## Testing Checklist

### Manual Testing

**Sign-up Flow:**
- [ ] Sign up with email (magic link)
- [ ] Sign up with phone (OTP)
- [ ] Sign up with each OAuth provider
- [ ] Try signing up with existing email (should error)
- [ ] Verify email verification works
- [ ] Verify phone verification works
- [ ] Complete onboarding flow
- [ ] Skip onboarding steps

**Sign-in Flow:**
- [ ] Sign in with email (magic link)
- [ ] Sign in with email (password, if set)
- [ ] Sign in with phone (OTP)
- [ ] Sign in with phone (password, if set)
- [ ] Sign in with each OAuth provider
- [ ] Try signing in with non-existent email
- [ ] Verify "go to sign-up" redirect works
- [ ] Test magic link expiration
- [ ] Test OTP expiration
- [ ] Test invalid OTP entry

**Account Merging:**
- [ ] Trigger merge with same email, different provider
- [ ] Accept merge and verify identity
- [ ] Reject merge and create separate account
- [ ] Verify both auth methods work after merge
- [ ] Check Connected Accounts in Settings
- [ ] Disconnect a merged account
- [ ] Set primary auth method

**Guest Mode:**
- [ ] Start guest session
- [ ] Perform actions and verify credit deduction
- [ ] Run credits to <200 (verify warning)
- [ ] Run credits to 0 (verify blocking modal)
- [ ] Convert guest to user
- [ ] Verify guest data migrated
- [ ] Test guest session expiration

**Edge Cases:**
- [ ] Network failure during sign-in
- [ ] Popup blocked for OAuth
- [ ] Browser back button during auth flow
- [ ] Multiple tabs open during sign-in
- [ ] Sign out mid-onboarding
- [ ] Change email after signup
- [ ] Rate limiting triggers

### Automated Testing

**Unit Tests:**
- Auth context actions
- Form validation logic
- Token generation/verification
- Credit calculation

**Integration Tests:**
- API endpoint responses
- Database transactions
- Email/SMS sending
- OAuth callbacks

**End-to-End Tests:**
- Complete sign-up flow
- Complete sign-in flow
- Account merging flow
- Guest conversion flow

---

## Compliance & Legal

### GDPR Compliance
- Clear consent for data collection
- Right to data portability
- Right to account deletion
- Privacy policy accessible

### CCPA Compliance
- Opt-out of data sale (we don't sell data)
- Data access requests
- Deletion requests

### Terms of Service
- User agreement required at signup
- Cannot create account without acceptance
- Link always accessible

### Privacy Policy
- What data we collect
- How we use authentication data
- Third-party OAuth provider policies
- Data retention policies

---

## Appendix

### Glossary

**Magic Link:** Time-limited URL sent via email for passwordless authentication  
**OTP:** One-Time Password, typically 6-digit code sent via SMS  
**OAuth:** Open Authorization, allows sign-in via third-party providers  
**LeapSpace:** Workspace within TrueLeap (like Slack workspaces)  
**Guest Mode:** Trial mode with limited credits, no account required  
**Account Merging:** Connecting multiple auth methods to one account  
**Connected Accounts:** List of all authentication methods linked to a user  

### Related Documentation

- [LeapSpace Management](/docs/leapspace-management.md)
- [Settings Panel Specifications](/docs/settings-specifications.md)
- [Guest Mode Credit System](/docs/guest-credits.md)
- [Security & Privacy](/docs/security.md)

---

**Document Version:** 1.0  
**Last Updated:** January 22, 2025  
**Owner:** Product Team  
**Status:** Draft for Engineering Review
