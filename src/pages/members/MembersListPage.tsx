import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, Plus, Grid, List, Search, Filter, Download, Upload } from 'lucide-react';
import { memberService } from '@/api';
import { MemberSummaryResponse, MemberSearchRequest } from '@/types';
import Button from '@/components/common/Button';
import { Card, Loading } from '@/components/common';
import { MemberCard } from '@/components/members/MemberCard';
import { MemberTable } from '@/components/members/MemberTable';
import { MemberFilters } from '@/components/members/MemberFilters';
import { Pagination } from '@/components/common/Pagination';

const MembersListPage: React.FC = () => {
  const navigate = useNavigate();
  
  // State Management
  const [viewMode, setViewMode] = useState<'card' | 'table'>('card');
  const [members, setMembers] = useState<MemberSummaryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [pageSize] = useState(12);
  
  // Filter State
  const [filters, setFilters] = useState<MemberSearchRequest>({
    keyword: '',
    zodiacSign: undefined,
    zodiacElement: undefined,
    departmentId: undefined,
    membershipStatus: undefined,
    page: 0,
    size: 12,
    sortBy: 'createdAt',
    sortDirection: 'DESC',
  });

  // Fetch Members
  useEffect(() => {
    fetchMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage, filters]);

  const fetchMembers = async () => {
    try {
      setIsLoading(true);
      const response = await memberService.searchMembers({
        ...filters,
        keyword: searchQuery,
        page: currentPage,
        size: pageSize,
      });
      
      setMembers(response.content);
      setTotalPages(response.totalPages);
      setTotalElements(response.totalElements);
    } catch (error) {
      console.error('Failed to fetch members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handlers
  const handleSearch = () => {
    setCurrentPage(0);
    fetchMembers();
  };

  const handleFilterChange = (newFilters: Partial<MemberSearchRequest>) => {
    setFilters({ ...filters, ...newFilters });
    setCurrentPage(0);
  };

  const handleClearFilters = () => {
    setFilters({
      keyword: '',
      zodiacSign: undefined,
      zodiacElement: undefined,
      departmentId: undefined,
      membershipStatus: undefined,
      page: 0,
      size: 12,
      sortBy: 'createdAt',
      sortDirection: 'DESC',
    });
    setSearchQuery('');
    setCurrentPage(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-sagittarius-500" />
            Members Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your JCI members with zodiac insights • {totalElements} total members
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            leftIcon={<Upload className="w-4 h-4" />}
            onClick={() => navigate('/members/import')}
          >
            Import
          </Button>
          <Button
            variant="outline"
            leftIcon={<Download className="w-4 h-4" />}
          >
            Export
          </Button>
          <Button
            variant="primary"
            leftIcon={<Plus className="w-5 h-5" />}
            onClick={() => navigate('/members/add')}
          >
            Add Member
          </Button>
        </div>
      </div>

      {/* Search & Actions Bar */}
      <Card className="p-4">
        <div className="flex items-center gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, email, member code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:border-sagittarius-500 focus:ring-2 focus:ring-sagittarius-200 transition-colors"
            />
          </div>

          {/* Filter Toggle */}
          <Button
            variant={showFilters ? 'primary' : 'outline'}
            leftIcon={<Filter className="w-4 h-4" />}
            onClick={() => setShowFilters(!showFilters)}
          >
            Filters
          </Button>

          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'card'
                  ? 'bg-white text-sagittarius-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Card View"
            >
              <Grid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white text-sagittarius-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Table View"
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <MemberFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
            />
          </div>
        )}
      </Card>

      {/* Members Content */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loading size="lg" text="Loading members..." />
        </div>
      ) : members.length === 0 ? (
        <Card className="py-20">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No members found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || filters.zodiacSign
                ? 'Try adjusting your search or filters'
                : 'Get started by adding your first member'}
            </p>
            {!searchQuery && !filters.zodiacSign && (
              <Button
                variant="primary"
                leftIcon={<Plus className="w-5 h-5" />}
                onClick={() => navigate('/members/add')}
              >
                Add First Member
              </Button>
            )}
          </div>
        </Card>
      ) : (
        <>
          {/* Card View */}
          {viewMode === 'card' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {members.map((member) => (
                <MemberCard
                  key={member.id}
                  member={member}
                  onClick={() => navigate(`/members/${member.id}`)}
                />
              ))}
            </div>
          )}

          {/* Table View */}
          {viewMode === 'table' && (
            <Card padding="none">
              <MemberTable
                members={members}
                onRowClick={(member) => navigate(`/members/${member.id}`)}
              />
            </Card>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MembersListPage;