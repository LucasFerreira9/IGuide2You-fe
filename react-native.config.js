module.exports = {
    project: {
        ios: {},
        android: {},
    },
    assets: ['./src/Assets/Fonts'],
    
    dependencies: {
        'react-native-video': {
          platforms: {
            android: {
              sourceDir: '../node_modules/react-native-video/android-exoplayer',
           },
          },
        },
        'react-native-flipper': {
          platforms: {
            ios: null,
          },
        },
      },
    
};