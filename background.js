const DOMAIN = ".lazada.com.ph";
const URI = `https://www${DOMAIN}/`;
const COOKIES_TO_PERSIST = ["lzd_uti", "lzd_uid", "lzd_sid", "_tb_token_"];
const EXP_DAYS = 30;

chrome.cookies.onChanged.addListener((changeInfo) => {
  const { cookie } = changeInfo;

  if (cookie.domain === DOMAIN && COOKIES_TO_PERSIST.includes(cookie.name) && cookie.session) {
    console.log("Persisting a cookie...", changeInfo);

    let expiry = new Date();
    expiry.setDate(expiry.getDate() + EXP_DAYS);

    chrome.cookies.set({
      domain: DOMAIN,
      url: URI,
      name: cookie.name,
      expirationDate: expiry.getTime() / 1000,
      value: cookie.value,
    });
  }
});
