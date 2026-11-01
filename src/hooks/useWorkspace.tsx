import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { INITIAL_STATE } from '@/constants/demo';
import { toast } from 'sonner';
import type { DemoState } from '@/types';
interface WorkspaceContext { state: DemoState; update: (fn: (state: DemoState) => DemoState) => void; reset: () => void; }
const Context = createContext<WorkspaceContext | null>(null);
export function WorkspaceProvider({ children }: { children: ReactNode }) {
 const [state, setState] = useState<DemoState>(() => { const saved = localStorage.getItem('lifesphere-demo-v1'); return saved ? JSON.parse(saved) as DemoState : structuredClone(INITIAL_STATE); });
 useEffect(() => { try { localStorage.setItem('lifesphere-demo-v1', JSON.stringify(state)); } catch { toast.error('Browser storage is full or unavailable. Export your data and remove some memories; latest changes may not persist.'); } }, [state]);
 const update = (fn: (state: DemoState) => DemoState) => setState(fn);
 return <Context.Provider value={{ state, update, reset: () => setState(structuredClone(INITIAL_STATE)) }}>{children}</Context.Provider>;
}
export function useWorkspace() { const context = useContext(Context); if (!context) throw new Error('Workspace provider missing'); return context; }
