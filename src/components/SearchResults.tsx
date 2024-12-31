import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

interface Item {
  id: string;
  code: number;
  category: string;
  verified: boolean;
  initial: boolean;
}

interface SearchResultsProps {
  items: Item[];
  isLoading: boolean;
}

export function SearchResults({ items, isLoading }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No results found
      </div>
    );
  }

  return (
    <div className="grid gap-4 mt-4">
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Code: {item.code}</span>
              <p className="text-gray-600">Category: {item.category}</p>
            </div>
            <div className="flex items-center gap-2">
              {item.verified ? (
                <CheckCircle className="text-green-500 h-5 w-5" />
              ) : (
                <AlertCircle className="text-yellow-500 h-5 w-5" />
              )}
              {item.initial && (
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  Initial
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}