import { forwardRef } from 'react';

import { Icon, IconProps } from '@/component-library/Icon';

const Talisman = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <Icon {...props} ref={ref} viewBox='0 0 78 78' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <title>Talisman</title>
    <circle cx='39' cy='39' r='39' fill='#D5FF5C' />
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M58.116 42.663c.608 1.324 2.399 1.792 3.43.762l1.889-1.89a5 5 0 0 1 7.071 7.071L55.234 63.878C51.565 68.233 46.071 71 39.931 71c-6.403 0-12.103-3.009-15.763-7.69L9.465 48.607a5 5 0 1 1 7.07-7.071l1.862 1.861c1.008 1.008 2.757.555 3.353-.74a1.94 1.94 0 0 0 .181-.813V19a5 5 0 0 1 10 0v11.556c0 .995 1.019 1.67 1.967 1.37.6-.19 1.034-.736 1.034-1.365V12a5 5 0 0 1 10 0v18.561c0 .63.433 1.176 1.033 1.365.948.3 1.966-.375 1.966-1.37V19a5 5 0 0 1 10 0v22.835c0 .287.065.567.185.828Z'
      fill='#FD4848'
    />
    <path d='M55.932 53s-7.163 10-16 10-16-10-16-10 7.163-10 16-10 16 10 16 10Z' fill='#D5FF5C' />
    <path d='M47.431 53a7.5 7.5 0 1 1-14.999 0 7.5 7.5 0 0 1 15 0Z' stroke='#FD4848' strokeWidth='1.001' />
    <path d='M44.431 53a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z' stroke='#FD4848' strokeWidth='1.001' />
    <path
      d='M50.431 53c0 5.799-4.7 10.5-10.5 10.5-5.798 0-10.499-4.701-10.499-10.5s4.701-10.5 10.5-10.5c5.798 0 10.5 4.701 10.5 10.5Z'
      stroke='#FD4848'
      strokeWidth='1.001'
    />
    <path
      d='M53.431 53c0 7.456-6.044 13.5-13.5 13.5-7.455 0-13.499-6.044-13.499-13.5s6.044-13.5 13.5-13.5c7.455 0 13.5 6.044 13.5 13.5Z'
      stroke='#FD4848'
      strokeWidth='1.001'
    />
    <path d='M39.932 55a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z' fill='#FD4848' />
    <path
      d='M24.652 53.122a22.458 22.458 0 0 1-.095-.122 27.45 27.45 0 0 1 1.01-1.236 33.198 33.198 0 0 1 3.378-3.385c2.865-2.474 6.75-4.879 10.987-4.879s8.121 2.405 10.986 4.879a33.19 33.19 0 0 1 4.294 4.499l.095.122-.095.122a33.19 33.19 0 0 1-4.294 4.5c-2.865 2.473-6.75 4.877-10.986 4.877-4.237 0-8.122-2.404-10.987-4.878a33.198 33.198 0 0 1-4.293-4.499Z'
      stroke='#D5FF5C'
      strokeWidth='1.001'
    />
  </Icon>
));

Talisman.displayName = 'Talisman';

export { Talisman };