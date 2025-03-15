"use client";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbsProps {
  productName: string;
}

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  return (
    <nav className="flex items-center space-x-2 text-sm mb-6">
      <Link 
        href="/#menu" 
        className="text-gray-500 hover:text-gray-700 transition-colors"
      >
        Menu
      </Link>
      <span className="text-gray-400">/</span>
      <span className="text-gray-900 font-medium">{productName}</span>
    </nav>
  );
}
