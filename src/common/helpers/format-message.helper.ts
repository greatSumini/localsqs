export const formatMessage = (data: Record<string, unknown>) => {
  const result: Record<string, unknown> & {
    attributes: unknown[];
  } = {
    attributes: [],
  };

  Object.entries(data).forEach(([key, value]) => {
    // 일반 field면 값을 그대로 할당
    if (!/Attribute\.\d\./.test(key)) {
      result[key] = value;
      return;
    }
    // Attribute인데 Name이 아니면 일단 skip
    if (!/.+Attribute\.\d\.Name/.test(key)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [, index] = key.match(/.+Attribute\.(\d)\.Name/)!;

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const valueKey = Object.keys(data).find((_key) =>
      new RegExp(`Attribute\.${index}\.Value\..+Value`).test(_key)
    )!;

    result.attributes.push({
      Name: value,
      Value: data[valueKey] ?? '',
    });
  });

  return result;
};
