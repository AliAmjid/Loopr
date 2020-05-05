import { CommonWrapper } from 'enzyme';

interface Node extends Element {
  value: string;
}

const hookFormType = (element: CommonWrapper, value: string): void => {
  element.getDOMNode<Node>().value = value;
  element.getDOMNode<Node>().dispatchEvent(new Event('input'));
};

export default hookFormType;
