export const newPostTpl = (
  username,
  avatar,
  lotTitle,
  lotLink,
  lotPhoto,
  lotDescription,
  prolongLot
) => `
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
    />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=Edge" />
    <!--<![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <xml>
        <o:OfficeDocumentSettings>
          <o:AllowPNG />
          <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
      </xml>
    <![endif]-->
    <!--[if (gte mso 9)|(IE)]>
      <style type="text/css">
        body {
          width: 700px;
          margin: 0 auto;
        }
        table {
          border-collapse: collapse;
        }
        table,
        td {
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
        }
        img {
          -ms-interpolation-mode: bicubic;
        }
      </style>
    <![endif]-->
    <style type="text/css">
      body,
      h1 {
        padding: 0px;
        margin: 0px;
      }
      body,
      p,
      div,
      button {
        font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica,
          sans-serif;
        font-size: 14px;
        line-height: 22px;
        color: #160242;
      }
      a {
        color: #7000ff;
        text-decoration: none;
      }
      .wrapper {
        max-width: 668px;
        min-width: 240px;
        padding: 0 16px;
        margin: 0 auto;
        text-align: left;
      }
      .module {
        padding: 0px;
        margin: 0px;
      }
      .logo {
        width: 238px;
        height: 46px;
        margin-top: 48px;
        margin-bottom: 40px;
      }
      .subject {
        font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: -0.16px;
      }
      .thumbUp {
        font-size: 28px;
        line-height: 28px;
      }
      .subtitle {
        display: block;
        padding-top: 6px;
        font-weight: 600;
        letter-spacing: -0.08px;
        color: #4e4c54;
      }
      .module.post {
        margin: 40px 0;
        min-height: 240px;
        border-radius: 8px;
        background-color: #edeff2;
        background-image: url(${lotPhoto});
        background-position: center center;
        background-size: cover;
      }
      .user {
        background-color: rgba(237, 239, 242, 0.8);
        border-radius: 8px;
        padding: 24px;
        height: 192px;
      }
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 20px;
        background-color: #d4d2dd;
      }
      .username {
        padding-left: 8px;
        font-weight: 600;
        letter-spacing: -0.08px;
      }
      .module.social {
        text-align: center;
        margin-top: 40px;
      }
      .socialicon {
        padding: 0 12px;
      }
      .ctabutton {
        display: inline-block;
        background-color: #7000ff;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        color: #ffffff;
        padding: 20px 24px 20px 24px;
        margin-bottom: 16px;
      }
      .teaser {
        font-size: 13px;
        line-height: 20px;
        border-left: 3px solid #d5b5ff;
        padding: 4px 0 4px 16px;
      }
      .postcontent {
        display: block;
        margin-top: 40px;
      }
      .postcontent a {
        font-size: 24px;
        font-weight: 800;
      }
    </style>
  </head>
  <body style="font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; font-size: 14px;  line-height: 22px; color: #160242; padding: 0px; margin: 0px;">
    <!-- Wrapper -->

    <div class="wrapper" style="max-width: 668px; min-width: 240px; padding: 0 16px; margin: 0 auto; text-align: left;">
      <!-- Logo -->

      <div class="module">
        <a href="https://obmen.market" title="Обмен.маркет" target="_blank">
          <img
            src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/add4158e-a841-4aff-8ce8-d1655059d2aa/476x92.png"
            width="238px"
            height="46px"
            class="logo"
            alt="Обмен.маркет"
            style="width: 238px;
            height: 46px;
            margin-top: 48px;
            margin-bottom: 40px;"
          />
        </a>
      </div>

      <!-- Subject -->

      <div class="module">
        <h1 class="subject" style="font-size: 20px;
        font-weight: 700;
        line-height: 24px;
        letter-spacing: -0.16px;">
          Вы создали новое объявление! <span class="thumbUp" style="font-size: 28px;
          line-height: 28px;">🔥</span>
        </h1>
        <span class="subtitle" style="display: block;
        padding-top: 6px;
        font-weight: 600;
        letter-spacing: -0.08px;
        color: #4e4c54;">
          Надеемся, вам предложат в обмен именно то, что вам нужно!
        </span>
      </div>

      <!-- Post -->

      <div class="module post" style="margin: 40px 0;
      min-height: 240px;
      border-radius: 8px;
      background-color: #edeff2;
      background-image: url(${lotPhoto});
      background-position: center center;
      background-size: cover;">
        <div class="user" style="background-color: rgba(237, 239, 242, 0.8);
        border-radius: 8px;
        padding: 24px;
        height: 192px;">
          <img
            src="${avatar}"
            width="36px"
            height="36px"
            valign="middle"
            class="avatar"
            alt="${username}"
            style="width: 36px;
            height: 36px;
            border-radius: 20px;
            background-color: #d4d2dd;"
          />
          <span class="username" style="padding-left: 8px;
          font-weight: 600;
          letter-spacing: -0.08px;"> ${username} </span>
          <span class="postcontent" style="display: block;
          margin-top: 40px;">
            <a href="${lotLink}" style="color: #7000ff; text-decoration: none;font-size: 24px;
            font-weight: 800;"> ${lotTitle} </a>
            <p style="font-family: -apple-system, BlinkMacSystemFont, Arial, Helvetica, sans-serif; font-size: 14px;  line-height: 22px; color: #160242; padding: 0px; margin: 0px;">${lotDescription}</p>
          </span>
        </div>
      </div>

      <!-- CTA Button -->

      <div class="module">
        <a
          href="${prolongLot}"
          class="ctabutton"
          title="Продлить срок публикации"
          style="display: inline-block;
          background-color: #7000ff;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 600;
          color: #ffffff;
          padding: 20px 24px 20px 24px;
          margin-bottom: 16px;"
        >
          Хочу больше предложений!
        </a>
      </div>

      <!-- Teaser text -->

      <div class="module teaser" style="font-size: 13px;
      line-height: 20px;
      border-left: 3px solid #d5b5ff;
      padding: 4px 0 4px 16px;">
        Если срок публикации объявления будет подходить к концу, а вы захотите
        получить больше предложений, вы можете продлить срок публикации на 48
        часов. Впрочем, сделать это можно в любой момент, даже сейчас, тем более
        что стоит это всего 30 рублей
      </div>

      <!-- Social links -->

      <div class="module social" style="text-align: center;
      margin-top: 40px;">
        <a
          href="https://instagram.com/obmen.market"
          class="socialicon"
          title="Instagram"
          style="padding: 0 12px;"
        >
          <img
            src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/f55d0fc7-087e-41a4-9d94-2750bdb5a4e5/64x64.png"
            width="32px"
            height="32px"
            alt="Instagram"
          />
        </a>

        <a
          href="https://fb.me/obmen.market"
          class="socialicon"
          title="Facebook"
          style="padding: 0 12px;"
        >
          <img
            src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/7eacb2db-391d-43b6-8434-6edd772b155e/64x64.png"
            width="32px"
            height="32px"
            alt="Facebook"
          />
        </a>

        <a href="https://vk.com/obmen.market" class="socialicon" title="VK" style="padding: 0 12px;">
          <img
            src="http://cdn.mcauto-images-production.sendgrid.net/55d8758937b582f0/da958188-3d0c-4243-adfc-431f3d72b173/64x64.png"
            width="32px"
            height="32px"
            alt="VK"
          />
        </a>
      </div>

      <!-- End of Wrapper -->
    </div>

    <!-- Subscription management -->

    <div
      data-role="module-unsubscribe"
      class="module"
      role="module"
      data-type="unsubscribe"
      style="
        color: #444444;
        font-size: 12px;
        line-height: 20px;
        padding: 40px 16px 16px 16px;
        text-align: Center;
      "
      data-muid="4e838cf3-9892-4a6d-94d6-170e474d21e5"
    >
      <p style="font-size: 12px; line-height: 20px">
        <a
          class="Unsubscribe--unsubscribeLink"
          href="{{{unsubscribe}}}"
          target="_blank"
          style="font-family: sans-serif; text-decoration: none"
        >
          Отписаться
        </a>
        |
        <a
          href="{{{unsubscribe_preferences}}}"
          target="_blank"
          class="Unsubscribe--unsubscribePreferences"
          style="font-family: sans-serif; text-decoration: none"
        >
          Настройки уведомлений
        </a>
      </p>
    </div>
  </body>
</html>

`;
