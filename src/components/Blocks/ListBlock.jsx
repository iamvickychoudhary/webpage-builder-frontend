import React from 'react';

const ListBlock = ({ block, onChange }) => {
  const handleItemChange = (index, value) => {
    const newItems = [...block.content.items];
    newItems[index] = value;
    onChange({ ...block, content: { ...block.content, items: newItems } });
  };

  return block.content.ordered ? (
    <ol>
      {block.content.items?.map((item, index) => (
        <li key={index}>
          <input value={item} onChange={e => handleItemChange(index, e.target.value)} />
        </li>
      ))}
    </ol>
  ) : (
    <ul>
      {block.content.items?.map((item, index) => (
        <li key={index}>
          <input value={item} onChange={e => handleItemChange(index, e.target.value)} />
        </li>
      ))}
    </ul>
  );
};

export default ListBlock;
