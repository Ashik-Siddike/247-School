
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calculator, BookOpen, Beaker, Globe, ArrowRight, ChevronLeft } from 'lucide-react';

const subjectsByClass = {
  '1st': [
    { id: 'basic-math', title: 'Basic Math', description: 'Numbers, counting, and simple addition!', icon: Calculator, emoji: '🔢' },
    { id: 'english-basics', title: 'English Basics', description: 'Letters, words, and simple sentences!', icon: BookOpen, emoji: '📚' },
    { id: 'bangla-basics', title: 'বাংলা বেসিক', description: 'বর্ণমালা এবং সহজ শব্দ!', icon: Globe, emoji: '🇧🇩' },
  ],
  '5th': [
    { id: 'mathematics', title: 'Mathematics', description: 'Fractions, decimals, and geometry!', icon: Calculator, emoji: '🔢' },
    { id: 'english', title: 'English', description: 'Grammar, comprehension, and writing!', icon: BookOpen, emoji: '📚' },
    { id: 'bangla', title: 'বাংলা', description: 'ব্যাকরণ এবং রচনা!', icon: Globe, emoji: '🇧🇩' },
    { id: 'science', title: 'Science', description: 'Plants, animals, and basic experiments!', icon: Beaker, emoji: '🔬' },
  ],
  '8th': [
    { id: 'mathematics', title: 'Mathematics', description: 'Algebra, geometry, and statistics!', icon: Calculator, emoji: '🔢' },
    { id: 'english', title: 'English Literature', description: 'Poetry, stories, and essay writing!', icon: BookOpen, emoji: '📚' },
    { id: 'bangla', title: 'বাংলা সাহিত্য', description: 'কবিতা এবং গদ্য!', icon: Globe, emoji: '🇧🇩' },
    { id: 'science', title: 'General Science', description: 'Physics, chemistry, and biology basics!', icon: Beaker, emoji: '🔬' },
  ],
  '10th': [
    { id: 'mathematics', title: 'Mathematics', description: 'Advanced algebra, trigonometry, and calculus!', icon: Calculator, emoji: '🔢' },
    { id: 'english', title: 'English', description: 'Advanced grammar and literature analysis!', icon: BookOpen, emoji: '📚' },
    { id: 'bangla', title: 'বাংলা', description: 'উন্নত সাহিত্য এবং ব্যাকরণ!', icon: Globe, emoji: '🇧🇩' },
    { id: 'physics', title: 'Physics', description: 'Mechanics, electricity, and magnetism!', icon: Beaker, emoji: '⚡' },
    { id: 'chemistry', title: 'Chemistry', description: 'Organic and inorganic chemistry!', icon: Beaker, emoji: '🧪' },
    { id: 'biology', title: 'Biology', description: 'Human body, genetics, and ecology!', icon: Beaker, emoji: '🧬' },
  ]
};

const ClassSelection = () => {
  const { standard } = useParams();
  const navigate = useNavigate();
  
  const subjects = subjectsByClass[standard as keyof typeof subjectsByClass] || subjectsByClass['5th'];
  const standardName = standard ? `${standard} Standard` : '5th Standard';

  const handleSubjectClick = (subjectId: string) => {
    navigate(`/lessons/${subjectId}?class=${standard}`);
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {subjects.map((subject, index) => (
            <Card
              key={subject.id}
              className={`${getColorForIndex(index)} border-0 playful-shadow subject-card cursor-pointer animate-fade-in hover:scale-105 transition-all duration-300`}
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => handleSubjectClick(subject.id)}
            >
              <CardHeader className="text-center pb-4">
                <div className="text-6xl mb-4 animate-bounce-gentle">{subject.emoji}</div>
                <CardTitle className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">
                  {subject.title}
                </CardTitle>
                <p className="text-gray-600 text-sm lg:text-base">{subject.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <Button 
                  className={`w-full ${getButtonColorForIndex(index)} text-white hover:shadow-lg transform hover:scale-105 transition-all duration-300 text-base lg:text-lg py-3`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubjectClick(subject.id);
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
