// # Task

// List out the computational inefficiencies and anti-patterns found in the code block below.

// 1. This code block uses
//     1. ReactJS with TypeScript.
//     2. Functional components.
//     3. React Hooks
// 2. You should also provide a refactored version of the code, but more points are awarded to accurately stating the issues and explaining correctly how to improve them.

interface WalletBalance {
  currency: string;
  amount: number;
}
// Do not need currency and amount
interface FormattedWalletBalance {
  currency: string;
  amount: number;
  formatted: string;
}
// Extends not necessary
interface Props extends BoxProps {}
// discouraged pattern React.FC
const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();
  // move outside component, do not use any, use string instead
  const getPriority = (blockchain: any): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        // lhsPriority undefined, maybe balancePriority
        if (lhsPriority > -99) {
          // use &&
          if (balance.amount <= 0) {
            // with logic of getPriority then filter result will be empty
            return true;
          }
        }
        return false;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        // missing blockchain property in WalletBalance interface
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        // missing return 0
        if (leftPriority > rightPriority) {
          return -1;
        } else if (rightPriority > leftPriority) {
          return 1;
        }
      });
  // since getPriority in component, add getPriority into dependencies list
  // remove prices
  }, [balances, prices]);
  // unused formattedBalances
  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed(),
    };
  });
  // sortedBalances is WalletBalance, not FormattedWalletBalance, maybe use formattedBalances
  // memoize rows
  const rows = sortedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      // error handling for price calculation
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          className={classes.row}
          // do not use index as key
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
