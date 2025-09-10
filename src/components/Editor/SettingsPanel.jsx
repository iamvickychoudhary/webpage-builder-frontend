import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBlockStyle } from '../../features/pages/pageSlice';

const SettingsPanel = () => {
  const dispatch = useDispatch();
  const { currentPage, selectedBlockId } = useSelector(state => state.pages);

  if (!selectedBlockId) 
    return <div style={{ width: '250px', padding: '10px', borderLeft: '1px solid #ccc' }}>Select a block</div>;

  // Recursive function to find block by ID
  const findBlock = (blocks) => {
    for (let b of blocks) {
      if (b.id === selectedBlockId) return b;
      if (b.children) {
        const found = findBlock(b.children);
        if (found) return found;
      }
    }
    return null;
  };

  const block = findBlock(currentPage.blocks);
  if (!block) return null;

  const handleStyleChange = (prop, value) => {
    dispatch(updateBlockStyle({ blockId: block.id, style: { [prop]: value } }));
  };

  return (
    <div style={{ width: '250px', padding: '10px', borderLeft: '1px solid #ccc' }}>
      <h3>Block Settings</h3>

      {/* Text-specific styles */}
      {block.type === 'text' && (
        <>
          <label>Font Size</label>
          <input
            type="number"
            value={parseInt(block.style?.fontSize || 16)}
            onChange={e => handleStyleChange('fontSize', e.target.value + 'px')}
          />

          <label>Text Color</label>
          <input
            type="color"
            value={block.style?.color || '#000000'}
            onChange={e => handleStyleChange('color', e.target.value)}
          />
        </>
      )}

      <label>Background Color</label>
      <input
        type="color"
        value={block.style?.backgroundColor || '#ffffff'}
        onChange={e => handleStyleChange('backgroundColor', e.target.value)}
      />

      <label>Text Align</label>
      <select
        value={block.style?.textAlign || 'left'}
        onChange={e => handleStyleChange('textAlign', e.target.value)}
      >
        <option value="left">Left</option>
        <option value="center">Center</option>
        <option value="right">Right</option>
      </select>

      <label>Padding (px)</label>
      <input
        type="number"
        value={parseInt(block.style?.padding || 0)}
        onChange={e => handleStyleChange('padding', e.target.value + 'px')}
      />

      <label>Margin (px)</label>
      <input
        type="number"
        value={parseInt(block.style?.margin || 0)}
        onChange={e => handleStyleChange('margin', e.target.value + 'px')}
      />
    </div>
  );
};

export default SettingsPanel;
