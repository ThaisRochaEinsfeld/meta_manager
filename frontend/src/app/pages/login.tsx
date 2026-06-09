import { useState, FormEvent } from 'react';
import { useNavigate, Navigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.js';
import { Button } from '../components/ui/button.js';
import { Input } from '../components/ui/input.js';
import { Label } from '../components/ui/label.js';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card.js';
import { Target, Lock, User } from 'lucide-react';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Se já estiver autenticado, redirecionar para o dashboard
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    const success = await login(username, password);
    if (success) {
      navigate('/', { replace: true });
    } else {
      setError('Falha ao fazer login. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 px-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-3 text-center">
          <div className="flex justify-center">
            <div className="rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 p-4">
              <Target className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            MetaManager
          </CardTitle>
          <CardDescription className="text-base">
            Gerencie suas metas pessoais com facilidade
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Usuário</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="username"
                  type="text"
                  placeholder="Digite seu usuário"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="pl-10"
                  autoComplete="username"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  autoComplete="current-password"
                />
              </div>
            </div>

            {error && (
              <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              size="lg"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 pt-6 border-t text-center text-sm text-gray-600">
            <p className="mb-2">💡Usuário: MetaManagerAdmin e Senha: Password12@</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}