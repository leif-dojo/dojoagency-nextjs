"use client"
import { useState, useRef } from "react";
import { usePathname } from 'next/navigation'
import { motion } from "framer-motion";

export const PageTransition = ({ children }: { children: any }) => {
    const pathname = usePathname()
    return (
        <>
            <motion.div
                key={pathname}
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 0, opacity: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                }}
            >
                {children}
            </motion.div>
        </>
    )
};
