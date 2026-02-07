/**
 * Business Center Page
 *
 * Central hub for business operations including:
 * - Room Service (integrated, not separate)
 * - Concierge/Bellhop services (popup from bell icon)
 * - Business tools and resources
 * - Financial overview
 * - Report Builder wizard integration
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import type { Organization, Account } from '../../data/themes';
import { ReportBuilder } from '@/components/lobbi/wizards';

interface BusinessCenterPageProps {
  organization: Organization;
  account: Account;
}

// ============================================================================
// ICONS
// ============================================================================

const BriefcaseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
  </svg>
);

const CreditCardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" />
    <line x1="1" y1="10" x2="23" y2="10" />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14,2 14,8 20,8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10,9 9,9 8,9" />
  </svg>
);

const ShoppingBagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const ClipboardListIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
    <rect x="8" y="2" width="8" height="4" rx="1" />
    <path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" />
  </svg>
);

const TrendingUpIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
    <polyline points="17,6 23,6 23,12" />
  </svg>
);

const CoffeeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8h1a4 4 0 010 8h-1" />
    <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
    <line x1="6" y1="1" x2="6" y2="4" />
    <line x1="10" y1="1" x2="10" y2="4" />
    <line x1="14" y1="1" x2="14" y2="4" />
  </svg>
);

const ToolIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
);

// ============================================================================
// SERVICE CARDS
// ============================================================================

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  stats?: { label: string; value: string }[];
  actions?: { label: string; onClick: () => void }[];
  organization: Organization;
}

function ServiceCard({ title, description, icon, stats, actions, organization }: ServiceCardProps) {
  return (
    <motion.div
      className="bg-white rounded-xl border p-6"
      style={{ borderColor: '#EDE8DD' }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ background: `rgba(${organization.theme.primaryRgb}, 0.1)` }}
        >
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
      </div>

      {/* Stats */}
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-4 pt-4 border-t" style={{ borderColor: '#EDE8DD' }}>
          {stats.map((stat, i) => (
            <div key={i}>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className="text-lg font-semibold" style={{ color: organization.theme.primary }}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      {actions && actions.length > 0 && (
        <div className="flex gap-2 pt-4 border-t" style={{ borderColor: '#EDE8DD' }}>
          {actions.map((action, i) => (
            <button
              key={i}
              onClick={action.onClick}
              className="flex-1 py-2 text-sm font-medium rounded-lg transition-colors"
              style={{
                background: i === 0 ? organization.theme.gradientBtn : 'transparent',
                color: i === 0 ? 'white' : organization.theme.primary,
                border: i === 0 ? 'none' : `1px solid rgba(${organization.theme.primaryRgb}, 0.3)`,
              }}
            >
              {action.label}
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
}

// ============================================================================
// ROOM SERVICE PANEL
// ============================================================================

interface RoomServiceItem {
  id: string;
  name: string;
  category: string;
  description: string;
  price: number;
  eta: string;
}

const ROOM_SERVICE_ITEMS: RoomServiceItem[] = [
  { id: 'rs1', name: 'Document Printing', category: 'Business', description: 'Print up to 50 pages', price: 25, eta: '15 min' },
  { id: 'rs2', name: 'Meeting Room Setup', category: 'Business', description: 'AV equipment and refreshments', price: 150, eta: '30 min' },
  { id: 'rs3', name: 'Courier Service', category: 'Logistics', description: 'Same-day local delivery', price: 45, eta: '2 hrs' },
  { id: 'rs4', name: 'Tech Support', category: 'IT', description: 'On-site technical assistance', price: 75, eta: '20 min' },
  { id: 'rs5', name: 'Catering Order', category: 'Food & Beverage', description: 'Custom menu for events', price: 0, eta: 'Custom' },
];

function RoomServicePanel({ organization }: { organization: Organization }) {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const totalPrice = ROOM_SERVICE_ITEMS.filter((item) =>
    selectedItems.includes(item.id)
  ).reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="bg-white rounded-xl border" style={{ borderColor: '#EDE8DD' }}>
      <div className="p-4 border-b" style={{ borderColor: '#EDE8DD' }}>
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <CoffeeIcon className="w-5 h-5" style={{ color: organization.theme.primary }} />
          Room Service
        </h3>
        <p className="text-sm text-gray-500 mt-1">Request services and support</p>
      </div>

      <div className="divide-y" style={{ borderColor: '#EDE8DD' }}>
        {ROOM_SERVICE_ITEMS.map((item) => (
          <div
            key={item.id}
            className={`p-4 cursor-pointer transition-colors ${
              selectedItems.includes(item.id) ? 'bg-opacity-5' : ''
            }`}
            style={{
              backgroundColor: selectedItems.includes(item.id)
                ? `rgba(${organization.theme.primaryRgb}, 0.05)`
                : 'transparent',
            }}
            onClick={() => toggleItem(item.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{item.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600">
                    {item.category}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-0.5">{item.description}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold" style={{ color: organization.theme.primary }}>
                  {item.price > 0 ? `$${item.price}` : 'Quote'}
                </p>
                <p className="text-xs text-gray-500">{item.eta}</p>
              </div>
              <div className="ml-4">
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                    selectedItems.includes(item.id) ? '' : 'border-gray-300'
                  }`}
                  style={{
                    borderColor: selectedItems.includes(item.id)
                      ? organization.theme.primary
                      : undefined,
                    backgroundColor: selectedItems.includes(item.id)
                      ? organization.theme.primary
                      : 'transparent',
                  }}
                >
                  {selectedItems.includes(item.id) && (
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedItems.length > 0 && (
        <div className="p-4 border-t bg-gray-50" style={{ borderColor: '#EDE8DD' }}>
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-600">{selectedItems.length} service(s) selected</span>
            <span className="text-lg font-bold" style={{ color: organization.theme.primary }}>
              ${totalPrice}
            </span>
          </div>
          <button
            className="w-full py-3 rounded-lg text-white font-medium transition-transform hover:-translate-y-0.5"
            style={{ background: organization.theme.gradientBtn }}
            onClick={() => {
              alert(`Requesting ${selectedItems.length} service(s) for $${totalPrice}. A concierge will contact you shortly!`);
              setSelectedItems([]);
            }}
          >
            Request Services
          </button>
        </div>
      )}
    </div>
  );
}

// ============================================================================
// CLOSE ICON
// ============================================================================

const CloseIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function BusinessCenterPage({ organization, account }: BusinessCenterPageProps) {
  const [showReportBuilder, setShowReportBuilder] = useState(false);

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
          Business Center
        </h1>
        <p className="text-gray-500">
          Manage your organization's business operations and services
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Monthly Revenue', value: '$48,250', change: '+12.5%', icon: TrendingUpIcon },
          { label: 'Active Invoices', value: '23', change: '+3', icon: FileTextIcon },
          { label: 'Pending Orders', value: '8', change: '-2', icon: ShoppingBagIcon },
          { label: 'Service Requests', value: '12', change: '+5', icon: ToolIcon },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl border p-4"
            style={{ borderColor: '#EDE8DD' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">{stat.label}</span>
              <stat.icon className="w-4 h-4" style={{ color: organization.theme.primary }} />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
              <span
                className="text-sm font-medium mb-1"
                style={{ color: stat.change.startsWith('+') ? '#047857' : '#B85C4A' }}
              >
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Services Grid */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
          <ServiceCard
            title="Invoicing & Billing"
            description="Manage member invoices and payments"
            icon={<CreditCardIcon className="w-6 h-6" style={{ color: organization.theme.primary }} />}
            stats={[
              { label: 'Outstanding', value: '$12,450' },
              { label: 'Collected', value: '$35,800' },
            ]}
            actions={[
              { label: 'Create Invoice', onClick: () => alert('Invoice creation wizard coming soon!') },
              { label: 'View All', onClick: () => alert('Viewing all 23 invoices...') },
            ]}
            organization={organization}
          />

          <ServiceCard
            title="Reports & Analytics"
            description="Financial and operational insights"
            icon={<ClipboardListIcon className="w-6 h-6" style={{ color: organization.theme.primary }} />}
            stats={[
              { label: 'Reports', value: '15' },
              { label: 'Last Updated', value: 'Today' },
            ]}
            actions={[
              { label: 'Generate Report', onClick: () => setShowReportBuilder(true) },
              { label: 'Schedule', onClick: () => alert('Report scheduling coming soon!') },
            ]}
            organization={organization}
          />

          <ServiceCard
            title="Vendor Management"
            description="Track and manage vendor relationships"
            icon={<BriefcaseIcon className="w-6 h-6" style={{ color: organization.theme.primary }} />}
            stats={[
              { label: 'Active Vendors', value: '24' },
              { label: 'Contracts', value: '18' },
            ]}
            actions={[
              { label: 'Add Vendor', onClick: () => alert('Add vendor form coming soon!') },
              { label: 'View All', onClick: () => alert('Viewing 24 active vendors...') },
            ]}
            organization={organization}
          />

          <ServiceCard
            title="Procurement"
            description="Order supplies and equipment"
            icon={<ShoppingBagIcon className="w-6 h-6" style={{ color: organization.theme.primary }} />}
            stats={[
              { label: 'Open Orders', value: '8' },
              { label: 'This Month', value: '$4,250' },
            ]}
            actions={[
              { label: 'New Order', onClick: () => alert('New order form coming soon!') },
              { label: 'Catalog', onClick: () => alert('Product catalog coming soon!') },
            ]}
            organization={organization}
          />
        </div>

        {/* Room Service Panel */}
        <div className="lg:col-span-1">
          <RoomServicePanel organization={organization} />
        </div>
      </div>

      {/* Report Builder Modal */}
      <AnimatePresence>
        {showReportBuilder && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Backdrop */}
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReportBuilder(false)}
            />

            {/* Modal Container */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setShowReportBuilder(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <CloseIcon className="w-5 h-5 text-gray-600" />
              </button>

              {/* Report Builder Content */}
              <div className="overflow-y-auto max-h-[90vh]">
                <ReportBuilder
                  onSave={(config) => {
                    console.log('Report saved:', config);
                    setShowReportBuilder(false);
                  }}
                  onExport={(config, format) => {
                    console.log(`Report exported as ${format}:`, config);
                    setShowReportBuilder(false);
                  }}
                  className="border-0 shadow-none"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default BusinessCenterPage;
