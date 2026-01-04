
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "../../utils";
import { base44 } from "../../api/base44Client";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarProvider,
} from "../ui/sidebar";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback } from "../ui/avatar";

const navigationItems = [
  { title: "Home", url: createPageUrl("Home"), pageName: "Home" },
  { title: "Explore", url: createPageUrl("Explore"), pageName: "Explore" },
  { title: "AI Assistant", url: createPageUrl("AIChat"), pageName: "AIChat" },
  { title: "Community", url: createPageUrl("Community"), pageName: "Community" },
  { title: "Analytics", url: createPageUrl("Analytics"), pageName: "Analytics" },
];

const Layout: React.FC<{ children: React.ReactNode; currentPageName: string }> = ({ children, currentPageName }) => {
  const { Infinity, Home, Compass, MessageCircle, BarChart3, Sparkles, User, LogOut, Menu, X } = window.lucide;
  const location = useLocation();
  const [user, setUser] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    base44.auth.logout();
  };

  const getIcon = (pageName: string) => {
    switch (pageName) {
      case 'Home': return Home;
      case 'Explore': return Compass;
      case 'AIChat': return Sparkles;
      case 'Community': return MessageCircle;
      case 'Analytics': return BarChart3;
      default: return Sparkles;
    }
  };

  return (
    <SidebarProvider>
      <style>{`
        :root { --bg-primary: #0a0a0f; --bg-secondary: #111118; --text-primary: #ffffff; --text-secondary: #b4b4c8; --border-color: rgba(255, 255, 255, 0.1); }
        body { background: var(--bg-primary); color: var(--text-primary); }
        .glass-effect { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.08); }
        .glow-blue { box-shadow: 0 0 30px rgba(0, 212, 255, 0.3); }
        .glow-orange { box-shadow: 0 0 30px rgba(255, 107, 53, 0.3); }
        .nav-link-active { background: linear-gradient(90deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1)); border-left: 3px solid #3b82f6; }
      `}</style>
      
      <div className="min-h-screen flex w-full bg-[#0a0a0f]">
        <Sidebar className="hidden lg:flex border-r border-white/10 bg-[#111118]">
          <SidebarHeader className="border-b p-6 border-white/10">
            <Link to={createPageUrl("Home")} className="flex items-center gap-3 group">
              <div className="relative"><div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl flex items-center justify-center glow-blue"><Infinity className="w-6 h-6 text-white" /></div><div className="absolute -inset-1 bg-gradient-to-br from-blue-500 to-orange-500 rounded-xl opacity-20 blur group-hover:opacity-40 transition-opacity" /></div>
              <div><h2 className="font-bold text-xl bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">AIverse</h2><p className="text-xs text-gray-400">Living AI Dictionary</p></div>
            </Link>
          </SidebarHeader>
          
          <SidebarContent className="p-3">
            <SidebarGroup><SidebarGroupContent><SidebarMenu>
              {navigationItems.map((item) => {
                const isActive = currentPageName === item.pageName;
                const Icon = getIcon(item.pageName);
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild className={`rounded-lg mb-1 transition-all duration-200 ${isActive ? 'nav-link-active' : 'hover:bg-white/5'}`}>
                      <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-blue-400' : 'text-gray-400'}`} />
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-300'}`}>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu></SidebarGroupContent></SidebarGroup>
          </SidebarContent>

          <SidebarFooter className="border-t p-4 border-white/10">
            {user ? (
              <div className="space-y-3">
                <div className="flex items-center gap-3 px-2">
                  <Avatar className="w-9 h-9 border-2 border-blue-500/50"><AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-sm">{user.full_name?.[0] || user.email[0].toUpperCase()}</AvatarFallback></Avatar>
                  <div className="flex-1 min-w-0"><p className="font-medium text-sm text-white truncate">{user.full_name || "User"}</p><p className="text-xs truncate text-gray-400">{user.email}</p></div>
                </div>
                <Button variant="ghost" className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-500/10" onClick={handleLogout}><LogOut className="w-4 h-4 mr-2" />Logout</Button>
              </div>
            ) : (
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600" onClick={() => base44.auth.redirectToLogin()}><User className="w-4 h-4 mr-2" />Sign In</Button>
            )}
          </SidebarFooter>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="lg:hidden glass-effect border-b border-white/10 px-4 py-3 sticky top-0 z-50">
            <div className="flex items-center justify-between">
              <Link to={createPageUrl("Home")} className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-orange-500 rounded-lg flex items-center justify-center"><Infinity className="w-5 h-5 text-white" /></div>
                <span className="font-bold text-lg bg-gradient-to-r from-blue-400 to-orange-400 bg-clip-text text-transparent">AIverse</span>
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-lg hover:bg-white/5">{mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="lg:hidden glass-effect border-b border-white/10"><nav className="p-4 space-y-1">
              {navigationItems.map((item) => {
                const isActive = currentPageName === item.pageName;
                const Icon = getIcon(item.pageName);
                return (
                  <Link key={item.title} to={item.url} onClick={() => setMobileMenuOpen(false)} className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive ? 'bg-blue-500/20 text-blue-400' : 'hover:bg-white/5'}`}>
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.title}</span>
                  </Link>
                );
              })}
            </nav></div>
          )}

          <div className="flex-1 overflow-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
};
export default Layout;
