import { motion } from 'motion/react';

export function Dashboard() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <h1 
          className="text-4xl mb-6"
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontWeight: 400,
            color: '#2C2A25',
          }}
        >
          Dashboard
        </h1>
        <p style={{ color: '#8A8578' }}>
          Welcome to your dashboard. More content coming soon.
        </p>
      </div>
    </motion.div>
  );
}
