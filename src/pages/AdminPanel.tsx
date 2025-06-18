import React, { useEffect, useState } from 'react';
import { ArrowLeft, Upload, Users, BookOpen, BarChart, Settings, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '../lib/supabaseClient';

const AdminPanel = () => {
  // Content CRUD state
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newContent, setNewContent] = useState({
    title: '',
    subtitle: '',
    description: '',
    content_type: 'youtube',
    youtube_link: '',
    file_url: '',
    class: '',
    subject: '',
  });

  // Fetch contents
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('contents').select('*').order('created_at', { ascending: false });
      if (!error) setContents(data || []);
      setLoading(false);
    };
    fetchContents();
  }, []);

  // Add content
  const handleAddContent = async () => {
    const { error } = await supabase.from('contents').insert([newContent]);
    if (!error) {
      alert('নতুন কনটেন্ট যোগ হয়েছে!');
      setNewContent({ title: '', subtitle: '', description: '', content_type: 'youtube', youtube_link: '', file_url: '', class: '', subject: '' });
      // রিফ্রেশ
      const { data } = await supabase.from('contents').select('*').order('created_at', { ascending: false });
      setContents(data || []);
    }
  };

  // Delete content
  const handleDeleteContent = async (id: string) => {
    const { error } = await supabase.from('contents').delete().eq('id', id);
    if (!error) {
      alert('কনটেন্ট ডিলিট হয়েছে!');
      setContents(contents.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
              <p className="text-xl opacity-90">Manage EduPlay content and users</p>
            </div>
            
            <div className="text-center bg-white/20 rounded-2xl p-6">
              <Settings className="w-8 h-8 mx-auto mb-2" />
              <div className="font-bold">Admin Panel</div>
              <div className="text-sm opacity-90">Full Access</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Content Management</h2>
        {loading ? 'লোড হচ্ছে...' : (
          <ul className="mb-8 space-y-2">
            {contents.map(content => (
              <li key={content.id} className="flex items-center justify-between bg-gray-50 p-3 rounded shadow">
                <div>
                  <span className="font-semibold">{content.title}</span> <span className="text-xs text-gray-500">({content.subject}, {content.class})</span>
                </div>
                <button onClick={() => handleDeleteContent(content.id)} className="text-red-600 hover:underline">Delete</button>
              </li>
            ))}
          </ul>
        )}
        <div className="bg-white p-6 rounded shadow max-w-lg">
          <h3 className="text-lg font-bold mb-4">নতুন কনটেন্ট যোগ করুন</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <input className="border p-2 rounded" placeholder="Title" value={newContent.title} onChange={e => setNewContent({ ...newContent, title: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Subtitle" value={newContent.subtitle} onChange={e => setNewContent({ ...newContent, subtitle: e.target.value })} />
            <input className="border p-2 rounded col-span-2" placeholder="Description" value={newContent.description} onChange={e => setNewContent({ ...newContent, description: e.target.value })} />
            <select className="border p-2 rounded" value={newContent.content_type} onChange={e => setNewContent({ ...newContent, content_type: e.target.value })}>
              <option value="youtube">YouTube</option>
              <option value="image">Image</option>
              <option value="video">Video</option>
            </select>
            <input className="border p-2 rounded" placeholder="YouTube Link" value={newContent.youtube_link} onChange={e => setNewContent({ ...newContent, youtube_link: e.target.value })} />
            <input className="border p-2 rounded" placeholder="File URL" value={newContent.file_url} onChange={e => setNewContent({ ...newContent, file_url: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Class (e.g. 1st)" value={newContent.class} onChange={e => setNewContent({ ...newContent, class: e.target.value })} />
            <input className="border p-2 rounded" placeholder="Subject (e.g. math)" value={newContent.subject} onChange={e => setNewContent({ ...newContent, subject: e.target.value })} />
          </div>
          <button onClick={handleAddContent} className="bg-blue-600 text-white px-4 py-2 rounded font-semibold">Add Content</button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
