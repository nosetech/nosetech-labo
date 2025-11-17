GitHub issueを分析して実行してください: issue番号 $ARGUMENTS

以下の手順で進めてください。

1. `gh issue view` で issue 詳細を取得
2. 問題の理解
3. 関連ファイルの検索
4. 修正の実装
5. yarn lintを実行し、エラーがあれば修正する。
6. yarn formatを実行する
7. コミット(developブランチに直接コミットしないこと。feature/\*ブランチにコミットすること。)
8. developブランチへのプルリクエスト作成
