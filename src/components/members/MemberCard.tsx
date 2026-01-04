import React from 'react';
import { MemberSummaryResponse } from '@/types';
import { Card, Avatar, Badge } from '@/components/common';
import { ZodiacBadge, ElementBadge } from '@/components/zodiac';
import { getZodiacElement } from '@/utils/zodiacHelpers';
import { Mail, Building2, Calendar, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

interface MemberCardProps {
  member: MemberSummaryResponse;
  onClick?: () => void;
}

export const MemberCard: React.FC<MemberCardProps> = ({ member, onClick }) => {
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
    <Card
      hover
      className="group cursor-pointer relative overflow-hidden"
      onClick={onClick}
    >
      {/* Zodiac Pattern Background */}
      <div className="absolute top-0 right-0 text-9xl opacity-5 pointer-events-none">
        {member.zodiacSign && getZodiacElement(member.zodiacSign) === 'Fire' && '🔥'}
        {member.zodiacSign && getZodiacElement(member.zodiacSign) === 'Earth' && '🌍'}
        {member.zodiacSign && getZodiacElement(member.zodiacSign) === 'Air' && '💨'}
        {member.zodiacSign && getZodiacElement(member.zodiacSign) === 'Water' && '💧'}
      </div>

      {/* Status Badge */}
      <div className="absolute top-4 right-4 z-10">
        <Badge variant={getStatusColor(member.membershipStatus)} size="sm">
          {member.membershipStatus}
        </Badge>
      </div>

      {/* Avatar & Basic Info */}
      <div className="flex flex-col items-center text-center mb-4">
        <div className="relative mb-3">
          <Avatar
            src={member.avatarUrl}
            alt={member.fullName}
            fallback={member.fullName}
            size="xl"
            className="ring-4 ring-white shadow-lg group-hover:ring-sagittarius-200 transition-all"
          />
          {/* Member Code Badge */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-r from-sagittarius-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md whitespace-nowrap">
            {member.memberCode}
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 group-hover:text-sagittarius-600 transition-colors line-clamp-1">
          {member.fullName}
        </h3>
        
        {member.position && (
          <p className="text-sm text-gray-600 line-clamp-1">{member.position}</p>
        )}
      </div>

      {/* Zodiac Info */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <ZodiacBadge sign={member.zodiacSign} size="sm" />
        <ElementBadge element={member.zodiacElement} size="sm" />
      </div>

      {/* Contact Info */}
      <div className="space-y-2 text-sm">
        {member.email && (
          <div className="flex items-center gap-2 text-gray-600">
            <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{member.email}</span>
          </div>
        )}
        
        {member.departmentName && (
          <div className="flex items-center gap-2 text-gray-600">
            <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
            <span className="line-clamp-1">{member.departmentName}</span>
          </div>
        )}

        <div className="flex items-center gap-2 text-gray-600">
          <Calendar className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <span>Joined {format(new Date(member.joinDate), 'MMM dd, yyyy')}</span>
        </div>
      </div>

      {/* Hover Effect - View Details */}
      <div className="absolute inset-0 bg-gradient-to-t from-sagittarius-500 to-transparent opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none" />
      
      <div className="mt-4 pt-4 border-t border-gray-200 flex items-center justify-center gap-2 text-sagittarius-600 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity">
        <span>View Details</span>
        <ExternalLink className="w-4 h-4" />
      </div>
    </Card>
  );
};