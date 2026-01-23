/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly ANTHROPIC_API_KEY: string;
  readonly VITE_NOTION_API_KEY: string;
  readonly VITE_NOTION_DATABASE_ID: string;
  readonly NOTION_CASES_DATABASE_ID: string;
  readonly CONTACT_NOTION_DATABASE_ID: string;
  readonly RESEND_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
