import { motion } from 'motion/react';
import { Search, Plus, Filter, Download, Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from '@/lib/notifications';

export function MembersPage() {
  const [showFilters, setShowFilters] = useState(false);

  const members = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', type: 'Gold Member', status: 'Active', joinDate: 'Jan 2022' },
    { id: 2, name: 'Michael Chen', email: 'michael.c@example.com', type: 'Silver Member', status: 'Active', joinDate: 'Mar 2022' },
    { id: 3, name: 'Emily Rodriguez', email: 'emily.r@example.com', type: 'Gold Member', status: 'Active', joinDate: 'Jun 2021' },
    { id: 4, name: 'David Kim', email: 'david.k@example.com', type: 'Bronze Member', status: 'Pending', joinDate: 'Dec 2023' },
    { id: 5, name: 'Lisa Anderson', email: 'lisa.a@example.com', type: 'Gold Member', status: 'Active', joinDate: 'Sep 2020' },
  ];

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-start justify-between"
      >
        <div>
          <h1 className="mb-2">The Registry</h1>
          <p style={{ color: 'var(--theme-text-secondary, #71717A)' }}>
            Your member community at a glance
          </p>
        </div>
        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            style={{
              border: '1px solid var(--theme-border-light, #E4E4E7)',
              color: 'var(--theme-text-secondary, #71717A)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            onClick={() => {
              console.log('Import CSV clicked');
              toast.info('CSV import wizard coming soon!');
            }}
          >
            <Upload className="w-4 h-4" />
            Import CSV
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            style={{
              border: '1px solid var(--theme-border-light, #E4E4E7)',
              color: 'var(--theme-text-secondary, #71717A)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            onClick={() => {
              console.log('Export members clicked');
              toast.success('Generating CSV export...');
            }}
          >
            <Download className="w-4 h-4" />
            Export
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="px-6 py-2 rounded-lg transition-colors flex items-center gap-2 font-medium"
            style={{
              background: 'var(--theme-gradient-btn, var(--theme-primary, #D4AF37))',
              color: 'var(--theme-text-inverse, #FFFFFF)',
            }}
            onClick={() => {
              console.log('Add Member clicked');
              toast.info('Member registration form coming soon!');
            }}
          >
            <Plus className="w-5 h-5" />
            Add Member
          </motion.button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-xl p-4"
        style={{
          background: 'var(--theme-bg-card, #FFFFFF)',
          border: '1px solid var(--theme-border-light, #E4E4E7)',
        }}
      >
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
              style={{ color: 'var(--theme-text-muted, #A1A1AA)' }}
            />
            <input
              type="text"
              placeholder="Search by name, email, or membership type..."
              className="w-full pl-10 pr-4 py-2 rounded-lg transition-all outline-none"
              style={{
                border: '1px solid var(--theme-border-light, #E4E4E7)',
                background: 'var(--theme-bg-card, #FFFFFF)',
                color: 'var(--theme-text-primary, #09090B)',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = 'var(--theme-border-focus, var(--theme-primary, #D4AF37))';
                e.target.style.boxShadow = '0 0 0 3px rgba(var(--theme-primary-rgb, 212,175,55), 0.1)';
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'var(--theme-border-light, #E4E4E7)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>
          <button
            className="px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
            style={{
              border: '1px solid var(--theme-border-light, #E4E4E7)',
              color: 'var(--theme-text-secondary, #71717A)',
              background: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
            onClick={() => {
              console.log('Filters toggled');
              setShowFilters(!showFilters);
              toast.info(showFilters ? 'Filters hidden' : 'Filters panel coming soon!');
            }}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </motion.div>

      {/* Members Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-xl overflow-hidden"
        style={{
          background: 'var(--theme-bg-card, #FFFFFF)',
          border: '1px solid var(--theme-border-light, #E4E4E7)',
        }}
      >
        <table className="w-full">
          <thead
            style={{
              background: 'var(--theme-bg-secondary, #F9FAFB)',
              borderBottom: '1px solid var(--theme-border-light, #E4E4E7)',
            }}
          >
            <tr>
              {['Member', 'Email', 'Type', 'Status', 'Join Date', 'Actions'].map((header) => (
                <th
                  key={header}
                  className="text-left px-6 py-4 text-sm font-semibold"
                  style={{ color: 'var(--theme-text-primary, #09090B)' }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {members.map((member, index) => (
              <motion.tr
                key={member.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                className="transition-colors group cursor-pointer"
                style={{
                  borderBottom: '1px solid var(--theme-border-light, rgba(0,0,0,0.04))',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--theme-bg-secondary, #F4F4F5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{
                        background: 'var(--theme-avatar-bg, var(--theme-gradient-btn, var(--theme-primary, #D4AF37)))',
                      }}
                    >
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--theme-text-inverse, #FFFFFF)' }}
                      >
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div
                      className="font-medium"
                      style={{ color: 'var(--theme-text-primary, #09090B)' }}
                    >
                      {member.name}
                    </div>
                  </div>
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: 'var(--theme-text-secondary, #71717A)' }}
                >
                  {member.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                    style={{
                      background: 'rgba(var(--theme-primary-rgb, 212,175,55), 0.1)',
                      color: 'var(--theme-primary, #D4AF37)',
                    }}
                  >
                    {member.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    member.status === 'Active' ? 'bg-emerald-50 text-success' : 'bg-amber-50 text-warning'
                  }`}>
                    {member.status}
                  </span>
                </td>
                <td
                  className="px-6 py-4 text-sm"
                  style={{ color: 'var(--theme-text-secondary, #71717A)' }}
                >
                  {member.joinDate}
                </td>
                <td className="px-6 py-4">
                  <button
                    className="text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: 'var(--theme-primary, #D4AF37)' }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--theme-primary-dark, var(--theme-primary, #B8941F))';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = 'var(--theme-primary, #D4AF37)';
                    }}
                  >
                    View Details
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
}
