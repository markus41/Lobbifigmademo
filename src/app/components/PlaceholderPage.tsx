import { motion } from 'motion/react';

interface PlaceholderPageProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
}

export function PlaceholderPage({ title, subtitle, icon }: PlaceholderPageProps) {
  return (
    <div className="p-8 flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-6 bg-gold-50 rounded-2xl flex items-center justify-center"
        >
          <div className="text-gold-primary">
            {icon}
          </div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-3"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 mb-8"
        >
          {subtitle}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gold-primary text-white rounded-lg hover:bg-gold-dark transition-colors font-medium"
        >
          Coming Soon
        </motion.button>
      </motion.div>
    </div>
  );
}
