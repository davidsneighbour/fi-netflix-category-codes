import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '../lib/supabase';
import { MatomoAnalytics } from '../lib/analytics';
import toast from 'react-hot-toast';

const schema = z.object({
  code: z.number().min(0),
  category: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

const analytics = MatomoAnalytics.getInstance();

export function AddItemForm() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const { error } = await supabase
        .from('items')
        .insert([
          { 
            code: data.code,
            category: data.category,
            verified: false,
            initial: false
          }
        ]);

      if (error) throw error;

      analytics.trackEvent({
        category: 'Item',
        action: 'Add',
        name: 'Success',
        value: data.code
      });
      
      toast.success('Item added successfully');
      reset();
    } catch (error) {
      console.error('Error adding item:', error);
      analytics.trackEvent({
        category: 'Item',
        action: 'Add',
        name: 'Error'
      });
      toast.error('Failed to add item');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md mx-auto">
      <div>
        <label htmlFor="code" className="block text-sm font-medium text-gray-700">
          Code
        </label>
        <input
          type="number"
          {...register('code', { valueAsNumber: true })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.code && (
          <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <input
          type="text"
          {...register('category')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Add Item
      </button>
    </form>
  );
}