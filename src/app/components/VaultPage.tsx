import { useState } from 'react';
import { motion } from 'motion/react';
import { FileText, Folder, Download, Search, Upload, Lock, Shield, Clock, ChevronRight } from 'lucide-react';
import type { Account, Organization } from '../data/themes';

interface VaultPageProps {
  organization?: Organization;
  account?: Account;
}

const folders = [
  { name: 'Governance Documents', files: 24, icon: Shield },
  { name: 'Financial Reports', files: 18, icon: FileText },
  { name: 'Meeting Minutes', files: 45, icon: Clock },
  { name: 'Membership Records', files: 156, icon: Folder },
  { name: 'Event Documentation', files: 32, icon: Folder },
  { name: 'Legal & Compliance', files: 12, icon: Lock },
];

const documents = [
  { name: 'Q4 Financial Report.pdf', folder: 'Financial Reports', modified: 'Jan 28, 2026', size: '2.4 MB', restricted: false },
  { name: 'Board Meeting Minutes - Feb 2026.docx', folder: 'Meeting Minutes', modified: 'Feb 3, 2026', size: '845 KB', restricted: false },
  { name: 'Annual Budget 2026.xlsx', folder: 'Financial Reports', modified: 'Jan 15, 2026', size: '1.8 MB', restricted: true },
  { name: 'Membership Agreement Template.pdf', folder: 'Membership Records', modified: 'Dec 10, 2025', size: '520 KB', restricted: false },
  { name: 'Insurance Certificate.pdf', folder: 'Legal & Compliance', modified: 'Jan 5, 2026', size: '1.1 MB', restricted: true },
  { name: 'Strategic Plan 2026-2028.pdf', folder: 'Governance Documents', modified: 'Feb 1, 2026', size: '3.2 MB', restricted: true },
  { name: 'Audit Report.pdf', folder: 'Financial Reports', modified: 'Jan 20, 2026', size: '4.7 MB', restricted: true },
  { name: 'Bylaws Amendment.docx', folder: 'Governance Documents', modified: 'Jan 30, 2026', size: '290 KB', restricted: false },
];

export function VaultPage({ organization, account }: VaultPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const rgb = organization?.theme.primaryRgb || '212,175,55';
  const primary = organization?.theme.primary || '#D4AF37';

  const filteredDocuments = documents.filter(
    (doc) =>
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.folder.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      className="p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
              <p
                className="text-[11px] uppercase tracking-[0.2em] mb-2"
                style={{ color: primary, opacity: 0.6, fontFamily: 'DM Sans, sans-serif', fontWeight: 600 }}
              >
                Document Center
              </p>
              <h1
                className="text-2xl sm:text-3xl mb-2"
                style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', fontWeight: 400, color: '#2C2A25' }}
              >
                The Vault
              </h1>
              <p className="text-sm" style={{ color: '#8A8578' }}>
                Secure document management
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 text-white rounded-lg flex items-center gap-2 font-medium text-sm self-start sm:self-auto"
              style={{ background: primary, fontFamily: 'DM Sans, sans-serif' }}
            >
              <Upload className="w-4 h-4" />
              Upload
            </motion.button>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl border p-4"
          style={{ borderColor: `rgba(${rgb}, 0.08)` }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search documents and folders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-all"
              style={{
                borderColor: `rgba(${rgb}, 0.15)`,
                // @ts-expect-error CSS custom property for focus ring
                '--tw-ring-color': `rgba(${rgb}, 0.2)`,
              }}
            />
          </div>
        </motion.div>

        {/* Folders Grid */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
          >
            Folders
          </motion.h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {folders.map((folder, index) => (
              <motion.div
                key={folder.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.06 }}
                whileHover={{ y: -4, boxShadow: `0 10px 30px -5px rgba(${rgb}, 0.1)` }}
                className="bg-white rounded-xl border p-5 cursor-pointer transition-shadow group"
                style={{ borderColor: `rgba(${rgb}, 0.08)` }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div
                      className="p-3 rounded-lg"
                      style={{ background: `rgba(${rgb}, 0.08)` }}
                    >
                      <folder.icon className="w-5 h-5" style={{ color: primary }} />
                    </div>
                    <div>
                      <div
                        className="font-medium text-gray-900 text-sm"
                        style={{ fontFamily: 'DM Sans, sans-serif' }}
                      >
                        {folder.name}
                      </div>
                      <div className="text-xs mt-1" style={{ color: '#8A8578' }}>
                        {folder.files} files
                      </div>
                    </div>
                  </div>
                  <ChevronRight
                    className="w-4 h-4 text-gray-300 group-hover:translate-x-1 transition-transform"
                    style={{ color: `rgba(${rgb}, 0.3)` }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Documents */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="text-lg mb-4"
            style={{ fontFamily: 'Cormorant Garamond, Georgia, serif', color: '#2C2A25' }}
          >
            Recent Documents
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55 }}
            className="bg-white rounded-xl border overflow-hidden"
            style={{ borderColor: `rgba(${rgb}, 0.08)` }}
          >
            {/* Table Header */}
            <div
              className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 text-xs font-semibold uppercase tracking-wider border-b"
              style={{
                background: `rgba(${rgb}, 0.03)`,
                borderColor: `rgba(${rgb}, 0.08)`,
                color: '#8A8578',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              <div className="col-span-5">Document</div>
              <div className="col-span-2">Folder</div>
              <div className="col-span-2">Modified</div>
              <div className="col-span-1">Size</div>
              <div className="col-span-2 text-right">Actions</div>
            </div>

            {/* Table Rows */}
            <div className="divide-y" style={{ borderColor: `rgba(${rgb}, 0.06)` }}>
              {filteredDocuments.map((doc, index) => (
                <motion.div
                  key={doc.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.04 }}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors group cursor-pointer items-center"
                >
                  {/* Document Name */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg flex-shrink-0"
                      style={{ background: `rgba(${rgb}, 0.06)` }}
                    >
                      <FileText className="w-4 h-4" style={{ color: primary }} />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm font-medium text-gray-900 truncate"
                          style={{ fontFamily: 'DM Sans, sans-serif' }}
                        >
                          {doc.name}
                        </span>
                        {doc.restricted && (
                          <Lock className="w-3 h-3 flex-shrink-0" style={{ color: primary, opacity: 0.6 }} />
                        )}
                      </div>
                      {/* Mobile-only metadata */}
                      <div className="sm:hidden text-xs mt-1" style={{ color: '#8A8578' }}>
                        {doc.folder} &middot; {doc.modified} &middot; {doc.size}
                      </div>
                    </div>
                  </div>

                  {/* Folder */}
                  <div className="hidden sm:block col-span-2 text-sm" style={{ color: '#8A8578' }}>
                    {doc.folder}
                  </div>

                  {/* Modified */}
                  <div className="hidden sm:block col-span-2 text-sm" style={{ color: '#8A8578' }}>
                    {doc.modified}
                  </div>

                  {/* Size */}
                  <div className="hidden sm:block col-span-1 text-sm" style={{ color: '#8A8578' }}>
                    {doc.size}
                  </div>

                  {/* Download */}
                  <div className="hidden sm:flex col-span-2 justify-end">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ background: `rgba(${rgb}, 0.06)` }}
                    >
                      <Download className="w-4 h-4" style={{ color: primary }} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {filteredDocuments.length === 0 && (
              <div className="px-6 py-12 text-center">
                <FileText className="w-10 h-10 mx-auto mb-3" style={{ color: `rgba(${rgb}, 0.3)` }} />
                <p className="text-sm" style={{ color: '#8A8578' }}>No documents match your search.</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
