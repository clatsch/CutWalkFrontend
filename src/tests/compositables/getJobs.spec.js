import { describe, it, expect, vi, beforeEach } from 'vitest';

global.fetch = vi.fn();

// Helper function to create a mocked fetch response
function createFetchResponse(data) {
  return { json: () => new Promise((resolve) => resolve(data)) };
}

// Import the getJobs function from the file you provided
import getJobs from "@/composables/jobs/getJobs";

describe('Job Service', () => {
  beforeEach(() => {
    global.fetch.mockReset();
  });

  it('fetches jobs data and sets it correctly', async () => {
    const userId = 'user123';
    const authToken = 'token';

    const response = {
      data: [
        {
          id: 'job1',
          title: 'Job 1',
        },
        {
          id: 'job2',
          title: 'Job 2',
        },
      ],
    };

    global.fetch.mockResolvedValue(createFetchResponse(response));

    const { jobs, error, load } = getJobs(userId, authToken);
    await load();

    expect(global.fetch).toHaveBeenCalledWith(
      `http://127.0.0.1:3000/api/v1/jobs/?userId=${userId}`,
      {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    );
    expect(jobs.value).toEqual(response.data);
    expect(error.value).toBeNull();
  });
});
