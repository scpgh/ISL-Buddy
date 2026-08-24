import React, { useState, useEffect } from 'react';
import LeftSidebar from './components/LeftSidebar';
import Navigation from './components/Navigation';
import BottomNav from './components/BottomNav';
import Roadmap from './components/Roadmap';
import ActionLibrary from './components/ActionLibrary';
import Leaderboard from './components/Leaderboard';
import DeafAssistant from './components/DeafAssistant';
import SOSPage from './components/SOSPage';
import Profile from './components/Profile';
import AuthModal from './components/AuthModal';
import ContactModal from './components/ContactModal';
import LanguageSelectorModal from './components/LanguageSelectorModal';
import QuizEngine from './components/QuizEngine';
import RightGamificationPanel from './components/RightGamificationPanel';
import LandingPage from './components/LandingPage';
import { getStoredProgress, getStoredProgressForUser, saveProgressForUser, setAppLanguage } from './utils/storage';
import { onAuthChange, signOutUser } from './utils/firebase';

export default function App() {
  const [activeTab, setActiveTab] = useState('roadmap');
  const [userProgress, setUserProgress] = useState(getStoredProgress());
  const [activeLesson, setActiveLesson] = useState(null);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showLangSelector, setShowLangSelector] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((user) => {
      if (user) {
        const userState = getStoredProgressForUser(user);
        setUserProgress(userState);
        setShowAuthModal(false);

        if (!localStorage.getItem('isl_buddy_lang_selected')) {
          setShowLangSelector(true);
        }
      } else {
        // If logged out, reset state
        setUserProgress(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSelectLanguage = (lang) => {
    if (userProgress && userProgress.user) {
      const updated = { ...userProgress, appLanguage: lang };
      setUserProgress(updated);
      saveProgressForUser(userProgress.user.uid, updated);
    }
    localStorage.setItem('isl_buddy_lang_selected', 'true');
    setShowLangSelector(false);
  };

  const handleSignOut = async () => {
    await signOutUser();
    localStorage.removeItem('isl_buddy_current_user_id');
    setUserProgress(null);
    setShowAuthModal(false);
  };

  const handleLoginSuccess = (user) => {
    const userState = getStoredProgressForUser(user);
    setUserProgress(userState);
    setShowAuthModal(false);

    if (!localStorage.getItem('isl_buddy_lang_selected')) {
      setShowLangSelector(true);
    }
  };

  // If user is NOT logged in: Render modern Landing Page first!
  if (!userProgress || !userProgress.user) {
    return (
      <div className="min-h-screen bg-[#131f24] text-white">
        <LandingPage 
          onOpenAuth={() => setShowAuthModal(true)} 
          onOpenContact={() => setShowContact(true)}
        />

        {/* Render Auth Modal overlay when GET STARTED or SIGN IN is clicked */}
        {showAuthModal && (
          <AuthModal 
            onClose={() => setShowAuthModal(false)} 
            onSuccess={handleLoginSuccess}
          />
        )}

        {/* Render Contact Support Modal when Contact Us is clicked */}
        {showContact && (
          <ContactModal 
            userProgress={{ appLanguage: 'english' }}
            onClose={() => setShowContact(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] dark:bg-[#131f24] text-[#4b4b4b] dark:text-white transition-colors duration-200 flex flex-col md:flex-row antialiased selection:bg-[#58cc02]/30">
      
      {/* PC Left Vertical Sidebar Navigation */}
      <LeftSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userProgress={userProgress}
      />

      {/* Mobile Top Header Bar */}
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProgress={userProgress}
      />

      {/* Mobile Floating Bottom Navigation Bar */}
      <BottomNav 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        userProgress={userProgress}
      />

      {/* Language Preference Selector Modal */}
      {showLangSelector && (
        <LanguageSelectorModal onSelectLanguage={handleSelectLanguage} />
      )}

      {/* Main Responsive Grid Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-2 sm:px-6 py-2 flex gap-6 min-w-0">
        
        {/* Main Center Content View */}
        <main className="flex-1 min-w-0">
          {activeTab === 'roadmap' && (
            <Roadmap 
              userProgress={userProgress} 
              onStartLesson={(phrase) => setActiveLesson(phrase)} 
            />
          )}

          {activeTab === 'actions' && (
            <ActionLibrary 
              userProgress={userProgress}
            />
          )}

          {activeTab === 'leaderboard' && (
            <Leaderboard 
              userProgress={userProgress}
              onStartLesson={(phrase) => setActiveLesson(phrase)}
            />
          )}

          {activeTab === 'ai-tutor' && (
            <DeafAssistant 
              userProgress={userProgress}
            />
          )}

          {activeTab === 'sos' && (
            <SOSPage 
              userProgress={userProgress}
            />
          )}

          {activeTab === 'profile' && (
            <Profile 
              userProgress={userProgress}
              onSelectLanguage={handleSelectLanguage}
              onSignOut={handleSignOut}
              onOpenAuth={() => setShowAuthModal(true)}
              onOpenContact={() => setShowContact(true)}
            />
          )}
        </main>

        {/* Right Gamification Sidebar (Hidden on AI Tutor for Full-Width Chat Canvas) */}
        {activeTab !== 'ai-tutor' && (
          <RightGamificationPanel 
            userProgress={userProgress} 
            onSelectTab={(tab) => setActiveTab(tab)}
          />
        )}

      </div>

      {/* Active Video Lesson Workspace */}
      {activeLesson && (
        <QuizEngine
          phrase={activeLesson}
          userProgress={userProgress}
          onUpdateProgress={(updated) => {
            setUserProgress(updated);
            if (updated.user && updated.user.uid) {
              saveProgressForUser(updated.user.uid, updated);
            }
          }}
          onClose={() => setActiveLesson(null)}
        />
      )}

      {/* Contact Modal */}
      {showContact && (
        <ContactModal 
          userProgress={userProgress}
          onClose={() => setShowContact(false)}
        />
      )}

    </div>
  );
}
