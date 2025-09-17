import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';

const E = (i) => {
  const r = c(3), { error: e } = i;
  let o;
  r[0] === Symbol.for("react.memo_cache_sentinel") ? (o = jsx("h1", { className: "text-2xl font-bold text-red-500 mb-4", children: "Error Loading Movies" }), r[0] = o) : o = r[0];
  let t;
  return r[1] !== e.message ? (t = jsxs("div", { className: "container mx-auto px-4 py-8", children: [o, jsx("p", { className: "text-red-400", children: e.message })] }), r[1] = e.message, r[2] = t) : t = r[2], t;
};

export { E as errorComponent };
//# sourceMappingURL=index-DP-tBrOQ.mjs.map
