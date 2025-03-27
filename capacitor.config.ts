import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.emiliano.portfolio',
  appName: 'Emiliano Portfolio',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    hostname: 'emilianodev.netlify.app',
    url: 'https://emilianodev.netlify.app'
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystoreAlias: 'key0',
      keystorePassword: 'portfolio123',
      keyPassword: 'portfolio123'
    }
  }
};

export default config;