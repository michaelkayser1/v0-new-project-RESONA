// Site configuration using environment variables
export const siteConfig = {
  mainSite: {
    url: process.env.MAIN_SITE_URL || "https://kayser-medical.com",
    name: process.env.MAIN_SITE_NAME || "Kayser Medical",
  },
  qote: {
    name: "QOTE",
    fullName: "Quantum Oscillator Theory of Everything",
    description: "Reality emerges from oscillation, coherence, and resonance.",
  },
  contact: {
    email: "mike@kayser-medical.com",
    kofi: "https://ko-fi.com/qote868413",
  },
  social: {
    kofiUsername: "qote868413",
  },
}

// Helper function to get the main site URL
export function getMainSiteUrl(): string {
  return siteConfig.mainSite.url
}

// Helper function to get the main site name
export function getMainSiteName(): string {
  return siteConfig.mainSite.name
}
