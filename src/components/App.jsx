import { Component } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { ToastContainer } from 'react-toastify';

class App extends Component {
  state = {
    wordSearch: '',
  };

  updateStateQ = name => {
    this.setState({ wordSearch: name });
  };

  render() {
    const { wordSearch } = this.state;

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
        <Searchbar onSubmitProp={this.updateStateQ} />
        <ImageGallery wordSearch={wordSearch} />
        <ToastContainer autoClose={3000} theme="colored" />
      </div>
    );
  }
}

export { App };
