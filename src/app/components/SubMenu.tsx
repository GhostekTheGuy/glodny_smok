import React from 'react'
import { ChevronDown } from 'lucide-react'

interface SubMenuProps {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  sortOrder: string
  setSortOrder: (order: string) => void
}

export function SubMenu({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  sortOrder, 
  setSortOrder 
}: SubMenuProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded-lg border text-sm whitespace-nowrap overflow-hidden text-ellipsis ${
              selectedCategory === category
                ? 'border-red-600 text-red-600 bg-red-50'
                : 'border-gray-300 text-gray-700 hover:border-gray-400'
            } font-medium transition-colors`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="flex justify-end">
        <div className="relative">
          <select
            className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm leading-tight focus:outline-none focus:border-red-600"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Sortuj</option>
            <option value="name-asc">Nazwa A-Z</option>
            <option value="name-desc">Nazwa Z-A</option>
            <option value="price-asc">Cena: rosnąco</option>
            <option value="price-desc">Cena: malejąco</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}

