import React from 'react';

const ContainerBlock = ({ block }) => {
  return (
    <div
      style={{
        backgroundColor: block.style?.backgroundColor || '#f5f5f5',
        padding: block.style?.padding || '10px',
        margin: block.style?.margin || '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
      }}
    >
    </div>
  );
};

export default ContainerBlock;
