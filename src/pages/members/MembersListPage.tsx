import { useState, useEffect } from 'react';
import { Users, Plus, Grid, List, Search, Filter, Download, Upload, Edit, Eye, Sparkles } from 'lucide-react';

// Types
interface MemberSummaryResponse {
  id: number;
  memberCode: string;
  fullName: string;
  email?: string;
  position?: string;
  zodiacSign: string;
  zodiacSymbol: string;
  zodiacElement: string;
  elementSymbol: string;
  avatarUrl?: string;
  membershipStatus: string;
  joinDate: string;
  isActive: boolean;
  departmentId?: number;
  departmentName?: string;
  departmentCode?: string;
  age?: number;
  daysSinceJoined?: number;
  isBirthdayToday?: boolean;
  isBirthdayThisWeek?: boolean;
}

interface MemberSearchRequest {
  keyword?: string;
  zodiacSign?: string;
  zodiacElement?: string;
  membershipStatus?: string;
  departmentId?: number;
  position?: string;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

interface PageResponse {
  content: MemberSummaryResponse[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  timestamp: string;
}

// Zodiac Colors & Gradients
const ZODIAC_COLORS: Record<string, { from: string; to: string; bg: string; text: string }> = {
  Aries: { from: '#FF6B6B', to: '#FF8E53', bg: 'bg-gradient-to-br from-red-400 to-orange-500', text: 'text-red-600' },
  Taurus: { from: '#6BCF7F', to: '#45B7D1', bg: 'bg-gradient-to-br from-green-400 to-emerald-500', text: 'text-green-600' },
  Gemini: { from: '#FFD93D', to: '#FFA500', bg: 'bg-gradient-to-br from-yellow-400 to-orange-400', text: 'text-yellow-600' },
  Cancer: { from: '#A8E6CF', to: '#56C596', bg: 'bg-gradient-to-br from-teal-300 to-green-500', text: 'text-teal-600' },
  Leo: { from: '#FFD700', to: '#FF8C00', bg: 'bg-gradient-to-br from-yellow-500 to-orange-600', text: 'text-yellow-700' },
  Virgo: { from: '#8BC6EC', to: '#9599E2', bg: 'bg-gradient-to-br from-blue-300 to-indigo-400', text: 'text-blue-600' },
  Libra: { from: '#FFDEE9', to: '#B5FFFC', bg: 'bg-gradient-to-br from-pink-300 to-cyan-300', text: 'text-pink-600' },
  Scorpio: { from: '#4A00E0', to: '#8E2DE2', bg: 'bg-gradient-to-br from-purple-700 to-purple-900', text: 'text-purple-700' },
  Sagittarius: { from: '#9B59B6', to: '#3498DB', bg: 'bg-gradient-to-br from-purple-500 to-blue-600', text: 'text-purple-600' },
  Capricorn: { from: '#2C3E50', to: '#4CA1AF', bg: 'bg-gradient-to-br from-gray-700 to-teal-600', text: 'text-gray-700' },
  Aquarius: { from: '#00C9FF', to: '#92FE9D', bg: 'bg-gradient-to-br from-cyan-400 to-green-400', text: 'text-cyan-600' },
  Pisces: { from: '#A18CD1', to: '#FBC2EB', bg: 'bg-gradient-to-br from-purple-400 to-pink-400', text: 'text-purple-600' },
};

const ELEMENT_COLORS: Record<string, string> = {
  Fire: 'bg-gradient-to-br from-red-500 to-orange-500',
  Earth: 'bg-gradient-to-br from-green-600 to-emerald-700',
  Air: 'bg-gradient-to-br from-sky-400 to-blue-500',
  Water: 'bg-gradient-to-br from-blue-500 to-cyan-600',
};

// API Service
const API_BASE_URL = 'http://localhost:8080/api';

const searchMembers = async (searchRequest: MemberSearchRequest): Promise<PageResponse> => {
  const response = await fetch(`${API_BASE_URL}/members/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(searchRequest),
  });

  if (!response.ok) throw new Error('Failed to fetch members');

  const apiResponse: ApiResponse<PageResponse> = await response.json();
  return apiResponse.data;
};

// Navigation functions
const navigateToAddMember = () => {
  window.location.href = '/members/add';
};

const navigateToEditMember = (id: number) => {
  window.location.href = `/members/${id}/edit`;
};

const navigateToMemberDetail = (id: number) => {
  window.location.href = `/members/${id}`;
};

// Member Card Component
const MemberCard = ({ member }: { member: MemberSummaryResponse }) => {
  const zodiacColor = ZODIAC_COLORS[member.zodiacSign] || ZODIAC_COLORS.Sagittarius;
  
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 border-transparent hover:border-purple-300">
      {/* Zodiac Gradient Background */}
      <div className={`absolute top-0 left-0 right-0 h-24 ${zodiacColor.bg} opacity-20 group-hover:opacity-30 transition-opacity`} />
      
      <div className="relative p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <div className={`w-14 h-14 rounded-xl ${zodiacColor.bg} flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-110 transition-transform`}>
              {member.avatarUrl ? (
                <img src={member.avatarUrl} alt={member.fullName} className="w-full h-full rounded-xl object-cover" />
              ) : (
                member.fullName.charAt(0)
              )}
            </div>
            <div className="ml-3">
              <h3 className="font-bold text-gray-900 text-lg group-hover:text-purple-600 transition-colors">
                {member.fullName}
              </h3>
              <p className="text-sm text-gray-500 font-medium">{member.memberCode}</p>
            </div>
          </div>
          
          {/* Zodiac Symbol */}
          <div className="text-4xl group-hover:scale-125 transition-transform filter drop-shadow-lg">
            {member.zodiacSymbol}
          </div>
        </div>

        {/* Position */}
        <div className="mb-4">
          <p className="text-sm text-gray-700 font-medium line-clamp-2">{member.position || 'Member'}</p>
          {member.departmentName && (
            <p className="text-xs text-gray-500 mt-1 flex items-center">
              <span className="mr-1">📂</span> {member.departmentName}
            </p>
          )}
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap mb-4">
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${zodiacColor.bg} shadow-md`}>
            ✨ {member.zodiacSign}
          </span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${ELEMENT_COLORS[member.zodiacElement]} shadow-md`}>
            {member.elementSymbol} {member.zodiacElement}
          </span>
          {member.isActive && (
            <span className="px-3 py-1 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-xs font-bold shadow-md">
              ✓ Active
            </span>
          )}
          {member.isBirthdayToday && (
            <span className="px-3 py-1 bg-gradient-to-r from-pink-400 to-rose-500 text-white rounded-full text-xs font-bold shadow-md animate-pulse">
              🎂 Birthday!
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <button
            onClick={() => navigateToMemberDetail(member.id)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            <Eye className="w-4 h-4" />
            View
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateToEditMember(member.id);
            }}
            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg font-medium hover:from-amber-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Sparkle Effect on Hover */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
      </div>
    </div>
  );
};

// Member Table Component
const MemberTable = ({ members }: { members: MemberSummaryResponse[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Member</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Position</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Zodiac</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Department</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Status</th>
          <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {members.map((member) => {
          const zodiacColor = ZODIAC_COLORS[member.zodiacSign] || ZODIAC_COLORS.Sagittarius;
          return (
            <tr key={member.id} className="hover:bg-purple-50 transition-colors">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className={`w-12 h-12 rounded-xl ${zodiacColor.bg} flex items-center justify-center text-white font-bold shadow-md`}>
                    {member.avatarUrl ? (
                      <img src={member.avatarUrl} alt={member.fullName} className="w-full h-full rounded-xl object-cover" />
                    ) : (
                      member.fullName.charAt(0)
                    )}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900">{member.fullName}</p>
                    <p className="text-sm text-gray-500">{member.memberCode}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700 font-medium">{member.position || '-'}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{member.zodiacSymbol}</span>
                  <div>
                    <p className={`font-bold ${zodiacColor.text}`}>{member.zodiacSign}</p>
                    <p className="text-xs text-gray-500">{member.elementSymbol} {member.zodiacElement}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-700">{member.departmentName || '-'}</td>
              <td className="px-6 py-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                  member.isActive 
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {member.membershipStatus}
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => navigateToMemberDetail(member.id)}
                    className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all shadow-md"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => navigateToEditMember(member.id)}
                    className="p-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white rounded-lg hover:from-amber-500 hover:to-orange-600 transition-all shadow-md"
                    title="Edit Member"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) => (
  <div className="flex items-center gap-3">
    <button
      onClick={() => onPageChange(currentPage - 1)}
      disabled={currentPage === 0}
      className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-blue-700 transition-all shadow-lg"
    >
      ← Previous
    </button>
    <div className="px-6 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg font-bold text-purple-700">
      Page {currentPage + 1} of {totalPages}
    </div>
    <button
      onClick={() => onPageChange(currentPage + 1)}
      disabled={currentPage === totalPages - 1}
      className="px-5 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:from-purple-600 hover:to-blue-700 transition-all shadow-lg"
    >
      Next →
    </button>
  </div>
);

// Main Component
const MembersListPage = () => {
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [members, setMembers] = useState<MemberSummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 12;

  const [filters] = useState<MemberSearchRequest>({
    keyword: '',
    page: 0,
    size: 12,
    sortBy: 'createdAt',
    sortDirection: 'DESC',
  });

  useEffect(() => {
    fetchMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await searchMembers({
        ...filters,
        keyword: searchQuery,
        page: currentPage,
        size: pageSize,
      });

      setMembers(response.content || []);
      setTotalPages(response.totalPages || 0);
      setTotalElements(response.totalElements || 0);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Failed to fetch members:', err);
      setError(err.message || 'Failed to load members');
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    setCurrentPage(0);
    fetchMembers();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header with Gradient */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-600 via-blue-600 to-pink-600 bg-clip-text text-transparent flex items-center gap-4">
                <Users className="w-10 h-10 text-purple-500" />
                Members Management
              </h1>
              <p className="text-gray-600 mt-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-yellow-500" />
                Manage your JCI members with zodiac insights • <span className="font-bold text-purple-600">{totalElements}</span> total members
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="flex items-center px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-md font-medium">
                <Upload className="w-5 h-5 mr-2" />
                Import
              </button>
              <button className="flex items-center px-5 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all shadow-md font-medium">
                <Download className="w-5 h-5 mr-2" />
                Export
              </button>
              <button 
                onClick={navigateToAddMember}
                className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-bold transform hover:scale-105"
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Member
              </button>
            </div>
          </div>
        </div>

        {/* Search & Actions */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-200">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-purple-400" />
              <input
                type="text"
                placeholder="Search by name, email, member code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full pl-14 pr-6 py-4 rounded-xl border-2 border-purple-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all text-lg"
              />
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center px-6 py-4 rounded-xl font-bold transition-all shadow-lg ${
                showFilters 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' 
                  : 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 hover:from-gray-200 hover:to-gray-300'
              }`}
            >
              <Filter className="w-5 h-5 mr-2" />
              Filters
            </button>

            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-2 shadow-inner">
              <button
                onClick={() => setViewMode('card')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'card'
                    ? 'bg-white text-purple-600 shadow-lg transform scale-110'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Grid className="w-6 h-6" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-white text-purple-600 shadow-lg transform scale-110'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <List className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="bg-gradient-to-r from-red-50 to-pink-50 border-2 border-red-300 rounded-2xl p-6 shadow-lg">
            <p className="text-red-800 font-bold text-lg">⚠️ {error}</p>
            <button 
              onClick={fetchMembers}
              className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium"
            >
              Try again
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-32">
            <div className="text-center">
              <div className="w-16 h-16 border-8 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-6" />
              <p className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Loading members...
              </p>
            </div>
          </div>
        ) : members.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl py-32">
            <div className="text-center">
              <Users className="w-24 h-24 text-purple-300 mx-auto mb-6" />
              <h3 className="text-3xl font-bold text-gray-900 mb-3">No members found</h3>
              <p className="text-gray-600 mb-8 text-lg">
                {searchQuery ? 'Try adjusting your search' : 'Get started by adding your first member'}
              </p>
              <button 
                onClick={navigateToAddMember}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all shadow-lg hover:shadow-xl font-bold text-lg transform hover:scale-105"
              >
                <Plus className="w-6 h-6 inline mr-2" />
                Add First Member
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Card View */}
            {viewMode === 'card' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {members.map((member) => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            )}

            {/* Table View */}
            {viewMode === 'table' && (
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200">
                <MemberTable members={members} />
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-10">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MembersListPage;