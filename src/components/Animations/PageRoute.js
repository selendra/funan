import { motion } from 'framer-motion';

export default function PageRouteAnimation({children, myKey}) {
  return (
    <motion.div
      key={myKey}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.div>
  )
}
