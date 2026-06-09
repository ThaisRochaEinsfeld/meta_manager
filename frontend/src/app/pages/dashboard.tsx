import { useState } from 'react';
import { useGoals } from '../hooks/useGoals';
import { Goal } from '../types/goal';
import { GoalCard } from '../components/goal-card';
import { GoalDialog } from '../components/goal-dialog';
import { WelcomeBanner } from '../components/welcome-banner';
import { EmptyState } from '../components/empty-state';
import { Button } from '../components/ui/button';
import { Plus, Target, TrendingUp, Calendar } from 'lucide-react';
import { formatDateDisplay, getTodayString } from '../utils/date-helpers';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../components/ui/alert-dialog';
import { toast } from 'sonner';

export function Dashboard() {
  const {
    goals,
    createGoal,
    updateGoal,
    deleteGoal,
    toggleCompletion,
    isCompleted,
    getGoalStats,
    getAllStats,
  } = useGoals();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | undefined>();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [goalToDelete, setGoalToDelete] = useState<string | null>(null);

  const today = getTodayString();
  const allStats = getAllStats();

  const handleCreateOrUpdate = (goalData: Omit<Goal, 'id' | 'createdAt'>) => {
    if (editingGoal) {
      updateGoal(editingGoal.id, goalData);
      toast.success('Meta atualizada com sucesso!');
    } else {
      createGoal(goalData);
      toast.success('Meta criada com sucesso!');
    }
    setEditingGoal(undefined);
  };

  const handleEdit = (goal: Goal) => {
    setEditingGoal(goal);
    setDialogOpen(true);
  };

  const handleDeleteClick = (goalId: string) => {
    setGoalToDelete(goalId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (goalToDelete) {
      deleteGoal(goalToDelete);
      toast.success('Meta excluída com sucesso!');
      setGoalToDelete(null);
    }
  };

  const todayCompletions = goals.filter(g => isCompleted(g.id, today)).length;
  const totalStreak = allStats.reduce((sum, s) => sum + s.currentStreak, 0);
  const weeklyTotal = allStats.reduce((sum, s) => sum + s.weeklyCompletions, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MetaManager
              </h1>
              <p className="text-muted-foreground mt-1">
                {formatDateDisplay(new Date())}
              </p>
            </div>
            <Button
              onClick={() => {
                setEditingGoal(undefined);
                setDialogOpen(true);
              }}
              size="lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nova Meta
            </Button>
          </div>

          <WelcomeBanner />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Concluídas Hoje</CardTitle>
                <Target className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {todayCompletions} / {goals.length}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  {goals.length > 0 
                    ? `${Math.round((todayCompletions / goals.length) * 100)}% das metas`
                    : 'Nenhuma meta cadastrada'
                  }
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Streak Total</CardTitle>
                <TrendingUp className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalStreak}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Dias consecutivos somados
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Esta Semana</CardTitle>
                <Calendar className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{weeklyTotal}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Completions semanais
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Goals List */}
        <div className="space-y-4">
          {goals.length === 0 ? (
            <Card className="p-12 text-center">
              <EmptyState
                icon={Target}
                title="Nenhuma meta cadastrada"
                description="Comece criando sua primeira meta e acompanhe seu progresso!"
                action={
                  <Button onClick={() => setDialogOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Criar Primeira Meta
                  </Button>
                }
              />
            </Card>
          ) : (
            goals.map((goal) => {
              const stats = getGoalStats(goal.id);
              return (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  stats={stats}
                  isCompletedToday={isCompleted(goal.id, today)}
                  onToggleComplete={() => toggleCompletion(goal.id, today)}
                  onEdit={() => handleEdit(goal)}
                  onDelete={() => handleDeleteClick(goal.id)}
                />
              );
            })
          )}
        </div>

        {/* Goal Dialog */}
        <GoalDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open);
            if (!open) setEditingGoal(undefined);
          }}
          onSave={handleCreateOrUpdate}
          editGoal={editingGoal}
        />

        {/* Delete Confirmation Dialog */}
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Excluir Meta</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja excluir esta meta? Esta ação não pode ser desfeita
                e todos os registros de progresso serão perdidos.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteConfirm} className="bg-red-600 hover:bg-red-700">
                Excluir
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}