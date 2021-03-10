if (!self.define) {
  const e = (e) => {
      "require" !== e && (e += ".js");
      let i = Promise.resolve();
      return (
        r[e] ||
          (i = new Promise(async (i) => {
            if ("document" in self) {
              const r = document.createElement("script");
              (r.src = e), document.head.appendChild(r), (r.onload = i);
            } else importScripts(e), i();
          })),
        i.then(() => {
          if (!r[e]) throw new Error(`Module ${e} didn’t register its module`);
          return r[e];
        })
      );
    },
    i = (i, r) => {
      Promise.all(i.map(e)).then((e) => r(1 === e.length ? e[0] : e));
    },
    r = { require: Promise.resolve(i) };
  self.define = (i, s, n) => {
    r[i] ||
      (r[i] = Promise.resolve().then(() => {
        let r = {};
        const o = { uri: location.origin + i.slice(1) };
        return Promise.all(
          s.map((i) => {
            switch (i) {
              case "exports":
                return r;
              case "module":
                return o;
              default:
                return e(i);
            }
          })
        ).then((e) => {
          const i = n(...e);
          return r.default || (r.default = i), r;
        });
      }));
  };
}
define("./sw.js", ["./workbox-c692813c"], function (e) {
  "use strict";
  self.addEventListener("message", (e) => {
    e.data && "SKIP_WAITING" === e.data.type && self.skipWaiting();
  }),
    e.precacheAndRoute(
      [
        {
          url: "css/bootstrap.min.css",
          revision: "38fcb9c303718b81892a9edb32f993e2",
        },
        {
          url: "css/bootstrap.sandstone.4.5.0.min.css",
          revision: "4a7ac90e2674399f316dc2df32019497",
        },
        { url: "favicon.ico", revision: "6e8a9009968ff0fdb7c23e7c61a1c530" },
        {
          url: "img/android-chrome-192x192.png",
          revision: "00712bd3b6df72f0e33c59bf4ef2f9b3",
        },
        {
          url: "img/android-chrome-512x512.png",
          revision: "1da8e208b45238f5b8c4787e5951909e",
        },
        {
          url: "img/apple-touch-icon.png",
          revision: "e45505389494bdd033dc4e949febf3b8",
        },
        {
          url: "img/favicon-16x16.png",
          revision: "8dc3d216d34a5e104a687ec0b90c2895",
        },
        {
          url: "img/favicon-32x32.png",
          revision: "3671564476b66824d75f537d15c88d80",
        },
        {
          url: "img/text128.png",
          revision: "96b3a5f106d8d82a5d1f29285a12b104",
        },
        {
          url: "img/text144.png",
          revision: "7425a361018a65661ea600d81e5db5a0",
        },
        {
          url: "img/text152.png",
          revision: "4c02b62a1a8112cf0c16ba5ee29d4c05",
        },
        {
          url: "img/text192.png",
          revision: "ecfd6d48f9b9c92eb1f3ca7fca3049b1",
        },
        {
          url: "img/text384.png",
          revision: "30be3a760bdf3e5a918fdc8eead8b5b3",
        },
        {
          url: "img/text512.png",
          revision: "099e7052101535443760d3f79b6ca275",
        },
        { url: "img/text72.png", revision: "3f097390fed13bc06790a1d45def28e2" },
        { url: "img/text96.png", revision: "01384b434aa55d32a068916c60a5a1c0" },
        {
          url: "js/bootstrap/bootstrap.4.5.0.min.js",
          revision: "92bbf03bf3fb044c6591ed34881df66d",
        },
        {
          url: "js/bootstrap/popper.1.16.0.js",
          revision: "2385337f1a10c77a74d2e636aea3abe4",
        },
        {
          url: "js/fontawesome/all.min.js",
          revision: "ad6a59567769057040b031cebafd1347",
        },
        {
          url: "js/jquery/jquery-3.5.1.slim.min.js",
          revision: "767a77430d12bd654d8f0c92cc21298c",
        },
        {
          url: "js/vkBeautify/vkbeautify.js",
          revision: "79f56e5d2a6d12f2e1b7f1b7d9c1d82f",
        },
        { url: "manifest.json", revision: "365d693f047f5c8a3c3d4026e8e58d81" },
      ],
      {}
    );
});
//# sourceMappingURL=sw.js.map
