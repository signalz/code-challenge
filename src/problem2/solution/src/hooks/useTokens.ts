import { useState, useCallback } from "react";
import TOKENS from "../mock-data/tokens.json";
import PRICES from "../mock-data/prices.json";
import { NUMBER_PER_PAGE } from "../constants";

type Token = null | {
  data: { name: string; extension: string }[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
};

type TokenResponse = Promise<Token>;

export const useTokens = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fetchTokens = useCallback(
    async (page: number, search: string): TokenResponse => {
      setLoading(true);
      try {
        // Simulate fetching tokens from an API
        const tokens: Token = await new Promise((resolve) => {
          // Validate page
          if (!Number.isInteger(page) || page < 1) {
            resolve(null);
            return;
          }

          const filteredTokens = TOKENS.filter((token) =>
            token.name.toLowerCase().includes(search.toLowerCase())
          );

          const totalPages = Math.ceil(filteredTokens.length / NUMBER_PER_PAGE);

          // Return null for invalid page range
          if (page > totalPages) {
            resolve(null);
            return;
          }

          const startIndex = (page - 1) * NUMBER_PER_PAGE;
          const endIndex = startIndex + NUMBER_PER_PAGE;

          const response = filteredTokens.slice(startIndex, endIndex);
          setTimeout(() => {
            resolve({
              data: response,
              currentPage: page,
              totalPages,
              hasNextPage: endIndex < TOKENS.length,
            });
          }, 1000);
        });
        return new Promise((resolve) => resolve(tokens));
      } catch (err) {
        setError("Failed to fetch tokens");
        console.error(err);
        return new Promise((resolve) => resolve(null));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, fetchTokens };
};

export const useTokenPrice = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const fetchPrice = useCallback(
    async (
      tokenNameSend: string,
      tokenNameReceive: string
    ): Promise<Record<string, number> | null> => {
      setLoading(true);
      try {
        const tokenPriceObject = PRICES.reduce((acc, curr) => {
          acc[curr.currency.toLowerCase()] = curr.price;
          return acc;
        }, {} as Record<string, number>);

        if (
          tokenPriceObject[tokenNameSend.toLowerCase()] &&
          tokenPriceObject[tokenNameReceive.toLowerCase()]
        ) {
          const priceData: Record<string, number> = await new Promise(
            (resolve) => {
              setTimeout(() => {
                const priceData = {
                  [tokenNameSend]:
                    tokenPriceObject[tokenNameSend.toLowerCase()],
                  [tokenNameReceive]:
                    tokenPriceObject[tokenNameReceive.toLowerCase()],
                };
                resolve(priceData);
              }, 1000);
            }
          );
          return new Promise((resolve) => resolve(priceData));
        } else {
          throw new Error("Token price not found");
        }
      } catch (err) {
        setError("Failed to fetch token price");
        console.error(err);
        return new Promise((resolve) => resolve(null));
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, fetchPrice };
};
