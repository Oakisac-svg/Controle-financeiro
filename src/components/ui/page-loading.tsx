export function PageLoading() {
  return <div className="space-y-6" aria-label="Carregando"><div className="skeleton h-20 rounded-2xl" /><div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{Array.from({ length: 4 }).map((_, i) => <div className="skeleton h-36 rounded-2xl" key={i} />)}</div><div className="skeleton h-80 rounded-2xl" /></div>;
}
