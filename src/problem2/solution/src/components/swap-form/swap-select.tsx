import { Form, Select, Spin, Typography } from "antd";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useTokens } from "../../hooks";
import { IMG_PREFIX } from "../../constants";
import "./swap-select.css";
import debounce  from "lodash/debounce";

const { Option } = Select;

type SwapSelectProps = {
  label: string;
  name: string;
  placeholder: string;
};

const SwapSelect = ({ label, name, placeholder }: SwapSelectProps) => {
  const { loading, fetchTokens } = useTokens();
  const [options, setOptions] = useState<
    Array<{ name: string; extension: string }>
  >([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOptions = useCallback(
    async (search = "", pageNum = 1) => {
      const result = await fetchTokens(pageNum, search);

      setOptions((prev) =>
        pageNum === 1 ? result?.data || [] : [...prev, ...(result?.data || [])]
      );
      setHasMore(!!result?.hasNextPage);
    },
    [fetchTokens]
  );

  const debouncedSearch = useMemo(
    () =>
      debounce((val: string) => {
        setSearchTerm(val);
        setPage(1);
      }, 300),
    []
  );

  useEffect(() => {
    fetchOptions(searchTerm, 1);
  }, [searchTerm, fetchOptions]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel(); // Cleanup on unmount
    };
  }, [debouncedSearch]);


  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    if (
      target.scrollTop + target.offsetHeight >= target.scrollHeight - 10 &&
      hasMore &&
      !loading
    ) {
      const nextPage = page + 1;
      fetchOptions(searchTerm, nextPage);
      setPage(nextPage);
    }
  };

  return (
    <Form.Item
      label={label}
      name={name}
      rules={[{ required: true, message: "Required" }]}
    >
      <Select
        placeholder={placeholder}
        showSearch
        notFoundContent={loading ? <Spin size="small" /> : "No results"}
        onPopupScroll={handleScroll}
        onSearch={debouncedSearch}
      >
        {options.map((opt) => (
          <Option key={opt.name} value={opt.name}>
            <div className="swap-select__option">
              <img
                src={`${IMG_PREFIX}${opt.name}.${opt.extension}`}
                alt={opt.name}
                className="swap-select__img"
              />
              <Typography.Text>{opt.name}</Typography.Text>
            </div>
          </Option>
        ))}
      </Select>
    </Form.Item>
  );
};

export default SwapSelect;
