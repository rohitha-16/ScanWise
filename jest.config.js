module.exports = {
  preset: 'jest-expo',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest'
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-native-community|expo|@expo|@unimodules|unimodules|react-navigation|@react-navigation)/)'
  ],
  testPathIgnorePatterns: ['/dist/', '/node_modules/', '/app-example/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
};
