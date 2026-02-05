import { motion, AnimatePresence } from 'motion/react';
import { XIcon, SendIcon } from './icons/XIcon';
import { useState } from 'react';

interface AIBellhopProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AIBellhop({ isOpen, onClose }: AIBellhopProps) {
  const [message, setMessage] = useState('');

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[101] flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              duration: 0.5, 
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 
                    className="text-2xl"
                    style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontWeight: 500,
                      color: '#2C2A25',
                    }}
                  >
                    AI Concierge
                  </h2>
                  <p className="text-sm mt-1" style={{ color: '#8A8578' }}>
                    How may I assist you today?
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XIcon className="w-5 h-5" style={{ color: '#8A8578' }} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-4">
                <div className="bg-[#F7F4EE] rounded-2xl rounded-tl-sm p-4">
                  <p className="text-sm" style={{ color: '#2C2A25' }}>
                    Good day! I'm your AI Concierge. I'm here to help you navigate 
                    The Lobbi and assist with any questions you may have.
                  </p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-[#F7F4EE] border border-transparent rounded-xl text-sm outline-none"
                  style={{ color: '#2C2A25' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212,175,55,0.2)';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = '#F7F4EE';
                  }}
                />
                <button
                  className="px-4 py-3 rounded-xl text-white"
                  style={{
                    background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
                  }}
                >
                  <SendIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}