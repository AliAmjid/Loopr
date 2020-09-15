import { mount } from 'enzyme';

import Acl from 'pages/acl/index/Acl';

describe('Acl', () => {
  it('should fire handler on change', () => {
    const wrapper = mount(
      <Acl columns={} rows={} onResourceChange={} onRoleAdd={} loading={} />,
    );
  });
});
