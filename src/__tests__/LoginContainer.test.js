import React from 'react';
import { render } from '@testing-library/react';

import LoginPage from '../components/pages/LoginPage';

describe('<LoginPage /> test suite', () => {
  test('signin widget mounts successfully', () => {
    const { container } = render(<LoginPage />);
    expect(container.querySelector('#sign-in-widget')).toBeTruthy();
  });
});
