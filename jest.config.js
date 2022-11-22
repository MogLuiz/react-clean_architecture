module.exports = {
  testEnvironment: "jsdom",
  roots: ["<rootDir>/src"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{ts,tsx}",
    "!<rootDir>/src/main/**/*",
    "!<rootDir>/src/presentation/index.routes.tsx",
    "!<rootDir>/src/domain/models/index.ts",
    "!<rootDir>/src/domain/usecases/index.ts",
    "!**/*.d.ts",
  ],
  coverageDirectory: "coverage",
  testEnvironment: "jsdom",
  transform: {
    ".+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
    "\\.scss$": "identity-obj-proxy",
  },
  setupFilesAfterEnv: ["<rootDir>/.jest/setup.ts"],
};
