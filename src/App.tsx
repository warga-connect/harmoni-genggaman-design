import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Complaints from "./pages/Complaints";
import NewComplaint from "./pages/NewComplaint";
import Marketplace from "./pages/Marketplace";
import Billing from "./pages/Billing";
import Guests from "./pages/Guests";
import Profile from "./pages/Profile";
import Announcements from "./pages/Announcements";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/complaints/new" element={<NewComplaint />} />
          <Route path="/complaints/:id" element={<Complaints />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/:id" element={<Marketplace />} />
          <Route path="/billing" element={<Billing />} />
          <Route path="/guests" element={<Guests />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
