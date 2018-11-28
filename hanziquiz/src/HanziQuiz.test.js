import React from 'react';
import ReactDOM from 'react-dom';
import HanziQuiz from './components/HanziQuiz/HanziQuiz';
import Enzyme, {mount, shallow, render} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HanziQuiz />, div);
  ReactDOM.unmountComponentAtNode(div);
});
