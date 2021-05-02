import { css } from 'styled-components';

export const media = {
  handheld420: (...args) => css`
    @media (max-width: 421px) {
      ${css(...args)};
    }
  `,
  handheld1024: (...args) => css`
    @media (min-width: 1024px) {
      ${css(...args)};
    }
  `,
};
