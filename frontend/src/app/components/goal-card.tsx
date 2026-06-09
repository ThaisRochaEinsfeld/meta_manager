import { Goal, GoalStats } from '../types/goal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Flame, Trophy, Calendar, MoreVertical, Pencil, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { toast } from 'sonner';

interface GoalCardProps {
  goal: Goal;
  stats: GoalStats;
  isCompletedToday: boolean;
  onToggleComplete: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const frequencyLabels = {
  daily: 'Diário',
  weekly: 'Semanal',
  custom: 'Personalizado',
};

export function GoalCard({
  goal,
  stats,
  isCompletedToday,
  onToggleComplete,
  onEdit,
  onDelete,
}: GoalCardProps) {
  const handleToggle = () => {
    onToggleComplete();
    if (!isCompletedToday) {
      toast.success('Meta concluída! 🎉', {
        description: goal.title,
      });
    } else {
      toast.info('Meta desmarcada', {
        description: goal.title,
      });
    }
  };

  return (
    <Card className="relative overflow-hidden">
      <div
        className="absolute top-0 left-0 w-1 h-full"
        style={{ backgroundColor: goal.color }}
      />
      
      <CardHeader className="pl-6">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <Checkbox
                checked={isCompletedToday}
                onCheckedChange={handleToggle}
                className="h-5 w-5"
              />
              <CardTitle className={isCompletedToday ? 'line-through opacity-60' : ''}>
                {goal.title}
              </CardTitle>
            </div>
            <CardDescription>{goal.description}</CardDescription>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onEdit}>
                <Pencil className="h-4 w-4 mr-2" />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={onDelete} className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>

      <CardContent className="pl-6">
        <div className="flex items-center gap-4 flex-wrap">
          <Badge variant="secondary">
            {frequencyLabels[goal.frequency]}
            {goal.frequency === 'custom' && goal.targetDaysPerWeek && 
              ` (${goal.targetDaysPerWeek}x/semana)`
            }
          </Badge>

          <div className="flex items-center gap-1 text-sm">
            <Flame className="h-4 w-4 text-orange-500" />
            <span className="font-semibold">{stats.currentStreak}</span>
            <span className="text-muted-foreground">dias</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Trophy className="h-4 w-4 text-yellow-500" />
            <span className="font-semibold">{stats.longestStreak}</span>
            <span className="text-muted-foreground">melhor</span>
          </div>

          <div className="flex items-center gap-1 text-sm">
            <Calendar className="h-4 w-4 text-blue-500" />
            <span className="font-semibold">{stats.weeklyCompletions}</span>
            <span className="text-muted-foreground">esta semana</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}