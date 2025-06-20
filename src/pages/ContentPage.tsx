import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, Star, Sparkles } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

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
  const [allContents, setAllContents] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(-1);
  const navigate = useNavigate();
  const location = useLocation();

  // ক্লাস ও সাবজেক্ট URL থেকে বের করি
  const params = new URLSearchParams(location.search);
  const className = params.get('class') || undefined;
  const subject = params.get('subject') || undefined;

  // কনটেন্ট লোড
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

  // একই ক্লাস ও সাবজেক্টের সব কনটেন্ট লোড
  useEffect(() => {
    if (!className || !subject) return;
    const fetchAll = async () => {
      const { data } = await supabase
        .from('contents')
        .select('id, title')
        .eq('class', className)
        .eq('subject', subject)
        .order('created_at', { ascending: false });
      setAllContents(data || []);
    };
    fetchAll();
  }, [className, subject]);

  // কারেন্ট ইনডেক্স বের করি
  useEffect(() => {
    if (!allContents.length) return;
    const idx = allContents.findIndex(c => c.id === contentId);
    setCurrentIdx(idx);
  }, [allContents, contentId]);

  if (loading) return <div className="flex justify-center items-center h-64 text-3xl animate-bounce">লোড হচ্ছে... 🦄</div>;
  if (error) return <div className="text-red-600 text-center mt-8 text-2xl">{error} 😿</div>;
  if (!content || !content.pages || content.pages.length === 0) return <div className="text-center mt-8 text-xl">কোনো কনটেন্ট পাওয়া যায়নি 😕</div>;

  // এখন শুধু ১টি পেজ
  const page = content.pages[0];
  const emoji = funEmojis[0];

  // আগের/পরের কনটেন্ট আইডি
  const prevId = currentIdx > 0 ? allContents[currentIdx - 1]?.id : null;
  const nextId = currentIdx < allContents.length - 1 ? allContents[currentIdx + 1]?.id : null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-yellow-100 flex flex-col items-center py-8 px-2">
      <div className="w-full max-w-4xl mx-auto">
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
            className={`rounded-full px-6 py-3 text-xl font-bold bg-gradient-to-r from-eduplay-blue to-eduplay-purple text-white shadow-lg hover:scale-105 transition-all duration-200 ${!prevId ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => prevId && navigate(`/content/${prevId}?class=${className}&subject=${subject}`)}
            disabled={!prevId}
          >
            <ArrowLeft className="w-6 h-6 mr-2" /> আগের কনটেন্ট
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className={`rounded-full px-6 py-3 text-xl font-bold bg-gradient-to-r from-eduplay-purple to-eduplay-blue text-white shadow-lg hover:scale-105 transition-all duration-200 ${!nextId ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={() => nextId && navigate(`/content/${nextId}?class=${className}&subject=${subject}`)}
            disabled={!nextId}
          >
            পরের কনটেন্ট <ArrowRight className="w-6 h-6 ml-2" />
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