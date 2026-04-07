import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Progress } from './ui/progress';
import {
  Calendar, Clock, Users, MapPin, CheckCircle, AlertCircle,
  Loader2, CreditCard, Shield, Info
} from 'lucide-react';

interface FormField {
  id: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox' | 'date' | 'url' | 'number';
  label: string;
  placeholder: string;
  required: boolean;
  options?: string[];
  description?: string;
}

interface EventRegistrationFormProps {
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventType: 'virtual' | 'in-person' | 'hybrid';
  location?: string;
  price?: number;
  currency?: string;
  capacity?: number;
  spotsLeft?: number;
  formFields: FormField[];
  onSubmit: (data: Record<string, any>) => void;
  onCancel: () => void;
  isWaitlist?: boolean;
}

export function EventRegistrationForm({
  eventTitle,
  eventDate,
  eventTime,
  eventType,
  location,
  price = 0,
  currency = 'USD',
  capacity,
  spotsLeft,
  formFields,
  onSubmit,
  onCancel,
  isWaitlist = false,
}: EventRegistrationFormProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState<'form' | 'payment' | 'confirmation'>('form');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const isPaid = price > 0;
  const isFree = price === 0;

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
    // Clear error when user starts typing
    if (errors[fieldId]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldId];
        return newErrors;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    formFields.forEach(field => {
      if (field.required && !formData[field.id]) {
        newErrors[field.id] = `${field.label} is required`;
      }
      
      if (field.type === 'email' && formData[field.id]) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid email address';
        }
      }
      
      if (field.type === 'phone' && formData[field.id]) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(formData[field.id])) {
          newErrors[field.id] = 'Please enter a valid phone number';
        }
      }
    });

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (isPaid && currentStep === 'form') {
      setCurrentStep('payment');
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    setIsSubmitting(false);
    setCurrentStep('confirmation');
  };

  const renderField = (field: FormField) => {
    const hasError = !!errors[field.id];
    
    return (
      <div key={field.id}>
        <Label>
          {field.label}
          {field.required && <span className="text-red-600 ml-1">*</span>}
        </Label>
        {field.description && (
          <p className="text-xs text-gray-500 mt-1 mb-2">{field.description}</p>
        )}
        
        {field.type === 'textarea' ? (
          <Textarea
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
          />
        ) : field.type === 'select' ? (
          <Select
            value={formData[field.id] || ''}
            onValueChange={(value) => handleFieldChange(field.id, value)}
          >
            <SelectTrigger className={hasError ? 'border-red-500' : ''}>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option, i) => (
                <SelectItem key={i} value={option.toLowerCase()}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : field.type === 'checkbox' ? (
          <div className="flex items-center gap-2 mt-2">
            <Checkbox
              checked={formData[field.id] || false}
              onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            />
            <span className="text-sm">{field.placeholder}</span>
          </div>
        ) : (
          <Input
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id] || ''}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            className={hasError ? 'border-red-500' : ''}
          />
        )}
        
        {hasError && (
          <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
            <AlertCircle className="size-3" />
            {errors[field.id]}
          </p>
        )}
      </div>
    );
  };

  const renderFormStep = () => (
    <>
      <div className="space-y-4">
        {formFields.map(field => renderField(field))}
        
        <div className="pt-4 border-t">
          <div className="flex items-start gap-2">
            <Checkbox
              checked={agreeToTerms}
              onCheckedChange={(checked) => {
                setAgreeToTerms(checked as boolean);
                if (errors.terms) {
                  setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.terms;
                    return newErrors;
                  });
                }
              }}
            />
            <div className="text-xs text-gray-600">
              <p>
                I agree to the{' '}
                <button className="text-primary hover:underline">
                  Terms of Service
                </button>{' '}
                and{' '}
                <button className="text-primary hover:underline">
                  Privacy Policy
                </button>
              </p>
              {errors.terms && (
                <p className="text-red-600 mt-1">{errors.terms}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          Cancel
        </Button>
        <Button 
          onClick={handleSubmit} 
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : isPaid ? (
            `Continue to Payment`
          ) : isWaitlist ? (
            'Join Waitlist'
          ) : (
            'Complete Registration'
          )}
        </Button>
      </div>
    </>
  );

  const renderPaymentStep = () => (
    <>
      <Card className="mb-6 bg-muted border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{eventTitle}</p>
              <p className="text-sm text-gray-600">{eventDate} at {eventTime}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">
                {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'}{price}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div>
          <Label>Card Number</Label>
          <Input placeholder="1234 5678 9012 3456" />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Expiry Date</Label>
            <Input placeholder="MM / YY" />
          </div>
          <div>
            <Label>CVV</Label>
            <Input placeholder="123" />
          </div>
        </div>

        <div>
          <Label>Cardholder Name</Label>
          <Input placeholder="Name on card" />
        </div>

        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          <Shield className="size-5 text-green-600" />
          <div className="text-xs text-gray-600">
            <p className="font-medium text-gray-900">Secure Payment</p>
            <p>Your payment information is encrypted and secure</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentStep('form')}
          className="flex-1"
        >
          Back
        </Button>
        <Button 
          onClick={handleSubmit}
          className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 mr-2 animate-spin" />
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="size-4 mr-2" />
              Pay {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'}{price}
            </>
          )}
        </Button>
      </div>
    </>
  );

  const renderConfirmation = () => (
    <div className="text-center py-8">
      <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
        <CheckCircle className="size-8 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2">
        {isWaitlist ? 'Added to Waitlist!' : 'Registration Confirmed!'}
      </h3>
      <p className="text-gray-600 mb-6">
        {isWaitlist 
          ? "We'll notify you when a spot becomes available."
          : "You're all set for this event. Check your email for details."}
      </p>
      
      {!isWaitlist && (
        <div className="space-y-3 mb-6">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
            <Calendar className="size-4 mr-2" />
            Add to Calendar
          </Button>
          <Button variant="outline" className="w-full">
            View Event Details
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-md mx-auto">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-semibold mb-1">
              {isWaitlist ? 'Join Waitlist' : 'Register for Event'}
            </h2>
            <p className="text-sm text-gray-600">{eventTitle}</p>
          </div>
          {isPaid && currentStep !== 'confirmation' && (
            <Badge className="bg-primary text-primary-foreground">
              {currency === 'USD' ? '$' : currency === 'EUR' ? '€' : '₹'}{price}
            </Badge>
          )}
        </div>

        {currentStep !== 'confirmation' && (
          <>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Calendar className="size-4" />
                <span>{eventDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="size-4" />
                <span>{eventTime}</span>
              </div>
            </div>

            {eventType === 'virtual' && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mb-4">
                <Info className="size-4 text-muted-foreground" />
                <p className="text-xs text-gray-700">
                  Meeting link will be sent to your email after registration
                </p>
              </div>
            )}

            {eventType === 'in-person' && location && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg mb-4">
                <MapPin className="size-4 text-muted-foreground" />
                <p className="text-xs text-gray-700">{location}</p>
              </div>
            )}

            {spotsLeft && spotsLeft <= 10 && !isWaitlist && (
              <div className="flex items-center gap-2 p-3 bg-orange-50 rounded-lg border border-orange-200 mb-4">
                <AlertCircle className="size-4 text-orange-600" />
                <p className="text-xs text-gray-700">
                  Only {spotsLeft} spot{spotsLeft !== 1 ? 's' : ''} left
                </p>
              </div>
            )}

            {isWaitlist && (
              <div className="flex items-center gap-2 p-3 bg-muted rounded-lg border border-border mb-4">
                <Users className="size-4 text-primary" />
                <p className="text-xs text-gray-700">
                  This event is full. Join the waitlist to be notified when spots open up.
                </p>
              </div>
            )}

            {isPaid && currentStep === 'form' && (
              <Progress value={50} className="mb-4" />
            )}
            {isPaid && currentStep === 'payment' && (
              <Progress value={100} className="mb-4" />
            )}
          </>
        )}
      </div>

      {currentStep === 'form' && renderFormStep()}
      {currentStep === 'payment' && renderPaymentStep()}
      {currentStep === 'confirmation' && renderConfirmation()}
    </div>
  );
}