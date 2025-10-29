'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  const variants = {
    hidden: { opacity: 0, y: 20 },
    enter: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
  };

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <motion.div
      key={pathname}
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{ type: 'tween', ease: 'easeInOut', duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
}
