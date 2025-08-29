// jest.config.cjs
/** @type {import('jest').Config} */

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",               // switched to "jsdom" for React component tests
  roots: ["<rootDir>/src/tests"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|scss|sass)$": "identity-obj-proxy",
  },
  transform: {
    // Force CJS output so ESM/TS projects don't error in Jest
    "^.+\\.(ts|tsx)$": ["ts-jest", { isolatedModules: true, tsconfig: { module: "commonjs" } }],
  },
  setupFilesAfterEnv: ["<rootDir>/src/tests/setup.jest.ts"],
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
};