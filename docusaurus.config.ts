import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Vestige Labs",
  tagline: "Detailed documentation for Vestige Labs products",
  favicon: "img/logo.svg",

  // Set the production url of your site here
  url: "https://docs.vestigelabs.org",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "vestigefi", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Vestige Labs",
      logo: {
        alt: "Vestige Labs",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "vestigefi/intro",
          position: "left",
          label: "Vestige.fi",
        },
        {
          type: "doc",
          docId: "chainui/intro",
          position: "left",
          label: "ChainUI",
        },
        {
          type: "doc",
          docId: "tamequest/intro",
          position: "left",
          label: "TameQuest",
        },
        {
          type: "doc",
          docId: "rugninja/intro",
          position: "left",
          label: "rug.ninja",
        },
        {
          href: "https://github.com/vestigefi",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Vestige Labs",
          items: [
            {
              label: "Discord",
              href: "https://discord.com/invite/fMqSB5vRX2",
            },
            {
              label: "Twitter/X",
              href: "https://x.com/vestigefi",
            },
            {
              label: "GitHub",
              href: "https://github.com/vestigefi",
            },
          ],
        },
        {
          title: "Vestige.fi",
          items: [
            {
              label: "Documentation",
              to: "/docs/vestigefi/intro",
            },
            {
              label: "Website",
              href: "https://vestige.fi",
            },
          ],
        },
        {
          title: "rug.ninja",
          items: [
            {
              label: "Documentation",
              to: "/docs/rugninja/intro",
            },
            {
              label: "Website",
              href: "https://rug.ninja",
            },
            {
              label: "Twitter/X",
              href: "https://x.com/rug_ninja",
            },
          ],
        },

        {
          title: "ChainUI",
          items: [
            {
              label: "Documentation",
              to: "/docs/chainui/intro",
            },

            {
              label: "Website",
              href: "https://chainui.com",
            },
            {
              label: "Twitter/X",
              href: "https://x.com/chain_ui",
            },
          ],
        },
        {
          title: "TameQuest",
          items: [
            {
              label: "Documentation",
              to: "/docs/tamequest/intro",
            },
            {
              label: "Testnet MVP",
              href: "https://testnet.tamequest.com",
            },
            {
              label: "Twitter/X",
              href: "https://x.com/tame_quest",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vestige Labs.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
