import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen, Beaker, Globe, ArrowRight, ChevronLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

const subjectMap: Record<string, string> = {
  'basic-math': 'math',
  'english-basics': 'english',
  'bangla-basics': 'bangla',
  'mathematics': 'math',
  'english': 'english',
  'bangla': 'bangla',
  'science': 'science',
  // প্রয়োজনে আরও ম্যাপিং যোগ করুন
};

// ক্লাস নাম ম্যাপিং (route param -> grade name)
const gradeNameMap: Record<string, string> = {
  '1st': 'Grade 1',
  '2nd': 'Grade 2',
  '3rd': 'Grade 3',
  '4th': 'Grade 4',
  '5th': 'Grade 5',
  'nursery': 'Nursery',
};

const ClassSelection = () => {
  const { standard } = useParams();
  const navigate = useNavigate();
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      // route param থেকে grade name বের করুন
      const gradeName = gradeNameMap[standard || ''] || (standard ? standard.charAt(0).toUpperCase() + standard.slice(1) : 'Grade 5');
      // grade name দিয়ে grade id বের করুন
      const { data: grades } = await supabase.from('grades').select('*').eq('name', gradeName).single();
      if (grades && grades.id) {
        const { data: subjectsData } = await supabase.from('subjects').select('*').eq('grade_id', grades.id);
        setSubjects(subjectsData || []);
      } else {
        setSubjects([]);
      }
      setLoading(false);
    };
    fetchSubjects();
  }, [standard]);

  const standardName = standard ? `${standard} Standard` : '5th Standard';

  const handleSubjectClick = (subjectId: string) => {
    const mappedSubject = subjectMap[subjectId] || subjectId;
    navigate(`/lessons/${mappedSubject}?class=${standard}`);
  };

  const getColorForIndex = (index: number) => {
    const colors = [
      'bg-gradient-to-br from-blue-100 to-purple-100',
      'bg-gradient-to-br from-green-100 to-blue-100',
      'bg-gradient-to-br from-orange-100 to-pink-100',
      'bg-gradient-to-br from-purple-100 to-pink-100',
      'bg-gradient-to-br from-yellow-100 to-orange-100',
      'bg-gradient-to-br from-pink-100 to-red-100',
    ];
    return colors[index % colors.length];
  };

  const getButtonColorForIndex = (index: number) => {
    const colors = [
      'bg-gradient-to-r from-blue-500 to-purple-600',
      'bg-gradient-to-r from-green-500 to-blue-600',
      'bg-gradient-to-r from-orange-500 to-pink-600',
      'bg-gradient-to-r from-purple-500 to-pink-600',
      'bg-gradient-to-r from-yellow-500 to-orange-600',
      'bg-gradient-to-r from-pink-500 to-red-600',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50/30 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 text-eduplay-purple hover:bg-eduplay-purple/10"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Button>
        </div>

        <div className="text-center mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue bg-clip-text text-transparent">
              {standardName}
            </span> Subjects
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-150">
            Choose a subject to start your learning journey! Each subject is designed specifically for your grade level.
          </p>
        </div>

        {loading ? (
          <div className="text-center text-lg">লোড হচ্ছে...</div>
        ) : subjects.length === 0 ? (
          <div className="text-center text-lg text-red-500">এই ক্লাসের জন্য কোনো বিষয় পাওয়া যায়নি।</div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {subjects.map((subject, index) => (
              <Card
                key={subject.id}
                className={`${getColorForIndex(index)} border-0 playful-shadow subject-card cursor-pointer animate-fade-in hover:scale-105 transition-all duration-300`}
                style={{ animationDelay: `${index * 150}ms` }}
                onClick={() => handleSubjectClick(subject.name.toLowerCase())}
              >
                <CardHeader className="text-center pb-4">
                  <div className="text-6xl mb-4 animate-bounce-gentle">📚</div>
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                    {subject.name}
                  </CardTitle>
                  {/* সাবজেক্টে description ফিল্ড থাকলে দেখান */}
                  {subject.description && <p className="text-gray-600 text-sm lg:text-base">{subject.description}</p>}
                </CardHeader>
                <CardContent className="pt-0">
                  <Button 
                    className={`w-full ${getButtonColorForIndex(index)} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base lg:text-lg py-3`}
                    onClick={e => {
                      e.stopPropagation();
                      handleSubjectClick(subject.name.toLowerCase());
                    }}
                  >
                    Start Learning
                    <ArrowRight className="w-4 h-4 ml-2 animate-pulse" />
                  </Button>
                  <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                      Grade {standard}
                    </span>
                    <span className="flex items-center">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse"></span>
                      Interactive
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-12 lg:mt-16">
          <div className="bg-white rounded-2xl p-8 playful-shadow max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Need Help Choosing?
            </h2>
            <p className="text-gray-600 mb-6">
              All subjects are designed to match your current grade level. Start with any subject that interests you most!
            </p>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => navigate('/dashboard')}
              className="border-2 border-eduplay-purple text-eduplay-purple hover:bg-eduplay-purple hover:text-white text-lg px-8 py-4 rounded-2xl transition-all duration-300 hover:scale-105"
            >
              View Your Progress
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassSelection;
