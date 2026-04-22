import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Pencil, Trash2, X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StatusBadge } from '../components/Badge';
import type { ProgramSLO } from '../types';

function SLOForm({ initial, onSave, onCancel }: {
  initial: Partial<ProgramSLO>;
  onSave: (data: Partial<ProgramSLO>) => void;
  onCancel: () => void;
}) {
  const [form, setForm] = useState(initial);
  const set = (k: keyof ProgramSLO, v: string | number) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="bg-brand-50 border border-brand-200 rounded-lg p-4 space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">SLO Number</label>
          <input type="number" value={form.slo_number ?? ''} onChange={e => set('slo_number', Number(e.target.value))}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Short Label</label>
          <input value={form.short_label ?? ''} onChange={e => set('short_label', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="e.g. Critical Analysis" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Full Statement</label>
        <textarea value={form.full_statement ?? ''} onChange={e => set('full_statement', e.target.value)} rows={3}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" placeholder="Students will be able to..." />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Category (optional)</label>
          <input value={form.category ?? ''} onChange={e => set('category', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Effective Date</label>
          <input type="date" value={form.effective_date ?? ''} onChange={e => set('effective_date', e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">Notes (optional)</label>
        <input value={form.notes ?? ''} onChange={e => set('notes', e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500" />
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button onClick={onCancel} className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded hover:bg-gray-50"><X size={14} /> Cancel</button>
        <button onClick={() => onSave(form)} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-brand-600 text-white rounded hover:bg-brand-700"><Check size={14} /> Save SLO</button>
      </div>
    </div>
  );
}

export default function ProgramSLOs() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const { programs, programSLOs } = state;

  const program = programs.find(p => p.program_id === id);
  const slos = programSLOs.filter(s => s.program_id === id).sort((a, b) => a.slo_number - b.slo_number);

  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);

  const handleAdd = (data: Partial<ProgramSLO>) => {
    if (!data.short_label || !data.full_statement) return;
    dispatch({
      type: 'ADD_PROGRAM_SLO',
      payload: {
        slo: {
          program_slo_id: `pslo-${Date.now()}`,
          program_id: id!,
          slo_number: data.slo_number ?? slos.length + 1,
          short_label: data.short_label,
          full_statement: data.full_statement,
          category: data.category,
          status: 'active',
          effective_date: data.effective_date,
          notes: data.notes,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      },
    });
    setAdding(false);
  };

  const handleUpdate = (slo: ProgramSLO, data: Partial<ProgramSLO>) => {
    dispatch({ type: 'UPDATE_PROGRAM_SLO', payload: { slo: { ...slo, ...data, updated_at: new Date().toISOString() } } });
    setEditing(null);
  };

  const handleDelete = (slo_id: string) => {
    if (confirm('Delete this SLO? Existing mappings will be affected.')) {
      dispatch({ type: 'DELETE_PROGRAM_SLO', payload: { program_slo_id: slo_id } });
    }
  };

  if (!program) return <div className="p-8 text-gray-500">Program not found.</div>;

  return (
    <div>
      <div className="px-8 pt-6 pb-6 bg-white border-b border-gray-200">
        <Link to={`/programs/${id}`} className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3">
          <ArrowLeft size={14} /> {program.program_name}
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Program SLOs</h1>
            <p className="text-sm text-gray-500 mt-1">{program.program_code} · {slos.length} outcomes</p>
          </div>
          {!adding && (
            <button onClick={() => setAdding(true)} className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-medium px-4 py-2 rounded-lg">
              <Plus size={16} /> Add SLO
            </button>
          )}
        </div>
      </div>

      <div className="p-8 space-y-4">
        {adding && (
          <SLOForm
            initial={{ slo_number: slos.length + 1, status: 'active' }}
            onSave={handleAdd}
            onCancel={() => setAdding(false)}
          />
        )}

        {slos.length === 0 && !adding && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-lg">No SLOs yet.</p>
            <p className="text-sm mt-1">Click "Add SLO" to create the first outcome for this program.</p>
          </div>
        )}

        {slos.map(slo => (
          <div key={slo.program_slo_id} className="bg-white rounded-xl border border-gray-200">
            {editing === slo.program_slo_id ? (
              <div className="p-4">
                <SLOForm
                  initial={slo}
                  onSave={data => handleUpdate(slo, data)}
                  onCancel={() => setEditing(null)}
                />
              </div>
            ) : (
              <div className="flex items-start gap-4 px-6 py-5">
                <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 flex items-center justify-center font-bold shrink-0">
                  {slo.slo_number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-gray-900">{slo.short_label}</span>
                    <StatusBadge status={slo.status} />
                    {slo.category && <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 text-xs">{slo.category}</span>}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{slo.full_statement}</p>
                  {slo.notes && <p className="text-xs text-gray-400 mt-1 italic">{slo.notes}</p>}
                  {slo.effective_date && <p className="text-xs text-gray-400 mt-0.5">Effective: {slo.effective_date}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => setEditing(slo.program_slo_id)} className="p-1.5 rounded hover:bg-gray-100 text-gray-400 hover:text-gray-700">
                    <Pencil size={14} />
                  </button>
                  <button onClick={() => handleDelete(slo.program_slo_id)} className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-600">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
