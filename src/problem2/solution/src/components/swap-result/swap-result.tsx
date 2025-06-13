import { Typography } from "antd";
import { formatRate, exchangeRate } from "../../utils";
import { useMemo } from "react";
import _ from "lodash";
import "./swap-result.css";

type Props = {
  inputSend: number;
  selectSend: string;
  inputReceive: number;
  selectReceive: string;
  priceSend: number;
  priceReceive: number;
};

const SwapResult = ({
  inputReceive,
  inputSend,
  selectReceive,
  selectSend,
  priceReceive,
  priceSend,
}: Props) => {
  const exchangeRates = useMemo(() => {
    const sentRate = exchangeRate(priceSend, priceReceive);
    const receivedRate = exchangeRate(priceReceive, priceSend);
    return _.mapValues({
      sentRate: formatRate(sentRate),
      receivedRate: formatRate(receivedRate),
      sentValue: formatRate(_.multiply(inputSend, sentRate)),
      receivedValue: formatRate(_.multiply(inputReceive, receivedRate)),
    });
  }, [inputSend, inputReceive, priceReceive, priceSend]);

  return (
    <div className="swap-result-container">
      <div className="swap-result-header">
        <Typography.Title level={3}>Current prices:</Typography.Title>
        <Typography.Paragraph>
          <Typography.Text>{selectSend}</Typography.Text>:{" "}
          <Typography.Text>{priceSend}</Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          <Typography.Text>{selectReceive}</Typography.Text>:{" "}
          <Typography.Text>{priceReceive}</Typography.Text>
        </Typography.Paragraph>
      </div>
      <div className="swap-result-rates">
        <Typography.Title level={4}>Swap Rates:</Typography.Title>
        <div className="swap-result-rates-results">
          <div className="swap-result-rates-details swap-result-rates-sent-item">
            <Typography.Paragraph>
              <Typography.Text>{`${selectSend} → ${selectReceive}`}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>{`${inputSend} ${selectSend} = ${exchangeRates.sentValue} ${selectReceive}`}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text italic>
                Sent {inputSend} {selectSend} to receive{" "}
                {exchangeRates.sentValue} {selectReceive}
              </Typography.Text>
            </Typography.Paragraph>
          </div>

          <div className="swap-result-rates-details swap-result-rates-received-item">
            <Typography.Paragraph>
              <Typography.Text>{`${selectReceive} → ${selectSend}`}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text strong>{`${inputReceive} ${selectReceive} = ${exchangeRates.receivedValue} ${selectSend}`}</Typography.Text>
            </Typography.Paragraph>
            <Typography.Paragraph>
              <Typography.Text italic>
                Receive {inputReceive} {selectReceive} by sending{" "}
                {exchangeRates.receivedValue} {selectSend}
              </Typography.Text>
            </Typography.Paragraph>
          </div>
        </div>
      </div>
      <div className="swap-result-summary">
        <Typography.Title level={4}>Price Summary:</Typography.Title>
        <Typography.Paragraph>
          •{" "}
          <Typography.Text>
            1 {selectSend} = {`${exchangeRates.sentRate} ${selectReceive}`}
          </Typography.Text>
        </Typography.Paragraph>
        <Typography.Paragraph>
          •{" "}
          <Typography.Text>
            1 {selectReceive} = {`${exchangeRates.receivedRate} ${selectSend}`}
          </Typography.Text>
        </Typography.Paragraph>
      </div>
    </div>
  );
};

export default SwapResult;
