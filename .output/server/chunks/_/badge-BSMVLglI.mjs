import { jsx } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function p(...o) {
  return twMerge(clsx(o));
}
const m = cva("inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", { variants: { variant: { default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90", secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90", destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60", outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground" } }, defaultVariants: { variant: "default" } });
function B(o) {
  const e = c(12);
  let r, t, s, i;
  e[0] !== o ? ({ className: r, variant: i, asChild: s, ...t } = o, e[0] = o, e[1] = r, e[2] = t, e[3] = s, e[4] = i) : (r = e[1], t = e[2], s = e[3], i = e[4]);
  const d = (s === void 0 ? false : s) ? Slot : "span";
  let a;
  e[5] !== r || e[6] !== i ? (a = p(m({ variant: i }), r), e[5] = r, e[6] = i, e[7] = a) : a = e[7];
  let n;
  return e[8] !== d || e[9] !== t || e[10] !== a ? (n = jsx(d, { "data-slot": "badge", className: a, ...t }), e[8] = d, e[9] = t, e[10] = a, e[11] = n) : n = e[11], n;
}

export { B, p };
//# sourceMappingURL=badge-BSMVLglI.mjs.map
