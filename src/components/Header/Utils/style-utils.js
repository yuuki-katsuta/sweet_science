import { css } from 'styled-components';

export const media = {
  handheld420: (...args) => css`
    @media (max-width: 421px) {
      ${css(...args)};
    }
  `,
};
