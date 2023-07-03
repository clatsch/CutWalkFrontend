import { mount } from '@vue/test-utils';
import { createStore } from 'vuex';
import LoginComponent from '../../views/LoginView.vue';


describe('LoginComponent.vue', () => {
  let store;
  let actions;
  let wrapper;

  beforeEach(() => {

    actions = {
      login: jest.fn(),
    };

    store = createStore({
      actions,
    });

    wrapper = mount(LoginComponent, {
      global: {
        plugins: [store],
      },
    });
  });

  it('calls store action "login" when form is submitted', async () => {
    wrapper.vm.email = 'user@test.com';
    wrapper.vm.password = 'password123';
    await wrapper.vm.$nextTick();
    await wrapper.find('[data-testid="login-button"]').trigger('click');
    expect(actions.login).toHaveBeenCalledWith(expect.anything(), { email: 'user@test.com', password: 'password123' });
  });
});
