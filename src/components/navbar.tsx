"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import UserMenuItems from "./UserMenuItems";

export default function Navbar() {
	const [open, setOpen] = useState(false);
	const router = useRouter();
	const menuRef = useRef<HTMLDivElement | null>(null);
	const buttonRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => {
		function onDoc(e: MouseEvent) {
			if (!menuRef.current) return;
			if (menuRef.current.contains(e.target as Node)) return;
			if (buttonRef.current && buttonRef.current.contains(e.target as Node)) return;
			setOpen(false);
		}

		function onKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}

		document.addEventListener("mousedown", onDoc);
		document.addEventListener("keydown", onKey);
		return () => {
			document.removeEventListener("mousedown", onDoc);
			document.removeEventListener("keydown", onKey);
		};
	}, []);

	return (
		<header className="w-full sticky top-0 z-30 py-4 app-header">
			<div className="mx-auto max-w-7xl px-6">
				<div className="flex items-center justify-between glass-surface rounded-xl p-3 shadow-sm">
					{/* Left: App label */}
					<div className="flex items-center gap-3">
										<div className="text-sm font-semibold header-brand">Academic Planner</div>
					</div>

					{/* Center: Page title */}
					<div className="flex-1 px-4 flex items-center justify-center">
						<div className="text-center">
							<div className="text-base font-semibold text-slate-800">Academic Planner <span className="text-sm text-slate-500">&amp; Deadline Tracker</span></div>
						</div>
					</div>

					{/* Right: Search + icons + profile */}
					<div className="flex items-center gap-3">
						<div className="hidden md:block">
							<div className="relative">
												<input
													placeholder="Search..."
													className="search-input w-64 pr-10 focus:ring-0 outline-none smooth-transition"
												/>
								<button className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 p-1">
									<svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
									</svg>
								</button>
							</div>
						</div>

						<button aria-label="notifications" className="p-2 rounded hover:bg-gray-100 smooth-transition">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
							</svg>
						</button>

						<button aria-label="settings" className="p-2 rounded hover:bg-gray-100 smooth-transition">
							<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0a1.724 1.724 0 002.573 1.0 1.724 1.724 0 012.04.255c.7.7.7 1.829 0 2.528a1.724 1.724 0 01-.255 2.04 1.724 1.724 0 001.0 2.573c.921.3.921 1.603 0 1.902a1.724 1.724 0 00-1.0 2.573 1.724 1.724 0 01-2.04.255c-.7-.7-1.829-.7-2.528 0a1.724 1.724 0 01-2.04.255 1.724 1.724 0 00-2.573 1.0c-.3.921-1.603.921-1.902 0a1.724 1.724 0 00-2.573-1.0 1.724 1.724 0 01-2.04-.255c-.7-.7-.7-1.829 0-2.528a1.724 1.724 0 01.255-2.04 1.724 1.724 0 00-1.0-2.573c-.921-.3-.921-1.603 0-1.902a1.724 1.724 0 001.0-2.573 1.724 1.724 0 01.255-2.04c.7-.7 1.829-.7 2.528 0 .7.7 1.829.7 2.528 0a1.724 1.724 0 012.04-.255c.921.3 1.603-.7 1.902 0z" />
							</svg>
						</button>

						<div className="relative">
							<button
								ref={buttonRef}
								onClick={() => setOpen((v) => !v)}
								aria-haspopup="menu"
								aria-expanded={open}
								className="flex items-center gap-2 p-1 rounded smooth-transition"
							>
								<div className="w-8 h-8 brand-badge rounded-full flex items-center justify-center" />
							</button>

							{open && (
								<div ref={menuRef} role="menu" aria-label="User menu" className="absolute right-0 mt-2 w-44 bg-white rounded shadow fade-in">
									<UserMenuItems router={router} />
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

