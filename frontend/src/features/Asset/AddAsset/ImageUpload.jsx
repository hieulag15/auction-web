import React, { useState, useEffect } from 'react';
import { Box, Button, IconButton, ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import UploadIllustration from './uploadsvg';

const ImageUploadAndReview = ({ initialImages = [] }) => {
  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (initialImages.length > 0) {
      setSelectedImages(initialImages);
    }
  }, [initialImages]);

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const handleRemoveImage = (index) => {
    setSelectedImages((prevImages) => {
      const newImages = [...prevImages];
      newImages.splice(index, 1);
      return newImages;
    });
  };

  const handleRemoveAll = () => {
    setSelectedImages([]);
  };

  const handleUpload = () => {
    console.log('Uploading images:', selectedImages);
  };

  return (
    <Box>
      <input
        accept="image/*"
        id="image-upload"
        type="file"
        multiple
        hidden
        onChange={handleImageChange}
      />
      <label htmlFor="image-upload">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed lightgray',
            borderRadius: 1,
            p: 3,
            minHeight: 200,
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.04)',
              cursor: 'pointer'
            }
          }}
        >
          <UploadIllustration />
          <p>Thả hoặc chọn tập tin</p>
          <p style={{ fontSize: '0.8rem', color: 'gray' }}>Thả tập tin vào đây hoặc nhấp để duyệt tệp tin trên máy</p>
        </Box>
      </label>

      <ImageList
        sx={{ width: '100%', mt: 2, overflowY: 'auto', maxHeight: 450 }}
        cols={5}
        rowHeight={150}
      >
        {selectedImages.map((imageUrl, index) => (
          <ImageListItem key={index}>
            <img
              src={imageUrl}
              alt={`Image ${index + 1}`}
              loading="lazy"
              style={{ width: '100%', height: '100%', borderRadius: '8px' }} // Added borderRadius
            />
            <ImageListItemBar
              position="top"
              sx={{ backgroundColor: 'transparent' }}
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                  onClick={() => handleRemoveImage(index)}
                >
                  <CloseIcon />
                </IconButton>
              }
            />
          </ImageListItem>
        ))}
      </ImageList>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <Button variant="contained" onClick={handleRemoveAll} sx={{ mr: 2 }}>Xóa tất cả</Button>
        <Button variant="contained" startIcon={<CloudUploadIcon />} onClick={handleUpload} disabled={selectedImages.length === 0}>Tải lên</Button>
      </Box>
    </Box>
  );
};

export default ImageUploadAndReview;