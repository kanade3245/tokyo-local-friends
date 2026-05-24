import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, Utensils, Sparkles, MessageCircle, Star, Users, Moon, HelpCircle } from "lucide-react";

const tourIcons = {
  classic: MapPin,
  culture: Utensils,
  custom: Sparkles,
};

const bookingFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfs8aZ_TK8SV5-fFYvqhGauH-9nNksWepZp5T9Uz-mc3rA5BQ/viewform?usp=header";

const translations = {
  en: {
    badge: "Tokyo local tours & night experiences",
    hero: "Not just sightseeing. Experience Tokyo with local friends — nightlife, anime, food, culture, and unforgettable memories.",
    book: "Book by Instagram DM",
    view: "View Tours",
    feeling: "Tokyo feels better with friends.",
    locations: "Shibuya / Shinjuku / Akihabara",
    review: "“It felt like exploring Tokyo with a real friend.”",
    reviewNote: "First reviews coming soon",
    choose: "Choose your experience",
    title: "Tours made for your Tokyo story.",
    desc: "Start with famous spots, dive into anime and food culture, or create a fully private plan based on what you want to experience.",
    navTours: "Tours",
    navExperience: "Experience",
    navGuide: "Guide",
    navFaq: "FAQ",
    navContact: "Contact",
    metrics: [
      { value: "4", label: "Languages" },
      { value: "3", label: "Tour styles" },
      { value: "15%+5%", label: "SNS discount" },
    ],
    galleryLabel: "Tokyo, your way",
    galleryTitle: "A trip that feels personal, local, and unforgettable.",
    galleryDesc: "Every tour is built around the kind of Tokyo you want to feel — cinematic nights, local food, anime culture, hidden stores, conversation, photos, and real memories.",
    gallery: [
      { title: "Shibuya Night", text: "Neon streets, youth culture, photo spots, and the real energy of Tokyo." },
      { title: "Hidden Food", text: "Local restaurants, ramen, izakaya, konbini culture, and places tourists rarely find." },
      { title: "Anime & Games", text: "Akihabara, arcades, gachapon, anime shops, and Japanese pop culture." },
    ],
    faqLabel: "Before you book",
    faqTitle: "Questions travelers usually ask.",
    faqs: [
      { q: "Do I need to speak Japanese?", a: "No. Japanese, English, Spanish, and Chinese support are available." },
      { q: "Are food and transportation included?", a: "Food and transportation costs are separate, so you can choose freely depending on your budget." },
      { q: "Can I join alone?", a: "Yes. Solo travelers are welcome. The tour is designed to feel like meeting a local friend." },
      { q: "Can the tour be customized?", a: "Yes. Tell us everything you want to do in Japan and we will build the plan around you." },
    ],
    experienceLabel: "What you can experience",
    experienceTitle: "More than sightseeing — this is your Tokyo memory.",
    experienceDesc: "We mix famous spots, local places, food, photos, conversation, and small surprises depending on your vibe.",
    moments: [
      { title: "Neon Night Walk", text: "Shibuya, Shinjuku, hidden alleys, and city lights that feel like a movie." },
      { title: "Anime & Game Culture", text: "Akihabara, arcades, gachapon, anime shops, and places fans actually enjoy." },
      { title: "Local Food Stops", text: "Ramen, izakaya, konbini snacks, karaoke, and restaurants locals recommend." },
      { title: "Free Memory Video Gift", text: "We edit your trip moments into a commemorative video and give it to you for free. Available only for guests who follow us and post on social media." },
    ],
    howLabel: "How it works",
    howTitle: "Booking is simple.",
    steps: [
      { title: "Send a DM", text: "Tell us your date, number of people, language, and what you like." },
      { title: "Choose your tour", text: "Pick Classic, Culture, or a fully private custom plan." },
      { title: "Meet in Tokyo", text: "We meet at an easy station and start the experience together." },
      { title: "Enjoy like friends", text: "Relax, ask questions, take photos, eat, walk, laugh, and explore." },
    ],
    why: "Why TOKYO FRIENDS!!!",
    whyTitle: "More like hanging out. Less like following a flag.",
    whyDesc: "We guide you through Tokyo like local friends — fun, flexible, relaxed, and full of moments you actually want to remember.",
    localSpotPromise: "We will take you to truly local hidden gems guided by someone who has lived in Tokyo for most of their life. You will not regret it.",
    profileLabel: "Meet your local friend",
    profileTitle: "Hi, I'm Kanade.",
    profileRole: "Your Tokyo local guide",
    profileBio: "Hi, I’m Kanade — a true city boy from Shibuya, Tokyo. I’m 19 years old and I’ve lived in Japan my whole life. My father is half British and half German, and my mother is Japanese, so I grew up with both local Japanese culture and an international mindset.",
    profileBio2: "I’m interested in almost everything, so I can talk about almost any topic. I’ll take you not only to famous places, but also to hidden local restaurants and spots that most tourists would never find — the kind of places Japanese locals really know and love. Tell me everything you want to do in Japan. I’ll do my best to make your trip unforgettable.",
    profileTags: ["Shibuya Born", "Tokyo City Boy", "19 Years in Japan", "Local Hidden Gems", "Food", "Culture Talk"],
    ready: "Ready to make Tokyo your story?",
    readyDesc: "Send us a DM or fill out the booking form with your dates, number of people, and what kind of Tokyo you want to experience.",
    bookingForm: "Booking Form",
    bookingHint: "Book here ↓",
    instagram: "Instagram: @tokyolocalfriends",
    email: "Email: tokyolocalfriends@gmail.com",
    footer: "TOKYO FRIENDS!!! — Tokyo local tour experience. Food and transportation costs are not included.",
    discount: "Post on social media with #TokyoLocalFriends and get 15% off. Follow us for an extra 5% off.",
    highlights: [
      "Local friend vibe, not a boring tour",
      "Japanese, English, Spanish, and Chinese available",
      "Photos, videos, and memories included",
      "Food and transportation costs are separate",
      "We will also teach you lots of useful Japanese phrases for travel!",
    ],
    tours: [
      {
        id: "classic",
        title: "Tokyo Classic Tour",
        subtitle: "For first-time visitors",
        price: "From ¥4,500 / person",
        points: ["Shibuya Crossing", "Shinjuku", "Harajuku", "Asakusa", "Tokyo Tower photo spots"],
      },
      {
        id: "culture",
        title: "Anime, Food & Culture",
        subtitle: "For Japan lovers",
        price: "From ¥7,000 / person",
        points: ["Akihabara", "Game centers", "Karaoke experience", "Local recommended restaurants", "Ramen or izakaya", "Convenience store culture"],
      },
      {
        id: "custom",
        title: "Private Custom Tour",
        subtitle: "Your Tokyo, your way",
        price: "Consultation required",
        points: [],
        customMessage: "Tell us EVERYTHING you want to do in Japan.",
        customEmphasis: "EVERYTHING YOU WANT TO DO IN JAPAN",
      },
    ],
  },
  ja: {
    badge: "東京ローカルツアー & ナイト体験",
    hero: "ただの観光じゃない。東京のローカルな友達と、夜・アニメ・食・カルチャーを楽しもう。",
    book: "Instagram DMで予約",
    view: "ツアーを見る",
    feeling: "東京は友達といる方が楽しい。",
    locations: "渋谷 / 新宿 / 秋葉原",
    review: "“本物の東京の友達と街を歩いているみたいでした。”",
    reviewNote: "レビューは近日追加予定",
    choose: "ツアーを選ぶ",
    title: "あなただけの東京体験を。",
    desc: "定番スポットからアニメ・食文化、完全オーダーメイドまで対応。",
    navTours: "ツアー",
    navExperience: "体験",
    navGuide: "ガイド",
    navFaq: "FAQ",
    navContact: "問い合わせ先",
    metrics: [
      { value: "4", label: "対応言語" },
      { value: "3", label: "ツアー形式" },
      { value: "15%+5%", label: "SNS割引" },
    ],
    galleryLabel: "あなたらしい東京へ",
    galleryTitle: "ただ見るだけじゃなく、ちゃんと思い出になる東京体験。",
    galleryDesc: "夜の東京、ローカル飯、アニメ文化、穴場のお店、会話、写真、動画まで、その人が本当に楽しめる東京を一緒に作ります。",
    gallery: [
      { title: "渋谷ナイト", text: "ネオン、若者文化、写真スポット、東京のリアルな熱量を体験。" },
      { title: "隠れた名店", text: "ラーメン、居酒屋、コンビニ文化、観光客が見つけにくいローカル飯へ。" },
      { title: "アニメ・ゲーム", text: "秋葉原、ゲーセン、ガチャ、アニメショップ、日本のポップカルチャーを満喫。" },
    ],
    faqLabel: "予約前の安心ポイント",
    faqTitle: "よくある質問。",
    faqs: [
      { q: "日本語が話せなくても大丈夫？", a: "大丈夫です。日本語・英語・スペイン語・中国語に対応可能です。" },
      { q: "飲食代や交通費は含まれる？", a: "飲食代・交通費は別です。予算に合わせて自由に選べます。" },
      { q: "1人でも参加できる？", a: "もちろんです。1人旅でも、東京に友達ができたような感覚で楽しめます。" },
      { q: "ツアーはカスタムできる？", a: "できます。日本でやりたいことを全部教えてください。内容に合わせて一緒に作ります。" },
    ],
    experienceLabel: "体験できること",
    experienceTitle: "ただの観光じゃなく、東京の思い出を作る時間。",
    experienceDesc: "有名スポット、ローカルなお店、食事、写真、会話、その人に合わせた小さなサプライズまで組み合わせます。",
    moments: [
      { title: "ネオンの夜散歩", text: "渋谷・新宿・裏路地・映画みたいな東京の夜を体験。" },
      { title: "アニメ・ゲーム文化", text: "秋葉原、ゲーセン、ガチャガチャ、アニメショップなどを楽しく案内。" },
      { title: "ローカルフード巡り", text: "ラーメン、居酒屋、コンビニ飯、カラオケ、現地の人おすすめのお店へ。" },
      { title: "記念動画を無料プレゼント", text: "旅の思い出を動画に編集して、記念動画として無料でプレゼントします。フォローしてくれる方・SNSに投稿してくれる方限定です。" },
    ],
    howLabel: "予約の流れ",
    howTitle: "予約はシンプル。",
    steps: [
      { title: "DMを送る", text: "日程・人数・希望言語・やりたいことを送ってください。" },
      { title: "ツアーを選ぶ", text: "王道、カルチャー、完全カスタムから選べます。" },
      { title: "東京で集合", text: "分かりやすい駅で集合して、一緒にスタート。" },
      { title: "友達みたいに楽しむ", text: "写真を撮って、食べて、歩いて、話して、東京を楽しむだけ。" },
    ],
    why: "TOKYO FRIENDS!!!について",
    whyTitle: "旗についていく観光より、友達と遊ぶ感覚。",
    whyDesc: "東京を、ローカルの友達みたいに案内します。自由で、楽しくて、思い出に残る時間を。",
    localSpotPromise: "東京に人生のほとんど住んでいた人が教える厳選スポットに連れて行きます！絶対後悔はさせません。",
    profileLabel: "ローカルガイド紹介",
    profileTitle: "はじめまして、奏です。",
    profileRole: "あなたの東京ローカルガイド",
    profileBio: "こんにちは！奏です。東京都・渋谷区出身の、正真正銘のシティボーイです。年齢は19歳で、19年間ずっと日本に住んでいます。父がイギリスとドイツのハーフで、母が日本人なので、日本のローカルな感覚と海外の感覚、どちらも大切にしています。",
    profileBio2: "趣味は本当になんでも趣味と言えるくらい幅広いので、どんな話題でも楽しく話せます。有名な観光地だけじゃなく、観光客が絶対知らないような、日本人の知る人ぞ知る名店やローカルスポットにもたくさん案内します。日本でやりたいことを全部教えてください。忘れられない旅になるように全力で案内します。",
    profileTags: ["渋谷区出身", "シティボーイ", "19年間日本在住", "知る人ぞ知る名店", "幅広い趣味", "ローカル案内"],
    ready: "東京を、自分だけの思い出にしよう。",
    readyDesc: "日程・人数・やりたいことをDM、または予約フォームで送ってください！",
    bookingForm: "予約フォーム",
    bookingHint: "ここから予約 ↓",
    instagram: "Instagram: @tokyolocalfriends",
    email: "メール: tokyolocalfriends@gmail.com",
    footer: "TOKYO FRIENDS!!! — 東京ローカルツアー。飲食代・交通費は含まれていません。",
    discount: "SNSに #TokyoLocalFriends をつけて投稿すると15%OFF。さらにフォローで追加5%OFF。",
    highlights: [
      "退屈じゃないローカル感",
      "日本語・英語・スペイン語・中国語対応可能",
      "写真・動画サポート付き",
      "飲食代・交通費は別",
      "もちろん旅行に使える日本語もたくさん教えます！",
    ],
    tours: [
      {
        id: "classic",
        title: "東京王道ツアー",
        subtitle: "初めて東京に来る方向け",
        price: "1人 ¥4,500〜",
        points: ["渋谷スクランブル交差点", "新宿", "原宿", "浅草", "東京タワー写真スポット"],
      },
      {
        id: "culture",
        title: "アニメ・食・日本文化ツアー",
        subtitle: "日本カルチャー好き向け",
        price: "1人 ¥7,000〜",
        points: ["秋葉原", "ゲームセンター", "カラオケ体験", "現地の人おすすめのお店", "ラーメン or 居酒屋", "コンビニ文化体験"],
      },
      {
        id: "custom",
        title: "完全カスタムツアー",
        subtitle: "あなたの理想の東京へ",
        price: "要相談",
        points: [],
        customMessage: "日本でやりたいことを全部教えてください。",
        customEmphasis: "日本でやりたいこと",
      },
    ],
  },
  es: {
    badge: "Tours locales y experiencias nocturnas en Tokio",
    hero: "No es solo turismo. Vive Tokio con amigos locales — vida nocturna, anime, comida y cultura.",
    book: "Reservar por Instagram DM",
    view: "Ver tours",
    feeling: "Tokio se disfruta mejor con amigos.",
    locations: "Shibuya / Shinjuku / Akihabara",
    review: "“Se sintió como explorar Tokio con un amigo de verdad.”",
    reviewNote: "Primeras reseñas próximamente",
    choose: "Elige tu experiencia",
    title: "Tours hechos para tu historia en Tokio.",
    desc: "Desde lugares famosos hasta anime, comida y tours privados personalizados.",
    navTours: "Tours",
    navExperience: "Experiencia",
    navGuide: "Guía",
    navFaq: "FAQ",
    navContact: "Contacto",
    metrics: [
      { value: "4", label: "Idiomas" },
      { value: "3", label: "Tipos de tour" },
      { value: "15%+5%", label: "Descuento SNS" },
    ],
    galleryLabel: "Tokio a tu manera",
    galleryTitle: "Un viaje personal, local e inolvidable.",
    galleryDesc: "Cada tour se adapta al Tokio que quieres vivir: noches de neón, comida local, anime, lugares escondidos, conversación, fotos y recuerdos reales.",
    gallery: [
      { title: "Noche en Shibuya", text: "Calles de neón, cultura joven, spots para fotos y la energía real de Tokio." },
      { title: "Comida escondida", text: "Restaurantes locales, ramen, izakaya, konbini y lugares que pocos turistas encuentran." },
      { title: "Anime y juegos", text: "Akihabara, arcades, gachapon, tiendas de anime y cultura pop japonesa." },
    ],
    faqLabel: "Antes de reservar",
    faqTitle: "Preguntas frecuentes.",
    faqs: [
      { q: "¿Necesito hablar japonés?", a: "No. Podemos ayudarte en japonés, inglés, español y chino." },
      { q: "¿La comida y el transporte están incluidos?", a: "No están incluidos, para que puedas elegir libremente según tu presupuesto." },
      { q: "¿Puedo unirme solo?", a: "Sí. Los viajeros solos son bienvenidos. La idea es sentir que conoces a un amigo local." },
      { q: "¿Se puede personalizar el tour?", a: "Sí. Cuéntanos todo lo que quieres hacer en Japón y creamos el plan contigo." },
    ],
    experienceLabel: "Qué puedes vivir",
    experienceTitle: "Más que turismo: un recuerdo real de Tokio.",
    experienceDesc: "Combinamos lugares famosos, sitios locales, comida, fotos, conversación y pequeños detalles según tu estilo.",
    moments: [
      { title: "Paseo nocturno de neón", text: "Shibuya, Shinjuku, callejones ocultos y luces de ciudad como en una película." },
      { title: "Anime y videojuegos", text: "Akihabara, arcades, gachapon, tiendas de anime y lugares que los fans disfrutan." },
      { title: "Comida local", text: "Ramen, izakaya, konbini, karaoke y restaurantes recomendados por locales." },
      { title: "Video de recuerdo gratis", text: "Editamos los momentos de tu viaje en un video conmemorativo y te lo regalamos gratis. Solo para quienes nos siguen y publican en redes sociales." },
    ],
    howLabel: "Cómo funciona",
    howTitle: "Reservar es sencillo.",
    steps: [
      { title: "Envía un DM", text: "Cuéntanos fecha, personas, idioma y lo que te gusta." },
      { title: "Elige tu tour", text: "Clásico, cultura o un plan privado personalizado." },
      { title: "Nos vemos en Tokio", text: "Quedamos en una estación fácil y empezamos juntos." },
      { title: "Disfruta como amigos", text: "Relájate, pregunta, toma fotos, come, camina y explora." },
    ],
    why: "¿Por qué TOKYO FRIENDS!!!?",
    whyTitle: "Más como salir con amigos. Menos como seguir una bandera.",
    whyDesc: "Te mostramos Tokio como amigos locales — divertido, flexible y lleno de recuerdos.",
    localSpotPromise: "Te llevaremos a joyas locales cuidadosamente elegidas por alguien que ha vivido en Tokio casi toda su vida. No te arrepentirás.",
    profileLabel: "Conoce a tu amigo local",
    profileTitle: "Hola, soy Kanade.",
    profileRole: "Tu guía local en Tokio",
    profileBio: "Hola, soy Kanade — un verdadero chico de ciudad nacido en Shibuya, Tokio. Tengo 19 años y he vivido en Japón toda mi vida. Mi padre es mitad británico y mitad alemán, y mi madre es japonesa, así que crecí con una mirada local japonesa y también internacional.",
    profileBio2: "Me interesan muchísimas cosas, así que puedo hablar de casi cualquier tema. No solo te llevaré a lugares famosos, sino también a restaurantes y rincones locales que la mayoría de turistas nunca encontrarían — lugares que los japoneses realmente conocen y aman. Cuéntame todo lo que quieres hacer en Japón. Haré todo lo posible para que tu viaje sea inolvidable.",
    profileTags: ["Nacido en Shibuya", "Chico de ciudad", "19 años en Japón", "Joyas locales", "Comida", "Cultura"],
    ready: "¿Listo para vivir tu propia historia en Tokio?",
    readyDesc: "Envíanos un DM o completa el formulario con tus fechas, número de personas y lo que quieres experimentar.",
    bookingForm: "Formulario de reserva",
    bookingHint: "Reserva aquí ↓",
    instagram: "Instagram: @tokyolocalfriends",
    email: "Correo: tokyolocalfriends@gmail.com",
    footer: "TOKYO FRIENDS!!! — Experiencia local en Tokio. La comida y el transporte no están incluidos.",
    discount: "Publica en redes sociales con #TokyoLocalFriends y recibe 15% de descuento. Síguenos y recibe 5% extra.",
    highlights: [
      "Ambiente amigable y local",
      "Disponible en japonés, inglés, español y chino",
      "Fotos, videos y recuerdos incluidos",
      "Comida y transporte separados",
      "También te enseñaremos muchas frases útiles en japonés para viajar.",
    ],
    tours: [
      {
        id: "classic",
        title: "Tour Clásico de Tokio",
        subtitle: "Para quienes visitan Tokio por primera vez",
        price: "Desde ¥4,500 / persona",
        points: ["Cruce de Shibuya", "Shinjuku", "Harajuku", "Asakusa", "Fotos cerca de Tokyo Tower"],
      },
      {
        id: "culture",
        title: "Anime, Comida y Cultura",
        subtitle: "Para amantes de Japón",
        price: "Desde ¥7,000 / persona",
        points: ["Akihabara", "Arcades", "Experiencia de karaoke", "Restaurantes recomendados por locales", "Ramen o izakaya", "Cultura de konbini"],
      },
      {
        id: "custom",
        title: "Tour Privado Personalizado",
        subtitle: "Tu Tokio, a tu manera",
        price: "Consultar precio",
        points: [],
        customMessage: "Cuéntanos TODO lo que quieres hacer en Japón.",
        customEmphasis: "TODO LO QUE QUIERES HACER EN JAPÓN",
      },
    ],
  },
  zh: {
    badge: "东京本地夜生活体验",
    hero: "不仅仅是观光。和东京本地朋友一起体验夜生活、动漫、美食与文化。",
    book: "通过Instagram预约",
    view: "查看行程",
    feeling: "有朋友的东京更有趣。",
    locations: "涩谷 / 新宿 / 秋叶原",
    review: "“感觉就像和真正的东京朋友一起探索这座城市。”",
    reviewNote: "首批评价即将上线",
    choose: "选择你的体验",
    title: "属于你的东京故事。",
    desc: "从经典景点到动漫、美食、私人定制行程全部支持。",
    navTours: "行程",
    navExperience: "体验",
    navGuide: "向导",
    navFaq: "FAQ",
    navContact: "联系方式",
    metrics: [
      { value: "4", label: "支持语言" },
      { value: "3", label: "路线类型" },
      { value: "15%+5%", label: "社媒优惠" },
    ],
    galleryLabel: "你的东京方式",
    galleryTitle: "更私人、更本地、更难忘的东京体验。",
    galleryDesc: "每次行程都会根据你想体验的东京来设计：霓虹夜景、本地美食、动漫文化、隐藏店铺、聊天、拍照和真正的回忆。",
    gallery: [
      { title: "涩谷夜晚", text: "霓虹街道、年轻文化、拍照地点和东京真实的活力。" },
      { title: "隐藏美食", text: "本地餐厅、拉面、居酒屋、便利店文化和游客很难找到的地方。" },
      { title: "动漫与游戏", text: "秋叶原、游戏厅、扭蛋、动漫店和日本流行文化。" },
    ],
    faqLabel: "预约前须知",
    faqTitle: "常见问题。",
    faqs: [
      { q: "不会日语也可以吗？", a: "可以。支持日语、英语、西班牙语和中文。" },
      { q: "餐饮和交通包含吗？", a: "不包含。这样可以根据你的预算自由选择。" },
      { q: "一个人也可以参加吗？", a: "可以。非常欢迎独自旅行的客人，体验会像认识东京本地朋友一样。" },
      { q: "可以定制行程吗？", a: "可以。告诉我们你想在日本做的一切，我们会一起设计路线。" },
    ],
    experienceLabel: "你可以体验什么",
    experienceTitle: "不只是观光，而是属于你的东京回忆。",
    experienceDesc: "我们会结合经典景点、本地店铺、美食、拍照、聊天和适合你的特别体验。",
    moments: [
      { title: "霓虹夜晚散步", text: "涩谷、新宿、隐藏小巷和像电影一样的东京夜景。" },
      { title: "动漫与游戏文化", text: "秋叶原、游戏厅、扭蛋、动漫店和粉丝真正喜欢的地方。" },
      { title: "本地美食体验", text: "拉面、居酒屋、便利店小吃、卡拉OK和本地人推荐餐厅。" },
      { title: "免费纪念视频", text: "我们会把你的旅行回忆剪辑成纪念视频并免费赠送。仅限关注我们并在社交媒体发布的客人。" },
    ],
    howLabel: "预约流程",
    howTitle: "预约很简单。",
    steps: [
      { title: "发送DM", text: "告诉我们日期、人数、语言和你喜欢的内容。" },
      { title: "选择路线", text: "经典路线、文化路线或私人定制路线。" },
      { title: "在东京集合", text: "在容易找到的车站集合，一起开始体验。" },
      { title: "像朋友一样玩", text: "放松、提问、拍照、吃东西、散步和探索。" },
    ],
    why: "为什么选择TOKYO FRIENDS!!!",
    whyTitle: "不像跟团，更像和朋友一起玩。",
    whyDesc: "像本地朋友一样带你体验东京，自由、有趣、充满回忆。",
    localSpotPromise: "我们会带你去由几乎一直生活在东京的人精选的本地隐藏景点。绝对不会让你后悔。",
    profileLabel: "认识你的东京本地朋友",
    profileTitle: "你好，我是奏。",
    profileRole: "你的东京本地向导",
    profileBio: "你好，我是奏。真正出生在东京涩谷的城市男孩。我今年19岁，19年来一直生活在日本。我的父亲是英国和德国混血，母亲是日本人，所以我从小既了解日本本地文化，也拥有更国际化的视角。",
    profileBio2: "我的兴趣非常广泛，几乎任何话题都可以聊。不只会带你去著名景点，也会带你去很多游客绝对不知道、只有日本本地人才熟悉的名店和隐藏地点。把你想在日本做的事情都告诉我。我会尽全力让你的旅行变得难忘。",
    profileTags: ["涩谷出生", "东京城市男孩", "在日本生活19年", "本地隐藏名店", "兴趣广泛", "本地向导"],
    ready: "准备好开启你的东京故事了吗？",
    readyDesc: "发送DM或填写预约表单，告诉我们日期、人数和想体验的内容。",
    bookingForm: "预约表单",
    bookingHint: "点击这里预约 ↓",
    instagram: "Instagram: @tokyolocalfriends",
    email: "邮箱: tokyolocalfriends@gmail.com",
    footer: "TOKYO FRIENDS!!! — 东京本地体验。餐饮与交通费用不包含在内。",
    discount: "在社交媒体发布并添加 #TokyoLocalFriends，可享受15%优惠。关注我们可再享受5%优惠。",
    highlights: [
      "真正本地朋友的感觉",
      "支持日语、英语、西班牙语和中文",
      "包含拍照和视频记录",
      "餐饮和交通费用另算",
      "当然也会教你很多旅行中能用的日语！",
    ],
    tours: [
      {
        id: "classic",
        title: "东京经典路线",
        subtitle: "适合第一次来东京的客人",
        price: "每人 ¥4,500起",
        points: ["涩谷十字路口", "新宿", "原宿", "浅草", "东京塔拍照点"],
      },
      {
        id: "culture",
        title: "动漫、美食与日本文化",
        subtitle: "适合喜欢日本文化的人",
        price: "每人 ¥7,000起",
        points: ["秋叶原", "游戏厅", "卡拉OK体验", "本地人推荐餐厅", "拉面或居酒屋", "便利店文化体验"],
      },
      {
        id: "custom",
        title: "私人定制路线",
        subtitle: "按照你的想法体验东京",
        price: "价格需咨询",
        points: [],
        customMessage: "请告诉我们你想在日本做的一切。",
        customEmphasis: "你想在日本做的一切",
      },
    ],
  },
};

function runContentTests() {
  const languages = ["en", "ja", "es", "zh"];
  const requiredKeys = [
    "badge",
    "hero",
    "book",
    "view",
    "feeling",
    "locations",
    "review",
    "reviewNote",
    "choose",
    "title",
    "desc",
    "navTours",
    "navExperience",
    "navGuide",
    "navFaq",
    "navContact",
    "galleryLabel",
    "galleryTitle",
    "galleryDesc",
    "faqLabel",
    "faqTitle",
    "experienceLabel",
    "experienceTitle",
    "experienceDesc",
    "howLabel",
    "howTitle",
    "why",
    "whyTitle",
    "whyDesc",
    "localSpotPromise",
    "profileLabel",
    "profileTitle",
    "profileRole",
    "profileBio",
    "profileBio2",
    "ready",
    "readyDesc",
    "bookingForm",
    "bookingHint",
    "instagram",
    "email",
    "footer",
    "discount",
  ];

  languages.forEach((language) => {
    const t = translations[language];

    console.assert(Boolean(t), `${language}: translation exists`);
    requiredKeys.forEach((key) => {
      console.assert(typeof t[key] === "string" && t[key].length > 0, `${language}: ${key} exists`);
    });
    console.assert(t.tours.length === 3, `${language}: has exactly 3 tours`);
    console.assert(t.highlights.length === 5, `${language}: has exactly 5 highlights`);
    console.assert(t.metrics.length === 3, `${language}: has exactly 3 metrics`);
    console.assert(t.gallery.length === 3, `${language}: has exactly 3 gallery cards`);
    console.assert(t.faqs.length === 4, `${language}: has exactly 4 FAQs`);
    console.assert(t.moments.length === 4, `${language}: has exactly 4 experience moments`);
    console.assert(t.moments[3].text.includes("free") || t.moments[3].text.includes("無料") || t.moments[3].text.includes("gratis") || t.moments[3].text.includes("免费"), `${language}: fourth moment includes free video gift`);
    console.assert(t.moments[3].text.includes("social") || t.moments[3].text.includes("SNS") || t.moments[3].text.includes("redes") || t.moments[3].text.includes("社交媒体"), `${language}: fourth moment includes social media condition`);
    console.assert(t.steps.length === 4, `${language}: has exactly 4 booking steps`);
    console.assert(t.tours.every((tour) => Array.isArray(tour.points)), `${language}: every tour has a points array`);
    console.assert(t.tours.filter((tour) => tour.id !== "custom").every((tour) => tour.points.length > 0), `${language}: non-custom tours have points`);
    console.assert(t.tours.some((tour) => tour.id === "custom" && tour.points.length === 0), `${language}: custom tour has no bullet points`);
    console.assert(t.tours.some((tour) => tour.id === "custom" && Boolean(tour.customEmphasis)), `${language}: custom tour has big emphasis text`);
    console.assert(t.tours.some((tour) => tour.id === "custom" && Boolean(tour.customMessage)), `${language}: custom tour has a custom message`);
    console.assert(t.highlights.some((item) => item.includes("Japanese") || item.includes("日本語") || item.includes("japonés") || item.includes("日语")), `${language}: highlights include useful Japanese phrase support`);
    console.assert(t.highlights.some((item) => item.includes("English") || item.includes("英語") || item.includes("inglés") || item.includes("英语")), `${language}: highlights include multilingual support`);
    console.assert(t.localSpotPromise.includes("Tokyo") || t.localSpotPromise.includes("東京") || t.localSpotPromise.includes("Tokio") || t.localSpotPromise.includes("东京"), `${language}: local spot promise mentions Tokyo`);
    console.assert(Array.isArray(t.profileTags) && t.profileTags.length >= 4, `${language}: profile tags exist`);
    console.assert(t.profileBio.includes("Tokyo") || t.profileBio.includes("東京") || t.profileBio.includes("Tokio") || t.profileBio.includes("东京"), `${language}: profile bio mentions Tokyo`);
    console.assert(t.tours.some((tour) => tour.id === "classic" && tour.points.some((point) => point.includes("新宿") || point.includes("Shinjuku"))), `${language}: classic tour includes Shinjuku`);
    console.assert(t.discount.includes("#TokyoLocalFriends"), `${language}: discount hashtag exists`);
    console.assert(t.discount.includes("15"), `${language}: discount amount exists`);
    console.assert(t.discount.includes("5"), `${language}: follow discount amount exists`);
    console.assert(!JSON.stringify(t).includes("{t."), `${language}: no unresolved template placeholders`);
  });
}

if (typeof console !== "undefined") {
  runContentTests();
}

export default function TokyoFriendsWebsite() {
  const [language, setLanguage] = useState("en");
  const t = useMemo(() => translations[language] ?? translations.en, [language]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const headerOffset = 96;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;

    window.scrollTo({
      top: sectionTop - headerOffset,
      behavior: "smooth",
    });
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      <div className="fixed top-5 left-5 z-50 hidden md:flex items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 backdrop-blur-xl">
        <button type="button" onClick={() => scrollToSection("top")} className="font-black tracking-tight text-white">TOKYO FRIENDS!!!</button>
        <button type="button" onClick={() => scrollToSection("tours")} className="text-sm text-zinc-300 hover:text-white transition">{t.navTours}</button>
        <button type="button" onClick={() => scrollToSection("experience")} className="text-sm text-zinc-300 hover:text-white transition">{t.navExperience}</button>
        <button type="button" onClick={() => scrollToSection("guide")} className="text-sm text-zinc-300 hover:text-white transition">{t.navGuide}</button>
        <button type="button" onClick={() => scrollToSection("faq")} className="text-sm text-zinc-300 hover:text-white transition">{t.navFaq}</button>
        <button type="button" onClick={() => scrollToSection("contact")} className="text-sm text-zinc-300 hover:text-white transition">{t.navContact}</button>
      </div>

      <div className="fixed top-5 right-5 z-50 flex flex-wrap justify-end gap-2 max-w-[calc(100%-2.5rem)]">
        {[
          { code: "en", label: "EN" },
          { code: "ja", label: "JP" },
          { code: "es", label: "ES" },
          { code: "zh", label: "中文" },
        ].map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur border transition ${
              language === lang.code
                ? "bg-white text-zinc-950 border-white"
                : "bg-white/10 text-white border-white/20 hover:bg-white/20"
            }`}
            aria-pressed={language === lang.code}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <section id="top" className="relative min-h-screen flex items-center px-5 py-16 scroll-mt-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(236,72,153,0.35),_transparent_35%),radial-gradient(circle_at_bottom_right,_rgba(59,130,246,0.35),_transparent_35%)]" />
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:48px_48px]" />

        <div className="relative z-10 max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-zinc-200 backdrop-blur">
              <Moon className="w-4 h-4" /> {t.badge}
            </div>

            <h1 className="mt-6 text-6xl md:text-8xl font-black tracking-tight leading-none">
              TOKYO
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300">
                FRIENDS!!!
              </span>
            </h1>

            <p className="mt-6 text-xl md:text-2xl text-zinc-200 leading-relaxed max-w-xl">{t.hero}</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a
                href="https://www.instagram.com/tokyolocalfriends/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition"
              >
                <MessageCircle className="w-5 h-5 mr-2" /> {t.book}
              </a>
              <button
                type="button"
                onClick={() => scrollToSection("tours")}
                className="inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base font-semibold border border-white/25 bg-white/5 text-white hover:bg-white/10 transition"
              >
                {t.view}
              </button>
            </div>

            <div className="mt-8 grid grid-cols-3 gap-3 max-w-xl">
              {t.metrics.map((metric) => (
                <div key={metric.label} className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur">
                  <p className="text-2xl font-black text-white">{metric.value}</p>
                  <p className="mt-1 text-xs text-zinc-400">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-zinc-300">
              <div className="flex -space-x-2" aria-hidden="true">
                <div className="w-9 h-9 rounded-full bg-pink-400 border-2 border-zinc-950" />
                <div className="w-9 h-9 rounded-full bg-purple-400 border-2 border-zinc-950" />
                <div className="w-9 h-9 rounded-full bg-cyan-300 border-2 border-zinc-950" />
              </div>
              <span>{t.feeling}</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.1 }} className="relative">
            <div className="rounded-[2rem] border border-white/15 bg-white/10 backdrop-blur-xl p-4 shadow-2xl">
              <div className="aspect-[4/5] rounded-[1.5rem] bg-gradient-to-br from-zinc-800 via-purple-950 to-zinc-950 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_20%,rgba(255,255,255,0.22),transparent_18%),radial-gradient(circle_at_60%_70%,rgba(236,72,153,0.35),transparent_25%)]" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <div className="rounded-3xl bg-black/50 border border-white/10 p-5 backdrop-blur-md">
                    <div className="flex items-center gap-2 text-yellow-300" aria-label="Five star review">
                      {[0, 1, 2, 3, 4].map((star) => (
                        <Star key={star} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="mt-3 text-lg font-semibold">{t.review}</p>
                    <p className="mt-2 text-sm text-zinc-300">{t.reviewNote}</p>
                  </div>
                </div>
                <div className="absolute top-7 left-7 rounded-full bg-white text-zinc-950 px-4 py-2 text-sm font-bold">
                  {t.locations}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="tours" className="px-5 py-20 bg-zinc-950 scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="text-pink-300 font-semibold">{t.choose}</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-black">{t.title}</h2>
            </div>
            <p className="text-zinc-300 max-w-lg">{t.desc}</p>
          </div>

          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {t.tours.map((tour) => {
              const Icon = tourIcons[tour.id] ?? MapPin;

              return (
                <div key={tour.id} className="rounded-3xl border border-white/10 bg-white/[0.06] text-white shadow-xl">
                  <div className="p-6">
                    <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="mt-5 text-2xl font-bold">{tour.title}</h3>
                    <p className="mt-1 text-zinc-400">{tour.subtitle}</p>
                    <p className="mt-4 text-pink-300 font-semibold">{tour.price}</p>

                    {tour.points.length > 0 ? (
                      <ul className="mt-5 space-y-3 text-zinc-300">
                        {tour.points.map((point) => (
                          <li key={point} className="flex gap-2">
                            <span className="text-cyan-300">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {tour.customEmphasis ? (
                      <div className="mt-6 rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-cyan-400/25 p-5 text-center">
                        <p className="text-3xl md:text-4xl font-black leading-tight text-white">
                          {tour.customEmphasis}
                        </p>
                      </div>
                    ) : null}

                    {tour.customMessage ? (
                      <div className="mt-6 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 to-cyan-400/20 p-4">
                        <p className="text-lg md:text-xl font-black leading-snug text-white">{tour.customMessage}</p>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="px-5 py-20 bg-zinc-900 text-white scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl">
            <p className="text-cyan-300 font-semibold">{t.experienceLabel}</p>
            <h2 className="mt-3 text-4xl md:text-6xl font-black">{t.experienceTitle}</h2>
            <p className="mt-5 text-zinc-300 text-lg leading-relaxed">{t.experienceDesc}</p>
          </div>

          <div className="mt-10 grid md:grid-cols-4 gap-4">
            {t.moments.map((moment, index) => (
              <div key={moment.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-xl">
                <div className="text-4xl font-black text-white/20">0{index + 1}</div>
                <h3 className="mt-4 text-xl font-bold">{moment.title}</h3>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">{moment.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mb-10">
            <p className="text-pink-300 font-semibold">{t.galleryLabel}</p>
            <h2 className="mt-3 text-4xl md:text-6xl font-black">{t.galleryTitle}</h2>
            <p className="mt-5 text-zinc-300 text-lg leading-relaxed">{t.galleryDesc}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {t.gallery.map((item, index) => (
              <div key={item.title} className="group relative min-h-[260px] rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.28),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.22),transparent_30%)] transition group-hover:scale-110" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="text-6xl font-black text-white/10">0{index + 1}</div>
                  <div>
                    <h3 className="text-2xl font-black">{item.title}</h3>
                    <p className="mt-3 text-zinc-300 leading-relaxed">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div>
            <p className="text-pink-300 font-semibold">{t.howLabel}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">{t.howTitle}</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {t.steps.map((step, index) => (
              <div key={step.title} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <div className="w-10 h-10 rounded-2xl bg-white text-zinc-950 flex items-center justify-center font-black">{index + 1}</div>
                <h3 className="mt-5 text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-zinc-300 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="guide" className="px-5 py-20 bg-zinc-900 text-white scroll-mt-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.9fr_1.1fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-cyan-400/30 blur-2xl" />
            <a
              href="https://www.instagram.com/kana__deeeee/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Kanade's Instagram"
              className="group relative block rounded-[2rem] overflow-hidden border border-white/10 bg-white p-3 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-cyan-400/20"
            >
              <img
                src="data:image/webp;base64,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"
                alt="Kanade illustrated profile"
                className="w-full max-w-md mx-auto aspect-[4/5] object-contain object-center bg-white"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent p-6">
                <p className="text-sm text-cyan-200 font-semibold">TOKYO FRIENDS!!!</p>
                <p className="mt-1 text-2xl font-black text-white">Kanade</p>
                <p className="mt-1 text-zinc-200">Local Tokyo Friend</p>
                <p className="mt-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white transition group-hover:bg-white group-hover:text-zinc-950">
                  Instagram →
                </p>
              </div>
            </a>
          </motion.div>

          <div>
            <p className="text-cyan-300 font-semibold">{t.profileLabel}</p>
            <h2 className="mt-3 text-4xl md:text-6xl font-black">{t.profileTitle}</h2>
            <p className="mt-3 text-xl text-zinc-300 font-semibold">{t.profileRole}</p>
            <p className="mt-6 text-zinc-300 text-lg leading-relaxed">{t.profileBio}</p>
            <p className="mt-5 text-zinc-300 text-lg leading-relaxed">{t.profileBio2}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {t.profileTags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-100"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-5 py-20 bg-white text-zinc-950">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-purple-600 font-semibold">{t.why}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">{t.whyTitle}</h2>
            <p className="mt-5 text-lg text-zinc-700 leading-relaxed">{t.whyDesc}</p>
            <p className="mt-5 text-lg md:text-xl font-black leading-relaxed text-zinc-950">{t.localSpotPromise}</p>
          </div>

          <div className="grid gap-4">
            {t.highlights.map((item) => (
              <div key={item} className="rounded-3xl border border-zinc-200 p-5 flex items-center gap-4 shadow-sm">
                <div className="w-11 h-11 rounded-2xl bg-zinc-950 text-white flex items-center justify-center">
                  <Camera className="w-5 h-5" />
                </div>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-20 bg-zinc-950 text-white scroll-mt-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div>
            <p className="text-cyan-300 font-semibold">{t.faqLabel}</p>
            <h2 className="mt-3 text-4xl md:text-5xl font-black">{t.faqTitle}</h2>
          </div>
          <div className="grid gap-4">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <div className="flex items-start gap-4">
                  <HelpCircle className="mt-1 h-6 w-6 flex-none text-cyan-300" />
                  <div>
                    <h3 className="text-xl font-bold">{faq.q}</h3>
                    <p className="mt-2 text-zinc-300 leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 bg-zinc-950 scroll-mt-28">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-12 h-12 mx-auto text-cyan-300" />
          <h2 className="mt-5 text-4xl md:text-6xl font-black">{t.ready}</h2>
          <p className="mt-5 text-zinc-300 text-lg">{t.readyDesc}</p>
          <div className="mt-6 inline-flex rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-4 text-left shadow-lg">
            <p className="text-lg md:text-xl font-black text-cyan-100">{t.discount}</p>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://www.instagram.com/tokyolocalfriends/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-pink-500 to-cyan-400 text-white hover:opacity-90 transition"
            >
              {t.instagram}
            </a>
            <div className="relative flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                className="mb-2 rounded-full bg-cyan-300 px-4 py-1 text-sm font-black text-zinc-950 shadow-lg shadow-cyan-300/30"
              >
                {t.bookingHint}
              </motion.div>
              <a
                href={bookingFormUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-black bg-white text-zinc-950 hover:bg-zinc-200 transition ring-4 ring-cyan-300/30 shadow-2xl shadow-cyan-300/20"
              >
                → {t.bookingForm} ←
              </a>
            </div>
            <a
              href="mailto:tokyolocalfriends@gmail.com"
              className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition"
            >
              {t.email}
            </a>
          </div>
          <p className="mt-8 text-sm text-zinc-500">{t.footer}</p>
        </div>
      </section>
    </main>
  );
}
