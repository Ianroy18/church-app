import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import jsPDF from 'jspdf';
import {
  FiTrash2, FiAward, FiUsers, FiBook,
  FiCheckCircle, FiPlus, FiCloudLightning,
  FiSearch, FiMaximize
} from 'react-icons/fi';

// Supabase Client
import { supabase } from "../../supabase";

// Components
import AdminSidebar from "../../components/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('lessons');
  const [usersList, setUsersList] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [stats, setStats] = useState({ users: 0, lessons: 0, attendance: 0 });

  // Form States
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [certStudentName, setCertStudentName] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // --- QR SCANNER LIFECYCLE ---
  useEffect(() => {
    let scanner = null;
    if (activeTab === 'scanner') {
      scanner = new Html5QrcodeScanner('reader', {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scanner.render(async (decodedText) => {
        setScanResult(decodedText);
        try {
          // I-save ang attendance sa database
          await supabase.from('attendance').insert({
            user_id: decodedText,
            date: new Date().toLocaleDateString('en-GB'), // DD/MM/YYYY
            time: new Date().toLocaleTimeString()
          });
          alert("Attendance Recorded: " + decodedText);
        } catch (err) {
          console.error("Scan Error:", err);
        }
      });
    }

    return () => {
      if (scanner) {
        scanner.clear().catch(error => console.error("Scanner cleanup failed", error));
      }
    };
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

      // Quick Stats Update
      const { count: uCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
      const { count: lCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
      const { count: aCount } = await supabase.from('attendance').select('*', { count: 'exact', head: true });
      setStats({ users: uCount || 0, lessons: lCount || 0, attendance: aCount || 0 });
    } catch (e) { console.error("Fetch Error:", e); }
  };

  const handleUploadLesson = async (e) => {
    e.preventDefault();
    if (!file) return alert('Pumili muna ng file.');
    setUploadLoading(true);
    try {
      const filePath = `lessons/${Date.now()}_${file.name}`;
      const { error: storageError } = await supabase.storage.from('files').upload(filePath, file);
      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(filePath);
      await supabase.from('lessons').insert({ title, description: desc, file_url: publicUrl });

      setTitle(''); setDesc(''); setFile(null);
      fetchData();
      alert('Lesson Published Successfully!');
    } catch (e) { alert('Upload failed: ' + e.message); }
    setUploadLoading(false);
  };

  const deleteRecord = async (table, id) => {
    if (window.confirm('Sigurado ka bang gusto mong i-delete ito?')) {
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

  return (
    <div className="flex h-screen bg-[#F8FAFC] font-sans overflow-hidden">

      {/* Sidebar - Naka-fixed na ang UI ani base sa imong Shadcn Sidebar code */}
      <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-8 no-scrollbar">

        {/* Dynamic Header */}
        <header className="flex justify-between items-center mb-10 bg-white p-10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] border border-slate-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <FiCloudLightning size={120} />
          </div>
          <div className="relative z-10">
            <h1 className="text-4xl font-black text-slate-900 tracking-tight italic uppercase">Admin Control</h1>
            <p className="text-emerald-500 text-xs font-black uppercase tracking-[0.4em] mt-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              Grace & Truth Management Portal
            </p>
          </div>

          <div className="flex gap-8 relative z-10">
            <div className="bg-slate-50 px-8 py-4 rounded-3xl border border-slate-100 text-center">
              <p className="text-3xl font-black text-slate-900">{stats.users}</p>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Students</p>
            </div>
            <div className="bg-emerald-500 px-8 py-4 rounded-3xl text-center shadow-[0_10px_20px_rgba(16,185,129,0.2)]">
              <p className="text-3xl font-black text-white">{stats.lessons}</p>
              <p className="text-[10px] font-black text-emerald-100 uppercase tracking-widest mt-1">Modules</p>
            </div>
          </div>
        </header>

        <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">

          {/* USERS MANAGEMENT */}
          {activeTab === 'users' && (
            <Card className="rounded-[2.5rem] border-slate-100 shadow-xl overflow-hidden bg-white">
              <CardHeader className="px-10 py-8 border-b border-slate-50">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-2xl font-black italic uppercase tracking-tight flex items-center gap-3">
                    <FiUsers className="text-emerald-500" /> User Directory
                  </CardTitle>
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <Input placeholder="Search students..." className="pl-10 rounded-xl bg-slate-50 border-none w-64" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <table className="w-full">
                  <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase font-black tracking-[0.2em]">
                    <tr>
                      <th className="px-10 py-5 text-left">Email Address</th>
                      <th className="px-10 py-5 text-left">Account Role</th>
                      <th className="px-10 py-5 text-right">Control</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {usersList.map((u, i) => (
                      <tr key={i} className="hover:bg-slate-50/80 transition-all group">
                        <td className="px-10 py-6 font-black text-slate-700 text-sm italic">{u.email}</td>
                        <td className="px-10 py-6">
                          <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                            {u.role}
                          </span>
                        </td>
                        <td className="px-10 py-6 text-right">
                          <Button variant="ghost" size="icon" className="text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-xl" onClick={() => deleteRecord('users', u.id)}>
                            <FiTrash2 size={18} />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}

          {/* LESSONS / MODULES */}
          {activeTab === 'lessons' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <Card className="rounded-[2.5rem] border-none shadow-2xl bg-slate-900 text-white p-4 h-fit">
                <CardHeader><CardTitle className="text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
                  <FiPlus className="text-emerald-400" /> New Module
                </CardTitle></CardHeader>
                <CardContent className="space-y-5">
                  <Input placeholder="Lesson Title" value={title} onChange={e => setTitle(e.target.value)} className="bg-white/5 border-white/10 text-white rounded-2xl h-14" />
                  <Textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="bg-white/5 border-white/10 text-white rounded-2xl min-h-[120px]" />
                  <Input type="file" onChange={e => setFile(e.target.files[0])} className="bg-white/5 border-white/10 text-slate-400 rounded-2xl h-14 cursor-pointer" />
                  <Button onClick={handleUploadLesson} disabled={uploadLoading} className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 rounded-2xl font-black uppercase italic tracking-widest text-xs">
                    {uploadLoading ? "Uploading..." : "Publish Module"}
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-6">
                {lessons.map(l => (
                  <Card key={l.id} className="rounded-[2rem] border-slate-100 p-8 flex justify-between items-center group hover:shadow-xl transition-all bg-white">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <FiBook size={24} />
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-lg italic uppercase leading-none">{l.title}</p>
                        <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-tighter">{l.description.substring(0, 60)}...</p>
                      </div>
                    </div>
                    <Button variant="ghost" className="text-slate-300 hover:text-red-500 rounded-2xl" onClick={() => deleteRecord('lessons', l.id)}>
                      <FiTrash2 size={20} />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* ATTENDANCE TRACKER */}
          {activeTab === 'attendance' && (
            <Card className="rounded-[2.5rem] border-none shadow-xl bg-white">
              <CardHeader className="px-10 py-8 border-b border-slate-50">
                <CardTitle className="text-2xl font-black italic uppercase flex items-center gap-3">
                  <FiCheckCircle className="text-emerald-500" /> Attendance Feed
                </CardTitle>
              </CardHeader>
              <CardContent className="p-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {attendanceLogs.map((log, i) => (
                  <div key={i} className="flex justify-between items-center p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-emerald-200 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                      </div>
                      <div>
                        <span className="font-black text-slate-800 text-sm italic">{log.users?.email || 'Unknown Student'}</span>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{log.user_id}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-black text-slate-900 leading-none">{log.time}</p>
                      <p className="text-[9px] text-emerald-600 font-black uppercase mt-1 tracking-widest">{log.date}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* QR SCANNER */}
          {activeTab === 'scanner' && (
            <div className="max-w-2xl mx-auto space-y-8">
              <Card className="rounded-[3rem] overflow-hidden border-none shadow-2xl bg-slate-900 p-2">
                <div id="reader" className="rounded-[2.5rem] overflow-hidden border-8 border-slate-800 bg-black"></div>
              </Card>
              {scanResult && (
                <div className="p-8 bg-emerald-500 text-white rounded-[2rem] font-black text-center animate-bounce shadow-2xl italic uppercase tracking-widest">
                  ✅ Student Verified: {scanResult}
                </div>
              )}
              <div className="text-center">
                <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em]">Position the QR Code within the frame</p>
              </div>
            </div>
          )}

          {/* CERTIFICATE GENERATOR */}
          {activeTab === 'cert' && (
            <Card className="max-w-xl mx-auto rounded-[3rem] p-16 text-center border-none shadow-2xl bg-white relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
              <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
                <FiAward size={48} className="text-emerald-600" />
              </div>
              <h2 className="text-3xl font-black mb-2 text-slate-900 italic uppercase">Issue Credential</h2>
              <p className="text-slate-400 text-sm mb-10 font-bold tracking-tight">Enter student details to generate official completion document.</p>
              <div className="space-y-6">
                <Input placeholder="STUDENT FULL NAME" className="py-8 text-center text-xl font-black rounded-2xl bg-slate-50 border-none uppercase tracking-tighter" value={certStudentName} onChange={e => setCertStudentName(e.target.value)} />
                <Button onClick={handleGenerateCert} className="w-full py-8 bg-slate-900 hover:bg-black rounded-2xl text-white font-black uppercase italic tracking-[0.2em] shadow-xl">
                  Download PDF Certificate
                </Button>
              </div>
            </Card>
          )}

        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;