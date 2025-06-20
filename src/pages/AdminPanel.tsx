import React, { useEffect, useState } from 'react';
import { Plus, Trash2, ArrowLeft, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { supabase } from '../lib/supabaseClient';
import { useForm, FormProvider, useFieldArray, FieldErrors } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod Schema
const pageSchema = z.object({
  title: z.string().min(1, 'পেজের শিরোনাম দিন'),
  description: z.string().min(1, 'পেজের বর্ণনা দিন'),
  content_type: z.enum(['youtube', 'image', 'video']),
  youtube_link: z.string().optional(),
  file_url: z.string().optional(),
});

const contentSchema = z.object({
  grade_id: z.number({ required_error: 'ক্লাস নির্বাচন করুন' }),
  subject_id: z.number({ required_error: 'বিষয় নির্বাচন করুন' }),
  title: z.string().min(1, 'শিরোনাম দিন'),
  description: z.string().min(1, 'বর্ণনা দিন'),
  content_type: z.enum(['youtube', 'image', 'video']),
  youtube_link: z.string().optional(),
  file_url: z.string().optional(),
});

type PageForm = z.infer<typeof pageSchema>;
type ContentForm = z.infer<typeof contentSchema>;

// ক্লাস নাম ম্যাপিং
const classMap: Record<string, string> = {
  'Nursery': 'nursery',
  'Grade 1': '1st',
  'Grade 2': '2nd',
  'Grade 3': '3rd',
  'Grade 4': '4th',
  'Grade 5': '5th',
};

const AdminPanel = () => {
  // Content CRUD state
  const [contents, setContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<{ id: number; name: string }[]>([]);
  const [subjects, setSubjects] = useState<{ id: number; name: string; grade_id: number }[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<{ id: number; name: string; grade_id: number }[]>([]);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [showSubjectModal, setShowSubjectModal] = useState(false);
  const [newGrade, setNewGrade] = useState('');
  const [newSubject, setNewSubject] = useState('');
  const [modalGradeId, setModalGradeId] = useState<number | null>(null);

  // React Hook Form
  const methods = useForm<ContentForm>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      grade_id: undefined,
      subject_id: undefined,
      title: '',
      description: '',
      content_type: 'youtube',
      youtube_link: '',
      file_url: '',
    },
  });
  const { register, handleSubmit, watch, setValue, reset, control, formState: { errors } } = methods;

  // Fetch grades & subjects
  useEffect(() => {
    const fetchGrades = async () => {
      const { data } = await supabase.from('grades').select('*').order('name');
      setGrades(data || []);
    };
    const fetchSubjects = async () => {
      const { data } = await supabase.from('subjects').select('*');
      setSubjects(data || []);
    };
    fetchGrades();
    fetchSubjects();
  }, []);

  // নতুন useEffect: কন্টেন্ট লোড
  useEffect(() => {
    const fetchContents = async () => {
      setLoading(true);
      const { data, error } = await supabase.from('contents').select('*').order('created_at', { ascending: false });
      setContents(data || []);
      setLoading(false);
    };
    fetchContents();
  }, []);

  // Filter subjects by selected grade
  const selectedGradeId = watch('grade_id');
  useEffect(() => {
    if (selectedGradeId) {
      setFilteredSubjects(subjects.filter(s => s.grade_id === selectedGradeId));
      setValue('subject_id', undefined);
    } else {
      setFilteredSubjects([]);
      setValue('subject_id', undefined);
    }
  }, [selectedGradeId, subjects, setValue]);

  // Refresh grades/subjects after add
  const refreshGrades = async () => {
    const { data } = await supabase.from('grades').select('*').order('name');
    setGrades(data || []);
  };
  const refreshSubjects = async () => {
    const { data } = await supabase.from('subjects').select('*');
    setSubjects(data || []);
  };

  // Add new grade
  const handleAddGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGrade.trim()) return;
    await supabase.from('grades').insert({ name: newGrade.trim() });
    setNewGrade('');
    setShowGradeModal(false);
    await refreshGrades();
    // নতুন গ্রেড সিলেক্ট করুন
    const { data } = await supabase.from('grades').select('*').eq('name', newGrade.trim()).single();
    if (data) setValue('grade_id', data.id);
  };
  // Add new subject
  const handleAddSubject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubject.trim() || !modalGradeId) return;
    await supabase.from('subjects').insert({ name: newSubject.trim(), grade_id: modalGradeId });
    setNewSubject('');
    setShowSubjectModal(false);
    await refreshSubjects();
    // নতুন সাবজেক্ট সিলেক্ট করুন
    const { data } = await supabase.from('subjects').select('*').eq('name', newSubject.trim()).eq('grade_id', modalGradeId).single();
    if (data) setValue('subject_id', data.id);
  };

  // Add content
  const onSubmit = async (values: ContentForm) => {
    const { grade_id, subject_id, title, description, content_type, youtube_link, file_url } = values;
    const gradeName = grades.find(g => g.id === grade_id)?.name || '';
    const subjectName = (filteredSubjects.find(s => s.id === subject_id)?.name || '').toLowerCase();
    const classValue = classMap[gradeName] || gradeName;
    const { error } = await supabase.from('contents').insert([
      {
        class: classValue,
        subject: subjectName,
        pages: [{ title, description, content_type, youtube_link, file_url }],
        title,
        description,
        content_type,
        youtube_link,
        file_url
      }
    ]);
    if (!error) {
      alert('নতুন কনটেন্ট যোগ হয়েছে!');
      reset({
        grade_id: undefined,
        subject_id: undefined,
        title: '',
        description: '',
        content_type: 'youtube',
        youtube_link: '',
        file_url: '',
      });
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-8 shadow-md">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-4 h-4 mr-2" /> Home
              </Button>
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="font-semibold text-lg">EduPlay Admin</span>
              <span className="text-xs opacity-80">Full Access</span>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
              <Settings className="w-7 h-7 text-white" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Content List */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Content Management</h2>
          </div>
          {loading ? (
            <div className="text-center py-8 text-lg">লোড হচ্ছে...</div>
          ) : (
            <div className="bg-white rounded-xl shadow border border-gray-200 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                    <th className="px-4 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {contents.map(content => (
                    <tr key={content.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3 font-medium text-gray-900">{content.title}</td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full">{content.subject}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block bg-purple-100 text-purple-700 text-xs font-bold px-3 py-1 rounded-full">{content.class}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button onClick={() => handleDeleteContent(content.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition" title="Delete">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Divider */}
        <div className="border-t border-gray-200 my-10" />

        {/* Content Form */}
        <section className="max-w-2xl mx-auto bg-white rounded-xl shadow border border-gray-200 p-8">
          <h3 className="text-xl font-bold mb-6">নতুন কনটেন্ট যোগ করুন</h3>
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <Label htmlFor="title" className="font-semibold mb-1">Title</Label>
                <input id="title" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Title" {...register('title')} />
                {errors.title && <div className="text-red-500 text-xs mt-1">{errors.title.message}</div>}
              </div>
              <div className="col-span-2">
                <Label htmlFor="description" className="font-semibold mb-1">Description</Label>
                <textarea
                  id="description"
                  className="border border-gray-300 p-2 rounded w-full resize-none overflow-hidden focus:ring-2 focus:ring-blue-200"
                  placeholder="Description"
                  {...register('description')}
                  rows={2}
                  onInput={e => {
                    const target = e.target as HTMLTextAreaElement;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                  }}
                />
                {errors.description && <div className="text-red-500 text-xs mt-1">{errors.description.message}</div>}
              </div>
              <div>
                <Label htmlFor="content_type" className="font-semibold mb-1">Content Type</Label>
                <select id="content_type" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('content_type')}>
                  <option value="youtube">YouTube</option>
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <Label htmlFor="youtube_link" className="font-semibold mb-1">YouTube Link</Label>
                <input id="youtube_link" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="YouTube Link" {...register('youtube_link')} />
              </div>
              <div className="col-span-2">
                <Label htmlFor="file_url" className="font-semibold mb-1">File URL</Label>
                <input id="file_url" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="File URL" {...register('file_url')} />
              </div>
              {/* Grade Dropdown */}
              <div className="col-span-1 flex items-center gap-2">
                <Label htmlFor="grade_id" className="font-semibold mb-1">Grade</Label>
                <select id="grade_id" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('grade_id', { valueAsNumber: true })}>
                  <option value="">ক্লাস নির্বাচন করুন</option>
                  {grades.map(g => (
                    <option key={g.id} value={g.id}>{g.name}</option>
                  ))}
                </select>
                <Button type="button" size="icon" variant="outline" onClick={() => setShowGradeModal(true)}><Plus className="w-4 h-4" /></Button>
              </div>
              {/* Subject Dropdown */}
              <div className="col-span-1 flex items-center gap-2">
                <Label htmlFor="subject_id" className="font-semibold mb-1">Subject</Label>
                <select id="subject_id" className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" {...register('subject_id', { valueAsNumber: true })} disabled={!selectedGradeId}>
                  <option value="">বিষয় নির্বাচন করুন</option>
                  {filteredSubjects.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                <Button type="button" size="icon" variant="outline" onClick={() => { setModalGradeId(selectedGradeId); setShowSubjectModal(true); }} disabled={!selectedGradeId}><Plus className="w-4 h-4" /></Button>
              </div>
              <div className="col-span-2 mt-4">
                <Button type="submit" className="bg-blue-600 text-white w-full py-3 text-lg font-bold rounded-lg shadow hover:bg-blue-700 transition">Add Content</Button>
              </div>
            </form>
          </FormProvider>
        </section>

        {/* Grade Modal */}
        {showGradeModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
              <h4 className="font-bold mb-4 text-lg">নতুন ক্লাস যোগ করুন</h4>
              <form onSubmit={handleAddGrade} className="flex gap-2">
                <input className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Grade Name" value={newGrade} onChange={e => setNewGrade(e.target.value)} />
                <Button type="submit" className="bg-blue-600 text-white">Add</Button>
              </form>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowGradeModal(false)}>Cancel</Button>
            </div>
          </div>
        )}
        {/* Subject Modal */}
        {showSubjectModal && (
          <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-200">
              <h4 className="font-bold mb-4 text-lg">নতুন বিষয় যোগ করুন</h4>
              <form onSubmit={handleAddSubject} className="flex gap-2">
                <input className="border border-gray-300 p-2 rounded w-full focus:ring-2 focus:ring-blue-200" placeholder="Subject Name" value={newSubject} onChange={e => setNewSubject(e.target.value)} />
                <Button type="submit" className="bg-blue-600 text-white">Add</Button>
              </form>
              <Button variant="ghost" className="mt-4 w-full" onClick={() => setShowSubjectModal(false)}>Cancel</Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPanel;
