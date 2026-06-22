# Vercel / Next.js security patch

Updated Next.js from 14.2.30 to 14.2.35 and eslint-config-next to 14.2.35.

The npm deprecation messages for transitive packages are warnings, not build failures. The important warning was the Next.js security advisory, which this package version update addresses while staying on the Next.js 14 line.

Redeploy by replacing the GitHub repo contents with this ZIP contents, then trigger a fresh Vercel deployment.
