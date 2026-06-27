import { telegram, whatsapp, viber } from "../icons";

const phoneDigits = "74955553535";

const socials = [
  {
    name: "Telegram",
    icon: telegram,
    link: "https://t.me/welbex",
  },
  {
    name: "Viber",
    icon: viber,
    link: `viber://chat?number=%2B${phoneDigits}`,
  },
  {
    name: "WhatsApp",
    icon: whatsapp,
    link: `https://wa.me/${phoneDigits}`,
  },
];

export default socials;
