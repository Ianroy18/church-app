import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import jsPDF from 'jspdf';
import {
  Trash2, Award, Users, BookOpen,
  CheckCircle2, Plus, Search,
  Camera, TrendingUp, Upload, ScanLine,
  ImagePlus, Send, Newspaper
} from 'lucide-react';

import { supabase } from "../../supabase";
import AdminSidebar from "../../components/AdminSidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import UsersTab from "./UsersTab";
import LessonsTab from "./LessonsTab";
import AttendanceTab from "./AttendanceTab";
import ScannerTab from "./ScannerTab";
import CertTab from "./CertTab";
import MagazineTab from "./MagazineTab";

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('lessons');
  const [usersList, setUsersList] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [stats, setStats] = useState({ users: 0, lessons: 0, attendance: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  // Lessons State
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);

  // Magazine State
  const [adminDescription, setAdminDescription] = useState('');
  const [imageUrlFromStorage, setImageUrlFromStorage] = useState('');
  const [magazineLoading, setMagazineLoading] = useState(false);

  const [certStudentName, setCertStudentName] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  // --- MAGAZINE POSTING FUNCTION ---
  const handlePostMagazine = async (e) => {
    e.preventDefault();
    if (!adminDescription || !imageUrlFromStorage) return alert("Please fill in both description and image URL.");

    setMagazineLoading(true);
    const { data, error } = await supabase
      .from('magazines')
      .insert([
        {
          description: adminDescription,
          cover_image: imageUrlFromStorage,
          author: "DICT Admin" // Pwedeng user?.email ito kung gusto mo dynamic
        }
      ]);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Magazine Posted Successfully!");
      setAdminDescription('');
      setImageUrlFromStorage('');
    }
    setMagazineLoading(false);
  };

  useEffect(() => { fetchData(); }, [activeTab]);

  useEffect(() => {
    let scanner = null;
    if (activeTab === 'scanner') {
      scanner = new Html5QrcodeScanner('reader', { fps: 10, qrbox: { width: 250, height: 250 } });
      scanner.render(async (decodedText) => {
        setScanResult(decodedText);
        try {
          await supabase.from('attendance').insert({
            user_id: decodedText,
            date: new Date().toLocaleDateString('en-GB'),
            time: new Date().toLocaleTimeString()
          });
        } catch (err) { console.error("Scan Error:", err); }
      });
    }
    return () => { if (scanner) scanner.clear().catch(() => { }); };
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'users') {
        const { data } = await supabase.from('users').select('*');
        setUsersList(data || []);
      } else if (activeTab === 'lessons') {
        const { data } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });
        setLessons(data || []);
      } else if (activeTab === 'attendance') {
        const { data } = await supabase.from('attendance').select('*, users(email)').order('created_at', { ascending: false });
        setAttendanceLogs(data || []);
      }
      const { count: uCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { count: lCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
      const { count: aCount } = await supabase.from('attendance').select('*', { count: 'exact', head: true });
      setStats({ users: uCount || 0, lessons: lCount || 0, attendance: aCount || 0 });
    } catch (e) { console.error("Fetch Error:", e); }
  };

  const handleUploadLesson = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file first.');
    setUploadLoading(true);
    try {
      const filePath = `lessons/${Date.now()}_${file.name}`;
      const { error: storageError } = await supabase.storage.from('files').upload(filePath, file);
      if (storageError) throw storageError;
      const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(filePath);
      await supabase.from('lessons').insert({ title, description: desc, file_url: publicUrl });
      setTitle(''); setDesc(''); setFile(null);
      fetchData();
      alert('Module published successfully!');
    } catch (e) { alert('Upload failed: ' + e.message); }
    setUploadLoading(false);
  };

  const deleteRecord = async (table, id) => {
    if (window.confirm('Delete this record?')) {
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem('demoUser');
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleGenerateCert = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFillColor(56, 142, 60); doc.rect(0, 0, 297, 210, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(8, 8, 281, 194, 'F');
    doc.setFontSize(40); doc.text('CERTIFICATE OF COMPLETION', 148.5, 60, { align: 'center' });
    doc.setFontSize(30); doc.text(certStudentName.toUpperCase(), 148.5, 110, { align: 'center' });
    doc.save(`Cert_${certStudentName}.pdf`);
  };

  const card = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    borderRadius: '24px',
  };

  const statCards = [
    { label: 'Students', value: stats.users, icon: Users, color: '#60a5fa', bg: 'rgba(96,165,250,0.08)', border: 'rgba(96,165,250,0.2)' },
    { label: 'Modules', value: stats.lessons, icon: BookOpen, color: '#a78bfa', bg: 'rgba(167,139,250,0.08)', border: 'rgba(167,139,250,0.2)' },
    { label: 'Sessions', value: stats.attendance, icon: CheckCircle2, color: '#34d399', bg: 'rgba(52,211,153,0.08)', border: 'rgba(52,211,153,0.2)' },
  ];

  const filteredUsers = usersList.filter(u => u.email?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex h-screen font-sans overflow-hidden" style={{ background: '#f1f5f3' }}>

      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      <div className="flex-1 overflow-y-auto p-4 pl-0 min-w-0" style={{ scrollbarWidth: 'none' }}>

        {/* ── HEADER ── */}
        <div className="flex justify-between items-start mb-5 gap-5">
          <div className="flex-1 p-7 rounded-[24px]" style={{ background: '#0b0f18', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-black text-white tracking-tight">Admin Dashboard</h1>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <p className="text-[10px] font-black tracking-[0.3em] uppercase" style={{ color: 'rgba(34,197,94,0.7)' }}>Grace & Truth Management Portal</p>
                </div>
              </div>
              <div className="flex gap-4">
                {statCards.map(({ label, value, icon: Icon, color, bg, border }) => (
                  <div key={label} className="px-5 py-3 rounded-2xl text-center" style={{ background: bg, border: `1px solid ${border}` }}>
                    <p className="text-2xl font-black text-white leading-none">{value}</p>
                    <p className="text-[9px] font-black tracking-widest uppercase mt-1" style={{ color }}>
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CONTENT PANELS ── */}
        <div className="pb-10">

          {/* MAGAZINE TAB (NEW) */}
          {activeTab === 'magazine' && (
            <MagazineTab
              adminDescription={adminDescription}
              setAdminDescription={setAdminDescription}
              imageUrlFromStorage={imageUrlFromStorage}
              setImageUrlFromStorage={setImageUrlFromStorage}
              magazineLoading={magazineLoading}
              handlePostMagazine={handlePostMagazine}
            />
          )}

          {/* USERS */}
          {activeTab === 'users' && (
            <div style={{ ...card, overflow: 'hidden', padding: 0 }}>
              <div className="px-4 sm:px-8 py-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(96,165,250,0.1)' }}>
                    <Users size={18} style={{ color: '#2563eb' }} />
                  </div>
                  <div>
                    <h2 className="font-black text-base" style={{ color: '#0f172a' }}>User Directory</h2>
                    <p className="text-[10px] font-bold" style={{ color: '#94a3b8' }}>{usersList.length} registered accounts</p>
                  </div>
                </div>
                <div className="relative">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2" size={15} style={{ color: '#94a3b8' }} />
                  <input
                    placeholder="Search students..."
                    className="pl-10 pr-4 h-10 text-sm rounded-xl outline-none transition-all"
                    style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)', color: '#0f172a', width: 220 }}
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px]">
                  <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <tr>
                    <th className="px-8 py-4 text-left text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#94a3b8' }}>Email Address</th>
                    <th className="px-8 py-4 text-left text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#94a3b8' }}>Role</th>
                    <th className="px-8 py-4 text-right text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#94a3b8' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={i} className="transition-all duration-150" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                      <td className="px-8 py-5 text-sm font-bold" style={{ color: '#1e293b' }}>{u.email}</td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl"
                          style={{ background: u.role === 'admin' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)', color: u.role === 'admin' ? '#dc2626' : '#16a34a' }}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button onClick={() => deleteRecord('users', u.id)} className="p-2 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
                </table>
              </div>
            </div>
          )}

          {/* LESSONS, ATTENDANCE, SCANNER, CERT sections (Keep as is from your code) */}
          {/* ... (Dito yung dating codes mo for lessons, attendance, etc.) */}

          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Upload Form Content... */}
              <div className="rounded-[24px] overflow-hidden flex-shrink-0" style={{ background: '#0b0f18', border: '1px solid rgba(255,255,255,0.06)' }}>
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
              {/* Lessons List... */}
              <div className="lg:col-span-2 space-y-3">
                {lessons.map(l => (
                  <div key={l.id} style={card} className="p-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <BookOpen className="text-purple-500" />
                      <div><h4 className="font-black text-sm">{l.title}</h4></div>
                    </div>
                    <button onClick={() => deleteRecord('lessons', l.id)} className="text-slate-300 hover:text-red-500"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'attendance' && (
            /* Attendance Logs content... */
            <div style={card} className="p-6">
              <h2 className="font-black mb-4">Live Attendance</h2>
              <div className="space-y-2">
                {attendanceLogs.map((log, i) => (
                  <div key={i} className="flex justify-between p-3 bg-slate-50 rounded-xl">
                    <span className="font-bold text-sm">{log.users?.email}</span>
                    <span className="text-xs text-green-600">{log.time}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'scanner' && (
            <div id="reader" className="max-w-md mx-auto rounded-3xl overflow-hidden border-4 border-black"></div>
          )}

          {activeTab === 'cert' && (
            <div className="max-w-md mx-auto text-center" style={card}>
              <div className="p-10">
                <Award size={40} className="mx-auto text-green-600 mb-4" />
                <Input placeholder="Student Name" value={certStudentName} onChange={e => setCertStudentName(e.target.value)} className="text-center mb-4" />
                <Button onClick={handleGenerateCert} className="w-full bg-black">Download Certificate</Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;