import { jsx, jsxs } from 'react/jsx-runtime';
import { c } from 'react/compiler-runtime';
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useRouter, useParams } from '@tanstack/react-router';
import { ArrowLeft, Plus, MessageCircle, Send, ThumbsUp, Reply, Share, ExternalLink } from 'lucide-react';
import { B } from './badge-BSMVLglI.mjs';
import { a as Et, s as gt } from './ssr.mjs';
import '@radix-ui/react-slot';
import 'class-variance-authority';
import 'clsx';
import 'tailwind-merge';
import 'zustand';
import 'zustand/middleware';
import 'tiny-invariant';
import '@tanstack/router-core';
import '@tanstack/router-core/ssr/client';
import 'node:async_hooks';
import '@tanstack/history';
import '@tanstack/router-core/ssr/server';
import '@tanstack/react-router/ssr/server';

const Ne = (l) => {
  const e = c(3), { movie: t } = l;
  let n;
  e[0] === Symbol.for("react.memo_cache_sentinel") ? (n = jsx("source", { src: "https://res.cloudinary.com/dubc3wnbv/video/upload/v1757295154/IMG_2779_bax6bk.mov", type: "video/quicktime" }), e[0] = n) : n = e[0];
  let c$1;
  return e[1] !== t.poster_path ? (c$1 = jsx("div", { className: " bg-black text-white relative", children: jsxs("video", { height: "250px", poster: t.poster_path, preload: "metadata", "aria-label": "Play movie", className: "w-full lg:h-[550px] sm:h-[250px]", controls: true, children: [n, "Your browser does not support the video tag."] }) }), e[1] = t.poster_path, e[2] = c$1) : c$1 = e[2], c$1;
}, we = ({ movieId: l }) => {
  var f;
  const [e, t] = useState([]), [n, c] = useState(""), [T, N] = useState(true), [m, g] = useState(false), w = useNavigate(), u = useRouter(), p = useParams({ from: "/movie/$id" }), y = useRef(null);
  useEffect(() => ((async () => {
    try {
      g(true);
      const s = await gt({ data: l });
      if (!s.body) throw new Error("No response body");
      const i = s.body.getReader(), D = new TextDecoder();
      for (; ; ) {
        const { done: v, value: C } = await i.read();
        if (v) break;
        const M = D.decode(C, { stream: true }).split(`
`);
        for (const S of M) if (S.startsWith("data: ")) try {
          const d = JSON.parse(S.slice(6));
          d.type === "initial" ? (t(d.comments.map((h) => ({ ...h, timestamp: new Date(h.timestamp) }))), N(false)) : d.type === "new" && t((h) => [{ ...d.comment, timestamp: new Date(d.comment.timestamp) }, ...h]);
        } catch (d) {
          console.error("Error parsing SSE data:", d);
        }
      }
    } catch (s) {
      console.error("Streaming error:", s), t([{ id: "1", author: "Sarah Johnson", content: "Amazing cinematography! The visuals were absolutely stunning.", timestamp: new Date(Date.now() - 18e5), likes: 15, replies: [{ id: "1-1", author: "Mike Chen", content: "Totally agree! The color grading was perfect.", timestamp: new Date(Date.now() - 9e5), likes: 3 }] }, { id: "2", author: "Alex Rodriguez", content: "The soundtrack really elevated the emotional moments. Brilliant film!", timestamp: new Date(Date.now() - 72e5), likes: 8 }, { id: "3", author: "Emma Wilson", content: "Character development was top-notch. Every actor delivered outstanding performances.", timestamp: new Date(Date.now() - 864e5), likes: 22 }]), N(false);
    } finally {
      g(false);
    }
  })(), () => {
    y.current && y.current.close();
  }), [l]);
  const x = (o) => {
    if (o.preventDefault(), !n.trim()) return;
    const s = { id: Date.now().toString(), author: "You", content: n.trim(), timestamp: /* @__PURE__ */ new Date(), likes: 0 };
    t((i) => [s, ...i]), c(""), w({ to: "/movie/$id", params: { id: p.id }, search: { commented: "true" }, replace: true });
  }, b = (o) => {
    const s = `${window.location.origin}/movie/${p.id}#comment-${o}`;
    navigator.share ? navigator.share({ title: "Check out this comment", url: s }) : (navigator.clipboard.writeText(s), alert("Comment link copied to clipboard!"));
  }, _ = (o) => {
    const i = Math.floor(((/* @__PURE__ */ new Date()).getTime() - o.getTime()) / (1e3 * 60));
    return i < 60 ? `${i}m ago` : i < 1440 ? `${Math.floor(i / 60)}h ago` : `${Math.floor(i / 1440)}d ago`;
  };
  return T ? jsxs("div", { className: "bg-card border border-border rounded-xl p-8", children: [jsxs("h2", { className: "text-2xl font-bold text-card-foreground mb-6 font-['Poppins'] flex items-center gap-3", children: [jsx(MessageCircle, { className: "w-6 h-6" }), "Comments", jsx(B, { variant: "secondary", className: "ml-2", children: m ? "Streaming..." : "Loading..." })] }), jsx("div", { className: "space-y-4", children: [1, 2, 3].map((o) => jsx("div", { className: "animate-pulse", children: jsxs("div", { className: "flex items-start gap-4", children: [jsx("div", { className: "w-10 h-10 bg-muted rounded-full" }), jsxs("div", { className: "flex-1", children: [jsx("div", { className: "h-4 bg-muted rounded w-1/4 mb-2" }), jsx("div", { className: "h-3 bg-muted rounded w-3/4 mb-1" }), jsx("div", { className: "h-3 bg-muted rounded w-1/2" })] })] }) }, o)) })] }) : jsxs("div", { className: "bg-card border border-border rounded-xl p-8", children: [jsxs("div", { className: "flex items-center justify-between mb-6", children: [jsxs("h2", { className: "text-2xl font-bold text-card-foreground font-['Poppins'] flex items-center gap-3", children: [jsx(MessageCircle, { className: "w-6 h-6" }), "Comments", jsx(B, { variant: "secondary", className: "ml-2", children: e.length }), m && jsx(B, { variant: "outline", className: "ml-2 text-xs animate-pulse", children: "Live" })] }), jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [jsxs("span", { children: ["Movie ID: ", p.id] }), ((f = u.state.location.search) == null ? void 0 : f.commented) && jsx(B, { variant: "outline", className: "text-xs", children: "Recently Commented" })] })] }), jsx("form", { onSubmit: x, className: "mb-8", children: jsxs("div", { className: "flex flex-col gap-3", children: [jsx("textarea", { value: n, onChange: (o) => c(o.target.value), placeholder: "Share your thoughts about this movie...", className: "w-full p-4 bg-background border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder-muted-foreground", rows: 3 }), jsx("div", { className: "flex justify-end", children: jsxs("button", { type: "submit", disabled: !n.trim(), className: "inline-flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-muted disabled:text-muted-foreground text-primary-foreground border border-primary rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 disabled:cursor-not-allowed", children: [jsx(Send, { className: "w-4 h-4" }), "Post Comment"] }) })] }) }), jsx("div", { className: "space-y-6", children: e.map((o) => jsx("div", { id: `comment-${o.id}`, className: "border-b border-border pb-6 last:border-b-0 last:pb-0", children: jsxs("div", { className: "flex items-start gap-4", children: [jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full flex items-center justify-center", children: jsx("span", { className: "text-sm font-semibold text-primary", children: o.author.split(" ").map((s) => s[0]).join("").slice(0, 2).toUpperCase() }) }), jsxs("div", { className: "flex-1", children: [jsxs("div", { className: "flex items-center gap-2 mb-2", children: [jsx("h4", { className: "font-semibold text-card-foreground", children: o.author }), jsx("span", { className: "text-sm text-muted-foreground", children: "\u2022" }), jsx("span", { className: "text-sm text-muted-foreground", children: _(o.timestamp) }), u.state.location.pathname === `/movie/${p.id}` && jsx(B, { variant: "outline", className: "text-xs", children: "Current Movie" })] }), jsx("p", { className: "text-card-foreground mb-3 leading-relaxed", children: o.content }), jsxs("div", { className: "flex items-center gap-4 text-sm", children: [jsxs("button", { className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors", children: [jsx(ThumbsUp, { className: "w-4 h-4" }), o.likes > 0 && jsx("span", { children: o.likes })] }), jsxs("button", { className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors", children: [jsx(Reply, { className: "w-4 h-4" }), "Reply"] }), jsxs("button", { onClick: () => b(o.id), className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors", children: [jsx(Share, { className: "w-4 h-4" }), "Share"] }), jsxs("button", { onClick: () => w({ to: "/" }), className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors", children: [jsx(ExternalLink, { className: "w-4 h-4" }), "Browse More"] })] }), o.replies && o.replies.length > 0 && jsx("div", { className: "mt-4 pl-6 border-l border-border space-y-4", children: o.replies.map((s) => jsxs("div", { className: "flex items-start gap-3", children: [jsx("div", { className: "w-8 h-8 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full flex items-center justify-center", children: jsx("span", { className: "text-xs font-semibold text-primary", children: s.author.split(" ").map((i) => i[0]).join("").slice(0, 2).toUpperCase() }) }), jsxs("div", { className: "flex-1", children: [jsxs("div", { className: "flex items-center gap-2 mb-1", children: [jsx("h5", { className: "font-medium text-card-foreground text-sm", children: s.author }), jsx("span", { className: "text-xs text-muted-foreground", children: "\u2022" }), jsx("span", { className: "text-xs text-muted-foreground", children: _(s.timestamp) })] }), jsx("p", { className: "text-sm text-card-foreground mb-2", children: s.content }), jsx("div", { className: "flex items-center gap-3 text-xs", children: jsxs("button", { className: "flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors", children: [jsx(ThumbsUp, { className: "w-3 h-3" }), s.likes > 0 && jsx("span", { children: s.likes })] }) })] })] }, s.id)) })] })] }) }, o.id)) }), e.length === 0 && jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [jsx(MessageCircle, { className: "w-12 h-12 mx-auto mb-3 opacity-50" }), jsx("p", { children: "No comments yet. Be the first to share your thoughts!" })] })] });
}, ye = "https://image.tmdb.org/t/p/w500/", _e = "https://image.tmdb.org/t/p/w1280/", ke = (l) => {
  const e = c(117), { movie: t } = l;
  if (!t) {
    let $, R;
    e[0] === Symbol.for("react.memo_cache_sentinel") ? ($ = jsx("h1", { className: "text-2xl font-bold text-foreground mb-4", children: "Movie not found" }), R = jsx("p", { className: "text-lg text-muted-foreground mb-8 max-w-md", children: "The movie you're looking for doesn't exist or has been removed." }), e[0] = $, e[1] = R) : ($ = e[0], R = e[1]);
    let te;
    return e[2] === Symbol.for("react.memo_cache_sentinel") ? (te = jsx("div", { className: "max-w-6xl mx-auto px-6 md:px-24 min-h-screen bg-background text-foreground", children: jsxs("div", { className: "flex flex-col items-center justify-center min-h-[60vh] text-center p-10", children: [$, R, jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-white/10 text-foreground border border-border rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 no-underline hover:bg-white/20 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", children: [jsx(ArrowLeft, { size: 16 }), "Back to Home"] })] }) }), e[2] = te) : te = e[2], te;
  }
  let n;
  e[3] !== t.release_date ? (n = t.release_date ? new Date(t.release_date).getFullYear() : "Unknown", e[3] = t.release_date, e[4] = n) : n = e[4];
  const c$1 = n;
  let T;
  e[5] !== t.vote_average ? (T = t.vote_average ? t.vote_average.toFixed(1) : "N/A", e[5] = t.vote_average, e[6] = T) : T = e[6];
  const N = T;
  let m, g, w, u, p, y, x, b, _, f, o, s, i, D, v, C, k;
  if (e[7] !== t.backdrop_path || e[8] !== t.poster_path || e[9] !== t.title || e[10] !== t.vote_average || e[11] !== c$1) {
    g = t.vote_average ? Math.round(t.vote_average / 2) : 0, m = Se, _ = "max-w-6xl mx-auto px-6 md:px-24 min-h-screen bg-background text-foreground", e[29] === Symbol.for("react.memo_cache_sentinel") ? (f = jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 bg-white/10 text-foreground border border-border rounded-lg px-5 py-3 text-sm font-medium cursor-pointer transition-all duration-200 mb-8 mt-6 no-underline hover:bg-white/20 hover:-translate-x-1 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2", children: [jsx(ArrowLeft, { size: 16 }), "Back to Movies"] }), e[29] = f) : f = e[29], y = "relative min-h-[60vh] rounded-xl overflow-hidden mb-10 bg-gradient-to-br from-[#141414] to-[#2f2f2f]", e[30] !== t.backdrop_path || e[31] !== t.title ? (x = t.backdrop_path && jsx("img", { src: _e + t.backdrop_path, alt: `${t.title} backdrop`, className: "absolute top-0 left-0 w-full h-full object-cover opacity-30" }), e[30] = t.backdrop_path, e[31] = t.title, e[32] = x) : x = e[32], e[33] === Symbol.for("react.memo_cache_sentinel") ? (b = jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-black/80" }), e[33] = b) : b = e[33], p = "relative z-10 p-10 lg:p-15 h-full flex items-center", w = "grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[300px_1fr] gap-10 lg:gap-10 xl:gap-10 items-start w-full";
    const $ = ye + t.poster_path, R = `${t.title} poster`;
    e[34] !== $ || e[35] !== R ? (u = jsx("div", { className: "lg:sticky lg:top-25 max-w-xs mx-auto lg:mx-0", children: jsx("img", { src: $, alt: R, className: "w-full aspect-[2/3] object-cover rounded-xl shadow-2xl transition-transform duration-300 hover:scale-105", onError: De }) }), e[34] = $, e[35] = R, e[36] = u) : u = e[36], C = "flex-1", e[37] !== t.title ? (k = jsx("h1", { className: "text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-lg", children: t.title }), e[37] = t.title, e[38] = k) : k = e[38], D = "flex items-center gap-6 mb-6 flex-wrap", e[39] !== c$1 ? (v = jsx("span", { className: "text-lg text-white/80 font-medium", children: c$1 }), e[39] = c$1, e[40] = v) : v = e[40], i = "flex items-center gap-2 bg-black/60 px-4 py-2 rounded-lg backdrop-blur-sm", o = "text-yellow-400 text-lg", s = "\u2605".repeat(g), e[7] = t.backdrop_path, e[8] = t.poster_path, e[9] = t.title, e[10] = t.vote_average, e[11] = c$1, e[12] = m, e[13] = g, e[14] = w, e[15] = u, e[16] = p, e[17] = y, e[18] = x, e[19] = b, e[20] = _, e[21] = f, e[22] = o, e[23] = s, e[24] = i, e[25] = D, e[26] = v, e[27] = C, e[28] = k;
  } else m = e[12], g = e[13], w = e[14], u = e[15], p = e[16], y = e[17], x = e[18], b = e[19], _ = e[20], f = e[21], o = e[22], s = e[23], i = e[24], D = e[25], v = e[26], C = e[27], k = e[28];
  let M;
  e[41] !== g ? (M = "\u2606".repeat(5 - g), e[41] = g, e[42] = M) : M = e[42];
  let S;
  e[43] !== M || e[44] !== o || e[45] !== s ? (S = jsxs("div", { className: o, children: [s, M] }), e[43] = M, e[44] = o, e[45] = s, e[46] = S) : S = e[46];
  let d;
  e[47] !== N ? (d = jsx("span", { className: "text-white font-semibold text-lg", children: N }), e[47] = N, e[48] = d) : d = e[48];
  let h;
  e[49] !== S || e[50] !== d || e[51] !== i ? (h = jsxs("div", { className: i, children: [S, d] }), e[49] = S, e[50] = d, e[51] = i, e[52] = h) : h = e[52];
  let j;
  e[53] !== m || e[54] !== t.runtime ? (j = t.runtime && jsx(B, { variant: "secondary", className: "bg-black/60 text-white border-none", children: m(t.runtime) }), e[53] = m, e[54] = t.runtime, e[55] = j) : j = e[55];
  let L;
  e[56] !== h || e[57] !== j || e[58] !== D || e[59] !== v ? (L = jsxs("div", { className: D, children: [v, h, j] }), e[56] = h, e[57] = j, e[58] = D, e[59] = v, e[60] = L) : L = e[60];
  let P;
  e[61] !== t.overview ? (P = t.overview && jsx("p", { className: "text-lg leading-relaxed text-white/90 mb-8 max-w-2xl", children: t.overview }), e[61] = t.overview, e[62] = P) : P = e[62];
  let Q;
  e[63] === Symbol.for("react.memo_cache_sentinel") ? (Q = jsx("div", { className: "flex gap-4 mb-8 flex-wrap", children: jsxs("button", { className: "inline-flex items-center gap-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/30 hover:border-white/50 rounded-lg px-7 py-3.5 text-base font-medium cursor-pointer transition-all duration-200 backdrop-blur-sm hover:-translate-y-0.5", children: [jsx(Plus, { size: 20 }), "Add to List"] }) }), e[63] = Q) : Q = e[63];
  let B$1;
  e[64] !== L || e[65] !== P || e[66] !== C || e[67] !== k ? (B$1 = jsxs("div", { className: C, children: [k, L, P, Q] }), e[64] = L, e[65] = P, e[66] = C, e[67] = k, e[68] = B$1) : B$1 = e[68];
  let E;
  e[69] !== w || e[70] !== u || e[71] !== B$1 ? (E = jsxs("div", { className: w, children: [u, B$1] }), e[69] = w, e[70] = u, e[71] = B$1, e[72] = E) : E = e[72];
  let A;
  e[73] !== p || e[74] !== E ? (A = jsx("div", { className: p, children: E }), e[73] = p, e[74] = E, e[75] = A) : A = e[75];
  let U;
  e[76] !== y || e[77] !== x || e[78] !== b || e[79] !== A ? (U = jsxs("div", { className: y, children: [x, b, A] }), e[76] = y, e[77] = x, e[78] = b, e[79] = A, e[80] = U) : U = e[80];
  let z;
  e[81] !== t ? (z = jsx("div", { children: jsx(Ne, { movie: t }) }), e[81] = t, e[82] = z) : z = e[82];
  let V;
  e[83] === Symbol.for("react.memo_cache_sentinel") ? (V = jsx("h2", { className: "text-2xl font-bold text-card-foreground mb-6 font-['Poppins']", children: "Movie Details" }), e[83] = V) : V = e[83];
  let X;
  e[84] === Symbol.for("react.memo_cache_sentinel") ? (X = jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Release Date" }), e[84] = X) : X = e[84];
  let I;
  e[85] !== t.release_date ? (I = t.release_date ? new Date(t.release_date).toLocaleDateString() : "Unknown", e[85] = t.release_date, e[86] = I) : I = e[86];
  let Y;
  e[87] !== I ? (Y = jsxs("div", { className: "flex flex-col gap-2", children: [X, jsx("span", { className: "text-base text-card-foreground font-medium", children: I })] }), e[87] = I, e[88] = Y) : Y = e[88];
  let Z;
  e[89] === Symbol.for("react.memo_cache_sentinel") ? (Z = jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Rating" }), e[89] = Z) : Z = e[89];
  let G;
  e[90] !== N ? (G = jsxs("div", { className: "flex flex-col gap-2", children: [Z, jsxs("span", { className: "text-base text-card-foreground font-medium", children: [N, "/10"] })] }), e[90] = N, e[91] = G) : G = e[91];
  let F;
  e[92] !== m || e[93] !== t.runtime ? (F = t.runtime && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Duration" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: m(t.runtime) })] }), e[92] = m, e[93] = t.runtime, e[94] = F) : F = e[94];
  let J;
  e[95] !== t.genres ? (J = t.genres && t.genres.length > 0 && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Genres" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: t.genres.map(Ce).join(", ") })] }), e[95] = t.genres, e[96] = J) : J = e[96];
  let O;
  e[97] !== t.spoken_languages ? (O = t.spoken_languages && t.spoken_languages.length > 0 && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Languages" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: t.spoken_languages.map(Me).join(", ") })] }), e[97] = t.spoken_languages, e[98] = O) : O = e[98];
  let W;
  e[99] !== t.production_companies ? (W = t.production_companies && t.production_companies.length > 0 && jsxs("div", { className: "flex flex-col gap-2", children: [jsx("span", { className: "text-sm font-semibold text-muted-foreground uppercase tracking-wide", children: "Production" }), jsx("span", { className: "text-base text-card-foreground font-medium", children: t.production_companies.slice(0, 3).map($e).join(", ") })] }), e[99] = t.production_companies, e[100] = W) : W = e[100];
  let q;
  e[101] !== Y || e[102] !== G || e[103] !== F || e[104] !== J || e[105] !== O || e[106] !== W ? (q = jsxs("div", { className: "bg-card border border-border rounded-xl p-8 mb-8", children: [V, jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: [Y, G, F, J, O, W] })] }), e[101] = Y, e[102] = G, e[103] = F, e[104] = J, e[105] = O, e[106] = W, e[107] = q) : q = e[107];
  let H;
  e[108] !== t.id ? (H = jsx("div", { className: "mb-8", children: jsx(we, { movieId: t.id }) }), e[108] = t.id, e[109] = H) : H = e[109];
  let ee;
  return e[110] !== _ || e[111] !== f || e[112] !== U || e[113] !== z || e[114] !== q || e[115] !== H ? (ee = jsxs("div", { className: _, children: [f, U, z, q, H] }), e[110] = _, e[111] = f, e[112] = U, e[113] = z, e[114] = q, e[115] = H, e[116] = ee) : ee = e[116], ee;
};
function Se(l) {
  const e = Math.floor(l / 60), t = l % 60;
  return `${e}h ${t}m`;
}
function De(l) {
  l.currentTarget.src = "/placeholder-movie.svg";
}
function Ce(l) {
  return l.name;
}
function Me(l) {
  return l.name;
}
function $e(l) {
  return l.name;
}
function Ve() {
  const l = c(2), { video: e } = Et.useLoaderData();
  let t;
  return l[0] !== e ? (t = jsx(ke, { movie: e }), l[0] = e, l[1] = t) : t = l[1], t;
}

export { Ve as component };
//# sourceMappingURL=movie._id-BVFTgVta.mjs.map
