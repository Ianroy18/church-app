import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import jsPDF from 'jspdf';
import {
  Trash2, Award, Users, BookOpen,
  CheckCircle2, Plus, Search,
  Camera, TrendingUp, Upload, ScanLine
} from 'lucide-react';

import { supabase } from "../../supabase";
import AdminSidebar from "../../components/AdminSidebar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('lessons');
  const [usersList, setUsersList] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [stats, setStats] = useState({ users: 0, lessons: 0, attendance: 0 });
  const [searchQuery, setSearchQuery] = useState('');

  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [certStudentName, setCertStudentName] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

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
        <div>

          {/* USERS */}
          {activeTab === 'users' && (
            <div style={{ ...card, overflow: 'hidden', padding: 0 }}>
              <div className="px-8 py-6 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
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
                    onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)'; e.target.style.background = 'rgba(34,197,94,0.03)'; }}
                    onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.07)'; e.target.style.background = 'rgba(0,0,0,0.04)'; }}
                  />
                </div>
              </div>

              <table className="w-full">
                <thead style={{ background: 'rgba(0,0,0,0.02)' }}>
                  <tr>
                    <th className="px-8 py-4 text-left text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#94a3b8' }}>Email Address</th>
                    <th className="px-8 py-4 text-left text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#94a3b8' }}>Role</th>
                    <th className="px-8 py-4 text-right text-[9px] font-black tracking-[0.3em] uppercase" style={{ color: '#94a3b8' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u, i) => (
                    <tr key={i} className="transition-all duration-150"
                      style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}
                      onMouseEnter={e => e.currentTarget.style.background = 'rgba(0,0,0,0.015)'}
                      onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                      <td className="px-8 py-5 text-sm font-bold" style={{ color: '#1e293b' }}>{u.email}</td>
                      <td className="px-8 py-5">
                        <span className="text-[10px] font-black uppercase tracking-wider px-3 py-1.5 rounded-xl"
                          style={{ background: u.role === 'admin' ? 'rgba(239,68,68,0.08)' : 'rgba(34,197,94,0.08)', color: u.role === 'admin' ? '#dc2626' : '#16a34a' }}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <button
                          onClick={() => deleteRecord('users', u.id)}
                          className="p-2 rounded-xl transition-all duration-200"
                          style={{ color: '#cbd5e1' }}
                          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cbd5e1'; }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredUsers.length === 0 && (
                <div className="text-center py-12" style={{ color: '#94a3b8' }}>
                  <Users size={36} className="mx-auto mb-3 opacity-20" />
                  <p className="text-sm font-bold">No users found</p>
                </div>
              )}
            </div>
          )}

          {/* LESSONS */}
          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

              {/* Upload Form */}
              <div className="rounded-[24px] overflow-hidden flex-shrink-0" style={{ background: '#0b0f18', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)' }} />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.1)' }}>
                      <Plus size={18} style={{ color: '#22c55e' }} />
                    </div>
                    <div>
                      <h3 className="font-black text-sm text-white">New Module</h3>
                      <p className="text-[9px] font-bold tracking-wider uppercase" style={{ color: 'rgba(255,255,255,0.3)' }}>Publish content</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <input
                      placeholder="Lesson title..."
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      className="w-full h-[48px] px-4 text-sm font-medium text-white outline-none rounded-2xl transition-all"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)'; e.target.style.background = 'rgba(34,197,94,0.05)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                    />
                    <textarea
                      placeholder="Module description..."
                      value={desc}
                      onChange={e => setDesc(e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 text-sm font-medium text-white outline-none rounded-2xl transition-all resize-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                      onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)'; e.target.style.background = 'rgba(34,197,94,0.05)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(255,255,255,0.08)'; e.target.style.background = 'rgba(255,255,255,0.05)'; }}
                    />

                    {/* File upload zone */}
                    <label className="flex flex-col items-center justify-center gap-2 h-24 rounded-2xl cursor-pointer transition-all"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.12)' }}
                      onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(34,197,94,0.4)'; e.currentTarget.style.background = 'rgba(34,197,94,0.04)'; }}
                      onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)'; e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    >
                      <Upload size={20} style={{ color: file ? '#22c55e' : 'rgba(255,255,255,0.2)' }} />
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: file ? '#22c55e' : 'rgba(255,255,255,0.3)' }}>
                        {file ? file.name.substring(0, 25) + '...' : 'Upload PDF File'}
                      </span>
                      <input type="file" className="hidden" onChange={e => setFile(e.target.files[0])} />
                    </label>

                    <button
                      onClick={handleUploadLesson}
                      disabled={uploadLoading}
                      className="w-full h-12 font-black text-[11px] tracking-[0.2em] uppercase text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-60"
                      style={{ background: 'linear-gradient(135deg, #22c55e, #16a34a)', boxShadow: '0 8px 24px rgba(34,197,94,0.2)' }}
                    >
                      {uploadLoading ? 'Publishing...' : <><Plus size={14} /> Publish Module</>}
                    </button>
                  </div>
                </div>
              </div>

              {/* Published lessons */}
              <div className="lg:col-span-2 space-y-3">
                <h3 className="text-sm font-black tracking-tight mb-4" style={{ color: '#0f172a' }}>Published Modules ({lessons.length})</h3>
                {lessons.map(l => (
                  <div key={l.id} className="flex items-center gap-5 p-5 transition-all duration-200 hover:-translate-x-0.5" style={{ ...card, padding: '20px 24px' }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.1)'}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = '0 4px 24px rgba(0,0,0,0.05)'}
                  >
                    <div className="w-11 h-11 rounded-2xl flex items-center justify-center flex-shrink-0 transition-all duration-300" style={{ background: 'rgba(167,139,250,0.1)' }}>
                      <BookOpen size={20} style={{ color: '#7c3aed' }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-sm truncate" style={{ color: '#0f172a' }}>{l.title}</p>
                      <p className="text-[11px] mt-1 truncate" style={{ color: '#94a3b8' }}>{l.description?.substring(0, 70)}...</p>
                    </div>
                    <button
                      onClick={() => deleteRecord('lessons', l.id)}
                      className="p-2 rounded-xl transition-all duration-200 flex-shrink-0"
                      style={{ color: '#cbd5e1' }}
                      onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#ef4444'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#cbd5e1'; }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                {lessons.length === 0 && (
                  <div className="text-center py-16 rounded-[24px]" style={{ background: 'rgba(0,0,0,0.02)', border: '1px dashed rgba(0,0,0,0.08)', color: '#94a3b8' }}>
                    <BookOpen size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-bold">No modules yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ATTENDANCE */}
          {activeTab === 'attendance' && (
            <div style={{ ...card, overflow: 'hidden', padding: 0 }}>
              <div className="px-8 py-6 flex justify-between items-center" style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(52,211,153,0.1)' }}>
                    <CheckCircle2 size={18} style={{ color: '#059669' }} />
                  </div>
                  <div>
                    <h2 className="font-black text-base" style={{ color: '#0f172a' }}>Attendance Feed</h2>
                    <p className="text-[10px] font-bold" style={{ color: '#94a3b8' }}>Live session tracking</p>
                  </div>
                </div>
                <span className="text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-xl" style={{ background: 'rgba(34,197,94,0.08)', color: '#16a34a' }}>
                  {attendanceLogs.length} Records
                </span>
              </div>

              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-3">
                {attendanceLogs.map((log, i) => (
                  <div key={i} className="flex justify-between items-center px-5 py-4 rounded-2xl transition-all duration-200"
                    style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.04)' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(34,197,94,0.03)'; e.currentTarget.style.borderColor = 'rgba(34,197,94,0.12)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(0,0,0,0.02)'; e.currentTarget.style.borderColor = 'rgba(0,0,0,0.04)'; }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.08)' }}>
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      </div>
                      <div>
                        <p className="font-bold text-sm" style={{ color: '#0f172a' }}>{log.users?.email || 'Unknown Student'}</p>
                        <p className="text-[9px] font-black uppercase tracking-wider mt-0.5" style={{ color: '#94a3b8' }}>{log.user_id?.substring(0, 12)}...</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-sm" style={{ color: '#0f172a' }}>{log.time}</p>
                      <p className="text-[10px] font-bold mt-0.5" style={{ color: '#22c55e' }}>{log.date}</p>
                    </div>
                  </div>
                ))}
                {attendanceLogs.length === 0 && (
                  <div className="col-span-2 text-center py-16" style={{ color: '#94a3b8' }}>
                    <CheckCircle2 size={40} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm font-bold">No sessions recorded yet</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* QR SCANNER */}
          {activeTab === 'scanner' && (
            <div className="max-w-xl mx-auto space-y-5">
              <div className="text-center mb-4">
                <h2 className="text-lg font-black" style={{ color: '#0f172a' }}>QR Attendance Scanner</h2>
                <p className="text-xs font-bold mt-1" style={{ color: '#94a3b8' }}>Position the student's QR code within the frame</p>
              </div>

              <div className="overflow-hidden rounded-[24px]" style={{ background: '#0b0f18', border: '1px solid rgba(255,255,255,0.06)', padding: '8px' }}>
                <div id="reader" className="rounded-[18px] overflow-hidden" />
              </div>

              {scanResult ? (
                <div className="flex items-center gap-4 px-6 py-5 rounded-[20px]" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
                  <div className="w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(34,197,94,0.15)' }}>
                    <CheckCircle2 size={20} style={{ color: '#22c55e' }} />
                  </div>
                  <div>
                    <p className="font-black text-sm" style={{ color: '#0f172a' }}>Attendance Recorded</p>
                    <p className="text-xs mt-0.5 font-mono" style={{ color: '#64748b' }}>{scanResult}</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-[18px]" style={{ background: 'rgba(0,0,0,0.03)', border: '1px dashed rgba(0,0,0,0.1)' }}>
                  <ScanLine size={16} style={{ color: '#94a3b8' }} />
                  <p className="text-[11px] font-black uppercase tracking-widest" style={{ color: '#94a3b8' }}>Awaiting scan...</p>
                </div>
              )}
            </div>
          )}

          {/* CERTIFICATE */}
          {activeTab === 'cert' && (
            <div className="max-w-md mx-auto">
              <div className="rounded-[28px] overflow-hidden" style={{ ...card, padding: 0 }}>
                {/* Top bar */}
                <div className="h-1.5 w-full" style={{ background: 'linear-gradient(90deg, #22c55e, #16a34a)' }} />

                <div className="p-10 text-center">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'rgba(34,197,94,0.08)', boxShadow: 'inset 0 0 0 1px rgba(34,197,94,0.15)' }}>
                    <Award size={40} style={{ color: '#16a34a' }} />
                  </div>

                  <h2 className="text-xl font-black tracking-tight mb-2" style={{ color: '#0f172a' }}>Issue Certificate</h2>
                  <p className="text-xs font-bold mb-8" style={{ color: '#94a3b8' }}>Generate an official completion document for a student</p>

                  <div className="space-y-4">
                    <input
                      placeholder="STUDENT FULL NAME"
                      className="w-full h-[56px] px-5 text-center font-black uppercase text-sm tracking-wider outline-none rounded-2xl transition-all"
                      style={{ background: 'rgba(0,0,0,0.03)', border: '1px solid rgba(0,0,0,0.08)', color: '#0f172a' }}
                      value={certStudentName}
                      onChange={e => setCertStudentName(e.target.value)}
                      onFocus={e => { e.target.style.borderColor = 'rgba(34,197,94,0.4)'; e.target.style.background = 'rgba(34,197,94,0.03)'; }}
                      onBlur={e => { e.target.style.borderColor = 'rgba(0,0,0,0.08)'; e.target.style.background = 'rgba(0,0,0,0.03)'; }}
                    />
                    <button
                      onClick={handleGenerateCert}
                      disabled={!certStudentName}
                      className="w-full h-[52px] font-black text-[11px] tracking-[0.2em] uppercase text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40"
                      style={{ background: '#0b0f18', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}
                      onMouseEnter={e => { if (certStudentName) { e.currentTarget.style.background = '#1a2030'; e.currentTarget.style.transform = 'translateY(-1px)'; } }}
                      onMouseLeave={e => { e.currentTarget.style.background = '#0b0f18'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <Award size={15} /> Download PDF Certificate
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;