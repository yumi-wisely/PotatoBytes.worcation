import React, { useState } from 'react';
import { User, Calendar, MessageSquare, MapPin, CheckCircle, QrCode } from 'lucide-react';

const PotatoPlan = () => {
  const [activeTab, setActiveTab] = useState('My Trip');
  const [visibleMembers, setVisibleMembers] = useState(['ALL', 'Yuki', 'Ken', 'Mika']);
  
  // サンプルデータ
  const members = [
    { id: 'ALL', name: '全員' },
    { id: 'Yuki', name: 'Yuki' },
    { id: 'Ken', name: 'Ken' },
    { id: 'Mika', name: 'Mika' },
  ];

  const events = [
    { time: '09:00', title: '朝市の朝食', type: 'SHARED', owner: 'ALL' },
    { time: '10:30', title: '集中作業タイム', type: 'PERSONAL', owner: 'Yuki' },
    { time: '10:30', title: 'クライアントMTG', type: 'PERSONAL', owner: 'Ken' },
    { time: '13:00', title: 'シーサイド・コワーキング', type: 'SHARED', owner: 'ALL' },
  ];

  const toggleMember = (id) => {
    if (id === 'ALL') return; // ALLは常に表示
    setVisibleMembers(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-md mx-auto h-screen bg-slate-50 flex flex-col font-sans border-x shadow-xl">
      {/* Header */}
      <header className="bg-yellow-500 p-4 text-white shadow-md">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-xl font-bold italic text-slate-800">PotatoPlan</h1>
          <button className="p-1 bg-white/20 rounded-full"><User size={20} /></button>
        </div>
        <h2 className="text-center font-semibold tracking-wider">函館ワーケーション Day 1</h2>
      </header>

      {/* Member Filter (✔機能付き) */}
      <div className="flex gap-3 p-4 overflow-x-auto bg-white border-b">
        {members.map(member => (
          <button 
            key={member.id}
            onClick={() => toggleMember(member.id)}
            className={`flex flex-col items-center min-w-[60px] p-2 rounded-lg transition-all ${
              visibleMembers.includes(member.id) ? 'bg-yellow-100 ring-2 ring-yellow-400' : 'bg-slate-100 opacity-60'
            }`}
          >
            <div className={`w-10 h-10 rounded-full mb-1 flex items-center justify-center text-white font-bold ${member.id === 'ALL' ? 'bg-slate-800' : 'bg-blue-400'}`}>
              {member.name}
            </div>
            <span className="text-xs font-bold text-slate-700">{member.name}</span>
            {visibleMembers.includes(member.id) && <CheckCircle size={12} className="text-yellow-600 mt-1" />}
          </button>
        ))}
      </div>

      {/* Timeline View */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="relative border-l-2 border-slate-300 ml-4 pl-6">
          {events.filter(e => visibleMembers.includes(e.owner)).map((event, i) => (
            <div key={i} className="mb-8 relative">
              <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-slate-300 border-4 border-slate-50"></div>
              <div className="text-sm font-bold text-slate-400 mb-1">{event.time}</div>
              <div className={`p-3 rounded-xl shadow-sm border-l-4 ${
                event.type === 'SHARED' ? 'bg-green-50 border-green-500' : 'bg-blue-50 border-blue-400'
              }`}>
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800">{event.title}</span>
                  <span className="text-[10px] px-2 py-0.5 bg-white/50 rounded-full uppercase font-black text-slate-500">
                    {event.type}
                  </span>
                </div>
                {event.owner !== 'ALL' && <div className="text-xs text-blue-600 font-medium">Member: {event.owner}</div>}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Bottom Nav */}
      <nav className="bg-white border-t flex justify-around p-3 pb-6">
        {[
          { icon: <Calendar size={22} />, label: 'My Trip' },
          { icon: <MessageSquare size={22} />, label: 'Chat' },
          { icon: <MapPin size={22} />, label: 'Map' },
          { icon: <QrCode size={22} />, label: 'Profile' }
        ].map(item => (
          <button 
            key={item.label}
            onClick={() => setActiveTab(item.label)}
            className={`flex flex-col items-center ${activeTab === item.label ? 'text-yellow-600' : 'text-slate-400'}`}
          >
            {item.icon}
            <span className="text-[10px] mt-1 font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default PotatoPlan;
