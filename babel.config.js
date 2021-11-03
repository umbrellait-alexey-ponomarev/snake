module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./'],
        alias: {
          commonapp: './src',
          components: './src/components',
        },
      },
    ],
  ],
};
