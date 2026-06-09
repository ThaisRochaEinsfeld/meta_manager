import { Link, useLocation, useNavigate } from 'react-router';
import { Button } from './ui/button';
import { Home, TrendingUp, History, Target, LogOut, User } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/progress', label: 'Progresso', icon: TrendingUp },
    { path: '/history', label: 'Histórico', icon: History },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-2">
              <Target className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:inline">
              MetaManager
            </span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant={isActive ? 'default' : 'ghost'}
                    className="gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Button>
                </Link>
              );
            })}

            {/* User info and Logout */}
            <div className="flex items-center gap-2 ml-2 pl-2 border-l">
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-gray-100">
                <User className="h-4 w-4 text-gray-600" />
                <span className="text-sm text-gray-700">{user?.name}</span>
              </div>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                title="Sair"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Sair</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}