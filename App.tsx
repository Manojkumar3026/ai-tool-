
import React from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Explore from './pages/Explore';
import AIChat from './pages/AIChat';
import Analytics from './pages/Analytics';
import Community from './pages/Community';
import ToolDetail from './pages/ToolDetail';

const App: React.FC = () => {
  // Access React Router from window object
  const { HashRouter, Routes, Route, useLocation } = window.ReactRouterDOM;

  const PageIdentifier: React.FC = () => {
    const location = useLocation();
    const currentPageName = location.pathname.substring(1) || 'Home';
    
    return (
      <Layout currentPageName={currentPageName}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/AIChat" element={<AIChat />} />
          <Route path="/Analytics" element={<Analytics />} />
          <Route path="/Community" element={<Community />} />
          <Route path="/ToolDetail" element={<ToolDetail />} />
        </Routes>
      </Layout>
    );
  };

  return (
    <HashRouter>
      <PageIdentifier />
    </HashRouter>
  );
};

export default App;
