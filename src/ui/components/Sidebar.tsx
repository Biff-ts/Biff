// src/ui/components/Sidebar.tsx
export function Sidebar({
  intents,
  onSelect
}: {
  intents: { name: string; description: string }[]
  onSelect: (name: string) => void
}) {
  return (
    <aside className="w-64 bg-white border-r p-4">
      <h2 className="text-xl font-semibold mb-4">Intents</h2>
      {intents.map(({ name }) => (
        <button
          key={name}
          onClick={() => onSelect(name)}
          className="block w-full text-left px-3 py-2 hover:bg-gray-100 rounded"
        >
          {name}
        </button>
      ))}
    </aside>
  )
}
