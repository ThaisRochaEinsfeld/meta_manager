import { Card, CardContent } from './ui/card';
import { Target, Flame, TrendingUp, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';

export function WelcomeBanner() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const isDismissed = localStorage.getItem('welcome_dismissed');
    if (isDismissed) {
      setDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    localStorage.setItem('welcome_dismissed', 'true');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <Card className="mb-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-600" />
              Bem-vindo ao MetaManager!
            </h2>
            <p className="text-sm text-muted-foreground mb-4">
              Comece sua jornada de crescimento pessoal gerenciando suas metas diárias.
              Alguns dados de exemplo foram criados para você explorar.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-start gap-2">
                <div className="rounded-full bg-blue-100 p-2 mt-0.5">
                  <Target className="h-4 w-4 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Crie Metas</h3>
                  <p className="text-xs text-muted-foreground">
                    Adicione metas personalizadas e defina a frequência ideal
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="rounded-full bg-orange-100 p-2 mt-0.5">
                  <Flame className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Mantenha Streaks</h3>
                  <p className="text-xs text-muted-foreground">
                    Complete suas metas diariamente e construa sequências
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <div className="rounded-full bg-green-100 p-2 mt-0.5">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Acompanhe Progresso</h3>
                  <p className="text-xs text-muted-foreground">
                    Visualize estatísticas e gráficos do seu desenvolvimento
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="flex-shrink-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
