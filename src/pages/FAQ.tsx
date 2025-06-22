
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Search, Shield, Zap, Globe, HelpCircle } from 'lucide-react';

const FAQ = () => {
  const faqs = [
    {
      question: "How do I create an account?",
      answer: "Click on the 'Sign Up' button in the top right corner and fill in your details. You'll receive a verification email to complete your registration and unlock all features.",
      icon: <Users className="h-6 w-6 text-blue-400" />
    },
    {
      question: "How can I post a job?",
      answer: "After signing in, click the 'Post Job' button in the navbar or visit the Post Job page. Fill in the job details, requirements, company information, and optionally upload your company logo.",
      icon: <Briefcase className="h-6 w-6 text-emerald-400" />
    },
    {
      question: "How do I search for jobs?",
      answer: "Use the advanced search bar on the homepage to filter jobs by title, company, location, job type, and salary range. Our AI-powered search delivers the most relevant results.",
      icon: <Search className="h-6 w-6 text-violet-400" />
    },
    {
      question: "Is my data secure on JobPortal?",
      answer: "Absolutely! We use industry-standard encryption, secure authentication, and advanced privacy measures to protect your personal information and ensure complete data security.",
      icon: <Shield className="h-6 w-6 text-amber-400" />
    },
    {
      question: "Can I edit my profile and manage applications?",
      answer: "Yes! Visit your profile page to update information, upload a profile picture, manage job applications, and track your application status in real-time.",
      icon: <Zap className="h-6 w-6 text-pink-400" />
    },
    {
      question: "Is JobPortal free to use?",
      answer: "JobPortal is completely free for job seekers. Employers can post unlimited jobs and access our talent pool at no cost. Premium features may be added in the future.",
      icon: <Globe className="h-6 w-6 text-cyan-400" />
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <HelpCircle className="h-8 w-8 text-cyan-400 mr-3" />
            <span className="text-cyan-400 font-semibold text-lg">Help Center</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Everything you need to know about using JobPortal to find your dream job or hire top talent in India.
          </p>
        </div>

        <div className="grid gap-6">
          {faqs.map((faq, index) => (
            <Card 
              key={index}
              className="group bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 hover:scale-[1.02]"
            >
              <CardHeader>
                <CardTitle className="flex items-center space-x-3 text-white group-hover:text-blue-300 transition-colors">
                  {faq.icon}
                  <span>{faq.question}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">
                  {faq.answer}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
