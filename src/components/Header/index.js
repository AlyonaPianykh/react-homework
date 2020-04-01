import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { increment, decrement } from '../../actions/counter.action';
import { Header as HeaderComponent } from './Header';


const mapStateToProps = (state) => {
  debugger
  const { counter: {currentCounter} } = state;
  return {
    counter: currentCounter,
  };
};

const mapDispatchToProps = (dispatch) => {
  debugger
  return {
    actions: {
      increment: () => dispatch(increment()),
      decrement: () => dispatch(decrement()),
    }
  };
};

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);