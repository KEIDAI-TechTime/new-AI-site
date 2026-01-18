import fs from 'fs/promises';
import path from 'path';

// Page metadata and static content for SEO and AI crawlers
const pages: Record<string, {
  title: string;
  description: string;
  content: string;
}> = {
  '/': {
    title: 'TechTime | AI駆動の低価格基幹システム開発',
    description: '従来の半分以下のコストで御社専用の基幹システムを構築。AI駆動開発により設計からテストまで数分で初版生成。文書管理、在庫管理、顧客管理など各種システムに対応。見積もりシミュレーターで即座に概算金額を確認できます。',
    content: `
      <main>
        <article>
          <h1>AI駆動開発で実現する、圧倒的低価格の基幹システム</h1>
          <p>従来の半分以下のコストで、御社専用システムを構築</p>
          <p>人手では日単位を要した設計・開発工程を、AIが数分で初版生成。圧倒的な開発効率化により、これまでにない低価格を実現しました。</p>

          <section>
            <h2>TechTimeの強み</h2>
            <ul>
              <li>開発速度: 50倍高速</li>
              <li>コスト削減: 50%以上</li>
              <li>品質保証: 自動テスト完備</li>
            </ul>
          </section>

          <section>
            <h2>TechTimeが選ばれる理由</h2>
            <p>AI技術を活用した革新的な開発手法で、高品質なシステムを低価格・短納期で提供します</p>

            <h3>見積もりシミュレーター</h3>
            <p>打ち合わせ不要、その場で概算金額がわかる</p>
            <p>システム種別と規模を選択するだけで、即座に概算見積もりを表示。営業との打ち合わせや見積もり待ちの時間は不要です。予算検討の初期段階から、具体的な金額感を把握できます。</p>

            <h3>AI駆動開発</h3>
            <p>設計からテストまで、AIが開発を加速</p>
            <p>要件定義から外部設計、内部設計、コード生成、テスト仕様作成、テスト実行まで、AIが一貫してサポート。従来は日単位を要した各工程を数分〜数十分で初版生成し、開発期間を大幅に短縮します。</p>

            <h3>品質保証</h3>
            <p>多段階レビューと自動テストで確実な品質</p>
            <p>構造化された設計テンプレート、多段階レビュー、実行確認による早期検証、自動テストによる品質チェックなど、複数の品質担保の仕組みを組み合わせています。</p>
          </section>

          <section>
            <h2>対応システム一覧</h2>
            <ul>
              <li>文書管理システム - 契約書・請求書・マニュアルなどを一元管理</li>
              <li>在庫管理システム - リアルタイムの在庫把握と発注最適化</li>
              <li>顧客管理システム（CRM）- 顧客情報と商談履歴を一元管理</li>
              <li>販売管理システム - 受注から出荷までをシームレスに管理</li>
              <li>勤怠管理システム - 出退勤打刻から給与計算まで自動化</li>
              <li>プロジェクト管理システム - タスク・進捗・リソースを可視化</li>
            </ul>
          </section>

          <section>
            <h2>AI駆動開発とは</h2>
            <p>TechTimeのAI駆動開発は、最新のAI技術を活用して設計から実装、テストまでの開発プロセスを革新的に効率化する手法です。</p>
            <ul>
              <li>設計書を数分で初版生成</li>
              <li>コードを自動生成</li>
              <li>テストケースを自動作成</li>
              <li>多段階レビューで品質担保</li>
            </ul>
          </section>

          <section>
            <h2>よくある質問（FAQ）</h2>
            <dl>
              <dt>本当に従来の半額以下で開発できるのですか？</dt>
              <dd>はい、AI駆動開発により設計・開発工程を大幅に効率化することで、従来の50%以下のコストを実現しています。見積もりシミュレーターで概算金額をご確認いただけます。</dd>

              <dt>どのようなシステムに対応していますか？</dt>
              <dd>文書管理、在庫管理、顧客管理（CRM）、販売管理、勤怠管理、プロジェクト管理など、各種基幹システムに対応しています。</dd>

              <dt>品質は大丈夫ですか？</dt>
              <dd>多段階レビューと自動テストを組み合わせた品質保証体制を整えています。AIによる効率化と人による確認を両立させています。</dd>

              <dt>開発期間はどれくらいですか？</dt>
              <dd>システムの規模や複雑さによりますが、従来の開発と比較して大幅に短縮可能です。詳細はお問い合わせください。</dd>
            </dl>
          </section>
        </article>

        <footer>
          <h2>会社情報</h2>
          <p>TechTime株式会社</p>
          <p>AI駆動開発で実現する圧倒的低価格の基幹システム</p>
          <address>
            <p>【東京オフィス】〒150-0002 東京都渋谷区渋谷2-19-15宮益坂ビルディング609</p>
            <p>【大阪オフィス】〒530-0001 大阪府大阪市北区梅田1丁目2番2号大阪駅前第2ビル12-12</p>
            <p>電話: 03-4222-3363（月〜金/9〜19時）</p>
            <p>メール: kdm@techtime-link.com</p>
          </address>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/systems': {
    title: '対応システム | TechTime株式会社',
    description: '文書管理、在庫管理、顧客管理など、各種基幹システムに対応。AI駆動開発により、従来の半分以下のコストで高品質なシステムを提供します。',
    content: `
      <main>
        <article>
          <h1>対応システム</h1>
          <p>TechTimeでは、企業の業務効率化を支援する各種基幹システムの開発に対応しています。AI駆動開発により、従来の半分以下のコストで高品質なシステムを提供します。</p>

          <section>
            <h2>文書管理システム</h2>
            <p>契約書・請求書・マニュアルなどの企業文書を一元管理。検索性の向上、バージョン管理、アクセス権限制御などの機能を実装します。</p>
          </section>

          <section>
            <h2>在庫管理システム</h2>
            <p>リアルタイムの在庫把握と発注の最適化を実現。入出庫管理、在庫アラート、棚卸し支援などの機能を提供します。</p>
          </section>

          <section>
            <h2>顧客管理システム（CRM）</h2>
            <p>顧客情報と商談履歴を一元管理。営業活動の効率化、顧客分析、マーケティング支援などを実現します。</p>
          </section>

          <section>
            <h2>販売管理システム</h2>
            <p>受注から出荷までをシームレスに管理。見積作成、受注処理、売上管理、請求書発行などの業務を効率化します。</p>
          </section>

          <section>
            <h2>勤怠管理システム</h2>
            <p>出退勤打刻から給与計算までを自動化。シフト管理、残業管理、有給管理などの機能を実装します。</p>
          </section>

          <section>
            <h2>プロジェクト管理システム</h2>
            <p>タスク・進捗・リソースを可視化。ガントチャート、タスク管理、工数管理、レポート機能などを提供します。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/simulator': {
    title: '見積もりシミュレーター | TechTime株式会社',
    description: 'システム開発の見積もりを即座に確認。プロジェクト規模、開発期間、機能要件を入力するだけで、概算金額をその場で算出します。',
    content: `
      <main>
        <article>
          <h1>見積もりシミュレーター</h1>
          <p>システム種別と規模を選択するだけで、即座に概算見積もりを表示。営業との打ち合わせや見積もり待ちの時間は不要です。</p>

          <section>
            <h2>シミュレーターの使い方</h2>
            <ol>
              <li>システム種別を選択（文書管理、在庫管理、顧客管理など）</li>
              <li>規模・機能を選択</li>
              <li>オプション機能を追加</li>
              <li>概算金額を即座に確認</li>
            </ol>
          </section>

          <section>
            <h2>対応システム種別</h2>
            <ul>
              <li>文書管理システム</li>
              <li>在庫管理システム</li>
              <li>顧客管理システム（CRM）</li>
              <li>販売管理システム</li>
              <li>勤怠管理システム</li>
              <li>プロジェクト管理システム</li>
            </ul>
          </section>

          <section>
            <h2>なぜ低価格なのか</h2>
            <p>AI駆動開発により、設計からテストまでの工程を大幅に効率化。従来の開発と比較して50%以上のコスト削減を実現しています。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/ai-development': {
    title: 'AI駆動開発 | TechTime株式会社',
    description: 'AI技術を活用した革新的な開発手法で、設計からテストまで数分で初版を生成。開発スピードと品質を両立した次世代の開発サービス。',
    content: `
      <main>
        <article>
          <h1>AI駆動開発</h1>
          <p>TechTimeのAI駆動開発は、最新のAI技術を活用して設計から実装、テストまでの開発プロセスを革新的に効率化する手法です。</p>

          <section>
            <h2>AI駆動開発の特徴</h2>

            <h3>設計書の自動生成</h3>
            <p>要件定義から外部設計、内部設計まで、AIが数分で初版を生成。人間のエンジニアがレビュー・修正を行い、高品質な設計書を短時間で完成させます。</p>

            <h3>コードの自動生成</h3>
            <p>設計書に基づき、AIが実装コードを自動生成。命名規則やコーディング規約に準拠した、保守性の高いコードを出力します。</p>

            <h3>テストの自動化</h3>
            <p>テストケースの自動生成から、テストの自動実行まで対応。網羅的なテストにより、品質を担保します。</p>
          </section>

          <section>
            <h2>従来の開発との比較</h2>
            <ul>
              <li>設計工程: 日単位 → 数分〜数十分</li>
              <li>コーディング: 週単位 → 時間単位</li>
              <li>テスト作成: 日単位 → 数分</li>
              <li>コスト: 50%以上削減</li>
            </ul>
          </section>

          <section>
            <h2>品質の担保</h2>
            <p>AIが生成したアウトプットは、必ず人間のエンジニアがレビュー。多段階のチェック体制により、品質を確保しています。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/quality-assurance': {
    title: '品質保証 | TechTime株式会社',
    description: 'TechTimeの品質保証サービス。徹底したテスト体制で、高品質なシステムを提供します。バグの早期発見と継続的な品質改善をサポート。',
    content: `
      <main>
        <article>
          <h1>品質保証</h1>
          <p>TechTimeでは、AI駆動開発の効率性と、確実な品質保証を両立しています。多段階のレビュー体制と自動テストにより、高品質なシステムを提供します。</p>

          <section>
            <h2>品質保証の仕組み</h2>

            <h3>構造化された設計テンプレート</h3>
            <p>一貫した品質の設計書を作成するための、標準化されたテンプレートを使用。要件の抜け漏れを防ぎます。</p>

            <h3>多段階レビュー</h3>
            <p>AI生成物に対する人間によるレビュー、ペアレビュー、クロスレビューなど、複数の視点からチェックを実施します。</p>

            <h3>早期検証</h3>
            <p>開発の各フェーズで動作確認を実施。問題の早期発見・早期修正により、手戻りを最小化します。</p>

            <h3>自動テスト</h3>
            <p>単体テスト、結合テスト、E2Eテストを自動化。継続的なテスト実行により、品質を維持します。</p>
          </section>

          <section>
            <h2>保守・運用サポート</h2>
            <p>システム納品後も、保守・運用をサポート。バグ修正、機能追加、パフォーマンス改善など、継続的な支援を提供します。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/blog': {
    title: 'ブログ | TechTime株式会社',
    description: 'TechTimeの最新情報や技術ブログをお届けします。AI駆動開発、システム開発のノウハウなど、役立つ情報を発信中。',
    content: `
      <main>
        <article>
          <h1>ブログ</h1>
          <p>TechTimeの最新情報や技術ブログをお届けします。AI駆動開発、システム開発のノウハウなど、役立つ情報を発信しています。</p>

          <section>
            <h2>カテゴリー</h2>
            <ul>
              <li>AI駆動開発</li>
              <li>システム開発</li>
              <li>技術Tips</li>
              <li>お知らせ</li>
            </ul>
          </section>

          <section>
            <h2>最新記事</h2>
            <p>最新のブログ記事はこちらからご覧いただけます。AI駆動開発の事例、技術解説、業界トレンドなど、様々な情報を発信しています。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/cases': {
    title: '開発事例 | TechTime株式会社',
    description: 'TechTimeが手がけた基幹システム開発の事例をご紹介。様々な業種・規模のプロジェクト実績をご覧いただけます。',
    content: `
      <main>
        <article>
          <h1>開発事例</h1>
          <p>TechTimeが手がけた基幹システム開発の事例をご紹介します。様々な業種・規模のお客様に、AI駆動開発による高品質・低価格なシステムを提供しています。</p>

          <section>
            <h2>事例カテゴリー</h2>
            <ul>
              <li>文書管理システム導入事例</li>
              <li>在庫管理システム導入事例</li>
              <li>顧客管理システム（CRM）導入事例</li>
              <li>販売管理システム導入事例</li>
              <li>勤怠管理システム導入事例</li>
              <li>プロジェクト管理システム導入事例</li>
            </ul>
          </section>

          <section>
            <h2>お客様の声</h2>
            <p>多くのお客様から、コスト削減と品質の両立について高い評価をいただいています。具体的な事例は各詳細ページでご確認いただけます。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/about': {
    title: '会社概要 | TechTime株式会社',
    description: 'TechTime株式会社の会社概要。AI駆動開発で企業の基幹システム開発に革新をもたらします。東京・大阪にオフィスを構え、全国のお客様にサービスを提供しています。',
    content: `
      <main>
        <article>
          <h1>会社概要</h1>
          <p>AI駆動開発で、企業の基幹システム開発に革新をもたらす</p>

          <section>
            <h2>会社情報</h2>
            <dl>
              <dt>会社名</dt>
              <dd>TechTime株式会社</dd>

              <dt>設立</dt>
              <dd>2020年4月1日</dd>

              <dt>資本金</dt>
              <dd>800万円</dd>

              <dt>所在地</dt>
              <dd>
                【東京オフィス】〒150-0002 東京都渋谷区渋谷2-19-15宮益坂ビルディング609<br>
                【大阪オフィス】〒530-0001 大阪府大阪市北区梅田1丁目2番2号大阪駅前第2ビル12-12
              </dd>

              <dt>電話番号</dt>
              <dd>03-4222-3363（月〜金/9〜19時）</dd>

              <dt>メール</dt>
              <dd>kdm@techtime-link.com</dd>

              <dt>事業内容</dt>
              <dd>
                基幹システムの受託開発<br>
                AI駆動開発ツールの研究開発<br>
                システム保守運用サービス<br>
                ITコンサルティング
              </dd>

              <dt>従業員数</dt>
              <dd>18名（2025年1月現在）</dd>
            </dl>
          </section>

          <section>
            <h2>ミッション</h2>
            <p>AI技術を活用した革新的な開発手法により、高品質なシステムを圧倒的な低価格で提供し、すべての企業がデジタル化の恩恵を受けられる社会を実現する。</p>
          </section>

          <section>
            <h2>ビジョン</h2>
            <p>AI駆動開発のパイオニアとして、システム開発業界の常識を変革し、日本のDX推進を加速させるリーディングカンパニーになる。</p>
          </section>

          <section>
            <h2>私たちの価値観</h2>
            <h3>革新性</h3>
            <p>常に最新のAI技術を取り入れ、従来の開発手法にとらわれない革新的なアプローチで、業界に新しい価値を提供し続けます。</p>

            <h3>品質へのこだわり</h3>
            <p>AIによる効率化を追求しながらも、品質を決して妥協しません。多段階のレビューと自動テストにより、高品質を担保します。</p>

            <h3>顧客第一</h3>
            <p>お客様の業務課題を深く理解し、真に価値あるシステムを提供することを最優先に考えます。長期的なパートナーシップを大切にします。</p>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
  '/contact': {
    title: 'お問い合わせ | TechTime株式会社',
    description: 'システム開発に関するご相談、お見積もりのご依頼など、お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。',
    content: `
      <main>
        <article>
          <h1>お問い合わせ</h1>
          <p>システム開発に関するご相談、お見積もりのご依頼など、お気軽にお問い合わせください。専門スタッフが丁寧にご対応いたします。</p>

          <section>
            <h2>お問い合わせ方法</h2>

            <h3>お電話でのお問い合わせ</h3>
            <p>電話番号: 03-4222-3363</p>
            <p>受付時間: 月〜金 9:00〜19:00</p>

            <h3>メールでのお問い合わせ</h3>
            <p>メールアドレス: kdm@techtime-link.com</p>

            <h3>フォームでのお問い合わせ</h3>
            <p>下記フォームに必要事項をご入力の上、送信してください。</p>
          </section>

          <section>
            <h2>よくあるお問い合わせ</h2>
            <ul>
              <li>システム開発のご相談</li>
              <li>お見積もりのご依頼</li>
              <li>サービス内容に関するご質問</li>
              <li>パートナーシップのご提案</li>
            </ul>
          </section>

          <section>
            <h2>オフィス所在地</h2>
            <address>
              <p>【東京オフィス】</p>
              <p>〒150-0002 東京都渋谷区渋谷2-19-15宮益坂ビルディング609</p>

              <p>【大阪オフィス】</p>
              <p>〒530-0001 大阪府大阪市北区梅田1丁目2番2号大阪駅前第2ビル12-12</p>
            </address>
          </section>
        </article>

        <footer>
          <p>TechTime株式会社</p>
          <p>© 2025 TechTime株式会社. All rights reserved.</p>
        </footer>
      </main>
    `,
  },
};

async function prerender() {
  const distPath = path.resolve(process.cwd(), 'dist');
  const templatePath = path.join(distPath, 'index.html');

  try {
    const template = await fs.readFile(templatePath, 'utf-8');

    for (const [route, meta] of Object.entries(pages)) {
      try {
        let html = template;

        // Update title
        html = html.replace(
          /<title>.*?<\/title>/,
          `<title>${meta.title}</title>`
        );

        // Update description
        html = html.replace(
          /<meta name="description" content=".*?">/,
          `<meta name="description" content="${meta.description}">`
        );

        // Update OGP title
        html = html.replace(
          /<meta property="og:title" content=".*?" \/>/,
          `<meta property="og:title" content="${meta.title}" />`
        );

        // Update OGP description
        html = html.replace(
          /<meta property="og:description" content=".*?" \/>/,
          `<meta property="og:description" content="${meta.description}" />`
        );

        // Update OGP URL
        html = html.replace(
          /<meta property="og:url" content=".*?" \/>/,
          `<meta property="og:url" content="https://techtime-jp.com${route}" />`
        );

        // Update canonical URL
        html = html.replace(
          /<link rel="canonical" href=".*?" \/>/,
          `<link rel="canonical" href="https://techtime-jp.com${route}" />`
        );

        // Update Twitter Card title
        html = html.replace(
          /<meta name="twitter:title" content=".*?">/,
          `<meta name="twitter:title" content="${meta.title}">`
        );

        // Update Twitter Card description
        html = html.replace(
          /<meta name="twitter:description" content=".*?">/,
          `<meta name="twitter:description" content="${meta.description}">`
        );

        // Inject static content into the root div for crawlers
        // This content will be replaced when React hydrates
        const staticContent = `
    <!-- Static content for search engines and AI crawlers -->
    <div id="static-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
      ${meta.content.trim()}
    </div>
    <!-- End static content -->
    `;

        // Insert static content before the closing </body> tag
        // This ensures crawlers can access the content while keeping it visually hidden
        html = html.replace(
          '</body>',
          `${staticContent}\n  </body>`
        );

        // Also add noscript fallback
        const noscriptContent = `
    <noscript>
      <style>
        #static-content { position: static !important; left: auto !important; width: auto !important; height: auto !important; overflow: visible !important; }
      </style>
    </noscript>`;

        html = html.replace(
          '</head>',
          `${noscriptContent}\n  </head>`
        );

        // Create directory structure
        const routePath = route === '/' ? '' : route;
        const routeDir = path.join(distPath, routePath);
        const htmlPath = path.join(routeDir, 'index.html');

        await fs.mkdir(routeDir, { recursive: true });
        await fs.writeFile(htmlPath, html, 'utf-8');

        console.log(`✓ Pre-rendered: ${route}`);
      } catch (err) {
        console.error(`✗ Failed to pre-render ${route}:`, err);
      }
    }

    console.log('\n✓ Pre-rendering complete! All pages have optimized meta tags and static content for SEO and AI crawlers.');
  } catch (err) {
    console.error('Pre-rendering failed:', err);
    process.exit(1);
  }
}

prerender();
