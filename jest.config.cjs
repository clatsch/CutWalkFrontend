module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.vue$': '@vue/vue3-jest',
        '^.+\\.js$': 'babel-jest',
        '^.+\\.mjs$': 'babel-jest'
    },
    moduleNameMapper: {
        '^@views/(.*)$': '<rootDir>/src/views/$1',
        '^@models/(.*)$': '<rootDir>/src/models/$1',
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!vuetify)'],
};
