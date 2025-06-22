import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import JobCard from '@/components/JobCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, MapPin, Briefcase, Sparkles, TrendingUp, Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Job {
  id: string;
  title: string;
  description: string;
  location: string;
  job_type: string;
  experience_level: string;
  salary_min: number | null;
  salary_max: number | null;
  currency: string | null;
  skills: string[] | null;
  remote_allowed: boolean | null;
  created_at: string;
  company_logo_url: string | null;
  companies?: {
    name: string;
    logo_url: string | null;
  };
}

const Home = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select(`
          id,
          title,
          description,
          location,
          job_type,
          experience_level,
          salary_min,
          salary_max,
          currency,
          skills,
          remote_allowed,
          created_at,
          companies (
            name,
            logo_url
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching jobs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load jobs',
          variant: 'destructive',
        });
      } else {
        // Map the data to use company logo from companies table
        const mappedJobs = (data || []).map(job => ({
          ...job,
          company_logo_url: job.companies?.logo_url || null
        }));
        setJobs(mappedJobs);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId: string) => {
    if (!user) {
      toast({
        title: 'Please sign in',
        description: 'You need to sign in to apply for jobs',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('job_applications')
        .insert({
          job_id: jobId,
          applicant_id: user.id,
        });

      if (error) {
        if (error.code === '23505') {
          toast({
            title: 'Already applied',
            description: 'You have already applied for this job',
            variant: 'destructive',
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: 'Application submitted',
          description: 'Your application has been submitted successfully!',
        });
      }
    } catch (error) {
      console.error('Error applying:', error);
      toast({
        title: 'Error',
        description: 'Failed to submit application',
        variant: 'destructive',
      });
    }
  };

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.companies?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesJobType = !jobTypeFilter || jobTypeFilter === 'all' || job.job_type === jobTypeFilter;
    
    return matchesSearch && matchesLocation && matchesJobType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-emerald-600/20 blur-3xl"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <Sparkles className="h-8 w-8 text-cyan-400 mr-3" />
              <span className="text-cyan-400 font-semibold text-lg">India's Premier Job Portal</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              Find Your Dream Job
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-slate-300 max-w-3xl mx-auto">
              Connect with top companies and discover opportunities that match your passion and skills
            </p>
            
            <div className="flex items-center justify-center gap-8 mb-8">
              <div className="flex items-center text-slate-300">
                <TrendingUp className="h-5 w-5 text-emerald-400 mr-2" />
                <span>1000+ Active Jobs</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Users className="h-5 w-5 text-blue-400 mr-2" />
                <span>500+ Companies</span>
              </div>
              <div className="flex items-center text-slate-300">
                <Briefcase className="h-5 w-5 text-purple-400 mr-2" />
                <span>All Industries</span>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-slate-700/50">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="relative">
                  <Search className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Job title or company"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
                
                <div className="relative">
                  <MapPin className="absolute left-4 top-4 h-5 w-5 text-slate-400" />
                  <Input
                    placeholder="Location"
                    value={locationFilter}
                    onChange={(e) => setLocationFilter(e.target.value)}
                    className="pl-12 h-14 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                  />
                </div>
                
                <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
                  <SelectTrigger className="h-14 bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20">
                    <SelectValue placeholder="Job type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All types</SelectItem>
                    <SelectItem value="full-time">Full-time</SelectItem>
                    <SelectItem value="part-time">Part-time</SelectItem>
                    <SelectItem value="contract">Contract</SelectItem>
                    <SelectItem value="internship">Internship</SelectItem>
                  </SelectContent>
                </Select>
                
                <Button className="h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105">
                  <Briefcase className="h-5 w-5 mr-2" />
                  Search Jobs
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Jobs Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              Latest Opportunities
            </h2>
            <p className="text-slate-400 text-lg">
              {filteredJobs.length} jobs matching your criteria
            </p>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-slate-800/50 rounded-xl p-6 animate-pulse border border-slate-700/50">
                <div className="h-6 bg-slate-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-slate-700 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-slate-700 rounded w-full mb-4"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-slate-700 rounded w-20"></div>
                  <div className="h-8 bg-slate-700 rounded w-20"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredJobs.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-slate-800/50 rounded-2xl p-12 max-w-md mx-auto border border-slate-700/50">
              <Briefcase className="h-16 w-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">No jobs found</h3>
              <p className="text-slate-400">Try adjusting your search criteria to find more opportunities</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job) => (
              <JobCard key={job.id} job={job} onApply={handleApply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
