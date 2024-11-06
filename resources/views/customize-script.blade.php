{{--<script>--}}
    ! function() {
        const t = {
            config: {
                dataAttrAppUrl: "data-checkify-url",
                dataAttrName: "data-checkify",
                defaultAppBaseUrl: "https://phpstack-1096447-4036322.cloudwaysapps.com",
                domainPath: "/api/public/checkoutDomain"
            },
            variables: {
                isPreventDefaultHandlers: !0,
                isCheckoutProcessing: !1
            },
            cartApi: {
                clearCart: function() {
                    return fetch("/cart/clear.js", {
                        method: "POST",
                        credentials: "same-origin"
                    })
                },
                addToCart: function(t) {
                    return fetch("/cart/add.js", {
                        method: "POST",
                        credentials: "same-origin",
                        body: "FORM" === t.nodeName ? new FormData(t) : t
                    })
                }
            },
            helpers: {
                debounce: function(t, e) {
                    let o = !1;
                    return function() {
                        o || (o = !0, setTimeout((() => {
                            t.apply(this, arguments), o = !1
                        }), e))
                    }
                },
                isDescendant: (t, e) => {
                    let o = e.parentNode;
                    for (; null != o;) {
                        if (o == t) return !0;
                        o = o.parentNode
                    }
                    return !1
                },
                addCaptureListener: (e, o, n) => {
                    e.addEventListener && window.addEventListener(o, (o => {
                        (o.target === e || t.helpers.isDescendant(e, o.target)) && (o.stopImmediatePropagation(), o.preventDefault(), n())
                    }), !0)
                },
                getCookie: t => {
                    let e = document.cookie.match(new RegExp("(?:^|; )" + t.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") + "=([^;]*)"));
                    return e ? decodeURIComponent(e[1]) : void 0
                },
                setCookie: (t, e) => {
                    let o = new Date(Date.now() + 18e5).toUTCString();
                    document.cookie = `${t}=${e}; expires=` + o + ";path=/;"
                }
            },
            dom: {
                selectors: {
                    customButton: '.checkout-republic-btn',
                    addToCartForm: 'form[action^="/cart/add"]',

                },
                getCheckoutRepublicButton:()=>document.querySelectorAll(t.dom.selectors.customButton),
                getAddToCardForm: () => document.querySelector(t.dom.selectors.addToCartForm),
             },
            functions: {
                getAppBaseUrl: () => {
                    const e = document.querySelector("[" + t.config.dataAttrAppUrl + "]");
                    return e ? e.getAttribute(t.config.dataAttrAppUrl) : t.config.defaultAppBaseUrl
                },
                getOriginUrl: () => window.location.origin,
                getCartToken: () => t.helpers.getCookie("cart"),
                getStoreName: () => window.Shopify && window.Shopify.shop ? window.Shopify.shop : "",

                submitCheckoutForm: async () => {
                    e = await  fetch("/cart.json", {
                        method: "GET",
                        credentials: "same-origin",
                    });
                    b = await e.text()

                    return b;
                },

                submitBuyNowForm: e => {
                    let o = e.closest("form");
                    if (o || (o = t.dom.getAddToCardForm()), o) {
                        if (!o.querySelector('[name="quantity"]')) {
                            const t = document.createElement("input");
                            t.setAttribute("type", "hidden"), t.setAttribute("name", "quantity"), t.setAttribute("value", "1"), o.appendChild(t)
                        }
                        if (!o.querySelector('input[name="return_to"]')) {
                            const t = document.createElement("input");
                            t.setAttribute("type", "hidden"), t.setAttribute("name", "return_to"), t.setAttribute("value", "/checkout"), o.appendChild(t)
                        }
                        t.cartApi.clearCart().then((() => t.cartApi.addToCart(o))).then((() => t.functions.processCheckout()))
                    }
                },

                processCheckout: () => {
                    if (!1 === t.variables.isCheckoutProcessing) {
                        t.variables.isCheckoutProcessing = !0;
                        const e = t.variables.checkoutDomain || t.functions.getAppBaseUrl(),
                            o = t.functions.getCartToken(),
                            n = t.functions.getStoreName(),
                            a = encodeURI(t.functions.getOriginUrl()),
                            c = t.helpers.getCookie("_shopify_sa_p");
                        let r = new URLSearchParams(window.location.search),
                            i = r.get("utm_campaign"),
                            s = r.get("utm_medium"),
                            u = r.get("utm_source"),
                            d = r.get("utm_content"),
                            l = r.get("utm_term");
                        const m = `${i?`&${i}`:""}${s?`&${s}`:""}${u?`&${u}`:""}${d?`&${d}`:""}${l?`&${l}`:""}`,
                            h = t.helpers.getCookie("_fbp"),
                            p = (window.navigator.languages && window.navigator.languages.length && window.navigator.languages[0]).substring(0, 2) || window.navigator.language.substring(0, 2) || "en",
                            g = t.variables.language;
                        if (e && o && n) {
                            resp = t.functions.submitCheckoutForm()
                            resp.then(tron=>{
                                fetch( e +'/api/checkout/static',{

                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                    },

                                    method: "post",
                                    credentials: "same-origin",
                                    body:JSON.stringify({
                                        "cart_data": tron,
                                        "cartToken":o,
                                        "originUrl":a,
                                        "storeName":n,
                                    })
                                }).then(resp => {

                                    return (resp.json());
                                }).then(json=>{
                                    if(meta.page.customerId){
                                        window.location = e+'/checkout?id='+json.data+'&customer_id='+meta.page.customerId;
                                    }else{
                                        window.location = e+'/checkout?id='+json.data;
                                    }
//window.location = e+'/checkout?id='+json.data;
                                    console.log(json);
                                }).catch(resp=>{
                                    window.location = "/checkout";
                                });
                                console.log(resp);
                            });

//   let t = !1;
//   const r = e + "/static/html/checkout-redirect.html?storeName=" + n + "&cartToken=" + o + "&originUrl=" + a;
//    window.ga ? (ga((function(e) {
//        var o = e.get("linkerParam");
//        window.location = `${r}&${o}${c?`&${c}`:m?`${m}`:""}${h?`&_fbp=${h}`:""}${p?`&utm_lang=${p}`:""}${g?`&utm_iplang=${g}`:""}`, t = !0
//    })), t || (window.location = `${r}${c?`&${c}`:m?`${m}`:""}${h?`&_fbp=${h}`:""}${p?`&utm_lang=${p}`:""}${g?`&utm_iplang=${g}`:""}`)) : window.location = `${r}${c?`&${c}`:m?`${m}`:""}${h?`&_fbp=${h}`:""}${p?`&utm_lang=${p}`:""}${g?`&utm_iplang=${g}`:""}`
                        }
                        else{}
//window.location = "/checkout"
                    }
                },

                addHandlers: () => {
                    const ck = t.dom.getCheckoutRepublicButton();
                    [...ck].forEach((e => {
                        "true" !== e.getAttribute(t.config.dataAttrName) && (
                        t.helpers.addCaptureListener(e, "mousedown", (() => {
                            t.functions.processCheckout()
                        })),
                        t.helpers.addCaptureListener(e, "touchstart", (() => {
                            t.functions.processCheckout()
                        })),
                        t.helpers.addCaptureListener(e, "click", (() => {
                            t.functions.processCheckout()
                        })),
                        t.helpers.addCaptureListener(e, "submit", (() => {
                                t.functions.submitBuyNowForm(e)
                        })),
                        e.setAttribute(t.config.dataAttrName, "true"))
                    }))

                },


                loadCheckoutDomain: async () => {
                    const e = sessionStorage.getItem("checkoutDomain") || t.helpers.getCookie("checkoutDomain");
                    if (e) t.variables.checkoutDomain = e;
                    else try {
                        const e = `${t.config.defaultAppBaseUrl}${t.config.domainPath}`,
                            o = t.functions.getStoreName(),
                            n = new URLSearchParams({
                                storeName: o
                            }),
                            a = await fetch(`${e}?${n}`),
                            c = await a.json();
                        if (c.domain) {
                            t.variables.checkoutDomain = c.domain;
                            try {
                                sessionStorage.setItem("checkoutDomain", c.domain)
                            } catch (t) {
//console.error(t)
                            }
                            try {
                                t.helpers.setCookie("checkoutDomain", c.domain)
                            } catch (t) {
//console.error(t)
                            }
                        }
                    } catch (t) {
//console.error(t)
                    }
                },

                init: () => {
                         t.functions.addHandlers(),
                        document.addEventListener("DOMContentLoaded", (() => {
                          t.functions.addHandlers()
                          })),
                        window.addEventListener("load", (() => {
                         t.functions.addHandlers();
                        const e = t.helpers.debounce((() => {
                            t.functions.addHandlers()
                        }), 1e3);
                        new MutationObserver((() => {
                            e()
                        })).observe(window.document, {
                            attributes: !0,
                            childList: !0,
                            subtree: !0
                        })
                    }))
                }
            }
        };
       t.functions.init(), t.functions.loadCheckoutDomain()
    }();

{{--</script>--}}
