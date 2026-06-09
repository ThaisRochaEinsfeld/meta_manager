import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Home, Search } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="rounded-full bg-gray-100 p-6">
            <Search className="h-12 w-12 text-gray-400" />
          </div>
        </div>
        
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Página não encontrada</h2>
        
        <p className="text-muted-foreground mb-6">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link to="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" />
            Voltar ao Dashboard
          </Button>
        </Link>
      </Card>
    </div>
  );
}
