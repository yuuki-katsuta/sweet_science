# Boxing lab ~ ボクシングファンのためのチャットアプリ ~

https://boxing-lab.net/  
ゲストログインボタンから、メールアドレスとパスワードを入力せずにログインできます

## サービス概要

ボクシングの採点結果について談論・ディスカッションすることができます。<br/>
ボクシングは通称 「The sweet science」,「The art of hitting and not getting hit」と呼ばれています。<br/>
その名の通り、科学のように秩序だった思考が要求されるスポーツであることを理解し、多様な視点からボクシングを楽しめるようになれたら嬉しいです。

## 使い方

### サインアップ画面
<img src="https://user-images.githubusercontent.com/60274709/113470102-d16fd980-948d-11eb-8771-86a241892977.jpg" width="700px">
フォーム下部の「Already have an account? Log in」をクリックすると、ログインフォームに切り替わります。

### ホーム画面
<img src="https://user-images.githubusercontent.com/60274709/113470919-dfc0f400-9493-11eb-9dce-c7ceb2261282.jpg" width="700px">

ボクシングの試合一覧と更新情報を表示しています。<br>
一覧内の試合情報をクリックすることで、各チャットページへ遷移します。

### チャット画面
<img src="https://user-images.githubusercontent.com/60274709/113470475-f6b21700-9490-11eb-84e8-472b0593d75a.jpg" width="700px">

他のユーザーとリアルタイムチャットを楽しむことができます。<br>
また、各メッセージに対して、いいねを付与することができます。

### 試合情報追加フォーム
<img src="https://i.gyazo.com/6da840f6c6d5799b58ef35ef2c3180e0.png" width="700px">

管理者のみ試合情報を追加できます。

### プロフィール画面
<img src="https://user-images.githubusercontent.com/60274709/113470805-3974ee80-9493-11eb-82d5-7aa2617f99d8.jpg" width="700px">

ユーザー名・メールアドレス・パスワード・イメージ画像を変更することができます。<br>
ゲストユーザーの場合、変更することはできません。

### about画面
<img src="https://user-images.githubusercontent.com/60274709/113470824-590c1700-9493-11eb-9058-cfccd0fd310b.jpg" width="700px">

本アプリケーションについての概要と、簡単なボクシングの基本情報を載せています。

### フィードバック送信画面
<img src="https://user-images.githubusercontent.com/60274709/114713793-703ce580-9d6c-11eb-87cd-f559ba426ec7.jpg" width="700px">

ユーザーからの要望やバグ報告などを受け取り、改善に努めてまいります。

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
- チャットルーム作成(管理者のみ)
- プロフィール画像のアップロード/削除
- ユーザーからのフィードバックの受け取り
  - nodemailerを用いてメールを受信

## 使用技術

React × Firebase

フロントエンド

- react 17.0.1
- react-dom 17.0.1
- react-scripts 4.0.1
- react-responsive 8.2.0
- react-router-dom 5.2.0
- styled-components 5.2.1

バックエンド

- Firebase 8.2.4
  - Authentication
  - Hosting
  - Cloud Storage
  - Cloud Firestore
  - Cloud Functions

## セットアップ

```
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn start

# build for production and launch server
$ yarn build
```
