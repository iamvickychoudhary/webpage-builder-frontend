import React from 'react';

const FormBlock = ({ block, onChange }) => {
  const handleInputChange = (index, value) => {
    const newFields = [...block.content.fields];
    newFields[index].value = value;
    onChange({ ...block, content: { ...block.content, fields: newFields } });
  };

  return (
    <form style={{ display: 'flex', flexDirection: 'column' }}>
      {block.content.fields?.map((field, index) => (
        <input
          key={index}
          placeholder={field.placeholder}
          value={field.value || ''}
          onChange={e => handleInputChange(index, e.target.value)}
        />
      ))}
      <button type="submit">{block.content.submitLabel || 'Submit'}</button>
    </form>
  );
};

export default FormBlock;
