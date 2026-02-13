export default function CategoryFilter({
  categories,
  selected,
  setSelected,
}: any) {
  return (
    <div className="flex gap-4 mb-8 flex-wrap">
      {categories.map((cat: string) => (
        <button
          key={cat}
          onClick={() => setSelected(cat)}
          className={`px-4 py-2 rounded-full ${
            selected === cat
              ? "bg-purple-600"
              : "bg-zinc-800 hover:bg-zinc-700"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
