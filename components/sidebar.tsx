"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronDown } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { useTheme } from "@/lib/theme-context";
import { cn } from "@/lib/utils";

interface CollapsibleSectionProps {
    title: string;
    items: { title: string; slug: string }[];
    pathname: string;
    theme: string;
    onLinkClick?: () => void;
}

function CollapsibleSection({ title, items, pathname, theme, onLinkClick }: CollapsibleSectionProps) {
    const hasActiveItem = items.some(item => pathname === `/docs/${item.slug}`);
    const [isExpanded, setIsExpanded] = useState(hasActiveItem);

    useEffect(() => {
        if (hasActiveItem) {
            setIsExpanded(true);
        }
    }, [hasActiveItem]);

    return (
        <div>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className={cn(
                    "w-full flex items-center justify-between mb-2 pl-3 pr-2 py-1 border-l-2 border-emerald-500 uppercase tracking-widest text-sm font-extrabold transition-colors cursor-pointer rounded-r-md",
                    theme === "dark"
                        ? "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
                        : "text-zinc-500 hover:text-zinc-700 hover:bg-[#e6dec9]/50"
                )}
            >
                <span>{title}</span>
                <motion.span
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" />
                </motion.span>
            </button>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 overflow-hidden"
                    >
                        {items.map((item) => {
                            const href = `/docs/${item.slug}`;
                            const isActive = pathname === href;

                            return (
                                <li key={item.slug}>
                                    <Link
                                        href={href}
                                        onClick={onLinkClick}
                                        className={cn(
                                            "block rounded-md px-3 py-2 text-sm transition-colors font-display",
                                            theme === "dark"
                                                ? isActive
                                                    ? "bg-zinc-800 text-white"
                                                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                                                : isActive
                                                    ? "bg-[#e6dec9] text-var(--paper-text) font-semibold"
                                                    : "text-(--paper-text)/80 hover:bg-[#e6dec9]/50 hover:text-(--paper-text)"
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Sidebar() {
    const pathname = usePathname();
    const { theme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);

    const closeSidebar = () => setIsOpen(false);

    const SidebarContent = () => (
        <>
            <Link href="/docs/go/getting-started" className="mb-8 mt-8 block" onClick={closeSidebar}>
                <span className={cn(
                    "text-xl font-bold",
                    theme === "dark" ? "text-white" : "text-(--paper-text)"
                )}>DevNotes</span>
            </Link>

            <nav className="space-y-4">
                {navigation.map((section) => (
                    <CollapsibleSection
                        key={section.title}
                        title={section.title}
                        items={section.items}
                        pathname={pathname}
                        theme={theme}
                        onLinkClick={closeSidebar}
                    />
                ))}
            </nav>
        </>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    "fixed top-4 left-4 z-40 p-2 rounded-lg border lg:hidden cursor-pointer",
                    theme === "dark"
                        ? "bg-zinc-900 border-zinc-800"
                        : "bg-paper border-zinc-200"
                )}
                aria-label="Open menu"
            >
                <Menu className={cn("w-5 h-5", theme === "dark" ? "text-white" : "text-(--paper-text)")} />
            </button>

            <aside className={cn(
                "hidden lg:fixed lg:inset-y-0 lg:left-0 lg:flex lg:w-64 lg:flex-col border-r transition-colors duration-200",
                theme === "dark"
                    ? "border-zinc-800 bg-zinc-950"
                    : "border-zinc-200 bg-paper"
            )}>
                <div className="h-full overflow-y-auto overscroll-contain p-6">
                    <SidebarContent />
                </div>
            </aside>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={closeSidebar}
                            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
                        />

                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className={cn(
                                "fixed top-0 left-0 z-50 h-screen w-72 border-r lg:hidden transition-colors duration-200",
                                theme === "dark"
                                    ? "bg-zinc-950 border-zinc-800"
                                    : "bg-paper border-zinc-200"
                            )}
                        >
                            <div className="h-full overflow-y-auto overscroll-contain p-6">
                                <button
                                    onClick={closeSidebar}
                                    className={cn(
                                        "absolute top-4 right-4 p-2 rounded-lg transition-colors cursor-pointer",
                                        theme === "dark" ? "hover:bg-zinc-800" : "hover:bg-[#e6dec9]/50"
                                    )}
                                    aria-label="Close menu"
                                >
                                    <X className={cn("w-5 h-5", theme === "dark" ? "text-zinc-400" : "text-(--paper-text)")} />
                                </button>
                                <SidebarContent />
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}