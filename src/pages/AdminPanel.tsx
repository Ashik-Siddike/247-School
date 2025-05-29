
import { ArrowLeft, Upload, Users, BookOpen, BarChart, Settings, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const AdminPanel = () => {
  const adminData = {
    totalStudents: 1247,
    totalLessons: 156,
    totalQuizzes: 89,
    activeUsers: 324,
    recentLessons: [
      { id: 1, title: "Counting Numbers 1-20", subject: "Math", status: "Published", students: 156 },
      { id: 2, title: "ABC Letters", subject: "English", status: "Draft", students: 0 },
      { id: 3, title: "বাংলা বর্ণমালা", subject: "Bangla", status: "Published", students: 89 },
      { id: 4, title: "Animals Around Us", subject: "Science", status: "Published", students: 134 }
    ],
    pendingContent: [
      { type: "Lesson", title: "Simple Subtraction", subject: "Math", submittedBy: "Teacher A" },
      { type: "Quiz", title: "English Grammar Quiz", subject: "English", submittedBy: "Teacher B" },
      { type: "Lesson", title: "Weather Patterns", subject: "Science", submittedBy: "Teacher C" }
    ]
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
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-0 playful-shadow">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-eduplay-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-blue">{adminData.totalStudents}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 playful-shadow">
            <CardContent className="p-6 text-center">
              <BookOpen className="w-8 h-8 text-eduplay-green mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-green">{adminData.totalLessons}</div>
              <div className="text-sm text-gray-600">Total Lessons</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 playful-shadow">
            <CardContent className="p-6 text-center">
              <BarChart className="w-8 h-8 text-eduplay-orange mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-orange">{adminData.totalQuizzes}</div>
              <div className="text-sm text-gray-600">Total Quizzes</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 playful-shadow">
            <CardContent className="p-6 text-center">
              <Users className="w-8 h-8 text-eduplay-purple mx-auto mb-2" />
              <div className="text-2xl font-bold text-eduplay-purple">{adminData.activeUsers}</div>
              <div className="text-sm text-gray-600">Active Now</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Content Management */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload New Content */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="w-6 h-6 text-eduplay-blue" />
                  <span>Upload New Content</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Lesson Title</Label>
                    <Input id="title" placeholder="Enter lesson title" />
                  </div>
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <select className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md">
                      <option>Math</option>
                      <option>English</option>
                      <option>Bangla</option>
                      <option>Science</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Enter lesson description" />
                </div>
                
                <div className="flex space-x-4">
                  <Button className="bg-gradient-to-r from-eduplay-blue to-eduplay-purple">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Lesson
                  </Button>
                  <Button variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Quiz
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Lessons */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-6 h-6 text-eduplay-green" />
                    <span>Recent Lessons</span>
                  </div>
                  <Button size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {adminData.recentLessons.map((lesson) => (
                    <div key={lesson.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{lesson.title}</h4>
                        <div className="flex items-center space-x-4 mt-1">
                          <Badge variant="outline">{lesson.subject}</Badge>
                          <Badge className={lesson.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                            {lesson.status}
                          </Badge>
                          <span className="text-sm text-gray-600">{lesson.students} students</span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Pending Content */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-eduplay-orange" />
                  <span>Pending Review</span>
                  <Badge className="bg-red-100 text-red-800">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {adminData.pendingContent.map((item, index) => (
                  <div key={index} className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="outline">{item.type}</Badge>
                      <Badge className="bg-orange-100 text-orange-800">{item.subject}</Badge>
                    </div>
                    <h5 className="font-semibold text-sm">{item.title}</h5>
                    <p className="text-xs text-gray-600">By {item.submittedBy}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline">
                        Review
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="w-6 h-6 text-eduplay-purple" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-gradient-to-r from-eduplay-blue to-eduplay-purple">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button className="w-full bg-gradient-to-r from-eduplay-green to-eduplay-blue">
                  <BarChart className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button className="w-full bg-gradient-to-r from-eduplay-orange to-eduplay-pink">
                  <Settings className="w-4 h-4 mr-2" />
                  System Settings
                </Button>
                <Button className="w-full bg-gradient-to-r from-eduplay-purple to-eduplay-pink">
                  <Upload className="w-4 h-4 mr-2" />
                  Bulk Upload
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="border-0 playful-shadow">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart className="w-6 h-6 text-eduplay-green" />
                  <span>System Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Server Status:</span>
                  <Badge className="bg-green-100 text-green-800">Online</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database:</span>
                  <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Sessions:</span>
                  <span className="text-sm font-bold">324</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Storage Used:</span>
                  <span className="text-sm font-bold">2.3GB / 10GB</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
