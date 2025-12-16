import React, { useState, useRef, useEffect } from 'react';
import { DB_PRODUCTS } from '../constants';

interface DraggableCanvasProps {
  bgUrl: string;
  styleTag: string;
}

interface Position {
  x: number;
  y: number;
}

export const DraggableCanvas: React.FC<DraggableCanvasProps> = ({ bgUrl, styleTag }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<{ id: string, img: string, pos: Position }[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const dragOffset = useRef<Position>({ x: 0, y: 0 });

  useEffect(() => {
    // Initialize random items based on style
    const styleItems = DB_PRODUCTS.filter(p => p.tags.includes(styleTag as any)).slice(0, 3);
    const newItems = styleItems.map((item) => ({
      id: item.id,
      img: item.img,
      pos: { 
        x: 20 + Math.random() * 200, 
        y: 50 + Math.random() * 150 
      }
    }));
    setItems(newItems);
  }, [styleTag]);

  const handleStart = (e: React.MouseEvent | React.TouchEvent, id: string, currentPos: Position) => {
    e.preventDefault(); // Prevent scroll on touch
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;

    dragOffset.current = {
      x: clientX - currentPos.x,
      y: clientY - currentPos.y
    };
    setDraggedItem(id);
  };

  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!draggedItem) return;
    e.preventDefault(); // Prevent scrolling while dragging

    const clientX = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;

    const newX = clientX - dragOffset.current.x;
    const newY = clientY - dragOffset.current.y;

    setItems(prev => prev.map(item => 
      item.id === draggedItem ? { ...item, pos: { x: newX, y: newY } } : item
    ));
  };

  const handleEnd = () => {
    setDraggedItem(null);
  };

  useEffect(() => {
    if (draggedItem) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    }
    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [draggedItem]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-[320px] bg-gray-200 rounded overflow-hidden relative touch-none mb-4"
    >
      <img src={bgUrl} alt="Room Background" className="w-full h-full object-cover pointer-events-none" />
      
      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded-full text-xs pointer-events-none animate-fade-in opacity-0 [animation-delay:2s] [animation-fill-mode:forwards]">
        拖動家具調整擺放
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="absolute w-20 h-20 cursor-move transition-transform active:scale-105 active:z-50 drop-shadow-md select-none"
          style={{ left: item.pos.x, top: item.pos.y }}
          onMouseDown={(e) => handleStart(e, item.id, item.pos)}
          onTouchStart={(e) => handleStart(e, item.id, item.pos)}
        >
          <img src={item.img} alt="furniture" className="w-full h-full object-contain pointer-events-none" />
        </div>
      ))}
    </div>
  );
};