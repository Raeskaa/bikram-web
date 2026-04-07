import { useState } from 'react';
import { X, Smartphone, Copy, Check, Shield, AlertCircle, ChevronRight } from 'lucide-react';

interface TwoFactorSetupProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export function TwoFactorSetup({ isOpen, onClose, onComplete }: TwoFactorSetupProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [copiedBackupCodes, setCopiedBackupCodes] = useState(false);
  
  // Mock data
  const qrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/LeapSpace:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=LeapSpace';
  const secretKey = 'JBSWY3DPEHPK3PXP';
  const backupCodes = [
    '8374-9283',
    '2847-1938',
    '9182-4756',
    '5638-2910',
    '7392-8461',
    '4829-1736',
    '9274-3865',
    '1847-9203'
  ];

  const handleVerificationCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;
    
    const newCode = [...verificationCode];
    newCode[index] = value;
    setVerificationCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerify = () => {
    const code = verificationCode.join('');
    if (code.length === 6) {
      setStep(3);
    }
  };

  const handleCopyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopiedBackupCodes(true);
    setTimeout(() => setCopiedBackupCodes(false), 2000);
  };

  const handleComplete = () => {
    onComplete();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="size-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="size-5 text-purple-600" />
            </div>
            <div>
              <h2 className="text-lg text-gray-900">Enable Two-Factor Authentication</h2>
              <p className="text-sm text-gray-600">Step {step} of 3</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Step 1: Scan QR Code */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">1. Install an authenticator app</h3>
                <p className="text-sm text-gray-600">
                  Download an authenticator app like Google Authenticator, Authy, or 1Password on your phone.
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">2. Scan this QR code</h3>
                <div className="flex justify-center p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <img 
                    src={qrCodeUrl} 
                    alt="QR Code" 
                    className="size-48"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">Or enter this code manually</h3>
                <div className="flex items-center gap-2 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <code className="flex-1 text-sm text-gray-900 font-mono">{secretKey}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(secretKey)}
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Copy className="size-4" />
                  </button>
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                  hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                Continue
                <ChevronRight className="size-4" />
              </button>
            </div>
          )}

          {/* Step 2: Verify Code */}
          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">3. Enter verification code</h3>
                <p className="text-sm text-gray-600">
                  Enter the 6-digit code from your authenticator app to verify the setup.
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                {verificationCode.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleVerificationCodeChange(index, e.target.value)}
                    className="size-12 text-center border border-gray-300 rounded-lg text-lg font-medium
                      focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 h-11 bg-white border border-gray-300 text-gray-900 rounded-lg font-medium text-sm
                    hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                >
                  Back
                </button>
                <button
                  onClick={handleVerify}
                  disabled={verificationCode.join('').length !== 6}
                  className="flex-1 h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                    hover:bg-purple-700 active:bg-purple-800 transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Verify
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Backup Codes */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="size-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-yellow-900">
                  <p className="font-medium mb-1">Save your backup codes</p>
                  <p className="text-yellow-700">
                    Store these codes in a safe place. You can use them to access your account if you lose your device.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-medium text-gray-900">Backup Codes</h3>
                  <button
                    onClick={handleCopyBackupCodes}
                    className="text-sm text-purple-600 hover:text-purple-700 transition-colors inline-flex items-center gap-1"
                  >
                    {copiedBackupCodes ? (
                      <>
                        <Check className="size-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-4" />
                        Copy all
                      </>
                    )}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  {backupCodes.map((code, index) => (
                    <div key={index} className="font-mono text-sm text-gray-900">
                      {code}
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={handleComplete}
                className="w-full h-11 bg-purple-600 text-white rounded-lg font-medium text-sm
                  hover:bg-purple-700 active:bg-purple-800 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Check className="size-4" />
                Complete Setup
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
