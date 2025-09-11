# CLAUDE.md

このファイルは、Claude Code (claude.ai/code) がこのリポジトリのコードを扱う際のガイダンスを提供します。

## プロジェクト概要

これはMDX統合を持つAstroプロジェクトで、Astro basics starter templateから作成されました。このプロジェクトは厳格な構成のTypeScriptとパッケージマネージャーとしてYarnを使用しています。

## 開発コマンド

すべてのコマンドはプロジェクトルートから実行してください：

- `yarn install` - 依存関係をインストール
- `yarn dev` - 開発サーバーを`localhost:4321`で起動
- `yarn build` - プロダクション用サイトを`./dist/`にビルド
- `yarn preview` - プロダクション用ビルドをローカルでプレビュー
- `yarn astro` - Astro CLIコマンドを実行
- `yarn lint` - ESLintでコードをチェック
- `yarn format` - Prettierでコードをフォーマット

## プロジェクト構造

- `src/pages/` - ファイルベースルーティング、ページは自動的にルーティングされます
- `src/layouts/` - 再利用可能なレイアウトコンポーネント（現在はベース`Layout.astro`があります）
- `src/components/` - Astroコンポーネント（現在は`Welcome.astro`があります）
- `src/assets/` - コンポーネントでインポートする静的アセット（SVG、画像）
- `public/` - 直接提供される静的ファイル（favicon等）
- `astro.config.mjs` - MDX統合を含むAstro設定

## 主要技術

- **Astro 5.13.5** - コンポーネントアイランドアーキテクチャを持つ静的サイトジェネレーター
- **MDX** - `@astrojs/mdx`によるJSXサポート付きMarkdown
- **TypeScript** - `astro/tsconfigs/strict`を拡張する厳格な設定
- **Yarn** - パッケージマネージャー

## 開発ノート

- Astroコンポーネントは`.astro`拡張子を使用し、スコープ付きCSSをサポート
- `src/assets/`のアセットはインポートして`.src`プロパティ経由で参照
- 静的ファイルは`public/`に置き、ルートで提供
- TypeScriptは厳格モードで設定
- MDXファイルは`src/pages/`に作成でき、自動的にルーティングされます
- commitする前にはyarn lint, yarn formatを実行してください。

## Journaling workflow

InkdropのMCPサーバーを使用できる状態の場合、あなた (AI エージェント) は、このプロジェクトで行った作業を、タスクの終了ごとに私の Inkdrop ノートに報告してください。

「NOSETECH-LABO」ノートブックに「Log: <Job title>」というタイトルで作成します。

タスクの終了ごとに、次の形式でノートを書いてください。:

## Log: <task title>

- **Prompt**: <受け取った指示>
- **Issue**: <課題の内容>

### What I did: <やったことの要約>

...

### How I did it: <どうやって解決したか>

...

### What were challenging: <難しかったこと>

...

### Future work (optional)

- <今後の改善案など>
