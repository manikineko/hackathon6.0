interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-mint">
      <div className="mx-auto max-w-7xl">
        {children}
      </div>
    </div>
  )
}

