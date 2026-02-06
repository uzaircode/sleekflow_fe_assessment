export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 flex-col">
      <h1 className="text-9xl font-bold text-gray-300 mb-4">404</h1>
      <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
      <p className="text-gray-600 mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
    </div>
  );
}
