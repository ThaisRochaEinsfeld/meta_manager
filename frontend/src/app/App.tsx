import { RouterProvider } from 'react-router';
import { router } from './routes.js';
import { Toaster } from './components/ui/sonner.js';
import { AuthProvider } from './hooks/useAuth.js';

export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
    </AuthProvider>
  );
}