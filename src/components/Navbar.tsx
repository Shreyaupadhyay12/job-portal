
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useProfile } from '@/hooks/useProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Plus, User, LogOut, Briefcase, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile(user?.id);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 shadow-2xl border-b border-purple-500/30 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Briefcase className="h-10 w-10 text-cyan-400 group-hover:text-cyan-300 transition-all duration-300 transform group-hover:scale-110" />
                <div className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl group-hover:bg-cyan-300/30 transition-all duration-300"></div>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                JobPortal
              </span>
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link 
                to="/" 
                className="text-gray-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                Jobs
              </Link>
              <Link 
                to="/faq" 
                className="text-gray-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
              >
                FAQ
              </Link>
              {user && (
                <Link 
                  to="/post-job" 
                  className="text-gray-300 hover:text-cyan-400 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-white/10 backdrop-blur-sm"
                >
                  Post Job
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  asChild 
                  className="relative bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-6 py-3 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-cyan-500/25"
                >
                  <Link to="/post-job">
                    <Plus className="h-5 w-5 mr-2" />
                    <span>Post Job</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-600/20 rounded-full blur-xl"></div>
                  </Link>
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-3 px-3 py-2 rounded-full hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                    <Avatar className="h-10 w-10 ring-2 ring-cyan-400/50 hover:ring-cyan-400 transition-all duration-300">
                      <AvatarImage src={profile?.avatar_url || ''} alt={profile?.full_name || 'User'} />
                      <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white">
                        {profile?.full_name?.charAt(0) || user.email?.charAt(0) || 'U'}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden md:block">
                      <span className="text-sm font-medium text-gray-200">
                        {profile?.full_name || user.email}
                      </span>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent 
                    align="end" 
                    className="bg-slate-800/95 border-purple-500/30 backdrop-blur-xl shadow-2xl"
                  >
                    <DropdownMenuItem asChild className="hover:bg-purple-500/20 text-gray-200">
                      <Link to="/profile">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={handleSignOut}
                      className="hover:bg-purple-500/20 text-gray-200"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex space-x-3">
                <Button 
                  asChild 
                  variant="outline" 
                  className="border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300"
                >
                  <Link to="/auth">Sign In</Link>
                </Button>
                <Button 
                  asChild 
                  className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
                >
                  <Link to="/auth">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
