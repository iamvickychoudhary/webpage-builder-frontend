import React from 'react';

const DividerBlock = ({ block, onChange }) => (
  <hr style={{
    borderTop: `${block.style?.thickness || 2}px ${block.style?.style || 'solid'} ${block.style?.color || '#000'}`
  }} />
);

export default DividerBlock;
