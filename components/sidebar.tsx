"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import { navigation } from "@/lib/navigation";
import { cn } from "@/lib/utils";

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const closeSidebar = () => setIsOpen(false);

    const SidebarContent = () => (
        <>
            <Link href="/docs/go/getting-started" className="mb-8 mt-8 block" onClick={closeSidebar}>
                <span className="text-xl font-bold text-white">DevNotes</span>
            </Link>

            <nav className="space-y-6">
                {navigation.map((section) => (
                    <div key={section.title}>
                        <h3 className="mb-3 pl-3 border-l-2 border-emerald-500 uppercase tracking-widest text-zinc-500 text-lg font-extrabold">
                            {section.title}
                        </h3>
                        <ul className="space-y-1">
                            {section.items.map((item) => {
                                const href = `/docs/${item.slug}`;
                                const isActive = pathname === href;

                                return (
                                    <li key={item.slug}>
                                        <Link
                                            href={href}
                                            onClick={closeSidebar}
                                            className={cn(
                                                "block rounded-md px-3 py-2 text-sm transition-colors font-display",
                                                isActive
                                                    ? "bg-zinc-800 text-white"
                                                    : "text-zinc-400 hover:bg-zinc-800/50 hover:text-white"
                                            )}
                                        >
                                            {item.title}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))}
            </nav>
        </>
    );

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="fixed top-4 left-4 z-40 p-2 rounded-lg bg-zinc-900 border border-zinc-800 lg:hidden cursor-pointer"
                aria-label="Open menu"
            >
                <Menu className="w-5 h-5 text-white" />
            </button>

            <aside className="hidden lg:block w-64 shrink-0 border-r border-zinc-800">
                <div className="sticky top-0 h-screen overflow-y-auto overscroll-contain p-6">
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
                            className="fixed top-0 left-0 z-50 h-screen w-72 bg-zinc-950 border-r border-zinc-800 lg:hidden"
                        >
                            <div className="h-full overflow-y-auto overscroll-contain p-6">
                                <button
                                    onClick={closeSidebar}
                                    className="absolute top-4 right-4 p-2 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
                                    aria-label="Close menu"
                                >
                                    <X className="w-5 h-5 text-zinc-400" />
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