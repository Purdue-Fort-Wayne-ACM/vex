export function MdxLayout({ children }: { children: React.ReactNode }) {
  // Create any shared layout or styles here
  return <div className="bg-main rounded-lg shadow-lg max-w-5xl mx-auto p-3 flex flex-col gap-2">
    {children}
    </div>
}