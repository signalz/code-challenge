import _ from "lodash";

export const formatRate = (rate: number) => {
  return _.round(rate, 20);
};

export const exchangeRate = (send: number, receive: number) => {
  return _.divide(send, receive);
};
