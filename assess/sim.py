"""アセスメント結果報告書（サンプル）に載せる数字を計算する。
題材は架空。ここで置いた設定値から、試算は実際に回して出す。"""
import json, sys
import numpy as np
from math import erf, sqrt

rng = np.random.default_rng(20261115)
N = 20000
out = {}

def pert(lo, mode, hi, u):
    """3点（早い・普通・遅い）から PERT 分布で値を出す。u は 0〜1 の一様乱数。"""
    if hi <= lo: return np.full_like(u, lo, dtype=float)
    a = 1 + 4 * (mode - lo) / (hi - lo); b = 1 + 4 * (hi - mode) / (hi - lo)
    # ベータ分布の逆関数は numpy に無いので、十分細かい表から引く
    xs = np.linspace(0, 1, 4001)
    pdf = xs ** (a - 1) * (1 - xs) ** (b - 1); cdf = np.cumsum(pdf); cdf /= cdf[-1]
    return lo + (hi - lo) * np.interp(u, cdf, xs)

def corr_uniform(n_items, rho):
    """共通の要因を1つ持たせて、項目どうしをゆるく連動させる（相関 rho）。"""
    z0 = rng.standard_normal((N, 1)); z = rng.standard_normal((N, n_items))
    g = sqrt(rho) * z0 + sqrt(1 - rho) * z
    return 0.5 * (1 + np.vectorize(erf)(g / sqrt(2)))

# ---------- 1. 期日に間に合う確率 ----------
DEADLINE = 35  # 断面の日から出口判定までの営業日
streams = {'販売': 25, '購買': 24, '生産': 23, '会計': 25, '原価': 23, '移行データ': 20, '連携': 22}
issues = [
    ('K-01', '移行データ', '品目マスタの桁数と採番の方針が決まっていない', 4, 9, 20),
    ('K-02', '連携', '倉庫システムとの連携方式が回答待ち', 3, 7, 18),
    ('K-03', '生産', '部品表の版の持ち方が決まっていない', 2, 6, 15),
    ('K-04', '原価', '原価の配賦の基準が決まっていない', 2, 5, 14),
    ('K-05', '移行データ', '得意先マスタの名寄せの範囲が決まっていない', 2, 5, 12),
    ('K-06', '会計', '入金の消込の流れが2拠点で違う', 1, 4, 11),
    ('K-07', '購買', '購買の承認経路の例外が洗い出されていない', 1, 4, 10),
    ('K-08', '生産', '生産計画を確定する周期が決まっていない', 1, 3, 9),
    ('K-09', '販売', '価格条件の例外の扱いが決まっていない', 1, 3, 8),
    ('K-10', '原価', '製造指図の差異を見る細かさが決まっていない', 1, 3, 8),
    ('K-11', '連携', '帳票の出力先が整理されていない', 0, 2, 7),
    ('K-12', '販売', '与信の確認の決定が要件一覧に反映されていない', 0, 2, 6),
]
U = corr_uniform(len(issues), 0.30)
D = np.column_stack([pert(lo, mo, hi, U[:, i]) for i, (_, _, _, lo, mo, hi) in enumerate(issues)])
names = list(streams)
def finish(Dm):
    f = np.zeros((N, len(names)))
    for j, s in enumerate(names):
        f[:, j] = streams[s] + sum(Dm[:, i] for i, it in enumerate(issues) if it[1] == s)
    return f.max(axis=1), f.argmax(axis=1)
fin, who = finish(D)
p0 = float((fin <= DEADLINE).mean())
tor = []
for i, it in enumerate(issues):
    D2 = D.copy(); D2[:, i] = it[3]
    f2, _ = finish(D2); tor.append((it[0], it[1], it[2], float((f2 <= DEADLINE).mean()) - p0))
tor.sort(key=lambda t: -t[3])
top3 = [t[0] for t in tor[:3]]
D3 = D.copy()
for i, it in enumerate(issues):
    if it[0] in top3: D3[:, i] = it[3]
f3, _ = finish(D3); p3 = float((f3 <= DEADLINE).mean())
edges = np.arange(-8, 31, 2)
h0, _ = np.histogram(fin - DEADLINE, bins=edges); h3, _ = np.histogram(f3 - DEADLINE, bins=edges)
out['sched'] = dict(deadline=DEADLINE, p0=p0, p3=p3, top3=top3,
    p50=float(np.percentile(fin - DEADLINE, 50)), p80=float(np.percentile(fin - DEADLINE, 80)),
    p50b=float(np.percentile(f3 - DEADLINE, 50)), p80b=float(np.percentile(f3 - DEADLINE, 80)),
    edges=edges.tolist(), h0=(h0 / N).tolist(), h3=(h3 / N).tolist(),
    tornado=[dict(id=a, stream=b, name=c, up=d) for a, b, c, d in tor],
    crit=[dict(stream=names[j], share=float((who == j).mean())) for j in np.argsort(-np.bincount(who, minlength=len(names)))],
    issues=[dict(id=a, stream=b, name=c, lo=lo, mode=mo, hi=hi) for a, b, c, lo, mo, hi in issues])

# ---------- 2. 追加開発の工数のばらつき ----------
fn = ['受注ファイルの取込', '与信の確認', '出荷指示の送信', '納期回答の計算', '価格条件の一括更新', '在庫引当の調整', '部品表の版の切替', '製造指図の一括発行',
      '所要量の例外一覧', '購買依頼の自動起票', '検収の差異一覧', '支払の一括承認', '入金の消込', '原価の配賦', '差異分析の帳票', '品目マスタの移行', '得意先マスタの移行',
      '倉庫システム連携（出荷）', '倉庫システム連携（入庫）', '請求書の発行']
items = []
k = 0
for size, cnt, lo_, hi_ in [('小', 40, 12, 20), ('中', 38, 28, 45), ('大', 18, 60, 110)]:
    for _ in range(cnt):
        base = float(rng.integers(lo_, hi_ + 1))
        items.append(dict(id=f'A-{k + 1:03d}', size=size, base=base)); k += 1
order = rng.permutation(len(items))
for rank, idx in enumerate(order): items[idx]['unc'] = '高' if rank < 22 else ('中' if rank < 58 else '低')
big = sorted([i for i in items], key=lambda x: -x['base'])
for j, it in enumerate(big[:20]): it['name'] = fn[j]
MULT = {'低': 1.25, '中': 1.6, '高': 2.3}
U2 = corr_uniform(len(items), 0.20)
E = np.column_stack([pert(it['base'] * 0.85, it['base'], it['base'] * MULT[it['unc']], U2[:, i]) for i, it in enumerate(items)])
tot = E.sum(axis=1); plan = sum(it['base'] for it in items); budget = plan * 1.10
var = E.var(axis=0); cov = np.array([np.cov(E[:, i], tot)[0, 1] for i in range(len(items))]); share = cov / tot.var()
topv = sorted(range(len(items)), key=lambda i: -share[i])[:8]
e_edges = np.linspace(np.floor(tot.min() / 100) * 100, np.ceil(tot.max() / 100) * 100, 25)
eh, _ = np.histogram(tot, bins=e_edges)
hi_share = float(sum(share[i] for i, it in enumerate(items) if it['unc'] == '高'))
out['effort'] = dict(n=len(items), plan=plan, budget=budget, p_over=float((tot > budget).mean()),
    p50=float(np.percentile(tot, 50)), p80=float(np.percentile(tot, 80)), p90=float(np.percentile(tot, 90)),
    edges=e_edges.tolist(), h=(eh / N).tolist(), n_hi=22, hi_share=hi_share,
    by_size={s: sum(1 for i in items if i['size'] == s) for s in '小中大'},
    top=[dict(id=items[i]['id'], name=items[i].get('name', '（名称は省略）'), size=items[i]['size'], unc=items[i]['unc'], base=items[i]['base'],
              p80=float(np.percentile(E[:, i], 80)), share=float(share[i])) for i in topv])

# ---------- 2b. AIチームを組み込んだ場合に減る工数 ----------
# 同じ乱数で「いまのまま」と「組み込んだ場合」を計算し、差を減る工数とする。
PH = [('設計', 0.30, (0.55, 0.70, 0.90), 'AIが初版を起こし、人は指摘を読んで直す'),
      ('開発', 0.30, (0.45, 0.62, 0.85), '設計書から ABAP を起こし、規約との対応を AI が確かめる'),
      ('単体テスト', 0.20, (0.50, 0.68, 0.90), 'テストの仕様とデータを AI が起こす'),
      ('結合テスト', 0.20, (0.70, 0.82, 0.95), 'AI が画面を操作して実施し、証跡を残す')]
OVER = (0.03, 0.06, 0.10)   # AIの下書きと指摘を人が読む時間（元の工数に対する割合）
MULT2 = {'低': 1.25, '中': 1.6, '高': 1.7}   # 前提の要件を先に決めるので、「高」の多い側が縮む
E2 = np.column_stack([pert(it['base'] * 0.85, it['base'], it['base'] * MULT2[it['unc']], U2[:, i]) for i, it in enumerate(items)])
tot2 = E2.sum(axis=1)
Uf = np.random.default_rng(20261116).random((N, len(PH) + 1))  # ほかの解析の乱数を変えないよう、別の系列にする
fac = np.column_stack([pert(lo, mo, hi, Uf[:, j]) for j, (_, _, (lo, mo, hi), _) in enumerate(PH)])
ov = pert(*OVER, Uf[:, -1])
with_ai = sum(tot2 * sh * fac[:, j] for j, (_, sh, _, _) in enumerate(PH)) + tot2 * ov
save = tot - with_ai
def det(f=None, o=None, t=None):
    """ほかの値は最もありそうな値のまま、1つだけ動かしたときの減る工数（中央の値どうしで比べる）。"""
    f = f or [p[2][1] for p in PH]; o = OVER[1] if o is None else o; t = float(np.median(tot2)) if t is None else t
    return float(np.median(tot)) - (sum(t * PH[j][1] * f[j] for j in range(len(PH))) + t * o)
base_save = det()
sens = []
for j, (name, sh, (lo, mo, hi), _) in enumerate(PH):
    fa = [p[2][1] for p in PH]; fb = list(fa); fa[j] = lo; fb[j] = hi
    sens.append(dict(name=f'{name}の時間', lo=det(f=fb) - base_save, hi=det(f=fa) - base_save))
sens.append(dict(name='AIの下書きと指摘を読む時間', lo=det(o=OVER[2]) - base_save, hi=det(o=OVER[0]) - base_save))
sens.append(dict(name='前提の要件を先に決める', lo=det(t=float(np.median(tot))) - base_save, hi=0.0))
sens.sort(key=lambda x: -(x['hi'] - x['lo']))
lo_e = np.floor(min(with_ai.min(), tot.min()) / 100) * 100; hi_e = np.ceil(max(with_ai.max(), tot.max()) / 100) * 100
ed2 = np.linspace(lo_e, hi_e, 37)
ha, _ = np.histogram(tot, bins=ed2); hb, _ = np.histogram(with_ai, bins=ed2)
mid = 36.0  # 中くらいの機能1本（見積もり 36人日）を例にする
out['save'] = dict(budget=budget, plan=plan, med_as=float(np.median(tot)), med_ai=float(np.median(with_ai)),
    p_fit_as=float((tot <= budget).mean()), p_fit_ai=float((with_ai <= budget).mean()),
    save_med=float(np.median(save)), save_p10=float(np.percentile(save, 10)), save_p90=float(np.percentile(save, 90)),
    save_pct=float(np.median(save / tot)), p80_as=float(np.percentile(tot, 80)), p80_ai=float(np.percentile(with_ai, 80)),
    edges=ed2.tolist(), h_as=(ha / N).tolist(), h_ai=(hb / N).tolist(), over=list(OVER), mid=mid,
    phases=[dict(name=n, share=sh, lo=lo, mode=mo, hi=hi, how=how, before=mid * sh, after=mid * sh * mo,
                 save_med=float(np.median(tot * sh - tot2 * sh * fac[:, j]))) for j, (n, sh, (lo, mo, hi), how) in enumerate(PH)],
    over_med=float(np.median(tot2 * ov)), shrink_med=float(np.median(tot - tot2)), sens=sens, base_save=base_save)

# ---------- 3. 問いの集まり方 ----------
people = ['移行の担当リーダー', '生産の業務リーダー', '連携の担当', '販売の業務リーダー', '会計の業務リーダー', 'PMO', '購買の業務リーダー', '原価の担当',
          '基盤の担当', '販売の担当A', '生産の担当A', '会計の担当A', '購買の担当A', '移行の担当A', '開発リーダー', '販売の担当B', '生産の担当B', 'テストの担当']
w = np.array([9.5, 4.2, 3.6, 2.6, 2.3, 2.2, 1.9, 1.7, 1.3, 1.1, 1.0, 0.9, 0.9, 0.8, 0.8, 0.6, 0.6, 0.5]); w = w / w.sum()
T = 312
q = rng.multinomial(T, w)
obs_max = q.max() / T
null = rng.multinomial(T, np.full(len(people), 1 / len(people)), size=N).max(axis=1) / T
topics = ['販売', '購買', '生産', '会計・原価', '移行データ', '連携']
weeks = 8
base_p = {'販売': [.86, .84, .88, .83, .85, .82, .84, .81], '購買': [.82, .85, .80, .83, .84, .79, .82, .80], '生産': [.80, .78, .79, .74, .72, .70, .69, .66],
          '会計・原価': [.84, .82, .80, .81, .77, .78, .74, .73], '移行データ': [.78, .74, .69, .61, .55, .47, .41, .36], '連携': [.70, .66, .68, .60, .58, .55, .50, .52]}
vol = {'販売': 6, '購買': 5, '生産': 7, '会計・原価': 6, '移行データ': 9, '連携': 6}
heat = []; tot_q = 0; tot_a = 0
for t in topics:
    row = []
    for wk in range(weeks):
        n = int(max(3, rng.poisson(vol[t]))); a = int(rng.binomial(n, base_p[t][wk])); row.append(dict(n=n, a=a)); tot_q += n; tot_a += a
    heat.append(dict(topic=t, cells=row))
# 回答までの営業日
wait = np.concatenate([rng.gamma(1.6, 1.3, 230), rng.gamma(3.0, 3.4, 82)])
out['ask'] = dict(threads=T, posts=3840, weeks=weeks, people=[dict(name=people[i], n=int(q[i])) for i in np.argsort(-q)],
    top_share=float(obs_max), null_p95=float(np.percentile(null, 95)), p_value=float((null >= obs_max).mean()), top3_share=float(np.sort(q)[-3:].sum() / T),
    heat=heat, heat_q=tot_q, heat_a=tot_a, wait_med=float(np.median(wait)), wait_p80=float(np.percentile(wait, 80)))

# ---------- 4. 点検の指摘の偏り ----------
areas = ['販売', '購買', '生産', '会計', '原価']; docs = [14, 12, 15, 11, 9]
kinds = ['項目の定義の抜け', '例外の記載なし', '他の資料との食い違い', '用語のゆれ', '前提の記載なし', '連携先の記載なし']
rate = np.array([[1.2, 1.5, 1.3, 0.9, 0.7, 0.8], [1.1, 1.6, 1.0, 0.8, 0.7, 0.6], [2.9, 1.5, 1.4, 1.0, 0.8, 0.9], [1.0, 1.2, 1.1, 0.9, 0.8, 0.5], [1.1, 1.1, 1.2, 0.8, 1.9, 0.5]])
tab = np.array([[rng.poisson(rate[i, j] * docs[i]) for j in range(len(kinds))] for i in range(len(areas))])
n = tab.sum(); exp = np.outer(tab.sum(1), tab.sum(0)) / n
chi = float(((tab - exp) ** 2 / exp).sum())
pr = (exp / n).ravel()
sim = rng.multinomial(n, pr, size=N).reshape(N, *tab.shape)
se = np.einsum('ni,nj->nij', sim.sum(2), sim.sum(1)) / n
chis = ((sim - se) ** 2 / np.where(se == 0, 1, se)).sum(axis=(1, 2))
resid = (tab - exp) / np.sqrt(exp * (1 - tab.sum(1)[:, None] / n) * (1 - tab.sum(0)[None, :] / n))
out['find'] = dict(areas=areas, docs=docs, kinds=kinds, tab=tab.tolist(), total=int(n), n_docs=int(sum(docs)), chi=chi, dof=(len(areas) - 1) * (len(kinds) - 1),
    p_value=float((chis >= chi).mean()), resid=np.round(resid, 2).tolist(), per_doc=[round(float(tab[i].sum() / docs[i]), 1) for i in range(len(areas))])

# ---------- 5. 読み取りの確かさ ----------
cls = ['標準で足りる', '設定で対応', '追加開発', '運用で対応']
R = 412; truth = rng.choice(4, R, p=[.34, .27, .24, .15])
def read(acc):
    r = truth.copy(); flip = rng.random(R) > acc
    r[flip] = (truth[flip] + rng.integers(1, 4, flip.sum())) % 4; return r
a1, a2 = read(.95), read(.95)
cm = np.zeros((4, 4), int)
for x, y in zip(a1, a2): cm[x, y] += 1
po = float(np.trace(cm) / R); pe = float((cm.sum(0) * cm.sum(1)).sum() / R ** 2); kappa = (po - pe) / (1 - pe)
S = 60; idx = rng.choice(R, S, replace=False); human = truth[idx]; ok = int((a1[idx] == human).sum())
out['trust'] = dict(n=R, classes=cls, cm=cm.tolist(), agree=po, kappa=float(kappa), differ=int(R - np.trace(cm)), sample=S, sample_ok=ok)

out['meta'] = dict(trials=N, seed=20261115)
json.dump(out, open(sys.argv[1], 'w'), ensure_ascii=False, indent=1)
s = out['sched']; e = out['effort']; a = out['ask']; f = out['find']; t = out['trust']
print(f"期日: いま {s['p0']:.1%} → 上位3つ {s['top3']} で {s['p3']:.1%} / P50 {s['p50']:+.1f} P80 {s['p80']:+.1f} → P50 {s['p50b']:+.1f} P80 {s['p80b']:+.1f}")
print(' 効き目', [(x['id'], round(x['up'] * 100, 1)) for x in s['tornado'][:6]]); print(' 決めている流れ', [(c['stream'], round(c['share'] * 100)) for c in s['crit'][:4]])
print(f"工数: 計画 {e['plan']:.0f} 予算 {e['budget']:.0f} 超える確率 {e['p_over']:.1%} P50 {e['p50']:.0f} P80 {e['p80']:.0f} P90 {e['p90']:.0f} 高22本の寄与 {e['hi_share']:.0%}")
print(' 上位', [(x['id'], x['name'], x['unc'], round(x['share'] * 100, 1)) for x in e['top'][:5]])
v = out['save']
print(f"減る工数: いま {v['med_as']:.0f} → 組み込み {v['med_ai']:.0f} 人日 / 減る {v['save_med']:.0f}（{v['save_p10']:.0f}〜{v['save_p90']:.0f}）{v['save_pct']:.1%} / 予算に収まる {v['p_fit_as']:.1%} → {v['p_fit_ai']:.1%}")
print(' 工程別', [(p['name'], round(p['save_med'])) for p in v['phases']], '読む時間', round(v['over_med']), '要件を先に決める', round(v['shrink_med']))
print(' 効き目', [(x['name'], round(x['lo']), round(x['hi'])) for x in v['sens']])
print(f"問い: 最多 {a['people'][0]} {a['top_share']:.1%} 上位3人 {a['top3_share']:.1%} 偶然の95%点 {a['null_p95']:.1%} p={a['p_value']} 回答 {a['heat_a']}/{a['heat_q']} 中央 {a['wait_med']:.1f}日 P80 {a['wait_p80']:.1f}日")
print(' 移行データの週次', [f"{c['a']}/{c['n']}" for c in a['heat'][4]['cells']])
print(f"指摘: 計 {f['total']} / {f['n_docs']}本 chi2={f['chi']:.1f} dof={f['dof']} p={f['p_value']} 1本あたり {f['per_doc']}"); print(np.array(f['tab'])); print(np.array(f['resid']))
print(f"確かさ: 一致 {t['agree']:.1%} κ={t['kappa']:.2f} 食い違い {t['differ']} 件 / 人の確認 {t['sample_ok']}/{t['sample']}")
