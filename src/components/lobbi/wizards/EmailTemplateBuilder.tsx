/**
 * EmailTemplateBuilder - Advanced drag-and-drop email template wizard
 *
 * Features:
 * - Drag-and-drop block system
 * - Live preview panel
 * - Template presets
 * - Rich text editing
 * - Dynamic placeholders
 * - Mobile/desktop preview toggle
 */

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import {
  Type,
  Image,
  Square,
  Columns,
  Minus,
  Smartphone,
  Monitor,
  Copy,
  Trash2,
  GripVertical,
  Sparkles,
  Eye,
  Code,
  Palette,
  Settings,
  Plus,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  LayoutTemplate,
  Send,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  LobbiWizard,
  WizardStepContent,
  WizardCard,
  useWizard,
  type WizardStep,
} from './LobbiWizard';
import { LobbiButton } from '../core/LobbiButton';
import { LobbiCard } from '../core/LobbiCard';
import { LobbiInput } from '../core/LobbiInput';

// =============================================================================
// TYPES
// =============================================================================

interface EmailBlock {
  id: string;
  type:
    | 'header'
    | 'text'
    | 'image'
    | 'button'
    | 'columns'
    | 'divider'
    | 'spacer';
  content: Record<string, unknown>;
  styles?: Record<string, string>;
}

interface EmailTemplate {
  id: string;
  name: string;
  subject: string;
  preheader: string;
  blocks: EmailBlock[];
  styles: {
    backgroundColor: string;
    fontFamily: string;
    primaryColor: string;
  };
}

interface BlockDefinition {
  type: EmailBlock['type'];
  label: string;
  icon: React.ReactNode;
  description: string;
  defaultContent: Record<string, unknown>;
}

// =============================================================================
// CONSTANTS
// =============================================================================

const BLOCK_DEFINITIONS: BlockDefinition[] = [
  {
    type: 'header',
    label: 'Header',
    icon: <Heading1 className="w-5 h-5" />,
    description: 'Logo and navigation',
    defaultContent: {
      logoUrl: '',
      title: 'Your Organization',
      showNav: false,
    },
  },
  {
    type: 'text',
    label: 'Text Block',
    icon: <Type className="w-5 h-5" />,
    description: 'Rich text content',
    defaultContent: {
      text: 'Enter your content here...',
      alignment: 'left',
    },
  },
  {
    type: 'image',
    label: 'Image',
    icon: <Image className="w-5 h-5" />,
    description: 'Image with optional link',
    defaultContent: {
      src: 'https://via.placeholder.com/600x200',
      alt: 'Image',
      link: '',
    },
  },
  {
    type: 'button',
    label: 'Button',
    icon: <Square className="w-5 h-5" />,
    description: 'Call-to-action button',
    defaultContent: {
      text: 'Click Here',
      link: '#',
      alignment: 'center',
    },
  },
  {
    type: 'columns',
    label: 'Columns',
    icon: <Columns className="w-5 h-5" />,
    description: '2-column layout',
    defaultContent: {
      left: 'Left column content',
      right: 'Right column content',
    },
  },
  {
    type: 'divider',
    label: 'Divider',
    icon: <Minus className="w-5 h-5" />,
    description: 'Horizontal line',
    defaultContent: {
      style: 'solid',
      color: '#e5e7eb',
    },
  },
  {
    type: 'spacer',
    label: 'Spacer',
    icon: <Square className="w-5 h-5 opacity-30" />,
    description: 'Vertical spacing',
    defaultContent: {
      height: 32,
    },
  },
];

const TEMPLATE_PRESETS = [
  {
    id: 'welcome',
    name: 'Welcome Email',
    preview: '👋',
    description: 'New member onboarding',
  },
  {
    id: 'newsletter',
    name: 'Newsletter',
    preview: '📰',
    description: 'Regular updates',
  },
  {
    id: 'event',
    name: 'Event Invitation',
    preview: '🎉',
    description: 'Upcoming events',
  },
  {
    id: 'reminder',
    name: 'Reminder',
    preview: '⏰',
    description: 'Appointment reminders',
  },
  {
    id: 'blank',
    name: 'Blank Template',
    preview: '📄',
    description: 'Start from scratch',
  },
];

const WIZARD_STEPS: WizardStep[] = [
  {
    id: 'template',
    title: 'Choose Template',
    description: 'Select a starting point',
    icon: <LayoutTemplate className="w-5 h-5" />,
  },
  {
    id: 'design',
    title: 'Design',
    description: 'Build your email',
    icon: <Palette className="w-5 h-5" />,
  },
  {
    id: 'preview',
    title: 'Preview & Test',
    description: 'Review and send test',
    icon: <Eye className="w-5 h-5" />,
  },
  {
    id: 'settings',
    title: 'Settings',
    description: 'Configure delivery',
    icon: <Settings className="w-5 h-5" />,
  },
];

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export interface EmailTemplateBuilderProps {
  onSave?: (template: EmailTemplate) => void;
  onSendTest?: (template: EmailTemplate, email: string) => void;
  className?: string;
}

export function EmailTemplateBuilder({
  onSave,
  onSendTest,
  className,
}: EmailTemplateBuilderProps) {
  const [template, setTemplate] = useState<EmailTemplate>({
    id: crypto.randomUUID(),
    name: 'Untitled Template',
    subject: '',
    preheader: '',
    blocks: [],
    styles: {
      backgroundColor: '#f9fafb',
      fontFamily: 'Arial, sans-serif',
      primaryColor: '#D4AF37',
    },
  });

  const handleComplete = useCallback(async () => {
    onSave?.(template);
  }, [template, onSave]);

  return (
    <div className={cn('h-[800px] bg-gray-50 rounded-xl overflow-hidden', className)}>
      <LobbiWizard
        steps={WIZARD_STEPS}
        onComplete={handleComplete}
        allowStepClick
      >
        <EmailBuilderContent
          template={template}
          setTemplate={setTemplate}
          onSendTest={onSendTest}
        />
      </LobbiWizard>
    </div>
  );
}

// =============================================================================
// BUILDER CONTENT
// =============================================================================

interface EmailBuilderContentProps {
  template: EmailTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<EmailTemplate>>;
  onSendTest?: (template: EmailTemplate, email: string) => void;
}

function EmailBuilderContent({
  template,
  setTemplate,
  onSendTest,
}: EmailBuilderContentProps) {
  return (
    <>
      {/* Step 1: Template Selection */}
      <WizardStepContent stepId="template">
        <TemplateSelectionStep
          template={template}
          setTemplate={setTemplate}
        />
      </WizardStepContent>

      {/* Step 2: Design */}
      <WizardStepContent stepId="design" className="p-0">
        <DesignStep template={template} setTemplate={setTemplate} />
      </WizardStepContent>

      {/* Step 3: Preview */}
      <WizardStepContent stepId="preview">
        <PreviewStep
          template={template}
          onSendTest={onSendTest}
        />
      </WizardStepContent>

      {/* Step 4: Settings */}
      <WizardStepContent stepId="settings">
        <SettingsStep template={template} setTemplate={setTemplate} />
      </WizardStepContent>
    </>
  );
}

// =============================================================================
// STEP 1: TEMPLATE SELECTION
// =============================================================================

function TemplateSelectionStep({
  template,
  setTemplate,
}: {
  template: EmailTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<EmailTemplate>>;
}) {
  const { setCanGoNext } = useWizard();
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleSelectPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setCanGoNext(true);

    // Load preset blocks based on selection
    const presetBlocks = getPresetBlocks(presetId);
    setTemplate((prev) => ({
      ...prev,
      blocks: presetBlocks,
      name: TEMPLATE_PRESETS.find((p) => p.id === presetId)?.name || prev.name,
    }));
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <WizardCard
        title="Choose a Template"
        description="Select a starting point for your email design"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {TEMPLATE_PRESETS.map((preset) => (
            <motion.button
              key={preset.id}
              onClick={() => handleSelectPreset(preset.id)}
              className={cn(
                'relative p-4 rounded-xl border-2 transition-all',
                'flex flex-col items-center gap-3 text-center',
                selectedPreset === preset.id
                  ? 'border-gold-500 bg-gold-50'
                  : 'border-gray-200 hover:border-gold-300 bg-white'
              )}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-4xl">{preset.preview}</span>
              <div>
                <p className="font-medium text-gray-900 text-sm">
                  {preset.name}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">
                  {preset.description}
                </p>
              </div>
              {selectedPreset === preset.id && (
                <motion.div
                  layoutId="selectedPreset"
                  className="absolute inset-0 border-2 border-gold-500 rounded-xl"
                  initial={false}
                />
              )}
            </motion.button>
          ))}
        </div>
      </WizardCard>

      {/* Template Name */}
      <WizardCard title="Template Details">
        <div className="grid gap-4 md:grid-cols-2">
          <LobbiInput
            label="Template Name"
            value={template.name}
            onChange={(e) =>
              setTemplate((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="e.g., Monthly Newsletter"
          />
          <LobbiInput
            label="Email Subject"
            value={template.subject}
            onChange={(e) =>
              setTemplate((prev) => ({ ...prev, subject: e.target.value }))
            }
            placeholder="e.g., Your Monthly Update"
          />
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 2: DESIGN
// =============================================================================

function DesignStep({
  template,
  setTemplate,
}: {
  template: EmailTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<EmailTemplate>>;
}) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');

  const addBlock = useCallback(
    (blockDef: BlockDefinition) => {
      const newBlock: EmailBlock = {
        id: crypto.randomUUID(),
        type: blockDef.type,
        content: { ...blockDef.defaultContent },
      };
      setTemplate((prev) => ({
        ...prev,
        blocks: [...prev.blocks, newBlock],
      }));
      setSelectedBlockId(newBlock.id);
    },
    [setTemplate]
  );

  const updateBlock = useCallback(
    (blockId: string, updates: Partial<EmailBlock>) => {
      setTemplate((prev) => ({
        ...prev,
        blocks: prev.blocks.map((b) =>
          b.id === blockId ? { ...b, ...updates } : b
        ),
      }));
    },
    [setTemplate]
  );

  const deleteBlock = useCallback(
    (blockId: string) => {
      setTemplate((prev) => ({
        ...prev,
        blocks: prev.blocks.filter((b) => b.id !== blockId),
      }));
      if (selectedBlockId === blockId) {
        setSelectedBlockId(null);
      }
    },
    [setTemplate, selectedBlockId]
  );

  const duplicateBlock = useCallback(
    (blockId: string) => {
      const block = template.blocks.find((b) => b.id === blockId);
      if (block) {
        const newBlock = {
          ...block,
          id: crypto.randomUUID(),
        };
        setTemplate((prev) => {
          const index = prev.blocks.findIndex((b) => b.id === blockId);
          const newBlocks = [...prev.blocks];
          newBlocks.splice(index + 1, 0, newBlock);
          return { ...prev, blocks: newBlocks };
        });
      }
    },
    [template.blocks, setTemplate]
  );

  const reorderBlocks = useCallback(
    (newOrder: EmailBlock[]) => {
      setTemplate((prev) => ({ ...prev, blocks: newOrder }));
    },
    [setTemplate]
  );

  const selectedBlock = template.blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="flex h-full">
      {/* Left Sidebar - Block Library */}
      <div className="w-64 border-r border-gray-200 bg-white p-4 overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Content Blocks
        </h3>
        <div className="space-y-2">
          {BLOCK_DEFINITIONS.map((blockDef) => (
            <motion.button
              key={blockDef.type}
              onClick={() => addBlock(blockDef)}
              className={cn(
                'w-full flex items-center gap-3 p-3 rounded-lg',
                'border border-gray-200 bg-white',
                'hover:border-gold-300 hover:bg-gold-50',
                'transition-colors text-left'
              )}
              whileHover={{ x: 2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-gray-600">{blockDef.icon}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {blockDef.label}
                </p>
                <p className="text-xs text-gray-500">{blockDef.description}</p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* AI Assist */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <button
            className={cn(
              'w-full flex items-center gap-2 p-3 rounded-lg',
              'bg-gradient-to-r from-gold-100 to-gold-50',
              'border border-gold-200',
              'text-gold-700 font-medium text-sm',
              'hover:from-gold-200 hover:to-gold-100',
              'transition-colors'
            )}
          >
            <Sparkles className="w-4 h-4" />
            AI Generate Content
          </button>
        </div>
      </div>

      {/* Center - Canvas */}
      <div className="flex-1 bg-gray-100 overflow-auto">
        {/* Toolbar */}
        <div className="sticky top-0 z-10 flex items-center justify-between px-4 py-2 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode('desktop')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                previewMode === 'desktop'
                  ? 'bg-gold-100 text-gold-700'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPreviewMode('mobile')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                previewMode === 'mobile'
                  ? 'bg-gold-100 text-gold-700'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {template.blocks.length} blocks
          </div>
        </div>

        {/* Email Canvas */}
        <div className="p-8 flex justify-center">
          <div
            className={cn(
              'bg-white shadow-lg transition-all duration-300',
              previewMode === 'desktop' ? 'w-[600px]' : 'w-[375px]'
            )}
            style={{ backgroundColor: template.styles.backgroundColor }}
          >
            {template.blocks.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No blocks yet</p>
                <p className="text-sm text-gray-400">
                  Add blocks from the sidebar to start building
                </p>
              </div>
            ) : (
              <Reorder.Group
                axis="y"
                values={template.blocks}
                onReorder={reorderBlocks}
                className="space-y-0"
              >
                {template.blocks.map((block) => (
                  <Reorder.Item
                    key={block.id}
                    value={block}
                    className="relative"
                  >
                    <EmailBlockRenderer
                      block={block}
                      isSelected={selectedBlockId === block.id}
                      onSelect={() => setSelectedBlockId(block.id)}
                      onUpdate={(updates) => updateBlock(block.id, updates)}
                      onDelete={() => deleteBlock(block.id)}
                      onDuplicate={() => duplicateBlock(block.id)}
                    />
                  </Reorder.Item>
                ))}
              </Reorder.Group>
            )}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Block Settings */}
      <AnimatePresence>
        {selectedBlock && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 300, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="border-l border-gray-200 bg-white overflow-hidden"
          >
            <div className="w-[300px] p-4 overflow-y-auto h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-gray-900">
                  Block Settings
                </h3>
                <button
                  onClick={() => setSelectedBlockId(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <BlockSettings
                block={selectedBlock}
                onUpdate={(updates) => updateBlock(selectedBlock.id, updates)}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// =============================================================================
// EMAIL BLOCK RENDERER
// =============================================================================

interface EmailBlockRendererProps {
  block: EmailBlock;
  isSelected: boolean;
  onSelect: () => void;
  onUpdate: (updates: Partial<EmailBlock>) => void;
  onDelete: () => void;
  onDuplicate: () => void;
}

function EmailBlockRenderer({
  block,
  isSelected,
  onSelect,
  onDelete,
  onDuplicate,
}: EmailBlockRendererProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        'group relative cursor-pointer transition-all',
        isSelected && 'ring-2 ring-gold-500 ring-inset'
      )}
    >
      {/* Block Content */}
      <div className="p-4">
        {block.type === 'header' && (
          <div className="text-center py-4">
            <h1 className="text-xl font-bold text-gray-900">
              {(block.content.title as string) || 'Header'}
            </h1>
          </div>
        )}
        {block.type === 'text' && (
          <p
            className="text-gray-700"
            style={{
              textAlign: (block.content.alignment as 'left' | 'center' | 'right') || 'left',
            }}
          >
            {(block.content.text as string) || 'Text content...'}
          </p>
        )}
        {block.type === 'image' && (
          <img
            src={block.content.src as string}
            alt={block.content.alt as string}
            className="w-full h-auto"
          />
        )}
        {block.type === 'button' && (
          <div
            style={{
              textAlign: (block.content.alignment as 'left' | 'center' | 'right') || 'center',
            }}
          >
            <span className="inline-block px-6 py-3 bg-gold-500 text-white font-medium rounded-lg">
              {(block.content.text as string) || 'Button'}
            </span>
          </div>
        )}
        {block.type === 'columns' && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded">
              {(block.content.left as string) || 'Left column'}
            </div>
            <div className="p-4 bg-gray-50 rounded">
              {(block.content.right as string) || 'Right column'}
            </div>
          </div>
        )}
        {block.type === 'divider' && (
          <hr
            className="my-4"
            style={{
              borderColor: (block.content.color as string) || '#e5e7eb',
              borderStyle: (block.content.style as string) || 'solid',
            }}
          />
        )}
        {block.type === 'spacer' && (
          <div style={{ height: (block.content.height as number) || 32 }} />
        )}
      </div>

      {/* Hover Actions */}
      <div
        className={cn(
          'absolute top-2 right-2 flex items-center gap-1',
          'opacity-0 group-hover:opacity-100 transition-opacity'
        )}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDuplicate();
          }}
          className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50"
        >
          <Copy className="w-4 h-4 text-gray-500" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="p-1.5 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-red-50 hover:border-red-200"
        >
          <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-500" />
        </button>
      </div>

      {/* Drag Handle */}
      <div
        className={cn(
          'absolute left-2 top-1/2 -translate-y-1/2',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          'cursor-grab active:cursor-grabbing'
        )}
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

// =============================================================================
// BLOCK SETTINGS
// =============================================================================

interface BlockSettingsProps {
  block: EmailBlock;
  onUpdate: (updates: Partial<EmailBlock>) => void;
}

function BlockSettings({ block, onUpdate }: BlockSettingsProps) {
  const updateContent = (key: string, value: unknown) => {
    onUpdate({
      content: { ...block.content, [key]: value },
    });
  };

  return (
    <div className="space-y-4">
      {block.type === 'header' && (
        <>
          <LobbiInput
            label="Title"
            value={(block.content.title as string) || ''}
            onChange={(e) => updateContent('title', e.target.value)}
          />
          <LobbiInput
            label="Logo URL"
            value={(block.content.logoUrl as string) || ''}
            onChange={(e) => updateContent('logoUrl', e.target.value)}
            placeholder="https://..."
          />
        </>
      )}

      {block.type === 'text' && (
        <>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Text Content
            </label>
            <textarea
              value={(block.content.text as string) || ''}
              onChange={(e) => updateContent('text', e.target.value)}
              rows={4}
              className={cn(
                'w-full px-3 py-2 rounded-lg border border-gray-300',
                'focus:ring-2 focus:ring-gold-500/30 focus:border-gold-500',
                'text-sm'
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <div className="flex gap-2">
              {[
                { value: 'left', icon: AlignLeft },
                { value: 'center', icon: AlignCenter },
                { value: 'right', icon: AlignRight },
              ].map(({ value, icon: Icon }) => (
                <button
                  key={value}
                  onClick={() => updateContent('alignment', value)}
                  className={cn(
                    'p-2 rounded-lg border transition-colors',
                    block.content.alignment === value
                      ? 'border-gold-500 bg-gold-50 text-gold-700'
                      : 'border-gray-200 text-gray-500 hover:border-gold-300'
                  )}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {block.type === 'image' && (
        <>
          <LobbiInput
            label="Image URL"
            value={(block.content.src as string) || ''}
            onChange={(e) => updateContent('src', e.target.value)}
            placeholder="https://..."
          />
          <LobbiInput
            label="Alt Text"
            value={(block.content.alt as string) || ''}
            onChange={(e) => updateContent('alt', e.target.value)}
          />
          <LobbiInput
            label="Link (optional)"
            value={(block.content.link as string) || ''}
            onChange={(e) => updateContent('link', e.target.value)}
            placeholder="https://..."
          />
        </>
      )}

      {block.type === 'button' && (
        <>
          <LobbiInput
            label="Button Text"
            value={(block.content.text as string) || ''}
            onChange={(e) => updateContent('text', e.target.value)}
          />
          <LobbiInput
            label="Link URL"
            value={(block.content.link as string) || ''}
            onChange={(e) => updateContent('link', e.target.value)}
            placeholder="https://..."
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alignment
            </label>
            <div className="flex gap-2">
              {['left', 'center', 'right'].map((value) => (
                <button
                  key={value}
                  onClick={() => updateContent('alignment', value)}
                  className={cn(
                    'px-3 py-1.5 rounded-lg border text-sm capitalize transition-colors',
                    block.content.alignment === value
                      ? 'border-gold-500 bg-gold-50 text-gold-700'
                      : 'border-gray-200 text-gray-500 hover:border-gold-300'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {block.type === 'spacer' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Height: {block.content.height as React.ReactNode}px
          </label>
          <input
            type="range"
            min="8"
            max="96"
            step="8"
            value={(block.content.height as number) || 32}
            onChange={(e) => updateContent('height', parseInt(e.target.value))}
            className="w-full accent-gold-500"
          />
        </div>
      )}
    </div>
  );
}

// =============================================================================
// STEP 3: PREVIEW
// =============================================================================

function PreviewStep({
  template,
  onSendTest,
}: {
  template: EmailTemplate;
  onSendTest?: (template: EmailTemplate, email: string) => void;
}) {
  const [viewMode, setViewMode] = useState<'preview' | 'html'>('preview');
  const [testEmail, setTestEmail] = useState('');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  const htmlOutput = useMemo(() => generateHtmlOutput(template), [template]);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Preview Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('preview')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              viewMode === 'preview'
                ? 'bg-gold-100 text-gold-700'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <Eye className="w-4 h-4 inline mr-2" />
            Preview
          </button>
          <button
            onClick={() => setViewMode('html')}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
              viewMode === 'html'
                ? 'bg-gold-100 text-gold-700'
                : 'text-gray-600 hover:bg-gray-100'
            )}
          >
            <Code className="w-4 h-4 inline mr-2" />
            HTML
          </button>
        </div>

        {viewMode === 'preview' && (
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                previewDevice === 'desktop'
                  ? 'bg-gold-100 text-gold-700'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              <Monitor className="w-5 h-5" />
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={cn(
                'p-2 rounded-lg transition-colors',
                previewDevice === 'mobile'
                  ? 'bg-gold-100 text-gold-700'
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              <Smartphone className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Preview/HTML Content */}
      <LobbiCard padding="none" className="overflow-hidden">
        {viewMode === 'preview' ? (
          <div className="p-8 bg-gray-100 flex justify-center min-h-[500px]">
            <div
              className={cn(
                'bg-white shadow-lg transition-all duration-300',
                previewDevice === 'desktop' ? 'w-[600px]' : 'w-[375px]'
              )}
              dangerouslySetInnerHTML={{ __html: htmlOutput }}
            />
          </div>
        ) : (
          <div className="relative">
            <pre className="p-4 bg-gray-900 text-gray-100 text-sm overflow-auto max-h-[500px]">
              <code>{htmlOutput}</code>
            </pre>
            <button
              onClick={() => navigator.clipboard.writeText(htmlOutput)}
              className="absolute top-4 right-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
            >
              <Copy className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
      </LobbiCard>

      {/* Send Test Email */}
      <WizardCard
        title="Send Test Email"
        description="Send a test email to preview how it will look in inbox"
      >
        <div className="flex gap-4">
          <LobbiInput
            label="Email Address"
            type="email"
            value={testEmail}
            onChange={(e) => setTestEmail(e.target.value)}
            placeholder="test@example.com"
            className="flex-1"
          />
          <div className="flex items-end">
            <LobbiButton
              variant="secondary"
              onClick={() => onSendTest?.(template, testEmail)}
              leftIcon={<Send className="w-4 h-4" />}
              disabled={!testEmail}
            >
              Send Test
            </LobbiButton>
          </div>
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// STEP 4: SETTINGS
// =============================================================================

function SettingsStep({
  template,
  setTemplate,
}: {
  template: EmailTemplate;
  setTemplate: React.Dispatch<React.SetStateAction<EmailTemplate>>;
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Email Details */}
      <WizardCard title="Email Details">
        <div className="grid gap-4 md:grid-cols-2">
          <LobbiInput
            label="Subject Line"
            value={template.subject}
            onChange={(e) =>
              setTemplate((prev) => ({ ...prev, subject: e.target.value }))
            }
            placeholder="Your email subject"
          />
          <LobbiInput
            label="Preheader Text"
            value={template.preheader}
            onChange={(e) =>
              setTemplate((prev) => ({ ...prev, preheader: e.target.value }))
            }
            placeholder="Preview text in inbox"
          />
        </div>
      </WizardCard>

      {/* Style Settings */}
      <WizardCard title="Style Settings">
        <div className="grid gap-4 md:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={template.styles.backgroundColor}
                onChange={(e) =>
                  setTemplate((prev) => ({
                    ...prev,
                    styles: { ...prev.styles, backgroundColor: e.target.value },
                  }))
                }
                className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={template.styles.backgroundColor}
                onChange={(e) =>
                  setTemplate((prev) => ({
                    ...prev,
                    styles: { ...prev.styles, backgroundColor: e.target.value },
                  }))
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Color
            </label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={template.styles.primaryColor}
                onChange={(e) =>
                  setTemplate((prev) => ({
                    ...prev,
                    styles: { ...prev.styles, primaryColor: e.target.value },
                  }))
                }
                className="w-10 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={template.styles.primaryColor}
                onChange={(e) =>
                  setTemplate((prev) => ({
                    ...prev,
                    styles: { ...prev.styles, primaryColor: e.target.value },
                  }))
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Font Family
            </label>
            <select
              value={template.styles.fontFamily}
              onChange={(e) =>
                setTemplate((prev) => ({
                  ...prev,
                  styles: { ...prev.styles, fontFamily: e.target.value },
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="Arial, sans-serif">Arial</option>
              <option value="Georgia, serif">Georgia</option>
              <option value="Verdana, sans-serif">Verdana</option>
              <option value="Tahoma, sans-serif">Tahoma</option>
            </select>
          </div>
        </div>
      </WizardCard>

      {/* Dynamic Placeholders */}
      <WizardCard
        title="Available Placeholders"
        description="Use these placeholders in your content for personalization"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: 'First Name', value: '{{first_name}}' },
            { label: 'Last Name', value: '{{last_name}}' },
            { label: 'Email', value: '{{email}}' },
            { label: 'Member ID', value: '{{member_id}}' },
            { label: 'Org Name', value: '{{org_name}}' },
            { label: 'Current Date', value: '{{date}}' },
            { label: 'Unsubscribe Link', value: '{{unsubscribe_url}}' },
            { label: 'View in Browser', value: '{{view_url}}' },
          ].map((placeholder) => (
            <button
              key={placeholder.value}
              onClick={() => navigator.clipboard.writeText(placeholder.value)}
              className={cn(
                'p-3 rounded-lg border border-gray-200 text-left',
                'hover:border-gold-300 hover:bg-gold-50 transition-colors'
              )}
            >
              <p className="text-sm font-medium text-gray-900">
                {placeholder.label}
              </p>
              <code className="text-xs text-gray-500">{placeholder.value}</code>
            </button>
          ))}
        </div>
      </WizardCard>
    </div>
  );
}

// =============================================================================
// UTILITIES
// =============================================================================

function getPresetBlocks(presetId: string): EmailBlock[] {
  switch (presetId) {
    case 'welcome':
      return [
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { title: 'Welcome to Our Community!', logoUrl: '' },
        },
        {
          id: crypto.randomUUID(),
          type: 'text',
          content: {
            text: "We're thrilled to have you join us. Here's everything you need to get started.",
            alignment: 'center',
          },
        },
        {
          id: crypto.randomUUID(),
          type: 'button',
          content: { text: 'Get Started', link: '#', alignment: 'center' },
        },
      ];
    case 'newsletter':
      return [
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { title: 'Monthly Newsletter', logoUrl: '' },
        },
        {
          id: crypto.randomUUID(),
          type: 'image',
          content: {
            src: 'https://via.placeholder.com/600x200',
            alt: 'Newsletter Header',
          },
        },
        {
          id: crypto.randomUUID(),
          type: 'text',
          content: { text: "Here's what's new this month...", alignment: 'left' },
        },
        {
          id: crypto.randomUUID(),
          type: 'divider',
          content: { style: 'solid', color: '#e5e7eb' },
        },
        {
          id: crypto.randomUUID(),
          type: 'columns',
          content: { left: 'Feature 1 details', right: 'Feature 2 details' },
        },
      ];
    case 'event':
      return [
        {
          id: crypto.randomUUID(),
          type: 'header',
          content: { title: "You're Invited!", logoUrl: '' },
        },
        {
          id: crypto.randomUUID(),
          type: 'text',
          content: {
            text: "Join us for an exciting event you won't want to miss.",
            alignment: 'center',
          },
        },
        {
          id: crypto.randomUUID(),
          type: 'image',
          content: {
            src: 'https://via.placeholder.com/600x300',
            alt: 'Event Image',
          },
        },
        {
          id: crypto.randomUUID(),
          type: 'button',
          content: { text: 'RSVP Now', link: '#', alignment: 'center' },
        },
      ];
    case 'reminder':
      return [
        {
          id: crypto.randomUUID(),
          type: 'text',
          content: { text: '⏰ Friendly Reminder', alignment: 'center' },
        },
        {
          id: crypto.randomUUID(),
          type: 'text',
          content: {
            text: "Don't forget about your upcoming appointment.",
            alignment: 'center',
          },
        },
        {
          id: crypto.randomUUID(),
          type: 'button',
          content: { text: 'View Details', link: '#', alignment: 'center' },
        },
      ];
    default:
      return [];
  }
}

function generateHtmlOutput(template: EmailTemplate): string {
  const blocksHtml = template.blocks
    .map((block) => {
      switch (block.type) {
        case 'header':
          return `<div style="text-align: center; padding: 20px;">
            <h1 style="margin: 0; color: #111827;">${block.content.title || 'Header'}</h1>
          </div>`;
        case 'text':
          return `<div style="padding: 20px; text-align: ${block.content.alignment || 'left'};">
            <p style="margin: 0; color: #374151;">${block.content.text || ''}</p>
          </div>`;
        case 'image':
          return `<div style="padding: 0;">
            <img src="${block.content.src}" alt="${block.content.alt}" style="width: 100%; display: block;" />
          </div>`;
        case 'button':
          return `<div style="padding: 20px; text-align: ${block.content.alignment || 'center'};">
            <a href="${block.content.link}" style="display: inline-block; padding: 12px 24px; background: ${template.styles.primaryColor}; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">${block.content.text || 'Button'}</a>
          </div>`;
        case 'columns':
          return `<div style="padding: 20px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td width="50%" style="padding: 10px; vertical-align: top;">${block.content.left}</td>
                <td width="50%" style="padding: 10px; vertical-align: top;">${block.content.right}</td>
              </tr>
            </table>
          </div>`;
        case 'divider':
          return `<div style="padding: 10px 20px;">
            <hr style="border: none; border-top: 1px ${block.content.style} ${block.content.color};" />
          </div>`;
        case 'spacer':
          return `<div style="height: ${block.content.height}px;"></div>`;
        default:
          return '';
      }
    })
    .join('\n');

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${template.subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: ${template.styles.backgroundColor}; font-family: ${template.styles.fontFamily};">
  <div style="max-width: 600px; margin: 0 auto; background-color: white;">
    ${blocksHtml}
  </div>
</body>
</html>`;
}

export default EmailTemplateBuilder;
