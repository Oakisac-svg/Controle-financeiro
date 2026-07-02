"use client";
import { PageHeader } from "@/components/life/page-header";
import { RoutineCalendar, TimeTrackerCard, WeeklyProgress } from "@/components/routine/routine-widgets";
import { useLifeData } from "@/hooks/useLifeData";
export default function CalendarPage(){const data=useLifeData();return <div className="space-y-7"><PageHeader eyebrow="Rotina · Calendário" title="Uma semana que faz sentido." description="Visualize seus compromissos, proteja tempo de foco e ajuste o ritmo antes que a agenda decida por você."/><div className="grid gap-4 lg:grid-cols-[1.25fr_.75fr]"><RoutineCalendar/><div className="space-y-4"><TimeTrackerCard/><WeeklyProgress value={data.metrics.routine}/></div></div></div>}
