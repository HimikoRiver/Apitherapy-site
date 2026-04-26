export const offices = [
  {
    city: "г. Грозный",
    address: "ул. Гикало, 6",
    schedule: "рабочие дни ПН, СР, ПТ с 10 до 17",
  },
  {
    city: "г. Сунжа",
    address: "ул. Свердлова, 1/2",
    schedule: "рабочие дни ВТ, ЧТ, СБ с 10 до 17",
  },
];

export const socials = [
  {
    name: "Telegram",
    href: "https://t.me/apitetapiya_grozny",
    icon: "/icons/icons8-телеграм-96.png",
    qr: "/icons/qr-telegram.png",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/79659671999",
    icon: "/icons/icons8-whatsapp-96.png",
    qr: "/icons/qr-whatsapp.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/apiterapiya_grozny",
    icon: "/icons/icons8-instagram-96.png",
    qr: "/icons/qr-instagram.png",
  },
];

// 🔥 ВОТ ЭТОГО У ТЕБЯ НЕ ХВАТАЛО
export const footerSocialBlock = {
  eyebrow: "Онлайн",
  title: "Мессенджеры и соцсети",
  links: socials.map((item) => {
    let icon = "telegram";

    if (item.name.toLowerCase().includes("whatsapp")) {
      icon = "whatsapp";
    } else if (item.name.toLowerCase().includes("instagram")) {
      icon = "instagram";
    }

    return {
      label: item.name,
      href: item.href,
      icon,
      external: true,
    };
  }),
};