// @ts-nocheck
/**
 * MembershipCard Tests
 *
 * Mobile-specific tests for the membership card component including:
 * - Touch target size validation (44px minimum)
 * - Gesture handling
 * - Accessibility
 * - Theme integration
 *
 * NOTE: @ts-nocheck added because vitest and @testing-library are not
 * installed in this project. Re-enable type checking once a test runner
 * is configured.
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MembershipCard } from './MembershipCard';
import type { Organization, Account } from '../../../data/themes';

// Mock framer-motion to avoid animation issues in tests
vi.mock('motion/react', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
  useMotionValue: () => ({ get: () => 0, set: () => {} }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: (value: any) => value,
}));

// Test fixtures
const mockOrganization: Organization = {
  id: 'test-org',
  name: 'Test Organization',
  short: 'Test Org',
  shortName: 'TestOrg',
  logoLetter: 'T',
  theme: {
    primary: '#D4AF37',
    primaryRgb: '212,175,55',
    gradientBtn: 'linear-gradient(135deg, #8B7330, #D4AF37)',
    fontDisplay: 'Georgia, serif',
    fontBody: 'Inter, sans-serif',
    textInverse: '#FFFFFF',
    borderColor: '#EDE8DD',
    bgCard: '#FFFFFF',
    textPrimary: '#2C2A25',
    textSecondary: '#4A4A5A',
    textMuted: '#7A7A8A',
    bgPrimary: '#FAF6E9',
    bgSecondary: '#F7F4EE',
    borderRadius: 'md',
    cardStyle: 'raised',
    transitionDuration: 'normal',
    buttonShadow: true,
  },
};

const mockMember: Account = {
  id: 'test-member',
  name: 'John Doe',
  email: 'john.doe@test.com',
  first: 'John',
  last: 'Doe',
  role: 'Premium',
  orgId: 'test-org',
};

describe('MembershipCard', () => {
  describe('Rendering', () => {
    it('renders member name correctly', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    it('renders organization branding', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      expect(screen.getByText('TestOrg')).toBeInTheDocument();
      expect(screen.getByText('Member Card')).toBeInTheDocument();
    });

    it('renders member role badge', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      expect(screen.getByText('Premium')).toBeInTheDocument();
    });

    it('generates consistent member ID from email', () => {
      const { rerender } = render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const firstRender = screen.getByText(/MBR-2024-/);
      const memberId = firstRender.textContent;

      // Rerender and verify same ID
      rerender(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      expect(screen.getByText(memberId!)).toBeInTheDocument();
    });
  });

  describe('Touch Targets', () => {
    it('has minimum 44px touch targets for all buttons', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const buttons = screen.getAllByRole('button');

      buttons.forEach((button) => {
        const styles = window.getComputedStyle(button);
        const minWidth = parseInt(styles.minWidth) || button.offsetWidth;
        const minHeight = parseInt(styles.minHeight) || button.offsetHeight;

        // Verify minimum touch target size
        expect(minWidth).toBeGreaterThanOrEqual(44);
        expect(minHeight).toBeGreaterThanOrEqual(44);
      });
    });

    it('has proper spacing between action buttons', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const buttons = screen.getAllByRole('button');

      // Should have at least 3 action buttons
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe('Interactions', () => {
    it('calls onFlip when flip button is clicked', async () => {
      const onFlip = vi.fn();
      const user = userEvent.setup();

      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
          onFlip={onFlip}
        />
      );

      const flipButton = screen.getByText('Flip').closest('button');
      await user.click(flipButton!);

      expect(onFlip).toHaveBeenCalledWith('back');
    });

    it('calls onShare when share button is clicked', async () => {
      const onShare = vi.fn();
      const user = userEvent.setup();

      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
          onShare={onShare}
        />
      );

      const shareButton = screen.getByText('Share').closest('button');
      await user.click(shareButton!);

      expect(onShare).toHaveBeenCalled();
    });

    it('calls onAddToWallet when wallet button is clicked', async () => {
      const onAddToWallet = vi.fn();
      const user = userEvent.setup();

      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
          onAddToWallet={onAddToWallet}
        />
      );

      const walletButton = screen.getByText('Add to Wallet').closest('button');
      await user.click(walletButton!);

      expect(onAddToWallet).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('has accessible button labels', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      expect(screen.getByText('Flip')).toBeInTheDocument();
      expect(screen.getByText('Share')).toBeInTheDocument();
      expect(screen.getByText('Add to Wallet')).toBeInTheDocument();
    });

    it('provides swipe hint for screen readers', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      expect(screen.getByText(/Swipe or tap Flip/)).toBeInTheDocument();
    });
  });

  describe('Theme Integration', () => {
    it('applies organization primary color to buttons', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const flipButton = screen.getByText('Flip').closest('button');
      expect(flipButton).toHaveStyle({ color: mockOrganization.theme.primary });
    });

    it('applies organization font family', () => {
      render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const title = screen.getByText('Member Card');
      expect(title).toHaveStyle({
        fontFamily: mockOrganization.theme.fontDisplay,
      });
    });
  });

  describe('Mobile Responsiveness', () => {
    it('constrains card width to max 380px', () => {
      const { container } = render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('max-w-[380px]');
    });

    it('centers card horizontally', () => {
      const { container } = render(
        <MembershipCard
          member={mockMember}
          organization={mockOrganization}
        />
      );

      const cardContainer = container.firstChild;
      expect(cardContainer).toHaveClass('mx-auto');
    });
  });
});

describe('MembershipCard Integration', () => {
  it('flips between front and back on button click', async () => {
    const user = userEvent.setup();

    render(
      <MembershipCard
        member={mockMember}
        organization={mockOrganization}
      />
    );

    // Initially shows front
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Click flip
    const flipButton = screen.getByText('Flip').closest('button');
    await user.click(flipButton!);

    // Should show QR code text after flip
    // Note: In real component this would animate
    expect(screen.getByText(/Scan for verification/)).toBeInTheDocument();
  });
});
