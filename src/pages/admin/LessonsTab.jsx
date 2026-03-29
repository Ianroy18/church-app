import { Plus, Upload, BookOpen, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

function LessonsTab({ lessons, title, setTitle, desc, setDesc, file, setFile, handleUploadLesson, deleteRecord }) {
  const card = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    borderRadius: '24px',
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div className="rounded-[24px] overflow-hidden" style={{ background: '#0b0f18', border: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="p-7">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-9 h-9 rounded-2xl flex items-center justify-center bg-green-500/10">
              <Plus size={18} className="text-green-500" />
            </div>
            <h3 className="font-black text-sm text-white">New Module</h3>
          </div>
          <div className="space-y-3">
            <Input placeholder="Lesson title..." value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5 border-white/10 text-white" />
            <Textarea placeholder="Module description..." value={desc} onChange={e => setDesc(e.target.value)} className="bg-white/5 border-white/10 text-white" />
            <label className="flex flex-col items-center justify-center h-24 rounded-2xl border-dashed border-white/10 bg-white/5 cursor-pointer">
              <Upload size={20} className="text-white/20" />
              <span className="text-[10px] font-black uppercase text-white/30">{file ? file.name : 'Upload PDF'}</span>
              <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
            </label>
            <Button onClick={handleUploadLesson} className="w-full bg-green-500 hover:bg-green-600 font-black uppercase tracking-widest text-[10px]">Publish</Button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 space-y-3">
        {lessons.map(l => (
          <div key={l.id} style={card} className="p-5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <BookOpen className="text-purple-500" />
              <div>
                <h4 className="font-black text-sm text-slate-900">{l.title}</h4>
              </div>
            </div>
            <button onClick={() => deleteRecord('lessons', l.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonsTab;
