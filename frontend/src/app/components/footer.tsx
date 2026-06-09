import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import { storage } from '../utils/storage';
import { toast } from 'sonner';

export function Footer() {
  const handleResetData = () => {
    if (confirm('Tem certeza que deseja resetar todos os dados? Isso restaurará os dados de exemplo.')) {
      storage.clearAll();
      toast.success('Dados resetados com sucesso!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  };

  return (
    <footer className="border-t bg-white/80 backdrop-blur-sm mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground text-center md:text-left">
            <p className="font-semibold mb-1">MetaManager - Sistema de Gerenciamento de Metas</p>
            <p>Desenvolvido com React, TypeScript e Tailwind CSS</p>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetData}
            className="gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Resetar Dados
          </Button>
        </div>
      </div>
    </footer>
  );
}
