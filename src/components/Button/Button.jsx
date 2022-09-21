import PropTypes from 'prop-types';
import { Button } from './Button.styled';

const ButtonLoadMore = ({ handleLoadMore }) => {
  return (
    <Button
      onClick={() => {
        handleLoadMore();
      }}
    >
      Load more
    </Button>
  );
};
export default ButtonLoadMore;

ButtonLoadMore.propTypes = {
  handleLoadMore: PropTypes.func.isRequired,
};