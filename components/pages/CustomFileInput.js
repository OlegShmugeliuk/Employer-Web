import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';

const CustomFileInput = ({ onChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (onChange) {
      onChange(file);
    }
  };
  return (
    <div>
      <input
        type="file"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button variant="outlined" component="label">
        <Typography variant="body1">
          {selectedFile ? selectedFile.name : 'Choose File'}
        </Typography>
        <input
          type="button"
          style={{ display: 'none' }}
          onClick={() => document.querySelector('input[type=file]').click()}
        />
      </Button>
    </div>
  );
};

export default CustomFileInput;
