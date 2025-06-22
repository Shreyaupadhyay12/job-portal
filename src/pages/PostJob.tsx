import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Briefcase, Plus, Trash2, Edit, Upload, Building2, MapPin, DollarSign, Clock, Users, Zap } from 'lucide-react';

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
  requirements: string | null;
  benefits: string | null;
  remote_allowed: boolean | null;
  company_logo_url: string | null;
  created_at: string;
  status: string;
}

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userJobs, setUserJobs] = useState<Job[]>([]);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    job_type: '',
    experience_level: '',
    salary_min: '',
    salary_max: '',
    currency: 'INR',
    skills: '',
    requirements: '',
    benefits: '',
    remote_allowed: false,
    company_name: '',
  });

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchUserJobs();
  }, [user, navigate]);

  const fetchUserJobs = async () => {
    if (!user) return;

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
          requirements,
          benefits,
          remote_allowed,
          created_at,
          status,
          companies (
            name,
            logo_url
          )
        `)
        .eq('posted_by', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching user jobs:', error);
        toast({
          title: 'Error',
          description: 'Failed to load your jobs',
          variant: 'destructive',
        });
      } else {
        const mappedJobs = (data || []).map(job => ({
          ...job,
          company_logo_url: job.companies?.logo_url || null
        }));
        setUserJobs(mappedJobs);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoadingJobs(false);
    }
  };

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadLogo = async (): Promise<string | null> => {
    if (!logoFile || !user) return null;

    const fileExt = logoFile.name.split('.').pop();
    const fileName = `${user.id}-${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('company-logos')
      .upload(filePath, logoFile);

    if (uploadError) {
      console.error('Error uploading logo:', uploadError);
      toast({
        title: 'Upload Error',
        description: 'Failed to upload company logo',
        variant: 'destructive',
      });
      return null;
    }

    const { data } = supabase.storage
      .from('company-logos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      let logoUrl = null;
      if (logoFile) {
        logoUrl = await uploadLogo();
      }

      const skillsArray = formData.skills.split(',').map(skill => skill.trim()).filter(Boolean);
      
      const jobData = {
        title: formData.title,
        description: formData.description,
        location: formData.location,
        job_type: formData.job_type,
        experience_level: formData.experience_level,
        salary_min: formData.salary_min ? parseInt(formData.salary_min) : null,
        salary_max: formData.salary_max ? parseInt(formData.salary_max) : null,
        currency: formData.currency,
        skills: skillsArray,
        requirements: formData.requirements,
        benefits: formData.benefits,
        remote_allowed: formData.remote_allowed,
        posted_by: user.id,
      };

      const { error } = await supabase
        .from('jobs')
        .insert([jobData]);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success!',
        description: 'Job posted successfully',
      });

      // Reset form
      setFormData({
        title: '',
        description: '',
        location: '',
        job_type: '',
        experience_level: '',
        salary_min: '',
        salary_max: '',
        currency: 'INR',
        skills: '',
        requirements: '',
        benefits: '',
        remote_allowed: false,
        company_name: '',
      });
      setLogoFile(null);
      setLogoPreview(null);

      fetchUserJobs();
    } catch (error) {
      console.error('Error posting job:', error);
      toast({
        title: 'Error',
        description: 'Failed to post job',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;

    try {
      const { error } = await supabase
        .from('jobs')
        .delete()
        .eq('id', jobId)
        .eq('posted_by', user?.id);

      if (error) {
        throw error;
      }

      toast({
        title: 'Success',
        description: 'Job deleted successfully',
      });

      fetchUserJobs();
    } catch (error) {
      console.error('Error deleting job:', error);
      toast({
        title: 'Error',
        description: 'Failed to delete job',
        variant: 'destructive',
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <Zap className="h-7 w-7 text-cyan-400 mr-3" />
            <span className="text-cyan-400 font-semibold text-lg">Employer Dashboard</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
            Manage Your Jobs
          </h1>
          <p className="text-lg text-slate-300 max-w-xl mx-auto">
            Post new opportunities and manage your existing job listings
          </p>
        </div>

        <Tabs defaultValue="post" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-slate-800/50 border border-slate-700/50 p-1 rounded-xl h-12">
            <TabsTrigger 
              value="post" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              <Plus className="h-4 w-4 mr-2" />
              Post New Job
            </TabsTrigger>
            <TabsTrigger 
              value="manage" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white text-slate-300 font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              <Briefcase className="h-4 w-4 mr-2" />
              Your Jobs ({userJobs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="post">
            <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl text-white flex items-center">
                  <Building2 className="h-5 w-5 mr-3 text-blue-400" />
                  Create Job Posting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Company Logo Upload - Compact Layout */}
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-white flex items-center">
                      <Upload className="h-4 w-4 mr-2 text-cyan-400" />
                      Company Logo
                    </label>
                    <div className="flex items-center gap-4 p-4 bg-slate-700/20 rounded-lg border border-slate-600/30">
                      <div className="w-16 h-16 bg-slate-700/40 rounded-lg border border-dashed border-slate-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {logoPreview ? (
                          <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover rounded-lg" />
                        ) : (
                          <Building2 className="h-8 w-8 text-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={handleLogoChange}
                          className="bg-slate-700/50 border-slate-600 text-white file:bg-blue-500 file:text-white file:border-0 file:rounded file:px-3 file:py-1 file:mr-3 file:text-sm file:hover:bg-blue-600 transition-colors"
                        />
                        <p className="text-xs text-slate-400 mt-1">PNG, JPG, JPEG - Max 5MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Job Title</label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Senior Software Engineer"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-cyan-400" />
                        Location
                      </label>
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        placeholder="e.g. Mumbai, Maharashtra"
                        required
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Job Description</label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the role, responsibilities, and what makes this opportunity exciting..."
                      required
                      rows={4}
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                        Job Type
                      </label>
                      <Select value={formData.job_type} onValueChange={(value) => setFormData({ ...formData, job_type: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20">
                          <SelectValue placeholder="Select job type" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="full-time">Full-time</SelectItem>
                          <SelectItem value="part-time">Part-time</SelectItem>
                          <SelectItem value="contract">Contract</SelectItem>
                          <SelectItem value="internship">Internship</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center">
                        <Users className="h-4 w-4 mr-2 text-cyan-400" />
                        Experience Level
                      </label>
                      <Select value={formData.experience_level} onValueChange={(value) => setFormData({ ...formData, experience_level: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20">
                          <SelectValue placeholder="Select level" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="entry">Entry Level</SelectItem>
                          <SelectItem value="mid">Mid Level</SelectItem>
                          <SelectItem value="senior">Senior Level</SelectItem>
                          <SelectItem value="lead">Lead/Manager</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Currency</label>
                      <Select value={formData.currency} onValueChange={(value) => setFormData({ ...formData, currency: value })}>
                        <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white focus:border-blue-400 focus:ring-blue-400/20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-800 border-slate-700">
                          <SelectItem value="INR">INR (₹)</SelectItem>
                          <SelectItem value="USD">USD ($)</SelectItem>
                          <SelectItem value="EUR">EUR (€)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-cyan-400" />
                        Minimum Salary
                      </label>
                      <Input
                        type="number"
                        value={formData.salary_min}
                        onChange={(e) => setFormData({ ...formData, salary_min: e.target.value })}
                        placeholder="e.g. 50000"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Maximum Salary</label>
                      <Input
                        type="number"
                        value={formData.salary_max}
                        onChange={(e) => setFormData({ ...formData, salary_max: e.target.value })}
                        placeholder="e.g. 80000"
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white">Skills Required</label>
                    <Input
                      value={formData.skills}
                      onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                      placeholder="e.g. React, Node.js, TypeScript (comma-separated)"
                      className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Requirements</label>
                      <Textarea
                        value={formData.requirements}
                        onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                        placeholder="List the key requirements and qualifications..."
                        rows={3}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white">Benefits</label>
                      <Textarea
                        value={formData.benefits}
                        onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                        placeholder="List the benefits and perks offered..."
                        rows={3}
                        className="bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-400 focus:ring-blue-400/20"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      id="remote"
                      checked={formData.remote_allowed}
                      onChange={(e) => setFormData({ ...formData, remote_allowed: e.target.checked })}
                      className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="remote" className="text-sm font-medium text-white">
                      Remote work allowed
                    </label>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    {loading ? 'Posting...' : 'Post Job'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manage">
            <div className="space-y-6">
              {loadingJobs ? (
                <div className="grid gap-6">
                  {[...Array(3)].map((_, i) => (
                    <Card key={i} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-6 bg-slate-700 rounded w-1/3 mb-4"></div>
                        <div className="h-4 bg-slate-700 rounded w-full mb-2"></div>
                        <div className="h-4 bg-slate-700 rounded w-2/3"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : userJobs.length === 0 ? (
                <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
                  <CardContent className="p-12 text-center">
                    <Briefcase className="h-16 w-16 text-slate-400 mx-auto mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-4">No jobs posted yet</h3>
                    <p className="text-slate-400 mb-6">Start by posting your first job opportunity</p>
                    <Button 
                      onClick={() => {
                        const postTabTrigger = document.querySelector('[value="post"]') as HTMLButtonElement;
                        postTabTrigger?.click();
                      }}
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500"
                    >
                      <Plus className="h-5 w-5 mr-2" />
                      Post Your First Job
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6">
                  {userJobs.map((job) => (
                    <Card key={job.id} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center space-x-4">
                            {job.company_logo_url && (
                              <img 
                                src={job.company_logo_url} 
                                alt="Company logo" 
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            )}
                            <div>
                              <h3 className="text-xl font-bold text-white mb-1">{job.title}</h3>
                              <p className="text-slate-400 flex items-center">
                                <MapPin className="h-4 w-4 mr-1" />
                                {job.location}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge 
                              variant={job.status === 'active' ? 'default' : 'secondary'}
                              className={job.status === 'active' ? 'bg-emerald-500 hover:bg-emerald-600' : ''}
                            >
                              {job.status}
                            </Badge>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDeleteJob(job.id)}
                              className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        <p className="text-slate-300 mb-4 line-clamp-2">{job.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                            <Clock className="h-3 w-3 mr-1" />
                            {job.job_type}
                          </Badge>
                          <Badge variant="outline" className="border-purple-500/50 text-purple-400">
                            <Users className="h-3 w-3 mr-1" />
                            {job.experience_level}
                          </Badge>
                          {job.salary_min && job.salary_max && (
                            <Badge variant="outline" className="border-emerald-500/50 text-emerald-400">
                              <DollarSign className="h-3 w-3 mr-1" />
                              {job.currency} {job.salary_min.toLocaleString()} - {job.salary_max.toLocaleString()}
                            </Badge>
                          )}
                          {job.remote_allowed && (
                            <Badge variant="outline" className="border-cyan-500/50 text-cyan-400">
                              Remote OK
                            </Badge>
                          )}
                        </div>

                        {job.skills && job.skills.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {job.skills.slice(0, 5).map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-slate-700/50 text-slate-300">
                                {skill}
                              </Badge>
                            ))}
                            {job.skills.length > 5 && (
                              <Badge variant="secondary" className="bg-slate-700/50 text-slate-300">
                                +{job.skills.length - 5} more
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-700/50">
                          <span className="text-sm text-slate-400">
                            Posted {new Date(job.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PostJob;
