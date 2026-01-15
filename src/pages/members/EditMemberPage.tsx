import { useState, useEffect } from 'react';
import { Edit3, ArrowLeft, Save, Loader, AlertCircle } from 'lucide-react';

// Types
interface MemberData {
  id: number;
  memberCode: string;
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
  joinDate: string;
  membershipStatus?: string;
  membershipType?: string;
  notes?: string;
  zodiacSign: string;
  zodiacElement: string;
  zodiacSymbol: string;
}

interface UpdateMemberRequest {
  fullName?: string;
  dateOfBirth?: string;
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

// Mock fetch member data
const fetchMemberData = async (id: number): Promise<MemberData> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    id: id,
    memberCode: 'JCI-DN-002',
    fullName: 'Lê Thái Trung',
    dateOfBirth: '2003-12-04',
    email: 'trung.le@jcidanang.com',
    phone: '0901234502',
    address: '123 Nguyen Van Linh, Da Nang',
    city: 'Da Nang',
    emergencyContact: 'Nguyen Van A',
    emergencyPhone: '0987654321',
    facebookUrl: 'https://facebook.com/trung.le.sagittarius',
    position: 'Vice President - Membership & Training',
    departmentId: 2,
    joinDate: '2024-01-01',
    membershipStatus: 'Active',
    membershipType: 'FullMember',
    notes: 'Sagittarius VP - The Adventurer! ♐',
    zodiacSign: 'Sagittarius',
    zodiacElement: 'Fire',
    zodiacSymbol: '♐',
  };
};

const EditMemberPage = () => {
  const memberId = 2; // Get from URL params in real app
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalData, setOriginalData] = useState<MemberData | null>(null);
  const [formData, setFormData] = useState<UpdateMemberRequest>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Fetch member data on mount
  useEffect(() => {
    const loadMember = async () => {
      try {
        setIsLoading(true);
        const data = await fetchMemberData(memberId);
        setOriginalData(data);
        setFormData({
          fullName: data.fullName,
          dateOfBirth: data.dateOfBirth,
          email: data.email,
          phone: data.phone,
          address: data.address,
          city: data.city,
          emergencyContact: data.emergencyContact,
          emergencyPhone: data.emergencyPhone,
          facebookUrl: data.facebookUrl,
          position: data.position,
          departmentId: data.departmentId,
          joinDate: data.joinDate,
          membershipStatus: data.membershipStatus,
          membershipType: data.membershipType,
          notes: data.notes,
        });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        setError('Failed to load member data');
      } finally {
        setIsLoading(false);
      }
    };

    loadMember();
  }, [memberId]);

  // Calculate zodiac if DOB changed
  const currentZodiac = formData.dateOfBirth 
    ? calculateZodiacFromDate(formData.dateOfBirth)
    : null;
  
  const zodiacChanged = currentZodiac && originalData && 
    (currentZodiac.sign !== originalData.zodiacSign);

  // Update form field
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateField = (field: keyof UpdateMemberRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  // Handle save
  const handleSave = async () => {
    setError(null);
    setIsSaving(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Updated member:', formData);
      alert('Member updated successfully! ✨');
      setHasChanges(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setError('Failed to update member');
    } finally {
      setIsSaving(false);
    }
  };

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

  const statusOptions = ['Active', 'Inactive', 'OnLeave', 'Alumni'];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-purple-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading member data...</p>
        </div>
      </div>
    );
  }

  if (!originalData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-900 font-semibold mb-2">Member not found</p>
          <button className="text-purple-600 hover:text-purple-700">
            ← Back to Members
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <button className="flex items-center text-gray-600 hover:text-purple-600 mb-4 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Member Profile
          </button>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Edit Member</h1>
                <p className="text-gray-600 mt-1">
                  {originalData.memberCode} • {originalData.zodiacSymbol} {originalData.zodiacSign}
                </p>
              </div>
            </div>

            {hasChanges && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-2">
                <p className="text-sm text-amber-800 font-medium">Unsaved changes</p>
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6 flex items-start">
            <AlertCircle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Zodiac Change Warning */}
        {zodiacChanged && currentZodiac && (
          <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4 mb-6">
            <div className="flex items-start">
              <div className="text-2xl mr-3">{currentZodiac.symbol}</div>
              <div>
                <p className="font-semibold text-blue-900 mb-1">
                  Zodiac Sign Will Change!
                </p>
                <p className="text-sm text-blue-700">
                  <span className="font-medium">{originalData.zodiacSign}</span> {originalData.zodiacSymbol} 
                  {' → '}
                  <span className="font-medium">{currentZodiac.sign}</span> {currentZodiac.symbol}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm p-8">
          
          {/* Basic Information */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.fullName || ''}
                  onChange={(e) => updateField('fullName', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => updateField('dateOfBirth', e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateField('email', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => updateField('phone', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <textarea
                  value={formData.address || ''}
                  onChange={(e) => updateField('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={(e) => updateField('city', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook URL</label>
                  <input
                    type="url"
                    value={formData.facebookUrl || ''}
                    onChange={(e) => updateField('facebookUrl', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-900 mb-3">Emergency Contact</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Contact Name</label>
                    <input
                      type="text"
                      value={formData.emergencyContact || ''}
                      onChange={(e) => updateField('emergencyContact', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      value={formData.emergencyPhone || ''}
                      onChange={(e) => updateField('emergencyPhone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* JCI Information */}
          <div className="mb-8 pb-8 border-b">
            <h2 className="text-xl font-bold text-gray-900 mb-4">JCI Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Position</label>
                  <select
                    value={formData.position || ''}
                    onChange={(e) => updateField('position', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                    onChange={(e) => updateField('departmentId', Number(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>{dept.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Join Date</label>
                  <input
                    type="date"
                    value={formData.joinDate || ''}
                    onChange={(e) => updateField('joinDate', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={formData.membershipStatus || ''}
                    onChange={(e) => updateField('membershipStatus', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Additional Notes</h2>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => updateField('notes', e.target.value)}
              rows={4}
              placeholder="Add notes about this member..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t">
            <button className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium transition-colors">
              Cancel
            </button>

            <button
              onClick={handleSave}
              disabled={!hasChanges || isSaving}
              className={`flex items-center px-6 py-2 rounded-lg font-medium transition-all ${
                !hasChanges || isSaving
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {isSaving ? (
                <>
                  <Loader className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMemberPage;