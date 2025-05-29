
import { ArrowLeft, Play, Star, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const scienceLessons = [
  {
    id: 1,
    title: "Animals Around Us",
    description: "Learn about different animals and their homes!",
    duration: "14 min",
    difficulty: "Easy",
    completed: true,
    stars: 2,
    emoji: "🐘"
  },
  {
    id: 2,
    title: "Plants We Know",
    description: "Discover trees, flowers, and leaves!",
    duration: "16 min",
    difficulty: "Easy",
    completed: false,
    stars: 0,
    emoji: "🌱"
  },
  {
    id: 3,
    title: "Weather Fun",
    description: "Learn about sun, rain, and wind!",
    duration: "12 min",
    difficulty: "Easy",
    completed: false,
    stars: 0,
    emoji: "☀️"
  },
  {
    id: 4,
    title: "Simple Experiments",
    description: "Safe and fun science experiments!",
    duration: "20 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "🧪"
  },
  {
    id: 5,
    title: "Water Cycle Adventure",
    description: "Follow water's amazing journey!",
    duration: "18 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "💧"
  },
  {
    id: 6,
    title: "Space Exploration",
    description: "Blast off to learn about planets!",
    duration: "22 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "🚀"
  },
  {
    id: 7,
    title: "Our Amazing Body",
    description: "Discover how your body works!",
    duration: "19 min",
    difficulty: "Easy",
    completed: false,
    stars: 0,
    emoji: "🫀"
  },
  {
    id: 8,
    title: "Rocks and Minerals",
    description: "Explore Earth's treasures!",
    duration: "15 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "💎"
  }
];

const ScienceLessons = () => {
  const completedLessons = scienceLessons.filter(lesson => lesson.completed).length;
  const totalStars = scienceLessons.reduce((sum, lesson) => sum + lesson.stars, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-eduplay-purple to-eduplay-pink text-white py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 animate-scale-in">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4 animate-slide-in-right">
                <div className="text-6xl mr-4 animate-bounce-gentle">🔬</div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 animate-fade-in">Science Discoveries</h1>
                  <p className="text-xl opacity-90 animate-fade-in delay-300">Experiments, nature, and amazing discoveries!</p>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-white/20 rounded-2xl p-6 animate-scale-in delay-500">
              <div className="text-3xl font-bold animate-pulse">{completedLessons}/{scienceLessons.length}</div>
              <div className="text-sm opacity-90">Lessons Complete</div>
              <div className="flex items-center justify-center mt-2">
                <Star className="w-5 h-5 mr-1 text-yellow-300 animate-wiggle" />
                <span className="font-bold">{totalStars}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-0 playful-shadow animate-fade-in hover:shadow-xl transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Your Progress</h3>
              <Badge className="bg-eduplay-purple text-white animate-pulse">
                {Math.round((completedLessons / scienceLessons.length) * 100)}% Complete
              </Badge>
            </div>
            <Progress value={(completedLessons / scienceLessons.length) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {scienceLessons.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className="border-0 playful-shadow hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2 animate-bounce-gentle">{lesson.emoji}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 animate-pulse ${i < lesson.stars ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg animate-slide-in-right">{lesson.title}</CardTitle>
                <p className="text-sm text-gray-600 animate-fade-in delay-200">{lesson.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1 animate-wiggle" />
                    {lesson.duration}
                  </div>
                  <Badge variant={lesson.difficulty === 'Easy' ? 'secondary' : 'outline'} className="animate-scale-in">
                    {lesson.difficulty}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Link to={`/lesson/science/${lesson.id}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-eduplay-purple to-eduplay-pink hover:scale-105 transition-all duration-300"
                      disabled={lesson.id > 1 && !scienceLessons[lesson.id - 2]?.completed}
                    >
                      <Play className="w-4 h-4 mr-2 animate-pulse" />
                      {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                    </Button>
                  </Link>
                  
                  {lesson.completed && (
                    <Link to={`/quiz/science/${lesson.id}`}>
                      <Button variant="outline" className="w-full hover:scale-105 transition-all duration-300">
                        <Trophy className="w-4 h-4 mr-2 animate-bounce" />
                        Take Quiz
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScienceLessons;
