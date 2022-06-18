# Boxing lab ~ ボクシングファンのためのチャットアプリ ~

https://boxing-lab.net/  
ゲストログインボタンから、メールアドレスとパスワードを入力せずにログインできます

<img width="750" alt="42701c647be32eb476c99dd2723f7598" src="https://user-images.githubusercontent.com/60274709/164981600-32edac7a-cbd7-4628-a70f-148accfefcd3.png">

## サービス概要

ボクシングの採点結果について談論・ディスカッションすることができます。<br/>
また、試合のスコアカードを作成し共有することができます<br/>
ボクシングは通称 「The sweet science」,「The art of hitting and not getting hit」と呼ばれています。<br/>
その名の通り、科学のように秩序だった思考が要求されるスポーツであることを理解し、多様な視点からボクシングを楽しめるようになれたら嬉しいです。

## 主要ページについて

### サインアップ画面
<img src="https://user-images.githubusercontent.com/60274709/155864268-8a6babe0-a8b5-4111-ac8a-a51e01dbe7d4.jpg" width="600px">
フォーム下部の「Already have an account? Log in」をクリックすると、ログインフォームに切り替わります。

### ホーム画面
<img src="https://user-images.githubusercontent.com/60274709/155864294-4482a5ce-d873-4924-b503-7baae205f77a.jpg" width="600px">

ボクシングの試合一覧と更新情報を表示しています。<br>
一覧内の試合情報をクリックすることで、各チャットページへ遷移します。

### チャット画面
<img src="https://user-images.githubusercontent.com/60274709/155864363-f505707a-65e5-44a3-987d-2e65ebb01b14.jpg" width="600px">

その試合の概要や公式採点結果などを表示しています。<br>
他のユーザーとチャットを楽しむことができます。

### スコアカード追加画面
<img src="https://user-images.githubusercontent.com/60274709/155864349-2d6b0250-f096-40ec-8e30-81e283b106a7.jpg" width="600px">

自分の採点結果をを追加することができます。

## 機能

- 認証
  - ユーザー登録/ログイン
  - 管理者権限でのログイン
  - 匿名ログイン
  - メールアドレス・パスワード・ユーザー名変更
  - 再認証機能
  - ログアウト
- メッセージ投稿
  - いいね付与
- スコアカード追加機能
- チャットルーム作成(管理者のみ)
- プロフィール画像のアップロード/削除
- フィードバックの送信機能
  - nodemailerを用いて送受信
- puppeteerを用いたスクレイピング機能

## 使用技術

React × Firebase

フロントエンド

- react 18.0.0
- react-dom 18.0.0
- react-scripts 4.0.1
- react-router-dom 5.2.0
- recoil 0.5.2
- swr 1.1.2
- react-alert 7.0.2
- react-responsive 8.2.0
- styled-components 5.2.1
- Material-UI

バックエンド

- Firebase 8.2.4
  - Authentication
  - Hosting
  - Cloud Storage
  - Cloud Firestore
  - Cloud Functions
    - puppeteer 10.1.0
    - nodemailer 6.5.0
    - firebase-admin 9.2.0
  
## ユーザーの声
<p>
<img width="200" alt="42701c647be32eb476c99dd2723f7598" src="https://user-images.githubusercontent.com/60274709/164981783-15a77309-ea07-4b31-87b6-6670d1e50a84.png">
<img width="200" alt="42701c647be32eb476c99dd2723f7598" src="https://user-images.githubusercontent.com/60274709/164981811-707e594c-972b-4e45-8661-b78737892188.png">
<img width="200" alt="42701c647be32eb476c99dd2723f7598" src="https://user-images.githubusercontent.com/60274709/164981859-dcd30f46-33cc-45c4-a568-74e1744778d3.png">
<img width="200" alt="42701c647be32eb476c99dd2723f7598" src="https://user-images.githubusercontent.com/60274709/164981843-81facdab-27b2-4dee-9fe7-df53f6edba74.png">
 </p>
 
## セットアップ

```
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn start

# build for production and launch server
$ yarn build
```
