import "dotenv/config";

export default {
  expo: {
    name: "maon",
    slug: "maon",
    android: {
      package: "com.ssafy.maon",
    },
    ios: {
      bundleIdentifier: "com.ssafy.maon",
    },
    extra: {
      androidClientId: process.env.ANDROID_CLIENT_ID,
      iosClientId: process.env.IOS_CLIENT_ID,
    },
  },
};
