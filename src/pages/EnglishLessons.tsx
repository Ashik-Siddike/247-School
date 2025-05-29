
import { ArrowLeft, Play, Star, Trophy, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

const englishLessons = [
  {
    id: 1,
    title: "ABC Letters",
    description: "Learn the alphabet with fun songs and animations!",
    duration: "12 min",
    difficulty: "Easy",
    completed: true,
    stars: 3,
    emoji: "🔤"
  },
  {
    id: 2,
    title: "Simple Words",
    description: "Build your first words with pictures!",
    duration: "15 min",
    difficulty: "Easy",
    completed: true,
    stars: 2,
    emoji: "📝"
  },
  {
    id: 3,
    title: "Reading Stories",
    description: "Read fun short stories with colorful pictures!",
    duration: "20 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "📚"
  },
  {
    id: 4,
    title: "Rhyming Words",
    description: "Discover words that sound alike!",
    duration: "10 min",
    difficulty: "Easy",
    completed: false,
    stars: 0,
    emoji: "🎵"
  },
  {
    id: 5,
    title: "Grammar Basics",
    description: "Learn about nouns, verbs, and adjectives!",
    duration: "18 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "📖"
  },
  {
    id: 6,
    title: "Spelling Bee",
    description: "Practice spelling common words!",
    duration: "15 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "🐝"
  },
  {
    id: 7,
    title: "Story Writing",
    description: "Create your own amazing stories!",
    duration: "25 min",
    difficulty: "Hard",
    completed: false,
    stars: 0,
    emoji: "✍️"
  },
  {
    id: 8,
    title: "Poetry Fun",
    description: "Write and read beautiful poems!",
    duration: "20 min",
    difficulty: "Medium",
    completed: false,
    stars: 0,
    emoji: "🌟"
  },
  {
    id: 9,
    title: "Phonics Adventure",
    description: "Learn letter sounds and pronunciation!",
    duration: "16 min",
    difficulty: "Easy",
    completed: false,
    stars: 0,
    emoji: "🗣️"
  },
  {
    id: 10,
    title: "Reading Comprehension",
    description: "Understand what you read better!",
    duration: "22 min",
    difficulty: "Hard",
    completed: false,
    stars: 0,
    emoji: "🧠"
  }
];

const EnglishLessons = () => {
  const completedLessons = englishLessons.filter(lesson => lesson.completed).length;
  const totalStars = englishLessons.reduce((sum, lesson) => sum + lesson.stars, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-eduplay-green to-eduplay-blue text-white py-8 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="flex items-center mb-6">
            <Link to="/" className="mr-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 transition-all hover:scale-105">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center mb-4">
                <div className="text-6xl mr-4 animate-bounce-gentle">📖</div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 animate-slide-in-right">English Adventures</h1>
                  <p className="text-xl opacity-90 animate-fade-in delay-150">Stories, words, and grammar fun!</p>
                </div>
              </div>
            </div>
            
            <div className="text-center bg-white/20 rounded-2xl p-6 animate-scale-in">
              <div className="text-3xl font-bold">{completedLessons}/{englishLessons.length}</div>
              <div className="text-sm opacity-90">Lessons Complete</div>
              <div className="flex items-center justify-center mt-2">
                <Star className="w-5 h-5 mr-1 text-yellow-300 animate-pulse" />
                <span className="font-bold">{totalStars}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-0 playful-shadow animate-fade-in">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Your Progress</h3>
              <Badge className="bg-eduplay-green text-white animate-scale-in">
                {Math.round((completedLessons / englishLessons.length) * 100)}% Complete
              </Badge>
            </div>
            <Progress value={(completedLessons / englishLessons.length) * 100} className="h-3" />
          </CardContent>
        </Card>

        {/* Lessons Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {englishLessons.map((lesson, index) => (
            <Card 
              key={lesson.id} 
              className="border-0 playful-shadow hover:shadow-xl transition-all group hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="text-4xl mb-2 group-hover:animate-bounce">{lesson.emoji}</div>
                  <div className="flex items-center space-x-1">
                    {[...Array(3)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 transition-all ${i < lesson.stars ? 'text-yellow-400 fill-current animate-pulse' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                </div>
                <CardTitle className="text-lg group-hover:text-eduplay-green transition-colors">{lesson.title}</CardTitle>
                <p className="text-sm text-gray-600">{lesson.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4 text-sm">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {lesson.duration}
                  </div>
                  <Badge variant={lesson.difficulty === 'Easy' ? 'secondary' : lesson.difficulty === 'Medium' ? 'outline' : 'destructive'}>
                    {lesson.difficulty}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <Link to={`/lesson/english/${lesson.id}`}>
                    <Button 
                      className="w-full bg-gradient-to-r from-eduplay-green to-eduplay-blue hover:shadow-lg transform hover:scale-105 transition-all"
                      disabled={lesson.id > 1 && !englishLessons[lesson.id - 2]?.completed}
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {lesson.completed ? 'Review Lesson' : 'Start Lesson'}
                    </Button>
                  </Link>
                  
                  {lesson.completed && (
                    <Link to={`/quiz/english/${lesson.id}`}>
                      <Button variant="outline" className="w-full hover:bg-eduplay-green/10 transition-all">
                        <Trophy className="w-4 h-4 mr-2" />
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

export default EnglishLessons;
