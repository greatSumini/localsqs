import o2x from 'object-to-xml';

import { getRandomUuid } from '../helpers';

export const responseSerializer = (name: string, res: unknown) => {
  return o2x({
    [name + 'Response']: {
      [name + 'Result']: res,
      ResponseMetadata: {
        RequestId: getRandomUuid(),
      },
    },
  }).replace(/&#34;/g, '"');
};
