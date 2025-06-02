
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap } from 'lucide-react';

const ClassSelector = () => {
  const navigate = useNavigate();

  const standards = [
    { value: '1st', label: '1st', age: '6-7 years', color: 'bg-gradient-to-br from-red-200 to-red-300', border: 'border-red-300', hover: 'hover:from-red-300 hover:to-red-400' },
    { value: '2nd', label: '2nd', age: '7-8 years', color: 'bg-gradient-to-br from-orange-200 to-orange-300', border: 'border-orange-300', hover: 'hover:from-orange-300 hover:to-orange-400' },
    { value: '3rd', label: '3rd', age: '8-9 years', color: 'bg-gradient-to-br from-yellow-200 to-yellow-300', border: 'border-yellow-300', hover: 'hover:from-yellow-300 hover:to-yellow-400' },
    { value: '4th', label: '4th', age: '9-10 years', color: 'bg-gradient-to-br from-green-200 to-green-300', border: 'border-green-300', hover: 'hover:from-green-300 hover:to-green-400' },
    { value: '5th', label: '5th', age: '10-11 years', color: 'bg-gradient-to-br from-blue-200 to-blue-300', border: 'border-blue-300', hover: 'hover:from-blue-300 hover:to-blue-400' },
    { value: '6th', label: '6th', age: '11-12 years', color: 'bg-gradient-to-br from-indigo-200 to-indigo-300', border: 'border-indigo-300', hover: 'hover:from-indigo-300 hover:to-indigo-400' },
    { value: '7th', label: '7th', age: '12-13 years', color: 'bg-gradient-to-br from-purple-200 to-purple-300', border: 'border-purple-300', hover: 'hover:from-purple-300 hover:to-purple-400' },
    { value: '8th', label: '8th', age: '13-14 years', color: 'bg-gradient-to-br from-pink-200 to-pink-300', border: 'border-pink-300', hover: 'hover:from-pink-300 hover:to-pink-400' },
    { value: '9th', label: '9th', age: '14-15 years', color: 'bg-gradient-to-br from-teal-200 to-teal-300', border: 'border-teal-300', hover: 'hover:from-teal-300 hover:to-teal-400' },
    { value: '10th', label: '10th', age: '15-16 years', color: 'bg-gradient-to-br from-cyan-200 to-cyan-300', border: 'border-cyan-300', hover: 'hover:from-cyan-300 hover:to-cyan-400' },
  ];

  const handleGradeSelect = (gradeValue: string) => {
    navigate(`/class/${gradeValue}`);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-purple-50/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4 animate-fade-in">
            Choose Your <span className="bg-gradient-to-r from-eduplay-purple to-eduplay-blue bg-clip-text text-transparent">Learning Level</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in delay-150">
            Select your current grade to access curriculum designed specifically for your level
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto mb-12">
          {standards.map((standard, index) => (
            <div 
              key={standard.value} 
              className={`grade-${standard.value.replace('st', '').replace('nd', '').replace('rd', '').replace('th', '')}`}
            >
              <Card
                className={`${standard.color} ${standard.border} ${standard.hover} border-2 playful-shadow cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleGradeSelect(standard.value)}
                role="button"
                tabIndex={0}
                aria-label={`Select ${standard.label} Grade for students aged ${standard.age}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleGradeSelect(standard.value);
                  }
                }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-white/80 rounded-full flex items-center justify-center mx-auto mb-3">
                    <GraduationCap className="w-6 h-6 text-gray-700" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">
                    Grade {standard.label}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium">
                    {standard.age}
                  </p>
                  <div className="mt-3">
                    <span className="inline-block w-2 h-2 bg-white/80 rounded-full animate-pulse"></span>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="bg-white rounded-2xl p-8 playful-shadow max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Ready to Start Learning?
            </h3>
            <p className="text-gray-600 mb-6">
              Choose any grade above to explore subjects and lessons designed just for that level!
            </p>
            <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
                Interactive Lessons
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-400 rounded-full mr-2 animate-pulse"></span>
                Fun Activities
              </span>
              <span className="flex items-center">
                <span className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></span>
                Progress Tracking
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClassSelector;
