import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.38c11b0d6ee74843a1d784eb8fe74779',
  appName: 'jecob-gujarati-vassistant',
  webDir: 'dist',
  server: {
    url: 'https://38c11b0d-6ee7-4843-a1d7-84eb8fe74779.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#ffffff",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true
    }
  }
};

export default config;