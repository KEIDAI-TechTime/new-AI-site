/* 用語集（/glossary/<slug>）。1語1ページ。
   def は、検索した人への答えを最初の1〜2文で言い切る。body は補足。ai は、生成AIを使う場合に変わること。 */
export type Term = {
  slug: string;
  word: string;
  kana: string;      // 並べ替えと見出しの読み
  group: '導入の進め方' | '設計と開発' | 'テストと移行' | '運用保守' | 'プロジェクト管理' | 'SAP の製品';
  def: string;
  body: string[];
  ai: string;
  service?: string;  // 関連するサービスの slug
  posts?: string[];
  see?: string[];    // 関連する用語
};

export const terms: Term[] = [
  {
    slug: 'sap-2027', word: 'SAP の2027年問題', kana: 'にせんにじゅうななねんもんだい', group: 'SAP の製品',
    def: 'SAP の2027年問題とは、SAP ERP 6.0（ECC 6.0）の標準保守が2027年末に終わることです。利用している企業は、期限までに SAP S/4HANA へ移行するか、保守を延長するか、別の製品へ移るかを決める必要があります。',
    body: [
      '標準保守の期限は、当初は2025年末でしたが、2027年末まで延長されました。追加の料金を払うと、2030年末まで保守を延長できます。対象は、拡張パッケージ6以降の SAP ERP 6.0 です。',
      '期限が近づくと、移行を支援する会社の要員が不足します。要員の不足は、日程と費用の両方に影響します。移行の方式には、いまの設定を引き継ぐ方式と、新しく作り直す方式があります。',
    ],
    ai: '生成AIは、移行の前の調査で効果が出ます。いまのアドオンと設計書を全件読み、S/4HANA で要らなくなる機能と、作り直す機能を分けます。人が一部だけを調べる方法に比べて、調査の漏れが減ります。',
    service: 'requirements', posts: ['sap-2027-inventory-all-add-ons', 'recheck-add-ons-against-standard'], see: ['s4hana', 'brownfield-greenfield', 'add-on'],
  },
  {
    slug: 's4hana', word: 'SAP S/4HANA', kana: 'えすふぉーはな', group: 'SAP の製品',
    def: 'SAP S/4HANA は、SAP 社の現行の ERP 製品です。データベースに SAP HANA を使い、会計・販売・購買・生産などの業務を一つのシステムで扱います。前の世代の SAP ERP 6.0 の後継です。',
    body: [
      '提供の形には、自社で運用する形と、クラウドで利用する形があります。クラウドの形では、標準機能に業務を合わせる進め方が前提になります。',
      '前の世代から移行する場合、データの持ち方と一部の機能が変わります。そのため、いまのアドオンがそのまま動くとは限りません。',
    ],
    ai: '生成AIは、設計書の作成、ABAP の作成、テストの実施、移行データの照合で使えます。導入の工程ごとの使い方は、サービスのページにまとめています。',
    service: 'requirements', see: ['sap-2027', 'fit-to-standard', 'clean-core'],
  },
  {
    slug: 'fit-to-standard', word: 'Fit to Standard', kana: 'ふぃっととぅすたんだーど', group: '導入の進め方',
    def: 'Fit to Standard とは、業務を SAP の標準機能に合わせる導入の進め方です。業務に合わせてシステムを追加開発するのではなく、標準機能で業務を行えるかを先に確かめます。',
    body: [
      '以前は、業務とシステムの差を一覧にして、差を追加開発で埋める進め方（Fit & Gap）が一般的でした。この進め方では、追加開発が増え、バージョンアップの費用も増えます。',
      'Fit to Standard では、標準機能の画面を実際に動かしながら、業務の担当者と確かめます。標準機能で行えない業務だけを、追加開発の候補にします。',
    ],
    ai: '生成AIは、判断の材料をそろえる作業で使えます。要件ごとに、対応する標準機能と、合わせた場合に変わる業務を並べます。合わせるかどうかは、人が決めます。',
    service: 'requirements', posts: ['recheck-add-ons-against-standard'], see: ['add-on', 'clean-core'],
  },
  {
    slug: 'add-on', word: 'アドオン（追加開発）', kana: 'あどおん', group: '設計と開発',
    def: 'アドオンとは、SAP の標準機能に無い機能を、追加で開発したプログラムのことです。帳票、他のシステムとの連携、独自の画面などがあります。',
    body: [
      'アドオンは、業務に合わせられる利点があります。一方で、開発と保守に費用がかかり、バージョンアップのたびに動作の確認が必要になります。',
      'アドオンの種類は、WRICEF という分類で数えるのが一般的です。',
    ],
    ai: '生成AIは、アドオンの棚卸しで効果が出ます。全件のプログラムと設計書を読み、使われていないもの、標準機能で置き換えられるものを分けます。',
    service: 'development', posts: ['recheck-add-ons-against-standard', 'check-code-against-design'], see: ['wricef', 'clean-core', 'abap'],
  },
  {
    slug: 'wricef', word: 'WRICEF', kana: 'りせふ', group: '設計と開発',
    def: 'WRICEF とは、SAP の追加開発を6つの種類に分ける呼び方です。Workflow（ワークフロー）、Report（レポート）、Interface（インターフェース）、Conversion（データ移行）、Enhancement（機能拡張）、Form（帳票）の頭文字です。',
    body: [
      '追加開発の本数と工数は、この6つの種類ごとに見積もるのが一般的です。種類によって、設計書の様式とテストの方法が違います。',
    ],
    ai: '生成AIで設計書やプログラムを作る場合も、種類ごとに様式と点検の観点を分けます。様式が決まっていないと、AIの成果物はばらつきます。',
    service: 'development', posts: ['consistent-ai-output'], see: ['add-on', 'functional-spec'],
  },
  {
    slug: 'clean-core', word: 'クリーンコア', kana: 'くりーんこあ', group: '設計と開発',
    def: 'クリーンコアとは、SAP の標準のプログラムに手を加えずに、拡張を標準の外側で行う考え方です。標準の部分をそのまま保つことで、バージョンアップを容易にします。',
    body: [
      '拡張は、SAP 社が公開している接続の仕様（API）を通して行います。SAP BTP の上で開発する方法と、S/4HANA の中で決められた範囲だけを使って開発する方法があります。',
      '以前のアドオンは、標準のプログラムを直接変更したり、公開されていない部品を使ったりしていました。そのため、バージョンアップのたびに修正が必要でした。',
    ],
    ai: '生成AIは、いまのアドオンがクリーンコアの考え方に合っているかの点検で使えます。全件のプログラムを読み、公開されていない部品を使っている箇所を取り出します。',
    service: 'development', see: ['add-on', 'btp', 's4hana'],
  },
  {
    slug: 'abap', word: 'ABAP', kana: 'あばっぷ', group: '設計と開発',
    def: 'ABAP は、SAP のシステムで使われるプログラミング言語です。SAP の標準機能の多くと、追加開発のプログラムは、ABAP で書かれています。',
    body: [
      'S/4HANA では、データの定義（CDS）と、業務の処理の枠組み（RAP）を使う開発の方式が推奨されています。',
    ],
    ai: '生成AIは、設計書から ABAP の初版を作れます。ただし、AIは設計書に無い処理を足すことがあります。プログラムの処理と設計書の対応を、処理ごとに確かめる手順が必要です。',
    service: 'development', posts: ['check-code-against-design'], see: ['add-on', 'unit-test'],
  },
  {
    slug: 'functional-spec', word: '機能設計書', kana: 'きのうせっけいしょ', group: '設計と開発',
    def: '機能設計書とは、追加開発する機能が「何をするか」を、業務の言葉で書いた設計書です。入力、処理、出力、画面や帳票の項目を定めます。',
    body: [
      '機能設計書をもとに、開発者が「どう作るか」を書いた詳細設計書を作ります。テストの仕様も、機能設計書から作ります。',
      '機能設計書に誤りや未決の事項が残ると、開発とテストで手戻りが起きます。',
    ],
    ai: '生成AIは、要件と様式から機能設計書の初版を作れます。また、全件の設計書を同じ観点で点検できます。',
    service: 'design', posts: ['review-every-document', 'consistent-ai-output'], see: ['review-viewpoint', 'wricef'],
  },
  {
    slug: 'review-viewpoint', word: 'レビューの観点', kana: 'れびゅーのかんてん', group: '設計と開発',
    def: 'レビューの観点とは、設計書やプログラムを確かめるときに「何を見るか」を決めた項目のことです。項目の定義の抜け、他の資料との食い違い、例外の処理の記載などがあります。',
    body: [
      '観点が文章になっていないと、レビューの結果は、レビューする人によって変わります。',
    ],
    ai: '生成AIに点検をさせる場合、観点を文章にすることが前提になります。観点が決まると、AIは全件を同じ基準で点検できます。',
    service: 'design', posts: ['review-every-document', 'consistent-ai-output'], see: ['functional-spec'],
  },
  {
    slug: 'traceability', word: 'トレーサビリティ', kana: 'とれーさびりてぃ', group: '導入の進め方',
    def: 'トレーサビリティとは、要件・設計書・プログラム・テストのつながりを、たどれる状態にしておくことです。ある要件を変えたときに、影響する設計書とテストが分かります。',
    body: [
      '要件・設計書・テストのつながりは、番号で表すのが一般的です。業務フローの手順、要件、設計書、テストのケースに番号を付け、互いに参照します。',
      '導入のときにつながりを作っておくと、稼働後の改修で、影響の調査にかかる日数が減ります。',
    ],
    ai: '生成AIは、番号の対応表を作る作業と、対応が切れている箇所を見つける作業で使えます。人が保つには手間がかかるため、省かれやすい作業です。',
    service: 'requirements', posts: ['number-the-steps'], see: ['sequence-diagram', 'functional-spec'],
  },
  {
    slug: 'sequence-diagram', word: 'シーケンス図', kana: 'しーけんすず', group: '導入の進め方',
    def: 'シーケンス図とは、人とシステムの間で、何がどの順に渡されるかを表した図です。縦の線が登場する人やシステム、横の矢印が渡される情報を表します。',
    body: [
      '業務フローが「誰が何をするか」を表すのに対して、シーケンス図は「システムの間で何が流れるか」を表します。連携の漏れを見つけるのに向いています。',
    ],
    ai: '生成AIは、業務フローとシーケンス図を、同じ元データから作れます。元データを一つにすると、片方だけが古くなることを防げます。',
    service: 'requirements', posts: ['number-the-steps'], see: ['traceability'],
  },
  {
    slug: 'unit-test', word: '単体テスト', kana: 'たんたいてすと', group: 'テストと移行',
    def: '単体テストとは、一つのプログラムが、設計書のとおりに動くかを確かめるテストです。開発者が、プログラムを作った直後に行います。',
    body: [
      '単体テストの仕様は、設計書から作ります。プログラムを見て仕様を作ると、設計書との食い違いは見つかりません。',
    ],
    ai: '生成AIは、設計書から単体テストの仕様とデータを作れます。',
    service: 'development', posts: ['check-code-against-design'], see: ['integration-test', 'abap'],
  },
  {
    slug: 'integration-test', word: '結合テスト', kana: 'けつごうてすと', group: 'テストと移行',
    def: '結合テストとは、複数の機能をつなげて、業務の流れのとおりに動くかを確かめるテストです。受注から出荷、請求、入金までのように、伝票が部門をまたいで流れる場面を確かめます。',
    body: [
      'SAP の導入では、モジュールの中で行うテストと、モジュールや他のシステムをまたいで行うテストに分けるのが一般的です。',
      '実施のたびに、画面の証跡を残します。証跡の整理には、実施と同じくらいの時間がかかります。',
    ],
    ai: '生成AIは、検証環境で SAP の画面を操作し、結合テストを実施できます。証跡は、手順ごとに自動で残ります。合否は人が決めます。',
    service: 'test', posts: ['ai-runs-integration-tests', 'defect-tickets-with-hypothesis'], see: ['evidence', 'uat', 'unit-test'],
  },
  {
    slug: 'evidence', word: 'テストの証跡（エビデンス）', kana: 'てすとのしょうせき', group: 'テストと移行',
    def: 'テストの証跡とは、テストを実施した結果を、あとから確かめられる形で残した記録です。入力した値、画面、出力された伝票の番号などを残します。',
    body: [
      '証跡は、合否の判定の根拠になります。監査で提出を求められることもあります。',
    ],
    ai: '生成AIがテストを実施する場合、証跡は手順ごとに自動で残ります。人が画面を保存して表に貼る作業が要らなくなります。',
    service: 'test', posts: ['ai-runs-integration-tests'], see: ['integration-test'],
  },
  {
    slug: 'uat', word: '受入テスト（UAT）', kana: 'うけいれてすと', group: 'テストと移行',
    def: '受入テストとは、業務の担当者が、実際の業務を行えるかを確かめるテストです。UAT（User Acceptance Test）とも呼びます。稼働の可否を判定する、最後のテストです。',
    body: [
      '受入テストでは、業務の担当者の時間の確保が課題になります。それまでのテストで不具合を減らしておくと、担当者は業務の確認に時間を使えます。',
    ],
    ai: '受入テストの判定は、人が行います。生成AIは、シナリオとデータの準備、不具合票の作成、修正後の再テストを受け持てます。',
    service: 'test', posts: ['defect-tickets-with-hypothesis'], see: ['integration-test', 'cutover'],
  },
  {
    slug: 'data-migration', word: 'データ移行', kana: 'でーたいこう', group: 'テストと移行',
    def: 'データ移行とは、いまのシステムのデータを、新しいシステムへ移す作業です。取引先や品目などのマスタと、残高や未完了の伝票を移します。',
    body: [
      '移行は、データの取り出し、変換、登録、照合の順に進めます。本番の移行の前に、同じ手順のリハーサルを複数回行います。',
      '変換の規則が文章になっていないと、リハーサルのたびに結果が変わります。',
    ],
    ai: '生成AIは、変換の規則を文章にする作業と、照合で合わなかった項目を理由ごとに分ける作業で使えます。',
    service: 'migration', posts: ['reconcile-all-migration-data'], see: ['reconciliation', 'master-data', 'cutover'],
  },
  {
    slug: 'reconciliation', word: '移行データの照合', kana: 'いこうでーたのしょうごう', group: 'テストと移行',
    def: '移行データの照合とは、移行の前と後で、データの件数と値が合っているかを確かめる作業です。移行のリハーサルと、本番の移行の両方で行います。',
    body: [
      '照合の方法には、一部のデータを選んで確かめる方法と、全件を確かめる方法があります。一部だけを確かめる方法では、選ばなかったデータの誤りが残ります。',
    ],
    ai: '全件の照合はプログラムで行えます。生成AIは、合わなかった項目を、変換の規則の誤り、元データの誤り、手作業の修正に分ける作業を受け持ちます。',
    service: 'migration', posts: ['reconcile-all-migration-data'], see: ['data-migration'],
  },
  {
    slug: 'master-data', word: 'マスタデータ', kana: 'ますたでーた', group: 'テストと移行',
    def: 'マスタデータとは、取引先、品目、勘定科目など、複数の伝票から繰り返し参照される基本のデータです。伝票は、マスタデータの内容を参照して作られます。',
    body: [
      'マスタの誤りは、そのマスタを使うすべての伝票に影響します。そのため、移行では、マスタの整備を伝票より先に行います。',
    ],
    ai: '生成AIは、重複の候補を見つける作業や、項目の記入の規則に合わないデータを取り出す作業で使えます。',
    service: 'migration', posts: ['reconcile-all-migration-data'], see: ['data-migration'],
  },
  {
    slug: 'cutover', word: 'カットオーバー（本番移行）', kana: 'かっとおーばー', group: 'テストと移行',
    def: 'カットオーバーとは、いまのシステムを止めて、新しいシステムでの業務を始める切り替えのことです。データの本番移行と、稼働の可否の判定を含みます。',
    body: [
      '切り替えの手順は、時刻と担当を決めた計画にまとめます。本番の前に、同じ計画でリハーサルを行います。',
    ],
    ai: '生成AIは、計画の手順の抜けの点検と、リハーサルの記録からの所要時間の集計で使えます。',
    service: 'migration', see: ['data-migration', 'uat'],
  },
  {
    slug: 'ams', word: 'AMS（運用保守）', kana: 'えーえむえす', group: '運用保守',
    def: 'AMS とは、稼働後のシステムの運用と保守を受け持つサービスです。Application Management Services の略です。問い合わせへの対応、障害の対応、改修を行います。',
    body: [
      '保守の費用の多くは、問い合わせの調査と、改修の影響の調査にかかります。どちらも、導入時の経緯を知っている人に頼る作業です。',
    ],
    ai: '生成AIは、導入時の設計書と記録を読み、回答の下書きを作れます。改修に関係する設計書・プログラム・テストを並べることもできます。',
    service: 'operations', posts: ['sap-maintenance-cost-is-search-time', 'keep-implementation-records'], see: ['traceability'],
  },
  {
    slug: 'issue-log', word: '課題管理表', kana: 'かだいかんりひょう', group: 'プロジェクト管理',
    def: '課題管理表とは、プロジェクトで解決が必要な事項を、担当と期日とともに一覧にした表です。課題ごとに、内容、担当、期日、状態を書きます。',
    body: [
      '課題は、会議やチャットの中で先に話されます。表に書く人が決まっていないと、表に無い課題が増えます。',
    ],
    ai: '生成AIは、会議とチャットの記録から、表に書かれていない課題を毎朝取り出せます。',
    service: 'project-management', posts: ['issues-missing-from-the-log'], see: ['monte-carlo', 'critical-path'],
  },
  {
    slug: 'monte-carlo', word: 'モンテカルロ法', kana: 'もんてかるろほう', group: 'プロジェクト管理',
    def: 'モンテカルロ法とは、不確かな値に幅を持たせて多数回の試算を行い、結果の分布を求める方法です。プロジェクトでは、期日に間に合う確率の計算に使います。',
    body: [
      '作業や課題ごとに、かかる日数を「早い場合・普通の場合・遅い場合」の3つで見積もります。この幅から日数を無作為に選ぶ試算を、数千回から数万回繰り返します。期日までに終わった回数の割合が、間に合う確率です。',
    ],
    ai: '生成AIは、課題表と会議の記録から、未決の課題と、解決までの日数の幅を一覧にします。この一覧が、試算の入力になります。計算は、プログラムで行います。',
    service: 'project-management', posts: ['answer-with-probability'], see: ['critical-path', 'issue-log'],
  },
  {
    slug: 'critical-path', word: 'クリティカルパス', kana: 'くりてぃかるぱす', group: 'プロジェクト管理',
    def: 'クリティカルパスとは、プロジェクトの作業のつながりのうち、全体の期間を決めている最も長い経路です。この経路の作業が1日遅れると、全体が1日遅れます。',
    body: [
      'クリティカルパスの上に無い作業には、遅れても全体に影響しない余裕があります。遅れへの対処は、クリティカルパスの上の作業から行います。',
    ],
    ai: '生成AIは、未決の課題がどの作業を止めているかを、記録から結び付けます。',
    service: 'project-management', posts: ['answer-with-probability', 'questions-pile-on-one-person'], see: ['monte-carlo'],
  },
  {
    slug: 'brownfield-greenfield', word: 'ブラウンフィールドとグリーンフィールド', kana: 'ぶらうんふぃーるど', group: '導入の進め方',
    def: 'ブラウンフィールドとグリーンフィールドは、S/4HANA への移行の2つの方式です。ブラウンフィールドは、いまのシステムの設定とデータを引き継いで変換します。グリーンフィールドは、新しいシステムを最初から作り、必要なデータだけを移します。',
    body: [
      'ブラウンフィールドは、期間が短く、業務への影響が小さい方式です。ただし、いまのアドオンと設定の課題も引き継ぎます。',
      'グリーンフィールドは、業務を標準機能に合わせて見直せる方式です。ただし、期間と費用が大きくなります。',
      '必要な部分だけを選んで移す、中間の方式もあります。',
    ],
    ai: '方式を選ぶ前の調査で、生成AIを使えます。いまのアドオンと設計書を全件読み、引き継ぐもの、やめるもの、作り直すものを分けます。',
    service: 'requirements', posts: ['sap-2027-inventory-all-add-ons', 'recheck-add-ons-against-standard'], see: ['sap-2027', 's4hana', 'fit-to-standard'],
  },
  {
    slug: 'btp', word: 'SAP BTP', kana: 'びーてぃーぴー', group: 'SAP の製品',
    def: 'SAP BTP は、SAP 社のクラウドの開発と連携の基盤です。Business Technology Platform の略です。S/4HANA の外側で、拡張の開発、他のシステムとの連携、データの分析を行います。',
    body: [
      'クリーンコアの考え方では、S/4HANA の標準のプログラムに手を加えず、拡張を BTP の上で開発します。',
    ],
    ai: 'SAP 社の生成AIの機能も、BTP を通して提供されています。',
    service: 'development', see: ['clean-core', 'joule'],
  },
  {
    slug: 'joule', word: 'SAP Joule', kana: 'じゅーる', group: 'SAP の製品',
    def: 'SAP Joule は、SAP 社が自社の製品に組み込んでいる、生成AIのアシスタントです。利用者は、文章で質問や依頼を入力して、SAP の画面の操作や情報の検索を行います。',
    body: [
      'Joule は、SAP の製品を利用する人を助けるAIです。業務の利用者に向けた機能と、開発者に向けた機能があります。',
      '一方、導入のプロジェクトで作る設計書、テスト、移行、進捗管理には、プロジェクトの資料を読むAIが別に必要です。',
    ],
    ai: 'TechTime のAIチームは、導入と保守のプロジェクトの資料を読むAIです。AIチームと Joule は役割が違うため、両方を使えます。',
    service: 'development', see: ['btp', 's4hana', 'ai-team'],
  },
  {
    slug: 'ai-team', word: 'AIチーム', kana: 'えーあいちーむ', group: '導入の進め方',
    def: 'AIチームとは、設計、開発、テスト、点検、進捗管理のそれぞれを受け持つAIを、プロジェクトの体制に組み込む形のことです。TechTime が提供しています。',
    body: [
      '一つのAIにすべてを頼むのではなく、作業ごとに、手順と点検の観点を決めたAIを置きます。人は、業務の内容と合否を決めます。',
      '手順と観点は、お客様の様式と規約に合わせて作ります。手順は、お客様のものとして残ります。',
    ],
    ai: '最初の一歩として、アセスメントを行います。プロジェクトの資料を全件読み、AIチームが効く工程を報告書にまとめます。',
    posts: ['keep-using-ai', 'measure-ai-without-counterfactual'], see: ['joule', 'traceability'],
  },
];

export const termBySlug = (s: string) => terms.find((t) => t.slug === s);
export const groups: Term['group'][] = ['導入の進め方', '設計と開発', 'テストと移行', '運用保守', 'プロジェクト管理', 'SAP の製品'];
