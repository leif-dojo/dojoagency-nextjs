"use client";
 
import { AnimatePresence, motion } from "motion/react";
import { useSelectedLayoutSegment } from "next/navigation";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname } from "next/navigation";
import { useContext, useEffect, useRef } from "react";
 
function usePreviousValue<T>(value: T): T | undefined {
  const prevValue = useRef<T>();
 
  useEffect(() => {
    prevValue.current = value;
    return () => {
      prevValue.current = undefined;
    };
  });
 
  return prevValue.current;
}
 
function FrozenRouter(props: { children: React.ReactNode }) {
  const context = useContext(LayoutRouterContext);
  const prevContext = usePreviousValue(context) || null;
 
  const segment = useSelectedLayoutSegment();
  const prevSegment = usePreviousValue(segment);
 
  const changed =
    segment !== prevSegment &&
    segment !== undefined &&
    prevSegment !== undefined;
 
  return (
    <LayoutRouterContext.Provider value={changed ? prevContext : context}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}
 
interface PageTransitionProps {
  children: React.ReactNode;
  className?: React.ComponentProps<typeof motion.div>["className"];
  style?: React.ComponentProps<typeof motion.div>["style"];
  initial?: React.ComponentProps<typeof motion.div>["initial"];
  animate?: React.ComponentProps<typeof motion.div>["animate"];
  exit?: React.ComponentProps<typeof motion.div>["exit"];
}
 
export function PageTransition({
  children,
  className,
  style,
  initial,
  animate,
  exit,
}: PageTransitionProps) {
  const segment = useSelectedLayoutSegment();
  const pathname = usePathname();
 
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        className=''
        key={pathname}
        initial={{ y: 0, opacity: 0, }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 0, opacity: 0, transition: {
            type: "tween",
            ease: "easeInOut",
            duration: 0.5,
          } }}
        transition={{
            type: "tween",
            ease: "easeInOut",
            duration: 0.5,
        }}
      >
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  );
}