import { useState } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

export const App = () => {
  const [wordSearch, setWordSearch] = useState('');

  const updateStateQ = name => {
    setWordSearch(name);
  };

  return (
    <div
      style={{
        gridGap: 16,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 16,
        color: '#010101',
      }}
    >
      <Searchbar onSubmitProp={updateStateQ} />
      <ImageGallery wordSearch={wordSearch} />
      <ToastContainer autoClose={3000} theme="colored" />
    </div>
  );
};