import { Form, InputNumber } from "antd";

type SwapFormProps = {
  label: string;
  name: string;
  placeholder: string;
};

const SwapInput = ({ label, name, placeholder }: SwapFormProps) => {
  // Custom validator for the input field
  // Ensures the input is a number greater than 0
  const numberValidator = (_: unknown, value: string) => {
    if (!value) {
      return Promise.reject("This field is required");
    }

    const num = Number(value);
    if (isNaN(num)) {
      return Promise.reject("Must be a number");
    }
    if (num <= 0) {
      return Promise.reject("Must be greater than 0");
    }
    return Promise.resolve();
  };
  // TODO: Format displayed value
  // TODO: Input suggestions
  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ validator: numberValidator }]}
      style={{ width: "100%" }}
    >
      <InputNumber
        placeholder={placeholder}
        type="number"
        style={{ width: "100%" }}
        min={0}
        step={0.01}
      />
    </Form.Item>
  );
};

export default SwapInput;
