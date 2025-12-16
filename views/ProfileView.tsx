import React, { useState } from 'react';
import { useApp } from '../App';

export const ProfileView: React.FC = () => {
  const { user, updateUser, showToast, goBack } = useApp();
  const [data, setData] = useState(user);

  const handleSave = () => {
    updateUser(data);
    showToast('個人資料已更新');
    setTimeout(goBack, 500);
  };

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4 border-l-4 border-muji-red pl-3 tracking-wide">個人資料設定</h2>
      <div className="bg-white p-5 rounded-lg shadow-sm">
        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1.5 block">姓名</label>
          <input className="w-full p-3 border border-gray-200 rounded text-sm bg-gray-50" value={data.name} onChange={e => setData({...data, name: e.target.value})} placeholder="請輸入姓名" />
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1.5 block">手機號碼</label>
          <input className="w-full p-3 border border-gray-200 rounded text-sm bg-gray-50" value={data.phone} onChange={e => setData({...data, phone: e.target.value})} placeholder="09xx-xxx-xxx" />
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1.5 block">電子信箱</label>
          <input className="w-full p-3 border border-gray-200 rounded text-sm bg-gray-50" value={data.email} onChange={e => setData({...data, email: e.target.value})} placeholder="email@example.com" />
        </div>
        <div className="mb-4">
          <label className="text-xs text-gray-500 mb-1.5 block">出生日期</label>
          <input type="date" className="w-full p-3 border border-gray-200 rounded text-sm bg-gray-50" value={data.birth} onChange={e => setData({...data, birth: e.target.value})} />
        </div>
        <button onClick={handleSave} className="w-full bg-muji-red text-white py-3 rounded font-medium mt-2">儲存變更</button>
      </div>
    </div>
  );
};