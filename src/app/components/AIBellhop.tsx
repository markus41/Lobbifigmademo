import { motion, AnimatePresence } from 'motion/react';
import { XIcon, SendIcon } from './icons/XIcon';
import { useState, useRef, useEffect } from 'react';

interface AIBellhopProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  type: 'assistant' | 'user';
  content: string;
  timestamp: Date;
}

const quickSuggestions = [
  { label: 'Upcoming Events', query: 'What events are coming up this month?' },
  { label: 'Member Stats', query: 'Show me membership statistics' },
  { label: 'Recent Activity', query: 'What happened recently?' },
  { label: 'Help', query: 'What can you help me with?' },
];

const sampleResponses: Record<string, string> = {
  'What events are coming up this month?':
    'You have 3 upcoming events this month:\n\n• **Annual Gala** - February 15th at 7:00 PM (124 registered)\n• **Board Meeting** - February 20th at 2:00 PM\n• **New Member Orientation** - February 28th at 10:00 AM (8 registered)\n\nWould you like me to help you manage RSVPs or send reminders?',
  'Show me membership statistics':
    'Here are your current membership stats:\n\n• **Total Members:** 1,284\n• **New this month:** 23 (+8%)\n• **Renewals due:** 45 in next 30 days\n• **Retention rate:** 94.2%\n\nYour membership is growing steadily! Shall I prepare a detailed report?',
  'What happened recently?':
    'Here\'s your recent activity summary:\n\n• 5 mins ago - James Wilson joined as Professional Member\n• 1 hour ago - 15 new registrations for Annual Gala\n• 2 hours ago - $2,500 payment received from Sarah Chen\n• 3 hours ago - Q1 Financial Report uploaded to The Vault\n\nWould you like to see more details on any of these?',
  'What can you help me with?':
    'I can assist you with:\n\n• **Member Management** - Add, search, or update members\n• **Events** - Create events, manage registrations, send reminders\n• **Communications** - Draft emails, announcements, newsletters\n• **Reports** - Generate financial, membership, or activity reports\n• **Documents** - Find and organize files in The Vault\n\nJust ask me anything!',
};

export function AIBellhop({ isOpen, onClose }: AIBellhopProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Good day! I\'m your AI Concierge. I\'m here to help you navigate The Lobbi and assist with any questions you may have.',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const response = sampleResponses[text] ||
        'I understand you\'re asking about "' + text + '". Let me look into that for you. In the meantime, is there anything specific I can help you with regarding members, events, or documents?';

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(message);
    }
  };

  const formatMessage = (text: string) => {
    // Simple markdown-like formatting
    return text.split('\n').map((line, i) => {
      // Bold text
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      return (
        <span key={i}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {i < text.split('\n').length - 1 && <br />}
        </span>
      );
    });
  };

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
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
                    }}
                  >
                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2a3 3 0 0 0-3 3v1a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                      <path d="M19 9H5a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2Z" />
                      <path d="M12 14v8" />
                      <path d="M8 22h8" />
                    </svg>
                  </div>
                  <div>
                    <h2
                      className="text-xl"
                      style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontWeight: 600,
                        color: '#1A1815',
                      }}
                    >
                      AI Concierge
                    </h2>
                    <p className="text-xs" style={{ color: '#8A8578' }}>
                      Always at your service
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <XIcon className="w-5 h-5" style={{ color: '#8A8578' }} />
                </button>
              </div>
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-3 border-b border-gray-100 bg-[#FAFAF8]">
              <div className="flex gap-2 overflow-x-auto pb-1">
                {quickSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.label}
                    onClick={() => handleSend(suggestion.query)}
                    className="flex-shrink-0 px-3 py-1.5 text-xs font-medium rounded-full border transition-all hover:border-[#D4AF37] hover:bg-[#D4AF37]/5"
                    style={{
                      borderColor: '#E5E0D5',
                      color: '#5A5247',
                      fontFamily: 'DM Sans, sans-serif',
                    }}
                  >
                    {suggestion.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-4 ${
                      msg.type === 'user'
                        ? 'rounded-br-sm bg-gradient-to-br from-[#D4AF37] to-[#8B7330] text-white'
                        : 'rounded-bl-sm bg-[#F7F4EE]'
                    }`}
                  >
                    <p
                      className="text-sm leading-relaxed"
                      style={{ color: msg.type === 'user' ? '#fff' : '#2C2A25' }}
                    >
                      {formatMessage(msg.content)}
                    </p>
                    <p
                      className={`text-[10px] mt-2 ${
                        msg.type === 'user' ? 'text-white/70' : 'text-[#B8B0A0]'
                      }`}
                    >
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-[#F7F4EE] rounded-2xl rounded-bl-sm p-4">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-[#D4AF37]"
                          animate={{
                            y: [0, -6, 0],
                          }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200 bg-white">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-[#F7F4EE] border border-transparent rounded-xl text-sm outline-none transition-all"
                  style={{ color: '#2C2A25' }}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(212,175,55,0.3)';
                    e.target.style.background = '#fff';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'transparent';
                    e.target.style.background = '#F7F4EE';
                  }}
                />
                <button
                  onClick={() => handleSend(message)}
                  disabled={!message.trim()}
                  className="px-4 py-3 rounded-xl text-white transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, #F5E6A3, #D4AF37, #8B7330)',
                  }}
                >
                  <SendIcon className="w-5 h-5" />
                </button>
              </div>
              <p className="text-[10px] text-center mt-2" style={{ color: '#B8B0A0' }}>
                AI responses are simulated for demo purposes
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
