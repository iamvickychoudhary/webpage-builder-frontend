import React from 'react';

const ButtonBlock = ({ block, onChange }) => {
  return (
    <button
      style={{
        backgroundColor: block.style?.bgColor || '#007bff',
        color: block.style?.color || '#fff',
        padding: block.style?.padding || '10px 20px',
        borderRadius: block.style?.borderRadius || '5px',
        fontSize: block.style?.fontSize || 16,
      }}
      onClick={() => window.open(block.content.link, '_blank')}
    >
      {block.content.label || 'Button'}
    </button>
  );
};

export default ButtonBlock;
