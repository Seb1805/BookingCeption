import { withAndroidManifest } from '@expo/config-plugins';

const withNetworkSettingsPlugin = (config) => {
  return withAndroidManifest(config, (config) => {
    let androidManifest = config.modResults.manifest;

    // Add uses-permission for internet access
    if (!androidManifest['uses-permission']) {
      androidManifest['uses-permission'] = [];
    }
    androidManifest['uses-permission'].push({
      $: {
        "android:name": "android.permission.INTERNET",
        "tools:node": "replace"
      }
    });

    // Enable cleartext traffic
    if (!androidManifest['application']) {
      androidManifest['application'] = [];
    }
    androidManifest['application'].push({
      $: {
        ...androidManifest['application'][0].$,
        "android:usesCleartextTraffic": "true"
      }
    });

    // Add network security configuration
    if (!androidManifest['application'][0]['network-security-config']) {
      androidManifest['application'][0]['network-security-config'] = {};
    }
    androidManifest['application'][0]['network-security-config']['$'] = {
      ...androidManifest['application'][0]['network-security-config']['$'],
      "debug-overrides": {
        "trust-anchors": [
          {"certificates": "user"},
          {"certificates": "system"}
        ]
      }
    };

    return config;
  });
};

export default withNetworkSettingsPlugin;
