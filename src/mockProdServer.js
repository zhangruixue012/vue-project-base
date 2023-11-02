import { createProdMockServer } from "vite-plugin-mock/es/createProdMockServer";

import allMock from "./mock";

export const mockModules = [...allMock];

export function setupProdMockServer() {
    createProdMockServer(mockModules);
}
