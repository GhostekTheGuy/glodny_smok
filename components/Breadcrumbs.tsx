"use client"
import Link from "next/link"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface BreadcrumbsProps {
  productName: string
}

export function Breadcrumbs({ productName }: BreadcrumbsProps) {
  const router = useRouter()

  return (
    <nav className="flex mb-4" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <Link href="/" className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600">
            Menu główne
          </Link>
        </li>
        <li>
          <div className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">{productName}</span>
          </div>
        </li>
      </ol>
    </nav>
  )
}

