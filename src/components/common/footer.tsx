export default function Footer() {
  return (
    <footer className="border-t mt-12 py-6 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Sleekflow Assessment - Nik Uzair</p>
      <p className="mt-1">Data provided by the Rick and Morty API.</p>
    </footer>
  );
}
