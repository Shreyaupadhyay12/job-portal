
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Calendar, Scale, AlertTriangle, FileText, Users } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <FileText className="h-6 w-6 mr-3 text-blue-400" />
            Terms of Service
          </CardTitle>
          <p className="text-slate-400">Last updated: January 2025</p>
        </CardHeader>
        <CardContent className="space-y-6 text-slate-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Scale className="h-5 w-5 mr-2 text-cyan-400" />
              Acceptance of Terms
            </h3>
            <p className="leading-relaxed">
              By accessing and using JobPortal, you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Users className="h-5 w-5 mr-2 text-cyan-400" />
              User Accounts
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>You must provide accurate and complete information when creating an account</li>
              <li>You are responsible for maintaining the confidentiality of your account credentials</li>
              <li>You must notify us immediately of any unauthorized use of your account</li>
              <li>One person or entity may maintain only one account</li>
            </ul>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Job Postings and Applications</h3>
            <div className="space-y-3">
              <p><strong className="text-white">For Employers:</strong></p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Job postings must be legitimate and accurate</li>
                <li>You may not post discriminatory content</li>
                <li>You are responsible for the content of your job postings</li>
                <li>We reserve the right to remove inappropriate postings</li>
              </ul>
              
              <p><strong className="text-white">For Job Seekers:</strong></p>
              <ul className="space-y-1 list-disc list-inside ml-4">
                <li>Profile information must be truthful and accurate</li>
                <li>You may not create multiple accounts</li>
                <li>Respect employer communications and interview processes</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-yellow-400" />
              Prohibited Activities
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>Posting false, misleading, or fraudulent information</li>
              <li>Harassment or discrimination of any kind</li>
              <li>Spamming or unsolicited marketing communications</li>
              <li>Attempting to access unauthorized areas of the platform</li>
              <li>Using automated systems to scrape or collect data</li>
            </ul>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Payment and Fees</h3>
            <p className="leading-relaxed">
              JobPortal offers both free and premium services. Premium features require payment in advance. 
              All fees are non-refundable unless otherwise stated. We reserve the right to change our pricing 
              structure with 30 days notice.
            </p>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Limitation of Liability</h3>
            <p className="leading-relaxed">
              JobPortal acts as a platform connecting employers and job seekers. We are not responsible for 
              the accuracy of job postings, the quality of candidates, or the outcome of any hiring decisions. 
              Users engage with each other at their own risk.
            </p>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibol text-white mb-3 flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-cyan-400" />
              Modifications
            </h3>
            <p className="leading-relaxed">
              We reserve the right to modify these terms at any time. Users will be notified of significant 
              changes via email or platform notifications. Continued use of the service after modifications 
              constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
            <p className="text-sm text-slate-400">
              <strong className="text-white">Contact Information:</strong> For questions about these Terms of Service, 
              please contact us at legal@jobportal.com or through our support channels.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
