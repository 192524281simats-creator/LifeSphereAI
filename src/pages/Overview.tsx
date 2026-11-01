import { Link } from 'react-router-dom';
import { SlidersHorizontal, ArrowRight, Sparkles, CalendarDays, Heart, Leaf } from 'lucide-react';
import { toast } from 'sonner';
import { useWorkspace } from '@/hooks/useWorkspace';
import { dateLabel } from '@/constants/demo';
import CopilotPrompt from '@/components/features/CopilotPrompt';
import EventFeature from '@/components/features/EventFeature';
import QuickActions from '@/components/features/QuickActions';
import BudgetSummary from '@/components/features/BudgetSummary';
import TaskList from '@/components/features/TaskList';
import CommunityPreview from '@/components/features/CommunityPreview';
export default function Overview() {
 const {state}=useWorkspace(); const done=state.tasks.filter(t=>t.done).length;
 return <div className="space-y-6"><div className="flex items-start justify-between gap-4"><div><div className="mb-1.5 flex items-center gap-2 text-[11px] text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-success"/>A LITTLE PLANNING. A LOT OF POSSIBILITY.</div><h1 className="text-[28px] font-bold tracking-tight">Good things ahead, {state.name}. <span className="text-primary">✦</span></h1><p className="mt-2 text-sm text-muted-foreground">Let’s make your next moment extraordinary — together.</p></div><button onClick={()=>toast.info('Your overview shows your active event. Change it in EventEase AI.')} className="btn-secondary hidden text-xs sm:flex"><SlidersHorizontal size={14}/>Customize</button></div>
 <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]"><CopilotPrompt/><EventFeature/></div>
 <QuickActions/>
 <div className="grid gap-5 xl:grid-cols-[1.4fr_1fr]"><div className="space-y-5"><section className="panel p-5"><div className="mb-5 flex items-center justify-between"><h2 className="section-title text-base">On your horizon</h2><Link to="/calendar" className="flex items-center gap-1 text-xs text-primary">View calendar <ArrowRight size={13}/></Link></div><div className="space-y-4">{state.events.slice(1).map((e,i)=><Link to="/events" key={e.id} className="flex items-center gap-4"><div className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-xl ${i?'bg-secondary text-primary':'bg-accent text-accent-foreground'}`}><span className="text-[9px] font-semibold uppercase">{dateLabel(e.date).split(' ')[0]}</span><span className="text-lg font-semibold">{dateLabel(e.date).split(' ')[1]}</span></div><div className="flex-1"><h3 className="text-sm font-semibold">{e.name}</h3><p className="mt-1 text-[11px] text-muted-foreground">{e.occasion} · {e.guests} guests</p></div><span className="hidden rounded-full bg-background px-3 py-1.5 text-[10px] text-muted-foreground sm:block">Let’s get planning</span><CalendarDays size={16} className="text-muted-foreground"/></Link>)}</div></section><CommunityPreview/></div><div className="space-y-5"><BudgetSummary/><TaskList/></div></div>
 <section className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-secondary/50 px-6 py-4"><div className="flex items-center gap-3"><span className="rounded-full bg-card p-2 text-primary"><Sparkles size={18}/></span><div><p className="text-sm font-semibold">Every thoughtful choice adds up.</p><p className="mt-1 text-[11px] text-muted-foreground">Your demo journey: {done} planning milestones completed.</p></div></div><div className="flex items-center gap-6"><span className="flex items-center gap-2 text-xs text-primary"><Heart size={15}/>{done*10} demo LifePoints</span><Link to="/impact" className="flex items-center gap-2 text-xs font-semibold text-success"><Leaf size={15}/>See your impact <ArrowRight size={14}/></Link></div></section>
 </div>;
}
