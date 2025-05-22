
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, Bell } from 'lucide-react';
import Logo from '../Logo';
import { Button } from '@/components/ui/button';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Simulating authenticated state - will be replaced with actual auth state later
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/90 backdrop-blur-sm z-40 shadow-sm">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Logo size="small" />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="text-navy hover:text-teal transition-colors">Dashboard</Link>
                <Link to="/matches" className="text-navy hover:text-teal transition-colors">Matches</Link>
                <Link to="/groups" className="text-navy hover:text-teal transition-colors">Groups</Link>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 bg-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">2</span>
                  </Button>
                  <Link to="/profile">
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to="/#features" className="text-navy hover:text-teal transition-colors">Features</Link>
                <Link to="/#how-it-works" className="text-navy hover:text-teal transition-colors">How It Works</Link>
                <Link to="/#testimonials" className="text-navy hover:text-teal transition-colors">Testimonials</Link>
                <div className="space-x-2">
                  <Link to="/login" className="btn-outline">Log In</Link>
                  <Link to="/onboarding" className="btn-primary">Sign Up</Link>
                </div>
              </>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-navy"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link 
                    to="/matches" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Matches
                  </Link>
                  <Link 
                    to="/groups" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Groups
                  </Link>
                  <Link 
                    to="/notifications" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Notifications
                  </Link>
                  <Link 
                    to="/profile" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    My Profile
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/#features" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </Link>
                  <Link 
                    to="/#how-it-works" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    How It Works
                  </Link>
                  <Link 
                    to="/#testimonials" 
                    className="text-navy hover:text-teal py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Testimonials
                  </Link>
                  <div className="pt-2 grid grid-cols-2 gap-2">
                    <Link 
                      to="/login" 
                      className="btn-outline text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Log In
                    </Link>
                    <Link 
                      to="/onboarding" 
                      className="btn-primary text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
