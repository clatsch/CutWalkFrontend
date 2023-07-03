import { mount } from '@vue/test-utils';
import CreateJob from "../../views/CreateJob.vue";
import { createStore } from 'vuex';

describe('CreateJob', () => {
  test('calculates the price correctly', async () => {
    const mockRouter = {
      push: jest.fn()
    };

    const mockStore = createStore({
      getters: {
        getAuthToken: () => 'mockAuthToken'
      }
    });

    const wrapper = mount(CreateJob, {
      global: {
        mocks: {
          $router: mockRouter
        },
        plugins: [
          mockStore
        ]
      }
    });

    wrapper.vm.totalLength = 120;
    wrapper.vm.contourCount = 12;
    wrapper.vm.selectedMachine = { rate: 120 };

    wrapper.vm.cutOptionsByMachine = [
      {
        quality: {
          rough: 80,
        },
        piercing: 2.5
      }
    ];

    wrapper.vm.selectedCutOption = wrapper.vm.cutOptionsByMachine[0];
    wrapper.vm.selectedQuality = 'rough';

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.price).toBe(59);
  });
});
