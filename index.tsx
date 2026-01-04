// FIX: Declare global properties for libraries loaded via CDN to resolve TypeScript errors.
declare global {
  interface Window {
    ReactQuery: any;
    ReactRouterDOM: any;
    lucide: any;
    framer: any;
    ReactMarkdown: any;
    Recharts: any;
    dateFns: any;
  }
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const AppWrapper = () => {
  // Access React Query from the window object loaded via CDN
  const { QueryClient, QueryClientProvider } = window.ReactQuery;
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
};

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);