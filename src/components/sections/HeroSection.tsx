import { ArrowRight, Play } from 'lucide-react';
import Button from '@/components/ui/Button';
import ResponsiveImage from '@/components/ui/ResponsiveImage';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden gradient-hero">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-10 sm:py-7 lg:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-6 lg:space-y-8 animate-fade-in-up">
            <div className="space-y-4 lg:space-y-6">
              <h1 className="font-bold text-content-primary leading-tight text-[2.7rem]">
                Remote work
                <span className="text-primary block">made simple</span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-normal max-w-[90%] lg:max-w-[90%]">
                Discover productivity strategies, team management insights, and work-life balance tips that successful remote professionals use every day.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button variant="default" size="lg" className="btn-md inline-flex items-center gap-2 justify-center">
                Explore Articles
                <ArrowRight className="h-5 w-5" />
              </Button>
              {/* <Button variant="outline" size="lg" className="btn-lg inline-flex items-center gap-2 justify-center">
                <Play className="h-5 w-5" />
                Watch Guide
              </Button> */}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 lg:gap-8 pt-6 lg:pt-8 border-t border-border/50">
              <div className="text-center sm:text-left">
                <div className="text-[1.125rem] sm:text-[1.375rem] font-bold text-content-primary">50k+</div>
                <div className="text-content-caption text-sm">Monthly readers</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[1.125rem] sm:text-[1.375rem] font-bold text-content-primary">200+</div>
                <div className="text-content-caption text-sm">Expert articles</div>
              </div>
              <div className="text-center sm:text-left">
                <div className="text-[1.125rem] sm:text-[1.375rem] font-bold text-content-primary">15k+</div>
                <div className="text-content-caption text-sm">Job Success</div>
              </div>
            </div>

          </div>

          {/* Hero Image */}
          <div className="relative lg:order-last animate-fade-in mt-8 lg:mt-0">
            <div className="relative rounded-xl lg:rounded-2xl overflow-hidden shadow-xl">
              <ResponsiveImage
                src="/images/hero-remote-work.jpg"
                alt="Modern remote work setup"
                width={800}
                height={600}
                variant="hero"
                priority
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>

            {/* Floating Cards - Now visible on all screen sizes */}
            <div className="absolute -top-3 sm:-top-5 lg:-top-8 -left-1 sm:-left-2 lg:-left-3 bg-card p-1.5 sm:p-2.5 lg:p-3 rounded lg:rounded-lg shadow-md animate-float">
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-success rounded-lg flex items-center justify-center bg-green-500 text-amber-50">
                  <span className="text-success-foreground font-semibold text-xs sm:text-sm lg:text-base">98%</span>
                </div>
                <div>
                  <div className="font-semibold text-content-primary text-xs sm:text-sm lg:text-base">Productivity</div>
                  <div className="text-content-caption text-xs sm:text-xs lg:text-sm">Increase</div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-3 sm:-bottom-5 lg:-bottom-8 -right-1 sm:-right-2 lg:-right-3 bg-card p-1.5 sm:p-2.5 lg:p-3 rounded lg:rounded-lg shadow-md animate-float" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-warning rounded-lg flex items-center justify-center bg-amber-600 text-amber-50">
                  <span className="text-warning-foreground font-semibold text-xs sm:text-sm lg:text-base">4.8</span>
                </div>
                <div>
                  <div className="font-semibold text-content-primary text-xs sm:text-sm lg:text-base">Rating</div>
                  <div className="text-content-caption text-xs sm:text-xs lg:text-sm">From readers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Elements - Responsive */}
      <div className="absolute top-0 right-0 w-1/4 sm:w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      <div className="absolute bottom-0 left-0 w-1/6 sm:w-1/4 h-1/3 sm:h-1/2 bg-gradient-to-r from-primary/5 to-transparent" />
    </section>
  );
};

export default HeroSection;