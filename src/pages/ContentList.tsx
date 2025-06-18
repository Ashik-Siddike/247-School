import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

interface ContentItem {
  id: string;
  title: string;
  class: string;
  subject: string;
}

const ContentList: React.FC<{ className?: string; subject?: string }> = ({ className, subject }) => {
  const [contents, setContents] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      setError(null);
      let query = supabase.from('contents').select('id, title, class, subject');
      if (className) query = query.eq('class', className);
      if (subject) query = query.eq('subject', subject);
      const { data, error } = await query;
      if (error) {
        setError('ডেটা লোড করা যায়নি');
        setLoading(false);
        return;
      }
      setContents(data || []);
      setLoading(false);
    };
    fetchContents();
  }, [className, subject]);

  if (loading) return <div className="text-center py-8">লোড হচ্ছে...</div>;
  if (error) return <div className="text-red-600 text-center py-8">{error}</div>;
  if (contents.length === 0) return <div className="text-center py-8">কোনো কনটেন্ট পাওয়া যায়নি</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">কনটেন্ট লিস্ট</h1>
      <ul className="divide-y divide-gray-200">
        {contents.map(content => (
          <li key={content.id}>
            <Link
              to={`/content/${content.id}`}
              className="block p-4 hover:bg-gray-50 transition rounded"
            >
              <div className="font-semibold text-lg">{content.title}</div>
              <div className="text-sm text-gray-500">ক্লাস: {content.class} | বিষয়: {content.subject}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContentList; 