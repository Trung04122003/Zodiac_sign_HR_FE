import React from 'react';
import { MemberSearchRequest, ZodiacSign, ZodiacElement, MembershipStatus } from '@/types';
import Button from '@/components/common/Button';
import { X } from 'lucide-react';
import { ZODIAC_SIGNS, ZODIAC_ELEMENTS } from '@/utils/constants';

interface MemberFiltersProps {
  filters: MemberSearchRequest;
  onFilterChange: (filters: Partial<MemberSearchRequest>) => void;
  onClearFilters: () => void;
}

export const MemberFilters: React.FC<MemberFiltersProps> = ({
  filters,
  onFilterChange,
  onClearFilters,
}) => {
  const hasActiveFilters =
    filters.zodiacSign || filters.zodiacElement || filters.membershipStatus;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-700">Filter Members</h3>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            leftIcon={<X className="w-4 h-4" />}
            onClick={onClearFilters}
          >
            Clear All
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Zodiac Sign Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Zodiac Sign
          </label>
          <select
            value={filters.zodiacSign || ''}
            onChange={(e) =>
              onFilterChange({
                zodiacSign: e.target.value ? (e.target.value as ZodiacSign) : undefined,
              })
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sagittarius-500 focus:ring-2 focus:ring-sagittarius-200 transition-colors"
          >
            <option value="">All Signs</option>
            {ZODIAC_SIGNS.map((sign) => (
              <option key={sign} value={sign}>
                {sign}
              </option>
            ))}
          </select>
        </div>

        {/* Element Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Element
          </label>
          <select
            value={filters.zodiacElement || ''}
            onChange={(e) =>
              onFilterChange({
                zodiacElement: e.target.value ? (e.target.value as ZodiacElement) : undefined,
              })
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sagittarius-500 focus:ring-2 focus:ring-sagittarius-200 transition-colors"
          >
            <option value="">All Elements</option>
            {ZODIAC_ELEMENTS.map((element) => (
              <option key={element} value={element}>
                {element}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Membership Status
          </label>
          <select
            value={filters.membershipStatus || ''}
            onChange={(e) =>
              onFilterChange({
                membershipStatus: e.target.value
                  ? (e.target.value as MembershipStatus)
                  : undefined,
              })
            }
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:border-sagittarius-500 focus:ring-2 focus:ring-sagittarius-200 transition-colors"
          >
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="OnLeave">On Leave</option>
            <option value="Alumni">Alumni</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {filters.zodiacSign && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-sagittarius-100 text-sagittarius-700 text-sm">
              {filters.zodiacSign}
              <button
                onClick={() => onFilterChange({ zodiacSign: undefined })}
                className="hover:bg-sagittarius-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.zodiacElement && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
              {filters.zodiacElement}
              <button
                onClick={() => onFilterChange({ zodiacElement: undefined })}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {filters.membershipStatus && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm">
              {filters.membershipStatus}
              <button
                onClick={() => onFilterChange({ membershipStatus: undefined })}
                className="hover:bg-green-200 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};