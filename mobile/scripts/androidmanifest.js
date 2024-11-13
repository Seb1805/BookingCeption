const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function androidManifestPlugin(config) {
  return withAndroidManifest(config, async config => {
    let androidManifest = config.modResults.manifest;

    // Modify the manifest here
    if (!androidManifest.$) {
      androidManifest.$ = {};
    }
    androidManifest.$["xmlns:tools"] = "http://schemas.android.com/tools";

    // Add or modify permissions
    if (!androidManifest["uses-permission"]) {
      androidManifest["uses-permission"] = [];
    }
    androidManifest["uses-permission"].push({
      $: {
        "android:name": "android.permission.INTERNET",
        "tools:node": "replace"
      }
    });

    return config;
  });
};
