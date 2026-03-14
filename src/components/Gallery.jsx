import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  CircularProgress
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Footer from './Footer';
import { db, storage } from '../firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const Gallery = ({ galleryData = [] }) => {
  const [isUploading, setIsUploading] = useState(false);
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;

    setIsUploading(true);
    try {
      const uploadedUrls = [];
      for (const file of files) {
        const fileRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(fileRef, file);
        const downloadUrl = await getDownloadURL(snapshot.ref);
        uploadedUrls.push(downloadUrl);
      }

      const mainGalleryRef = doc(db, 'gallery', 'main');
      const docSnap = await getDoc(mainGalleryRef);
      
      let existingImages = [];
      if (docSnap.exists() && docSnap.data().images) {
        existingImages = docSnap.data().images;
      }
      
      await setDoc(mainGalleryRef, {
        images: [...existingImages, ...uploadedUrls]
      }, { merge: true });

    } catch (error) {
      console.error('Error uploading images: ', error);
      alert('Failed to upload images.');
    } finally {
      setIsUploading(false);
      event.target.value = '';
    }
  };

  const marqueeContent = [...galleryData, ...galleryData];

  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4, mb: 6 }}>
        <Box sx={{
          p: { xs: 2, sm: 4 },
          backgroundColor: '#000000',
          borderRadius: '30px',
          border: '1px solid rgba(255, 42, 42, 0.2)'
        }}>
          <Typography
            variant="h3"
            sx={{
              mb: 5,
              color: '#ffffff',
              textAlign: 'center',
              fontWeight: 800,
              fontFamily: "'Poppins', sans-serif",
              fontSize: { xs: '1.8rem', sm: '2rem', md: '2.5rem' },
              letterSpacing: '2px'
            }}
          >
            IBL <span style={{ color: '#ff2a2a' }}>Gallery</span>
          </Typography>

          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mb: 4
          }}>
            {isAdmin && (
              <Button
                component="label"
                variant="contained"
                disabled={isUploading}
                startIcon={isUploading ? <CircularProgress size={20} color="inherit" /> : <CloudUploadIcon />}
                sx={{
                  backgroundColor: '#ff2a2a',
                  color: '#fff',
                  py: 1.5,
                  px: 4,
                  fontWeight: 'bold',
                  borderRadius: '12px',
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    backgroundColor: '#cc0000'
                  },
                  '&.Mui-disabled': {
                    backgroundColor: 'rgba(255, 42, 42, 0.5)',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }
                }}
              >
                {isUploading ? 'Uploading...' : 'Upload Photos'}
                <input
                  type="file"
                  hidden
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                />
              </Button>
            )}
          </Box>

          {galleryData.length > 0 ? (
            <Box sx={{ 
              overflow: 'hidden', 
              width: '100%', 
              height: '80vh', 
              position: 'relative', 
              py: 2 
            }}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  animation: 'marqueeVertical 40s linear infinite',
                  '&:hover': {
                    animationPlayState: 'paused',
                  },
                  '@keyframes marqueeVertical': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' },
                  }
                }}
              >
                {[1, 2].map((chunkIndex) => (
                  <Box 
                    key={`chunk-${chunkIndex}`}
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(5, 1fr)',
                      gap: 2,
                      pb: 2
                    }}
                  >
                    {galleryData.map((item, index) => (
                      <Box
                        key={`${chunkIndex}-${index}`}
                        sx={{
                          position: 'relative',
                          width: '100%',
                          paddingTop: '100%', // Creates a square aspect ratio
                          overflow: 'hidden',
                          borderRadius: '15px',
                          border: '1px solid rgba(255,42,42,0.1)',
                          '&:hover': {
                            transform: 'scale(1.03)',
                            transition: 'all 0.3s ease-in-out',
                            boxShadow: '0 10px 20px rgba(255, 42, 42, 0.3)',
                            border: '1px solid rgba(255,42,42,0.5)',
                            zIndex: 1
                          }
                        }}
                      >
                        <img
                          src={item}
                          alt="IBL highlight"
                          loading="lazy"
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '15px',
                          }}
                        />
                      </Box>
                    ))}
                  </Box>
                ))}
              </Box>
            </Box>
          ) : (
             <Typography sx={{ color: '#fff', textAlign: 'center', py: 4 }}>
               No photos available in the gallery.
             </Typography>
          )}
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default Gallery;
