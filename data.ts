import { ChecklistCategory, ItineraryDay } from './types';

export const checklistData: ChecklistCategory[] = [
  {
    id: 'docs',
    title: '重要文件（出門前必檢）',
    icon: 'FileText',
    items: [
      { id: 'd1', text: '護照（有效期限 ≥ 3 個月）' },
      { id: 'd2', text: '機票／電子登機證（ANA）' },
      { id: 'd3', text: '飯店訂房資料' },
      { id: 'd4', text: '信用卡（至少 1–2 張）' },
      { id: 'd5', text: '日圓現金（¥10,000–20,000）' },
      { id: 'd6', text: '旅遊保險（電子或紙本）' },
      { id: 'd7', text: 'Comiket 入場券' },
    ],
  },
  {
    id: 'backpack',
    title: '隨身後背包（飛機＋每日使用）',
    icon: 'Backpack',
    items: [
      { id: 'b1', text: '手機' },
      { id: 'b2', text: '錢包' },
      { id: 'b3', text: '護照夾' },
      { id: 'b4', text: '行動電源' },
      { id: 'b5', text: '充電線（USB-C / Lightning）' },
      { id: 'b6', text: '多孔充電器（100–240V）' },
      { id: 'b8', text: '口罩' },
      { id: 'b10', text: '輕便雨具' },
    ],
  },
  {
    id: 'camera',
    title: 'Comiket 拍攝裝備（12/30・12/31）',
    icon: 'Camera',
    items: [
      { id: 'c1', text: '相機' },
      { id: 'c2', text: '主鏡頭' },
      { id: 'c3', text: '備用電池 ×2+' },
      { id: 'c4', text: '記憶卡（備用）' },
      { id: 'c5', text: '行動電源（高容量）' },
      { id: 'c6', text: '相機背帶／快扣' },
    ],
  },
  {
    id: 'clothes',
    title: '衣物（6 天 5 夜）',
    icon: 'Shirt',
    items: [
      { id: 'cl1', text: '上衣 ×5–6' },
      { id: 'cl2', text: '下身 ×2–3' },
      { id: 'cl3', text: '內衣褲' },
      { id: 'cl4', text: '襪子（多帶）' },
      { id: 'cl5', text: '外套' },
    ],
  },
  {
    id: 'personal',
    title: '個人用品',
    icon: 'User',
    items: [
      { id: 'p1', text: '牙刷／牙膏' },
      { id: 'p2', text: '洗面乳／保養品' },
      { id: 'p3', text: '防曬' },
      { id: 'p4', text: '營養品' },
      { id: 'p5', text: '太陽眼鏡' },
    ],
  },
  {
    id: 'luggage',
    title: '行李配置',
    icon: 'Briefcase',
    items: [
      { id: 'l1', text: '隨身後背包' },
      { id: 'l2', text: '登機箱（20–22 吋）' },
      { id: 'l3', text: '28 吋托運行李箱' },
      { id: 'l5', text: '可折疊購物袋' },
    ],
  },
  {
    id: 'power',
    title: '充電與電壓',
    icon: 'Zap',
    items: [
      { id: 'pw1', text: '不需要變壓器' },
      { id: 'pw2', text: '台日插頭通用（兩孔）' },
      { id: 'pw3', text: '三孔插頭 → 三轉二（若有）' },
    ],
  },
  {
    id: 'shopping',
    title: '回程購物注意',
    icon: 'ShoppingBag',
    items: [
      { id: 's1', text: '行李箱留空間（衣物／包包／動漫）' },
      { id: 's2', text: '易碎物放登機箱' },
      { id: 's3', text: '貴重物隨身帶' },
    ],
  },
  {
    id: 'final_check',
    title: '出門最後 5 秒確認',
    icon: 'DoorOpen',
    items: [
      { id: 'f1', text: '護照' },
      { id: 'f2', text: '手機' },
      { id: 'f3', text: '錢包' },
      { id: 'f4', text: '行動電源' },
      { id: 'f5', text: '相機' },
    ],
  },
];

export const itineraryData: ItineraryDay[] = [
  {
    date: '12/28（日）',
    title: '抵達東京',
    activities: [
      '台北松山 → 東京羽田（ANA）',
      '前往 東品川哈頓酒店 入住',
      '便利商店補給、整理器材、休息',
    ],
    locations: [
      { name: '東京羽田機場', query: 'Haneda Airport' },
      { name: '東品川哈頓酒店', query: 'Hearton Hotel Higashi-Shinagawa' },
    ],
  },
  {
    date: '12/29（一）',
    title: '購物日（衣物為主）＋美食',
    activities: [
      '品川一帶散步',
      '築地吃壽司',
      '銀座購物（UNIQLO / GU / MUJI / 選物店）',
      '銀座印度料理晚餐',
      '回飯店休息',
    ],
    locations: [
      { name: '品川', query: 'Shinagawa Station' },
      { name: '築地場外市場', query: 'Tsukiji Outer Market' },
      { name: '銀座', query: 'Ginza Tokyo' },
      { name: 'UNIQLO 銀座', query: 'UNIQLO Ginza' },
    ],
  },
  {
    date: '12/30（二）',
    title: 'Comiket Day 1',
    activities: [
      '前往東京 Big Sight',
      '全天拍 Coser（不買本、不排午餐）',
      '西館外 / 南館外 / 水上公園',
      '下午收工回飯店',
    ],
    locations: [
      { name: '東京 Big Sight', query: 'Tokyo Big Sight' },
      { name: '東京 Big Sight 西展示棟', query: 'Tokyo Big Sight West Exhibition Hall' },
    ],
  },
  {
    date: '12/31（三）',
    title: 'Comiket Day 2',
    activities: [
      '前往東京 Big Sight',
      '全天拍 Coser（角色風格不同）',
      '西館外 / 南館外 / 水上公園',
      '下午收工，晚上休息',
    ],
    locations: [
      { name: '東京 Big Sight', query: 'Tokyo Big Sight' },
      { name: '水之廣場公園', query: 'Mizu no Hiroba Park' },
    ],
  },
  {
    date: '1/1（四）',
    title: '台場逛街＋購物＋動漫',
    activities: [
      '台場一日遊',
      '逛街、買衣物（Aqua City, DECKS, DiverCity）',
      '動漫商品（Gundam Base、周邊、扭蛋）',
      '晚餐在台場解決',
      '回飯店',
    ],
    locations: [
      { name: 'Aqua City Odaiba', query: 'Aqua City Odaiba' },
      { name: 'DECKS Tokyo Beach', query: 'DECKS Tokyo Beach' },
      { name: 'DiverCity Tokyo Plaza', query: 'DiverCity Tokyo Plaza' },
      { name: 'The Gundam Base Tokyo', query: 'The Gundam Base Tokyo' },
    ],
  },
  {
    date: '1/2（五）',
    title: '回台灣',
    activities: [
      '退房',
      '前往羽田機場',
      '東京羽田 → 台北松山（ANA）',
    ],
    locations: [
      { name: '東品川哈頓酒店', query: 'Hearton Hotel Higashi-Shinagawa' },
      { name: '東京羽田機場', query: 'Haneda Airport' },
    ],
  },
];