import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="flex flex-col items-center justify-center mt-10">
        <h1 className="text-4xl font-bold text-gray-900">Welcome to Laer Health</h1>
        <p className="text-lg text-gray-700 mt-4">Manage your profile and organization with ease.</p>
        <div className="mt-6 space-x-4">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-md">Explore Dashboard</button>
          <button className="px-6 py-2 border border-blue-600 text-blue-600 rounded-md">Learn More</button>
        </div>
      </main>
    </div>
  );
}
