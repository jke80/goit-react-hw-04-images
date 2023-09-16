import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ name, onClick }) => {
  return (
    <div className={css.container}>
      <button className={css.buttonLoadMore} type="button" onClick={onClick}>
        {name}
      </button>
    </div>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
