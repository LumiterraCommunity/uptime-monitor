"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotification = void 0;
const axios_1 = __importDefault(require("axios"));
const notifme_sdk_1 = __importDefault(require("notifme-sdk"));
const environment_1 = require("./environment");
const secrets_1 = require("./secrets");
const lark = __importStar(require("@larksuiteoapi/node-sdk"));
const channels = {};
if ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SENDGRID") ||
    (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SES") ||
    (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SPARKPOST") ||
    (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_MAILGUN") ||
    (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP")) {
    channels.email = {
        providers: [],
        multiProviderStrategy: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_STRATEGY") ||
            "roundrobin",
    };
    if ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SENDGRID")) {
        channels.email.providers.push({
            type: "sendgrid",
            apiKey: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SENDGRID_API_KEY"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SES")) {
        channels.email.providers.push({
            type: "ses",
            region: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SES_REGION"),
            accessKeyId: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SES_ACCESS_KEY_ID"),
            secretAccessKey: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SES_SECRET_ACCESS_KEY"),
            sessionToken: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SES_SESSION_TOKEN"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SPARKPOST")) {
        channels.email.providers.push({
            type: "sparkpost",
            apiKey: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SPARKPOST_API_KEY"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_MAILGUN")) {
        channels.email.providers.push({
            type: "mailgun",
            apiKey: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_MAILGUN_API_KEY"),
            domainName: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_MAILGUN_DOMAIN_NAME"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP")) {
        channels.email.providers.push({
            type: "smtp",
            port: ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP_PORT")
                ? parseInt((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP_PORT") || "", 10)
                : 587),
            host: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP_HOST"),
            auth: {
                user: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP_USERNAME"),
                pass: (0, secrets_1.getSecret)("NOTIFICATION_EMAIL_SMTP_PASSWORD"),
            },
        });
    }
}
if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_46ELKS") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_CALLR") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_CLICKATELL") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_INFOBIP") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_NEXMO") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_PLIVO") ||
    (0, secrets_1.getSecret)("NOTIFICATION_SMS_TWILIO")) {
    channels.sms = {
        providers: [],
        multiProviderStrategy: (0, secrets_1.getSecret)("NOTIFICATION_SMS_STRATEGY") ||
            "roundrobin",
    };
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_46ELKS")) {
        channels.sms.providers.push({
            type: "46elks",
            apiUsername: (0, secrets_1.getSecret)("NOTIFICATION_SMS_46ELKS_API_USERNAME"),
            apiPassword: (0, secrets_1.getSecret)("NOTIFICATION_SMS_46ELKS_API_PASSWORD"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_CALLR")) {
        channels.sms.providers.push({
            type: "callr",
            login: (0, secrets_1.getSecret)("NOTIFICATION_SMS_CALLR_LOGIN"),
            password: (0, secrets_1.getSecret)("NOTIFICATION_SMS_CALLR_PASSWORD"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_CLICKATELL")) {
        channels.sms.providers.push({
            type: "clickatell",
            apiKey: (0, secrets_1.getSecret)("NOTIFICATION_SMS_CLICKATELL_API_KEY"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_INFOBIP")) {
        channels.sms.providers.push({
            type: "infobip",
            username: (0, secrets_1.getSecret)("NOTIFICATION_SMS_INFOBIP_USERNAME"),
            password: (0, secrets_1.getSecret)("NOTIFICATION_SMS_INFOBIP_PASSWORD"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_NEXMO")) {
        channels.sms.providers.push({
            type: "nexmo",
            apiKey: (0, secrets_1.getSecret)("NOTIFICATION_SMS_NEXMO_API_KEY"),
            apiSecret: (0, secrets_1.getSecret)("NOTIFICATION_SMS_NEXMO_API_SECRET"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH")) {
        channels.sms.providers.push({
            type: "ovh",
            appKey: (0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH_APP_KEY"),
            appSecret: (0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH_APP_SECRET"),
            consumerKey: (0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH_CONSUMER_KEY"),
            account: (0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH_ACCOUNT"),
            host: (0, secrets_1.getSecret)("NOTIFICATION_SMS_OVH_HOST"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_PLIVO")) {
        channels.sms.providers.push({
            type: "plivo",
            authId: (0, secrets_1.getSecret)("NOTIFICATION_SMS_PLIVO_AUTH_ID"),
            authToken: (0, secrets_1.getSecret)("NOTIFICATION_SMS_PLIVO_AUTH_TOKEN"),
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_SMS_TWILIO")) {
        channels.sms.providers.push({
            type: "twilio",
            accountSid: (0, secrets_1.getSecret)("NOTIFICATION_SMS_TWILIO_ACCOUNT_SID"),
            authToken: (0, secrets_1.getSecret)("NOTIFICATION_SMS_TWILIO_AUTH_TOKEN"),
        });
    }
}
if ((0, secrets_1.getSecret)("NOTIFICATION_SLACK")) {
    channels.slack = {
        providers: [],
        multiProviderStrategy: (0, secrets_1.getSecret)("NOTIFICATION_SLACK_STRATEGY") ||
            "roundrobin",
    };
    if ((0, secrets_1.getSecret)("NOTIFICATION_SLACK_WEBHOOK")) {
        channels.slack.providers.push({
            type: "webhook",
            webhookUrl: (0, secrets_1.getSecret)("NOTIFICATION_SLACK_WEBHOOK_URL"),
        });
    }
}
const notifier = new notifme_sdk_1.default({
    channels,
});
const sendNotification = async (message) => {
    console.log("Sending notification", message);
    message = (0, environment_1.replaceEnvironmentVariables)(message);
    if (channels.email) {
        console.log("Sending email");
        try {
            await notifier.send({
                email: {
                    from: ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_FROM") || (0, secrets_1.getSecret)("NOTIFICATION_EMAIL")),
                    to: ((0, secrets_1.getSecret)("NOTIFICATION_EMAIL_TO") || (0, secrets_1.getSecret)("NOTIFICATION_EMAIL")),
                    subject: message,
                    html: message,
                },
            });
            console.log("Success email");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending email");
    }
    if (channels.sms) {
        console.log("Sending SMS");
        try {
            await notifier.send({
                sms: {
                    from: (0, secrets_1.getSecret)("NOTIFICATION_SMS_FROM"),
                    to: (0, secrets_1.getSecret)("NOTIFICATION_SMS_TO"),
                    text: message,
                },
            });
            console.log("Success SMS");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending SMS");
    }
    if (channels.slack) {
        console.log("Sending Slack");
        try {
            await notifier.send({
                slack: {
                    text: message,
                },
            });
            console.log("Success Slack");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Slack");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_DISCORD_WEBHOOK_URL")) {
        console.log("Sending Discord");
        try {
            await axios_1.default.post((0, secrets_1.getSecret)("NOTIFICATION_DISCORD_WEBHOOK_URL"), {
                content: message,
            });
            console.log("Success Discord");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Discord");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_GOOGLE_CHAT_WEBHOOK_URL")) {
        console.log("Sending Google Chat");
        try {
            await axios_1.default.post((0, secrets_1.getSecret)("NOTIFICATION_GOOGLE_CHAT_WEBHOOK_URL"), {
                text: message,
            });
            console.log("Success Google Chat");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Google Chat");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_ZULIP_MESSAGE_URL") &&
        (0, secrets_1.getSecret)("NOTIFICATION_ZULIP_API_EMAIL") &&
        (0, secrets_1.getSecret)("NOTIFICATION_ZULIP_API_KEY")) {
        console.log("Sending Zulip");
        try {
            await axios_1.default.request({
                method: "post",
                url: (0, secrets_1.getSecret)("NOTIFICATION_ZULIP_MESSAGE_URL"),
                auth: {
                    username: (0, secrets_1.getSecret)("NOTIFICATION_ZULIP_API_EMAIL"),
                    password: (0, secrets_1.getSecret)("NOTIFICATION_ZULIP_API_KEY"),
                },
                params: {
                    content: message,
                },
            });
            console.log("Success Zulip");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Zulip");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_MASTODON") && (0, secrets_1.getSecret)("NOTIFICATION_MASTODON_INSTANCE_URL") && (0, secrets_1.getSecret)("NOTIFICATION_MASTODON_API_KEY")) {
        console.log("Sending Mastodon");
        const instanceUrl = new URL((0, secrets_1.getSecret)("NOTIFICATION_MASTODON_INSTANCE_URL"));
        const baseUrl = `${instanceUrl.protocol}://${instanceUrl.hostname}/api`;
        let visibility = "public";
        if ((0, secrets_1.getSecret)("NOTIFICATION_MASTODON_TOOT_VISIBILITY")) {
            try {
                visibility = (0, secrets_1.getSecret)("NOTIFICATION_MASTODON_TOOT_VISIBILITY");
            }
            catch (e) {
                console.log(`Unsupported Mastodon toot visibility mode: ${(0, secrets_1.getSecret)("NOTIFICATION_MASTODON_TOOT_VISIBILITY")}`);
            }
        }
        await axios_1.default.post(`${baseUrl}/v1/statuses`, {
            visibility: visibility,
            status: message,
        }, {
            headers: {
                "Authorization": `Bearer ${(0, secrets_1.getSecret)("NOTIFICATION_MASTODON_API_KEY")}`
            }
        });
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_MISSKEY") && (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_INSTANCE_URL") && (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_API_KEY")) {
        console.log("Sending Misskey");
        const instanceUrl = new URL((0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_INSTANCE_URL"));
        const baseUrl = `${instanceUrl.protocol}://${instanceUrl.hostname}/api`;
        if ((0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_CHAT") && (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_CHAT_USER_ID")) {
            await axios_1.default.post(`${baseUrl}/messaging/messages/create`, {
                i: (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_API_KEY"),
                userId: (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_CHAT_USER_ID"),
                text: message,
            });
        }
        if ((0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_NOTE")) {
            let visibility = "public";
            let visibleUserIds;
            if ((0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_NOTE_VISIBILITY")) {
                try {
                    visibility = (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_NOTE_VISIBILITY");
                }
                catch (e) {
                    console.log(`Unsupported Misskey note visibility mode: ${(0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_NOTE_VISIBILITY")}`);
                }
            }
            if (visibility == "specified") {
                visibleUserIds = ((0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_NOTE_VISIBLE_USER_IDS") || "").split(",");
            }
            await axios_1.default.post(`${baseUrl}/notes/create`, {
                i: (0, secrets_1.getSecret)("NOTIFICATION_MISSKEY_API_KEY"),
                visibility: visibility,
                visibleUserIds: visibleUserIds,
                text: message,
            });
        }
        console.log("Success Misskey");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_TELEGRAM") && (0, secrets_1.getSecret)("NOTIFICATION_TELEGRAM_BOT_KEY")) {
        console.log("Sending Telegram");
        try {
            const chatIds = (0, secrets_1.getSecret)("NOTIFICATION_TELEGRAM_CHAT_ID")?.split(",") ?? [];
            for (const chatId of chatIds) {
                await axios_1.default.post(`https://api.telegram.org/bot${(0, secrets_1.getSecret)("NOTIFICATION_TELEGRAM_BOT_KEY")}/sendMessage`, {
                    parse_mode: "Markdown",
                    disable_web_page_preview: true,
                    chat_id: chatId.trim(),
                    text: message.replace(/_/g, '\\_'),
                });
            }
            console.log("Success Telegram");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Telegram");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_LARK")) {
        console.log("ready lark sending........");
        const client = new lark.Client({
            appId: (0, secrets_1.getSecret)("NOTIFICATION_LARK_APP_ID"),
            appSecret: (0, secrets_1.getSecret)("NOTIFICATION_LARK_APP_SECRET"),
            // disableTokenCache为true时，SDK不会主动拉取并缓存token，这时需要在发起请求时，调用lark.withTenantToken("token")手动传递
            // disableTokenCache为false时，SDK会自动管理租户token的获取与刷新，无需使用lark.withTenantToken("token")手动传递token
            disableTokenCache: false
        });
        const messageResponse = await client.im.message.create({
            params: {
                receive_id_type: 'chat_id',
            },
            data: {
                receive_id: (0, secrets_1.getSecret)("NOTIFICATION_LARK_CHAT_ID"),
                msg_type: 'interactive',
                content: JSON.stringify({
                    "config": {
                        "wide_screen_mode": true
                    },
                    "elements": [
                        {
                            "tag": "markdown",
                            "content": message.replace(/_/g, '\\_'),
                        }
                    ]
                }),
            },
        });
        // console.log("messageResponse::::",messageResponse)
        // 字符串匹配，如果匹配到了 is back up 关键字的话，就无需要发送加急（因为服务已经恢复了）
        if ((0, secrets_1.getSecret)("NOTIFICATION_LARK_PHONE_CALL_USER_ID") && !message.includes("is back up")) {
            const userIds = (0, secrets_1.getSecret)("NOTIFICATION_LARK_PHONE_CALL_USER_ID")?.split(",") ?? [];
            // 发送加急
            await client.im.message.urgentPhone({
                path: {
                    message_id: messageResponse.data?.message_id,
                },
                data: {
                    user_id_list: userIds,
                },
                params: {
                    user_id_type: "open_id",
                },
            });
        }
        console.log("Success Lark");
        try {
            // const response = await axios.post(
            //   `${getSecret("NOTIFICATION_LARK_BOT_WEBHOOK")}`,
            //   {
            //     "msg_type": "interactive",
            //     "card": {
            //       "config": {
            //         "wide_screen_mode": true
            //       },
            //       "elements": [
            //         {
            //           "tag": "markdown",
            //           "content": message.replace(/_/g, '\\_'),
            //         }
            //       ]
            //     }
            //   }
            // );
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Lark");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_TEAMS")) {
        console.log("Sending Microsoft Teams");
        try {
            await axios_1.default.post(`${(0, secrets_1.getSecret)("NOTIFICATION_TEAMS_WEBHOOK_URL")}`, {
                "@context": "https://schema.org/extensions",
                "@type": "MessageCard",
                themeColor: "0072C6",
                text: message,
                summary: message
            });
            console.log("Success Microsoft Teams");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Microsoft Teams");
    }
    if ((0, secrets_1.getSecret)("NOTIFICATION_CUSTOM_WEBHOOK")) {
        console.log("Sending Webhook");
        try {
            await axios_1.default.post(`${(0, secrets_1.getSecret)("NOTIFICATION_CUSTOM_WEBHOOK_URL")}`, {
                data: {
                    message: JSON.stringify(message),
                }
            }, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Success Webhook");
        }
        catch (error) {
            console.log("Got an error", error);
        }
        console.log("Finished sending Webhook");
    }
};
exports.sendNotification = sendNotification;
//# sourceMappingURL=notifme.js.map