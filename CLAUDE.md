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
- commit する前はyarn formatを実行してください。
