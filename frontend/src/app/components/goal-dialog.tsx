import { useState, useEffect } from 'react';
import { Goal, GoalFrequency } from '../types/goal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface GoalDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (goal: Omit<Goal, 'id' | 'createdAt'>) => void;
  editGoal?: Goal;
}

const goalColors = [
  '#3b82f6', // blue
  '#10b981', // green
  '#f59e0b', // amber
  '#ef4444', // red
  '#8b5cf6', // violet
  '#ec4899', // pink
  '#06b6d4', // cyan
  '#f97316', // orange
];

export function GoalDialog({ open, onOpenChange, onSave, editGoal }: GoalDialogProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [frequency, setFrequency] = useState<GoalFrequency>('daily');
  const [targetDaysPerWeek, setTargetDaysPerWeek] = useState(3);
  const [color, setColor] = useState(goalColors[0]);

  useEffect(() => {
    if (editGoal) {
      setTitle(editGoal.title);
      setDescription(editGoal.description);
      setFrequency(editGoal.frequency);
      setTargetDaysPerWeek(editGoal.targetDaysPerWeek || 3);
      setColor(editGoal.color);
    } else {
      setTitle('');
      setDescription('');
      setFrequency('daily');
      setTargetDaysPerWeek(3);
      setColor(goalColors[0]);
    }
  }, [editGoal, open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      title,
      description,
      frequency,
      targetDaysPerWeek: frequency === 'custom' ? targetDaysPerWeek : undefined,
      color,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {editGoal ? 'Editar Meta' : 'Nova Meta'}
            </DialogTitle>
            <DialogDescription>
              {editGoal 
                ? 'Atualize as informações da sua meta.'
                : 'Crie uma nova meta para acompanhar seu progresso.'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: Estudar programação"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descreva sua meta..."
                rows={3}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="frequency">Frequência</Label>
              <Select value={frequency} onValueChange={(v) => setFrequency(v as GoalFrequency)}>
                <SelectTrigger id="frequency">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diário</SelectItem>
                  <SelectItem value="weekly">Semanal</SelectItem>
                  <SelectItem value="custom">Personalizado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {frequency === 'custom' && (
              <div className="grid gap-2">
                <Label htmlFor="targetDays">Dias por semana</Label>
                <Select 
                  value={targetDaysPerWeek.toString()} 
                  onValueChange={(v) => setTargetDaysPerWeek(parseInt(v))}
                >
                  <SelectTrigger id="targetDays">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'dia' : 'dias'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="grid gap-2">
              <Label>Cor</Label>
              <div className="flex gap-2">
                {goalColors.map((c) => (
                  <button
                    key={c}
                    type="button"
                    className="w-8 h-8 rounded-full border-2 transition-all"
                    style={{
                      backgroundColor: c,
                      borderColor: color === c ? '#000' : 'transparent',
                      transform: color === c ? 'scale(1.1)' : 'scale(1)',
                    }}
                    onClick={() => setColor(c)}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={!title.trim()}>
              {editGoal ? 'Salvar' : 'Criar Meta'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
