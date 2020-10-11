import React from 'react';

import { mount } from 'enzyme';

import testId from 'lib/jest/helpers/testId';

import HelpUI from 'components/Help/HelpUI';

describe('HelpUI', () => {
  it('should fire callback on click', () => {
    const onClickHandler = jest.fn();
    const wrapper = mount(<HelpUI onClick={onClickHandler} />);

    expect(onClickHandler).toBeCalledTimes(0);
    wrapper.find(testId('HelpUI-button')).at(0).simulate('click');
    expect(onClickHandler).toBeCalledTimes(1);
  });
});
