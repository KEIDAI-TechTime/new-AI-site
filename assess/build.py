"""アセスメント結果報告書（サンプル）の HTML を作る。数字は sim.py が出した data.json から取る。
使い方: python3 build.py data.json report.html
"""
import json, sys, html

D = json.load(open(sys.argv[1]))
S, E, A, F, T = D['sched'], D['effort'], D['ask'], D['find'], D['trust']
V = D['save']
INK, INK2, LINE, SHU, PAPER, PAPER2 = '#1c1b18', '#57544c', '#b9b3a3', '#d4412a', '#f2eee4', '#e9e4d7'
pc = lambda v, d=0: f'{v * 100:.{d}f}'
num = lambda v: f'{v:,.0f}'
pages = []


def page(part, kicker, title, body, lead='', cta=False, cls=''):
    pages.append(dict(part=part, kicker=kicker, title=title, body=body, lead=lead, cta=cta, cls=cls))


# ------------------------------------------------------------ 図
def hist_svg(edges, hs, labels, colors, w=560, h=340, deadline=0.0, unit='営業日'):
    """同じ横軸で、分布を上下に並べる。"""
    n = len(hs); gh = (h - 46) / n; x0, x1 = 44, w - 14
    lo, hi = edges[0], edges[-1]; sx = lambda v: x0 + (v - lo) / (hi - lo) * (x1 - x0)
    mx = max(max(a) for a in hs) * 1.12
    o = [f'<svg viewBox="0 0 {w} {h}" class="ch">']
    for k, (hh, lab, col) in enumerate(zip(hs, labels, colors)):
        top = 8 + k * gh; base = top + gh - 14
        o.append(f'<rect x="{sx(deadline):.1f}" y="{top:.1f}" width="{x1 - sx(deadline):.1f}" height="{base - top:.1f}" fill="{SHU}" opacity=".10"/>')
        for i, v in enumerate(hh):
            bh = v / mx * (gh - 30); xa, xb = sx(edges[i]), sx(edges[i + 1])
            late = edges[i] >= deadline
            o.append(f'<rect x="{xa + 1:.1f}" y="{base - bh:.1f}" width="{xb - xa - 2:.1f}" height="{bh:.1f}" fill="{SHU if (late and col == "auto") else (INK if col == "auto" else col)}"/>')
        o.append(f'<line x1="{x0}" y1="{base:.1f}" x2="{x1}" y2="{base:.1f}" stroke="{INK}" stroke-width="1"/>')
        o.append(f'<line x1="{sx(deadline):.1f}" y1="{top:.1f}" x2="{sx(deadline):.1f}" y2="{base:.1f}" stroke="{SHU}" stroke-width="1.4" stroke-dasharray="4 3"/>')
        o.append(f'<text x="{x0}" y="{top + 11:.1f}" class="cl b">{lab}</text>')
        if k == 0: o.append(f'<text x="{x1 - 4:.1f}" y="{top + 11:.1f}" text-anchor="end" class="cl" fill="{SHU}">期日より後</text>')
    base = 8 + n * gh - 14
    for v in range(int(lo), int(hi) + 1, 4):
        o.append(f'<line x1="{sx(v):.1f}" y1="{base:.1f}" x2="{sx(v):.1f}" y2="{base + 4:.1f}" stroke="{INK}"/><text x="{sx(v):.1f}" y="{base + 16:.1f}" text-anchor="middle" class="cl m">{"期日" if v == 0 else f"{v:+d}"}</text>')
    o.append(f'<text x="{x1}" y="{h - 4}" text-anchor="end" class="cl">出口判定の期日との差（{unit}）</text></svg>')
    return ''.join(o)


def bars_h(rows, w=520, rowh=24, maxv=None, fmt=lambda v: f'{v:.1f}', label_w=250, hot=3, unit=''):
    maxv = maxv or max(r[1] for r in rows); h = len(rows) * rowh + 6
    o = [f'<svg viewBox="0 0 {w} {h}" class="ch">']
    for i, (lab, v) in enumerate(rows):
        y = i * rowh + 4; bw = max(1.5, v / maxv * (w - label_w - 64))
        col = SHU if i < hot else INK
        o.append(f'<text x="0" y="{y + 14}" class="cl{" b" if i < hot else ""}">{lab}</text>')
        o.append(f'<rect x="{label_w}" y="{y + 3}" width="{bw:.1f}" height="{rowh - 9}" fill="{col}"/>')
        o.append(f'<text x="{label_w + bw + 6:.1f}" y="{y + 14}" class="cl m b" fill="{col}">{fmt(v)}{unit}</text>')
    o.append('</svg>'); return ''.join(o)


def effort_svg(w=560, h=330):
    ed, hh = E['edges'], E['h']; x0, x1, base = 30, w - 14, h - 34
    lo, hi = ed[0], ed[-1]; sx = lambda v: x0 + (v - lo) / (hi - lo) * (x1 - x0); mx = max(hh) * 1.15
    o = [f'<svg viewBox="0 0 {w} {h}" class="ch">']
    o.append(f'<rect x="{sx(E["budget"]):.1f}" y="10" width="{x1 - sx(E["budget"]):.1f}" height="{base - 10}" fill="{SHU}" opacity=".10"/>')
    for i, v in enumerate(hh):
        xa, xb = sx(ed[i]), sx(ed[i + 1]); bh = v / mx * (base - 34)
        o.append(f'<rect x="{xa + 1:.1f}" y="{base - bh:.1f}" width="{xb - xa - 2:.1f}" height="{bh:.1f}" fill="{SHU if ed[i] >= E["budget"] else INK}"/>')
    o.append(f'<line x1="{x0}" y1="{base}" x2="{x1}" y2="{base}" stroke="{INK}"/>')
    for key, lab, dy in [('plan', '見積もりの合計', 22), ('budget', '予算（予備10%込み）', 22)]:
        x = sx(E[key]); col = SHU if key == 'budget' else INK
        o.append(f'<line x1="{x:.1f}" y1="14" x2="{x:.1f}" y2="{base}" stroke="{col}" stroke-width="1.4" stroke-dasharray="4 3"/>')
        anchor = 'end' if key == 'plan' else 'start'; dx = -5 if key == 'plan' else 5
        o.append(f'<text x="{x + dx:.1f}" y="{dy}" text-anchor="{anchor}" class="cl b" fill="{col}">{lab}</text><text x="{x + dx:.1f}" y="{dy + 13}" text-anchor="{anchor}" class="cl m" fill="{col}">{num(E[key])} 人日</text>')
    v = int(lo // 200 * 200)
    while v <= hi:
        if v >= lo: o.append(f'<line x1="{sx(v):.1f}" y1="{base}" x2="{sx(v):.1f}" y2="{base + 4}" stroke="{INK}"/><text x="{sx(v):.1f}" y="{base + 16}" text-anchor="middle" class="cl m">{v:,}</text>')
        v += 200
    o.append(f'<text x="{x1}" y="{h - 3}" text-anchor="end" class="cl">追加開発 {E["n"]}本の工数の合計（人日）</text></svg>')
    return ''.join(o)


def effort2_svg(w=560, h=360):
    """いまのままと、AIチームを組み込んだ場合の工数の分布を上下に並べる。"""
    ed = V['edges']; x0, x1 = 30, w - 14; lo, hi = ed[0], ed[-1]; sx = lambda v: x0 + (v - lo) / (hi - lo) * (x1 - x0)
    gh = (h - 46) / 2; mx = max(max(V['h_as']), max(V['h_ai'])) * 1.15
    o = [f'<svg viewBox="0 0 {w} {h}" class="ch">']
    for k, (hh, lab, med, col) in enumerate([(V['h_as'], 'いまのまま', V['med_as'], INK), (V['h_ai'], 'AIチームを組み込んだ場合', V['med_ai'], SHU)]):
        top = 8 + k * gh; base = top + gh - 14
        o.append(f'<rect x="{sx(V["budget"]):.1f}" y="{top:.1f}" width="{x1 - sx(V["budget"]):.1f}" height="{base - top:.1f}" fill="{INK}" opacity=".07"/>')
        for i, v in enumerate(hh):
            if v <= 0: continue
            xa, xb = sx(ed[i]), sx(ed[i + 1]); bh = v / mx * (gh - 34)
            o.append(f'<rect x="{xa + 0.8:.1f}" y="{base - bh:.1f}" width="{xb - xa - 1.6:.1f}" height="{bh:.1f}" fill="{col}"/>')
        o.append(f'<line x1="{x0}" y1="{base:.1f}" x2="{x1}" y2="{base:.1f}" stroke="{INK}"/>')
        o.append(f'<line x1="{sx(V["budget"]):.1f}" y1="{top:.1f}" x2="{sx(V["budget"]):.1f}" y2="{base:.1f}" stroke="{INK}" stroke-width="1.3" stroke-dasharray="4 3"/>')
        o.append(f'<text x="{x0}" y="{top + 12:.1f}" class="cl b" fill="{col}">{lab}　中央の値 {num(med)} 人日</text>')
        if k == 0: o.append(f'<text x="{sx(V["budget"]) + 5:.1f}" y="{top + 12:.1f}" class="cl b">予算 {num(V["budget"])} 人日</text>')
    base = 8 + 2 * gh - 14; v = int(lo // 400 * 400)
    while v <= hi:
        if v >= lo: o.append(f'<line x1="{sx(v):.1f}" y1="{base:.1f}" x2="{sx(v):.1f}" y2="{base + 4:.1f}" stroke="{INK}"/><text x="{sx(v):.1f}" y="{base + 16:.1f}" text-anchor="middle" class="cl m">{v:,}</text>')
        v += 400
    xa, xb, ya = sx(V['med_ai']), sx(V['med_as']), 8 + gh + 34
    o.append(f'<line x1="{xa:.1f}" y1="{ya:.1f}" x2="{xb:.1f}" y2="{ya:.1f}" stroke="{SHU}" stroke-width="2"/><path d="M{xa + 8:.1f} {ya - 5:.1f}L{xa:.1f} {ya:.1f}L{xa + 8:.1f} {ya + 5:.1f}" fill="none" stroke="{SHU}" stroke-width="2"/>')
    o.append(f'<text x="{(xa + xb) / 2:.1f}" y="{ya - 6:.1f}" text-anchor="middle" class="cl b" fill="{SHU}">減る工数 {num(V["save_med"])} 人日</text>')
    o.append(f'<text x="{x1}" y="{h - 4}" text-anchor="end" class="cl">追加開発 {E["n"]}本の工数の合計（人日）</text></svg>')
    return ''.join(o)


def sens_svg(rows, w=520, rowh=34, label_w=190):
    """1つの前提だけを動かしたときに、減る工数がどれだけ変わるか。"""
    m = max(max(abs(r['lo']), abs(r['hi'])) for r in rows) * 1.25; cx = label_w + (w - label_w) / 2; half = (w - label_w) / 2 - 8
    h = len(rows) * rowh + 26
    o = [f'<svg viewBox="0 0 {w} {h}" class="ch">', f'<line x1="{cx}" y1="14" x2="{cx}" y2="{h - 4}" stroke="{INK}"/>',
         f'<text x="{cx - 6}" y="10" text-anchor="end" class="cl">減る工数が少なくなる</text><text x="{cx + 6}" y="10" class="cl" fill="{SHU}">減る工数が増える</text>']
    for i, r in enumerate(rows):
        y = 20 + i * rowh; a, b = r['lo'] / m * half, r['hi'] / m * half
        o.append(f'<text x="0" y="{y + 15}" class="cl{" b" if i < 2 else ""}">{r["name"]}</text>')
        o.append(f'<rect x="{cx + a:.1f}" y="{y + 3}" width="{-a:.1f}" height="{rowh - 12}" fill="{INK}"/><text x="{cx + a - 5:.1f}" y="{y + 15}" text-anchor="end" class="cl m">{r["lo"]:+.0f}</text>')
        if b > 0: o.append(f'<rect x="{cx:.1f}" y="{y + 3}" width="{b:.1f}" height="{rowh - 12}" fill="{SHU}"/><text x="{cx + b + 5:.1f}" y="{y + 15}" class="cl m" fill="{SHU}">{r["hi"]:+.0f}</text>')
    o.append('</svg>'); return ''.join(o)


def ico(kind):
    p = {
        'doc': '<path d="M9 4h14l8 8v24H9z"/><path d="M23 4v8h8"/><path d="M14 19h12M14 25h12M14 31h7"/>',
        'talk': '<path d="M5 8h24v16H16l-7 6v-6H5z"/><path d="M33 16h3v14h-4v5l-6-5h-6"/>',
        'ai': '<circle cx="20" cy="20" r="14"/><text x="20" y="25" text-anchor="middle" font-size="12" font-family="DM Mono" fill="currentColor" stroke="none">AI</text>',
        'flow': '<rect x="4" y="6" width="12" height="9"/><rect x="24" y="15" width="12" height="9"/><rect x="4" y="25" width="12" height="9"/><path d="M16 10h14v5M24 20H10v5"/>',
        'list': '<path d="M6 8h28v24H6z"/><path d="M6 16h28M6 24h28M15 8v24"/>',
        'check': '<path d="M6 6h28v28H6z"/><path d="M12 21l6 6 11-13"/>',
        'human': '<circle cx="20" cy="13" r="6"/><path d="M7 35c0-8 6-12 13-12s13 4 13 12"/>',
        'link': '<rect x="3" y="15" width="10" height="10"/><rect x="15" y="15" width="10" height="10"/><rect x="27" y="15" width="10" height="10"/><path d="M13 20h2M25 20h2"/>',
        'gate': '<path d="M6 34V10l14-6 14 6v24"/><path d="M14 34V18h12v16"/>',
    }[kind]
    return f'<svg viewBox="0 0 40 40" class="ic">{p}</svg>'


# ------------------------------------------------------------ 紙面
P0, P3 = S['p0'], S['p3']
tor = S['tornado']; kname = {t['id']: t['name'] for t in tor}
top3 = [next(t for t in tor if t['id'] == i) for i in S['top3']]
mig = next(h for h in A['heat'] if h['topic'] == '移行データ')['cells']
tab = F['tab']; col_tot = [sum(r[j] for r in tab) for j in range(len(F['kinds']))]
n_conflict = col_tot[2]

# 表紙
pages.append(dict(cover=True))

page('はじめに', 'この資料について', 'アセスメントを受けると、何が手元に届くのか。',
     f'''<div class="g2">
  <div>
    <p class="p">この資料は、TechTime が行っている「AIチーム導入アセスメント」の結果報告書のサンプルです。報告書の構成と、分析の深さをそのまま見ていただけるよう、実際にお渡しする報告書と同じ形で作りました。</p>
    <p class="p">題材は架空の会社です。会社、人物、資料、課題、数字はすべてこの資料のために作りました。統計の解析は、置いた設定値から実際に計算しています。計算の方法は付録に書きました。</p>
    <div class="note"><b>貴社の資料で、同じ分析を行います。</b>設計書の様式や会議の記録をお預かりし、どの工程に AIチームが効くか、何から始めるかを報告書にしてお返しします。詳しくは最後の頁をご覧ください。</div>
  </div>
  <div>
    <table class="t kv"><tbody>
      <tr><th>題材（架空）</th><td>A社　産業機械メーカー。国内に3工場</td></tr>
      <tr><th>プロジェクト</th><td>SAP S/4HANA の導入。販売・購買・生産・会計・原価の5領域</td></tr>
      <tr><th>いまの工程</th><td>要件定義の4か月目。出口判定は12月18日</td></tr>
      <tr><th>体制</th><td>約60名（お客様 約25名、導入の会社 約35名）</td></tr>
      <tr><th>アセスメントの断面</th><td>10月30日。出口判定まで35営業日</td></tr>
      <tr><th>報告書の読み手</th><td>プロジェクトの責任者と、各領域のリーダー</td></tr>
    </tbody></table>
    <p class="fn">「AIチーム」は、進捗管理・設計・開発・テスト・点検をそれぞれ受け持つ AI を、手順と点検の観点を持たせてプロジェクトに組み込んだものを指します。</p>
  </div>
</div>''')

page('1　結論', '結論', '出口判定に間に合う確率は 31%。3つの課題を先に片付けると 65% になる。',
     f'''<div class="g3 ans">
  <div class="ansc"><p class="q"><b>問い 1</b>どこに AIチームが効くか</p>
    <p class="ansa">会議の決定を資料に戻す作業と、設計書の全件の点検。</p>
    <p class="p">会議で決まったのに要件一覧が古いままの要件が 38件あります。機能記述書 {F['n_docs']}本を全件点検すると、指摘は {F['total']}件でした。人の抜き取りでは 13本しか見られていません。</p></div>
  <div class="ansc"><p class="q"><b>問い 2</b>何から始めるか</p>
    <p class="ansa">移行データの2つの課題と、部品表の版の持ち方。</p>
    <p class="p">出口判定の遅れの {pc(S['crit'][0]['share'])}% は、移行データの流れが決めています。効き目の大きい3つ（{'・'.join(S['top3'])}）を先に決めると、間に合う確率が {pc(P0)}% から {pc(P3)}% に上がります。</p></div>
  <div class="ansc"><p class="q"><b>問い 3</b>何が変わるか</p>
    <p class="ansa">決めることが、毎朝そろった状態で届く。</p>
    <p class="p">問いの {pc(A['top_share'])}% が1人に集まり、移行データの問いは直近の週で {mig[-1]['a']}件しか答えが出ていません（{mig[-1]['n']}件中）。AIチームが記録を読んで下書きまで作り、人は決めるだけにします。</p></div>
</div>
<div class="strip"><div><span>読んだ資料</span><b>7種類</b></div><div><span>全件を点検した記述書</span><b>{F['n_docs']}本</b></div><div><span>見つかった指摘</span><b>{F['total']}件</b></div><div><span>期日に間に合う確率</span><b>{pc(P0)}% → {pc(P3)}%</b></div><div><span>AIの読み取りの一致</span><b>{pc(T['agree'], 1)}%</b></div><div><span>減る工数の見込み</span><b>{num(V['save_med'])}人日</b></div></div>''',
     cta=True)

read = [('業務フロー', '48本', '図の中の手順と、手順どうしのつながり'), ('機能記述書', f'{F["n_docs"]}本', '全件。8つの観点で点検'), ('要件一覧', f'{T["n"]}件', '全件。状態と、会議の決定との食い違い'),
        ('会議の記録', '86本（約130時間）', '決まったこと、決まっていないこと、宿題'), ('課題表', '214件', '期日、担当、止まっている日数'), ('チャットの投稿', f'{num(A["posts"])}件（{A["threads"]}スレッド・{A["weeks"]}週間）', '誰が誰に問い、答えが出たか'),
        ('追加開発の見積もり', f'{E["n"]}本', '工数と、前提にしている要件')]
page('2　読んだもの', '読んだもの', '抜き取りではなく、預かった資料をすべて読んだ。',
     '<div class="g2 g2--w"><table class="t"><thead><tr><th>資料</th><th>量</th><th>何を読み取ったか</th></tr></thead><tbody>' +
     ''.join(f'<tr><td class="b">{a}</td><td class="m">{b}</td><td>{c}</td></tr>' for a, b, c in read) +
     f'''</tbody></table>
<div><div class="card"><p class="ck">読み方</p><ol class="ol"><li>AIがすべての資料を読み、決定・未決・食い違い・指摘を拾う。</li><li>同じ資料をもう一度読ませ、2回の結果を比べる。食い違った所は人が確かめる。</li><li>拾った結果のうち 60件を人が抜き取って、元の資料と照らす。</li><li>解析の結果を、プロジェクトのリーダーに見てもらい、事実と違う所を直す。</li></ol></div>
<p class="fn">読んでいないもの：契約書、個人の評価に関わる資料、本番のデータ。チャットは、プロジェクトの公開のチャンネルだけを対象にしました。個人あてのメッセージは読んでいません。</p></div></div>''',
     lead='全件を読むので、「たまたま見た資料がそうだった」という結論になりません。何をどこまで読んだかを最初に示します。')

# 地図
roles = ['進捗管理のAI', '設計のAI', '開発のAI', 'テストのAI', '点検のAI']
grid = [('要件定義', ['◎|課題とリスクを毎朝拾う', '◎|業務の流れとシーケンス図を起こす', '―|', '―|', '◎|要件一覧と会議の決定を照らす']),
        ('設計', ['◎|設計の残りと止まりを数える', '◎|様式に沿って初版を起こす', '○|設計の途中で動きを試す', '―|', '◎|全件を8つの観点で点検']),
        ('開発', ['○|進み具合を記録から集める', '○|変更を設計書に戻す', '◎|ABAP と単体テストを起こす', '○|単体テストのデータを作る', '◎|規約と設計書との対応']),
        ('テスト', ['◎|不具合の傾向を毎日まとめる', '―|', '○|不具合の直し方の下書き', '◎|画面を操作して実施し証跡を残す', '◎|結果と期待値を全件で照らす']),
        ('移行', ['○|移行の課題を拾う', '―|', '◎|変換と照合の道具を作る', '○|移行後のデータで流す', '◎|全件を変換し全件を照合']),
        ('運用保守', ['○|問い合わせの傾向をまとめる', '○|改修の影響する範囲を出す', '○|改修の下書き', '○|改修後の確認を流す', '○|夜間の処理を見張る'])]
def cell(c):
    mk, tx = c.split('|'); k = {'◎': 'a', '○': 'b', '―': 'c'}[mk]
    return f'<td class="mp mp--{k}"><b>{mk}</b><span>{tx}</span></td>'
page('3　現在地の地図', '現在地の地図', '6つの工程 × 5つの AI。効く所と、効かない所。',
     '<table class="t map"><thead><tr><th></th>' + ''.join(f'<th>{r}</th>' for r in roles) + '</tr></thead><tbody>' +
     ''.join(f'<tr class="{"now" if ph == "要件定義" else ""}"><th>{ph}{"<i>いまここ</i>" if ph == "要件定義" else ""}</th>' + ''.join(cell(c) for c in cs) + '</tr>' for ph, cs in grid) +
     '''</tbody></table>
<div class="legend"><span><b class="mk a">◎</b>AIが受け持てる。A社の資料で確かめた</span><span><b class="mk b">○</b>一部を受け持てる。前の工程の成果物の形による</span><span><b class="mk c">―</b>AIの出番がない</span></div>''',
     lead='AIチームが受け持てる作業を、工程ごとに並べました。運用保守の行がすべて「一部」なのは、導入の記録がどんな形で残るかで決まるからです。')

page('3　現在地の地図', '現在地の地図', 'AIが受け持たないことを、先に決めておく。',
     '''<div class="g2"><div><p class="ck">AIチームが受け持たないこと</p><table class="t"><tbody>
<tr><td class="b">業務のあり方を決める</td><td>受注から請求までをどう進めるかは、業務の方が決めます。AIは、決めるための材料を並べます。</td></tr>
<tr><td class="b">作るか、作らないかを決める</td><td>追加開発にするか標準に合わせるかは、お客様と PM が決めます。</td></tr>
<tr><td class="b">合否を決める</td><td>テストの合否と、工程の出口の判定は人が行います。</td></tr>
<tr><td class="b">本番の環境を操作する</td><td>AIが画面を操作するのは、検証の環境だけです。</td></tr>
<tr><td class="b">社外との合意</td><td>連携先の会社との取り決めは、人が行います。</td></tr></tbody></table></div>
<div><p class="ck">A社で、いまから着手できること</p><table class="t"><thead><tr><th>着手できること</th><th>材料</th><th>状態</th></tr></thead><tbody>
<tr><td class="b">会議の決定を要件一覧に戻す</td><td>会議の記録 86本</td><td><span class="st st--a">そろっている</span></td></tr>
<tr><td class="b">機能記述書の全件の点検</td><td>記述書 61本、様式</td><td><span class="st st--a">そろっている</span></td></tr>
<tr><td class="b">課題とリスクを毎朝拾う</td><td>チャット、課題表</td><td><span class="st st--a">そろっている</span></td></tr>
<tr><td class="b">業務の流れに番号を付け、要件とつなぐ</td><td>業務フロー 48本</td><td><span class="st st--b">図の描き直しが要る</span></td></tr>
<tr><td class="b">追加開発の候補の見直し</td><td>見積もり 96本</td><td><span class="st st--b">前提の要件が未決</span></td></tr>
<tr><td class="b">設計書の初版づくり</td><td>設計書の様式</td><td><span class="st st--c">様式がこれから</span></td></tr></tbody></table></div></div>''',
     lead='AIに任せる範囲を広げるほど、人が決める所をはっきりさせておく必要があります。A社では次の線引きを提案します。')

# 数字で見た現在地 1：期日
page('4　数字で見た現在地', '解析 1　期日に間に合う確率', f'いまのままでは、出口判定に間に合う確率は {pc(P0)}%。',
     f'''<div class="g2 g2--w"><div>{hist_svg(S['edges'], [S['h0'], S['h3']], [f'いまのまま　間に合う確率 {pc(P0)}%', f'効き目の大きい3つを先に決めた場合　{pc(P3)}%'], ['auto', 'auto'])}
<p class="fn">未決の課題 12件それぞれに、遅れの見込みを「早い・普通・遅い」の3点で置き、{num(D['meta']['trials'])}通りの進み方を試した結果です。棒の高さは、その日に終わる進み方の割合です。</p></div>
<div><p class="ck">どの課題を先に決めると、確率が上がるか</p>{bars_h([(f"{t['id']}　{t['name']}", t['up'] * 100) for t in tor[:8]], w=520, label_w=330, rowh=30, fmt=lambda v: f'+{v:.1f}', unit='pt')}
<table class="t sm"><tbody><tr><th>遅れを決めている流れ</th>{''.join(f"<td><b class='m'>{pc(c['share'])}%</b> {c['stream']}</td>" for c in S['crit'][:4])}</tr>
<tr><th>半分の進み方で終わる日</th><td colspan="2">期日の <b class="m">{S['p50']:+.1f}</b> 営業日</td><td colspan="2">3つを決めた場合 <b class="m">{S['p50b']:+.1f}</b> 営業日</td></tr></tbody></table></div></div>''',
     lead=f'12件の未決の課題のうち、効き目が大きいのは上の3件です。残りの9件を先に片付けても、確率はほとんど上がりません。')

page('4　数字で見た現在地', '解析 2　追加開発の工数のばらつき', f'追加開発が予算を超える確率は {pc(E["p_over"])}%。ばらつきの {pc(E["hi_share"])}% は 22本から。',
     f'''<div class="g2 g2--w"><div>{effort_svg()}
<table class="t sm"><tbody><tr><th>半分の進み方での合計</th><td class="m b">{num(E['p50'])} 人日</td><th>8割の進み方が収まる合計</th><td class="m b">{num(E['p80'])} 人日</td><th>9割</th><td class="m b">{num(E['p90'])} 人日</td></tr></tbody></table>
<p class="fn">1本ごとの工数を「少ない・見積もりどおり・多い」の3点で置きました。前提の要件が未決の 22本は、多い側を見積もりの 2.3倍までとしています。</p></div>
<div><p class="ck">ばらつきへの効き目が大きい機能</p><table class="t sm"><thead><tr><th>番号</th><th>機能</th><th>規模</th><th>見積もり</th><th>8割が収まる値</th><th>効き目</th></tr></thead><tbody>''' +
     ''.join(f"<tr><td class='m'>{t['id']}</td><td class='b'>{t['name']}</td><td>{t['size']}</td><td class='m r'>{t['base']:.0f}</td><td class='m r'>{t['p80']:.0f}</td><td class='m r {'hot' if i < 3 else ''}'>{pc(t['share'], 1)}%</td></tr>" for i, t in enumerate(E['top'])) +
     f'''</tbody></table><p class="fn">効き目＝合計のばらつきのうち、その機能が占める割合。単位は人日。</p></div></div>''',
     lead='見積もりの合計は予算に収まっています。超える恐れを作っているのは、前提の要件がまだ決まっていない機能です。先に要件を決めれば、ばらつきは縮みます。')

mx_q = A['people'][0]['n']
heat_rows = ''
for hrow in A['heat']:
    tds = ''
    for c in hrow['cells']:
        r = c['a'] / c['n']; op = max(0.0, (0.85 - r) / 0.7)
        tds += f'<td class="hm" style="background:rgba(212,65,42,{op:.2f});color:{"#fff" if op > .55 else INK}">{c["a"]}/{c["n"]}</td>'
    heat_rows += f'<tr><th>{hrow["topic"]}</th>{tds}</tr>'
page('4　数字で見た現在地', '解析 3　問いの集まり方', f'問いの {pc(A["top_share"])}% が1人に集まり、移行データの答えが止まり始めている。',
     f'''<div class="g2"><div><p class="ck">問いを受けた回数（{A['threads']}スレッド・上位10人）</p>{bars_h([(p['name'], p['n']) for p in A['people'][:10]], w=520, label_w=170, rowh=21, fmt=lambda v: f'{v:.0f}', hot=1, unit='件')}
<p class="fn">18人に均等に問いが来るとした場合、いちばん多い人でも全体の {pc(A['null_p95'], 1)}% を超えることは 20回に1回もありません。実際は {pc(A['top_share'], 1)}% で、偶然では説明できない集まり方です。</p></div>
<div><p class="ck">答えが出た問い ／ 出された問い（話題 × 週）</p><table class="t heat"><thead><tr><th></th>{''.join(f'<th>{i + 1}週</th>' for i in range(A['weeks']))}</tr></thead><tbody>{heat_rows}</tbody></table>
<table class="t sm"><tbody><tr><th>答えが出るまでの日数</th><td>半分の問いは <b class="m">{A['wait_med']:.1f}</b> 営業日以内</td><td>遅い方の2割は <b class="m hot">{A['wait_p80']:.1f}</b> 営業日以上</td></tr></tbody></table>
<p class="fn">「答えが出た」は、5営業日以内に、問いに対する決定か回答がスレッドに書かれたものを数えました。色が濃いほど、答えが出ていません。</p></div></div>''',
     lead='誰の働きぶりを見るための解析ではありません。問いが集まりすぎている所と、答えが止まっている話題を見つけて、手を打つために使います。')

res = F['resid']
ftab = ''
for i, a in enumerate(F['areas']):
    ftab += f'<tr><th>{a}<i>{F["docs"][i]}本</i></th>' + ''.join(f'<td class="m r {"hotc" if res[i][j] >= 2 else ""}">{tab[i][j]}{"<u>偏り</u>" if res[i][j] >= 2 else ""}</td>' for j in range(len(F['kinds']))) + f'<td class="m r b">{sum(tab[i])}</td><td class="m r">{F["per_doc"][i]}</td></tr>'
page('4　数字で見た現在地', '解析 4　点検の指摘の偏り', f'指摘 {F["total"]}件は均等ではない。生産と原価に、偶然では説明できない偏りがある。',
     f'''<table class="t ft"><thead><tr><th>領域</th>{''.join(f'<th>{k}</th>' for k in F['kinds'])}<th>計</th><th>1本あたり</th></tr></thead><tbody>{ftab}
<tr class="tot"><th>計</th>{''.join(f'<td class="m r">{c}</td>' for c in col_tot)}<td class="m r b">{F['total']}</td><td class="m r">{F['total'] / F['n_docs']:.1f}</td></tr></tbody></table>
<div class="g3 mt"><div class="card"><p class="ck">生産 × 項目の定義の抜け</p><p class="big">{tab[2][0]}<small>件</small></p><p class="p">部品表と作業手順の項目に、桁数と必須かどうかの記載がありません。移行データの課題 K-01 と同じ根です。</p></div>
<div class="card"><p class="ck">原価 × 前提の記載なし</p><p class="big">{tab[4][4]}<small>件</small></p><p class="p">配賦の基準が決まっていないまま（K-04）、記述書が先に書かれています。基準が決まると書き直しになります。</p></div>
<div class="card"><p class="ck">購買 × 例外の記載なし</p><p class="big">{tab[1][1]}<small>件</small></p><p class="p">承認経路の例外（K-07）が洗い出されていないため、例外の処理が書かれていません。</p></div></div>
<p class="fn">領域と指摘の種類が無関係だとした場合に、これだけの偏りが出る確率は {F['p_value'] * 100:.2f}% です（{num(D['meta']['trials'])}回の試算）。「偏り」の印は、その組み合わせだけで見ても多いと言える所に付けました。</p>''',
     lead=f'機能記述書 {F["n_docs"]}本を、8つの観点で全件点検しました。指摘の多い所は、未決の課題とつながっています。')

cm = T['cm']
cmt = ''.join(f'<tr><th>{T["classes"][i]}</th>' + ''.join(f'<td class="m r {"diag" if i == j else ("off" if cm[i][j] else "")}">{cm[i][j]}</td>' for j in range(4)) + '</tr>' for i in range(4))
page('4　数字で見た現在地', '読み取りの確かさ', f'AIに2回読ませて、{pc(T["agree"], 1)}% が同じ結果。食い違った {T["differ"]}件は人が確かめた。',
     f'''<div class="g2"><div><p class="ck">要件 {T['n']}件の振り分け（1回目 × 2回目）</p><table class="t cm"><thead><tr><th>1回目＼2回目</th>{''.join(f'<th>{c}</th>' for c in T['classes'])}</tr></thead><tbody>{cmt}</tbody></table>
<p class="fn">対角線の上が、2回とも同じ振り分けになった件数です。</p></div>
<div><div class="g2 trust"><div class="card"><p class="ck">2回の一致</p><p class="big">{pc(T['agree'], 1)}<small>%</small></p><p class="p">偶然の一致を除いた指標では {T['kappa']:.2f}（1 が完全な一致）。</p></div>
<div class="card"><p class="ck">人の抜き取りとの一致</p><p class="big">{T['sample_ok']}<small>/ {T['sample']}件</small></p><p class="p">食い違った {T['sample'] - T['sample_ok']}件は、資料の書き方があいまいな要件でした。</p></div></div>
<div class="card mt"><p class="ck">食い違いの扱い</p><p class="p">2回の結果が違った要件は、AIの結論を使いません。元の資料の該当する所を並べて人に見せ、人が振り分けを決めます。この報告書の所見は、人が確かめたあとの結果だけで書いています。</p></div></div></div>''',
     lead='「AIの読み間違いではないか」という問いに、先に答えます。読み取りの確かさを測り、あやしい所は人が確かめる手順にしています。', cta=True)

# 所見
def finding(no, title, lead, what, kpi, ev, risk, act, human):
    evh = ''.join(f'<div class="ev"><p class="evh"><b>{h}</b><span>{m}</span></p><p class="evb">{b}</p></div>' for h, m, b in ev)
    page('5　見つかったこと', f'所見 {no} / 6', title,
         f'''<div class="fd"><div class="fd__l"><p class="ck">起きていること</p><p class="p">{what}</p><div class="kpi">{''.join(f'<div><span>{a}</span><b>{b}</b></div>' for a, b in kpi)}</div></div>
<div class="fd__m"><p class="ck">根拠（資料の抜粋）</p>{evh}</div>
<div class="fd__r"><div class="card risk"><p class="ck">放っておくと</p><p class="p">{risk}</p></div><div class="card"><p class="ck">打ち手</p><p class="p">{act}</p></div><div class="card hum"><p class="ck">人が決めること</p><p class="p">{human}</p></div></div></div>''', lead=lead)

finding(1, '会議で決まった要件が、38件、要件一覧に戻っていない。', '決定は会議の記録にあります。要件一覧が古いままなので、後の工程が古い前提で進みます。',
        '会議の記録 86本から、AIが決定を拾い、要件一覧の状態と照らしました。決定が出ているのに「検討中」のままの要件が 38件あります。決定から一覧に反映されるまでの日数は、中央の値で 9営業日でした。',
        [('決定が戻っていない要件', '38件'), ('反映までの日数（中央の値）', '9営業日')],
        [('会議の記録', '9月24日　販売の要件の検討会', '「受注時の与信の確認は、<mark>標準の機能で行う。追加開発は行わない</mark>。限度額の見直しは月次の運用で対応する。」'),
         ('要件一覧', 'R-118　与信の確認　10月30日時点', '状態：<mark>検討中</mark>　対応の方針：<mark>追加開発の候補</mark>　見積もり：A-081 に計上')],
        '追加開発の見積もり A-081 は、作らないと決まった機能の工数を含んだままです。同じ形の要件が、見積もりの対象に 11件あります。',
        '進捗管理の AI が、会議の当日に決定を拾い、要件一覧の該当する行に直しの案を書きます。各領域のリーダーが案を見て、反映するかを決めます。',
        '直しの案を反映するか。会議で決めたことと違う案が出たときは、どちらが正しいか。')

finding(2, f'業務フローと機能記述書が、{n_conflict}か所で食い違っている。', '同じ業務を書いた2つの資料で、手順や担当が違います。どちらが正しいかは、資料からは分かりません。',
        f'業務フロー 48本の手順と、機能記述書 {F["n_docs"]}本の記載を照らしました。食い違いは {n_conflict}か所で、販売と生産に多く出ています。フローにある手順が記述書に無いもの、担当の部門が違うもの、順番が違うものの3種類です。',
        [('食い違い', f'{n_conflict}か所'), ('うち販売・生産', f'{tab[0][2] + tab[2][2]}か所')],
        [('業務フロー', 'BF-023　出荷の流れ　手順 7', '「倉庫の担当が<mark>出荷の前に検品の結果を登録する</mark>。登録が済むと出荷指示が確定する。」'),
         ('機能記述書', 'FS-041　出荷指示の確定　3章', '「営業の担当が出荷指示を確定する。<mark>検品の結果の登録についての記載なし</mark>。」')],
        '設計の工程で、どちらかを前提にした設計書が書かれます。食い違いは結合テストまで見つからず、見つかった時点で設計からやり直しになります。',
        '点検の AI が、フローと記述書を全件で照らし、食い違いを一覧にします。一覧には両方の原文を並べ、業務の方が見比べるだけで決められる形にします。',
        'どちらの記載が正しいか。業務の進め方そのものが決まっていない場合は、検討会にかけるか。')

finding(3, '追加開発の候補 96本のうち、19本は標準の機能で足りる可能性がある。', '作ると決める前に、標準で足りるかをもう一度確かめる価値があります。',
        '追加開発の見積もり 96本について、前提にしている要件と、会議の記録、標準の機能の説明を照らしました。標準の機能か設定で足りる可能性があるものが 19本ありました。見積もりの合計では 612人日にあたります。',
        [('見直しの候補', '19本'), ('見積もりの合計', '612人日')],
        [('要件一覧', 'R-204　納期回答　追加開発の理由', '「得意先ごとに<mark>納期の回答の基準日を変えたい</mark>ため、回答日の計算を追加開発する。」'),
         ('会議の記録', '10月8日　販売の要件の検討会', '「基準日を変えているのは3社だけ。<mark>3社は得意先マスタの設定で分ければ足りるのでは</mark>、という意見が出た。結論は次回。」その後、この議題は取り上げられていない。')],
        '標準で足りる機能を作ると、稼働のあとも保守とバージョンアップの手間が残ります。解析 2 で見た工数のばらつきも、その分だけ大きくなります。',
        '設計の AI が、19本それぞれについて、標準の機能での実現の案と、その場合に業務を変える所を並べます。検討会の議題に戻し、作るかを決め直します。',
        '標準に合わせて業務を変えるか、追加開発にするか。19本という数字は候補であり、決めるのはお客様です。')

finding(4, f'移行データの問いが1人に集まり、直近の週は {mig[-1]["n"]}件のうち {mig[-1]["a"]}件しか答えが出ていない。', '遅れが数字に出る前に、会話の記録に兆しが出ています。',
        f'解析 3 のとおり、問いの {pc(A["top_share"])}% が移行の担当リーダーに集まっています。移行データの問いは、1週目は {mig[0]["n"]}件すべてに答えが出ていましたが、週を追うごとに下がっています。答えを待っている問いの多くは、品目マスタと得意先マスタの方針（K-01・K-05）を前提にしています。',
        [('1人に集まる問い', f'{pc(A["top_share"])}%'), ('直近の週の回答', f'{mig[-1]["a"]} / {mig[-1]["n"]}件')],
        [('チャット', '10月21日　移行のチャンネル', '「品目コードの桁数が決まらないと、変換の仕様が書けません。<mark>先週も伺いましたが、方針はいつ頃出ますか</mark>。」返信なし（9営業日）'),
         ('課題表', 'K-01　10月30日時点', '担当：移行の担当リーダー　期日：10月16日　状態：<mark>対応中</mark>　最後の更新：10月9日')],
        f'出口判定の遅れの {pc(S["crit"][0]["share"])}% は、移行データの流れが決めています（解析 1）。答えが止まったまま進むと、ほかの領域が終わっても出口判定ができません。',
        '進捗管理の AI が、答えを待っている問いを毎朝まとめ、決めるために足りない材料を並べます。方針を決める場を1回設け、K-01 と K-05 を同じ日に決めます。',
        '品目の桁数と採番の方針。名寄せの範囲。決める人を、移行の担当リーダー1人から、業務の責任者を含む場に移すか。')

finding(5, f'生産の機能記述書に、項目の定義の抜けが {tab[2][0]}件ある。', '指摘の多さは、書いた人の問題ではありません。前提が決まっていないことの表れです。',
        f'解析 4 のとおり、生産の記述書 {F["docs"][2]}本に「項目の定義の抜け」が {tab[2][0]}件あり、ほかの領域より多く出ています。部品表と作業手順の項目で、桁数、必須かどうか、初期値が書かれていません。',
        [('生産 × 項目の定義の抜け', f'{tab[2][0]}件'), ('記述書1本あたりの指摘', f'{F["per_doc"][2]}件')],
        [('機能記述書', 'FS-027　部品表の登録　4章 項目の一覧', '「版：<mark>桁数 未定</mark>　必須：<mark>未定</mark>　備考：版の持ち方が決まり次第、記載する。」'),
         ('課題表', 'K-03　部品表の版の持ち方', '起票：8月27日　状態：<mark>検討中</mark>　関連する記述書：FS-027 ほか 6本')],
        '項目の定義が抜けたまま設計に入ると、設計書と移行の変換の仕様が、それぞれ別の前提で書かれます。',
        '点検の AI が、抜けている項目を記述書ごとに一覧にし、同じ課題を前提にしているものをまとめます。K-03 が決まった日に、関連する 7本の直しの案を AI が作ります。',
        '部品表の版の持ち方（K-03）。決まるまでの間、関連する記述書を先に進めるか、止めるか。')

finding(6, '業務フロー 48本に手順の番号が無く、要件・設計・テストとつながらない。', 'いまの形のままでは、稼働のあとに「ここを変えるとどこに響くか」を引けません。',
        '業務フローは図として描かれており、手順に番号がありません。要件一覧の 412件のうち、フローのどの手順のための要件かが書かれているものは 61件でした。残りは、人が読んで推し量るしかありません。',
        [('手順とつながっている要件', '61 / 412件'), ('番号のない業務フロー', '48本')],
        [('業務フロー', 'BF-023　出荷の流れ', '図の中の箱に<mark>番号が無い</mark>。図は画像として貼られており、文字として読み取れない箱が 14個ある。'),
         ('要件一覧', 'R-231　出荷指示の取消', '関連する業務フロー：<mark>「出荷の流れ」</mark>（手順の指定なし）')],
        '設計、開発、テストと進むほど、つながりを後から付ける手間が増えます。運用保守に入ると、改修の影響を調べるたびに人が資料を読み直すことになります。',
        '設計の AI が、業務フローを元データに起こし直し、手順に番号を付けます。同じ元データからシーケンス図も描き、要件・設計書・テストを番号でつなぎます。',
        '起こし直した業務の流れが、実際の業務と合っているか。番号の付け方の決まり。')
pages[-1]['cta'] = True

# 効果
page('6　効果の見立て', '効果の見立て', '何を数えるかを先に決め、いまの値を置く。',
     f'''<table class="t eff"><thead><tr><th>数えるもの</th><th>いまの値</th><th>打ち手のあとに目指す姿</th><th>測り方</th></tr></thead><tbody>
<tr><td class="b">出口判定に間に合う確率</td><td class="m">{pc(P0)}%</td><td>効き目の大きい3つを先に決めた場合 <b class="m hot">{pc(P3)}%</b></td><td>課題表から毎週、同じ方法で試算する</td></tr>
<tr><td class="b">決定が要件一覧に戻るまでの日数</td><td class="m">中央の値 9営業日</td><td>会議の翌営業日に直しの案が出る</td><td>会議の日と、一覧の更新の日の差</td></tr>
<tr><td class="b">点検した機能記述書</td><td class="m">13 / {F['n_docs']}本</td><td>{F['n_docs']} / {F['n_docs']}本。版が上がるたびに全件</td><td>点検の記録</td></tr>
<tr><td class="b">答えが出るまでの日数（遅い方の2割）</td><td class="m">{A['wait_p80']:.1f}営業日以上</td><td>止まった問いが、毎朝の一覧に載る</td><td>チャットのスレッドの日付</td></tr>
<tr><td class="b">追加開発の工数（{E['n']}本の合計・中央の値）</td><td class="m">{num(V['med_as'])}人日</td><td>AIチームを組み込んだ場合 <b class="m hot">{num(V['med_ai'])}人日</b></td><td>機能ごとの実績の工数</td></tr>
<tr><td class="b">手順とつながっている要件</td><td class="m">61 / {T['n']}件</td><td>すべての要件が手順の番号を持つ</td><td>要件一覧の欄</td></tr>
<tr><td class="b">追加開発が予算を超える確率</td><td class="m">{pc(E['p_over'])}%</td><td>AIチームを組み込んだ場合 <b class="m hot">1%未満</b></td><td>見積もりから毎月、同じ方法で試算する</td></tr></tbody></table>
<div class="note mt">右から2番目の列は、打ち手を行った場合の見立てです。約束する値ではありません。AIチームを入れたあと、同じ測り方で毎週の値を記録し、見立てと比べます。「AIを使わなかった場合」の値は測れないので、比べる相手は、入れる前の A社自身の値です。</div>''',
     lead='効果を1つの数字で言い切ることはしません。見込みは幅と前提を付けて示し、入れる前と後を同じ物差しで比べます。')

page('6　効果の見立て', '効果の見立て', '3つを先に決めると、間に合う確率が倍になる。',
     f'''<div class="g2 g2--w"><div>{hist_svg(S['edges'], [S['h0'], S['h3']], [f'いまのまま　{pc(P0)}%', f'3つを先に決めた場合　{pc(P3)}%'], ['auto', 'auto'], h=340)}</div>
<div><p class="ck">先に決める3つ</p><table class="t"><thead><tr><th>課題</th><th>流れ</th><th>効き目</th></tr></thead><tbody>{''.join(f"<tr><td><b class='m'>{t['id']}</b>　{t['name']}</td><td>{t['stream']}</td><td class='m r hot'>+{t['up'] * 100:.1f}pt</td></tr>" for t in top3)}</tbody></table>
<div class="kpi kpi--2 mt"><div><span>半分の進み方で終わる日</span><b>{S['p50']:+.1f} → {S['p50b']:+.1f} 営業日</b></div><div><span>8割の進み方が収まる日</span><b>{S['p80']:+.1f} → {S['p80b']:+.1f} 営業日</b></div></div>
<p class="fn">効き目は、その課題だけを最も早い見込みで片付けた場合の上がり幅です。3つを同時に片付けた場合の上がり幅は、足し算より大きくなります。数字は、いずれも期日との差です。</p></div></div>''',
     lead='12件を上から順に片付けるのではなく、確率を最も上げる順に手を打ちます。順番は、課題表が更新されるたびに計算し直します。')

ph_rows = ''.join(f"<tr><td class='b'>{p['name']}</td><td>{p['how']}</td><td class='m r'>{p['before']:.1f} → <b class='hot'>{p['after']:.1f}</b></td><td class='m r b'>−{num(p['save_med'])}</td></tr>" for p in V['phases'])
page('6　効果の見立て', '効果の見立て　工数', f'AIチームを組み込むと、追加開発の工数は約 {num(round(V["save_med"], -1))}人日減る見込み。',
     f'''<div class="g2 g2--w"><div>{effort2_svg()}
<p class="fn">同じ {num(D['meta']['trials'])}通りの進み方について、「いまのまま」と「AIチームを組み込んだ場合」の両方を計算し、差を減る工数としました。灰色の範囲は予算を超える側です。</p></div>
<div><div class="kpi"><div><span>減る工数（中央の値）</span><b>{num(V['save_med'])}人日<small>　いまの工数の約 {pc(V['save_pct'])}%</small></b></div>
<div><span>見込みの幅（10回に8回はこの範囲に入る）</span><b>{num(V['save_p10'])} 〜 {num(V['save_p90'])}人日</b></div>
<div><span>予算に収まる確率</span><b>{pc(V['p_fit_as'])}% → 99%以上</b></div>
<div><span>8割の進み方が収まる合計</span><b>{num(V['p80_as'])} → {num(V['p80_ai'])}人日</b></div></div>
<div class="note mt"><b>この値で、体制や予算を先に減らさないでください。</b>工程ごとの減り方は、資料に無いので仮の値を置いています。最初の10本の実績が出たら、同じ方法で計算し直します。減った工数を予備に回すか、前倒しに使うかは、お客様が決めます。</div></div></div>''',
     lead=f'解析 2 と同じ追加開発 {E["n"]}本について、設計からテストまでに AIチームを組み込んだ場合を計算しました。')

page('6　効果の見立て', '効果の見立て　工数', '減る工数をいちばん左右するのは、開発と設計の時間。',
     f'''<div class="g2 g2--w"><div><p class="ck">工程ごとの見込み</p><table class="t"><thead><tr><th>工程</th><th>AIチームが受け持つこと</th><th>1本の時間（人日）<br>いま → 組み込んだ場合</th><th>{E['n']}本で減る工数</th></tr></thead><tbody>{ph_rows}
<tr><td class="b">読む時間</td><td>AIの下書きと指摘を、人が読んで確かめる</td><td class="m r">＋{V['mid'] * V['over'][1]:.1f}</td><td class="m r b">＋{num(V['over_med'])}</td></tr>
<tr><td class="b">前提の要件</td><td>要件を先に決め、作り直しを減らす</td><td class="m r">―</td><td class="m r b">−{num(V['shrink_med'])}</td></tr>
<tr class="tot"><th colspan="3">差し引き（中央の値）</th><td class="m r b hot">−{num(V['save_med'])}</td></tr></tbody></table>
<p class="fn">1本の時間は、見積もり {V['mid']:.0f}人日の中くらいの機能を例にしました。工程の割合は、設計 30%・開発 30%・単体テスト 20%・結合テスト 20% と置いています。行ごとの中央の値を足しても、差し引きの中央の値とは少しずれます。</p></div>
<div><p class="ck">1つの前提だけを動かすと、減る工数がどれだけ変わるか（人日）</p>{sens_svg(V['sens'])}
<table class="t sm"><thead><tr><th>置いた仮の値（AIを使ったときに残る人の時間の割合）</th><th>少ない</th><th>最もありそう</th><th>多い</th></tr></thead><tbody>{''.join(f"<tr><td class='b'>{p['name']}</td><td class='m r'>{pc(p['lo'])}%</td><td class='m r'>{pc(p['mode'])}%</td><td class='m r'>{pc(p['hi'])}%</td></tr>" for p in V['phases'])}
<tr><td class="b">読む時間（元の工数に対して）</td><td class="m r">{pc(V['over'][0])}%</td><td class="m r">{pc(V['over'][1])}%</td><td class="m r">{pc(V['over'][2])}%</td></tr></tbody></table></div></div>''',
     lead='AIが作る時間は短く、工数を決めているのは人の時間です。どの工程の人の時間が減るかで、見込みが変わります。', cta=True)

# 体制
team = [('進捗管理', '課題とリスクを毎朝拾い、効き目の順に並べる', '所見 1・4'), ('設計', '業務の流れとシーケンス図を起こし、要件とつなぐ', '所見 3・6'), ('開発', '要件定義の間は出番なし。設計から加わる', '―'), ('テスト', '要件定義の間は出番なし。テストから加わる', '―'), ('点検', '要件一覧・記述書・フローを全件で照らす', '所見 2・5')]
page('7　AIチームの体制案', 'AIチームの体制案', '要件定義の間は、3つの AI から始める。',
     f'''<div class="org"><div class="org__top"><b>お客様と PM</b><span>業務を決める。作るかを決める。合否を決める。</span></div>
<div class="org__ai">{''.join(f'<div class="mem {"off" if m[2] == "―" else ""}"><em>AI</em><b>{m[0]}</b><span>{m[1]}</span><i>{m[2]}</i></div>' for m in team)}</div>
<div class="org__tt"><b>TechTime</b><span>A社の様式と規約に合わせて手順と点検の観点を作り、AIチームを組み、育てる。</span></div></div>
<div class="g3 mt"><div class="card"><p class="ck">人を増やす提案ではない</p><p class="p">いまの体制 約60名はそのままです。AIチームは、読む・照らす・下書きを作る作業を受け持ちます。</p></div>
<div class="card"><p class="ck">手順は A社のものとして残る</p><p class="p">AIへの指示と点検の観点は、A社の様式と規約に合わせて作り、A社の資産として納めます。</p></div>
<div class="card"><p class="ck">設計に入る前に広げる</p><p class="p">出口判定のあと、開発とテストの AI を加えます。要件定義で付けた番号が、そのまま設計・テストで使われます。</p></div></div>''',
     lead='5つの AI を一度に入れません。いまの工程で効くものから始め、工程が進むのに合わせて加えます。')

# 要件定義の進め方
steps = [('1', '記録を読む', '会議の記録・チャット・課題表を毎朝読む', '読む範囲を決める', '―'),
         ('2', '決定と未決を拾う', '決定を要件一覧に照らし、直しの案を書く', '案を確かめる', '直しを反映するか'),
         ('3', '業務の流れを起こす', 'フローを元データに起こし、手順に番号を付ける。シーケンス図も描く', '実際の業務と合っているかを見る', '業務の流れ'),
         ('4', '要件とつなぐ', '要件・記述書を、手順の番号につなぐ', 'つながりの抜けを確かめる', '番号の決まり'),
         ('5', '全件を点検する', '記述書を8つの観点で点検し、指摘を一覧にする', '指摘を読み、直す', '指摘を反映するか'),
         ('6', '出口を判定する', '未決・指摘・つながりの残りを数え、間に合う確率を出す', '残りの扱いの案を作る', '出口の合否')]
page('8　要件定義の進め方', '要件定義の進め方', '出口判定までの 35営業日を、6つのステップで進める。',
     '<table class="t stp"><thead><tr><th></th><th>ステップ</th><th><b class="tagai">AI</b>AIチームが受け持つ</th><th>人が作る・確かめる</th><th><b class="taghu">決</b>お客様が決める</th></tr></thead><tbody>' +
     ''.join(f'<tr><td class="m no">{a}</td><td class="b">{b}</td><td>{c}</td><td>{d}</td><td class="{"dec" if e != "―" else ""}">{e}</td></tr>' for a, b, c, d, e in steps) +
     '''</tbody></table><div class="wk"><p class="ck">毎週の動き</p><div class="wk__r"><div><b>毎朝</b>AIが記録を読み、課題とリスク、止まった問いを一覧にする</div><div><b>会議の当日</b>AIが決定を拾い、要件一覧の直しの案を出す</div><div><b>週に1回</b>間に合う確率を出し直し、先に決める課題を選び直す</div><div><b>版が上がるたび</b>記述書を全件で点検し直す</div></div></div>''',
     lead='A社はいま要件定義の中にいます。先の工程の話より、明日から要件定義をどう進めるかを厚く書きます。')

def flow(no, name, src, ai, outp, hum, fact):
    return f'''<div class="fl"><p class="fl__h"><b>{no}</b>{name}</p><div class="fl__r"><div class="fb">{ico(src[0])}<span>{src[1]}</span></div><i>→</i><div class="fb fb--ai">{ico('ai')}<span>{ai}</span></div><i>→</i><div class="fb">{ico(outp[0])}<span>{outp[1]}</span></div><i>→</i><div class="fb fb--hu">{ico('human')}<span>{hum}</span></div></div><p class="fl__f"><b>A社のいま</b>{fact}</p></div>'''
page('8　要件定義の進め方', '要件定義の進め方　ステップ 1〜3', '記録を読み、決定を戻し、業務の流れを起こす。',
     flow('1', '記録を読む', ('talk', '会議の記録・チャット・課題表'), '毎朝すべて読み、課題・リスク・止まった問いを拾う', ('list', '課題・リスクの一覧'), '読む範囲と、一覧の見方を決める', '会議の記録 86本、チャット 3,840件。人が全部を読むことはできていない。') +
     flow('2', '決定と未決を拾う', ('talk', '会議の記録'), '決定を拾い、要件一覧の行に直しの案を書く', ('list', '要件一覧の直しの案'), '案を見て、反映するかを決める', '決定が戻っていない要件 38件。反映まで中央の値で 9営業日。') +
     flow('3', '業務の流れを起こす', ('doc', '業務フロー 48本'), '元データに起こし、手順に番号を付け、シーケンス図も描く', ('flow', '業務の流れとシーケンス図'), '実際の業務と合っているかを確かめる', '手順に番号が無い。画像として貼られ、読み取れない箱がある。'))

page('8　要件定義の進め方', '要件定義の進め方　ステップ 4〜6', '番号でつなぎ、全件を点検し、出口を判定する。',
     flow('4', '要件とつなぐ', ('list', '要件一覧・機能記述書'), '要件と記述書を、手順の番号につなぐ', ('link', '手順→要件→記述書のつながり'), 'つながりの抜けを確かめる', f'手順とつながっている要件は 61件（{T["n"]}件中）。') +
     flow('5', '全件を点検する', ('doc', f'機能記述書 {F["n_docs"]}本'), '8つの観点で全件を点検し、原文を並べて指摘を一覧にする', ('check', '指摘の一覧'), '指摘を読み、反映するかを決める', f'人の点検は 13本。全件の点検で指摘は {F["total"]}件。') +
     flow('6', '出口を判定する', ('list', '未決・指摘・つながりの残り'), '残りを数え、間に合う確率と、先に決める課題を出す', ('gate', '出口判定の材料'), '出口の合否を決める', f'間に合う確率 {pc(P0)}%。未決の要件 137件。'), cta=True)

# 30日・90日
gantt = [('手順づくり（A社の様式と規約に合わせる）', 1, 2, 'a'), ('進捗管理の AI：毎朝の一覧', 2, 13, 'a'), ('点検の AI：記述書の全件の点検', 2, 13, 'a'), ('設計の AI：業務の流れに番号を付ける', 3, 8, 'a'),
         ('K-01・K-05・K-03 を決める場', 2, 3, 'h'), ('要件とのつなぎ込み', 5, 9, 'a'), ('出口判定', 7, 7, 'h'), ('設計の様式を決める', 6, 8, 'h'), ('設計の初版づくり（開発・テストの AI を加える準備）', 9, 13, 'a')]
gh = ''.join(f'<tr><th>{n}</th>' + ''.join(f'<td class="{("on on--" + k) if a <= w <= b else ""}"></td>' for w in range(1, 14)) + '</tr>' for n, a, b, k in gantt)
page('9　最初の30日と90日', '最初の30日と90日', '2週目に3つの課題を決め、7週目に出口を判定する。',
     f'''<table class="t gantt"><thead><tr><th></th>{''.join(f'<th>{w}週</th>' for w in range(1, 14))}</tr></thead><tbody>{gh}</tbody></table>
<div class="legend"><span><b class="lg lg--a"></b>AIチームと TechTime が進める</span><span><b class="lg lg--h"></b>お客様に決めていただく場</span><span>1〜4週が最初の30日、13週までが90日</span></div>
<div class="g3 mt"><div class="card"><p class="ck">30日後に手元にあるもの</p><p class="p">毎朝の課題・リスクの一覧。記述書 {F['n_docs']}本の指摘の一覧。決まった K-01・K-05・K-03。</p></div>
<div class="card"><p class="ck">出口判定の日に手元にあるもの</p><p class="p">番号の付いた業務の流れ。手順につながった要件一覧。残りの未決と、その扱いの案。</p></div>
<div class="card"><p class="ck">90日後に手元にあるもの</p><p class="p">A社の様式に合わせた設計の手順。設計書の初版。入れる前と後を比べた数字の記録。</p></div></div>''',
     lead='日程は、A社の出口判定（12月18日）に合わせた案です。出口判定の日は動かさず、その前に決めることを前に寄せます。')

page('9　最初の30日と90日', '最初の30日と90日', 'お客様に決めていただくことは、5つ。',
     '''<div class="g2"><div><table class="t"><thead><tr><th></th><th>決めていただくこと</th><th>いつまでに</th></tr></thead><tbody>
<tr><td class="m no">1</td><td><b>AIに読ませる資料の範囲</b><br>会議の記録とチャットのうち、対象にするもの</td><td>1週目</td></tr>
<tr><td class="m no">2</td><td><b>移行データの方針を決める場と、決める人</b><br>K-01・K-05 を同じ日に決める</td><td>2週目</td></tr>
<tr><td class="m no">3</td><td><b>要件一覧の直しを反映する人</b><br>領域ごとに1人</td><td>2週目</td></tr>
<tr><td class="m no">4</td><td><b>追加開発の候補 19本を検討会に戻すか</b></td><td>4週目</td></tr>
<tr><td class="m no">5</td><td><b>業務の流れの番号の決まり</b></td><td>4週目</td></tr></tbody></table></div>
<div><p class="ck">役割</p><table class="t"><thead><tr><th></th><th>受け持つこと</th></tr></thead><tbody>
<tr><td class="b">お客様</td><td>業務を決める。作るかを決める。合否を決める。読ませる資料を出す。</td></tr>
<tr><td class="b">導入の会社</td><td>設計・開発・テストを進める。AIチームの下書きと指摘を使い、確かめる。</td></tr>
<tr><td class="b">TechTime</td><td>手順と点検の観点を作る。AIチームを組み、毎週の数字を出し、手順を直す。</td></tr>
<tr><td class="b">AIチーム</td><td>読む。照らす。下書きを作る。数える。</td></tr></tbody></table>
<div class="note mt">情報の扱い：お預かりした資料は、AIの学習に使われない設定で扱います。本番の環境を AI に操作させません。AIの結果は、人が確かめてから使います。</div></div></div>''',
     lead='AIチームを入れても、決める人がいなければ進みません。決めていただくことを、期限と一緒に先に並べます。')

# 案内
page('アセスメントのご案内', 'アセスメントのご案内', '貴社の資料で、同じ分析を行います。',
     f'''<div class="g3 free"><div class="fs"><b>1</b><h3>ご相談と、お見積もり</h3><p class="p">いまの工程と、お預かりできる資料を伺います。行える解析の範囲をお伝えし、お見積もりします。</p></div>
<div class="fs"><b>2</b><h3>資料を預かり、解析する</h3><p class="p">秘密保持の取り決めを結んだうえで資料をお預かりします。AIが全件を読み、人が確かめ、行える解析を行います。</p></div>
<div class="fs"><b>3</b><h3>報告書をお返しする</h3><p class="p">どの工程に AIチームが効くか、何から始めるかをお伝えします。効かない所も、分けてお伝えします。</p></div></div>
<div class="g2 mt"><div><p class="ck">お預かりする資料の例</p><table class="t sm"><thead><tr><th>資料</th><th>行える解析</th></tr></thead><tbody>
<tr><td class="b">設計書・機能記述書と、その様式</td><td>全件の点検、指摘の偏り</td></tr><tr><td class="b">業務フロー、要件一覧</td><td>食い違い、手順とのつながり</td></tr>
<tr><td class="b">会議の記録、チャット</td><td>決定の戻り、問いの集まり方</td></tr><tr><td class="b">課題表</td><td>期日に間に合う確率</td></tr><tr><td class="b">追加開発の見積もり</td><td>工数のばらつき</td></tr></tbody></table>
<p class="fn">解析の範囲は、お預かりできる資料によって変わります。この報告書のサンプルは、上の資料がすべてそろった場合の例です。</p></div>
<div class="cta2"><p class="cta2__k">ご相談はこちら</p><p class="cta2__u">techtime-jp.com/contact</p><p class="p">導入の検討中でも、途中でも、稼働したあとでも構いません。相談票の「いまの状況」と「相談したい工程」を選んでお送りください。</p>
<table class="t kv sm"><tbody><tr><th>電話</th><td class="m">03-4222-3363（月〜金　9〜19時）</td></tr><tr><th>メール</th><td class="m">kdm@techtime-link.com</td></tr><tr><th>会社</th><td>TechTime株式会社　東京都渋谷区渋谷2-19-15 宮益坂ビルディング609</td></tr></tbody></table></div></div>''',
     lead='ここまでの頁は、架空の A社の例です。貴社のプロジェクトでは、何が見つかるでしょうか。', cls='last')

page('付録', '付録　解析の方法', 'この報告書の数字の出し方。',
     f'''<div class="g2"><table class="t sm"><thead><tr><th>解析</th><th>方法</th></tr></thead><tbody>
<tr><td class="b">期日に間に合う確率</td><td>未決の課題ごとに、遅れを「早い・普通・遅い」の3点で置き、PERT 分布で値を引く。課題どうしはゆるく連動させる（相関 0.3）。7つの流れのうち最も遅いものを完了の日とし、{num(D['meta']['trials'])}回くり返す。</td></tr>
<tr><td class="b">課題の効き目</td><td>その課題だけを最も早い見込みに置き換えて同じ試算を行い、間に合う確率の上がり幅を取る。</td></tr>
<tr><td class="b">工数のばらつき</td><td>1本ごとに「少ない・見積もりどおり・多い」の3点を置き、合計の分布を出す（相関 0.2）。効き目は、合計のばらつきのうちその機能が占める割合。</td></tr>
<tr><td class="b">問いの集まり方</td><td>スレッドごとに、問われた人と、5営業日以内に答えが出たかを AI が読み取る。集まり方は、均等に問いが来る場合の {num(D['meta']['trials'])}回の試算と比べる。</td></tr>
<tr><td class="b">指摘の偏り</td><td>領域 × 指摘の種類の表について、両者が無関係な場合に期待される件数との差を見る（カイ二乗の値 {F['chi']:.1f}）。偶然に出る確率は、{num(D['meta']['trials'])}回の試算で求める。</td></tr>
<tr><td class="b">読み取りの確かさ</td><td>同じ資料を2回読ませ、一致の割合と、偶然の一致を除いた指標（カッパ係数）を出す。別に 60件を人が抜き取って確かめる。</td></tr></tbody></table>
<div><div class="card"><p class="ck">このサンプルの数字について</p><p class="p">A社は架空の会社です。課題、見積もり、会話の記録、指摘の件数は、この資料のために置いた設定値です。確率、分布、効き目、検定の値は、その設定値から実際に計算しました。実在の会社の実績ではありません。</p></div>
<div class="card mt"><p class="ck">解析で扱わないこと</p><p class="p">個人の評価につながる集計は行いません。問いの集まり方は、役割の名前で示し、手を打つ所を見つけるためだけに使います。</p></div>
<p class="fn">© TechTime Co., Ltd.　この資料の文章と図は、TechTime が作成したものです。</p></div></div>''')

# ------------------------------------------------------------ 組み立て
CSS = open(__file__.replace('build.py', 'report.css')).read()
out = ['<!doctype html><html lang="ja"><head><meta charset="utf-8"><title>AIチーム導入アセスメント 結果報告書（サンプル）｜TechTime</title>',
       '<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>',
       '<link href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Shippori+Mincho+B1:wght@500;700;800&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap" rel="stylesheet">',
       f'<style>{CSS}</style></head><body>']
total = len(pages)
for i, p in enumerate(pages, 1):
    if p.get('cover'):
        out.append(f'''<section class="pg cover"><div class="fr"><span class="tl">TECHTIME CO., LTD.</span><span class="tr">SAMPLE</span></div>
<div class="cv"><p class="cv__k"><b>サンプル</b>架空の会社を題材にした、結果報告書の例</p><h1>AIチーム導入<br>アセスメント<br><em>結果報告書</em></h1>
<p class="cv__s">SAP S/4HANA 導入プロジェクト　要件定義の工程</p>
<div class="cv__n"><div><span>読んだ資料</span><b>7種類</b></div><div><span>全件を点検した記述書</span><b>{F['n_docs']}本</b></div><div><span>試算の回数</span><b>{num(D['meta']['trials'])}回</b></div><div><span>出口判定に間に合う確率</span><b>{pc(P0)}% → {pc(P3)}%</b></div></div></div>
<ol class="cv__c"><li>結論</li><li>読んだもの</li><li>現在地の地図</li><li>数字で見た現在地<small>解析 4つ</small></li><li>見つかったこと<small>所見 6件</small></li><li>効果の見立て</li><li>AIチームの体制案</li><li>要件定義の進め方</li><li>最初の30日と90日</li></ol>
<div class="cv__f"><b>TechTime<i></i></b><span>アセスメントのご相談　techtime-jp.com/contact</span></div></section>''')
        continue
    cta = '<p class="cta"><b>貴社の資料で、同じ分析を行います。</b>アセスメントのご相談　techtime-jp.com/contact</p>' if p['cta'] else ''
    out.append(f'''<section class="pg {p['cls']}"><div class="fr"><span class="tl">TECHTIME CO., LTD.</span><span class="tr">{p['part']}</span></div>
<header><p class="kick">{p['kicker']}</p><h1>{p['title']}</h1>{f'<p class="lead">{p["lead"]}</p>' if p['lead'] else ''}</header>
<div class="body">{p['body']}</div>{cta}
<footer><span>AIチーム導入アセスメント 結果報告書（サンプル）　架空の題材による例</span><b>{i} / {total}</b></footer></section>''')
out.append('</body></html>')
open(sys.argv[2], 'w').write('\n'.join(out))
print('pages', total)
