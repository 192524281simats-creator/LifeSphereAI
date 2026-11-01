import type { DemoState } from '@/types';
export const INITIAL_STATE: DemoState = {
 name: 'Alex', activeId: 'spring', events: [
 { id: 'spring', name: 'Community Spring Celebration', occasion: 'Community celebration', date: '2027-03-22', location: 'Riverside Community Garden', guests: 60, budget: 25000, theme: 'Garden gathering' },
 { id: 'birthday', name: 'Maya’s Birthday', occasion: 'Birthday', date: '2027-03-28', location: 'Community Hall', guests: 25, budget: 12000, theme: 'Floral celebration' },
 { id: 'kindness', name: 'A Day of Kindness', occasion: 'Community celebration', date: '2027-04-05', location: 'Neighbourhood Centre', guests: 40, budget: 8000, theme: 'Give back together' }],
 tasks: [{ id: '1', title: 'Confirm the garden venue', done: true }, { id: '2', title: 'Finalize the catering menu', done: false }, { id: '3', title: 'Send guest invitations', done: false }, { id: '4', title: 'Arrange reusable decorations', done: true }, { id: '5', title: 'Check accessible entrances', done: false }],
 expenses: [{ id: '1', category: 'Venue', amount: 5000 }, { id: '2', category: 'Catering', amount: 7200 }, { id: '3', category: 'Decorations', amount: 1800 }],
 guests: [{ id: '1', name: 'Jamie Rivera', dietary: 'Vegetarian', rsvp: true, checked: false }, { id: '2', name: 'Priya Shah', dietary: 'No restrictions', rsvp: true, checked: false }, { id: '3', name: 'Sam Chen', dietary: 'Vegan', rsvp: false, checked: false }],
 resources: [{ id: '1', title: 'Reusable celebration decorations', quantity: 20, type: 'Resource sharing', claimed: false }, { id: '2', title: 'Volunteer at the community garden', quantity: 6, type: 'Volunteering', claimed: false }], memories: [], messages: []
};
export const money = (value: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
export const dateLabel = (date: string) => new Date(date + 'T12:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
