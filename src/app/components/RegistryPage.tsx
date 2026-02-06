'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Users, ChevronRight, ChevronDown, Search, Filter, MapPin, Building2, Globe } from 'lucide-react';
import { Organization, Account } from '../data/themes';

interface RegistryPageProps {
  organization?: Organization;
  account?: Account;
}

const REGISTRY_DATA = {
  national: {
    name: 'National Organization',
    memberCount: 12450,
    states: [
      {
        name: 'California',
        code: 'CA',
        memberCount: 3200,
        chapters: [
          {
            name: 'Los Angeles Chapter',
            memberCount: 890,
            president: 'Sarah Johnson',
            members: [
              { name: 'John Smith', role: 'Vice President', joined: '2023', status: 'active' },
              { name: 'Emily Davis', role: 'Treasurer', joined: '2022', status: 'active' },
              { name: 'Mike Wilson', role: 'Secretary', joined: '2024', status: 'active' },
              { name: 'Lisa Brown', role: 'Member', joined: '2023', status: 'pending' },
            ]
          },
          {
            name: 'San Francisco Chapter',
            memberCount: 670,
            president: 'David Chen',
            members: [
              { name: 'Anna Lee', role: 'Vice President', joined: '2022', status: 'active' },
              { name: 'Tom Garcia', role: 'Member', joined: '2024', status: 'active' },
              { name: 'Rachel Kim', role: 'Member', joined: '2023', status: 'active' },
            ]
          }
        ]
      },
      {
        name: 'New York',
        code: 'NY',
        memberCount: 2800,
        chapters: [
          {
            name: 'Manhattan Chapter',
            memberCount: 1200,
            president: 'James Williams',
            members: [
              { name: 'Sophie Turner', role: 'VP', joined: '2022', status: 'active' },
              { name: 'Alex Rivera', role: 'Treasurer', joined: '2023', status: 'active' },
              { name: 'Chris Park', role: 'Member', joined: '2024', status: 'pending' },
            ]
          },
          {
            name: 'Brooklyn Chapter',
            memberCount: 780,
            president: 'Maria Santos',
            members: [
              { name: 'Jordan Lee', role: 'Secretary', joined: '2023', status: 'active' },
              { name: 'Taylor Swift', role: 'Member', joined: '2024', status: 'active' },
            ]
          }
        ]
      },
      {
        name: 'Texas',
        code: 'TX',
        memberCount: 2100,
        chapters: [
          {
            name: 'Houston Chapter',
            memberCount: 950,
            president: 'Robert Johnson',
            members: [
              { name: 'Amanda White', role: 'VP', joined: '2022', status: 'active' },
              { name: 'Kevin Brown', role: 'Member', joined: '2023', status: 'active' },
            ]
          }
        ]
      }
    ]
  }
};

export function RegistryPage({ organization, account }: RegistryPageProps) {
  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';
  const memberLabel = organization?.identity.memberLabel || 'Members';

  const [expandedNational, setExpandedNational] = useState(true);
  const [expandedStates, setExpandedStates] = useState<Record<string, boolean>>({});
  const [expandedChapters, setExpandedChapters] = useState<Record<string, boolean>>({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleState = (stateCode: string) => {
    setExpandedStates(prev => ({ ...prev, [stateCode]: !prev[stateCode] }));
  };

  const toggleChapter = (chapterKey: string) => {
    setExpandedChapters(prev => ({ ...prev, [chapterKey]: !prev[chapterKey] }));
  };

  const buildBreadcrumb = () => {
    const crumbs: string[] = ['The Registry'];
    if (expandedNational) {
      crumbs.push(REGISTRY_DATA.national.name);
    }
    return crumbs;
  };

  const breadcrumbs = buildBreadcrumb();

  return (
    <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 32,
            fontWeight: 700,
            color: '#1a1a1a',
            marginBottom: 4,
          }}
        >
          The Registry
        </h1>
        <p
          style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 15,
            color: '#6b7280',
            marginBottom: 20,
          }}
        >
          Explore the organizational hierarchy and {memberLabel.toLowerCase()} directory
        </p>

        {/* Search and Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                width: 18,
                height: 18,
                color: '#9ca3af',
              }}
            />
            <input
              type="text"
              placeholder={`Search ${memberLabel.toLowerCase()}, chapters, or states...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                paddingLeft: 40,
                paddingRight: 16,
                paddingTop: 10,
                paddingBottom: 10,
                border: `1px solid rgba(${rgb}, 0.2)`,
                borderRadius: 10,
                fontSize: 14,
                fontFamily: 'DM Sans, sans-serif',
                outline: 'none',
                background: '#fff',
                color: '#1a1a1a',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = primary;
                e.currentTarget.style.boxShadow = `0 0 0 3px rgba(${rgb}, 0.1)`;
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = `rgba(${rgb}, 0.2)`;
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              border: `1px solid rgba(${rgb}, 0.2)`,
              borderRadius: 10,
              background: '#fff',
              color: '#374151',
              fontSize: 14,
              fontFamily: 'DM Sans, sans-serif',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
          >
            <Filter style={{ width: 16, height: 16 }} />
            Filters
          </motion.button>
        </div>
      </motion.div>

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'DM Sans, sans-serif',
          fontSize: 13,
        }}
      >
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && (
              <ChevronRight style={{ width: 14, height: 14, color: '#9ca3af' }} />
            )}
            <span
              style={{
                color: i === breadcrumbs.length - 1 ? primary : '#6b7280',
                fontWeight: i === breadcrumbs.length - 1 ? 600 : 400,
              }}
            >
              {crumb}
            </span>
          </span>
        ))}
      </motion.div>

      {/* National Level */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        whileHover={{ y: -2 }}
        onClick={() => setExpandedNational(!expandedNational)}
        style={{
          background: '#fff',
          border: `1px solid rgba(${rgb}, 0.08)`,
          borderRadius: 14,
          padding: '18px 22px',
          cursor: 'pointer',
          transition: 'box-shadow 0.2s',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div
              style={{
                width: 42,
                height: 42,
                borderRadius: 12,
                background: `rgba(${rgb}, 0.1)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Globe style={{ width: 22, height: 22, color: primary }} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#1a1a1a',
                }}
              >
                {REGISTRY_DATA.national.name}
              </div>
              <div
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: 13,
                  color: '#6b7280',
                  marginTop: 2,
                }}
              >
                {REGISTRY_DATA.national.states.length} State/Regional Chapters
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                padding: '5px 12px',
                background: `rgba(${rgb}, 0.08)`,
                borderRadius: 20,
                fontFamily: 'DM Sans, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: primary,
              }}
            >
              <Users style={{ width: 14, height: 14 }} />
              {REGISTRY_DATA.national.memberCount.toLocaleString()} {memberLabel}
            </span>
            {expandedNational ? (
              <ChevronDown style={{ width: 20, height: 20, color: '#9ca3af' }} />
            ) : (
              <ChevronRight style={{ width: 20, height: 20, color: '#9ca3af' }} />
            )}
          </div>
        </div>
      </motion.div>

      {/* States Level */}
      {expandedNational && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, paddingLeft: 28 }}>
          {REGISTRY_DATA.national.states.map((state, stateIdx) => (
            <motion.div
              key={state.code}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.05 * stateIdx }}
            >
              {/* State Card */}
              <motion.div
                whileHover={{ y: -2 }}
                onClick={() => toggleState(state.code)}
                style={{
                  background: '#fff',
                  border: `1px solid rgba(${rgb}, 0.08)`,
                  borderRadius: 14,
                  padding: '16px 20px',
                  cursor: 'pointer',
                  transition: 'box-shadow 0.2s',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: `rgba(${rgb}, 0.08)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <MapPin style={{ width: 19, height: 19, color: primary }} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 16,
                          fontWeight: 600,
                          color: '#1a1a1a',
                        }}
                      >
                        {state.name}
                      </div>
                      <div
                        style={{
                          fontFamily: 'DM Sans, sans-serif',
                          fontSize: 12,
                          color: '#9ca3af',
                          marginTop: 1,
                        }}
                      >
                        {state.chapters.length} Local Chapter{state.chapters.length !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 5,
                        padding: '4px 10px',
                        background: `rgba(${rgb}, 0.06)`,
                        borderRadius: 16,
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        color: primary,
                      }}
                    >
                      <Users style={{ width: 12, height: 12 }} />
                      {state.memberCount.toLocaleString()}
                    </span>
                    {expandedStates[state.code] ? (
                      <ChevronDown style={{ width: 18, height: 18, color: '#9ca3af' }} />
                    ) : (
                      <ChevronRight style={{ width: 18, height: 18, color: '#9ca3af' }} />
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Chapters Level */}
              {expandedStates[state.code] && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 28, marginTop: 12 }}>
                  {state.chapters.map((chapter, chapterIdx) => {
                    const chapterKey = `${state.code}-${chapter.name}`;
                    return (
                      <motion.div
                        key={chapterKey}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * chapterIdx }}
                      >
                        {/* Chapter Card */}
                        <motion.div
                          whileHover={{ y: -2 }}
                          onClick={() => toggleChapter(chapterKey)}
                          style={{
                            background: '#fff',
                            border: `1px solid rgba(${rgb}, 0.08)`,
                            borderRadius: 12,
                            padding: '14px 18px',
                            cursor: 'pointer',
                            transition: 'box-shadow 0.2s',
                            boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                              <div
                                style={{
                                  width: 34,
                                  height: 34,
                                  borderRadius: 9,
                                  background: `rgba(${rgb}, 0.06)`,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Building2 style={{ width: 17, height: 17, color: primary }} />
                              </div>
                              <div>
                                <div
                                  style={{
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontSize: 15,
                                    fontWeight: 600,
                                    color: '#1a1a1a',
                                  }}
                                >
                                  {chapter.name}
                                </div>
                                <div
                                  style={{
                                    fontFamily: 'DM Sans, sans-serif',
                                    fontSize: 12,
                                    color: '#9ca3af',
                                    marginTop: 1,
                                  }}
                                >
                                  President: {chapter.president}
                                </div>
                              </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <span
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: 5,
                                  padding: '4px 10px',
                                  background: `rgba(${rgb}, 0.06)`,
                                  borderRadius: 16,
                                  fontFamily: 'DM Sans, sans-serif',
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: primary,
                                }}
                              >
                                <Users style={{ width: 12, height: 12 }} />
                                {chapter.memberCount.toLocaleString()}
                              </span>
                              {expandedChapters[chapterKey] ? (
                                <ChevronDown style={{ width: 16, height: 16, color: '#9ca3af' }} />
                              ) : (
                                <ChevronRight style={{ width: 16, height: 16, color: '#9ca3af' }} />
                              )}
                            </div>
                          </div>
                        </motion.div>

                        {/* Members Level */}
                        {expandedChapters[chapterKey] && (
                          <div
                            style={{
                              marginTop: 10,
                              marginLeft: 28,
                              background: '#fff',
                              border: `1px solid rgba(${rgb}, 0.08)`,
                              borderRadius: 10,
                              overflow: 'hidden',
                            }}
                          >
                            {/* Members Header */}
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '10px 16px',
                                background: `rgba(${rgb}, 0.03)`,
                                borderBottom: `1px solid rgba(${rgb}, 0.06)`,
                              }}
                            >
                              <Users style={{ width: 14, height: 14, color: primary }} />
                              <span
                                style={{
                                  fontFamily: 'DM Sans, sans-serif',
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: '#6b7280',
                                  textTransform: 'uppercase',
                                  letterSpacing: 0.5,
                                }}
                              >
                                {memberLabel}
                              </span>
                            </div>

                            {/* Member Rows */}
                            {chapter.members.map((member, memberIdx) => (
                              <motion.div
                                key={member.name}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: 0.04 * memberIdx }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '12px 16px',
                                  borderBottom:
                                    memberIdx < chapter.members.length - 1
                                      ? `1px solid rgba(${rgb}, 0.05)`
                                      : 'none',
                                  transition: 'background 0.15s',
                                  cursor: 'default',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = `rgba(${rgb}, 0.02)`;
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = 'transparent';
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                                  <div
                                    style={{
                                      width: 32,
                                      height: 32,
                                      borderRadius: '50%',
                                      background: `rgba(${rgb}, 0.1)`,
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      fontFamily: 'DM Sans, sans-serif',
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: primary,
                                    }}
                                  >
                                    {member.name
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </div>
                                  <div>
                                    <div
                                      style={{
                                        fontFamily: 'DM Sans, sans-serif',
                                        fontSize: 14,
                                        fontWeight: 500,
                                        color: '#1a1a1a',
                                      }}
                                    >
                                      {member.name}
                                    </div>
                                    <div
                                      style={{
                                        fontFamily: 'DM Sans, sans-serif',
                                        fontSize: 12,
                                        color: '#9ca3af',
                                      }}
                                    >
                                      {member.role}
                                    </div>
                                  </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                  <span
                                    style={{
                                      fontFamily: 'DM Sans, sans-serif',
                                      fontSize: 12,
                                      color: '#9ca3af',
                                    }}
                                  >
                                    Joined {member.joined}
                                  </span>
                                  <span
                                    style={{
                                      display: 'inline-flex',
                                      alignItems: 'center',
                                      gap: 5,
                                      padding: '3px 10px',
                                      borderRadius: 12,
                                      fontFamily: 'DM Sans, sans-serif',
                                      fontSize: 11,
                                      fontWeight: 500,
                                      background:
                                        member.status === 'active'
                                          ? 'rgba(16,185,129,0.08)'
                                          : 'rgba(245,158,11,0.08)',
                                      color:
                                        member.status === 'active' ? '#059669' : '#d97706',
                                    }}
                                  >
                                    <span
                                      style={{
                                        width: 6,
                                        height: 6,
                                        borderRadius: '50%',
                                        background:
                                          member.status === 'active' ? '#10b981' : '#f59e0b',
                                        display: 'inline-block',
                                      }}
                                    />
                                    {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
