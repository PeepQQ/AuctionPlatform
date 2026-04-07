'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}


export const NavLink = ({ href, children, className }: NavLinkProps) => {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <Link 
            href={href}
            className={className}
            data-active={isActive}
        >
            {children}
        </Link>
    );
};