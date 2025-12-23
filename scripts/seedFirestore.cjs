const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
// Data is defined locally in seed() function

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function seed() {
    const batch = db.batch();

    // Defines the data manually here to avoid TS compilation issues for this simple script
    // In a real app we might import this, but since data.ts is TS and this is JS (or needs ts-node), copy-paste is safer for the user's immediate "run once" need.
    const checklistData = [
        {
            id: 'docs',
            title: '重要文件（出門前必檢）',
            icon: 'FileText',
            items: [
                { id: 'd1', text: '護照（有效期限 ≥ 12 個月）' },
                { id: 'd2', text: '機票／電子登機證（ANA）' },
                { id: 'd3', text: '飯店訂房資料' },
                { id: 'd4', text: '信用卡（至少 1–2 張）' },
                { id: 'd5', text: '日圓現金（¥10,000–20,000）' },
                { id: 'd6', text: '旅遊保險（電子或紙本）' },
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
                { id: 'b7', text: '耳機' },
                { id: 'b8', text: '口罩' },
                { id: 'b9', text: '濕紙巾／酒精擦' },
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
                { id: 'c7', text: '帽子' },
                { id: 'c8', text: '防風外套' },
                { id: 'c9', text: '好走的鞋' },
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
                { id: 'cl6', text: '睡衣' },
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
                { id: 'p4', text: '常用藥' },
                { id: 'p5', text: '太陽眼鏡' },
                { id: 'p6', text: '眼鏡／隱形眼鏡（若有）' },
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
                { id: 'l4', text: '行李鎖' },
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

    let order = 0;
    for (const cat of checklistData) {
        // 1. Set Category
        const catRef = db.collection('categories').doc(cat.id);
        batch.set(catRef, {
            title: cat.title,
            icon: cat.icon,
            order: order++
        });

        // 2. Set Items
        for (const item of cat.items) {
            // Use a composite key or auto-id, here we use item.id as doc id if unique, or auto
            // Using item.id as doc id for easier management
            const itemRef = db.collection('items').doc(item.id);
            batch.set(itemRef, {
                categoryId: cat.id,
                text: item.text,
                id: item.id // Store it as field too just in case
            });
        }
    }

    await batch.commit();
    console.log('Migration completed successfully!');
}

seed().catch(console.error);
