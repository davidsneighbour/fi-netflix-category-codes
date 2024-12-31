import React from 'react';
import { Toaster } from 'react-hot-toast';
import { SearchBar } from './components/SearchBar';
import { SearchResults } from './components/SearchResults';
import { AddItemForm } from './components/AddItemForm';
import { useSearch } from './hooks/useSearch';
import { usePageTracking } from './lib/analytics';

function App() {
  const { items, isLoading } = useSearch();
  usePageTracking('Item Database');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Item Database</h1>
        
        <div className="grid gap-8 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <SearchBar />
            <SearchResults items={items} isLoading={isLoading} />
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 h-fit">
            <h2 className="text-xl font-semibold mb-4">Add New Item</h2>
            <AddItemForm />
          </div>
        </div>
      </div>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;