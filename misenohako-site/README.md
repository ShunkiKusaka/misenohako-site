# ミセノハコ サービスサイト（MVP）

ビルド不要の静的サイトです。Vercelにそのまま置けます。

## 公開手順
1. このフォルダをGitHubにpush
2. Vercelで「Add New → Project」→ リポジトリを選択
   （Framework Preset は **Other**、Build Command は空、Output Directory は空のままでOK）
3. デプロイ後、Vercelの Domains から独自ドメインを追加

## 公開前に必ず差し替えるもの（`index.html`内を検索）
| 検索文字列 | 内容 |
|---|---|
| `example.com` | 本番ドメイン（canonical / OGP / robots.txt / sitemap.xml） |
| `ミセノハコ` | サービス名（仮） |
| `YOUR_ACCOUNT` | InstagramのアカウントID |
| `hello@example.com` | 問い合わせ用メールアドレス |
| `YOUR_FORM_ID` | [Formspree](https://formspree.io/) で作ったフォームID（無料枠あり） |

## 法務ページ（ひな形）
- `privacy.html`（プライバシーポリシー）と `tokushoho.html`（特定商取引法に基づく表記）
- 【 】の部分を自分の情報に書き換えてください。あくまでひな形なので、内容は公的機関の案内や専門家にも確認を。

## セキュリティ設定（`vercel.json`）
- CSPで読み込み元を自サイト・Google Fonts・Formspreeに限定しています。
- Vercel Analytics やGA4を入れるときは、CSPの `script-src` / `connect-src` に追記が必要です。
- GitHub / Vercel / ドメイン / Formspree は二段階認証をオンに。

## 後から変更する場所
- **料金**：`#price` セクションの `<article class="plan">` を編集
- **サンプル追加**：`#samples` の `<article class="sample">` を丸ごとコピー。
  色は `assets/style.css` の `.theme-〇〇` に追加。サンプルページを公開したら
  `sample-status` の行を `<a class="link" href="/samples/〇〇/">サンプルを見る</a>` に差し替え
- **色・フォント**：`assets/style.css` 冒頭の `:root` の値

## あとで追加すると良いもの
- OGP画像（`og:image`）
- アクセス解析（Vercel Analytics / GA4 など）
- 特定商取引法に基づく表記・プライバシーポリシー

## 業種別テンプレート（`samples/`）
| フォルダ | 業種 | 変更するところ |
|---|---|---|
| `samples/cafe/` | 飲食店 | `style.css` 冒頭の色・フォント／`index.html` のメニュー・営業時間 |
| `samples/salon/` | 美容室・サロン | 同上（料金表・スタッフ） |
| `samples/craft/` | 工務店・サービス業 | 同上（施工事例・対応エリア） |

- `samples/common.css` は3つ共通です（写真の枠 `.ph`、スマホ下部の固定ボタンなど）。
- 写真は `<div class="ph">` の中に `<img src="..." alt="...">` を入れると差し替わります。
- 案件で使うときは、上部の「架空のサンプルです」バナー（`.sample-ribbon`）と `noindex` を削除してください。
- 新しい業種は、フォルダごとコピーして色と文章を変えるだけで作れます。
