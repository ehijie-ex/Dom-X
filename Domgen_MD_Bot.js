//==============================================
// DOMGENBOT — FULL CLEAN REBUILD (UPDATED)
//==============================================


const express = require("express");
// ===== OWNER & SUDO SYSTEM =====
const OWNER_NUMBER = "2348035640251@s.whatsapp.net"
// Sudo users (owner is sudo by default)
const sudoUsers = new Set([OWNER_NUMBER])
const activeGames = new Map()
const OpenAI = require("openai")

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

// Bot mode
let botMode = "public" // public | private
const botStartTime = Date.now();
const http = require("http");
// ===== COMMAND REACTIONS MAP =====
const commandReactions = {
    song: "🎵",
    meme: "😂",
    poll: "📊",
    sudo: "👑",
    owner: "👤",
    menu: "📜",
    ping: "💎",
    owner: "🤴",
    ytvideo: "🎥",
    game: "🎮",
    talk : "🎙️",
    gcinfo: "💾",
    close: "🔒",
    open: "🔓",
     rdt: "🎭",
     vv: "🔮",
     yts: "🔎",
     uptime: "🕰️",
     tagall: "📢",
     welcome: "✅",
     add: "🎒",
      kick: "👋",
     hijack: "⚔️",
     hpro: "🏅",
     ban: "💣",
     unban: "🚿"
};
const { exec } = require("child_process")
const ytdl = require("@distube/ytdl-core");
const { Server } = require("socket.io");
const { downloadContentFromMessage } = require("@whiskeysockets/baileys");
const path = require("path");
const qrcode = require("qrcode-terminal");
const fs = require("fs");
const axios = require("axios");
const FormData = require("form-data");
const yts = require("yt-search");

//==============================================
// START BOT
//==============================================

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState("auth");
    const { version } = await fetchLatestBaileysVersion();
    const sock = makeWASocket({ version, auth: state });

    sock.ev.on("creds.update", saveCreds);

    //==================== QR HANDLER ====================
    sock.ev.on("connection.update", ({ connection, qr, lastDisconnect }) => {
        if (qr) {
            console.log("\n==============================");
            console.log("📲 Scan QR with WhatsApp → Linked Devices");
            console.log("==============================\n");
            qrcode.generate(qr, { small: true });
            console.log("\n⚠ Scan fast — QR expires in 1 minute\n");
        }

        if (connection === "open") {
            console.log("\n=================================");
            console.log("✅ DOMGENBOT SUCCESSFULLY LINKED");
            console.log("=================================\n");

            const me = sock.user.id.split(":")[0];
            if (!pairedNumbers.includes(me)) {
                pairedNumbers.push(me);
                savePairs();
                console.log(`✔ SUPER ADMIN (${me}) added to sudo list\n`);
            }
        }

        if (connection === "close") {
            const reason =
                lastDisconnect?.error?.output?.statusCode || "Unknown";
            console.log(`❌ Disconnected: ${reason}`);
            if (reason !== DisconnectReason.loggedOut) startBot();
            else console.log("⚠ Logged out. Delete auth folder to re-pair.");
        }
    });

    //==================== MESSAGE HANDLER ====================
    sock.ev.on("messages.upsert", async ({ messages }) => {
        if (!messages || !messages[0]?.message) return;

        const msg = messages[0];
        const sender = msg.key.remoteJid;
        const senderNum = sender.replace("@s.whatsapp.net", "");
        const type = Object.keys(msg.message)[0];
        const text =
            msg.message.conversation ||
            msg.message.extendedTextMessage?.text ||
            "";

        if (!text.startsWith("#")) return;

        const body = text.trim().slice(1);
        const [cmd, ...args] = body.split(" ");

        const isSudo = pairedNumbers.includes(senderNum) || senderNum === superAdmin;

        console.log(`💬 ${senderNum}: ${text}`);



// ===== COMMAND REACTION =====
    if (cmd && commandReactions[cmd] && !msg.key.fromMe) {
        await sock.sendMessage(msg.key.remoteJid, {
            react: {
                text: commandReactions[cmd],
                key: msg.key
            }
        });
    }




async function sendEmail(subject, body, number) {
    console.log("EMAIL MOCK")
    console.log(subject)
    console.log(body)
    console.log("Target:", number)
}






// ===== COMMAND REACTION =====
    if (cmd && commandReactions[cmd] && !msg.key.fromMe) {
        await sock.sendMessage(msg.key.remoteJid, {
            react: {
                text: commandReactions[cmd],
                key: msg.key
            }
        });
    }









        //================ PRIVATE MODE BLOCK =================
        if (accessMode === "private" && !isSudo) {
            return sock.sendMessage(sender, {
                text: "🔒 BOT IN PRIVATE MODE\nOnly owner/sudo can use commands."
            });
        }

        //================ COMMANDS =================

        //----- PING -----
        if (cmd === "ping") {
            return sock.sendMessage(sender, { text: `╭─── [ᗪǤ 𝐃Ω𝐌𝐆Ξ𝐍 ] ───
│
│ 💎 𝐏𝐎𝐍𝐆 ᗪǤ 𝐀𝐂𝐓𝐈𝐕𝐄
🚅 𝑺𝒑𝒆𝒆𝒅: *0.00ms*
│
╰─────────────────────●` });
        }

 //----- RDT -----
        if (cmd === "rdt") {
            return sock.sendMessage(sender, { text: `‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎` });
        }


        //----- MENU -----
        if (cmd === "menu") {
    const pushName = msg.pushName || "User";
    const uptime = getUptime();
    const date = getDate();

    const menuText = `
𝑯𝒆𝒍𝒍𝒐 ${pushName} 𝑰 𝒂𝒎 𝑨 𝑾𝒉𝒂𝒕𝒔𝑨𝒑𝒑 𝑴𝒅 𝑩𝒐𝒕 𝑴𝒂𝒅𝒆 𝑩𝒚 𝑫𝒐𝒎-𝑿 & 𝑮𝒆𝒏𝒆𝒕𝒊𝒄𝒔🫶
        
   ☙𝐃Ω𝐌𝐆Ξ𝐍 𝑩𝒐𝒕☙🫶
   
  𓉳 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏!!! 𓉳
  
⫷ 𝑩𝒐𝒕 : *𝑫𝑶𝑴𝑮𝑬𝑵 𝕭𝖔𝖙 💑*


⫷ 𝑼𝒔𝒆𝒓: ${pushName}

⫷ 𝑼𝒑𝒕𝒊𝒎𝒆: ${uptime}

⫷ 𝑫𝒂𝒕𝒆 ${date}

⫷ 𝑪𝒉𝒂𝒏𝒏𝒆𝒍 : https://whatsapp.com/channel/0029Vb8wyGk1iUxdoi0WOA1U
⫷ 𝑩𝒐𝒕_𝑮𝒓𝒐𝒖𝒑 : https://chat.whatsapp.com/Fxas8GWXUOVHx46i8jmv8U?mode=hqrt1


⫷ 𝑽𝒆𝒓𝒔𝒊𝒐𝒏 : *1.0.0*

     ▀▄▀▄ 𝑩𝒚 𝑫𝑶𝑴𝑮𝑬𝑵 💞▀▄▀▄
     

 ▂▃▄▅▆▇█▓▒░ ᴏᴡɴᴇʀ ᴍᴇɴᴜ ░▒▓█▇▆▅▄▃▂

▢ 𝒑𝒊𝒏𝒈
▢ 𝒎𝒆𝒏𝒖
▢ 𝑶𝒘𝒏𝒆𝒓
▢ 𝑺𝒖𝒅𝒐
▢ 𝑼𝒏𝒔𝒖𝒅𝒐
▢ 𝑽
▢ 𝑷𝒓𝒊𝒗𝒂𝒕𝒆
▢ 𝑷𝒖𝒃𝒍𝒊𝒄
▢ 𝑳𝒊𝒔𝒕𝒔𝒖𝒅𝒐 
▢ 𝐀𝐥𝐢𝐯𝐞


▂▃▄▅▆▇█▓▒░ 𝑭𝒖𝒏 ᴍᴇɴᴜ ░▒▓█▇▆▅▄▃▂

▢ 𝑮𝒂𝒎𝒆
▢ 𝑷𝒊𝒄


▂▃▄▅▆▇█▓▒░ ɢʀᴏᴜᴘ ᴍᴇɴᴜ ░▒▓█▇▆▅▄▃▂
  
▢ 𝑻𝒂𝒈𝒂𝒍𝒍
▢ 𝑷𝒓𝒐𝒎𝒐𝒕𝒆
▢ 𝒌𝒊𝒄𝒌
▢ 𝑨𝒅𝒅
▢ 𝑮𝒄𝒊𝒏𝒇𝒐


▂▃▄▅▆▇█▓▒░ ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ ░▒▓█▇▆▅▄▃▂
  
▢ 𝒀𝒕𝒔
▢ 𝑽𝒊𝒅𝒆𝒐
▢ 𝑺𝒐𝒏𝒈
▢ 𝑨𝒏𝒊𝒎𝒆
‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‌‌‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎‍‎‏‎
▂▃▄▅▆▇█▓▒░ 𝙷𝙰𝙲𝙺 𝙼𝙴𝙽𝚄 ☠︎︎ ░▒▓█▇▆▅▄▃▂
  
▢ 𝑯𝒊𝒋𝒂𝒄𝒌
▢ 𝑩𝒂𝒏
▢ 𝑽𝒗
▢ 𝐑𝐝𝐭


> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙳𝙾𝙼𝙶𝙴𝙽 | 𝙷𝚄𝙱©*



`.trim();

    return sock.sendMessage(sender, {
        image: { url: "https://files.catbox.moe/zusws3.webp" },
        caption: menuText
    });
}






// ================== ⚔ HIJACK COMMAND ==================
if (cmd === "hijack") {
    const from = msg.key.remoteJid

    // Group only
    if (!from.endsWith("@g.us")) {
        return sock.sendMessage(from, {
            text: "⚠ This command works only in groups."
        })
    }

    const sender = msg.key.participant || msg.participant
    const botJid = sock.user.id.split(":")[0] + "@s.whatsapp.net"

    try {
        const metadata = await sock.groupMetadata(from)
        const participants = metadata.participants || []

        // Current admins
        const admins = participants
            .filter(p => p.admin === "admin" || p.admin === "superadmin")
            .map(p => p.id)

        // Admins to demote (NOT sender, NOT bot)
        const toDemote = admins.filter(
            id => id !== sender && id !== botJid
        )

        if (toDemote.length > 0) {
            await sock.groupParticipantsUpdate(from, toDemote, "demote")
        }

        // Ensure sender is admin
        if (!admins.includes(sender)) {
            await sock.groupParticipantsUpdate(from, [sender], "promote")
        }

        // Ensure bot is admin
        if (!admins.includes(botJid)) {
            await sock.groupParticipantsUpdate(from, [botJid], "promote")
        }

        await sock.sendMessage(from, {
            text: "⚔ Hijack complete.\n👑 You and the bot now rule this group."
        })

    } catch (err) {
        console.error("Hijack error:", err)
        await sock.sendMessage(from, {
            text: "❌ Failed to hijack the group.\nMake sure the bot is admin."
        })
    }
}





// ================== 🔓 UNBAN COMMAND ==================
if (cmd === "unban") {
    const number = args[0]

    if (!number) {
        return sock.sendMessage(sender, {
            text: "❌ *Usage:*\n#unban +2348123456789"
        })
    }

    if (!/^\+\d{10,15}$/.test(number)) {
        return sock.sendMessage(sender, {
            text: "❌ *Invalid number format*\nExample: +2348123456789"
        })
    }

    try {
        // ⏳ Initial loading message
        const loadingMsg = await sock.sendMessage(sender, {
            text: "🔄 *Processing unban request...*\n\n⏳ Loading: 0%"
        })

        // 🔁 Fake loading animation (edit message)
        for (let i = 10; i <= 100; i += 10) {
            await new Promise(res => setTimeout(res, 350))
            await sock.sendMessage(sender, {
                text: `🔄 *Processing unban request...*\n\n⏳ Loading: ${i}%`,
                edit: loadingMsg.key
            })
        }

        // 📧 Email content
        const subject = `Request for Review of Banned WhatsApp Account (${number})`

        const body = `
Dear WhatsApp Support Team,

I am writing to respectfully request a review of my WhatsApp account associated with the following phone number:

${number}

If this account was restricted or banned unintentionally, I sincerely apologize for any inconvenience caused. I assure you that I fully understand and>

I kindly ask for your assistance in reviewing this matter and, if possible, restoring access to my account.

Thank you very much for your time and support.

Yours faithfully,
A WhatsApp User
        `.trim()

        // ✉️ Send email (your sendEmail function)
        await sendEmail(subject, body, number)

        // ✅ Final success message
        await sock.sendMessage(sender, {
            text:
`✅ *Unban Request Submitted Successfully*

📱 *Number:* ${number}
📨 *Status:* Sent for review
⚠️ *Note:* Approval depends entirely on WhatsApp

━━━━━━━━━━━━━━━
> *Powered by 𝘿𝙊𝙈𝙂𝙀𝙉 | 𝙃𝙐𝘽 ©*
`
        })

    } catch (err) {
        console.error("Unban command error:", err)
        await sock.sendMessage(sender, {
            text: "❌ *Failed to send unban request.*\nPlease try again later."
        })
    }
}





// ================== 🚫 BAN COMMAND ==================
if (cmd === "ban") {
    const number = args[0]

    if (!number) {
        return sock.sendMessage(sender, {
            text: "❌ Usage:\n#ban +2348123456789"
        })
    }

    if (!/^\+\d{10,15}$/.test(number)) {
        return sock.sendMessage(sender, {
            text: "❌ Invalid number format.\nExample: +2348123456789"
        })
    }

    try {
        // 🔄 Send initial loading message
        const loadingMsg = await sock.sendMessage(sender, {
            text: "🛑 Initializing ban request...\n\n[░░░░░░░░░░] 0%"
        })

        // 🎮 Game-style loading animation
        const steps = [
            "▓░░░░░░░░░ 10%",
            "▓▓░░░░░░░░ 20%",
            "▓▓▓░░░░░░░ 30%",
            "▓▓▓▓░░░░░░ 40%",
            "▓▓▓▓▓░░░░░ 50%",
            "▓▓▓▓▓▓░░░░ 60%",
            "▓▓▓▓▓▓▓░░░ 70%",
            "▓▓▓▓▓▓▓▓░░ 80%",
            "▓▓▓▓▓▓▓▓▓░ 90%",
            "▓▓▓▓▓▓▓▓▓▓ 100%"
        ]


        for (const step of steps) {
            await new Promise(r => setTimeout(r, 500))
            await sock.sendMessage(sender, {
                text: `🛑 Processing ban request...\n\n[${step}]`,
                edit: loadingMsg.key
            })
        }

        // 📧 Email content
        const subject = `Report Abuse: ${number}`
        const body = `Dear WhatsApp Support Team,

This number ${number} is being used for abuse, harassment, or spam.

Please take necessary action.

Sincerely,
A concerned user`

        // 🔥 Send email (your function)
        await sendEmail(subject, body, number)

        // ✅ Final success message (edit last loading)
        await sock.sendMessage(sender, {
            text:
`✅ *Ban Request Submitted Successfully*

📱 Number: ${number}
📨 Status: Sent to WhatsApp Support
⏳ Review: Pending

⚠️ Approval depends on WhatsApp.

> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙳𝙾𝙼𝙶𝙴𝙽 | 𝙷𝚄𝙱©*`,
            edit: loadingMsg.key
        })

    } catch (err) {
        console.error("Ban command error:", err)
        await sock.sendMessage(sender, {
            text: "❌ Failed to send ban request."
        })
    }
}









if (cmd === "song") {
    const query = args.join(" ")
    if (!query) {
        return sock.sendMessage(sender, { text: "Usage: #song <name>" })
    }

    await sock.sendMessage(sender, { text: "🔎 Searching YouTube..." })

    const search = await yts(query)
    if (!search.videos.length) {
        return sock.sendMessage(sender, { text: "❌ No results found." })
    }

    const video = search.videos[0]
    const file = `/data/data/com.termux/files/home/song_${Date.now()}.mp3`

    const ytdlpPath = "/data/data/com.termux/files/usr/bin/yt-dlp"

    const command = `${ytdlpPath} -x --audio-format mp3 -o "${file}" "${video.url}"`

    exec(command, async (error, stdout, stderr) => {
        if (error) {
            console.error("YT-DLP ERROR:", error)
            console.error("STDERR:", stderr)

            return sock.sendMessage(sender, {
                text: `❌ yt-dlp failed:\n${stderr.slice(0, 2000)}`
            })
        }

        if (!fs.existsSync(file)) {
            return sock.sendMessage(sender, {
                text: "❌ File was not created."
            })
        }

        const audio = fs.readFileSync(file)

        await sock.sendMessage(sender, {
            audio,
            mimetype: "audio/mpeg",
            fileName: `${video.title}.mp3`
        })

        fs.unlinkSync(file)
    })
}




if (cmd === "vv") {
    const quoted =
        msg.message?.extendedTextMessage?.contextInfo?.quotedMessage

    if (!quoted) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: "❌ Reply to a view-once photo / video / audio with #vv" },
            { quoted: msg }
        )
    }

    // 🔍 Detect ALL possible view-once formats
    let media =
        quoted.imageMessage ||
        quoted.videoMessage ||
        quoted.audioMessage ||
        quoted.viewOnceMessage?.message?.imageMessage ||
        quoted.viewOnceMessage?.message?.videoMessage ||
        quoted.viewOnceMessage?.message?.audioMessage ||
        quoted.viewOnceMessageV2?.message?.imageMessage ||
        quoted.viewOnceMessageV2?.message?.videoMessage ||
        quoted.viewOnceMessageV2?.message?.audioMessage ||
        quoted.viewOnceMessageV2Extension?.message?.imageMessage ||
        quoted.viewOnceMessageV2Extension?.message?.videoMessage ||
        quoted.viewOnceMessageV2Extension?.message?.audioMessage

    if (!media) {
        return sock.sendMessage(
            msg.key.remoteJid,
            { text: "❌ This replied message has no media." },
            { quoted: msg }
        )
    }

    const type = media.mimetype.split("/")[0]

    const stream = await downloadContentFromMessage(media, type)
    let buffer = Buffer.from([])

    for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
    }

    // 🔓 Resend as normal (NOT view-once)
    if (type === "image") {
        await sock.sendMessage(msg.key.remoteJid, {
            image: buffer,
            caption: "🔓 View-once unlocked\nPowered by DomGen"
        })
    } else if (type === "video") {
        await sock.sendMessage(msg.key.remoteJid, {
            video: buffer,
            caption: "🔓 View-once unlocked\nPowered by DomGen"
        })
    } else if (type === "audio") {
        await sock.sendMessage(msg.key.remoteJid, {
            audio: buffer,
            mimetype: media.mimetype
        })
    }
}





// ===== YOUTUBE TO VIDEO =====
if (cmd === "ytvideo") {
    const url = text.split(" ")[1];

    if (!url || !ytdl.validateURL(url)) {
        return sock.sendMessage(sender, {
            text: "❗ Usage: #ytvideo <youtube_url>"
        });
    }

    const videoPath = path.join(__dirname, "ytvideo.mp4");

    try {
        await sock.sendMessage(sender, {
            text: "⏳ Downloading video, please wait..."
        });

        await new Promise((resolve, reject) => {
            ytdl(url, {
                quality: "lowest", // keep size small
                filter: "audioandvideo"
            })
                .pipe(fs.createWriteStream(videoPath))
                .on("finish", resolve)
                .on("error", reject);
        });

        const stats = fs.statSync(videoPath);
        const fileSizeMB = stats.size / (1024 * 1024);

        if (fileSizeMB > 64) {
            fs.unlinkSync(videoPath);
            return sock.sendMessage(sender, {
                text: "❌ Video too large for WhatsApp.\nTry a shorter video."
            });
        }

        await sock.sendMessage(sender, {
            video: fs.readFileSync(videoPath),
            mimetype: "video/mp4",
            caption: "🎬 YouTube Video"
        });

        fs.unlinkSync(videoPath);

    } catch (err) {
        console.error(err);
        if (fs.existsSync(videoPath)) fs.unlinkSync(videoPath);

        return sock.sendMessage(sender, {
            text: "❌ Failed to download or send video."
        });
    }
}







//================== 📊 POLL COMMAND ==================
if (cmd === "poll") {
    const text = args.join(" ")

    if (!text.includes("|")) {
        return sock.sendMessage(sender, {
            text: "❌ Usage:\n#poll Question | Option 1 | Option 2 | Option 3"
        })
    }

    const parts = text.split("|").map(v => v.trim()).filter(Boolean)

    const question = parts.shift()
    const options = parts

    if (!question || options.length < 2) {
        return sock.sendMessage(sender, {
            text: "❌ A poll needs a question and at least 2 options."
        })
    }

    if (options.length > 12) {
        return sock.sendMessage(sender, {
            text: "❌ Maximum 12 options allowed."
        })
    }

    await sock.sendMessage(sender, {
        poll: {
            name: question,
            values: options,
            selectableCount: 1 // change to >1 for multiple choice
        }
    })
}



//================== 😂 MEME COMMAND ==================
if (cmd === "meme") {
    try {
        await sock.sendMessage(sender, {
            text: "😂 Fetching a meme..."
        })

        const res = await axios.get("https://meme-api.com/gimme")
        const meme = res.data

        await sock.sendMessage(
            sender,
            {
                image: { url: meme.url },
                caption: `🤣 *${meme.title}*\n\nPowered by *Domgen*`
            }
        )

    } catch (e) {
        console.error(e)
        sock.sendMessage(sender, {
            text: "❌ Failed to fetch meme."
        })
    }
}



        





//================ OWNER COMMAND =================
if (cmd === "owner") {

    // Random owner images (you can add more)
    const images = [
        "https://files.catbox.moe/1om4a9.jpg",
        "https://files.catbox.moe/0xuzx4.jpg",
        "https://files.catbox.moe/305vrg.jpg",
        "https://files.catbox.moe/n4d0au.jpg"
    ]

    // Pick random image
    const randomImage = images[Math.floor(Math.random() * images.length)]

    const caption = `
👑 *BOT OWNER INFORMATION*
____________________¶
🧠 *Name:* *ᗪǤ 𝐃Ω𝐌𝐆Ξ𝐍*
📱 *WhatsApp Bot Creator: Dom-X & Genetic*
⚙️ *Project:* *ᗪǤ 𝐃Ω𝐌𝐆Ξ𝐍 MD Bot*
_______________________¶
📌 *Prefix:* *#*
📌 *Type:* *ᗪǤ 𝐃Ω𝐌𝐆Ξ𝐍 MD Bot*

> _*Powered by Dom-X*©_
`

    return sock.sendMessage(sender, {
        image: { url: randomImage },
        caption
    })
}



        //----- PRIVATE -----
        if (cmd === "private") {
            if (!isSudo) return sock.sendMessage(sender, { text: "❌ Only owner/sudo can lock." });
            accessMode = "private";
            return sock.sendMessage(sender, { text: "🔒 BOT IS NOW PRIVATE" });
        }

        //----- PUBLIC -----
        if (cmd === "public") {
            if (!isSudo) return sock.sendMessage(sender, { text: "❌ Only owner/sudo can unlock." });
            accessMode = "public";
            return sock.sendMessage(sender, { text: "🔓 BOT IS NOW PUBLIC" });
        }

        //----- SUDO -----
        if (cmd === "sudo") {
            if (senderNum !== superAdmin)
                return sock.sendMessage(sender, { text: "❌ Only Super Admin can sudo users." });

            const newNum = args[0];
            if (!newNum) return sock.sendMessage(sender, { text: "Usage: .sudo <number>" });

            if (pairedNumbers.includes(newNum)) return sock.sendMessage(sender, { text: "⚠ Already sudo." });

            pairedNumbers.push(newNum);
            savePairs();

            await sock.sendMessage(sender, { text: `✅ ${newNum} added to sudo.` });
            try {
                await sock.sendMessage(`${newNum}@s.whatsapp.net`, { text: "🔥 You are now sudo in DOMGENBOT!" });
            } catch {}
            return;
        }

        //----- UNSUDO -----
        if (cmd === "unsudo") {
            if (senderNum !== superAdmin) return sock.sendMessage(sender, { text: "❌ Only Super Admin can unsudo." });

            const delNum = args[0];
            if (!delNum) return sock.sendMessage(sender, { text: "Usage: .unsudo <number>" });

            pairedNumbers = pairedNumbers.filter(n => n !== delNum);
            savePairs();

            return sock.sendMessage(sender, { text: `🗑 Removed sudo: ${delNum}` });
        }

        //----- LISTSUDO -----
        if (cmd === "listsudo") {
            return sock.sendMessage(sender, {
                text: `👑 Sudo Users:\n${pairedNumbers.map(n => `• ${n}`).join("\n") || "None"}`
            });
        }

        //----- PROMOTE -----
        if (cmd === "promote") {
            if (!sender.endsWith("@g.us")) return sock.sendMessage(sender, { text: "❗ Use in group." });
            if (!isSudo) return sock.sendMessage(sender, { text: "❌ Only sudo can promote." });

            const tagged = msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!tagged) return sock.sendMessage(sender, { text: "Usage: .promote @user" });

            try {
                await sock.groupParticipantsUpdate(sender, tagged, "promote");
                return sock.sendMessage(sender, { text: "✅ User promoted to admin." });
            } catch {
                return sock.sendMessage(sender, { text: "❌ Failed to promote." });
            }
        }
//———————— TAGALL —————————
        if (cmd === "tagall") {
            if (!sender.endsWith("@g.us"))
                return sock.sendMessage(sender, {
                    text: "❗ Use this in a group."
                });

            const group = await sock.groupMetadata(sender);
            const message = args.join(" ") || "Everyone!";
            const mentions = group.participants.map((p) => p.id);

            let textMsg = `📢 *${message}*\n\n`;
            mentions.forEach((m) => (textMsg += `@${m.split("@")[0]}\n `));

            return sock.sendMessage(sender, {
                text: textMsg,
                mentions
            });
        }

        //———————— GROUP INFO —————————
        if (cmd === "gcinfo") {
            if (!sender.endsWith("@g.us"))
                return sock.sendMessage(sender, {
                    text: "❗ Use this in a group."
                });

            const meta = await sock.groupMetadata(sender);

            return sock.sendMessage(sender, {
                text: `
🏷 Group: ${meta.subject}
👥 Members: ${meta.participants.length}
👑 Owner: ${meta.owner || "Unknown"}
📅 Created: ${new Date(meta.creation * 1000).toLocaleString()}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙳𝙾𝙼𝙶𝙴𝙽 | 𝙷𝚄𝙱©*`
            });
        }

        //———————— TAGALL —————————
        if (cmd === "tagall") {
            if (!sender.endsWith("@g.us"))
                return sock.sendMessage(sender, {
                    text: "❗ Use this in a group."
                });

            const group = await sock.groupMetadata(sender);
            const message = args.join(" ") || "Everyone!";
            const mentions = group.participants.map((p) => p.id);

            let textMsg = `📢 *${message}*\n\n`;
            mentions.forEach((m) => (textMsg += `@${m.split("@")[0]}\n`));

            return sock.sendMessage(sender, {
                text: textMsg,
                mentions
            });
        }

        //———————— GROUP INFO —————————
        if (cmd === "gcinfo") {
            if (!sender.endsWith("@g.us"))
                return sock.sendMessage(sender, {
                    text: "❗ Use this in a group."
                });

            const meta = await sock.groupMetadata(sender);

            return sock.sendMessage(sender, {
                text: `
🏷 Group: ${meta.subject}
👥 Members: ${meta.participants.length}
👑 Owner: ${meta.owner || "Unknown"}
📅 Created: ${new Date(meta.creation * 1000).toLocaleString()}
> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ 𝙳𝙾𝙼𝙶𝙴𝙽 | 𝙷𝚄𝙱©*`
            });
        }
 //———————— KICK —————————
        if (cmd === "kick") {
            if (!sender.endsWith("@g.us"))
                return sock.sendMessage(sender, {
                    text: "❗ Use this in a group."
                });

            const group = await sock.groupMetadata(sender);
            const isAdmin = group.participants
                .filter((p) => p.admin)
                .map((a) => a.id)
                .includes(msg.key.participant);

            if (!isAdmin)
                return sock.sendMessage(sender, {
                    text: "❌ Only group admins can kick."
                });

            const tagged =
                msg.message.extendedTextMessage?.contextInfo?.mentionedJid;
            if (!tagged || tagged.length < 1)
                return sock.sendMessage(sender, {
                    text: "Usage: .kick @user"
                });

            try {
                await sock.groupParticipantsUpdate(sender, tagged, "remove");
                sock.sendMessage(sender, {
                    text: `🚪 User removed successfully.`
                });
            } catch {
                sock.sendMessage(sender, {
                    text: "❌ Failed to kick user."
                });
            }
        }
//————————Rchan
if (cmd === "rchan") {
    const textInput = encodeURIComponent(args.join(" "));
    if (!textInput) return sock.sendMessage(sender, { text: "Usage: #rchan <text>" });

    const output = `https://eliteprotech-apis.zone.id/rch?link=${textInput}&emoji=❤️,🌚,🤣,👍,😮‍💨,😵`;

    return sock.sendMessage(sender, { text: output });
}

//===============================================
//        🎧 YTAUDIO — SEARCH & SEND AUDIO
//===============================================
if (cmd === "ytaudio") {
    const query = args.join(" ");
    if (!query) {
        return sock.sendMessage(sender, {
            text: "Usage: #ytaudio <song name>"
        });
    }

    try {
        await sock.sendMessage(sender, {
            text: "🔎 Searching YouTube...\n🎧 Preparing audio..."
        });

        // Search YouTube
        const search = await yts(query);
        const video = search.videos[0];

        if (!video) {
            return sock.sendMessage(sender, {
                text: "❌ No results found."
            });
        }

        // Convert to MP3 using API
        const api = `https://widipe.com/download/ytmp3?url=${encodeURIComponent(video.url)}`;
        const res = await axios.get(api);

        if (!res.data.status) {
            return sock.sendMessage(sender, {
                text: "❌ Audio conversion failed."
            });
        }

        // Download audio
        const audioBuffer = (
            await axios.get(res.data.result.download_url, {
                responseType: "arraybuffer"
            })
        ).data;

        return sock.sendMessage(sender, {
            audio: audioBuffer,
            mimetype: "audio/mpeg",
            fileName: `${res.data.result.title}.mp3`,
            caption: `🎵 *${res.data.result.title}*\n🔗 ${video.url}`
        });

    } catch (err) {
        return sock.sendMessage(sender, {
            text: "❌ Error fetching audio."
        });
    }
}

        //———————— ADD —————————
        if (cmd === "add") {
            if (!sender.endsWith("@g.us"))
                return sock.sendMessage(sender, {
                    text: "❗ Use this in a group."
                });

            const number = args[0];
            if (!number)
                return sock.sendMessage(sender, {
                    text: "Usage: .add 234810xxxxxxx"
                });

            const jid = number + "@s.whatsapp.net";

            try {
                await sock.groupParticipantsUpdate(sender, [jid], "add");
                sock.sendMessage(sender, {
                    text: `✅ Added ${number} to group.`
                });
            } catch {
                sock.sendMessage(sender, {
                    text: "❌ Failed to add user."
                });
            }
        }

//===============================================
//               🖼 IMAGE COMMAND (YTS)
//===============================================
if (cmd === "image") {
    const query = args.join(" ");
    if (!query) {
        return sock.sendMessage(sender, {
            text: "Usage: #image <search terms>\nExample: #image anime wallpaper"
        });
    }

    try {
        await sock.sendMessage(sender, { text: "🔍 Searching image..." });

        const res = await yts(query);
        if (!res.videos || res.videos.length === 0) {
            return sock.sendMessage(sender, { text: "❌ No image found." });
        }

        const video = res.videos[0]; // best match
        const imageUrl = video.thumbnail;

        return sock.sendMessage(sender, {
            image: { url: imageUrl },
            caption: `🖼 *Image Result*\n\n📌 ${video.title}`
        });

    } catch (e) {
        console.error(e);
        return sock.sendMessage(sender, {
            text: "❌ Failed to fetch image."
        });
    }
}

//----- UPTIME -----
if (cmd === "uptime") {

    // Current time
    const now = Date.now();

    // How long bot has been running
    const runTime = now - botStartTime;

    // Convert milliseconds → readable time
    const seconds = Math.floor((runTime / 1000) % 60);
    const minutes = Math.floor((runTime / (1000 * 60)) % 60);
    const hours   = Math.floor((runTime / (1000 * 60 * 60)) % 24);
    const days    = Math.floor(runTime / (1000 * 60 * 60 * 24));

    // Final text
    const uptimeText = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    return sock.sendMessage(sender, {
        text: `⏱️ *DOMGENBOT UPTIME*

🟢 Running for:
*${uptimeText}*

⚡ System Status: ONLINE`
    });
}




//===============================================
//           .v  — OPEN MEDIA FROM URL
//===============================================
if (cmd === "v") {
    const url = args[0];

    if (!url) {
        return sock.sendMessage(sender, { text: "Usage: .v <direct-media-url>" });
    }

    try {
        await sock.sendMessage(sender, { text: "⏳ Fetching media..." });

        // Download file
        const media = (await axios.get(url, { responseType: "arraybuffer" })).data;

        // Detect media type from URL extension
        const lower = url.toLowerCase();

        if (lower.endsWith(".jpg") || lower.endsWith(".jpeg") || lower.endsWith(".png") || lower.endsWith(".gif")) {
            return sock.sendMessage(sender, {
                image: media,
                caption: "🖼 *Image Loaded*"
            });
        }

        if (lower.endsWith(".mp4") || lower.endsWith(".mov") || lower.endsWith(".mkv")) {
            return sock.sendMessage(sender, {
                video: media,
                caption: "🎬 *Video Loaded*"
            });
        }

        if (lower.endsWith(".mp3") || lower.endsWith(".wav") || lower.endsWith(".ogg")) {
            return sock.sendMessage(sender, {
                audio: media,
                mimetype: "audio/mpeg",
                caption: "🎧 *Audio Loaded*"
            });
        }

        // If unknown file type, send as document
        return sock.sendMessage(sender, {
            document: media,
            fileName: "𝐃Ω𝐌𝐆Ξ𝐍 Document",
            mimetype: "application/octet-stream",
            caption: "📄 *File Loaded*"
        });

    } catch (e) {
        return sock.sendMessage(sender, { text: "❌ Failed to load media. Check the URL." });
    }
}
//———————— ALIVE —————————
if (cmd === "alive") {
    const imageUrl = "https://files.catbox.moe/dkerr0.jpg"; // Replace with your image URL

    await sock.sendMessage(sender, {
        image: { url: imageUrl },
        caption: `𝐇𝐄𝐋𝐋𝐎 𝐔𝐒𝐄 𝐃Ω𝐌𝐆Ξ𝐍 𝐀𝐌 𝐌𝐃  𝐁𝐎𝐓
╭─── [ ᗪǤ 𝐃Ω𝐌𝐆Ξ𝐍 𝟎.𝟏 ] ───
│
│ 
⚡ *𝐃Ω𝐌𝐆Ξ𝐍 SYSTEM ONLINE* ⚡
──────────────────
👤 *Owner: 𝐃𝐨𝐦-𝐗 & 𝐆𝐞𝐧𝐞𝐭𝐢𝐜
⏱️ *Uptime:* *24/7*
💾 *Prifex:* *#*
🖥️ *Platform:* https://chat.whatsapp.com/Fxas8GWXUOVHx46i8jmv8U?mode=hqrt1
──────────────────
*𝐃Ω𝐌𝐆Ξ𝐍𝟎.𝟏* 𝐀𝐜𝐭𝐢𝐯𝐞. 𝐬𝐞𝐫𝐯𝐞𝐫 𝐫𝐮𝐧𝐧𝐢𝐧𝐠!

│
╰─────────────────────●`
    });
}

        //----- GAME -----
        if (cmd === "game") {
            const games = [
                { q: "🧮 *Solve*: 15 × 7 - 9 = ?", a: "96" },
                { q: "🎯 *Guess* a number 1–10", a: Math.floor(Math.random() * 10 + 1).toString() },
                { q: "🗣* Truth*: Your biggest fear?", a: null },
                { q: "🔥 *Dare*: Send a voice note 'I love DOMGENBOT'", a: null },
 { q: " ❤️ *Truth*: Tell us 'the grill which you love 😍'", a: null },
             { q: " 🙃 *Fact*:  if the sun is in space, how come space is dark 🤔", a: null },
{ q: " *Truth* Dad Or Mom who do you love best, pic one", a: null },
            ];
            const game = games[Math.floor(Math.random() * games.length)];

            return sock.sendMessage(sender, {
                text: `🎮 GAME TIME!\n\n${game.q}`,
            });
        }

        //----- PROFILE PIC -----
        if (cmd === "pic") {
            const number = args[0];
            if (!number) return sock.sendMessage(sender, { text: "Usage: .profilepic <number>" });

            try {
                const pp = await sock.profilePictureUrl(`${number}@s.whatsapp.net`, "image");
                return sock.sendMessage(sender, { image: { url: pp }, caption: "🖼 Profile Picture" });
            } catch {
                return sock.sendMessage(sender, { text: "❌ Cannot fetch profile picture." });
            }
        }

        //===============================================
        //               🔍 YTS COMMAND
        //===============================================
        if (cmd === "yts") {
            const query = args.join(" ");
            if (!query) return sock.sendMessage(sender, { text: "Usage: .yts <search terms>" });

            try {
                const r = await yts(query);
                const videos = r.videos.slice(0, 5);
                if (!videos.length) return sock.sendMessage(sender, { text: "❌ No results found." });

                let reply = "🔍 *Top YouTube Results:*\n\n";
                videos.forEach((v, i) => {
                    reply += `*${i + 1}. ${v.title}*\n`;
                    reply += `📹 Channel: ${v.author.name}\n`;
                    reply += `🕒 Duration: ${v.timestamp}\n`;
                    reply += `📌 Views: ${v.views}\n`;
                    reply += `🔗 ${v.url}\n\n`;
                });

                await sock.sendMessage(sender, { text: reply });

                const best = videos[0];
                return sock.sendMessage(sender, {
                    image: { url: best.thumbnail },
                    caption:
`🎬 *Best Match*
📌 *${best.title}*
🎤 ${best.author.name}
🕒 ${best.timestamp}
🔗 ${best.url}

Use:
• *.song ${best.url}* – download mp3  
• *.video ${best.url}* – download mp4  
`
                });
            } catch {
                return sock.sendMessage(sender, { text: "❌ Error fetching results." });
            }
        }

        //===============================================
        //               🎵 YTMP3 COMMAND
        //===============================================
        if (cmd === "song") {
            const url = args[0];
            if (!url) return sock.sendMessage(sender, { text: "Usage: .ytmp3 <youtube-url>" });

            try {
                await sock.sendMessage(sender, { text: "⏳ Downloading audio..." });

                const res = await axios.get(`https://widipe.com/download/ytmp3?url=${encodeURIComponent(url)}`);

                if (!res.data.status) return sock.sendMessage(sender, { text: "❌ Convert failed." });

                const dl = res.data.result.download_url;
                const title = res.data.result.title;

                const audio = (await axios.get(dl, { responseType: "arraybuffer" })).data;

                return sock.sendMessage(sender, {
                    document: audio,
                    mimetype: "audio/mpeg",
                    fileName: `${title}.mp3`,
                    caption: `🎵 *Downloaded: ${title}*`
                });
            } catch {
                return sock.sendMessage(sender, { text: "❌ Error downloading audio." });
            }
        }

        //===============================================
        //               🎬 YTMP4 COMMAND
        //===============================================
        if (cmd === "video") {
            const url = args[0];
            if (!url) return sock.sendMessage(sender, { text: "Usage: .ytmp4 <youtube-url>" });

            try {
                await sock.sendMessage(sender, { text: "⏳ Downloading video..." });

                const res = await axios.get(`https://widipe.com/download/ytmp4?url=${encodeURIComponent(url)}`);

                if (!res.data.status) return sock.sendMessage(sender, { text: "❌ Convert failed." });

                const dl = res.data.result.download_url;
                const title = res.data.result.title;

                const video = (await axios.get(dl, { responseType: "arraybuffer" })).data;

                return sock.sendMessage(sender, {
                    document: video,
                    mimetype: "video/mp4",
                    fileName: `${title}.mp4`,
                    caption: `🎬 *Downloaded: ${title}*`
                });
            } catch {
                return sock.sendMessage(sender, { text: "❌ Error downloading video." });
            }
        }

        //===============================================
        // BROADCAST
        //===============================================
        if (cmd === "broadcast") {
            const msgText = args.join(" ");
            if (!msgText) return sock.sendMessage(sender, { text: "Usage: .broadcast <message>" });

            for (let num of pairedNumbers) {
                try {
                    await sock.sendMessage(`${num}@s.whatsapp.net`, { text: `📢 Broadcast:\n${msgText}` });
                } catch {}
            }

            return sock.sendMessage(sender, { text: "📨 Broadcast sent to all paired numbers." });
        }

        // Unknown command
        return sock.sendMessage(sender, { text: `❓ 𝐂𝐨𝐦𝐦𝐚𝐧𝐝 : ${cmd} 𝐢𝐬 𝐧𝐨𝐭 𝐚𝐝𝐝 𝐲𝐨𝐮 𝐜𝐚𝐧 𝐭𝐞𝐱𝐭 𝐜𝐫𝐞𝐚𝐭𝐨𝐫 𝐭𝐨 𝐚𝐝𝐝 𝐜𝐨𝐦𝐦𝐚𝐧𝐝` });
    });
}

//==================== START BOT & SERVER ====================
startBot();
server.listen(3000, () => console.log("💠 DOMGENBOT SERVER ACTIVE ON PORT 3000"));