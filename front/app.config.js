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
      eas: {
        projectId: "7840d08f-0feb-4f5e-9438-7aa843191468"
      }
    },
    updates: {
      url: "https://u.expo.dev/7840d08f-0feb-4f5e-9438-7aa843191468"
    },
    runtimeVersion: "1.0.0"
  },
};
