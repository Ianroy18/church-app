import { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useNavigate } from 'react-router-dom';
import { Html5QrcodeScanner } from 'html5-qrcode';
import jsPDF from 'jspdf';
import { FiUsers, FiBook, FiDownload, FiCalendar, FiLogOut, FiCamera, FiAward, FiTrash2, FiPlusCircle, FiImage, FiCheckCircle } from 'react-icons/fi';

const FIGMA_INPUT = "w-full px-4 py-3 bg-gray-50 border border-gray-200 text-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4CAF50]/40 focus:bg-white focus:border-[#4CAF50] transition-all placeholder-gray-400 font-medium";
const FIGMA_CARD = "bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-8 transition-all duration-300";
const FIGMA_BTN_PRIMARY = "bg-[#4CAF50] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#388E3C] hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(76,175,80,0.3)] transition-all flex items-center justify-center gap-2 outline-none";
const FIGMA_BTN_SECONDARY = "bg-white text-gray-700 border border-gray-200 px-6 py-3 rounded-xl font-bold hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 shadow-sm";
const FIGMA_BTN_DANGER = "bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-500 hover:text-white transition-all flex items-center justify-center gap-2 outline-none border border-red-100 hover:border-red-500 text-sm";

function AdminDashboard({ user }) {
  const [activeTab, setActiveTab] = useState('lessons');
  const navigate = useNavigate();

  const [usersList, setUsersList] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [downloads, setDownloads] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [certStudentName, setCertStudentName] = useState('');
  const [scanResult, setScanResult] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [stats, setStats] = useState({ users: 0, lessons: 0, attendance: 0 });

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    try {
      if (activeTab === 'users') {
        const { data } = await supabase.from('users').select('*');
        setUsersList(data || []);
      } else if (activeTab === 'lessons') {
        const { data } = await supabase.from('lessons').select('*').order('created_at', { ascending: false });
        setLessons(data || []);
      } else if (activeTab === 'downloads') {
        const { data } = await supabase.from('downloads').select('*').order('created_at', { ascending: false });
        setDownloads(data || []);
      } else if (activeTab === 'schedule') {
        const { data } = await supabase.from('schedule').select('*').order('date', { ascending: true });
        setSchedule(data || []);
      } else if (activeTab === 'attendance') {
        const { data } = await supabase
          .from('attendance')
          .select('*, users(email)')
          .order('created_at', { ascending: false });
        setAttendanceLogs(data || []);
      }
      
      // Compute simple stats for the main overview
      if (activeTab === 'users' || activeTab === 'lessons' || activeTab === 'attendance') {
        const { count: usersCount } = await supabase.from('users').select('*', { count: 'exact', head: true });
        const { count: lessonsCount } = await supabase.from('lessons').select('*', { count: 'exact', head: true });
        const { count: attCount } = await supabase.from('attendance').select('*', { count: 'exact', head: true });
        setStats({ users: usersCount || 0, lessons: lessonsCount || 0, attendance: attCount || 0 });
      }
    } catch (e) { console.error("Fetch error", e); }
  };

  const handleLogout = async () => {
    localStorage.removeItem('demoUser');
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  const handleUploadLesson = async (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file to upload.');
    setUploadLoading(true);
    try {
      // Upload file to Supabase Storage
      const filePath = `lessons/${Date.now()}_${file.name}`;
      const { error: storageError } = await supabase.storage.from('files').upload(filePath, file);
      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(filePath);

      const { error: dbError } = await supabase.from('lessons').insert({
        title,
        description: desc,
        file_url: publicUrl,
      });
      if (dbError) throw dbError;

      setTitle(''); setDesc(''); setFile(null);
      fetchData();
    } catch (e) { console.error(e); alert('Upload failed: ' + e.message); }
    setUploadLoading(false);
  };

  const handleUploadDownload = async (e) => {
    e.preventDefault();
    if (!file) return;
    setUploadLoading(true);
    try {
      const filePath = `downloads/${Date.now()}_${file.name}`;
      const { error: storageError } = await supabase.storage.from('files').upload(filePath, file);
      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage.from('files').getPublicUrl(filePath);

      await supabase.from('downloads').insert({ title, file_url: publicUrl });
      setTitle(''); setFile(null);
      fetchData();
    } catch (e) { console.error(e); alert('Upload failed: ' + e.message); }
    setUploadLoading(false);
  };

  const handleAddSchedule = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase.from('schedule').insert({ title, description: desc, date, time });
      if (error) throw error;
      setTitle(''); setDesc(''); setDate(''); setTime('');
      fetchData();
    } catch (e) { console.error(e); alert('Failed to add schedule.'); }
  };

  const deleteRecord = async (table, id) => {
    if (window.confirm('Delete this record permanently?')) {
      await supabase.from(table).delete().eq('id', id);
      fetchData();
    }
  };

  useEffect(() => {
    if (activeTab === 'scanner') {
      const scanner = new Html5QrcodeScanner("reader", { qrbox: { width: 300, height: 300 }, fps: 10 });
      let isScanned = false;
      scanner.render(async (decodedText) => {
        if (isScanned) return;
        isScanned = true;
        setScanResult(decodedText);
        try {
          await supabase.from('attendance').insert({
            user_id: decodedText,
            date: new Date().toLocaleDateString(),
            time: new Date().toLocaleTimeString(),
          });
        } catch (e) { console.error(e); }
        setTimeout(() => { isScanned = false; setScanResult(''); }, 3000);
      }, () => {});
      return () => { scanner.clear().catch(() => {}); };
    }
  }, [activeTab]);

  const handleGenerateCert = () => {
    const doc = new jsPDF({ orientation: 'landscape' });
    doc.setFillColor(56, 142, 60); doc.rect(0, 0, 297, 210, 'F');
    doc.setFillColor(255, 255, 255); doc.rect(8, 8, 281, 194, 'F');
    doc.setDrawColor(253, 216, 53); doc.setLineWidth(1); doc.rect(12, 12, 273, 186);
    doc.setFontSize(44); doc.setTextColor(56, 142, 60); doc.text('CERTIFICATE OF COMPLETION', 148.5, 60, { align: 'center' });
    doc.setFontSize(16); doc.setTextColor(100, 100, 100); doc.text('This is to proudly certify that', 148.5, 90, { align: 'center' });
    doc.setFontSize(40); doc.setTextColor(30, 30, 30); doc.text(`${certStudentName.toUpperCase()}`, 148.5, 115, { align: 'center' });
    doc.setFontSize(14); doc.setTextColor(100, 100, 100); doc.text('has successfully completed the Field Bible School (FBS) program', 148.5, 135, { align: 'center' });
    doc.setFontSize(18); doc.setTextColor(0, 0, 0); doc.text('Grace and Truth Life Care Centre Inc.', 148.5, 148, { align: 'center' });
    doc.setFontSize(12); const today = new Date().toLocaleDateString();
    doc.setDrawColor(150, 150, 150); doc.setLineWidth(0.5); doc.line(60, 180, 120, 180); doc.line(177, 180, 237, 180);
    doc.text('Head Administrator', 90, 188, { align: 'center' }); doc.text(`Date Issued: ${today}`, 207, 188, { align: 'center' });
    doc.save(`FBS_Certificate_${certStudentName.replace(/ /g, '_')}.pdf`);
  };

  const navItemClass = (tabName) => `
    flex items-center gap-4 w-full text-left px-5 py-3.5 mx-2 rounded-xl transition-all duration-300 font-semibold tracking-wide text-sm outline-none
    ${activeTab === tabName
      ? 'bg-white text-[#4CAF50] shadow-md'
      : 'text-gray-400 hover:bg-white/10 hover:text-white'
    }
  `;

  return (
    <div className="flex h-screen bg-[#F4F7F6] font-['Caveat',_cursive] text-xl selection:bg-[#4CAF50] selection:text-white">
      
      {/* Sidebar */}
      <div className="w-[300px] bg-[#111827] flex flex-col z-20 m-4 rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
        <div className="p-8 pb-4 flex items-center gap-4">
          <img src="https://lookaside.fbsbx.com/lookaside/crawler/media/?media_id=100066636565507" alt="Logo" className="w-12 h-12 rounded-xl shadow-lg border border-gray-700 object-cover" />
          <div>
            <h2 className="font-extrabold text-white tracking-widest text-xs uppercase">LCC Admin</h2>
            <p className="text-xs text-[#4CAF50] font-bold mt-0.5">Management Portal</p>
          </div>
        </div>
        
        <nav className="flex-1 py-4 flex flex-col gap-2 overflow-y-auto px-2">
          <p className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-4">Database</p>
          <button onClick={() => setActiveTab('users')} className={navItemClass('users')}><FiUsers size={18} /> Users List</button>
          <button onClick={() => setActiveTab('attendance')} className={navItemClass('attendance')}><FiCheckCircle size={18} /> Attendance Logs</button>
          <button onClick={() => setActiveTab('lessons')} className={navItemClass('lessons')}><FiBook size={18} /> Course Content</button>
          <button onClick={() => setActiveTab('downloads')} className={navItemClass('downloads')}><FiDownload size={18} /> Site Files</button>
          <button onClick={() => setActiveTab('schedule')} className={navItemClass('schedule')}><FiCalendar size={18} /> Live Schedule</button>
          
          <p className="px-6 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2 mt-6">Tools</p>
          <button onClick={() => setActiveTab('scanner')} className={navItemClass('scanner')}><FiCamera size={18} /> Run QR Scanner</button>
          <button onClick={() => setActiveTab('cert')} className={navItemClass('cert')}><FiAward size={18} /> Issue Certificate</button>
        </nav>
        
        <div className="p-6">
          <button onClick={handleLogout} className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-xl hover:bg-white/5 transition-colors text-red-400 font-bold text-sm tracking-wider outline-none border border-red-900/30">
            <FiLogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto flex flex-col p-4 pl-0">
        
        <div className="bg-white rounded-3xl px-10 py-6 flex justify-between items-center shadow-sm mb-6 border border-gray-100 flex-shrink-0">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900">Dashboard Overview</h1>
            <p className="text-sm text-gray-500 font-medium">Manage your church applications and portal content here.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            <div className="text-center group cursor-default">
              <span className="block text-xl font-black text-[#4CAF50] group-hover:scale-110 transition-transform">{stats.users}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Members</span>
            </div>
            <div className="text-center group cursor-default">
              <span className="block text-xl font-black text-orange-500 group-hover:scale-110 transition-transform">{stats.lessons}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Courses</span>
            </div>
            <div className="text-center group cursor-default">
              <span className="block text-xl font-black text-purple-600 group-hover:scale-110 transition-transform">{stats.attendance}</span>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Sign-ins</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl w-full mx-auto relative flex-1">
          <div className="animate-fade-in-up h-full">

            {activeTab === 'users' && (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Member Directory</h2>
                    <p className="text-gray-500 text-sm mt-1">All registered accounts in the database.</p>
                  </div>
                </div>
                <div className={`${FIGMA_CARD} flex-1 overflow-hidden flex flex-col p-0`}>
                  <div className="overflow-auto flex-1 p-8">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                          <th className="pb-4 font-bold">User ID</th>
                          <th className="pb-4 font-bold">Account Email</th>
                          <th className="pb-4 font-bold">Permissions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {usersList.map((u, i) => (
                          <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-5 font-mono text-sm text-gray-400">{u.id}</td>
                            <td className="py-5 text-gray-800 font-bold">{u.email || '—'}</td>
                            <td className="py-5">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest ${u.role === 'admin' ? 'bg-indigo-50 text-indigo-600 border border-indigo-100' : 'bg-green-50 text-[#388E3C] border border-green-100'}`}>
                                {u.role}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'attendance' && (
              <div className="h-full flex flex-col">
                <div className="flex justify-between items-end mb-6">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Attendance History</h2>
                    <p className="text-gray-500 text-sm mt-1">Live feed of student sign-ins from the QR station.</p>
                  </div>
                </div>
                <div className={`${FIGMA_CARD} flex-1 overflow-hidden flex flex-col p-0`}>
                  <div className="overflow-auto flex-1 p-8">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="text-gray-400 text-xs uppercase tracking-widest border-b border-gray-100">
                          <th className="pb-4 font-bold">Student Email</th>
                          <th className="pb-4 font-bold">Date</th>
                          <th className="pb-4 font-bold">Time</th>
                          <th className="pb-4 font-bold">ID Ref</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {attendanceLogs.map((log, i) => (
                          <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-5 font-bold text-gray-800">{log.users?.email || 'Unknown User'}</td>
                            <td className="py-5 text-gray-600 font-medium">{log.date}</td>
                            <td className="py-5">
                              <span className="bg-green-50 text-[#388E3C] px-3 py-1 rounded-md text-xs font-bold ring-1 ring-green-100">
                                {log.time}
                              </span>
                            </td>
                            <td className="py-5 font-mono text-[10px] text-gray-400">{log.user_id}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {attendanceLogs.length === 0 && (
                      <div className="p-12 text-center text-gray-400 font-medium">No attendance records found.</div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'lessons' && (
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                  <div className={FIGMA_CARD}>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-2">Deploy Module</h2>
                    <p className="text-sm text-gray-500 mb-8">Publish new teaching material to all students instantly.</p>
                    <form onSubmit={handleUploadLesson} className="space-y-5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Module Title</label>
                        <input type="text" placeholder="e.g. Chapter 1: The Foundation" required className={FIGMA_INPUT} value={title} onChange={e => setTitle(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Detailed Description</label>
                        <textarea placeholder="Write syllabus overview..." required rows="4" className={`${FIGMA_INPUT} resize-none`} value={desc} onChange={e => setDesc(e.target.value)} />
                      </div>
                      <div>
                         <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Resource File</label>
                         <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
                           <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setFile(e.target.files[0])} />
                           {file ? <span className="font-bold text-[#4CAF50]">{file.name}</span> : <div className="text-gray-400 flex flex-col items-center"><FiImage size={24} className="mb-2"/><span className="text-sm font-semibold">Drop file or click to browse</span></div>}
                         </div>
                      </div>
                      <button type="submit" disabled={uploadLoading} className={`${FIGMA_BTN_PRIMARY} w-full mt-4 ${uploadLoading?'opacity-50':''}`}>
                        <FiPlusCircle size={20}/> {uploadLoading ? 'Uploading...' : 'Publish Material'}
                      </button>
                    </form>
                  </div>
                </div>

                <div className="lg:col-span-7">
                   <div className={`${FIGMA_CARD} bg-transparent shadow-none border-none p-0`}>
                     <h2 className="text-xl font-extrabold text-gray-900 mb-6 px-1">Active Modules</h2>
                     <div className="space-y-4">
                       {lessons.map(l => (
                          <div key={l.id} className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg hover:border-gray-200 transition-all group shadow-sm">
                            <div className="flex-1 pr-6">
                              <h3 className="font-extrabold text-gray-900 text-lg mb-1">{l.title}</h3>
                              <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">{l.description}</p>
                            </div>
                            <button autoFocus={false} onClick={() => deleteRecord('lessons', l.id)} className={FIGMA_BTN_DANGER}>
                              <FiTrash2 size={16}/> Revoke
                            </button>
                          </div>
                       ))}
                       {lessons.length === 0 && <div className="p-12 text-center text-gray-400 font-medium bg-white rounded-2xl border border-dashed border-gray-200">No active modules found.</div>}
                     </div>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'downloads' && (
              <div className="grid lg:grid-cols-12 gap-8">
                <div className="lg:col-span-5">
                   <div className={FIGMA_CARD}>
                    <h2 className="text-xl font-extrabold text-gray-900 mb-2">Distribute Asset</h2>
                    <p className="text-sm text-gray-500 mb-8">Upload general files directly to cloud storage.</p>
                    <form onSubmit={handleUploadDownload} className="space-y-5">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Asset Name</label>
                        <input type="text" placeholder="e.g. 2026 Retreat Form" required className={FIGMA_INPUT} value={title} onChange={e => setTitle(e.target.value)} />
                      </div>
                      <div>
                         <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">File</label>
                         <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 text-center hover:bg-gray-50 transition-colors cursor-pointer relative overflow-hidden">
                           <input type="file" required className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={e => setFile(e.target.files[0])} />
                           {file ? <span className="font-bold text-[#4CAF50]">{file.name}</span> : <div className="text-gray-400 flex flex-col items-center"><FiImage size={24} className="mb-2"/><span className="text-sm font-semibold">Browse asset</span></div>}
                         </div>
                      </div>
                      <button type="submit" disabled={uploadLoading} className={`${FIGMA_BTN_PRIMARY} w-full mt-4 bg-orange-500 hover:bg-orange-600 hover:shadow-[0_10px_20px_rgba(249,115,22,0.3)]`}>
                        <FiDownload size={20} /> {uploadLoading ? 'Uploading...' : 'Deploy Asset'}
                      </button>
                    </form>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'schedule' && (
              <div className="grid lg:grid-cols-2 gap-8">
                <div className={FIGMA_CARD}>
                  <h2 className="text-xl font-extrabold text-gray-900 mb-2">New Event</h2>
                  <p className="text-sm text-gray-500 mb-8">Create a new entry in the global class timeline.</p>
                  <form onSubmit={handleAddSchedule} className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Event Topic</label>
                      <input type="text" placeholder="Gospels Overview" required className={FIGMA_INPUT} value={title} onChange={e => setTitle(e.target.value)} />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Details</label>
                      <textarea placeholder="Bring your bibles..." required rows="3" className={`${FIGMA_INPUT} resize-none`} value={desc} onChange={e => setDesc(e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Date</label>
                        <input type="date" required className={FIGMA_INPUT} value={date} onChange={e => setDate(e.target.value)} />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Time</label>
                        <input type="time" required className={FIGMA_INPUT} value={time} onChange={e => setTime(e.target.value)} />
                      </div>
                    </div>
                    <button type="submit" className={`${FIGMA_BTN_PRIMARY} w-full mt-4 bg-purple-600 hover:bg-purple-700 hover:shadow-[0_10px_20px_rgba(147,51,234,0.3)]`}>
                      <FiCalendar size={20} /> Append Schedule
                    </button>
                  </form>
                </div>
                
                <div className="bg-transparent border-none">
                  <h2 className="text-xl font-extrabold text-gray-900 mb-6 px-1">Timeline</h2>
                  <div className="space-y-4">
                    {schedule.map(s => (
                      <div key={s.id} className={`${FIGMA_CARD} p-6 flex justify-between items-center group shadow-sm hover:shadow-md`}>
                        <div>
                          <p className="font-extrabold text-gray-900 text-lg">{s.title}</p>
                          <p className="text-xs text-purple-600 font-bold mt-1 tracking-widest uppercase bg-purple-50 inline-block px-3 py-1 rounded-md">{s.date} — {s.time}</p>
                        </div>
                        <button onClick={() => deleteRecord('schedule', s.id)} className={`${FIGMA_BTN_SECONDARY} text-red-500 hover:border-red-200 hover:bg-red-50 p-3 h-auto w-auto opacity-0 group-hover:opacity-100 transition-all`}>
                          <FiTrash2 size={18}/>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scanner' && (
              <div className="max-w-xl mx-auto">
                 <div className={`${FIGMA_CARD} text-center`}>
                   <div className="w-16 h-16 bg-green-50 text-[#4CAF50] rounded-2xl flex items-center justify-center mx-auto mb-6">
                     <FiCamera size={32} />
                   </div>
                   <h2 className="text-2xl font-extrabold text-gray-900 mb-2">Live QR Verification Station</h2>
                   <p className="text-gray-500 mb-8 max-w-sm mx-auto text-sm leading-relaxed">Provide permission to the camera frame below to automatically log students into the registry.</p>
                   
                   <div className="bg-black p-2 rounded-3xl shadow-2xl relative border-4 border-[#388E3C] overflow-hidden group">
                     <div id="reader" className="w-full bg-white rounded-2xl overflow-hidden min-h-[300px]"></div>
                     
                     <div className={`absolute bottom-6 left-1/2 -translate-x-1/2 bg-[#4CAF50] text-white font-bold px-6 py-3 rounded-full flex items-center gap-3 transition-all transform ${scanResult ? 'translate-y-0 opacity-100 shadow-[0_10px_30px_rgba(76,175,80,0.6)]' : 'translate-y-10 opacity-0'}`}>
                       UID VERIFIED
                     </div>
                   </div>
                 </div>
              </div>
            )}

            {activeTab === 'cert' && (
              <div className="max-w-xl mx-auto mt-10">
                <div className={`${FIGMA_CARD} text-center`}>
                  <div className="w-20 h-20 bg-yellow-50 text-yellow-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-yellow-100">
                    <FiAward size={40} />
                  </div>
                  <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Official FBS Certification</h2>
                  <p className="text-gray-500 text-sm mb-10 max-w-sm mx-auto leading-relaxed">Input candidate's formal registered identity.</p>
                  
                  <input
                    type="text"
                    placeholder="Candidate Legal Name"
                    required
                    className={`${FIGMA_INPUT} text-center text-xl py-5 mb-6`}
                    value={certStudentName}
                    onChange={e => setCertStudentName(e.target.value)}
                  />
                  <button
                    onClick={handleGenerateCert}
                    disabled={!certStudentName}
                    className={`${FIGMA_BTN_PRIMARY} w-full py-4 text-lg bg-yellow-500 hover:bg-yellow-600 hover:shadow-[0_10px_20px_rgba(234,179,8,0.3)] disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none`}
                  >
                    <FiDownload size={24} /> Generate Vector PDF
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      
      <style jsx="true">{`
        .animate-fade-in-up {
          animation: fadeInUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        #reader__dashboard_section_csr button {
          background-color: #388E3C !important; color: white !important; border-radius: 12px !important;
          padding: 10px 20px !important; font-weight: 800 !important; border: none !important;
          margin: 20px 0 !important; cursor: pointer; transition: all 0.3s ease;
        }
        #reader__dashboard_section_csr button:hover { background-color: #2E7D32 !important; transform: translateY(-2px); }
        #reader__dashboard_section_csr span { color: #888 !important; font-size: 14px; font-weight: 600; font-family: 'Montserrat', sans-serif;}
        #reader { border: none !important; }
        #reader__dashboard_section_swaplink { display: none !important; }
      `}</style>
    </div>
  );
}

export default AdminDashboard;
