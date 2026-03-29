import { Newspaper, Send, ImagePlus } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';

function MagazineTab({ adminDescription, setAdminDescription, imageUrlFromStorage, setImageUrlFromStorage, magazineLoading, handlePostMagazine }) {
  const card = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    borderRadius: '24px',
  };

  return (
    <div className="max-w-2xl mx-auto" style={card}>
      <div className="p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-2xl flex items-center justify-center bg-green-50 text-green-600">
            <Newspaper size={22} />
          </div>
          <div>
            <h2 className="font-black text-lg text-slate-800">Magazine Portal</h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Post directly to the public feed</p>
          </div>
        </div>

        <form onSubmit={handlePostMagazine} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Caption / Description</label>
            <Textarea
              placeholder="Write something about the magazine issue..."
              value={adminDescription}
              onChange={(e) => setAdminDescription(e.target.value)}
              className="rounded-2xl border-slate-100 bg-slate-50 focus:ring-green-500 min-h-[120px]"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Magazine Cover Image URL</label>
            <div className="relative">
              <ImagePlus className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <Input
                placeholder="Paste image URL here..."
                value={imageUrlFromStorage}
                onChange={(e) => setImageUrlFromStorage(e.target.value)}
                className="pl-12 rounded-2xl border-slate-100 bg-slate-50 focus:ring-green-500 h-[52px]"
              />
            </div>
          </div>

          {imageUrlFromStorage && (
            <div className="rounded-2xl overflow-hidden border border-slate-100 h-40 bg-slate-50">
              <img src={imageUrlFromStorage} className="w-full h-full object-cover opacity-50" alt="Preview" />
            </div>
          )}

          <Button
            disabled={magazineLoading}
            type="submit"
            className="w-full h-[56px] rounded-2xl bg-[#0b0f18] hover:bg-[#1a2030] text-white font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 shadow-xl shadow-slate-200 transition-all active:scale-[0.98]"
          >
            {magazineLoading ? 'Posting...' : <><Send size={16} /> Post to Feed</>}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default MagazineTab;
