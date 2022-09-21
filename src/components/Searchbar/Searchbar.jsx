import PropTypes from 'prop-types';
import {
  SearchbarBox,
  SearchForm,
  SearchFormButton,
  ButtonLabel,
  SearchFormInput,
} from './Searchbar.styled';
import { ReactComponent as MagniGlass } from '../../icon/MagniGlass.svg';

const Searchbar = ({ onSearchSubmit }) => {
  return (
    <SearchbarBox>
      <SearchForm onSubmit={onSearchSubmit}>
        <SearchFormButton type="submit" aria-label='search image'>
          <MagniGlass width="32" height="32" fill="#3f51b5" />
          <ButtonLabel />
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="query"
        />
      </SearchForm>
    </SearchbarBox>
  );
};
export default Searchbar;

Searchbar.propTypes = {
  onSearchSubmit: PropTypes.func.isRequired,
};
