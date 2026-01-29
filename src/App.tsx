import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Pages publiques
import Home from "@/pages/public/Home";
import JournalList from "@/pages/public/JournalList";
import JournalDetail from "@/pages/public/JournalDetail";
import Textes from "@/pages/public/Textes";
import TexteDetail from "@/pages/public/TexteDetail";
import Archives from "@/pages/public/Archives";
import About from "@/pages/public/About";
import Login from "@/pages/public/Login";
import Profile from "@/pages/public/Profile";

// Pages dashboard
import DashboardHome from "@/pages/dashboard/DashboardHome";
import DashboardJournaux from "@/pages/dashboard/DashboardJournaux";
import DashboardTextes from "@/pages/dashboard/DashboardTextes";
import DashboardInstitutions from "@/pages/dashboard/DashboardInstitutions";
import DashboardUsers from "@/pages/dashboard/DashboardUsers";
import DashboardPayments from "@/pages/dashboard/DashboardPayments";
import DashboardReports from "@/pages/dashboard/DashboardReports";
import DashboardSettings from "@/pages/dashboard/DashboardSettings";

import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Routes publiques */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/journal" element={<JournalList />} />
            <Route path="/journal/:id" element={<JournalDetail />} />
            <Route path="/textes" element={<Textes />} />
            <Route path="/textes/:id" element={<TexteDetail />} />
            <Route path="/archives" element={<Archives />} />
            <Route path="/a-propos" element={<About />} />
            <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Auth (sans layout) */}
          <Route path="/login" element={<Login />} />

          {/* Routes dashboard */}
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="journaux" element={<DashboardJournaux />} />
            <Route path="textes" element={<DashboardTextes />} />
            <Route path="institutions" element={<DashboardInstitutions />} />
            <Route path="users" element={<DashboardUsers />} />
            <Route path="payments" element={<DashboardPayments />} />
            <Route path="reports" element={<DashboardReports />} />
            <Route path="settings" element={<DashboardSettings />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
