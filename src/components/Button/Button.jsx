import { Component } from 'react';
import css from './Button.module.css';
import { PropTypes } from 'prop-types';

class Button extends Component {
  render() {
    return (
      <>
        <button
          className={css.buttonGallery}
          type="button"
          onClick={this.props.onClick}
        >
          Load more
        </button>
      </>
    );
  }
}

export { Button };

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
