import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useSearchTracking } from '../lib/analytics';

export function useSearch() {
  const [searchParams] = useSearchParams();
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchTerm = searchParams.get('q');
  useSearchTracking(searchTerm, items.length);

  useEffect(() => {
    async function performSearch() {
      if (!searchTerm || searchTerm.length < 3) {
        setItems([]);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('items')
          .select('*')
          .or(`code.ilike.%${searchTerm}%,category.ilike.%${searchTerm}%`);

        if (error) throw error;
        setItems(data || []);
      } catch (error) {
        console.error('Error performing search:', error);
        setItems([]);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [searchTerm]);

  return { items, isLoading };
}