import React from 'react';
import { MemberSummaryResponse } from '@/types';
import { Avatar, Badge } from '@/components/common';
import { ZodiacBadge } from '@/components/zodiac';
import { format } from 'date-fns';

interface MemberTableProps {
  members: MemberSummaryResponse[];
  onRowClick?: (member: MemberSummaryResponse) => void;
}

export const MemberTable: React.FC<MemberTableProps> = ({ members, onRowClick }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'default';
      case 'OnLeave':
        return 'warning';
      case 'Alumni':
        return 'info';
      default:
        return 'default';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Member
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Member Code
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Zodiac
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Position
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Department
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Join Date
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {members.map((member) => (
            <tr
              key={member.id}
              onClick={() => onRowClick?.(member)}
              className="hover:bg-sagittarius-50 transition-colors cursor-pointer"
            >
              {/* Member Info */}
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={member.avatarUrl}
                    alt={member.fullName}
                    fallback={member.fullName}
                    size="md"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{member.fullName}</div>
                    {member.email && (
                      <div className="text-sm text-gray-500">{member.email}</div>
                    )}
                  </div>
                </div>
              </td>

              {/* Member Code */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-sagittarius-100 to-purple-100 text-sagittarius-800 border border-sagittarius-200">
                  {member.memberCode}
                </span>
              </td>

              {/* Zodiac */}
              <td className="px-6 py-4 whitespace-nowrap">
                <ZodiacBadge sign={member.zodiacSign} size="sm" />
              </td>

              {/* Position */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                  {member.position || '-'}
                </div>
              </td>

              {/* Department */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 max-w-xs truncate">
                  {member.departmentName || '-'}
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4 whitespace-nowrap">
                <Badge variant={getStatusColor(member.membershipStatus)} size="sm">
                  {member.membershipStatus}
                </Badge>
              </td>

              {/* Join Date */}
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {format(new Date(member.joinDate), 'MMM dd, yyyy')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};