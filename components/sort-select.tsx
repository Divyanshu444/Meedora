'use client'

export function SortSelect({ current }: { current?: string }) {
  const options = [
    { value: '', label: 'Featured' },
    { value: 'price-asc', label: 'Price: Low to high' },
    { value: 'price-desc', label: 'Price: High to low' },
    { value: 'newest', label: 'Newest first' },
  ]

  return (
    <select
      id="sort-select"
      name="sort"
      defaultValue={current ?? ''}
      onChange={(e) => {
        const url = new URL(window.location.href)
        if (e.target.value) url.searchParams.set('sort', e.target.value)
        else url.searchParams.delete('sort')
        window.location.href = url.toString()
      }}
      className="h-8 rounded-sm border border-border bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      {options.map(opt => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
