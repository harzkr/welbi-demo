import React from 'react';
import './App.css';
import Dashboard from './components/Dashboard/DashboardContainer';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Landing from './components/Dashboard/Landing/LandingContainer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Landing/>
    </QueryClientProvider>
  );
}

export default App;
