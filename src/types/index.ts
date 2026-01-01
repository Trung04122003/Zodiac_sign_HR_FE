// =====================================================
// ZODIAC HR MANAGEMENT - TYPESCRIPT TYPES
// Complete type definitions matching Backend DTOs
// =====================================================

// ==================== ENUMS ====================

export enum ZodiacSign {
  Aries = 'Aries',
  Taurus = 'Taurus',
  Gemini = 'Gemini',
  Cancer = 'Cancer',
  Leo = 'Leo',
  Virgo = 'Virgo',
  Libra = 'Libra',
  Scorpio = 'Scorpio',
  Sagittarius = 'Sagittarius',
  Capricorn = 'Capricorn',
  Aquarius = 'Aquarius',
  Pisces = 'Pisces',
}

export enum ZodiacElement {
  Fire = 'Fire',
  Earth = 'Earth',
  Air = 'Air',
  Water = 'Water',
}

export enum MembershipStatus {
  Active = 'Active',
  Inactive = 'Inactive',
  OnLeave = 'OnLeave',
  Alumni = 'Alumni',
}

export enum MembershipType {
  FullMember = 'FullMember',
  Associate = 'Associate',
  Honorary = 'Honorary',
}

export enum TeamStatus {
  Planning = 'Planning',
  Active = 'Active',
  OnHold = 'OnHold',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
}

export enum TeamType {
  Project = 'Project',
  Department = 'Department',
  WorkingGroup = 'WorkingGroup',
  Committee = 'Committee',
}

export enum NoteType {
  Member = 'Member',
  Team = 'Team',
  Department = 'Department',
  General = 'General',
}

export enum CompatibilityLevel {
  Excellent = 'Excellent',
  Good = 'Good',
  Moderate = 'Moderate',
  Challenging = 'Challenging',
  Difficult = 'Difficult',
}

// ==================== API RESPONSE WRAPPER ====================

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
}

// ==================== USER & AUTH ====================

export interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth: string;
  zodiacSign: ZodiacSign;
  avatarUrl?: string;
  organization: string;
  position: string;
  createdAt: string;
  updatedAt: string;
  lastLogin?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// ==================== MEMBER ====================

export interface Member {
  id: number;
  memberCode: string;
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  zodiacSign: ZodiacSign;
  zodiacElement: ZodiacElement;
  position?: string;
  departmentId?: number;
  departmentName?: string;
  joinDate: string;
  membershipStatus: MembershipStatus;
  membershipType: MembershipType;
  avatarUrl?: string;
  address?: string;
  city?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  occupation?: string;
  company?: string;
  linkedinUrl?: string;
  notes?: string;
  tags?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface MemberSummaryResponse {
  id: number;
  memberCode: string;
  fullName: string;
  email?: string;
  zodiacSign: ZodiacSign;
  zodiacElement: ZodiacElement;
  position?: string;
  departmentName?: string;
  membershipStatus: MembershipStatus;
  avatarUrl?: string;
  joinDate: string;
}

export interface CreateMemberRequest {
  fullName: string;
  email?: string;
  phone?: string;
  dateOfBirth: string;
  position?: string;
  departmentId?: number;
  joinDate: string;
  membershipType: MembershipType;
  avatarUrl?: string;
  address?: string;
  city?: string;
  emergencyContact?: string;
  emergencyPhone?: string;
  occupation?: string;
  company?: string;
  linkedinUrl?: string;
  notes?: string;
  tags?: string[];
}

export interface UpdateMemberRequest extends Partial<CreateMemberRequest> {
  membershipStatus?: MembershipStatus;
}

export interface MemberSearchRequest {
  keyword?: string;
  zodiacSign?: ZodiacSign;
  zodiacElement?: ZodiacElement;
  departmentId?: number;
  membershipStatus?: MembershipStatus;
  membershipType?: MembershipType;
  page?: number;
  size?: number;
  sortBy?: string;
  sortDirection?: 'ASC' | 'DESC';
}

// ==================== DEPARTMENT ====================

export interface Department {
  id: number;
  name: string;
  code: string;
  description?: string;
  zodiacTheme?: ZodiacSign;
  colorPrimary?: string;
  colorSecondary?: string;
  iconUrl?: string;
  leadMemberId?: number;
  leadMemberName?: string;
  memberCount: number;
  activeProjectsCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DepartmentSummaryResponse {
  id: number;
  name: string;
  code: string;
  zodiacTheme?: ZodiacSign;
  memberCount: number;
  isActive: boolean;
}

export interface CreateDepartmentRequest {
  name: string;
  code: string;
  description?: string;
  zodiacTheme?: ZodiacSign;
  colorPrimary?: string;
  colorSecondary?: string;
  iconUrl?: string;
  leadMemberId?: number;
}

export interface UpdateDepartmentRequest extends Partial<CreateDepartmentRequest> {
  isActive?: boolean;
}

// ==================== TEAM ====================

export interface Team {
  id: number;
  name: string;
  description?: string;
  type: TeamType;
  status: TeamStatus;
  departmentId?: number;
  departmentName?: string;
  startDate?: string;
  endDate?: string;
  targetMemberCount?: number;
  currentMemberCount: number;
  compatibilityScore?: number;
  elementBalance?: ElementBalance;
  hasZodiacConflicts: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TeamSummaryResponse {
  id: number;
  name: string;
  type: TeamType;
  status: TeamStatus;
  currentMemberCount: number;
  compatibilityScore?: number;
}

export interface CreateTeamRequest {
  name: string;
  description?: string;
  type: TeamType;
  departmentId?: number;
  startDate?: string;
  endDate?: string;
  targetMemberCount?: number;
}

export interface UpdateTeamRequest extends Partial<CreateTeamRequest> {
  status?: TeamStatus;
}

export interface TeamMemberResponse {
  id: number;
  teamId: number;
  memberId: number;
  memberName: string;
  memberCode: string;
  zodiacSign: ZodiacSign;
  role?: string;
  joinedAt: string;
  leftAt?: string;
  isActive: boolean;
}

export interface AddTeamMemberRequest {
  memberId: number;
  role?: string;
}

// ==================== ZODIAC PROFILE ====================

export interface ZodiacProfile {
  id: number;
  zodiacSign: ZodiacSign;
  symbol: string;
  element: ZodiacElement;
  modality: 'Cardinal' | 'Fixed' | 'Mutable';
  rulingPlanet: string;
  dateStart: string;
  dateEnd: string;
  colorPrimary: string;
  colorSecondary: string;
  colorGradientStart: string;
  colorGradientEnd: string;
  personalityTraits: string[];
  strengths: string[];
  weaknesses: string[];
  workStyle: string[];
  bestRoles?: string[];
  communicationStyle?: string;
  motivationFactors?: string[];
  stressTriggers?: string[];
  leadershipStyle?: string;
  teamContribution?: string;
  conflictResolutionStyle?: string;
  descriptionLong?: string;
  famousPeople?: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customAttributes?: Record<string, any>;
}

// ==================== COMPATIBILITY ====================

export interface ZodiacCompatibility {
  id: number;
  zodiacSign1: ZodiacSign;
  zodiacSign2: ZodiacSign;
  overallScore: number;
  workCompatibilityScore?: number;
  communicationScore?: number;
  conflictPotential?: number;
  synergyScore?: number;
  compatibilityLevel: CompatibilityLevel;
  strengthsTogether?: string;
  challengesTogether?: string;
  managementTips?: string;
  bestCollaborationType?: string;
  elementHarmony: 'Harmonious' | 'Neutral' | 'Challenging';
}

export interface TeamCompatibilityResult {
  teamSize: number;
  overallCompatibilityScore: number;
  compatibilityLevel: CompatibilityLevel;
  elementBalance: ElementBalance;
  isElementBalanced: boolean;
  conflictCount: number;
  strongPairs: PairCompatibility[];
  weakPairs: PairCompatibility[];
  keyInsights: string[];
  recommendations: string[];
}

export interface PairCompatibility {
  member1Id: number;
  member1Name: string;
  member1Sign: ZodiacSign;
  member2Id: number;
  member2Name: string;
  member2Sign: ZodiacSign;
  compatibilityScore: number;
  compatibilityLevel: CompatibilityLevel;
}

export interface ElementBalance {
  fire: number;
  earth: number;
  air: number;
  water: number;
  firePercentage: number;
  earthPercentage: number;
  airPercentage: number;
  waterPercentage: number;
  isBalanced: boolean;
  dominantElement: ZodiacElement;
  missingElements: ZodiacElement[];
}

// ==================== DASHBOARD ====================

export interface DashboardOverviewResponse {
  totalMembers: number;
  activeMembers: number;
  totalTeams: number;
  activeTeams: number;
  totalDepartments: number;
  mostCommonZodiacSign: ZodiacSign;
  mostCommonElement: ZodiacElement;
  averageTeamCompatibility: number;
  upcomingBirthdays: number;
}

export interface ChartDataResponse {
  labels: string[];
  datasets: ChartDataset[];
}

export interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string[];
  borderColor?: string[];
  borderWidth?: number;
}

export interface TimelineDataResponse {
  months: string[];
  newHires: number[];
  zodiacMarkers: ZodiacMarker[];
}

export interface ZodiacMarker {
  month: string;
  zodiacSign: ZodiacSign;
  count: number;
}

// ==================== NOTES ====================

export interface Note {
  id: number;
  noteType: NoteType;
  memberId?: number;
  teamId?: number;
  departmentId?: number;
  title?: string;
  content: string;
  tags?: string[];
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: number;
}

export interface CreateNoteRequest {
  noteType: NoteType;
  memberId?: number;
  teamId?: number;
  departmentId?: number;
  title?: string;
  content: string;
  tags?: string[];
  isImportant?: boolean;
}

// ==================== PAGINATION ====================

export interface Page<T> {
  content: T[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  numberOfElements: number;
  empty: boolean;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

// ==================== EXPORT ====================

export type {
  // Add any additional exports here
};