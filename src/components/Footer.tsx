
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Heart, Shield, FileText, Mail, Github, Linkedin, Twitter, Sparkles, Code, Zap } from 'lucide-react';
import TermsOfService from './TermsOfService';
import PrivacyPolicy from './PrivacyPolicy';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-t border-slate-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About Section */}
        <div className="mb-12">
          <Card className="bg-slate-800/30 border-slate-700/50 backdrop-blur-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <Sparkles className="h-8 w-8 text-cyan-400 mr-3" />
                  <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                    About JobPortal
                  </h2>
                </div>
                <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                  India's most advanced job portal connecting talent with opportunity
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <p className="text-slate-300 leading-relaxed">
                    JobPortal is a cutting-edge, futuristic job board platform designed to revolutionize the way talented professionals connect with innovative companies across India. Our platform leverages state-of-the-art technology to provide seamless job discovery and hiring experiences.
                  </p>
                  <p className="text-slate-300 leading-relaxed">
                    Whether you're a job seeker looking for your dream role or an employer searching for the perfect candidate, JobPortal offers intuitive tools, advanced filtering, AI-powered matching, and a stunning user interface to make your journey successful and enjoyable.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-slate-400">
                      <Zap className="h-5 w-5 text-cyan-400" />
                      <span>Lightning-fast job search and application process</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Shield className="h-5 w-5 text-blue-400" />
                      <span>Secure and privacy-focused platform</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Code className="h-5 w-5 text-purple-400" />
                      <span>Built with modern web technologies</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400">
                      <Heart className="h-5 w-5 text-red-400" />
                      <span>Crafted with passion for the Indian job market</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="inline-block p-8 bg-gradient-to-br from-blue-500/20 via-purple-600/20 to-emerald-500/20 rounded-2xl border border-blue-500/30 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-600/10 blur-xl"></div>
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">S</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">Created by Shreya</h3>
                      <p className="text-slate-300 mb-2">Full Stack Developer & UI/UX Designer</p>
                      <p className="text-slate-400 text-sm mb-4">Passionate about creating beautiful, functional web experiences</p>
                      <p className="text-slate-400 text-sm mb-6">© 2025 - All rights reserved</p>
                      <div className="flex justify-center gap-4">
                        <a href="#" className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-blue-400">
                          <Github className="h-5 w-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-blue-400">
                          <Linkedin className="h-5 w-5" />
                        </a>
                        <a href="#" className="p-2 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors text-slate-400 hover:text-purple-400">
                          <Twitter className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Separator className="bg-slate-700/50 my-8" />

        {/* Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
              <Zap className="h-5 w-5 mr-2 text-cyan-400" />
              Platform
            </h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Home</a></li>
              <li><a href="/post-job" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Post a Job</a></li>
              <li><a href="/profile" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Profile</a></li>
              <li><a href="/faq" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Job Seekers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Browse Jobs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Create Profile</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Career Tips</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Salary Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">For Employers</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Post Jobs</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Find Talent</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Hiring Solutions</a></li>
              <li><a href="#" className="text-slate-400 hover:text-blue-400 transition-colors hover:translate-x-1 inline-block">Company Profiles</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Legal & Support</h3>
            <ul className="space-y-3">
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 hover:translate-x-1">
                      <Shield className="h-4 w-4" />
                      Privacy Policy
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Privacy Policy</DialogTitle>
                    </DialogHeader>
                    <PrivacyPolicy />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 hover:translate-x-1">
                      <FileText className="h-4 w-4" />
                      Terms of Service
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-slate-900 border-slate-700">
                    <DialogHeader>
                      <DialogTitle className="text-white">Terms of Service</DialogTitle>
                    </DialogHeader>
                    <TermsOfService />
                  </DialogContent>
                </Dialog>
              </li>
              <li>
                <button className="text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-2 hover:translate-x-1">
                  <Mail className="h-4 w-4" />
                  Contact Support
                </button>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="bg-slate-700/50 mb-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-slate-400 text-sm">
          <div className="mb-4 md:mb-0">
            <p className="flex items-center gap-2">
              © 2025 JobPortal. Created with 
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              by <span className="text-blue-400 font-semibold">Shreya</span>. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-2">
              <span className="text-2xl">🇮🇳</span>
              Made in India
            </span>
            <span>•</span>
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-cyan-400" />
              Powered by Modern Technology
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
