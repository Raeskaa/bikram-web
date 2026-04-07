import { useState } from 'react';
import { Check, ArrowRight, Users, BookOpen, Calendar, Wand2, Palette, TrendingUp, Zap, Gift, User, Mail, Briefcase } from 'lucide-react';
import TrueLeapLogo from '../imports/Frame315115';

interface OnboardingFlowProps {
  userName: string;
  userEmail?: string;
  onComplete: (data: { interests: string[], goals: string[], profile?: { name: string, role: string, company: string } }) => void;
  onSkip: () => void;
}

export function OnboardingFlow({ userName, userEmail, onComplete, onSkip }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [profile, setProfile] = useState({
    name: userName || '',
    role: '',
    company: '',
  });

  const interests = [
    { id: 'technology', name: 'Technology', icon: Zap },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'design', name: 'Design', icon: Palette },
    { id: 'marketing', name: 'Marketing', icon: TrendingUp },
    { id: 'education', name: 'Education', icon: BookOpen },
    { id: 'health', name: 'Health & Wellness', icon: Users },
    { id: 'finance', name: 'Finance', icon: TrendingUp },
    { id: 'creative', name: 'Creative Arts', icon: Palette },
  ];

  const goals = [
    { id: 'build-community', name: 'Build a community', icon: Users },
    { id: 'create-courses', name: 'Create online courses', icon: BookOpen },
    { id: 'host-events', name: 'Host events & workshops', icon: Calendar },
    { id: 'grow-audience', name: 'Grow my audience', icon: TrendingUp },
    { id: 'learn', name: 'Learn new skills', icon: BookOpen },
    { id: 'network', name: 'Network with others', icon: Users },
  ];

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const toggleGoal = (id: string) => {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleComplete = () => {
    onComplete({ 
      interests: selectedInterests, 
      goals: selectedGoals,
      profile: profile
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <div className="w-48">
              <TrueLeapLogo />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2">
            {[1, 2, 3, 4].map(num => (
              <div key={num} className="flex items-center">
                <div className={`size-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                  num < step
                    ? 'bg-purple-600 text-white scale-100'
                    : num === step
                    ? 'bg-purple-600 text-white ring-4 ring-purple-200 scale-110'
                    : 'bg-white border-2 border-gray-200 text-gray-400'
                }`}>
                  {num < step ? <Check className="size-4" /> : num}
                </div>
                {num < 4 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    num < step ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-3 text-xs font-medium text-gray-500">
            Step {step} of 4
          </div>
        </div>

        {/* Card with fixed height */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8 min-h-[580px] flex flex-col">
          {/* Step 1: Welcome */}
          {step === 1 && (
            <div className="text-center space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="size-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center shadow-sm">
                    <Wand2 className="size-12 text-purple-600" />
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-3">Welcome to LeapSpace! 🎉</h1>
                  <p className="text-base text-gray-600 max-w-md mx-auto">
                    Hi <span className="font-semibold text-purple-600">{userName}</span>, let's personalize your experience in 4 quick steps.
                  </p>
                </div>

                {/* Bonus Credits Notice */}
                <div className="bg-gradient-to-br from-purple-50 via-purple-100/50 to-purple-50 border-2 border-purple-200 rounded-xl p-5 shadow-sm">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gift className="size-6 text-purple-600" />
                    <h3 className="text-base font-bold text-purple-900">Bonus Reward!</h3>
                  </div>
                  <p className="text-sm text-purple-800">
                    Complete this quick tutorial to earn <span className="font-bold text-purple-900">500 bonus credits</span> for creating courses, events, and communities!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleNext}
                  className="w-full h-12 bg-purple-600 text-white rounded-xl font-semibold text-base
                    hover:bg-purple-700 active:bg-purple-800 hover:shadow-lg
                    transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Get started
                  <ArrowRight className="size-5" />
                </button>
                <button
                  onClick={onSkip}
                  className="w-full text-sm text-gray-500 hover:text-gray-700 font-medium transition-colors py-2"
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Interests */}
          {step === 2 && (
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What are you interested in?</h2>
                  <p className="text-sm text-gray-600">
                    Select all that apply. We'll personalize your feed based on your interests.
                  </p>
                  <div className="mt-3 text-xs font-semibold text-purple-600">
                    {selectedInterests.length} selected
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-2">
                  {interests.map(interest => (
                    <button
                      key={interest.id}
                      onClick={() => toggleInterest(interest.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-200 text-left transform hover:scale-105 ${
                        selectedInterests.includes(interest.id)
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`size-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          selectedInterests.includes(interest.id)
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <interest.icon className="size-5" />
                        </div>
                        <span className={`font-semibold text-sm flex-1 ${
                          selectedInterests.includes(interest.id)
                            ? 'text-purple-900'
                            : 'text-gray-900'
                        }`}>
                          {interest.name}
                        </span>
                        {selectedInterests.includes(interest.id) && (
                          <div className="size-5 rounded-full bg-purple-600 flex items-center justify-center">
                            <Check className="size-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 h-12 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold
                    hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedInterests.length === 0}
                  className="flex-1 h-12 bg-purple-600 text-white rounded-xl font-semibold
                    hover:bg-purple-700 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60
                    transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Goals */}
          {step === 3 && (
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">What do you want to achieve?</h2>
                  <p className="text-sm text-gray-600">
                    Select your goals so we can recommend the best features and content.
                  </p>
                  <div className="mt-3 text-xs font-semibold text-purple-600">
                    {selectedGoals.length} selected
                  </div>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2">
                  {goals.map(goal => (
                    <button
                      key={goal.id}
                      onClick={() => toggleGoal(goal.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left transform hover:scale-[1.02] ${
                        selectedGoals.includes(goal.id)
                          ? 'border-purple-600 bg-purple-50 shadow-md'
                          : 'border-gray-200 hover:border-purple-300 bg-white hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`size-11 rounded-xl flex items-center justify-center transition-all duration-200 ${
                          selectedGoals.includes(goal.id)
                            ? 'bg-purple-600 text-white shadow-sm'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          <goal.icon className="size-5" />
                        </div>
                        <span className={`font-semibold flex-1 ${
                          selectedGoals.includes(goal.id)
                            ? 'text-purple-900'
                            : 'text-gray-900'
                        }`}>
                          {goal.name}
                        </span>
                        {selectedGoals.includes(goal.id) && (
                          <div className="size-6 rounded-full bg-purple-600 flex items-center justify-center">
                            <Check className="size-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 h-12 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold
                    hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={selectedGoals.length === 0}
                  className="flex-1 h-12 bg-purple-600 text-white rounded-xl font-semibold
                    hover:bg-purple-700 hover:shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-60
                    transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Continue
                  <ArrowRight className="size-5" />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Profile */}
          {step === 4 && (
            <div className="space-y-6 flex flex-col justify-between h-full">
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about yourself</h2>
                  <p className="text-sm text-gray-600">
                    Help us personalize your experience (optional).
                  </p>
                </div>

                <div className="space-y-4 max-h-[320px] flex flex-col justify-center">
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <User className="size-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                      className="w-full h-14 pl-12 pr-4 rounded-xl border-2 transition-all
                        border-gray-200 hover:border-gray-300 bg-white
                        focus:border-purple-600 focus:ring-4 focus:ring-purple-100 focus:outline-none
                        placeholder-gray-400 text-gray-900 font-medium"
                      placeholder="Your name"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Briefcase className="size-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profile.role}
                      onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                      className="w-full h-14 pl-12 pr-4 rounded-xl border-2 transition-all
                        border-gray-200 hover:border-gray-300 bg-white
                        focus:border-purple-600 focus:ring-4 focus:ring-purple-100 focus:outline-none
                        placeholder-gray-400 text-gray-900 font-medium"
                      placeholder="Your role (e.g., Product Manager)"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <Mail className="size-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={profile.company}
                      onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                      className="w-full h-14 pl-12 pr-4 rounded-xl border-2 transition-all
                        border-gray-200 hover:border-gray-300 bg-white
                        focus:border-purple-600 focus:ring-4 focus:ring-purple-100 focus:outline-none
                        placeholder-gray-400 text-gray-900 font-medium"
                      placeholder="Your company or organization"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 h-12 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold
                    hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  className="flex-1 h-12 bg-purple-600 text-white rounded-xl font-semibold
                    hover:bg-purple-700 hover:shadow-lg
                    transition-all duration-200 flex items-center justify-center gap-2"
                >
                  Complete setup
                  <Check className="size-5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
