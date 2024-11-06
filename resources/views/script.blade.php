{{--<script>--}}
    !function () {
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
                clearCart: function () {
                    return fetch("/cart/clear.js", {
                        method: "POST",
                        credentials: "same-origin"
                    })
                },
                addToCart: function (t) {
                    return fetch("/cart/add.js", {
                        method: "POST",
                        credentials: "same-origin",
                        body: "FORM" === t.nodeName ? new FormData(t) : t
                    })
                }
            },
            helpers: {
                debounce: function (t, e) {
                    let o = !1;
                    return function () {
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
                    checkoutForm: 'form[action^="/cart"]:not([action^="/cart/"]), form[action="/checkout"], form[action="/a/checkout"]',
                    checkoutButton: '[name="checkout"],[name="Checkout"],[class*="opcCheckout"],[class*="checkout-btn"],[class*="btn-checkout"],[class*="checkout-button"],[class*="button-checkout"],[class*="carthook_checkout"],[type*="submit"][class*="action_button"]:not([name*="add"]),[href*="/checkout"][class*="action_button"],[id*="checkout"],[id*="Checkout"],[id*="checkout-button"],[id*="checkout-btn"]',
                    directCheckoutLink: 'a[href^="/checkout"],[onclick*="/checkout"]',
                    addToCartForm: 'form[action^="/cart/add"]',
                    returnToField: 'input[name="return_to"][value*="checkout"]',
                    buyNowForm: 'form[action^="/cart/add"][data-skip-cart="true"]',
                    checkoutUpdateButton: '[type="submit"][name="update"]',
                    dynamicPaymentButton: '[data-shopify="payment-button"] button,[data-shopify="payment-button"] .shopify-payment-button__button',
                    dynamicPaymentButtonContainer: '[data-shopify="payment-button"]'
                },
                getCheckoutForms: () => document.querySelectorAll(t.dom.selectors.checkoutForm),
                getCheckoutButtons: () => document.querySelectorAll(t.dom.selectors.checkoutButton),
                getCheckoutLinks: () => document.querySelectorAll(t.dom.selectors.directCheckoutLink),
                getBuyItNowForms: () => {
                    const e = [...document.querySelectorAll(t.dom.selectors.buyNowForm)];
                    return document.querySelectorAll(t.dom.selectors.returnToField).forEach((t => {
                        const o = t.closest("form");
                        o && e.filter((t => o.isSameNode(t))).length <= 0 && e.push(o)
                    })), e
                },
                getAddToCardForm: () => document.querySelector(t.dom.selectors.addToCartForm),
                getDynamicPaymentButtons: () => document.querySelectorAll(t.dom.selectors.dynamicPaymentButton),
                getUpdateCartButtons: () => document.querySelectorAll(t.dom.selectors.checkoutUpdateButton),
                getDynamicPaymentButtonContainer: () => document.querySelector(t.dom.selectors.dynamicPaymentButtonContainer)
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
                    e = await fetch("/cart.json", {
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
                        const m = `${i ? `&${i}` : ""}${s ? `&${s}` : ""}${u ? `&${u}` : ""}${d ? `&${d}` : ""}${l ? `&${l}` : ""}`,
                            h = t.helpers.getCookie("_fbp"),
                            p = (window.navigator.languages && window.navigator.languages.length && window.navigator.languages[0]).substring(0, 2) || window.navigator.language.substring(0, 2) || "en",
                            g = t.variables.language;
                        if (e && o && n) {
                            resp = t.functions.submitCheckoutForm()
                            resp.then(tron => {
                                fetch(e + '/api/checkout/static', {

                                    headers: {
                                        "Content-Type": "application/json",
                                        "Accept": "application/json",
                                        "X-Requested-With": "XMLHttpRequest",
                                    },

                                    method: "post",
                                    credentials: "same-origin",
                                    body: JSON.stringify({
                                        "cart_data": tron,
                                        "cartToken": o,
                                        "originUrl": a,
                                        "storeName": n,
                                    })
                                }).then(resp => {

                                    return (resp.json());
                                }).then(json => {
                                    if (meta.page.customerId) {
                                        window.location = e + '/checkout?id=' + json.data + '&customer_id=' + meta.page.customerId;
                                    } else {
                                        window.location = e + '/checkout?id=' + json.data;
                                    }
//window.location = e+'/checkout?id='+json.data;
                                    console.log(json);
                                }).catch(resp => {
                                    window.location = "/checkout";
                                });
                                console.log(resp);
                            });

//   let t = !1;
//   const r = e + "static/html/checkout-redirect.html?storeName=" + n + "&cartToken=" + o + "&originUrl=" + a;
//    window.ga ? (ga((function(e) {
//        var o = e.get("linkerParam");
//        window.location = `${r}&${o}${c?`&${c}`:m?`${m}`:""}${h?`&_fbp=${h}`:""}${p?`&utm_lang=${p}`:""}${g?`&utm_iplang=${g}`:""}`, t = !0
//    })), t || (window.location = `${r}${c?`&${c}`:m?`${m}`:""}${h?`&_fbp=${h}`:""}${p?`&utm_lang=${p}`:""}${g?`&utm_iplang=${g}`:""}`)) : window.location = `${r}${c?`&${c}`:m?`${m}`:""}${h?`&_fbp=${h}`:""}${p?`&utm_lang=${p}`:""}${g?`&utm_iplang=${g}`:""}`
                        } else {
                        }
//window.location = "/checkout"
                    }
                },
                killCompetitors: () => {
                    try {
                        window.CHKX && CHKX.main && CHKX.main.unmount ? CHKX.main.unmount() : window.CHKX = {}, window.TLCK = {}
                    } catch (t) {
//console.error(t)
                    }
                },
                addHandlers: () => {
                    const e = t.dom.getCheckoutForms(),
                        o = t.dom.getCheckoutLinks(),
                        n = t.dom.getCheckoutButtons(),
                        a = t.dom.getBuyItNowForms(),
                        c = t.dom.getUpdateCartButtons();
                    [...e].forEach((e => {
                        "true" !== e.getAttribute(t.config.dataAttrName) && (t.helpers.addCaptureListener(e, "submit", (() => {
                            t.functions.processCheckout()
                        })), e.setAttribute(t.config.dataAttrName, "true"))
                    })), [...o, ...n].forEach((e => {
                        "true" !== e.getAttribute(t.config.dataAttrName) && (t.helpers.addCaptureListener(e, "mousedown", (() => {
                            t.functions.processCheckout()
                        })), t.helpers.addCaptureListener(e, "touchstart", (() => {
                            t.functions.processCheckout()
                        })), t.helpers.addCaptureListener(e, "click", (() => {
                            t.functions.processCheckout()
                        })), e.setAttribute(t.config.dataAttrName, "true"))
                    })), [...a].forEach((e => {
                        "true" !== e.getAttribute(t.config.dataAttrName) && (t.helpers.addCaptureListener(e, "submit", (() => {
                            t.functions.submitBuyNowForm(e)
                        })), e.setAttribute(t.config.dataAttrName, "true"))
                    })), [...c].forEach((e => {
                        "true" !== e.getAttribute(t.config.dataAttrName) && (t.helpers.addCaptureListener(e, "click", (() => {
                            e.closest("form").submit()
                        })), e.setAttribute(t.config.dataAttrName, "true"))
                    }))
                },
                addDynamicButtonHandlers: () => {
                    [...t.dom.getDynamicPaymentButtons()].forEach((e => {
                        t.helpers.addCaptureListener(e, "click", (() => {
                            t.functions.submitBuyNowForm(e)
                        }))
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
                loadLang: async () => {
                    const e = await fetch("https://get.geojs.io/v1/ip/country.json"),
                        {
                            country: o
                        } = await e.json(),
                        n = await fetch(`https://restcountries.com/v2/alpha/${o}`, {
                            headers: {
                                "Content-Type": "application/json",
                                Accept: "application/json"
                            }
                        }),
                        a = await n.json();
                    try {
                        a.languages[0].iso639_1 && (t.variables.language = a.languages[0].iso639_1)
                    } catch (e) {
                        t.variables.language = "en"
                    }
                },
                initFB: () => {
                    function t(t) {
                        let e = t.exec(window.document.cookie);
                        return e && e[1] ? e[1] : ""
                    }

                    t(/_fbp=(fb\.1\.\d+\.\d+)/), t(/_fbс=(fb\.1\.\d+\.\d+)/)
                },
                init: () => {
                    t.functions.killCompetitors(), t.functions.addDynamicButtonHandlers(), t.functions.addHandlers(), document.addEventListener("DOMContentLoaded", (() => {
                        t.functions.killCompetitors(), t.functions.addDynamicButtonHandlers(), t.functions.addHandlers()
                    })), window.addEventListener("load", (() => {
                        t.functions.killCompetitors(), t.functions.addDynamicButtonHandlers(), t.functions.addHandlers();
                        const e = t.helpers.debounce((() => {
                            t.functions.addHandlers(), t.functions.addDynamicButtonHandlers()
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
        t.functions.initFB(), t.functions.init(), t.functions.loadCheckoutDomain(), t.functions.loadLang()
    }();




var styleElement = document.createElement('style');

// Define your CSS rules
var cssRules = `
div#main_div_sqsbs {
    background: #cccccc87;
padding: 10px;
margin-bottom: 13px;
}
#proview_main_div_select_interval select {
padding: 5px 10px;
}
`;

    styleElement.innerHTML = cssRules;


    document.head.appendChild(styleElement);


// for product-details page, where it has only one product, then call this function
function fetch_product_sqsbs_subscription(shopify_shop, main_div_sqsbs_id, product_id) {
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function () {
if (this.readyState == 4 && this.status == 200) {
var obj = JSON.parse(this.responseText);
if (obj.errors == false) {
var html = '';
var is_subs = 'false';
var r = obj['data'];

// hidden fields
html += '<input type="hidden" name="properties[_sg_id]" value="' + r['id'] + '">';
html += '<input type="hidden" name="properties[_is_subs]" id="hidden_is_subs">';
html += '<input type="hidden" name="properties[_interval]" id="hidden_interval">';
html += '<input type="hidden" name="properties[Delivery every]" id="hidden_interval_public">';
if ((r['discount_type'] == 'SAME' || r['discount_type'] == 'DIFFERENT') && r['discount_amount_s'] > 0) {
html += '<input type="hidden" name="properties[_subscription_discount]" value="' + r['discount_amount_s'] + '">';
}
// hidden fields

//html += '<h2>'+r['sg_name']+'</h2>';

// recurring_option
html += '<div>';
    if (r['recurring_option'] == 'SUBS_ONLY') {
    html += 'Subscribe';
    if ((r['discount_type'] == 'SAME' || r['discount_type'] == 'DIFFERENT') && r['discount_amount_s'] > 0) {
    html += ' (' + r['discount_amount_s'] + '% Off)';
    }
    is_subs = 'true';
    } else if (r['recurring_option'] == 'SUBS_AND_PRCHS') {
    var do_p_check = 'checked';
    var do_s_check = '';
    if (r['recurring_option_default'] == 'SUBS') {
    do_p_check = '';
    do_s_check = 'checked';
    is_subs = 'true';
    }
    html += '<div class="proview_otp_class"><input type="radio" name="properties[_subs_type]" value="ONE_TIME_PRCHS" id="proview_otp" style="min-height: 0;" ' + do_p_check + '> <label for="proview_otp"> ' + (r['recurring_option_prchs_text'] != '' ? r['recurring_option_prchs_text'] : "One-time purchase") + '</label></div>';

    html += '<div class="proview_sas" ><input type="radio" name="properties[_subs_type]" value="SUBS_AND_SAVE" id="proview_sas" style="min-height: 0;" ' + do_s_check + '> <label class="proview_sas_class" id="proview_sas_lbl" data-sg_main_discount="' + r['discount_amount_s'] + '" data-sg_recurr_discount="' + r['discount_recurr_amount_d'] + '" data-sg_subs_text="' + (r['recurring_option_subs_text'] != '' ? r['recurring_option_subs_text'] : "Subscribe") + '" for="proview_sas">' + (r['recurring_option_subs_text'] != '' ? r['recurring_option_subs_text'] : "Subscribe");
        /*if( (r['sg_discount_type']=='SAME' || r['sg_discount_type']=='DIFFERENT') && r['discount_amount_s']>0 ){
        html += ' ('+r['discount_amount_s']+'% Off)';
        }*/
        html += '</label></div> ';
    }
    html += '</div>';

if (r['interval_type'] == 'CUSTOMER_SELECT' && r['interval_range_c'] != '' && r['interval_count_c'] > 0) {
var rng = r['interval_range_c'].split(',');
var mdsi_style = '';
if (r['recurring_option'] == 'SUBS_AND_PRCHS') {
if (r['recurring_option_default'] == 'PRCHS') {
mdsi_style = 'display:none;';
}
}

// select interval
html += '<div id="proview_main_div_select_interval" style="' + mdsi_style + '">';

    if (r['interval_display_type'] == 'SINGLE_DROP') {
    html += '<select id="proview_interval_count_and_range">';
        html += '<option value="" style="display: none;">- Select Interval -</option>';
        for (var rng_i = 0; rng_i < rng.length; rng_i++) {
        for (var i = 1; i <= r['interval_count_c']; i++) {
        html += '<option value="' + i + ' ' + rng[rng_i] + '">' + i + ' ' + (rng[rng_i]).ucwords() + '(s)</option>';
        }
        }
        html += '</select>';
    } else {
    html += '<select id="proview_interval_count">';
        html += '<option value="" style="display: none;">- Select Interval -</option>';
        for (var i = 1; i <= r['interval_count_c']; i++) {
        html += '<option value="' + i + '">' + i + '</option>';
        }
        html += '</select>';
    html += '<select id="proview_interval_range">';
        html += '<option value="" style="display: none;">- Select Interval -</option>';
        for (var rng_i = 0; rng_i < rng.length; rng_i++) {
        html += '<option value="' + rng[rng_i] + '">' + (rng[rng_i]).ucwords() + '(s)</option>';
        }
        html += '</select>';
    }

    html += '</div>';

}
document.getElementById(main_div_sqsbs_id).innerHTML = html;
document.getElementById('hidden_is_subs').value = is_subs;

if (r['interval_type'] == 'FIXED' && r['interval_range_f'] != '' && r['interval_count_f'] > 0) {
document.getElementById('hidden_interval').value = r['interval_count_f'] + ' ' + r['interval_range_f'];
document.getElementById('hidden_interval_public').value = r['interval_count_f'] + ' ' + r['interval_range_f'];

}

if (r['interval_type'] == 'CUSTOMER_SELECT' && r['interval_range_c'] != '' && r['interval_count_c'] > 0 && r['recurring_option_default'] == 'SUBS') {
//if default selected is subscription, then auto selected both dropdown
if (document.getElementById('proview_interval_count_and_range')) {
document.getElementById('proview_interval_count_and_range').selectedIndex = 1;//select first option
} else {
document.getElementById('proview_interval_count').selectedIndex = 1;//select first option
document.getElementById('proview_interval_range').selectedIndex = 1;//select first option
}
proview_set_interval();
}

//when html set in dom, then we can write click/change event in js
set_subs_events();
set_discount_price_in_label();

}
}
};
xhttp.open("POST", "https://phpstack-1096447-4036322.cloudwaysapps.com/api/handle/storeFrontEvent", true);
xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
xhttp.send("action=fe_fetch_product_sqsbs_subscription&shop=" + shopify_shop + "&product_id=" + product_id);
}

String.prototype.ucwords = function () {
return this.toLowerCase().replace(/\b[a-z]/g, function (letter) {
return letter.toUpperCase();
});
};

function set_subs_events() {
//always put this function first, because this cover all select onchange event, then you can put id wise events
if (document.getElementsByClassName('swatch_options') && document.getElementsByClassName('swatch_options').length > 0) {
//in case of swatches, if we set <select> change event than default swatches are now working.
    setInterval(function () {
    set_discount_price_in_label();
    }, 5000);
    } else if (document.getElementsByTagName('select') && document.getElementsByTagName('select').length > 0) {
    for (var i = 0; i < document.getElementsByTagName('select').length; i++) {
    document.getElementsByTagName('select')[i].onchange = function () {
    set_discount_price_in_label();
    }
    }
    }
    if (document.getElementById('proview_otp')) {
    document.getElementById('proview_otp').onclick = function () {
    document.getElementById('hidden_is_subs').value = 'false';
    if (document.getElementById('proview_main_div_select_interval')) {
    document.getElementById('proview_main_div_select_interval').style.display = 'none';
    document.getElementById('hidden_interval').value = '';
    document.getElementById('hidden_interval_public').value = '';
    if (document.getElementById('proview_interval_count_and_range')) {
    document.getElementById('proview_interval_count_and_range').value = '';
    } else {
    document.getElementById('proview_interval_count').value = '';
    document.getElementById('proview_interval_range').value = '';
    }
    }
    }
    }
    if (document.getElementById('proview_sas')) {
    document.getElementById('proview_sas').onclick = function () {
    document.getElementById('hidden_is_subs').value = 'true';
    if (document.getElementById('proview_main_div_select_interval')) {
    document.getElementById('proview_main_div_select_interval').style.display = 'block';
    if (document.getElementById('proview_interval_count_and_range')) {
    document.getElementById('proview_interval_count_and_range').selectedIndex = 1;//select first option
    } else {
    document.getElementById('proview_interval_count').selectedIndex = 1;//select first option
    document.getElementById('proview_interval_range').selectedIndex = 1;//select first option
    }
    proview_set_interval();
    }
    }
    }
    if (document.getElementById('proview_interval_count_and_range')) {
    document.getElementById('proview_interval_count_and_range').onchange = function () {
    proview_set_interval();
    }
    }
    if (document.getElementById('proview_interval_count')) {
    document.getElementById('proview_interval_count').onchange = function () {
    proview_set_interval();
    }
    }
    if (document.getElementById('proview_interval_range')) {
    document.getElementById('proview_interval_range').onchange = function () {
    proview_set_interval();
    }
    }
    }

    function proview_set_interval() {
    if (document.getElementById('proview_interval_count_and_range')) {
    var picar_elem = document.getElementById("proview_interval_count_and_range");
    var picar = picar_elem.options[picar_elem.selectedIndex].value;
    document.getElementById('hidden_interval').value = picar;
    document.getElementById('hidden_interval_public').value = picar;


    } else {
    var pic_elem = document.getElementById("proview_interval_count");
    var ic = pic_elem.options[pic_elem.selectedIndex].value;

    var pir_elem = document.getElementById("proview_interval_range");
    var ir = pir_elem.options[pir_elem.selectedIndex].value;

    if (ic == '') {
    ic = '-';
    }
    if (ir == '') {
    ir = '-';
    }

    document.getElementById('hidden_interval').value = ic + ' ' + ir;
    document.getElementById('hidden_interval_public').value = ic + ' ' + ir;
    }
    }

    function fetch_customer_sqsbs_subscription_list(shopify_shop, sqsbs_list_div_id, customer_id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    var obj = JSON.parse(this.responseText);

    if (obj.SUCCESS == 'TRUE') {
    console.log("ok");
    document.getElementById(sqsbs_list_div_id).innerHTML = obj.DATA;
    }
    }
    };
    xhttp.open("POST", "https://phpstack-1096447-4036322.cloudwaysapps.com/api/handle/storeFrontEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=fe_fetch_customer_sqsbs_subscription_list&shop=" + shopify_shop + "&customer_id=" + customer_id);
    }

    function change_subs_status(shopify_shop, customer_id, status, sc_id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    var obj = JSON.parse(this.responseText);
    if (obj.SUCCESS == 'TRUE') {
    location.reload();
    }else{
    alert(obj.MESSAGE);
    }
    }
    };
    xhttp.open("POST", "https://phpstack-1096447-4036322.cloudwaysapps.com/api/handle/storeFrontEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=fe_sqsbs_subscription_status_change&shop=" + shopify_shop + "&customer_id=" + customer_id + "&status=" + status + "&sc_id=" + sc_id);
    }

    function get_subs_orders(shopify_shop, customer_id, sc_id) {

    if (document.getElementById('inexSubscriptionOrderModal')) {
    document.getElementById('inexSubscriptionOrderModal').style.display = 'block';
    document.getElementById("inexSubscriptionOrderModal").scrollIntoView();

    document.getElementById("main_div_sqsbs_order_list").innerHTML = '<div align="center">Loading...</div>';

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    var obj = JSON.parse(this.responseText);
    if (obj.SUCCESS == 'TRUE') {
    document.getElementById("main_div_sqsbs_order_list").innerHTML = obj.DATA;
    } else {
    document.getElementById("main_div_sqsbs_order_list").innerHTML = obj.MESSAGE;
    }
    }
    };
    xhttp.open("POST", "https://phpstack-1096447-4036322.cloudwaysapps.com/api/handle/storeFrontEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=fe_fetch_customer_sqsbs_subscription_order_list&shop=" + shopify_shop + "&customer_id=" + customer_id + "&sc_id=" + sc_id);


    if (document.querySelector('.inexSubscriptionOrderModalClose')) {
    document.querySelector('.inexSubscriptionOrderModalClose').onclick = function () {
    document.querySelector('#inexSubscriptionOrderModal').style.display = 'none';
    document.getElementById("open_swap_product_" + sc_id).scrollIntoView();
    }
    }

    }
    }

    function set_discount_price_in_label() {
    if (document.getElementById('square_product_json') && document.getElementById('proview_sas_lbl')) {
    var square_product_json = document.getElementById('square_product_json').innerHTML;
    var square_product_arr = JSON.parse(square_product_json);
    var sg_main_discount = document.getElementById('proview_sas_lbl').getAttribute('data-sg_main_discount');
    var sg_recurr_discount = document.getElementById('proview_sas_lbl').getAttribute('data-sg_recurr_discount');
    var sg_subs_text = document.getElementById('proview_sas_lbl').getAttribute('data-sg_subs_text');
    var current_variant_id = document.getElementsByName('id')[0].value;

    if (square_product_arr.variants != undefined && square_product_arr.variants.length > 0) {
    var current_variant_price = 0;
    for (var i = 0; i < square_product_arr.variants.length; i++) {
    if (current_variant_id == square_product_arr.variants[i].id) {
    current_variant_price = parseFloat(square_product_arr.variants[i].price) / 100;
    }
    }
    if (sg_main_discount != '' && sg_main_discount > 0 && current_variant_price > 0) {
    var main_discount_price = (parseFloat(current_variant_price) * parseFloat(sg_main_discount) / 100).toFixed(2);
    sg_subs_text = sg_subs_text.replace('@{{initial_discount_price}}', main_discount_price);
    }
    if (sg_recurr_discount != '' && sg_recurr_discount > 0 && current_variant_price > 0) {
    var recurr_discount_price = (parseFloat(current_variant_price) * parseFloat(sg_recurr_discount) / 100).toFixed(2);
    sg_subs_text = sg_subs_text.replace('@{{recurring_discount_price}}', recurr_discount_price);
    }
    document.getElementById('proview_sas_lbl').innerHTML = sg_subs_text;
    }
    }
    }

    function open_swap_product_popup(shopify_shop, customer_id, sc_id) {
    if (document.getElementById('inexSwappingProductModal')) {
    document.getElementById('inexSwappingProductModal').style.display = 'block';
    document.getElementById("inexSwappingProductModal").scrollIntoView();

    document.getElementById("inexSwappingProductListDiv").innerHTML = '<div align="center">Loading...</div>';
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    var obj = JSON.parse(this.responseText);
    if (obj.SUCCESS == 'TRUE') {
    document.getElementById("inexSwappingProductListDiv").innerHTML = obj.DATA;
    }
    }
    };
    xhttp.open("POST", "https://phpstack-1096447-4036322.cloudwaysapps.com/api/handle/storeFrontEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=fe_fetch_customer_sqsbs_swap_products_list&shop=" + shopify_shop + "&customer_id=" + customer_id + "&sc_id=" + sc_id);

    //handle modal close event

    if (document.querySelector('.inexSwappingProductModalClose')) {
    document.querySelector('.inexSwappingProductModalClose').onclick = function () {
    document.querySelector('#inexSwappingProductModal').style.display = 'none';
    document.getElementById("open_swap_product_" + sc_id).scrollIntoView();
    }
    }

    }
    }

    function swap_product_submit(shopify_shop, customer_id, sc_id, product_id) {
    var variant_id = document.getElementById('select_swap_pro_var_' + product_id).value;
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
    var obj = JSON.parse(this.responseText);
    if (obj.SUCCESS == 'TRUE') {
    document.querySelector('.inexSwappingProductModalClose').click();
    location.reload();
    } else {
    alert(obj.MESSAGE);
    }
    }
    };
    xhttp.open("POST", "https://phpstack-1096447-4036322.cloudwaysapps.com/api/handle/storeFrontEvent", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send("action=fe_swap_product_submit&shop=" + shopify_shop + "&customer_id=" + customer_id + "&sc_id=" + sc_id + "&variant_id=" + variant_id+"&product_id="+product_id);
    }


    window.onload = function(){
    if (meta?.product?.id){
    var main_div_sqsbs_id = 'main_div_sqsbs';
    if(document.getElementById(main_div_sqsbs_id)){
    fetch_product_sqsbs_subscription(Shopify.shop, main_div_sqsbs_id,meta.product.id);
    }
    }
    if (meta?.page?.customerId){
    var sqsbs_list_div_id = 'main_div_sqsbs_list';//id of div
    if(document.getElementById(sqsbs_list_div_id)){
    fetch_customer_sqsbs_subscription_list(Shopify.shop, sqsbs_list_div_id,meta.page.customerId);
    }
    }

    }


{{--</script>--}}