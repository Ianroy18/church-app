import { Award } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';

function CertTab({ certStudentName, setCertStudentName, handleGenerateCert }) {
  const card = {
    background: '#fff',
    border: '1px solid rgba(0,0,0,0.06)',
    boxShadow: '0 4px 24px rgba(0,0,0,0.05)',
    borderRadius: '24px',
  };

  return (
    <div className="max-w-md mx-auto text-center" style={card}>
      <div className="p-10">
        <Award size={40} className="mx-auto text-green-600 mb-4" />
        <Input placeholder="Student Name" value={certStudentName} onChange={(e) => setCertStudentName(e.target.value)} className="text-center mb-4" />
        <Button onClick={handleGenerateCert} className="w-full bg-black hover:bg-slate-800">Download Certificate</Button>
      </div>
    </div>
  );
}

export default CertTab;
