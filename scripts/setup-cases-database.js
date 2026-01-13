/**
 * Notion 開発事例データベースのセットアップスクリプト
 *
 * このスクリプトは以下を実行します：
 * 1. 開発事例データベースを作成
 * 2. 必要なプロパティを設定
 * 3. サンプルデータを投入
 */

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const PARENT_PAGE_ID = '2e444bdd2c978047a3f7cc1eef31005a';

if (!NOTION_API_KEY) {
  console.error('❌ NOTION_API_KEY environment variable is not set');
  process.exit(1);
}

const NOTION_API = 'https://api.notion.com/v1';
const headers = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Notion-Version': '2022-06-28',
  'Content-Type': 'application/json',
};

// サンプルデータ
const sampleCases = [
  {
    title: '大手製造業A社様 文書管理システム',
    category: '文書管理',
    description: '全社の技術文書・品質文書を一元管理し、承認ワークフローを自動化。検索性が大幅に向上し、文書管理業務の工数を60%削減。',
    image: 'https://readdy.ai/api/search-image?query=modern%20office%20workspace%20with%20digital%20document%20management%20system%20displayed%20on%20multiple%20screens%2C%20clean%20organized%20environment%20with%20filing%20cabinets%20and%20computers%2C%20professional%20business%20setting%20with%20natural%20lighting%2C%20minimalist%20design%20with%20blue%20and%20white%20color%20scheme%2C%20high-tech%20atmosphere&width=800&height=600&seq=case1&orientation=landscape',
    scale: '大規模',
    period: '6ヶ月',
    cost: '850万円',
    results: '文書検索時間 70%短縮\n承認プロセス 50%高速化\n年間コスト 300万円削減',
    order: 1,
  },
  {
    title: '物流企業B社様 在庫管理システム',
    category: '在庫管理',
    description: '複数拠点の在庫をリアルタイムで可視化し、適正在庫の維持を実現。過剰在庫と欠品を同時に削減し、キャッシュフローが改善。',
    image: 'https://readdy.ai/api/search-image?query=modern%20warehouse%20with%20automated%20inventory%20management%20system%2C%20organized%20shelves%20with%20products%20and%20barcode%20scanners%2C%20clean%20industrial%20environment%20with%20LED%20lighting%2C%20workers%20using%20tablets%20for%20inventory%20tracking%2C%20efficient%20logistics%20operation%20with%20blue%20accent%20lighting&width=800&height=600&seq=case2&orientation=landscape',
    scale: '標準規模',
    period: '4ヶ月',
    cost: '420万円',
    results: '在庫回転率 35%向上\n欠品率 80%削減\n棚卸時間 65%短縮',
    order: 2,
  },
  {
    title: '商社C社様 顧客・販売管理システム',
    category: '顧客管理',
    description: '顧客情報と案件情報を統合管理し、営業活動を可視化。データに基づく戦略的な営業が可能になり、売上が20%向上。',
    image: 'https://readdy.ai/api/search-image?query=modern%20sales%20office%20with%20customer%20relationship%20management%20dashboard%20on%20large%20monitors%2C%20professional%20business%20environment%20with%20sales%20team%20collaborating%2C%20clean%20workspace%20with%20charts%20and%20analytics%20displays%2C%20contemporary%20office%20design%20with%20natural%20light%20and%20blue%20accent%20colors&width=800&height=600&seq=case3&orientation=landscape',
    scale: '標準規模',
    period: '5ヶ月',
    cost: '580万円',
    results: '売上 20%向上\n商談成約率 30%改善\n営業効率 40%向上',
    order: 3,
  },
  {
    title: '小売業D社様 経営ダッシュボード',
    category: '経営BI',
    description: '全店舗の売上・在庫・顧客データをリアルタイムで可視化。経営判断のスピードが向上し、機会損失を最小化。',
    image: 'https://readdy.ai/api/search-image?query=executive%20office%20with%20large%20business%20intelligence%20dashboard%20displaying%20real-time%20analytics%20and%20KPIs%2C%20modern%20corporate%20environment%20with%20multiple%20screens%20showing%20charts%20and%20graphs%2C%20professional%20setting%20with%20clean%20design%20and%20blue%20data%20visualization%20elements&width=800&height=600&seq=case4&orientation=landscape',
    scale: '標準規模',
    period: '3ヶ月',
    cost: '380万円',
    results: '意思決定速度 50%向上\nデータ集計時間 90%削減\n売上予測精度 25%改善',
    order: 4,
  },
  {
    title: '製造業E社様 生産管理システム',
    category: '生産管理',
    description: '生産計画から工程管理、進捗管理まで一元化。リアルタイムな生産状況の把握により、納期遵守率が大幅に向上。',
    image: 'https://readdy.ai/api/search-image?query=modern%20manufacturing%20facility%20with%20digital%20production%20management%20system%2C%20factory%20floor%20with%20automated%20machinery%20and%20monitoring%20screens%2C%20clean%20industrial%20environment%20with%20workers%20using%20tablets%2C%20efficient%20production%20line%20with%20blue%20LED%20indicators%20and%20organized%20workspace&width=800&height=600&seq=case5&orientation=landscape',
    scale: '大規模',
    period: '7ヶ月',
    cost: '920万円',
    results: '納期遵守率 95%達成\n生産効率 30%向上\n在庫コスト 25%削減',
    order: 5,
  },
  {
    title: 'サービス業F社様 人事・給与システム',
    category: '人事給与',
    description: '人事情報管理から給与計算、勤怠管理まで統合。給与計算の自動化により、人事部門の業務負荷が大幅に軽減。',
    image: 'https://readdy.ai/api/search-image?query=modern%20HR%20office%20with%20human%20resources%20management%20system%20on%20computers%2C%20professional%20workspace%20with%20employee%20data%20dashboards%2C%20clean%20corporate%20environment%20with%20organized%20filing%20and%20digital%20screens%2C%20contemporary%20office%20design%20with%20natural%20lighting%20and%20blue%20interface%20elements&width=800&height=600&seq=case6&orientation=landscape',
    scale: '標準規模',
    period: '4ヶ月',
    cost: '450万円',
    results: '給与計算時間 80%削減\n人事業務効率 50%向上\n勤怠管理精度 向上',
    order: 6,
  },
];

async function createDatabase() {
  console.log('📝 Creating database...');

  const response = await fetch(`${NOTION_API}/databases`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      parent: {
        type: 'page_id',
        page_id: PARENT_PAGE_ID,
      },
      title: [
        {
          type: 'text',
          text: {
            content: '開発事例',
          },
        },
      ],
      properties: {
        '名前': {
          title: {},
        },
        'Category': {
          select: {
            options: [
              { name: '文書管理', color: 'blue' },
              { name: '在庫管理', color: 'green' },
              { name: '顧客管理', color: 'purple' },
              { name: '経営BI', color: 'pink' },
              { name: '生産管理', color: 'orange' },
              { name: '人事給与', color: 'yellow' },
            ],
          },
        },
        'Description': {
          rich_text: {},
        },
        'Image': {
          url: {},
        },
        'Scale': {
          select: {
            options: [
              { name: '大規模', color: 'red' },
              { name: '標準規模', color: 'blue' },
            ],
          },
        },
        'Period': {
          rich_text: {},
        },
        'Cost': {
          rich_text: {},
        },
        'Results': {
          rich_text: {},
        },
        'Published': {
          checkbox: {},
        },
        'Order': {
          number: {
            format: 'number',
          },
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error('❌ Failed to create database:', JSON.stringify(error, null, 2));
    throw new Error('Database creation failed');
  }

  const database = await response.json();
  console.log('✅ Database created successfully!');
  console.log('📋 Database ID:', database.id);
  return database.id;
}

async function createPage(databaseId, caseData) {
  const response = await fetch(`${NOTION_API}/pages`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      parent: {
        database_id: databaseId,
      },
      properties: {
        '名前': {
          title: [
            {
              text: {
                content: caseData.title,
              },
            },
          ],
        },
        'Category': {
          select: {
            name: caseData.category,
          },
        },
        'Description': {
          rich_text: [
            {
              text: {
                content: caseData.description,
              },
            },
          ],
        },
        'Image': {
          url: caseData.image,
        },
        'Scale': {
          select: {
            name: caseData.scale,
          },
        },
        'Period': {
          rich_text: [
            {
              text: {
                content: caseData.period,
              },
            },
          ],
        },
        'Cost': {
          rich_text: [
            {
              text: {
                content: caseData.cost,
              },
            },
          ],
        },
        'Results': {
          rich_text: [
            {
              text: {
                content: caseData.results,
              },
            },
          ],
        },
        'Published': {
          checkbox: true,
        },
        'Order': {
          number: caseData.order,
        },
      },
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    console.error(`❌ Failed to create page "${caseData.title}":`, JSON.stringify(error, null, 2));
    return false;
  }

  console.log(`✅ Created: ${caseData.title}`);
  return true;
}

async function main() {
  try {
    console.log('🚀 Starting Notion database setup...\n');

    // 1. データベースを作成
    const databaseId = await createDatabase();
    console.log('');

    // 2. サンプルデータを投入
    console.log('📝 Creating sample pages...');
    let successCount = 0;
    for (const caseData of sampleCases) {
      const success = await createPage(databaseId, caseData);
      if (success) successCount++;
      // APIレート制限を避けるため少し待つ
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    console.log('');
    console.log('✨ Setup completed!');
    console.log(`📊 Created ${successCount}/${sampleCases.length} sample cases`);
    console.log('');
    console.log('🔧 Next steps:');
    console.log('1. Add this database ID to Vercel environment variables:');
    console.log(`   NOTION_CASES_DATABASE_ID=${databaseId}`);
    console.log('');
    console.log('2. Redeploy your Vercel project to apply the changes');
    console.log('');
    console.log('3. Visit your website to see the cases!');

  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Full error:', error);
    process.exit(1);
  }
}

main();
