interface SubMenuProps {
  sortOrder: string
  setSortOrder: (order: string) => void
}

export function SubMenu({ sortOrder, setSortOrder }: SubMenuProps) {
  return (
    <div className="flex justify-end mb-6">
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
          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  )
}

