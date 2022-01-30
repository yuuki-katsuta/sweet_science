import { css } from 'styled-components';

export const media = {
  handheld420: (...args) => css`
    @media (max-width: 421px) {
      ${css(...args)};
    }
  `,
  handheld580: (...args) => css`
    @media (max-width: 580px) {
      ${css(...args)};
    }
  `,
  handheld581: (...args) => css`
    @media (min-width: 581px) {
      ${css(...args)};
    }
  `,
  handheld710: (...args) => css`
    @media (max-width: 711px) {
      ${css(...args)};
    }
  `,
  handheld1024: (...args) => css`
    @media (min-width: 1024px) {
      ${css(...args)};
    }
  `,
};
