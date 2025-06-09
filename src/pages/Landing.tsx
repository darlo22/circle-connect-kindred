
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Users, Church, Globe } from 'lucide-react';
import Logo from '../components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cream to-white">
      {/* Header */}
      <header className="py-6 px-6">
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <Logo size="medium" />
            <div className="flex items-center gap-4">
              <Link to="/login" className="btn-outline">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="py-16 px-6">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-navy mb-6">
              Find Your Perfect <span className="text-teal">Circle</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Connect with like-minded individuals in trusted communities. Whether you're seeking faith-based connections or exploring diverse communities, we help you find meaningful relationships.
            </p>
          </div>

          {/* Platform Options */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* CircleMate - Faith Based */}
            <Card className="overflow-hidden transition-all hover:shadow-xl border-2 hover:border-teal">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Church className="w-8 h-8 text-teal" />
                  </div>
                  <h2 className="text-3xl font-bold text-navy mb-2">CircleMate</h2>
                  <p className="text-gray-600">For Faith-Based Communities</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Connect within your church and faith community</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Find meaningful relationships grounded in shared values</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Church className="w-5 h-5 text-teal mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Pastor-approved and community-verified members</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/onboarding?platform=circlemate" className="w-full">
                    <Button className="w-full btn-primary gap-2">
                      Join Your Church Community <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to="/onboarding?platform=circlemate&join=browse" className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                      Browse Communities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* CircleMate+ - General */}
            <Card className="overflow-hidden transition-all hover:shadow-xl border-2 hover:border-orange">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-orange" />
                  </div>
                  <h2 className="text-3xl font-bold text-navy mb-2">CircleMate+</h2>
                  <p className="text-gray-600">For All Communities</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-orange mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Join diverse communities of all types</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="w-5 h-5 text-orange mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Professional, social, hobby, and interest-based groups</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-orange mt-1 flex-shrink-0" />
                    <p className="text-gray-700">Connect globally with like-minded individuals</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link to="/onboarding?platform=circlemate-plus" className="w-full">
                    <Button className="w-full bg-orange hover:bg-orange/90 text-white gap-2">
                      Join Your Community <ArrowRight size={18} />
                    </Button>
                  </Link>
                  <Link to="/onboarding?platform=circlemate-plus&join=browse" className="w-full">
                    <Button variant="outline" className="w-full gap-2 border-orange text-orange hover:bg-orange/10">
                      Browse Communities
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <h3 className="text-2xl font-bold text-center text-navy mb-12">Why Choose Our Platform?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-teal" />
                </div>
                <h4 className="font-semibold text-navy mb-2">Trusted Communities</h4>
                <p className="text-gray-600 text-sm">Connect within verified and trusted community circles</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-teal" />
                </div>
                <h4 className="font-semibold text-navy mb-2">Meaningful Connections</h4>
                <p className="text-gray-600 text-sm">Find relationships based on shared values and interests</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-teal" />
                </div>
                <h4 className="font-semibold text-navy mb-2">Safe Environment</h4>
                <p className="text-gray-600 text-sm">Community-moderated spaces for authentic connections</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 border-t bg-white">
        <div className="container-custom">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} CircleMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
