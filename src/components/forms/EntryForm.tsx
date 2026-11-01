import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CircleAlert } from 'lucide-react';
interface Field { name: string; label: string; type?: string; value?: string; options?: string[]; }
interface Props { fields: Field[]; onSubmit: (values: Record<string,string>) => void; submitLabel: string; }
export default function EntryForm({fields,onSubmit,submitLabel}:Props) {
 const shape = Object.fromEntries(fields.map(f=>[f.name,z.string().trim().min(1,`${f.label} is required`).refine(v=>f.type!=='number'||(Number.isFinite(Number(v))&&Number(v)>0&&Number(v)<=10000000),'Enter a positive number up to 10,000,000').refine(v=>f.type!=='date'||!Number.isNaN(Date.parse(v)),'Choose a valid date')]));
 const schema=z.object(shape); const {register,handleSubmit,formState:{errors}}=useForm<Record<string,string>>({resolver:zodResolver(schema),defaultValues:Object.fromEntries(fields.map(f=>[f.name,f.value||'']))});
 return <form onSubmit={handleSubmit(values=>{console.log('Workspace form submitted',Object.keys(values));onSubmit(values);})} className="space-y-5"><div className="grid gap-5 sm:grid-cols-2">{fields.map(f=><div key={f.name}><label htmlFor={f.name}>{f.label}</label>{f.options?<select id={f.name} {...register(f.name)}>{f.options.map(o=><option key={o}>{o}</option>)}</select>:<input id={f.name} type={f.type||'text'} step={f.type==='number'?'1':undefined} {...register(f.name)}/>} {errors[f.name]&&<p role="alert" className="mt-2 flex items-center gap-1 text-sm text-destructive"><CircleAlert size={14}/>{String(errors[f.name]?.message)}</p>}</div>)}</div><button className="btn" type="submit">{submitLabel}</button></form>;
}
