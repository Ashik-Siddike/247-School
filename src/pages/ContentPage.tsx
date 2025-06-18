import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Star, Sparkles } from 'lucide-react';

interface PageData {
  title: string;
  description: string;
  content_type: 'youtube' | 'image' | 'video';
  youtube_link?: string;
  file_url?: string;
}

interface ContentData {
  pages: PageData[];
}

const funEmojis = ['🎉', '🌟', '🚀', '✨', '🎈', '🦄', '😺', '🐻', '🐥', '🦋', '🍭', '🍀'];

const ContentPage: React.FC<{ contentId: string }> = ({ contentId }) => {
  const [content, setContent] = useState<ContentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageIdx, setPageIdx] = useState(0);

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('contents')
        .select('pages')
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

  if (loading) return <div className="flex justify-center items-center h-64 text-3xl animate-bounce">লোড হচ্ছে... 🦄</div>;
  if (error) return <div className="text-red-600 text-center mt-8 text-2xl">{error} 😿</div>;
  if (!content || !content.pages || content.pages.length === 0) return <div className="text-center mt-8 text-xl">কোনো কনটেন্ট পাওয়া যায়নি 😕</div>;

  const page = content.pages[pageIdx];
  const progress = ((pageIdx + 1) / content.pages.length) * 100;
  const emoji = funEmojis[pageIdx % funEmojis.length];

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-lg font-bold text-eduplay-purple">অগ্রগতি</span>
            <span className="text-sm font-semibold">{pageIdx + 1} / {content.pages.length}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        {/* Card */}
        <div className="relative bg-white rounded-3xl shadow-2xl p-4 md:p-12 mb-8 border-4 border-eduplay-purple/20 animate-fade-in">
          {/* Fun emoji confetti */}
          <div className="absolute -top-8 left-4 text-4xl animate-bounce-gentle select-none">{emoji}</div>
          <div className="absolute -top-8 right-4 text-3xl animate-spin-slow select-none">✨</div>
          <div className="absolute -bottom-8 left-8 text-3xl animate-bounce select-none">🌟</div>
          <div className="absolute -bottom-8 right-8 text-4xl animate-bounce-gentle select-none">🎈</div>
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold text-center text-eduplay-purple mb-3 drop-shadow-lg flex items-center justify-center gap-2">
            {page.title} <span className="text-3xl">{emoji}</span>
          </h1>
          {/* Description */}
          <section className="mb-6 bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50 rounded-xl p-4 shadow-inner min-h-[80px] border-2 border-eduplay-blue/10">
            <p className="text-lg md:text-xl text-gray-700 font-semibold whitespace-pre-line text-center">
              {page.description}
            </p>
          </section>
          {/* Media */}
          <section className="w-full flex justify-center items-center mb-2">
            {page.content_type === 'youtube' && page.youtube_link && (
              <div className="w-full aspect-video rounded-2xl overflow-hidden border-4 border-eduplay-blue/30 shadow-lg min-h-[220px]">
                <iframe
                  title="YouTube Video"
                  src={`https://www.youtube.com/embed/${extractYouTubeId(page.youtube_link)}`}
                  className="w-full h-full min-h-[220px]"
                  allowFullScreen
                  style={{ minHeight: 220 }}
                />
              </div>
            )}
            {page.content_type === 'image' && page.file_url && (
              <img
                src={page.file_url}
                alt={page.title}
                className="w-full max-h-[500px] object-contain rounded-2xl border-4 border-eduplay-blue/30 shadow-lg bg-white"
                style={{ minHeight: 220 }}
                onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
              />
            )}
            {page.content_type === 'video' && page.file_url && (
              <video
                src={page.file_url}
                controls
                className="w-full max-h-[500px] rounded-2xl border-4 border-eduplay-blue/30 shadow-lg bg-black"
                style={{ minHeight: 220 }}
              >
                আপনার ব্রাউজার ভিডিও প্লে করতে পারে না।
              </video>
            )}
          </section>
        </div>
        {/* Navigation */}
        <div className="flex justify-between items-center gap-4 mt-2">
          <Button
            variant="secondary"
            size="lg"
            className={`rounded-full px-6 py-3 text-xl font-bold bg-gradient-to-r from-eduplay-blue to-eduplay-purple text-white shadow-lg hover:scale-105 transition-all duration-200 ${pageIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setPageIdx(idx => Math.max(0, idx - 1))}
            disabled={pageIdx === 0}
          >
            <ArrowLeft className="w-6 h-6 mr-2" /> আগের পেজ
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={`rounded-full px-6 py-3 text-xl font-bold bg-gradient-to-r from-eduplay-purple to-eduplay-blue text-white shadow-lg hover:scale-105 transition-all duration-200 ${pageIdx === content.pages.length - 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => setPageIdx(idx => Math.min(content.pages.length - 1, idx + 1))}
            disabled={pageIdx === content.pages.length - 1}
          >
            পরের পেজ <ArrowRight className="w-6 h-6 ml-2" />
          </Button>
        </div>
      </div>
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