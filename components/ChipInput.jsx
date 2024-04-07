import React, { useState } from 'react';

const ChipInput = ({ chips, onAddChip, onDeleteChip }) => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue.trim() !== '') {
      event.preventDefault();
      onAddChip(inputValue.trim());
      setInputValue('');
    }
  };

  const handleChipDelete = (chipIndex) => {
    onDeleteChip(chipIndex);
  };

  return (
    <div className='inline-block  bg-white mb-3' style={{ display: 'flex', flexDirection: 'column', maxWidth: '255px', border: '1px solid #808080', borderRadius: '4px', padding: '0px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '0px' }}>
        {chips.map((chip, index) => (
          <div key={index} className="chip bg-purple-100 mr-1 rounded-md flex items-center justify-between" style={{ margin: '5px' }}>
            <span className='mx-2'>{chip}</span>
            <button type='button' className="mr-1" onClick={() => handleChipDelete(index)}>x</button>
          </div>
        ))}
      </div>
      {chips.length < 3 && 
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="border-none outline-none"
        placeholder="Enter coaching code"
        style={{ width: '70%', fontSize: '14px', margin: '1px', border: 'none' }}
        disabled={chips.length >= 3}
        id="chip"
        onBlur={(event)=>{
          if(event.target.value && event.target.value.length>0)
          event.preventDefault();
          onAddChip(inputValue.trim());
          setInputValue('');
        }}
      />}
    </div>
  );
};

export default ChipInput;
