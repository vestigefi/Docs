import clsx from "clsx";
import Heading from "@theme/Heading";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";

type FeatureItem = {
  title: string;
  src: string;
  url: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "Vestige.fi",
    src: "/screenshots/vestige1.png",
    url: "/docs/vestigefi/intro",
    description: (
      <>
        One-stop-shop for Algorand DeFi. Discover new assets, trade them through
        our best in class aggregator and monitor your portfolio.
      </>
    ),
  },
  {
    title: "ChainUI",
    src: "/screenshots/chainui1.png",
    url: "/docs/chainui/intro",
    description: (
      <>
        Decentralized deployment framework for Web3 user interfaces. Store your
        website in a smart contract and serve it to your users, all on-chain.
      </>
    ),
  },
  {
    title: "TameQuest",
    src: "/screenshots/tamequest1.png",
    url: "/docs/tamequest/intro",
    description: (
      <>
        Fully decentralized pet-battler game. Collect, train and battle your
        creatures with verifiable randomness using Algorand VRF.
      </>
    ),
  },
  {
    title: "rug.ninja",
    src: "/screenshots/rugninja1.png",
    url: "/docs/tamequest/intro",
    description: (
      <>
        Bonding curve token generator. Create your own token in just a few
        clicks and trade it instantly while collecting liquidity.
      </>
    ),
  },
];

function Feature({ title, src, url, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Link to={url}>
          <img src={src} className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
