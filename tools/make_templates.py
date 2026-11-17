"""資料とひな形（/resources）で配る Excel のひな形を作る。 python3 tools/make_templates.py"""
import os
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter
from openpyxl.worksheet.datavalidation import DataValidation

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'downloads')
INK, PAPER2, SHU = '1C1B18', 'E9E4D7', 'D4412A'
thin = Side(style='thin', color=INK)
box = Border(left=thin, right=thin, top=thin, bottom=thin)
F = 'Yu Gothic'

def guide(wb, name, lines):
    ws = wb.active; ws.title = '使い方'
    ws['A1'] = name; ws['A1'].font = Font(name=F, size=16, bold=True)
    for i, l in enumerate(lines, start=3):
        ws.cell(row=i, column=1, value=l).font = Font(name=F, size=11)
        ws.cell(row=i, column=1).alignment = Alignment(wrap_text=True, vertical='top')
    r = len(lines) + 5
    ws.cell(row=r, column=1, value='TechTime株式会社　https://techtime-jp.com').font = Font(name=F, size=10, color='57544C')
    ws.cell(row=r + 1, column=1, value='このひな形は、自由に書き換えてお使いください。').font = Font(name=F, size=10, color='57544C')
    ws.column_dimensions['A'].width = 110

def sheet(wb, title, heads, widths, rows, blank=20, lists=None):
    ws = wb.create_sheet(title)
    for c, (h, w) in enumerate(zip(heads, widths), start=1):
        x = ws.cell(row=1, column=c, value=h)
        x.font = Font(name=F, size=10.5, bold=True, color='FFFFFF'); x.fill = PatternFill('solid', fgColor=INK)
        x.alignment = Alignment(wrap_text=True, vertical='center'); x.border = box
        ws.column_dimensions[get_column_letter(c)].width = w
    n = len(rows) + blank
    for r in range(n):
        vals = rows[r] if r < len(rows) else [''] * len(heads)
        for c, v in enumerate(vals, start=1):
            x = ws.cell(row=r + 2, column=c, value=v)
            x.font = Font(name=F, size=10.5); x.alignment = Alignment(wrap_text=True, vertical='top'); x.border = box
            if r < len(rows) and c <= 2: x.fill = PatternFill('solid', fgColor=PAPER2)
    ws.row_dimensions[1].height = 30; ws.freeze_panes = 'A2'
    for col, opts in (lists or {}).items():
        dv = DataValidation(type='list', formula1='"' + ','.join(opts) + '"', allow_blank=True)
        ws.add_data_validation(dv); dv.add(f'{col}2:{col}{n + 1}')
    return ws

# 1. 設計書レビューの観点表
wb = Workbook()
guide(wb, '設計書レビューの観点表（ひな形）', [
    '目的：設計書のレビューで「何を確かめるか」を文章にし、誰がレビューしても同じ基準で確かめられるようにします。',
    '使い方 1：「観点」のシートの12行を、自社の様式と規約に合わせて書き換えます。足りない観点は、行を足します。',
    '使い方 2：設計書ごとに「記録」のシートに1行ずつ結果を書きます。指摘が集中する観点と領域が分かります。',
    '使い方 3：観点を文章にしておくと、生成AIに同じ観点で全件を点検させることができます。',
    '関係する記事：https://techtime-jp.com/blog/review-every-document',
])
vp = [
    ['01', '項目の定義', '画面・帳票・連携の項目ごとに、型・桁・必須かどうか・初期値が書かれている。', '桁の記載が無い項目がある'],
    ['02', '処理の条件', '条件分岐の、すべての場合の処理が書かれている。「それ以外」の場合が抜けていない。', '該当なしの場合の処理が無い'],
    ['03', '例外とエラー', 'エラーになる条件と、そのときのメッセージ・処理の続行の可否が書かれている。', 'エラーのあとの処理が書かれていない'],
    ['04', '前提と起動の条件', 'いつ、誰が、何をきっかけに実行するかが書かれている。', '夜間の処理か、手動の実行かが分からない'],
    ['05', '要件との対応', '対応する要件の番号と、業務フローの手順の番号が書かれている。', '要件の番号が無い'],
    ['06', '他の資料との一致', '項目の名前と意味が、要件一覧・連携の定義・他の設計書と一致している。', '連携の定義と桁が違う'],
    ['07', '会議の決定の反映', '関係する会議の決定が、反映されている。', '決定の前の仕様のまま'],
    ['08', '用語', '同じものを、同じ言葉で呼んでいる。定義されていない略語が無い。', '「得意先」と「顧客」が混ざっている'],
    ['09', '権限', '実行できる人と、参照できる範囲が書かれている。', '権限の記載が無い'],
    ['10', '件数と性能', '想定する件数と、処理の時間の目標が書かれている。', '件数の想定が無い'],
    ['11', '移行と初期データ', '稼働の時点で必要なデータと、その用意の方法が書かれている。', '初期データの記載が無い'],
    ['12', '未決の事項', '未決の事項が、担当と期日とともに書かれている。「別途検討」のまま残っていない。', '「別途検討」に期日が無い'],
]
sheet(wb, '観点', ['番号', '観点', '確かめること', '指摘の例'], [8, 22, 70, 40], vp, blank=8)
sheet(wb, '記録', ['設計書の番号', '設計書の名前', '領域', '観点の番号', '指摘の内容', '判定', '直す担当', '期日', '状態'],
      [14, 30, 12, 12, 50, 14, 14, 12, 12], [], blank=60, lists={'F': ['直す', '直さない', '確認中'], 'I': ['未着手', '対応中', '完了']})
wb.save(os.path.join(OUT, 'techtime-design-review-viewpoints.xlsx'))

# 2. 移行データの照合の記録表
wb = Workbook()
guide(wb, '移行データの照合の記録表（ひな形）', [
    '目的：移行のリハーサルと本番で、移行の前と後のデータが合っているかを、対象ごとに記録します。',
    '使い方 1：「対象」のシートに、移行するマスタと伝票を1行ずつ書きます。件数と、金額や数量の合計を、移行の前と後で比べます。',
    '使い方 2：合わなかった項目は「合わない項目」のシートに書き、理由を3つ（変換の規則・元データ・手作業の修正）に分けます。',
    '使い方 3：リハーサルのたびに、シートを複製して記録します。回を追って、合わない件数が減っているかを確かめます。',
    '関係する記事：https://techtime-jp.com/blog/reconcile-all-migration-data',
])
ex = [['取引先マスタ（例）', 'マスタ', 12840, 12840, '=D2-C2', '', '', '', '一致'], ['未決済の債権（例）', '伝票', 3215, 3209, '=D3-C3', 184250000, 183990000, '=G3-F3', '調査中']]
sheet(wb, '対象', ['対象', '種類', '件数（移行前）', '件数（移行後）', '件数の差', '合計（移行前）', '合計（移行後）', '合計の差', '判定'],
      [30, 10, 16, 16, 12, 18, 18, 14, 12], ex, blank=30, lists={'B': ['マスタ', '伝票', '残高'], 'I': ['一致', '調査中', '差を承認']})
sheet(wb, '合わない項目', ['対象', 'キー（番号）', '項目', '移行前の値', '移行後の値', '理由の分類', '理由の説明', '直す担当', '状態'],
      [24, 18, 18, 20, 20, 16, 40, 14, 12], [], blank=60, lists={'F': ['変換の規則', '元データ', '手作業の修正', '調査中'], 'I': ['未着手', '対応中', '完了']})
wb.save(os.path.join(OUT, 'techtime-migration-reconciliation.xlsx'))

# 3. 会議の決定と未決の記録表
wb = Workbook()
guide(wb, '会議の決定と未決の記録表（ひな形）', [
    '目的：会議で決まったことを、要件一覧や設計書に反映するまで追いかけます。決まらなかった議題は、理由と一緒に残します。',
    '使い方 1：会議の前に、議題ごとに「何を決めたら終わるか」を書きます。',
    '使い方 2：会議のあと、決定か未決かを書きます。決定には、反映する資料と担当を書きます。未決には、決まらなかった理由と、次に決める日を書きます。',
    '使い方 3：週に一度、「反映の状態」が完了になっていない行を確かめます。',
    '関係する記事：https://techtime-jp.com/blog/decisions-that-never-reach-the-design',
])
ex = [['2026/11/10', '販売の要件検討', '与信の確認を行う時点', '受注の登録時か、出荷の指示時かを決める', '決定', '受注の登録時に行う', '', '要件一覧 R-012、設計書 D-034', '（担当者）', '2026/11/14', '未着手']]
sheet(wb, '決定と未決', ['会議の日', '会議の名前', '議題', '何を決めたら終わるか', '結果', '決定の内容', '未決の理由と、次に決める日', '反映する資料', '反映の担当', '反映の期日', '反映の状態'],
      [12, 20, 26, 34, 10, 36, 34, 30, 14, 12, 12], ex, blank=60, lists={'E': ['決定', '未決', '取り下げ'], 'K': ['未着手', '対応中', '完了', '対象外']})
wb.save(os.path.join(OUT, 'techtime-meeting-decisions.xlsx'))
print(sorted(os.listdir(OUT)))
