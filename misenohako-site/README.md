# ミセノハコ サービスサイト

ビルド不要の静的サイトです（HTML / CSS / 少量のJS）。
公開先は **Cloudflare Pages**（無料）を想定しています。

## 公開手順（Cloudflare Pages）
1. [cloudflare.com](https://www.cloudflare.com/) でアカウントを作成（二段階認証をオン）
2. ダッシュボードで「Workers & Pages」→「Create」→「Pages」→「Connect to Git」
3. GitHubと連携して、このサイトのリポジトリを選択
4. 設定：
   - Framework preset：**None**
   - Build command：**空のまま**
   - Build output directory：**`/`**（または空）
5. 「Save and Deploy」→ 数十秒で `〇〇.pages.dev` のURLができる

※画面の表記は変わることがあります。違う場合は近い項目を選んでください。
※GitHubのファイルを更新（Commit）すると、自動で公開内容も更新されます。

## 独自ドメインをつなぐ
Pagesのプロジェクト →「Custom domains」→ ドメインを追加し、表示されるDNS設定をドメイン会社の管理画面に入力。

## 公開前に必ず差し替えるもの（VSCodeの全ファイル検索）
| 検索文字列 | 内容 |
|---|---|
| `example.com` | 本番ドメイン（canonical / OGP / robots.txt / sitemap.xml） |
| `YOUR_ACCOUNT` | InstagramのアカウントID |
| `hello@example.com` | 問い合わせ用メールアドレス |
| `YOUR_FORM_ID` | [Formspree](https://formspree.io/) のフォームID |
| `【` | `privacy.html` と `tokushoho.html` の空欄 |

## セキュリティ設定（`_headers`）
- CSP（読み込み元の制限）などを設定しています。Cloudflare Pagesは `_headers` ファイルを読みます。
- Googleマップの埋め込みを使うときは、CSPに `; frame-src https://www.google.com` を追記。
- アクセス解析（GA4など）を入れるときは、`script-src` / `connect-src` への追記が必要です。
- GitHub / Cloudflare / ドメイン / Formspree は二段階認証をオンに。

## 業種別テンプレート（`samples/`）
| フォルダ | 業種 |
|---|---|
| `samples/cafe/` | 飲食店 |
| `samples/salon/` | 美容室・サロン |
| `samples/craft/` | 工務店・サービス業 |

- 色・フォントは、各フォルダの `style.css` 冒頭で変更。共通部分は `samples/common.css`。
- 写真は `<div class="ph">` の中に `<img src="..." alt="...">` を入れる。
- 案件で使うときは、上部の「架空のサンプルです」バナー（`.sample-ribbon`）と `noindex` を削除。
- 新しい業種は、フォルダごとコピーして色と文章を変える。

## 後から変更する場所
- 料金：`index.html` の `#price` セクション
- 色・フォント：`assets/style.css` 冒頭の `:root`
- FAQ：`index.html` の `#faq` セクション

## メモ
- Vercelの無料（Hobby）プランは非商用のみのため、事業用サイトには使わない。Vercelを使う場合はProプランが必要。
- 法務ページはひな形。内容は公的機関の案内や専門家にも確認すること。
