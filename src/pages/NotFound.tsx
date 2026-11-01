import { Link } from 'react-router-dom';
import { Orbit } from 'lucide-react';
export default function NotFound(){return <main className="flex min-h-[70vh] flex-col items-center justify-center gap-5 text-center"><Orbit size={48} className="text-primary"/><p className="eyebrow">404 · A MOMENT OFF THE MAP</p><h1 className="page-title">Let’s find your way back.</h1><p className="text-muted-foreground">This page doesn’t exist in the LifeSphere demo.</p><Link to="/" className="btn">Back to overview</Link></main>;}
