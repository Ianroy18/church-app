import { useState, useEffect } from 'react';
import { supabase } from '../supabase';

// Map of content types to their Supabase tables
export const contentTableMap = {
  articles: 'articles',
  magazines: 'magazines',
  sermons: 'sermons',
  verses: 'memory_verses',
  resources: 'resources',
  growth: 'growth_materials',
  glc: 'glc_modules',
};

// Custom hook to fetch content from Supabase
export const useSupabaseContent = (contentType) => {
  const [content, setContent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        const tableName = contentTableMap[contentType];

        if (!tableName) {
          throw new Error(`Unknown content type: ${contentType}`);
        }

        const { data, error: fetchError } = await supabase
          .from(tableName)
          .select('*')
          .order('created_at', { ascending: false });

        if (fetchError) throw fetchError;
        setContent(data || []);
        setError(null);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err.message);
        setContent([]); // Fall back to empty array
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [contentType]);

  return { content, loading, error };
};

// Fallback dummy data for development/testing
export const getDummyData = (type) => {
  const dummy = {
    articles: [
      {
        id: 1,
        title: "Understanding the Foundations of Faith",
        author: "LCC Ministry",
        category: "Bible Study",
        description: "A comprehensive guide to the core beliefs and spiritual foundations of a Christian life.",
        image_url: "/images/bible_study.png",
        rating: 5,
        pages: "124 Pages"
      }
    ],
    magazines: [
      {
        id: 1,
        title: "Grace & Truth Magazine",
        author: "LCC Team",
        description: "Monthly publication featuring articles and inspiration",
        image_url: "/images/connect.png",
        content: "Latest updates from our ministry",
        created_at: new Date()
      }
    ],
    verses: [
      {
        id: 1,
        verse: "For God so loved the world that he gave his one and only Son...",
        reference: "John 3:16",
        explanation: "God's love is unconditional and sacrificial",
        created_at: new Date()
      }
    ]
  };

  return dummy[type] || [];
};
