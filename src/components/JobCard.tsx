
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Users, IndianRupee } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

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
  companies?: {
    name: string;
    logo_url: string | null;
  };
}

interface JobCardProps {
  job: Job;
  onApply?: (jobId: string) => void;
  showApplyButton?: boolean;
}

const JobCard = ({ job, onApply, showApplyButton = true }: JobCardProps) => {
  const formatSalary = () => {
    if (!job.salary_min && !job.salary_max) return null;
    
    const formatAmount = (amount: number) => {
      if (amount >= 100000) {
        return `${(amount / 100000).toFixed(1)}L`;
      }
      return `${(amount / 1000).toFixed(0)}K`;
    };

    if (job.salary_min && job.salary_max) {
      return `₹${formatAmount(job.salary_min)} - ₹${formatAmount(job.salary_max)}`;
    } else if (job.salary_min) {
      return `₹${formatAmount(job.salary_min)}+`;
    } else if (job.salary_max) {
      return `Up to ₹${formatAmount(job.salary_max)}`;
    }
    return null;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            {job.companies?.logo_url ? (
              <img 
                src={job.companies.logo_url} 
                alt={job.companies.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-teal-600" />
              </div>
            )}
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
              <p className="text-sm text-gray-600">{job.companies?.name || 'Company'}</p>
            </div>
          </div>
          {formatSalary() && (
            <div className="flex items-center text-green-600 font-semibold">
              <IndianRupee className="h-4 w-4 mr-1" />
              {formatSalary()}
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 text-sm mb-4 line-clamp-2">{job.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge variant="secondary" className="flex items-center">
            <MapPin className="h-3 w-3 mr-1" />
            {job.location}
          </Badge>
          <Badge variant="outline">{job.job_type}</Badge>
          <Badge variant="outline">{job.experience_level}</Badge>
          {job.remote_allowed && (
            <Badge className="bg-green-100 text-green-800">Remote</Badge>
          )}
        </div>

        {job.skills && job.skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {job.skills.slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
            {job.skills.length > 4 && (
              <Badge variant="secondary" className="text-xs">
                +{job.skills.length - 4} more
              </Badge>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="h-4 w-4 mr-1" />
            {formatDistanceToNow(new Date(job.created_at), { addSuffix: true })}
          </div>
          
          {showApplyButton && onApply && (
            <Button 
              onClick={() => onApply(job.id)}
              size="sm"
              className="bg-teal-600 hover:bg-teal-700"
            >
              Apply Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
