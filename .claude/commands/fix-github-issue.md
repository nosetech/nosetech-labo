GitHub issueを分析して実行してください: issue番号 $ARGUMENTS

以下の手順で進めてください。

1. **Issue 詳細の取得**
   - `gh issue view <issue-number>` で issue 詳細を取得

2. **問題の理解**
   - Issue の説明、背景、要件を理解する

3. **関連ファイルの検索**
   - 実装に必要なファイルを特定する

4. **実装の計画**
   - plan modeで実装の計画を立てる

5. **コードの実装**
   - feature/\* ブランチで実装を進める

6. **コード品質チェック**
   - `yarn format`を実行して、フォーマットを修正する
   - `yarn lint`を実行して、エラーがあれば修正する。
   - 問題なければ feature ブランチにコミットする

7. **プルリクエスト作成**
   - develop ブランチへのプルリクエストを作成する
   - PR の説明に「Closes #issue-number」を記載する
   - **PR 作成完了をコンソールに表示する**

8. **CI 完了待機と確認**
   - GitHub Actions による CI が実行される
   - CI 完了を待つ（`gh pr view <PR-number> --json statusCheckRollup` で確認）
   - **CI が SUCCESS で完了したことを確認してから次へ進む**
   - エラーがあれば、原因を調査して修正する
