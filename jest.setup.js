import "@testing-library/jest-dom";

import { server } from "./src/mocks/server";

beforeAll(() => server.listen()); // Start mock server before tests run
afterEach(() => server.resetHandlers()); // Reset handlers after each test
afterAll(() => server.close()); // Close mock server after all tests
