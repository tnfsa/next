if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return r[e]||(s=new Promise((async s=>{if("document"in self){const r=document.createElement("script");r.src=e,document.head.appendChild(r),r.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!r[e])throw new Error(`Module ${e} didn’t register its module`);return r[e]}))},s=(s,r)=>{Promise.all(s.map(e)).then((e=>r(1===e.length?e[0]:e)))},r={require:Promise.resolve(s)};self.define=(s,n,t)=>{r[s]||(r[s]=Promise.resolve().then((()=>{let r={};const a={uri:location.origin+s.slice(1)};return Promise.all(n.map((s=>{switch(s){case"exports":return r;case"module":return a;default:return e(s)}}))).then((e=>{const s=t(...e);return r.default||(r.default=s),r}))})))}}define("./sw.js",["./workbox-ea903bce"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/240-115f852df570455f9527.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/342-b7dc662b9e613c3a7557.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/813-2926cc62a675e535fbc9.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/framework-2191d16384373197bc0a.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/main-acb0db6ab971e3062b72.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/404-06b4941b4e08d64c62e4.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/COC-9d29fce579ace7431cd8.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/Q&A/%5Bid%5D-4d4d74104f6571ecafd3.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/_app-dc861a38e51f3747eacb.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/_error-e69890b6db18dcbc6fa4.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/booked/%5BitemId%5D-2c78ecf16ac13b14d519.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/config/advanced/%5Bproduct%5D-598583e1d4291573a0c0.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/config/menu-13c8cb28e7e37ec1c90f.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/config/menu/new-c1f4811c2fc10083955c.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/config/store-c3aaa6ed882ca178fe77.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/history-5fa02de7eafb95d2d31e.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/index-e80cad0370536f14b6af.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/login-4ff3a656a1a6be22ccd7.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/logout-f5f68f243779902a9ce2.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/order/%5BstoreId%5D-1a423298348e4e952a40.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/privacy-5a5367a6f3eec5ac04a6.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/purchase/%5Bstore%5D/%5Bproduct%5D-d2193a0c131f927939fa.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/query-4556a19dc999ddfbd453.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/restaurant-8c85ed81381ff8867b5e.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/sells/test-bce225712ea9464e7ce6.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/service-16aa50cceab8b995ba76.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/settings-1c238b7ee9830fc275e3.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/settings/personal-a75a31444d7066bdda2a.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/pages/signup-9eefd5d40bf41d00fe5f.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/polyfills-eef578260fd80f8fff94.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/chunks/webpack-af8d060cb140570bcfb2.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/css/115171a943feff243b35.css",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/rG25Wej8KqIBKf30D8vGI/_buildManifest.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/_next/static/rG25Wej8KqIBKf30D8vGI/_ssgManifest.js",revision:"rG25Wej8KqIBKf30D8vGI"},{url:"/favicon.ico",revision:"a3635aa10ee407123b705b9905da1012"},{url:"/logo192.png",revision:"d46224970b307bf9f816c5f7df608a7f"},{url:"/logo256.png",revision:"d305293c90dcfd8ef959bf2642660819"},{url:"/manifest.json",revision:"3c9d1c933c243eccc978724691c3fe11"},{url:"/vercel.svg",revision:"4b4f1876502eb6721764637fe5c41702"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:r,state:n})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:mp3|mp4)$/i,new e.StaleWhileRevalidate({cacheName:"static-media-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600,purgeOnQuotaError:!0})]}),"GET")}));