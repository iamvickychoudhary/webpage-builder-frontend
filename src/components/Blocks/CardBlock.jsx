import React from 'react';
import ImageBlock from './ImageBlock';
import ButtonBlock from './ButtonBlock';
import TextBlock from './TextBlock';

const CardBlock = ({ block }) => {
  if (!block) return null;

  // Safe defaults
  const { content = {}, style = {} } = block;

  // Card content may have nested blocks inside
  const imageBlock = content.image ? { type: 'image', content: content.image, style: content.image.style || {} } : null;
  const textBlock = content.text ? { type: 'text', content: content.text, style: content.text.style || {} } : null;
  const buttonBlock = content.button ? { type: 'button', content: content.button, style: content.button.style || {} } : null;

  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '6px', ...style }}>
      {imageBlock && <ImageBlock block={imageBlock} />}
      {textBlock && <TextBlock block={textBlock} />}
      {buttonBlock && <ButtonBlock block={buttonBlock} />}
    </div>
  );
};

export default CardBlock;
