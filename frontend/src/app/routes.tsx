import { createBrowserRouter } from 'react-router';
import { Layout } from './pages/layout';
import { Dashboard } from './pages/dashboard';
import { Progress } from './pages/progress';
import { History } from './pages/history';
import { NotFound } from './pages/not-found';
import { Login } from './pages/login';
import { ProtectedRoute } from './components/protected-route';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: 'progress',
        Component: Progress,
      },
      {
        path: 'history',
        Component: History,
      },
      {
        path: '*',
        Component: NotFound,
      },
    ],
  },
]);
