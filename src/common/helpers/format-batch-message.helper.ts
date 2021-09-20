import { formatMessage } from '.';

export const formatBatchMessage = (data: Record<string, string>) => {
  const result: Array<
    Record<string, unknown> & {
      attributes: unknown[];
    }
  > = [];

  Object.entries(data).forEach(([key, value]) => {
    // Attribute인데 Entry Id가 아니면 모두 skip
    if (!/.+Entry\.\d\.Id/.test(key)) {
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const [, index] = key.match(/.+Entry\.(\d)\.Id/)!;

    const entryData: Record<string, unknown> = {};
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    Object.keys(data).forEach((_key) => {
      const matched = _key.match(new RegExp(`Entry\.${index}\.`));
      if (matched) {
        const entryKey = _key.replace(
          new RegExp(`^.+Entry\.${index}\.`, ''),
          ''
        );

        entryData[entryKey] = data[_key];
      }
    })!;

    const message = formatMessage(entryData);

    result.push({
      Id: value,
      ...message,
    });
  });

  return result;
};
