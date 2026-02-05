// Multi-organization theme system
export interface OrgTheme {
  primary: string;
  primaryLight: string;
  primaryPale: string;
  primaryDark: string;
  primaryRgb: string;
  gradient: string;
  gradientBtn: string;
  avatarBg: string;
}

export interface Organization {
  id: string;
  name: string;
  short: string;
  motto: string;
  logoLetter: string;
  theme: OrgTheme;
  identity: {
    industry: string;
    memberLabel: string;
    dashboardGreeting: string;
    loginHeadline: string;
    loginSubtext: string;
  };
}

export interface Account {
  email: string;
  name: string;
  first: string;
  last: string;
  initials: string;
  role: string;
  orgId: string;
}

export const ORGANIZATIONS: Record<string, Organization> = {
  'luxe-haven': {
    id: 'luxe-haven',
    name: 'Luxe Haven Resort',
    short: 'Luxe Haven',
    motto: 'Where every detail speaks of excellence',
    logoLetter: 'LH',
    theme: {
      primary: '#D4AF37',
      primaryLight: '#F4D03F',
      primaryPale: '#F5E6A3',
      primaryDark: '#8B7330',
      primaryRgb: '212,175,55',
      gradient: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
      gradientBtn: 'linear-gradient(135deg, #8B7330, #D4AF37)',
      avatarBg: 'linear-gradient(135deg, #D4AF37, #8B7330)',
    },
    identity: {
      industry: 'Luxury Hospitality',
      memberLabel: 'Guests',
      dashboardGreeting: 'Welcome to the Resort',
      loginHeadline: 'Return to Elegance',
      loginSubtext: 'Your exclusive gateway to resort management',
    },
  },
  'pacific-club': {
    id: 'pacific-club',
    name: 'The Pacific Club',
    short: 'Pacific Club',
    motto: 'Excellence is not a destination, it\'s a standard',
    logoLetter: 'PC',
    theme: {
      primary: '#2E6B8A',
      primaryLight: '#5AA3C4',
      primaryPale: '#A8D4E8',
      primaryDark: '#1A4459',
      primaryRgb: '46,107,138',
      gradient: 'linear-gradient(135deg, #A8D4E8, #2E6B8A, #1A4459)',
      gradientBtn: 'linear-gradient(135deg, #1A4459, #2E6B8A)',
      avatarBg: 'linear-gradient(135deg, #2E6B8A, #1A4459)',
    },
    identity: {
      industry: 'Private Membership Club',
      memberLabel: 'Members',
      dashboardGreeting: 'Club Overview',
      loginHeadline: 'Members Only',
      loginSubtext: 'Access your private club management portal',
    },
  },
  'summit-group': {
    id: 'summit-group',
    name: 'Summit Hospitality Group',
    short: 'Summit Group',
    motto: 'Reaching new heights, together',
    logoLetter: 'SH',
    theme: {
      primary: '#8B6B3E',
      primaryLight: '#B89E6A',
      primaryPale: '#D4C4A0',
      primaryDark: '#6B4E2E',
      primaryRgb: '139,107,62',
      gradient: 'linear-gradient(135deg, #D4C4A0, #8B6B3E, #6B4E2E)',
      gradientBtn: 'linear-gradient(135deg, #6B4E2E, #8B6B3E)',
      avatarBg: 'linear-gradient(135deg, #8B6B3E, #6B4E2E)',
    },
    identity: {
      industry: 'Hospitality Management',
      memberLabel: 'Properties',
      dashboardGreeting: 'Operations Center',
      loginHeadline: 'Summit Access',
      loginSubtext: 'Your hospitality operations command center',
    },
  },
  'verde-collective': {
    id: 'verde-collective',
    name: 'Verde Collective',
    short: 'Verde',
    motto: 'Cultivating connection, naturally',
    logoLetter: 'VC',
    theme: {
      primary: '#3D7B5F',
      primaryLight: '#5FAF8B',
      primaryPale: '#A8DCC4',
      primaryDark: '#2A5742',
      primaryRgb: '61,123,95',
      gradient: 'linear-gradient(135deg, #A8DCC4, #3D7B5F, #2A5742)',
      gradientBtn: 'linear-gradient(135deg, #2A5742, #3D7B5F)',
      avatarBg: 'linear-gradient(135deg, #3D7B5F, #2A5742)',
    },
    identity: {
      industry: 'Sustainable Community',
      memberLabel: 'Partners',
      dashboardGreeting: 'Community Hub',
      loginHeadline: 'Welcome Home',
      loginSubtext: 'Connect with your sustainable community',
    },
  },
  'crown-estates': {
    id: 'crown-estates',
    name: 'Crown Estates International',
    short: 'Crown Estates',
    motto: 'A legacy of distinction',
    logoLetter: 'CE',
    theme: {
      primary: '#6E3D7B',
      primaryLight: '#9B6BAB',
      primaryPale: '#C498D4',
      primaryDark: '#4A2854',
      primaryRgb: '110,61,123',
      gradient: 'linear-gradient(135deg, #C498D4, #6E3D7B, #4A2854)',
      gradientBtn: 'linear-gradient(135deg, #4A2854, #6E3D7B)',
      avatarBg: 'linear-gradient(135deg, #6E3D7B, #4A2854)',
    },
    identity: {
      industry: 'Real Estate',
      memberLabel: 'Estates',
      dashboardGreeting: 'Estate Overview',
      loginHeadline: 'The Crown Awaits',
      loginSubtext: 'Your distinguished real estate portfolio',
    },
  },
};

export const ACCOUNTS: Account[] = [
  {
    email: 'kwatts@luxehaven.com',
    name: 'Kathy Watts',
    first: 'Kathy',
    last: 'Watts',
    initials: 'KW',
    role: 'Director of Payroll & HR',
    orgId: 'luxe-haven',
  },
  {
    email: 'schen@pacificclub.org',
    name: 'Sarah Chen',
    first: 'Sarah',
    last: 'Chen',
    initials: 'SC',
    role: 'General Manager',
    orgId: 'pacific-club',
  },
  {
    email: 'dmartinez@summitgroup.io',
    name: 'David Martinez',
    first: 'David',
    last: 'Martinez',
    initials: 'DM',
    role: 'VP of Operations',
    orgId: 'summit-group',
  },
  {
    email: 'erodriguez@verdecollective.com',
    name: 'Emily Rodriguez',
    first: 'Emily',
    last: 'Rodriguez',
    initials: 'ER',
    role: 'Community Director',
    orgId: 'verde-collective',
  },
  {
    email: 'mjohnson@crownestates.co',
    name: 'Michael Johnson',
    first: 'Michael',
    last: 'Johnson',
    initials: 'MJ',
    role: 'Chief Executive Officer',
    orgId: 'crown-estates',
  },
];
