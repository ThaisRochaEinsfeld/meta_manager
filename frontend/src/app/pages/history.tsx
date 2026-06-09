import { useState } from "react";
import { useGoals } from "../hooks/useGoals";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Calendar } from "../components/ui/calendar";
import { Badge } from "../components/ui/badge";
import { EmptyState } from "../components/empty-state";
import { formatDate, parseDateString } from "../utils/date-helpers";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CheckCircle2, Clock, CalendarDays } from "lucide-react";

export function History() {
  const { goals, completions, getGoalCompletions } = useGoals();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const selectedDateStr = formatDate(selectedDate);
  const dayCompletions = completions.filter((c) => c.date === selectedDateStr);

  // Get all dates with completions for calendar highlighting
  const completedDates = Array.from(new Set(completions.map((c) => c.date)));

  // Group all completions by date for history list
  const completionsByDate = completions.reduce((acc, completion) => {
    if (!acc[completion.date]) {
      acc[completion.date] = [];
    }
    acc[completion.date].push(completion);
    return acc;
  }, {} as Record<string, typeof completions>);

  const sortedDates = Object.keys(completionsByDate).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  const modifiers = {
    completed: completedDates.map((d) => parseDateString(d)),
  };

  const modifiersStyles = {
    completed: {
      backgroundColor: "#3b82f6",
      color: "white",
      fontWeight: "bold",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Histórico
          </h1>
          <p className="text-muted-foreground">
            Visualize seu histórico de completions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5" />
                Calendário
              </CardTitle>
              <CardDescription>
                Dias marcados têm metas concluídas
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                selected={selectedDate}
                onSelect={(date) => setSelectedDate(date)}
                modifiers={modifiers}
              />
            </CardContent>
          </Card>

          {/* Selected Day Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>
                {format(selectedDate, "dd 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </CardTitle>
              <CardDescription>
                {dayCompletions.length > 0
                  ? `${dayCompletions.length} ${
                      dayCompletions.length === 1
                        ? "meta concluída"
                        : "metas concluídas"
                    }`
                  : "Nenhuma meta concluída neste dia"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {dayCompletions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Clock className="h-12 w-12 text-gray-300 mb-4" />
                  <p className="text-muted-foreground">
                    Nenhuma atividade registrada neste dia
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dayCompletions.map((completion) => {
                    const goal = goals.find((g) => g.id === completion.goalId);
                    if (!goal) return null;

                    return (
                      <div
                        key={completion.id}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-card"
                      >
                        <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: goal.color }}
                            />
                            <span className="font-semibold">{goal.title}</span>
                          </div>
                          {goal.description && (
                            <p className="text-sm text-muted-foreground mb-2">
                              {goal.description}
                            </p>
                          )}
                          <span className="text-xs text-muted-foreground">
                            Concluída às{" "}
                            {format(new Date(completion.completedAt), "HH:mm")}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Complete History Timeline */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Linha do Tempo Completa</CardTitle>
            <CardDescription>
              Histórico completo de todas as completions
            </CardDescription>
          </CardHeader>
          <CardContent>
            {sortedDates.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <EmptyState
                  icon={Clock}
                  title="Nenhuma atividade registrada"
                  description="Comece marcando suas metas como concluídas para ver o histórico completo aqui!"
                />
              </div>
            ) : (
              <div className="space-y-6">
                {sortedDates.slice(0, 30).map((date) => {
                  const dateCompletions = completionsByDate[date];
                  const dateObj = parseDateString(date);

                  return (
                    <div
                      key={date}
                      className="relative pl-8 pb-6 border-l-2 border-gray-200 last:border-0"
                    >
                      <div className="absolute left-0 top-0 -ml-2 flex items-center justify-center w-4 h-4 rounded-full bg-blue-500 ring-4 ring-white" />

                      <div className="mb-3">
                        <h3 className="font-semibold">
                          {format(dateObj, "dd 'de' MMMM 'de' yyyy", {
                            locale: ptBR,
                          })}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {dateCompletions.length}{" "}
                          {dateCompletions.length === 1 ? "meta" : "metas"}
                        </p>
                      </div>

                      <div className="space-y-2">
                        {dateCompletions.map((completion) => {
                          const goal = goals.find(
                            (g) => g.id === completion.goalId
                          );
                          if (!goal) return null;

                          return (
                            <div
                              key={completion.id}
                              className="flex items-center gap-2 p-2 rounded bg-gray-50"
                            >
                              <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: goal.color }}
                              />
                              <span className="text-sm flex-1">
                                {goal.title}
                              </span>
                              <Badge variant="secondary" className="text-xs">
                                {format(
                                  new Date(completion.completedAt),
                                  "HH:mm"
                                )}
                              </Badge>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {sortedDates.length > 30 && (
                  <p className="text-center text-sm text-muted-foreground">
                    Mostrando os últimos 30 dias de atividade
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
