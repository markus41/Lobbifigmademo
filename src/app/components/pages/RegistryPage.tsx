/**
 * Registry Page (Guest Registry)
 *
 * Hierarchical member registry with National -> State -> Local -> Members structure.
 * Features:
 * - Expandable chapter hierarchy
 * - Quick member access
 * - Chapter-level member counts
 * - Search and filtering
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Organization, Account } from '../../data/themes';

// ============================================================================
// TYPES
// ============================================================================

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  joinDate: string;
  positionHistory: PositionHistory[];
  engagementScore: number;
  totalDonations: number;
  eventsAttended: number;
  avatar?: string;
}

interface PositionHistory {
  title: string;
  startDate: string;
  endDate?: string;
}

interface Chapter {
  id: string;
  name: string;
  type: 'national' | 'regional' | 'state' | 'local';
  parentId?: string;
  memberCount: number;
  children?: Chapter[];
  members?: Member[];
}

interface RegistryPageProps {
  organization: Organization;
  account: Account;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_CHAPTERS: Chapter[] = [
  {
    id: 'national',
    name: 'National Association of Healthcare Professionals',
    type: 'national',
    memberCount: 15420,
    children: [
      {
        id: 'region-west',
        name: 'Western Region',
        type: 'regional',
        parentId: 'national',
        memberCount: 4230,
        children: [
          {
            id: 'state-ca',
            name: 'California Chapter',
            type: 'state',
            parentId: 'region-west',
            memberCount: 2150,
            children: [
              { id: 'local-la', name: 'Los Angeles', type: 'local', parentId: 'state-ca', memberCount: 890 },
              { id: 'local-sf', name: 'San Francisco Bay Area', type: 'local', parentId: 'state-ca', memberCount: 720 },
              { id: 'local-sd', name: 'San Diego', type: 'local', parentId: 'state-ca', memberCount: 540 },
            ],
          },
          {
            id: 'state-wa',
            name: 'Washington Chapter',
            type: 'state',
            parentId: 'region-west',
            memberCount: 1280,
            children: [
              { id: 'local-seattle', name: 'Seattle Metro', type: 'local', parentId: 'state-wa', memberCount: 780 },
              { id: 'local-tacoma', name: 'Tacoma', type: 'local', parentId: 'state-wa', memberCount: 500 },
            ],
          },
          {
            id: 'state-or',
            name: 'Oregon Chapter',
            type: 'state',
            parentId: 'region-west',
            memberCount: 800,
          },
        ],
      },
      {
        id: 'region-east',
        name: 'Eastern Region',
        type: 'regional',
        parentId: 'national',
        memberCount: 5890,
        children: [
          {
            id: 'state-ny',
            name: 'New York Chapter',
            type: 'state',
            parentId: 'region-east',
            memberCount: 2840,
            children: [
              { id: 'local-nyc', name: 'New York City', type: 'local', parentId: 'state-ny', memberCount: 1920 },
              { id: 'local-albany', name: 'Albany', type: 'local', parentId: 'state-ny', memberCount: 520 },
              { id: 'local-buffalo', name: 'Buffalo', type: 'local', parentId: 'state-ny', memberCount: 400 },
            ],
          },
          {
            id: 'state-ma',
            name: 'Massachusetts Chapter',
            type: 'state',
            parentId: 'region-east',
            memberCount: 1650,
          },
          {
            id: 'state-pa',
            name: 'Pennsylvania Chapter',
            type: 'state',
            parentId: 'region-east',
            memberCount: 1400,
          },
        ],
      },
      {
        id: 'region-central',
        name: 'Central Region',
        type: 'regional',
        parentId: 'national',
        memberCount: 3200,
      },
      {
        id: 'region-south',
        name: 'Southern Region',
        type: 'regional',
        parentId: 'national',
        memberCount: 2100,
      },
    ],
  },
];

const MOCK_MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@example.com',
    role: 'Active Member',
    joinDate: '2019-03-15',
    positionHistory: [
      { title: 'President', startDate: '2022-01-01', endDate: '2023-12-31' },
      { title: 'Vice President', startDate: '2020-01-01', endDate: '2021-12-31' },
      { title: 'Board Member', startDate: '2019-06-01', endDate: '2019-12-31' },
    ],
    engagementScore: 95,
    totalDonations: 2500,
    eventsAttended: 42,
  },
  {
    id: 'm2',
    name: 'Michael Chen',
    email: 'michael.chen@example.com',
    role: 'Board Member',
    joinDate: '2020-06-22',
    positionHistory: [
      { title: 'Secretary', startDate: '2023-01-01' },
      { title: 'Committee Chair', startDate: '2021-06-01', endDate: '2022-12-31' },
    ],
    engagementScore: 88,
    totalDonations: 1800,
    eventsAttended: 35,
  },
  {
    id: 'm3',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@example.com',
    role: 'Active Member',
    joinDate: '2021-01-10',
    positionHistory: [],
    engagementScore: 72,
    totalDonations: 450,
    eventsAttended: 18,
  },
  {
    id: 'm4',
    name: 'James Wilson',
    email: 'james.wilson@example.com',
    role: 'Past President',
    joinDate: '2015-08-05',
    positionHistory: [
      { title: 'President', startDate: '2018-01-01', endDate: '2019-12-31' },
      { title: 'Treasurer', startDate: '2016-01-01', endDate: '2017-12-31' },
    ],
    engagementScore: 82,
    totalDonations: 5200,
    eventsAttended: 78,
  },
];

// ============================================================================
// ICONS
// ============================================================================

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronDownIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UsersIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const BuildingIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18M2 22h20M9 6h.01M9 10h.01M9 14h.01M15 6h.01M15 10h.01M15 14h.01" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);

// ============================================================================
// CHAPTER TREE NODE
// ============================================================================

interface ChapterNodeProps {
  chapter: Chapter;
  level: number;
  organization: Organization;
  onSelectChapter: (chapter: Chapter) => void;
  selectedChapterId?: string;
}

function ChapterNode({
  chapter,
  level,
  organization,
  onSelectChapter,
  selectedChapterId,
}: ChapterNodeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2);
  const hasChildren = chapter.children && chapter.children.length > 0;
  const isSelected = selectedChapterId === chapter.id;

  const typeColors = {
    national: organization.theme.primary,
    regional: organization.theme.primaryLight,
    state: organization.theme.primaryLight,
    local: '#8A8578',
  };

  const typeLabels = {
    national: 'National',
    regional: 'Region',
    state: 'State',
    local: 'Local',
  };

  return (
    <div className="select-none">
      <motion.div
        className={`flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-colors ${
          isSelected ? 'ring-2' : ''
        }`}
        style={{
          marginLeft: `${level * 20}px`,
          backgroundColor: isSelected ? `rgba(${organization.theme.primaryRgb}, 0.08)` : 'transparent',
          ringColor: isSelected ? `rgba(${organization.theme.primaryRgb}, 0.4)` : undefined,
        }}
        onClick={() => onSelectChapter(chapter)}
        whileHover={{ backgroundColor: `rgba(${organization.theme.primaryRgb}, 0.04)` }}
      >
        {/* Expand/Collapse Toggle */}
        {hasChildren ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded(!isExpanded);
            }}
            className="p-1 rounded hover:bg-gray-200 transition-colors"
          >
            {isExpanded ? (
              <ChevronDownIcon className="w-4 h-4 text-gray-500" />
            ) : (
              <ChevronRightIcon className="w-4 h-4 text-gray-500" />
            )}
          </button>
        ) : (
          <div className="w-6" />
        )}

        {/* Chapter Icon */}
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${typeColors[chapter.type]}15` }}
        >
          <BuildingIcon className="w-4 h-4" style={{ color: typeColors[chapter.type] }} />
        </div>

        {/* Chapter Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm text-gray-900 truncate">{chapter.name}</span>
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: `${typeColors[chapter.type]}20`,
                color: typeColors[chapter.type],
              }}
            >
              {typeLabels[chapter.type]}
            </span>
          </div>
        </div>

        {/* Member Count */}
        <div className="flex items-center gap-1.5 text-gray-500">
          <UsersIcon className="w-4 h-4" />
          <span className="text-sm font-medium">{chapter.memberCount.toLocaleString()}</span>
        </div>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {chapter.children!.map((child) => (
              <ChapterNode
                key={child.id}
                chapter={child}
                level={level + 1}
                organization={organization}
                onSelectChapter={onSelectChapter}
                selectedChapterId={selectedChapterId}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ============================================================================
// MEMBER CARD
// ============================================================================

interface MemberCardProps {
  member: Member;
  organization: Organization;
}

function MemberCard({ member, organization }: MemberCardProps) {
  const initials = member.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <motion.div
      className="bg-white rounded-xl border p-4 cursor-pointer"
      style={{ borderColor: '#EDE8DD' }}
      whileHover={{
        y: -2,
        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
          style={{ background: organization.theme.gradientBtn }}
        >
          {initials}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-gray-900">{member.name}</h3>
            {member.positionHistory.length > 0 && (
              <AwardIcon className="w-4 h-4" style={{ color: organization.theme.primary }} />
            )}
          </div>
          <p className="text-sm text-gray-500">{member.email}</p>
          <div className="flex items-center gap-3 mt-2">
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `rgba(${organization.theme.primaryRgb}, 0.1)`,
                color: organization.theme.primaryDark,
              }}
            >
              {member.role}
            </span>
            {member.positionHistory[0] && !member.positionHistory[0].endDate && (
              <span className="text-xs text-gray-500">
                Current: {member.positionHistory[0].title}
              </span>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="text-right">
          <div className="text-lg font-bold" style={{ color: organization.theme.primary }}>
            {member.engagementScore}%
          </div>
          <div className="text-xs text-gray-500">Engagement</div>
        </div>
      </div>

      {/* Position History */}
      {member.positionHistory.length > 0 && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: '#EDE8DD' }}>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Position History
          </p>
          <div className="flex flex-wrap gap-2">
            {member.positionHistory.map((pos, i) => (
              <span
                key={i}
                className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700"
              >
                {pos.title}
                <span className="text-gray-400 ml-1">
                  {pos.endDate ? `(${pos.startDate.split('-')[0]}-${pos.endDate.split('-')[0]})` : '(Current)'}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t grid grid-cols-3 gap-4" style={{ borderColor: '#EDE8DD' }}>
        <div>
          <p className="text-xs text-gray-500">Events</p>
          <p className="font-semibold text-gray-900">{member.eventsAttended}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Donations</p>
          <p className="font-semibold text-gray-900">${member.totalDonations.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">Member Since</p>
          <p className="font-semibold text-gray-900">{member.joinDate.split('-')[0]}</p>
        </div>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function RegistryPage({ organization, account }: RegistryPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [viewMode, setViewMode] = useState<'hierarchy' | 'members'>('hierarchy');

  const filteredMembers = useMemo(() => {
    if (!searchQuery) return MOCK_MEMBERS;
    const query = searchQuery.toLowerCase();
    return MOCK_MEMBERS.filter(
      (m) =>
        m.name.toLowerCase().includes(query) ||
        m.email.toLowerCase().includes(query) ||
        m.role.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1
          className="text-3xl font-light mb-2"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            color: '#2C2A25',
          }}
        >
          The Registry
        </h1>
        <p className="text-gray-500">
          Manage your organization's membership hierarchy and member records
        </p>
      </div>

      {/* Search & Filters */}
      <div className="mb-6 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search members by name, email, or role..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border rounded-xl text-sm focus:outline-none transition-all"
            style={{
              borderColor: '#EDE8DD',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = organization.theme.primary;
              e.target.style.boxShadow = `0 0 0 3px rgba(${organization.theme.primaryRgb}, 0.1)`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#EDE8DD';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'hierarchy' ? 'bg-white shadow-sm' : ''
            }`}
            onClick={() => setViewMode('hierarchy')}
            style={{
              color: viewMode === 'hierarchy' ? organization.theme.primary : '#8A8578',
            }}
          >
            Hierarchy
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              viewMode === 'members' ? 'bg-white shadow-sm' : ''
            }`}
            onClick={() => setViewMode('members')}
            style={{
              color: viewMode === 'members' ? organization.theme.primary : '#8A8578',
            }}
          >
            All Members
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chapter Hierarchy */}
        <div className="lg:col-span-1">
          <div
            className="bg-white rounded-xl border p-4"
            style={{ borderColor: '#EDE8DD' }}
          >
            <h2 className="font-semibold text-gray-900 mb-4">Chapter Hierarchy</h2>
            <div className="space-y-1">
              {MOCK_CHAPTERS.map((chapter) => (
                <ChapterNode
                  key={chapter.id}
                  chapter={chapter}
                  level={0}
                  organization={organization}
                  onSelectChapter={setSelectedChapter}
                  selectedChapterId={selectedChapter?.id}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-gray-900">
              {selectedChapter ? `${selectedChapter.name} Members` : 'All Members'}
            </h2>
            <span className="text-sm text-gray-500">
              {filteredMembers.length} member{filteredMembers.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member.id}
                member={member}
                organization={organization}
              />
            ))}
          </div>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">No members found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistryPage;
