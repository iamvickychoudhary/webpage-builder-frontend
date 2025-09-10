import React from 'react';

const TextBlock = ({ block, onChange }) => {
  const handleChange = (e) => {
    const updatedBlock = {
      ...block,
      content: {
        ...block.content, 
        text: e.target.value,
      },
    };
    onChange(updatedBlock);
  };

  return (
    <div
      style={{
        textAlign: block.style?.textAlign || 'left',
        fontWeight: block.style?.bold ? 'bold' : 'normal',
        fontStyle: block.style?.italic ? 'italic' : 'normal',
        fontSize: block.style?.fontSize || 16,
      }}
    >
      <textarea
        value={block.content?.text || ''} 
        onChange={handleChange}
        placeholder="Enter text"
        style={{
          width: '100%',
          fontSize: block.style?.fontSize || 16,
        }}
      />
    </div>
  );
};

export default TextBlock;
