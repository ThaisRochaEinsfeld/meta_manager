import { useGoals } from '../hooks/useGoals';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend } from 'recharts';
import { Badge } from '../components/ui/badge';
import { EmptyState } from '../components/empty-state';
import { Flame, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { getWeekRange, getDaysInRange, formatDate } from '../utils/date-helpers';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function Progress() {
  const { goals, getGoalStats, getGoalCompletions } = useGoals();
  const allStats = goals.map(goal => ({
    goal,
    stats: getGoalStats(goal.id),
  }));

  // Prepare weekly data for chart
  const weekRange = getWeekRange();
  const weekDays = getDaysInRange(weekRange.start, weekRange.end);
  
  const weeklyData = weekDays.map(day => {
    const dateStr = formatDate(day);
    const completionsCount = goals.reduce((count, goal) => {
      const completions = getGoalCompletions(goal.id);
      return count + (completions.some(c => c.date === dateStr) ? 1 : 0);
    }, 0);

    return {
      date: format(day, 'EEE', { locale: ptBR }),
      completions: completionsCount,
      fullDate: format(day, 'dd/MM'),
    };
  });

  // Prepare goals comparison data
  const goalsComparisonData = allStats.map(({ goal, stats }) => ({
    name: goal.title.length > 15 ? goal.title.substring(0, 15) + '...' : goal.title,
    streak: stats.currentStreak,
    semanal: stats.weeklyCompletions,
    mensal: stats.monthlyCompletions,
  }));

  const totalCompletions = allStats.reduce((sum, { stats }) => stats.totalCompletions, 0);
  const averageStreak = allStats.length > 0 
    ? Math.round(allStats.reduce((sum, { stats }) => sum + stats.currentStreak, 0) / allStats.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Progresso e Estatísticas
          </h1>
          <p className="text-muted-foreground">
            Acompanhe sua evolução e veja suas conquistas
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="h-4 w-4 text-yellow-500" />
                Total de Metas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{goals.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-500" />
                Total Completions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalCompletions}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Flame className="h-4 w-4 text-orange-500" />
                Média de Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{averageStreak}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" />
                Esta Semana
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {allStats.reduce((sum, { stats }) => sum + stats.weeklyCompletions, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Weekly Progress Chart */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Progresso Semanal</CardTitle>
            <CardDescription>
              Metas concluídas por dia da semana
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis allowDecimals={false} />
                <Tooltip 
                  labelFormatter={(label, payload) => {
                    if (payload && payload[0]) {
                      return payload[0].payload.fullDate;
                    }
                    return label;
                  }}
                />
                <Bar dataKey="completions" fill="#3b82f6" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Goals Comparison Chart */}
        {goals.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Comparação de Metas</CardTitle>
              <CardDescription>
                Performance de cada meta (streak, semanal e mensal)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={goalsComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="streak" stroke="#f97316" strokeWidth={2} name="Streak Atual" />
                  <Line type="monotone" dataKey="semanal" stroke="#3b82f6" strokeWidth={2} name="Semanal" />
                  <Line type="monotone" dataKey="mensal" stroke="#10b981" strokeWidth={2} name="Mensal" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Individual Goal Stats */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold mb-4">Estatísticas por Meta</h2>
          
          {goals.length === 0 ? (
            <Card className="p-8 text-center">
              <EmptyState
                icon={TrendingUp}
                title="Nenhuma meta cadastrada"
                description="Crie suas primeiras metas para ver estatísticas e gráficos de progresso!"
              />
            </Card>
          ) : (
            allStats.map(({ goal, stats }) => (
              <Card key={goal.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <div
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: goal.color }}
                        />
                        {goal.title}
                      </CardTitle>
                      <CardDescription>{goal.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground mb-1">Streak Atual</span>
                      <div className="flex items-center gap-1">
                        <Flame className="h-4 w-4 text-orange-500" />
                        <span className="text-2xl font-bold">{stats.currentStreak}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground mb-1">Maior Streak</span>
                      <div className="flex items-center gap-1">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-2xl font-bold">{stats.longestStreak}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground mb-1">Esta Semana</span>
                      <span className="text-2xl font-bold">{stats.weeklyCompletions}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground mb-1">Este Mês</span>
                      <span className="text-2xl font-bold">{stats.monthlyCompletions}</span>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-sm text-muted-foreground mb-1">Total</span>
                      <span className="text-2xl font-bold">{stats.totalCompletions}</span>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Taxa de conclusão (30 dias)</span>
                      <Badge variant="secondary">
                        {stats.completionRate.toFixed(1)}%
                      </Badge>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all"
                        style={{
                          width: `${Math.min(stats.completionRate, 100)}%`,
                          backgroundColor: goal.color,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}