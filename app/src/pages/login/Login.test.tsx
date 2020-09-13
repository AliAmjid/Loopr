import React from 'react';

import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

import hookFormType from 'lib/jest/helpers/hookFormType';
import testId from 'lib/jest/helpers/testId';

import Login from 'pages/login/Login';

describe('<Login/>', () => {
  it('Should not fire without email or password', async () => {
    const submitHandler = jest.fn(() => {});
    await act(async () => {
      const wrapper = mount(<Login onSubmit={submitHandler} />);

      wrapper.find(testId('Login-submitButton')).at(0).simulate('submit');
    });
    expect(submitHandler.mock.calls.length).toBe(0);
  });

  it('Should fire on submit with correct values', async () => {
    const email = 'email';
    const password = 'password';

    const submitHandler = jest.fn(() => {});

    await act(async () => {
      const wrapper = mount(<Login onSubmit={submitHandler} />);

      hookFormType(wrapper.find(testId('Login-emailInput')), email);
      hookFormType(wrapper.find(testId('Login-passwordInput')), password);
      wrapper.find(testId('Login-submitButton')).at(0).simulate('submit');
    });

    expect(submitHandler).toBeCalledTimes(1);
    expect(submitHandler).toBeCalledWith(email, password);
  });
});
