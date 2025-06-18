import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface ContentData {
  title: string;
  subtitle: string;
  description: string;
  content_type: 'youtube' | 'image' | 'video';
  youtube_link?: string;
  file_url?: string;
}

const ContentPage: React.FC<{ contentId: string }> = ({ contentId }) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('contents')
        .select('*')
        .eq('id', contentId)
        .single();
      if (error) {
        setError('ডেটা লোড করা যায়নি');
        setLoading(false);
        return;
      }
      setContent(data as ContentData);
      setLoading(false);
    };
    fetchContent();
  }, [contentId]);

  if (loading) return <div className="flex justify-center items-center h-64">লোড হচ্ছে...</div>;
  if (error) return <div className="text-red-600 text-center mt-8">{error}</div>;
  if (!content) return <div className="text-center mt-8">কোনো কনটেন্ট পাওয়া যায়নি</div>;

  return (
    <main className="max-w-2xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">{content.title}</h1>
      <h2 className="text-xl md:text-2xl text-gray-600 mb-4 text-center">{content.subtitle}</h2>
      <section className="mb-6 bg-gray-50 rounded-lg p-4 shadow-sm min-h-[80px]">
        <p className="text-base md:text-lg whitespace-pre-line">{content.description}</p>
      </section>
      <section className="w-full flex justify-center items-center">
        {content.content_type === 'youtube' && content.youtube_link && (
          <iframe
            title="YouTube Video"
            src={`https://www.youtube.com/embed/${extractYouTubeId(content.youtube_link)}`}
            className="w-full aspect-video rounded-lg border"
            allowFullScreen
          />
        )}
        {content.content_type === 'image' && content.file_url && (
          <img
            src={content.file_url}
            alt={content.title}
            className="w-full max-h-[400px] object-contain rounded-lg border"
          />
        )}
        {content.content_type === 'video' && content.file_url && (
          <video
            src={content.file_url}
            controls
            className="w-full max-h-[400px] rounded-lg border bg-black"
          >
            আপনার ব্রাউজার ভিডিও প্লে করতে পারে না।
          </video>
        )}
      </section>
    </main>
  );
};

// ইউটিউব লিংক থেকে ভিডিও আইডি বের করার হেল্পার
function extractYouTubeId(url?: string) {
  if (!url) return '';
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1].length === 11 ? match[1] : '';
}

export default ContentPage; 