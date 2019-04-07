import React from 'react';
import ShoppingList from '../../src/components/ShoppingList';
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  shallow(<ShoppingList />);
});
