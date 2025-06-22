
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Shield, Eye, Database, Lock, Share2, Cookie, AlertCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center">
            <Shield className="h-6 w-6 mr-3 text-blue-400" />
            Privacy Policy
          </CardTitle>
          <p className="text-slate-400">Last updated: January 2025</p>
        </CardHeader>
        <CardContent className="space-y-6 text-slate-300">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Our Commitment to Privacy</h3>
            <p className="leading-relaxed">
              At JobPortal, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, and protect your data when you use our platform.
            </p>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Database className="h-5 w-5 mr-2 text-cyan-400" />
              Information We Collect
            </h3>
            <div className="space-y-3">
              <div>
                <p className="font-medium text-white">Personal Information:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>Name, email address, phone number</li>
                  <li>Professional experience and skills</li>
                  <li>Resume and portfolio files</li>
                  <li>Profile photos and company logos</li>
                </ul>
              </div>
              
              <div>
                <p className="font-medium text-white">Usage Information:</p>
                <ul className="list-disc list-inside ml-4 space-y-1">
                  <li>IP address and device information</li>
                  <li>Browser type and operating system</li>
                  <li>Pages visited and features used</li>
                  <li>Search queries and application history</li>
                </ul>
              </div>
            </div>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Eye className="h-5 w-5 mr-2 text-cyan-400" />
              How We Use Your Information
            </h3>
            <ul className="space-y-2 list-disc list-inside">
              <li>To provide and improve our job matching services</li>
              <li>To facilitate communication between employers and job seekers</li>
              <li>To send relevant job recommendations and notifications</li>
              <li>To analyze platform usage and optimize user experience</li>
              <li>To prevent fraud and ensure platform security</li>
              <li>To comply with legal obligations and enforce our terms</li>
            </ul>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Share2 className="h-5 w-5 mr-2 text-cyan-400" />
              Information Sharing
            </h3>
            <div className="space-y-3">
              <p className="leading-relaxed">
                We do not sell your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-white">With Employers:</strong> When you apply for jobs, your profile and application materials are shared with relevant employers</li>
                <li><strong className="text-white">Service Providers:</strong> With trusted third-party services that help us operate the platform (hosting, analytics, email services)</li>
                <li><strong className="text-white">Legal Requirements:</strong> When required by law or to protect our rights and users' safety</li>
                <li><strong className="text-white">Business Transfers:</strong> In case of merger, acquisition, or sale of assets</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Lock className="h-5 w-5 mr-2 text-cyan-400" />
              Data Security
            </h3>
            <div className="space-y-3">
              <p className="leading-relaxed">
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>SSL encryption for all data transmission</li>
                <li>Secure data storage with regular backups</li>
                <li>Access controls and authentication systems</li>
                <li>Regular security audits and monitoring</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </div>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <Cookie className="h-5 w-5 mr-2 text-cyan-400" />
              Cookies and Tracking
            </h3>
            <p className="leading-relaxed">
              We use cookies and similar technologies to enhance your experience, remember your preferences, 
              and analyze platform usage. You can control cookie settings through your browser, but some 
              features may not function properly if cookies are disabled.
            </p>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Your Rights and Choices</h3>
            <ul className="space-y-2 list-disc list-inside">
              <li><strong className="text-white">Access:</strong> Request a copy of your personal data</li>
              <li><strong className="text-white">Correction:</strong> Update or correct inaccurate information</li>
              <li><strong className="text-white">Deletion:</strong> Request deletion of your account and data</li>
              <li><strong className="text-white">Portability:</strong> Export your data in a common format</li>
              <li><strong className="text-white">Opt-out:</strong> Unsubscribe from marketing communications</li>
            </ul>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Data Retention</h3>
            <p className="leading-relaxed">
              We retain your personal information for as long as necessary to provide our services and comply 
              with legal obligations. Inactive accounts may be deleted after 2 years of inactivity, with 
              prior notice sent to your registered email address.
            </p>
          </div>

          <Separator className="bg-slate-700/50" />

          <div>
            <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
              <AlertCircle className="h-5 w-5 mr-2 text-yellow-400" />
              Updates to This Policy
            </h3>
            <p className="leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes in our practices or legal 
              requirements. We will notify users of significant changes via email or platform notifications.
            </p>
          </div>

          <div className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
            <p className="text-sm text-slate-400">
              <strong className="text-white">Contact Us:</strong> For privacy-related questions or to exercise your rights, 
              contact us at privacy@jobportal.com or use our data protection contact form in your account settings.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
