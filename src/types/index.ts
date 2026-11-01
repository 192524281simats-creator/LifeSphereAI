export interface EventRecord { id: string; name: string; occasion: string; date: string; location: string; guests: number; budget: number; theme: string; }
export interface Task { id: string; title: string; done: boolean; }
export interface Expense { id: string; category: string; amount: number; }
export interface Guest { id: string; name: string; dietary: string; rsvp: boolean; checked: boolean; }
export interface Resource { id: string; title: string; quantity: number; type: string; claimed: boolean; }
export interface Memory { id: string; image: string; caption: string; }
export interface Message { role: 'user' | 'assistant'; text: string; }
export interface DemoState { events: EventRecord[]; activeId: string; tasks: Task[]; expenses: Expense[]; guests: Guest[]; resources: Resource[]; memories: Memory[]; messages: Message[]; name: string; }
