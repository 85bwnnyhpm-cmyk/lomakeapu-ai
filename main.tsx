import { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import LandingPage from '@/pages/LandingPage';
import AuthPage from '@/pages/AuthPage';
import Dashboard from '@/pages/Dashboard';
import HistoryPage from '@/pages/HistoryPage';

type Route = 'landing' | 'auth' | 'app' | 'history';

function Router() {
  const { user, loading } = useAuth();
  const [route, setRoute] = useState<Route>('landing');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash === 'app') setRoute(user ? 'app' : 'auth');
    else if (hash === 'history') setRoute(user ? 'history' : 'auth');
    else if (hash === 'auth') setRoute(user ? 'app' : 'auth');
    else setRoute('landing');
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen gradient-hero flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin" />
      </div>
    );
  }

  if (route === 'app' && user) return <Dashboard onShowHistory={() => setRoute('history')} />;
  if (route === 'history' && user) return <HistoryPage onBack={() => setRoute('app')} />;
  if (route === 'auth' && !user) return <AuthPage />;
  return <LandingPage onGetStarted={() => setRoute(user ? 'app' : 'auth')} />;
}

export default function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}
