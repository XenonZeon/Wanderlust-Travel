export default function Footer() {
  return (
    <footer className="bg-ink border-t border-ink-soft py-12">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-paper-soft text-sm">© {new Date().getFullYear()} Wanderlust Travel</p>
      </div>
    </footer>
  );
}
