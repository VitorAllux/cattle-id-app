module.exports = {
    dependencies: {
      'react-native-mmkv': {
        platforms: {
          android: null, // Evita que seja incluído na build Android
          ios: null, // Evita que seja incluído na build iOS
        },
      },
    },
  };
  