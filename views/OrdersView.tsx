import React from 'react';
import { useApp } from '../App';

export const OrdersView: React.FC = () => {
  const { orders } = useApp();

  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4 border-l-4 border-muji-red pl-3 tracking-wide">我的訂單</h2>
      {orders.length === 0 ? (
        <div className="text-center py-10 text-gray-400">尚無訂單紀錄</div>
      ) : (
        orders.map(order => (
          <div key={order.id} className={`bg-white rounded-lg p-4 mb-4 shadow-sm border-l-[3px] ${order.status === 'processing' ? 'border-orange-400' : 'border-green-600'}`}>
            <div className="flex justify-between mb-2.5 text-xs text-gray-500 border-b border-gray-100 pb-2">
              <span>{order.date}</span><span>#{order.id}</span>
            </div>
            <div className="font-bold text-sm mb-2">{order.items}</div>
            <div className="flex justify-between items-center mt-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${order.status === 'processing' ? 'bg-orange-50 text-orange-600' : 'bg-green-50 text-green-700'}`}>
                {order.status === 'processing' ? '處理中' : '已配送'}
              </span>
              <span className="font-bold text-sm">NT$ {order.total.toLocaleString()}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};