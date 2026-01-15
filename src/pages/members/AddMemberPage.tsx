import { useState } from 'react';
import { UserPlus, ArrowLeft, ArrowRight, Check } from 'lucide-react';

// Types
interface CreateMemberRequest {
  fullName: string;
  dateOfBirth: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  facebookUrl?: string;
  position?: string;
  departmentId?: number;
  joinDate?: string;
  membershipStatus?: string;
  membershipType?: string;
  notes?: string;
  tags?: string[];
}

interface ZodiacInfo {
  sign: string;
  element: string;
  symbol: string;
}

// Calculate zodiac from date
const calculateZodiacFromDate = (dateOfBirth: string): ZodiacInfo | null => {
  if (!dateOfBirth) return null;
  
  const date = new Date(dateOfBirth);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  
  let sign: string, element: string, symbol: string;
  
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
    sign = 'Aries'; element = 'Fire'; symbol = '♈';
  } else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
    sign = 'Taurus'; element = 'Earth'; symbol = '♉';
  } else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
    sign = 'Gemini'; element = 'Air'; symbol = '♊';
  } else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
    sign = 'Cancer'; element = 'Water'; symbol = '♋';
  } else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
    sign = 'Leo'; element = 'Fire'; symbol = '♌';
  } else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
    sign = 'Virgo'; element = 'Earth'; symbol = '♍';
  } else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
    sign = 'Libra'; element = 'Air'; symbol = '♎';
  } else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
    sign = 'Scorpio'; element = 'Water'; symbol = '♏';
  } else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
    sign = 'Sagittarius'; element = 'Fire'; symbol = '♐';
  } else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
    sign = 'Capricorn'; element = 'Earth'; symbol = '♑';
  } else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
    sign = 'Aquarius'; element = 'Air'; symbol = '♒';
  } else {
    sign = 'Pisces'; element = 'Water'; symbol = '♓';
  }
  
  return { sign, element, symbol };
};

// Step 1: Basic Info
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BasicInfoStep = ({ formData, updateFormData, zodiacInfo }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
    
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Full Name <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        value={formData.fullName}
        onChange={(e) => updateFormData({ fullName: e.target.value })}
        placeholder="Enter full name"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Date of Birth <span className="text-red-500">*</span>
      </label>
      <input
        type="date"
        value={formData.dateOfBirth}
        onChange={(e) => updateFormData({ dateOfBirth: e.target.value })}
        max={new Date().toISOString().split('T')[0]}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
      />
    </div>

    {zodiacInfo && (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border-2 border-sagittarius-200 rounded-xl p-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <span className="text-3xl mr-3">{zodiacInfo.symbol}</span>
          Your Zodiac Sign
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Sign</p>
            <p className="text-xl font-bold text-sagittarius-600">{zodiacInfo.sign}</p>
          </div>
          <div className="bg-white rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Element</p>
            <p className="text-xl font-bold text-sagittarius-600 flex items-center">
              {zodiacInfo.element === 'Fire' && '🔥'}
              {zodiacInfo.element === 'Earth' && '🌍'}
              {zodiacInfo.element === 'Air' && '💨'}
              {zodiacInfo.element === 'Water' && '💧'}
              <span className="ml-2">{zodiacInfo.element}</span>
            </p>
          </div>
        </div>
      </div>
    )}
  </div>
);

// Step 2: Contact Info
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ContactInfoStep = ({ formData, updateFormData }: any) => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
    
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
        <input
          type="email"
          value={formData.email || ''}
          onChange={(e) => updateFormData({ email: e.target.value })}
          placeholder="email@example.com"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
        <input
          type="tel"
          value={formData.phone || ''}
          onChange={(e) => updateFormData({ phone: e.target.value })}
          placeholder="0901234567"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
        />
      </div>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
      <textarea
        value={formData.address || ''}
        onChange={(e) => updateFormData({ address: e.target.value })}
        placeholder="Enter address"
        rows={3}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
      <input
        type="text"
        value={formData.city || 'Da Nang'}
        onChange={(e) => updateFormData({ city: e.target.value })}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
      <input
        type="url"
        value={formData.facebookUrl || ''}
        onChange={(e) => updateFormData({ facebookUrl: e.target.value })}
        placeholder="https://facebook.com/username"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
      />
    </div>

    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
      <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Contact Name</label>
          <input
            type="text"
            value={formData.emergencyContact || ''}
            onChange={(e) => updateFormData({ emergencyContact: e.target.value })}
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Contact Phone</label>
          <input
            type="tel"
            value={formData.emergencyPhone || ''}
            onChange={(e) => updateFormData({ emergencyPhone: e.target.value })}
            placeholder="Phone"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
        </div>
      </div>
    </div>
  </div>
);

// Step 3: JCI Info
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const JCIInfoStep = ({ formData, updateFormData }: any) => {
  const departments = [
    { id: 1, name: 'Nhân sự (HR)' },
    { id: 2, name: 'Đào tạo (Training)' },
    { id: 3, name: 'Truyền thông (Social Media)' },
    { id: 4, name: 'Sự kiện (Event)' },
    { id: 5, name: 'Đối ngoại (Partnership)' },
    { id: 6, name: 'Dự án (Project)' },
    { id: 7, name: 'Thư ký (Secretary)' },
  ];

  const positions = [
    'Chair Person',
    'Vice President',
    'Secretary General',
    'Treasurer',
    'Legal Advisor',
    'Team Leader',
    'Member',
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">JCI Information</h2>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
        <select
          value={formData.position || ''}
          onChange={(e) => updateFormData({ position: e.target.value })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
        >
          <option value="">Select position</option>
          {positions.map((pos) => (
            <option key={pos} value={pos}>{pos}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
        <select
          value={formData.departmentId || ''}
          onChange={(e) => updateFormData({ departmentId: Number(e.target.value) })}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept.id} value={dept.id}>{dept.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Join Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={formData.joinDate || ''}
          onChange={(e) => updateFormData({ joinDate: e.target.value })}
          max={new Date().toISOString().split('T')[0]}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
        <textarea
          value={formData.notes || ''}
          onChange={(e) => updateFormData({ notes: e.target.value })}
          placeholder="Additional notes about this member..."
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sagittarius-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};

// Main Component
const AddMemberPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<CreateMemberRequest>({
    fullName: '',
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    city: 'Da Nang',
    emergencyContact: '',
    emergencyPhone: '',
    facebookUrl: '',
    position: '',
    departmentId: undefined,
    joinDate: new Date().toISOString().split('T')[0],
    membershipStatus: 'Active',
    membershipType: 'FullMember',
    notes: '',
    tags: [],
  });

  const zodiacInfo = formData.dateOfBirth 
    ? calculateZodiacFromDate(formData.dateOfBirth)
    : null;

  const updateFormData = (updates: Partial<CreateMemberRequest>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const validateStep = (): boolean => {
    switch (currentStep) {
      case 1:
        if (!formData.fullName.trim()) {
          setError('Full name is required');
          return false;
        }
        if (!formData.dateOfBirth) {
          setError('Date of birth is required');
          return false;
        }
        return true;
      case 2:
        return true;
      case 3:
        if (!formData.joinDate) {
          setError('Join date is required');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    setError(null);
    if (validateStep()) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    setError(null);
    if (!validateStep()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Member created:', formData);
      alert('Member created successfully! ✨');
      setIsSubmitting(false);
    }, 1500);
  };

  const steps = [
    { number: 1, title: 'Basic Info', description: 'Name & Birth Date' },
    { number: 2, title: 'Contact', description: 'Contact Details' },
    { number: 3, title: 'JCI Info', description: 'Position & Department' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-sagittarius-600 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Members
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Add New Member</h1>
              <p className="text-gray-600 mt-1">Create a new member profile with zodiac insights</p>
            </div>
          </div>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep > step.number
                        ? 'bg-green-500 text-white'
                        : currentStep === step.number
                        ? 'bg-purple-500 text-white ring-4 ring-purple-100'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {currentStep > step.number ? <Check className="w-5 h-5" /> : step.number}
                  </div>
                  <div className="ml-3">
                    <p className={`font-medium ${currentStep >= step.number ? 'text-gray-900' : 'text-gray-400'}`}>
                      {step.title}
                    </p>
                    <p className="text-sm text-gray-500">{step.description}</p>
                  </div>
                </div>
                
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 rounded transition-all ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Form Steps */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {currentStep === 1 && (
            <BasicInfoStep formData={formData} updateFormData={updateFormData} zodiacInfo={zodiacInfo} />
          )}
          
          {currentStep === 2 && (
            <ContactInfoStep formData={formData} updateFormData={updateFormData} />
          )}
          
          {currentStep === 3 && (
            <JCIInfoStep formData={formData} updateFormData={updateFormData} />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="flex items-center px-6 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Create Member
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMemberPage;