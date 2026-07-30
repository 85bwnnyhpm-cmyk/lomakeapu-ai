import Header from '@/components/Header';
import Hero from '@/components/Hero';
import HowItWorks from '@/components/HowItWorks';
import ForWho from '@/components/ForWho';
import Pricing from '@/components/Pricing';
import Trust from '@/components/Trust';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import { ArrowRight } from 'lucide-react';

export default function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div className="min-h-screen">
      <Header onGetStarted={onGetStarted} />
      <main>
        <Hero onGetStarted={onGetStarted} />
        <HowItWorks />
        <ForWho />
        <Pricing onGetStarted={onGetStarted} />
        <Trust />
        <CTA onGetStarted={onGetStarted} />
      </main>
      <Footer />
    </div>
  );
}
