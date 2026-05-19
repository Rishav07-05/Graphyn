import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import { useToast } from "./ToastProvider";
export const ProfileMenu = () => {
    const { user, isSignedIn } = useUser();
    const { signOut, openUserProfile } = useClerk();
    const { addToast } = useToast();
    const [open, setOpen] = useState(false);
    if (!isSignedIn) {
        return (_jsx(Link, { to: "/auth", className: "rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white", children: "Sign In" }));
    }
    const displayName = user?.fullName ?? user?.primaryEmailAddress?.emailAddress ?? "Profile";
    const handleSignOut = async () => {
        addToast("Signed out", "success");
        await signOut();
    };
    return (_jsxs("div", { className: "relative", children: [_jsxs("button", { type: "button", onClick: () => setOpen((prev) => !prev), className: "flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3 py-2 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-white", children: [_jsx("img", { src: user?.imageUrl, alt: displayName, className: "h-7 w-7 rounded-full border border-slate-200/70 object-cover dark:border-white/10" }), _jsx("span", { className: "max-w-[120px] truncate", children: displayName })] }), open ? (_jsxs("div", { className: "absolute right-0 mt-3 w-48 rounded-2xl border border-slate-200/70 bg-white/95 p-2 text-sm text-slate-700 shadow-lg dark:border-white/10 dark:bg-slate-950/95 dark:text-slate-200", children: [_jsx("div", { className: "px-3 py-2 text-xs uppercase text-slate-500 dark:text-slate-400", children: "Account" }), _jsx("div", { className: "px-3 pb-2 text-xs text-slate-500 dark:text-slate-400", children: user?.primaryEmailAddress?.emailAddress ?? "" }), _jsx("button", { type: "button", onClick: () => {
                            setOpen(false);
                            openUserProfile();
                        }, className: "w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/5", children: "Profile" }), _jsx("button", { type: "button", onClick: () => {
                            setOpen(false);
                            void handleSignOut();
                        }, className: "w-full rounded-xl px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 dark:text-rose-200 dark:hover:bg-rose-500/10", children: "Sign out" })] })) : null] }));
};
