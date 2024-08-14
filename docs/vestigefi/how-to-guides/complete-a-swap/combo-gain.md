# Combo Gain

When a user completes a swap, the transaction combo gain is based on the amount of [Vest #700965019](https://vestige.fi/asset/700965019) the user holds.

The bonuses gained are based on the following tiers:

- No Tier: (0 Vest): \~20% gain
- Tier 0 (1 Vest): \~25% gain
- Tier 1 (10 Vest): \~40% gain
- Tier 2 (100 Vest): \~66% gain
- Tier 2 (5,000 Vest): \~82% gain
- Tier 2 (25,000 Vest) \~93% gain
- Tier 3 (75,000 Vest): 100% gain

Note: For a swap that goes to a single route, no bonuses will be shared due to no gains being generated.

**Formula for Combo Gain Percentage**

```mathml
25% + log10(amount) * 15.3845% in [1,75000]
```

**​Gain**: When the swap occurs, the gain amount is the amount the aggregator saves the user by combining the swap across multiple routes. Based on your VEST holding tier you will receive more of the gained amount up to 100%.
