"use client"
import { usePathname } from 'next/navigation'
import { motion } from "framer-motion";

export const PageTransition = ({ children }: { children: any }) => {
    const pathname = usePathname()
    return (
        <>
            <motion.div
                key={pathname}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 1,
                }}
            >
                {children}
            </motion.div>
        </>
    )
};
