import React from 'react';

const RawPrivacyPopup = () => {
  const baseUrl = window.location.origin;

  const rawHTML = `
    <div id="simplecookienotification_v01" style="display: block; z-index: 99999; min-height: 35px; width: 100%; position: fixed; background: rgb(31, 31, 31); border-width: 5px 0 0; border-top-style: solid; border-color: rgb(198, 198, 198); text-align: center; right: 0; color: rgb(119, 119, 119); bottom: 0; left: 0;">
        <div style="padding:10px; margin: 0 15px; font-size:14px;">
            <span>Zgoda na przetwarzanie plików cookie i zbieranie danych geolokalizacyjnych.</span><br/>
            <a href="${baseUrl}/privacy-policy/index.html" style="color: rgb(198, 198, 198);">Polityka Prywatności</a>&nbsp;&nbsp;
            <div style="height: 10px; display: none;"></div>
            <a id="okbutton" href="#" onclick="(function(){document.cookie='simplecookienotification_v01=1; path=/; max-age=' + 60*60*24*7; document.getElementById('simplecookienotification_v01').style.display='none';})();" style="position: absolute; background: rgb(198, 198, 198); color: white; padding: 5px 15px; font-size: 12px; top: 5px; right: 5px;">AKCEPTUJĘ</a>
        </div>
    </div>
    <script>
      if (document.cookie.indexOf('simplecookienotification_v01=1') !== -1) {
        var el = document.getElementById('simplecookienotification_v01');
        if (el) el.style.display = 'none';
      }
    </script>
  `;

  return <div dangerouslySetInnerHTML={{ __html: rawHTML }} />;
};

export default RawPrivacyPopup;