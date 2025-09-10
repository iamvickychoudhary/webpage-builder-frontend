import React from 'react';

const ImageBlock = ({ block, onChange }) => {
  return (
    <div style={{ textAlign: block.style?.alignment || 'center' }}>
      <input
        type="text"
        placeholder="Image URL"
        value={block.content.url}
        onChange={e => onChange({ ...block, content: { url: e.target.value, alt: block.content.alt } })}
      />
      <input
        type="text"
        placeholder="Alt text"
        value={block.content.alt || ''}
        onChange={e => onChange({ ...block, content: { ...block.content, alt: e.target.value } })}
      />
      {block.content.url && <img src={block.content.url} alt={block.content.alt} style={{ width: block.style?.width || '200px' }} />}
    </div>
  );
};

export default ImageBlock;
