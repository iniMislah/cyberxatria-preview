import packageJson from "../../package.json";

/** Release version (SemVer). Override at build with NEXT_PUBLIC_APP_VERSION. */
export const APP_VERSION =
  process.env.NEXT_PUBLIC_APP_VERSION ?? packageJson.version;
