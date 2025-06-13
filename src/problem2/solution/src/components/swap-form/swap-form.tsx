import { Form, Button, Row, Col, Typography, Modal } from "antd";
import "./swap-form.css";
import SwapInput from "./swap-input";
import SwapSelect from "./swap-select";
import { useTokenPrice } from "../../hooks";
import { SwapResult } from "../swap-result";

type FormValues = {
  input_send: number;
  select_send: string;
  input_receive: number;
  select_receive: string;
};

const SwapForm = () => {
  const [form] = Form.useForm();
  const { loading, fetchPrice } = useTokenPrice();
  const [modal, contextHolder] = Modal.useModal();

  const handleSubmit = async (values: FormValues) => {
    const { input_send, select_send, input_receive, select_receive } = values;
    if (select_receive === select_send) {
      form.setFields([
        {
          name: "select_receive",
          errors: ["Cannot swap the same token"],
        },
      ]);
      form.setFields([
        {
          name: "select_send",
          errors: ["Cannot swap the same token"],
        },
      ]);
      return;
    }
    const priceData = await fetchPrice(select_send, select_receive);
    if (!priceData) {
      modal.error({
        title: "Error",
        content: "Failed to fetch token price. Please try again later.",
        okButtonProps: { danger: true, type: "primary" },
      });
      return;
    }

    modal.success({
      title: "Swap Success",
      content: (
        <SwapResult
          inputReceive={input_receive}
          inputSend={input_send}
          selectReceive={select_receive}
          selectSend={select_send}
          priceReceive={priceData[select_receive]}
          priceSend={priceData[select_send]}
        />
      ),
      okButtonProps: { type: "primary" },
    });
    console.log("Form submitted:", priceData);
  };

  return (
    <>
      <Typography.Title level={2}>Swap</Typography.Title>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Row gutter={16}>
          <Col span={12} className="swap-form__col">
            <SwapInput
              placeholder="Enter amount to send"
              label="Amount to send"
              name="input_send"
            />
          </Col>
          <Col span={12} className="swap-form__col">
            <SwapSelect
              label="Token"
              name="select_send"
              placeholder="Select token"
            />
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12} className="swap-form__col">
            <SwapInput
              placeholder="Enter amount to receive"
              label="Amount to receive"
              name="input_receive"
            />
          </Col>
          <Col span={12} className="swap-form__col">
            <SwapSelect
              label="Token"
              name="select_receive"
              placeholder="Select token"
            />
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="swap-form__button"
            loading={loading}
          >
            confirm swap
          </Button>
        </Form.Item>
      </Form>
      {contextHolder}
    </>
  );
};

export default SwapForm;
