import { Component } from 'react';
import css from './Loader.module.css';
import { Circles } from 'react-loader-spinner';

class Loader extends Component {
  render() {
    return (
      <div className={css.loader}>
        <Circles
          height="80"
          width="80"
          color="#3f51b5"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }
}

export { Loader };
