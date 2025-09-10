import React from 'react';
import { useDrag } from 'react-dnd';

const blocks = [
  { type: 'text', label: 'Text' },
  { type: 'image', label: 'Image' },
  { type: 'button', label: 'Button' },
  { type: 'container', label: 'Container' },
  { type: 'form', label: 'Form' },
  { type: 'divider', label: 'Divider' },
  { type: 'card', label: 'Card' },
  { type: 'list', label: 'List' },
];

const Sidebar = () => {
  return (
    <div style={{ width: '200px', padding: '10px', borderRight: '1px solid #ccc' }}>
      <h3>Blocks</h3>
      {blocks.map((block) => (
        <DraggableBlock key={block.type} type={block.type} label={block.label} />
      ))}
    </div>
  );
};

const DraggableBlock = ({ type, label }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK', 
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        padding: '8px',
        margin: '5px 0',
        backgroundColor: '#f0f0f0',
        cursor: 'grab',
        borderRadius: '4px',
      }}
    >
      {label}
    </div>
  );
};

export default Sidebar;
