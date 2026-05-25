import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Camera, Utensils, Sparkles, MessageCircle, Star, Users, Moon, HelpCircle } from "lucide-react";

const bookingFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfs8aZ_TK8SV5-fFYvqhGauH-9nNksWepZp5T9Uz-mc3rA5BQ/viewform?usp=header";

const tourIcons = {
  classic: MapPin,
  culture: Utensils,
  custom: Sparkles,
};

const legalContent = {
  en: {
    terms: [
      ["1. Service", "TOKYO LOCAL FRIENDS provides local guide experiences in and around Tokyo, including walking tours, introductions to restaurants and sightseeing spots, photo/video support, and customized local experiences."],
      ["2. Not a travel package", "This service does not arrange or sell accommodation, transportation, flights, or package tours. Unless clearly stated otherwise, food, transportation, entrance fees, shopping costs, and other personal expenses are not included in the tour fee."],
      ["3. Booking", "Bookings are accepted through Instagram DM, Google Form, email, or other contact methods. A booking is confirmed only after the date, time, number of guests, tour content, and fee have been agreed by both parties."],
      ["4. Fees and payment", "Tour fees are shown on this website or confirmed by message before booking. Payment method and timing will be provided at the time of booking confirmation."],
      ["5. Cancellations and lateness", "If a guest cancels after booking, a cancellation fee may apply depending on the timing and situation. If a guest is late, please contact us as soon as possible. The tour time may be shortened, and refunds or discounts may not be available for late arrival."],
      ["6. Changes due to weather or safety", "Tour routes, times, or contents may be changed or cancelled due to bad weather, transportation issues, congestion, temporary closures, disasters, or other safety reasons. We will try to suggest an alternative when possible."],
      ["7. Guest responsibility", "Guests are responsible for their own health, belongings, valuables, and personal actions during the tour. We are not responsible for issues caused by guest negligence, excessive drinking, illegal acts, dangerous behavior, or behavior that disturbs shops, locals, other guests, or public spaces."],
      ["8. Photos and videos", "Photos and videos may be taken during the tour. If we use guest images for social media, advertising, or the website, we will generally ask for permission in advance. Guests should also respect the privacy of other guests and third parties when posting their own photos or videos."],
      ["9. Discounts and benefits", "Discounts and benefits such as social media discounts, follow discounts, and free memory videos are available only when the stated conditions are met. These benefits may be changed or ended without prior notice."],
      ["10. Disclaimer", "We do our best to provide a fun and safe experience. However, we are not responsible for accidents, injuries, theft, loss, third-party trouble, shop closures, congestion, transportation delays, weather, or other external factors, except in cases of intentional misconduct or gross negligence by us."],
      ["11. Prohibited actions", "Illegal acts, dangerous behavior, harassment, violence, excessive drinking, drug use, violation of shop or facility rules, no-shows, and any behavior we consider inappropriate are prohibited. In such cases, we may stop the tour without refund."],
      ["12. Contact", "For questions about these Terms, please contact us at tokyolocalfriends@gmail.com or Instagram @tokyolocalfriends."],
    ],
    privacy: [
      ["1. Information we collect", "We may collect information such as your name, email address, Instagram account, travel dates, number of guests, preferred language, requested tour content, budget, and messages sent through forms, email, or social media."],
      ["2. Purpose of use", "We use personal information to manage bookings, reply to inquiries, arrange tours, provide customer support, improve our service, and contact guests when necessary."],
      ["3. Sharing of information", "We do not sell personal information. We will not share personal information with third parties unless required by law, necessary for safety, or necessary to provide the service with the guest’s consent."],
      ["4. Google Forms and external services", "Booking forms and messages may be handled through external services such as Google Forms, Instagram, Gmail, or other platforms. These services may process data according to their own privacy policies."],
      ["5. Photos and videos", "Photos and videos taken during the tour may be used for memory videos or promotional purposes only when appropriate permission has been obtained. Guests may request removal of images where reasonably possible."],
      ["6. Data management", "We take reasonable care to manage personal information safely. However, no online communication or storage method can be guaranteed to be completely secure."],
      ["7. Requests", "Guests may contact us to ask about their personal information, request correction, or request deletion where reasonably possible."],
      ["8. Contact", "For privacy-related questions, please contact tokyolocalfriends@gmail.com."],
    ],
  },
  ja: {
    terms: [
      ["1. サービス内容", "TOKYO LOCAL FRIENDSは、東京を中心としたローカルガイド体験、街歩き、飲食店・観光スポットの紹介、写真・動画サポート、カスタム体験等を提供するサービスです。"],
      ["2. 旅行商品ではないこと", "本サービスは、宿泊・交通機関・航空券等を手配または販売する旅行商品ではありません。特別な記載がない限り、飲食代、交通費、入場料、買い物代等はお客様ご自身の負担となります。"],
      ["3. 予約について", "予約は、Instagram DM、Googleフォーム、メール等を通じて受け付けます。予約は、日時・人数・内容・料金等について双方が合意した時点で確定します。"],
      ["4. 料金・支払い", "ツアー料金は、サイトまたは事前のメッセージで提示します。支払い方法・支払い時期は、予約確定時に案内します。"],
      ["5. キャンセル・遅刻", "お客様都合によるキャンセルの場合、キャンセル時期や状況によりキャンセル料が発生する場合があります。開始時間に遅れる場合は、できるだけ早くご連絡ください。大幅な遅刻によりツアー時間が短くなる場合でも、料金の減額や返金ができない場合があります。"],
      ["6. 天候・安全上の理由による変更", "悪天候、交通機関の乱れ、混雑、店舗休業、災害、その他安全上の理由により、ツアー内容・ルート・時間を変更または中止する場合があります。その場合は、可能な限り代替案をご提案します。"],
      ["7. お客様の責任", "ツアー中の体調管理、貴重品・手荷物の管理、お客様自身の行動についてはお客様ご自身の責任となります。お客様の不注意、過度な飲酒、危険行為、法令違反、公序良俗に反する行為、店舗・通行人・地域住民への迷惑行為等により発生したトラブルについて、当方は責任を負いかねます。"],
      ["8. 写真・動画撮影について", "ツアー中に写真・動画を撮影する場合があります。SNS投稿、広告、サイト掲載等に使用する場合は、原則として事前に確認します。お客様が撮影された写真・動画をSNS等に投稿する場合は、他のお客様や第三者のプライバシーにご配慮ください。"],
      ["9. 割引・特典について", "SNS割引、フォロー割引、記念動画プレゼント等は、当方が指定する条件を満たした場合に限り適用されます。特典内容は予告なく変更・終了する場合があります。"],
      ["10. 免責事項", "本サービスでは、できる限り楽しく安全な体験を提供するよう努めますが、店舗の混雑、臨時休業、交通状況、天候、事故、怪我、盗難、紛失、第三者とのトラブル等について、当方の故意または重大な過失がある場合を除き、責任を負いかねます。"],
      ["11. 禁止事項", "法令に違反する行為、危険行為、迷惑行為、暴力行為、過度な飲酒、薬物使用、店舗や施設のルールに反する行為、無断キャンセル、ガイドや第三者へのハラスメント行為、その他当方が不適切と判断する行為は禁止します。該当する場合、返金なくツアーを中止することがあります。"],
      ["12. お問い合わせ", "本規約に関するお問い合わせは、tokyolocalfriends@gmail.com または Instagram @tokyolocalfriends までご連絡ください。"],
    ],
    privacy: [
      ["1. 取得する情報", "当方は、予約・問い合わせ時に、氏名、メールアドレス、Instagramアカウント、旅行日程、人数、希望言語、希望ツアー内容、予算、メッセージ内容等を取得する場合があります。"],
      ["2. 利用目的", "取得した個人情報は、予約管理、問い合わせ対応、ツアー内容の調整、サービス提供、カスタマーサポート、サービス改善、必要な連絡のために利用します。"],
      ["3. 第三者提供", "個人情報を販売することはありません。法令に基づく場合、安全確保のために必要な場合、またはお客様の同意がある場合を除き、第三者に提供しません。"],
      ["4. Googleフォーム等の外部サービス", "予約フォームやメッセージは、Googleフォーム、Instagram、Gmail等の外部サービスを通じて管理される場合があります。これらのサービスでは、それぞれのプライバシーポリシーに従って情報が処理されます。"],
      ["5. 写真・動画", "ツアー中に撮影した写真・動画は、記念動画の作成またはプロモーション目的で使用する場合があります。掲載等に使用する場合は、原則として事前に確認します。削除希望がある場合は、可能な範囲で対応します。"],
      ["6. 情報管理", "当方は、個人情報を適切に管理するよう努めます。ただし、オンライン上の通信や保存方法について、完全な安全性を保証するものではありません。"],
      ["7. 開示・訂正・削除の依頼", "お客様は、ご自身の個人情報について、確認、訂正、削除を希望する場合、当方に連絡することができます。合理的な範囲で対応します。"],
      ["8. お問い合わせ", "プライバシーポリシーに関するお問い合わせは、tokyolocalfriends@gmail.com までご連絡ください。"],
    ],
  },
};

const sharedTours = {
  en: [
    { id: "classic", title: "Tokyo Classic Tour", subtitle: "For first-time visitors", price: "From ¥4,500 / person", points: ["Shibuya Crossing", "Shinjuku", "Harajuku", "Asakusa", "Tokyo Tower photo spots"] },
    { id: "culture", title: "Anime, Food & Culture", subtitle: "For Japan lovers", price: "From ¥7,000 / person", points: ["Akihabara", "Game centers", "Karaoke experience", "Local recommended restaurants", "Ramen or izakaya", "Convenience store culture"] },
    { id: "custom", title: "Private Custom Tour", subtitle: "Your Tokyo, your way", price: "Consultation required", points: [], customMessage: "Tell us EVERYTHING you want to do in Japan.", customEmphasis: "EVERYTHING YOU WANT TO DO IN JAPAN" },
  ],
  ja: [
    { id: "classic", title: "東京王道ツアー", subtitle: "初めて東京に来る方向け", price: "1人 ¥4,500〜", points: ["渋谷スクランブル交差点", "新宿", "原宿", "浅草", "東京タワー写真スポット"] },
    { id: "culture", title: "アニメ・食・日本文化ツアー", subtitle: "日本カルチャー好き向け", price: "1人 ¥7,000〜", points: ["秋葉原", "ゲームセンター", "カラオケ体験", "現地の人おすすめのお店", "ラーメン or 居酒屋", "コンビニ文化体験"] },
    { id: "custom", title: "完全カスタムツアー", subtitle: "あなたの理想の東京へ", price: "要相談", points: [], customMessage: "日本でやりたいことを全部教えてください。", customEmphasis: "日本でやりたいこと" },
  ],
  es: [
    { id: "classic", title: "Tour Clásico de Tokio", subtitle: "Para quienes visitan Tokio por primera vez", price: "Desde ¥4,500 / persona", points: ["Cruce de Shibuya", "Shinjuku", "Harajuku", "Asakusa", "Fotos cerca de Tokyo Tower"] },
    { id: "culture", title: "Anime, Comida y Cultura", subtitle: "Para amantes de Japón", price: "Desde ¥7,000 / persona", points: ["Akihabara", "Arcades", "Experiencia de karaoke", "Restaurantes recomendados por locales", "Ramen o izakaya", "Cultura de konbini"] },
    { id: "custom", title: "Tour Privado Personalizado", subtitle: "Tu Tokio, a tu manera", price: "Consultar precio", points: [], customMessage: "Cuéntanos TODO lo que quieres hacer en Japón.", customEmphasis: "TODO LO QUE QUIERES HACER EN JAPÓN" },
  ],
  zh: [
    { id: "classic", title: "东京经典路线", subtitle: "适合第一次来东京的客人", price: "每人 ¥4,500起", points: ["涩谷十字路口", "新宿", "原宿", "浅草", "东京塔拍照点"] },
    { id: "culture", title: "动漫、美食与日本文化", subtitle: "适合喜欢日本文化的人", price: "每人 ¥7,000起", points: ["秋叶原", "游戏厅", "卡拉OK体验", "本地人推荐餐厅", "拉面或居酒屋", "便利店文化体验"] },
    { id: "custom", title: "私人定制路线", subtitle: "按照你的想法体验东京", price: "价格需咨询", points: [], customMessage: "请告诉我们你想在日本做的一切。", customEmphasis: "你想在日本做的一切" },
  ],
};

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
    metrics: [{ value: "4", label: "Languages" }, { value: "3", label: "Tour styles" }, { value: "15%+5%", label: "SNS discount" }],
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
    legalLabel: "Terms & Privacy",
    legalTitle: "Terms of Use & Privacy Policy",
    termsTitle: "Terms of Use",
    privacyTitle: "Privacy Policy",
    legalNote: "Please review these before booking. This section is a practical draft and may be updated as the service grows.",
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
    highlights: ["Local friend vibe, not a boring tour", "Japanese, English, Spanish, and Chinese available", "Photos, videos, and memories included", "Food and transportation costs are separate", "We will also teach you lots of useful Japanese phrases for travel!"],
    tours: sharedTours.en,
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
    metrics: [{ value: "4", label: "対応言語" }, { value: "3", label: "ツアー形式" }, { value: "15%+5%", label: "SNS割引" }],
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
    legalLabel: "利用規約・プライバシー",
    legalTitle: "利用規約・プライバシーポリシー",
    termsTitle: "利用規約",
    privacyTitle: "プライバシーポリシー",
    legalNote: "予約前にご確認ください。この内容は運営開始用のたたき台であり、サービス状況に応じて更新される場合があります。",
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
    highlights: ["退屈じゃないローカル感", "日本語・英語・スペイン語・中国語対応可能", "写真・動画サポート付き", "飲食代・交通費は別", "もちろん旅行に使える日本語もたくさん教えます！"],
    tours: sharedTours.ja,
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
    metrics: [{ value: "4", label: "Idiomas" }, { value: "3", label: "Tipos de tour" }, { value: "15%+5%", label: "Descuento SNS" }],
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
    legalLabel: "Términos y privacidad",
    legalTitle: "Términos de uso y política de privacidad",
    termsTitle: "Terms of Use",
    privacyTitle: "Privacy Policy",
    legalNote: "Please review these before booking. The legal text is currently provided in English and may be updated as the service grows.",
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
    highlights: ["Ambiente amigable y local", "Disponible en japonés, inglés, español y chino", "Fotos, videos y recuerdos incluidos", "Comida y transporte separados", "También te enseñaremos muchas frases útiles en japonés para viajar."],
    tours: sharedTours.es,
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
    metrics: [{ value: "4", label: "支持语言" }, { value: "3", label: "路线类型" }, { value: "15%+5%", label: "社媒优惠" }],
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
    legalLabel: "条款与隐私",
    legalTitle: "使用条款与隐私政策",
    termsTitle: "Terms of Use",
    privacyTitle: "Privacy Policy",
    legalNote: "Please review these before booking. The legal text is currently provided in English and may be updated as the service grows.",
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
    highlights: ["真正本地朋友的感觉", "支持日语、英语、西班牙语和中文", "包含拍照和视频记录", "餐饮和交通费用另算", "当然也会教你很多旅行中能用的日语！"],
    tours: sharedTours.zh,
  },
};

function runContentTests() {
  const languages = ["en", "ja", "es", "zh"];
  const requiredKeys = ["badge", "hero", "book", "view", "feeling", "locations", "review", "reviewNote", "choose", "title", "desc", "navTours", "navExperience", "navGuide", "navFaq", "navContact", "galleryLabel", "galleryTitle", "galleryDesc", "faqLabel", "faqTitle", "legalLabel", "legalTitle", "termsTitle", "privacyTitle", "legalNote", "experienceLabel", "experienceTitle", "experienceDesc", "howLabel", "howTitle", "why", "whyTitle", "whyDesc", "localSpotPromise", "profileLabel", "profileTitle", "profileRole", "profileBio", "profileBio2", "ready", "readyDesc", "bookingForm", "bookingHint", "instagram", "email", "footer", "discount"];

  languages.forEach((language) => {
    const t = translations[language];
    const legal = legalContent[language] ?? legalContent.en;

    console.assert(Boolean(t), `${language}: translation exists`);
    requiredKeys.forEach((key) => console.assert(typeof t[key] === "string" && t[key].length > 0, `${language}: ${key} exists`));
    console.assert(t.tours.length === 3, `${language}: has exactly 3 tours`);
    console.assert(t.highlights.length === 5, `${language}: has exactly 5 highlights`);
    console.assert(t.metrics.length === 3, `${language}: has exactly 3 metrics`);
    console.assert(t.gallery.length === 3, `${language}: has exactly 3 gallery cards`);
    console.assert(t.faqs.length === 4, `${language}: has exactly 4 FAQs`);
    console.assert(legal.terms.length >= 8, `${language}: terms content exists`);
    console.assert(legal.privacy.length >= 6, `${language}: privacy content exists`);
    console.assert(t.moments.length === 4, `${language}: has exactly 4 experience moments`);
    console.assert(t.steps.length === 4, `${language}: has exactly 4 booking steps`);
    console.assert(t.tours.every((tour) => Array.isArray(tour.points)), `${language}: every tour has a points array`);
    console.assert(t.tours.filter((tour) => tour.id !== "custom").every((tour) => tour.points.length > 0), `${language}: non-custom tours have points`);
    console.assert(t.tours.some((tour) => tour.id === "custom" && tour.points.length === 0), `${language}: custom tour has no bullet points`);
    console.assert(t.tours.some((tour) => tour.id === "custom" && Boolean(tour.customEmphasis)), `${language}: custom tour has big emphasis text`);
    console.assert(t.tours.some((tour) => tour.id === "custom" && Boolean(tour.customMessage)), `${language}: custom tour has a custom message`);
    console.assert(t.tours.some((tour) => tour.id === "classic" && tour.points.some((point) => point.includes("新宿") || point.includes("Shinjuku"))), `${language}: classic tour includes Shinjuku`);
    console.assert(t.discount.includes("#TokyoLocalFriends"), `${language}: discount hashtag exists`);
    console.assert(t.discount.includes("15"), `${language}: discount amount exists`);
    console.assert(t.discount.includes("5"), `${language}: follow discount amount exists`);
    console.assert(!JSON.stringify(t).includes("{t."), `${language}: no unresolved template placeholders`);
  });
}

if (typeof console !== "undefined") runContentTests();

function SectionTitle({ label, title, description, light = false }) {
  return (
    <div className="max-w-3xl">
      <p className={light ? "text-purple-600 font-semibold" : "text-cyan-300 font-semibold"}>{label}</p>
      <h2 className="mt-3 text-4xl md:text-6xl font-black">{title}</h2>
      {description ? <p className={light ? "mt-5 text-zinc-600 text-lg leading-relaxed" : "mt-5 text-zinc-300 text-lg leading-relaxed"}>{description}</p> : null}
    </div>
  );
}

export default function TokyoFriendsWebsite() {
  const [language, setLanguage] = useState("en");
  const t = useMemo(() => translations[language] ?? translations.en, [language]);
  const legal = useMemo(() => legalContent[language] ?? legalContent.en, [language]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const headerOffset = 96;
    const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
    window.scrollTo({ top: sectionTop - headerOffset, behavior: "smooth" });
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
        {[{ code: "en", label: "EN" }, { code: "ja", label: "JP" }, { code: "es", label: "ES" }, { code: "zh", label: "中文" }].map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setLanguage(lang.code)}
            className={`px-4 py-2 rounded-xl text-sm font-bold backdrop-blur border transition ${language === lang.code ? "bg-white text-zinc-950 border-white" : "bg-white/10 text-white border-white/20 hover:bg-white/20"}`}
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
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-300">FRIENDS!!!</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-zinc-200 leading-relaxed max-w-xl">{t.hero}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="https://www.instagram.com/tokyolocalfriends/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base font-semibold bg-white text-zinc-950 hover:bg-zinc-200 transition">
                <MessageCircle className="w-5 h-5 mr-2" /> {t.book}
              </a>
              <button type="button" onClick={() => scrollToSection("tours")} className="inline-flex items-center justify-center rounded-2xl px-7 py-4 text-base font-semibold border border-white/25 bg-white/5 text-white hover:bg-white/10 transition">{t.view}</button>
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
                      {[0, 1, 2, 3, 4].map((star) => <Star key={star} className="w-5 h-5 fill-current" />)}
                    </div>
                    <p className="mt-3 text-lg font-semibold">{t.review}</p>
                    <p className="mt-2 text-sm text-zinc-300">{t.reviewNote}</p>
                  </div>
                </div>
                <div className="absolute top-7 left-7 rounded-full bg-white text-zinc-950 px-4 py-2 text-sm font-bold">{t.locations}</div>
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
                    <div className="w-12 h-12 rounded-2xl bg-white text-zinc-950 flex items-center justify-center"><Icon className="w-6 h-6" /></div>
                    <h3 className="mt-5 text-2xl font-bold">{tour.title}</h3>
                    <p className="mt-1 text-zinc-400">{tour.subtitle}</p>
                    <p className="mt-4 text-pink-300 font-semibold">{tour.price}</p>
                    {tour.points.length > 0 ? (
                      <ul className="mt-5 space-y-3 text-zinc-300">
                        {tour.points.map((point) => <li key={point} className="flex gap-2"><span className="text-cyan-300">•</span><span>{point}</span></li>)}
                      </ul>
                    ) : null}
                    {tour.customEmphasis ? <div className="mt-6 rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-pink-500/25 via-purple-500/20 to-cyan-400/25 p-5 text-center"><p className="text-3xl md:text-4xl font-black leading-tight text-white">{tour.customEmphasis}</p></div> : null}
                    {tour.customMessage ? <div className="mt-6 rounded-2xl border border-pink-400/30 bg-gradient-to-r from-pink-500/20 to-cyan-400/20 p-4"><p className="text-lg md:text-xl font-black leading-snug text-white">{tour.customMessage}</p></div> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="px-5 py-20 bg-zinc-900 text-white scroll-mt-28">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label={t.experienceLabel} title={t.experienceTitle} description={t.experienceDesc} />
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
          <SectionTitle label={t.galleryLabel} title={t.galleryTitle} description={t.galleryDesc} />
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {t.gallery.map((item, index) => (
              <div key={item.title} className="group relative min-h-[260px] rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.06] p-6 shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.28),transparent_30%),radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.22),transparent_30%)] transition group-hover:scale-110" />
                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div className="text-6xl font-black text-white/10">0{index + 1}</div>
                  <div><h3 className="text-2xl font-black">{item.title}</h3><p className="mt-3 text-zinc-300 leading-relaxed">{item.text}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-20 bg-zinc-950 text-white">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div><p className="text-pink-300 font-semibold">{t.howLabel}</p><h2 className="mt-3 text-4xl md:text-5xl font-black">{t.howTitle}</h2></div>
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
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-pink-500/30 via-purple-500/20 to-cyan-400/30 blur-2xl" />
            <a href="https://www.instagram.com/kana__deeeee/" target="_blank" rel="noopener noreferrer" aria-label="Open Kanade's Instagram" className="group relative block rounded-[2rem] overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-950 via-purple-950 to-zinc-900 p-4 shadow-2xl transition duration-300 hover:-translate-y-1 hover:shadow-cyan-400/20">
              <div className="aspect-[4/5] rounded-[1.5rem] overflow-hidden bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.45),transparent_28%),radial-gradient(circle_at_75%_35%,rgba(34,211,238,0.35),transparent_30%),linear-gradient(135deg,#09090b,#581c87,#111827)] relative">
                <div className="absolute inset-0 opacity-30 bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:42px_42px]" />
                <div className="absolute top-7 left-7 rounded-full bg-white text-zinc-950 px-4 py-2 text-sm font-black">TOKYO LOCAL</div>
                <div className="absolute right-7 top-24 text-right"><p className="text-6xl font-black text-white/15">東京</p><p className="mt-2 text-lg font-black text-pink-300">SHIBUYA</p></div>
                <div className="absolute left-1/2 top-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-pink-300 via-orange-200 to-cyan-200 p-1 shadow-[0_0_60px_rgba(236,72,153,0.45)]">
                  <div className="w-full h-full rounded-full bg-zinc-950 flex items-center justify-center text-center">
                    <div><p className="text-7xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-cyan-200">K</p><p className="mt-1 text-sm font-bold text-zinc-300">KANADE</p></div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-6">
                  <p className="text-sm text-cyan-200 font-semibold">TOKYO FRIENDS!!!</p>
                  <p className="mt-1 text-2xl font-black text-white">Kanade</p>
                  <p className="mt-1 text-zinc-200">Local Tokyo Friend</p>
                  <p className="mt-3 inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-bold text-white transition group-hover:bg-white group-hover:text-zinc-950">Instagram →</p>
                </div>
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
              {t.profileTags.map((tag) => <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-zinc-100">{tag}</span>)}
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
                <div className="w-11 h-11 rounded-2xl bg-zinc-950 text-white flex items-center justify-center"><Camera className="w-5 h-5" /></div>
                <p className="font-semibold">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="px-5 py-20 bg-zinc-950 text-white scroll-mt-28">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[0.8fr_1.2fr] gap-10 items-start">
          <div><p className="text-cyan-300 font-semibold">{t.faqLabel}</p><h2 className="mt-3 text-4xl md:text-5xl font-black">{t.faqTitle}</h2></div>
          <div className="grid gap-4">
            {t.faqs.map((faq) => (
              <div key={faq.q} className="rounded-3xl border border-white/10 bg-white/[0.06] p-6">
                <div className="flex items-start gap-4"><HelpCircle className="mt-1 h-6 w-6 flex-none text-cyan-300" /><div><h3 className="text-xl font-bold">{faq.q}</h3><p className="mt-2 text-zinc-300 leading-relaxed">{faq.a}</p></div></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="legal" className="px-5 py-20 bg-white text-zinc-950">
        <div className="max-w-6xl mx-auto">
          <SectionTitle label={t.legalLabel} title={t.legalTitle} description={t.legalNote} light />
          <div className="mt-10 grid lg:grid-cols-2 gap-6">
            <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <h3 className="text-2xl font-black">{t.termsTitle}</h3>
              <div className="mt-6 space-y-5">
                {legal.terms.map(([title, text]) => <div key={title}><h4 className="font-bold text-zinc-950">{title}</h4><p className="mt-2 text-sm leading-relaxed text-zinc-600">{text}</p></div>)}
              </div>
            </div>
            <div className="rounded-[2rem] border border-zinc-200 bg-zinc-50 p-6 shadow-sm">
              <h3 className="text-2xl font-black">{t.privacyTitle}</h3>
              <div className="mt-6 space-y-5">
                {legal.privacy.map(([title, text]) => <div key={title}><h4 className="font-bold text-zinc-950">{title}</h4><p className="mt-2 text-sm leading-relaxed text-zinc-600">{text}</p></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-20 bg-zinc-950 scroll-mt-28">
        <div className="max-w-4xl mx-auto text-center">
          <Users className="w-12 h-12 mx-auto text-cyan-300" />
          <h2 className="mt-5 text-4xl md:text-6xl font-black">{t.ready}</h2>
          <p className="mt-5 text-zinc-300 text-lg">{t.readyDesc}</p>
          <div className="mt-6 inline-flex rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-5 py-4 text-left shadow-lg"><p className="text-lg md:text-xl font-black text-cyan-100">{t.discount}</p></div>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a href="https://www.instagram.com/tokyolocalfriends/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold bg-gradient-to-r from-pink-500 to-cyan-400 text-white hover:opacity-90 transition">{t.instagram}</a>
            <div className="relative flex flex-col items-center">
              <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }} className="mb-2 rounded-full bg-cyan-300 px-4 py-1 text-sm font-black text-zinc-950 shadow-lg shadow-cyan-300/30">{t.bookingHint}</motion.div>
              <a href={bookingFormUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-black bg-white text-zinc-950 hover:bg-zinc-200 transition ring-4 ring-cyan-300/30 shadow-2xl shadow-cyan-300/20">→ {t.bookingForm} ←</a>
            </div>
            <a href="mailto:tokyolocalfriends@gmail.com" className="inline-flex items-center justify-center rounded-2xl px-8 py-4 text-base font-semibold border border-white/20 bg-white/5 text-white hover:bg-white/10 transition">{t.email}</a>
          </div>
          <p className="mt-8 text-sm text-zinc-500">{t.footer}</p>
        </div>
      </section>
    </main>
  );
}
