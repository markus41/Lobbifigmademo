/**
 * Vault Page (Documents Vault)
 *
 * Secure document storage and management.
 * Features:
 * - Folder hierarchy
 * - Document preview
 * - Access control
 * - Search and filtering
 */

import { useState, type CSSProperties } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from '@/lib/notifications';
import type { Organization, Account } from '../../data/themes';

interface VaultPageProps {
  organization: Organization;
  account: Account;
}

// ============================================================================
// TYPES
// ============================================================================

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'xls' | 'ppt' | 'img' | 'folder';
  size?: string;
  modified: string;
  owner: string;
  shared: boolean;
  folderId?: string;
}

// ============================================================================
// MOCK DATA
// ============================================================================

const MOCK_DOCUMENTS: Document[] = [
  { id: 'f1', name: 'Board Documents', type: 'folder', modified: '2024-02-01', owner: 'Admin', shared: false },
  { id: 'f2', name: 'Member Resources', type: 'folder', modified: '2024-01-28', owner: 'Admin', shared: true },
  { id: 'f3', name: 'Financial Reports', type: 'folder', modified: '2024-02-05', owner: 'Treasurer', shared: false },
  { id: 'f4', name: 'Event Materials', type: 'folder', modified: '2024-02-03', owner: 'Events Team', shared: true },
  { id: 'd1', name: 'Annual Report 2023.pdf', type: 'pdf', size: '2.4 MB', modified: '2024-01-15', owner: 'Sarah Johnson', shared: true },
  { id: 'd2', name: 'Budget Proposal Q1.xlsx', type: 'xls', size: '856 KB', modified: '2024-02-01', owner: 'Michael Chen', shared: false },
  { id: 'd3', name: 'Meeting Minutes Jan 2024.docx', type: 'doc', size: '124 KB', modified: '2024-01-30', owner: 'Emily Rodriguez', shared: true },
  { id: 'd4', name: 'Strategic Plan Presentation.pptx', type: 'ppt', size: '5.2 MB', modified: '2024-01-22', owner: 'James Wilson', shared: true },
  { id: 'd5', name: 'Member Handbook.pdf', type: 'pdf', size: '1.8 MB', modified: '2024-01-10', owner: 'Admin', shared: true },
  { id: 'd6', name: 'Conference Photos.zip', type: 'img', size: '48.5 MB', modified: '2024-02-04', owner: 'Media Team', shared: true },
];

// ============================================================================
// ICONS
// ============================================================================

const FolderIcon = ({ className, style }: { className?: string; style?: CSSProperties }) => (
  <svg className={className} style={style} viewBox="0 0 24 24" fill="currentColor">
    <path d="M10 4H4a2 2 0 00-2 2v12a2 2 0 002 2h16a2 2 0 002-2V8a2 2 0 00-2-2h-8l-2-2z" />
  </svg>
);

const FileTextIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
  </svg>
);

const FileSpreadsheetIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="16" y2="17" />
    <line x1="10" y1="9" x2="10" y2="21" />
  </svg>
);

const FilePresentationIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <rect x="8" y="12" width="8" height="6" rx="1" />
  </svg>
);

const FileImageIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <circle cx="10" cy="13" r="2" />
    <path d="M20 17l-3-3-7 7" />
  </svg>
);

const SearchIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
);

const UploadIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);

const MoreVerticalIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </svg>
);

const ShareIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </svg>
);

// ============================================================================
// FILE ICON COMPONENT
// ============================================================================

function getFileIcon(type: Document['type'], className?: string, color?: string) {
  const icons = {
    folder: <FolderIcon className={className} style={{ color: color || '#F59E0B' }} />,
    pdf: <FileTextIcon className={`${className} text-red-600`} />,
    doc: <FileTextIcon className={`${className} text-blue-600`} />,
    xls: <FileSpreadsheetIcon className={`${className} text-green-600`} />,
    ppt: <FilePresentationIcon className={`${className} text-orange-600`} />,
    img: <FileImageIcon className={`${className} text-violet-600`} />,
  };
  return icons[type];
}

// ============================================================================
// DOCUMENT ROW
// ============================================================================

interface DocumentRowProps {
  document: Document;
  organization: Organization;
  onSelect: () => void;
  onOpen: () => void;
  onMenuAction: (action: 'download' | 'share' | 'rename' | 'delete') => void;
  isSelected: boolean;
}

function DocumentRow({ document, organization, onSelect, onOpen, onMenuAction, isSelected }: DocumentRowProps) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <motion.div
      className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors ${
        isSelected ? 'ring-2' : ''
      }`}
      style={{
        backgroundColor: isSelected ? `rgba(${organization.theme.primaryRgb}, 0.05)` : 'transparent',
        '--tw-ring-color': isSelected ? organization.theme.primary : undefined,
      } as React.CSSProperties}
      onClick={onSelect}
      onDoubleClick={onOpen}
      whileHover={{ backgroundColor: `rgba(${organization.theme.primaryRgb}, 0.03)` }}
    >
      {/* Icon */}
      <div className="flex-shrink-0">
        {getFileIcon(document.type, 'w-8 h-8', organization.theme.primary)}
      </div>

      {/* Name & Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900 truncate">{document.name}</span>
          {document.shared && (
            <ShareIcon className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
          )}
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
          <span>{document.owner}</span>
          <span>•</span>
          <span>{new Date(document.modified).toLocaleDateString()}</span>
          {document.size && (
            <>
              <span>•</span>
              <span>{document.size}</span>
            </>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="relative">
        <button
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            setShowMenu(!showMenu);
          }}
        >
          <MoreVerticalIcon className="w-4 h-4 text-gray-400" />
        </button>

        {/* Context Menu */}
        <AnimatePresence>
          {showMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -5 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-1 w-40 bg-white rounded-lg shadow-lg border border-[#EDE8DD] z-50 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => { onMenuAction('download'); setShowMenu(false); }}
              >
                Download
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => { onMenuAction('share'); setShowMenu(false); }}
              >
                Share
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={() => { onMenuAction('rename'); setShowMenu(false); }}
              >
                Rename
              </button>
              <hr className="my-1 border-gray-100" />
              <button
                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors"
                onClick={() => { onMenuAction('delete'); setShowMenu(false); }}
              >
                Delete
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export function VaultPage({ organization, account: _account }: VaultPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [currentFolder, setCurrentFolder] = useState<string | null>(null);
  void _account; void currentFolder;

  const folders = MOCK_DOCUMENTS.filter((d) => d.type === 'folder');
  const files = MOCK_DOCUMENTS.filter((d) => d.type !== 'folder');

  const filteredDocs = [...folders, ...files].filter((d) =>
    d.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-3xl font-light mb-2 text-[#2C2A25]"
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
            }}
          >
            The Vault
          </h1>
          <p className="text-gray-500">
            Secure document storage and management
          </p>
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-white font-medium text-sm cursor-pointer"
          style={{ background: organization.theme.gradientBtn }}
          onClick={() => toast.info('File upload dialog would open here. Drag and drop or browse to select files.')}
        >
          <UploadIcon className="w-4 h-4" />
          Upload File
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Files', value: files.length.toString() },
          { label: 'Folders', value: folders.length.toString() },
          { label: 'Shared', value: MOCK_DOCUMENTS.filter(d => d.shared).length.toString() },
          { label: 'Storage Used', value: '124.5 MB' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl border border-[#EDE8DD] p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <p className="text-sm text-gray-500">{stat.label}</p>
            <p className="text-2xl font-bold mt-1" style={{ color: organization.theme.primary }}>
              {stat.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-[#EDE8DD] rounded-xl text-sm focus:outline-none transition-all"
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
      </div>

      {/* File List */}
      <div className="bg-white rounded-xl border border-[#EDE8DD]">
        {/* Header */}
        <div className="flex items-center gap-4 px-4 py-3 border-b border-[#EDE8DD] text-xs font-semibold text-gray-500 uppercase tracking-wider">
          <div className="flex-1">Name</div>
          <div className="w-32 text-center">Owner</div>
          <div className="w-28 text-center">Modified</div>
          <div className="w-20 text-center">Size</div>
          <div className="w-12"></div>
        </div>

        {/* Folders */}
        {folders.length > 0 && !searchQuery && (
          <div className="border-b border-[#EDE8DD]">
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
              Folders
            </div>
            <div className="divide-y divide-[#EDE8DD]">
              {folders.map((folder) => (
                <DocumentRow
                  key={folder.id}
                  document={folder}
                  organization={organization}
                  onSelect={() => setSelectedDoc(folder.id)}
                  onOpen={() => {
                    setCurrentFolder(folder.id);
                    toast.info(`Opening folder: "${folder.name}" -- folder navigation coming soon!`);
                  }}
                  onMenuAction={(action) => {
                    const messages: Record<string, { msg: string; type: 'info' | 'success' | 'warning' }> = {
                      download: { msg: `Downloading folder "${folder.name}" as ZIP...`, type: 'success' },
                      share: { msg: `Share settings for "${folder.name}"`, type: 'info' },
                      rename: { msg: `Rename folder "${folder.name}"`, type: 'info' },
                      delete: { msg: `Are you sure you want to delete "${folder.name}" and all its contents?`, type: 'warning' },
                    };
                    const { msg, type } = messages[action];
                    toast[type](msg);
                  }}
                  isSelected={selectedDoc === folder.id}
                />
              ))}
            </div>
          </div>
        )}

        {/* Files */}
        <div>
          {!searchQuery && (
            <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
              Files
            </div>
          )}
          <div className="divide-y divide-[#EDE8DD]">
            {(searchQuery ? filteredDocs : files).map((doc) => (
              <DocumentRow
                key={doc.id}
                document={doc}
                organization={organization}
                onSelect={() => setSelectedDoc(doc.id)}
                onOpen={() => {
                  if (doc.type === 'folder') {
                    setCurrentFolder(doc.id);
                    toast.info(`Opening folder: "${doc.name}"`);
                  } else {
                    toast.info(`Opening file: "${doc.name}" -- document preview would open here.`);
                  }
                }}
                onMenuAction={(action) => {
                  const handlers: Record<string, () => void> = {
                    download: () => toast.success(`Downloading "${doc.name}"...`),
                    share: () => toast.info(`Share settings for "${doc.name}"`),
                    rename: () => toast.info(`Rename "${doc.name}"`),
                    delete: () => toast.warning(`Are you sure you want to delete "${doc.name}"?`),
                  };
                  handlers[action]();
                }}
                isSelected={selectedDoc === doc.id}
              />
            ))}
          </div>
        </div>

        {filteredDocs.length === 0 && (
          <div className="text-center py-12">
            <FileTextIcon className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500">No files found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default VaultPage;
