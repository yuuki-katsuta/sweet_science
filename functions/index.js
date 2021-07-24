const puppeteer = require('puppeteer');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;
const adminEmail = functions.config().admin.email;

const serviceAccount = require('./sweet-science-5582e-firebase-adminsdk-xtvd1-0492848891.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.REACT_APP_DATABASE_URL,
});

const PUPPETEER_OPTIONS = {
  args: [
    '--disable-gpu',
    '-–disable-dev-shm-usage',
    '--disable-setuid-sandbox',
    '--no-first-run',
    '--no-sandbox',
    '--no-zygote',
    '--single-process',
  ],
  headless: true,
};

exports.fetchCalendar = functions
  .region('asia-northeast1')
  .runWith({
    timeoutSeconds: 300,
    memory: '2GB',
  })
  .pubsub.schedule('0 0 * * *') //毎日0:00に実行
  .timeZone('Asia/Tokyo')
  .onRun(async () => {
    const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
    const page = await browser.newPage();
    const db = admin.firestore();

    //取得
    const url = 'https://www.boxingscene.com/schedule';
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    const items = await page.$$('.container-fluid .schedule .schedule-fight');

    const matchInformation = [];

    //取得要素
    for await (const item of items) {
      //日付
      const date = await item.$eval(
        'div > div > div.fight-date',
        (e) => e.textContent
      );

      const dateObj = new Date(date);

      const dt = new Date();
      let year = '';
      if (dateObj.getMonth() + 1 < dt.getMonth() + 1) {
        year = dt.getFullYear() + 1;
      } else {
        year = dt.getFullYear();
      }

      const newDate = new Date(`${year} ${date}`);
      console.log(newDate);

      //タイトル
      const title = await item.$eval(
        'a > div.row > div > div > div.fight-title',
        (e) => e.textContent
      );

      //開催地
      const venue = await item.$eval(
        ' a > div.row > div > div > div.schedule-details > div:nth-child(3)',
        (e) => e.textContent
      );

      //放送
      const broadcast = await item.$eval(
        ' a > div.row > div > div > div.schedule-details > div:nth-child(2)',
        (e) => e.textContent
      );

      //時間
      const time = await item.$eval(
        ' a > div.row > div > div > div.schedule-details > div:nth-child(1)',
        (e) => e.textContent
      );

      matchInformation.push({
        date: newDate,
        title: title.trim(),
        venue,
        broadcast,
        time,
      });
    }

    //dbへ保存
    const ref = db.collection('schedule');
    const query = await ref.get();
    //既存のデータ
    const existingSchedule = query.docs.map((doc) => doc.data());

    for await (const matchData of matchInformation) {
      if (existingSchedule.some((m) => m.title === matchData.title)) {
        console.log('発火');
        continue;
      } else {
        await ref.doc().set({
          ...matchData,
          fetchedAt: new Date(),
        });
      }
    }
    await browser.close();
  });

//ユーザー権限（管理者）付与
exports.addAdminClaim = functions.firestore
  //admin_usersというテーブルになんかしらの値（docID）の変更を監視している。
  .document('admin_users/{docID}')
  //ドキュメントが最初に書き込まれたときにトリガー
  .onCreate((snap) => {
    const newAdminUser = snap.data();
    if (newAdminUser === undefined) {
      return;
    }
    modifyAdmin(newAdminUser.uid, true);
    //true: 管理者
  });

//ユーザー権限（管理者）消去
exports.removeAdminClaim = functions.firestore
  .document('admin_users/{docID}')
  .onDelete((snap) => {
    const deletedAdminUser = snap.data();
    if (deletedAdminUser === undefined) {
      return;
    }
    modifyAdmin(deletedAdminUser.uid, false);
    //false: 管理者ではないユーザー
  });

const modifyAdmin = (uid, isAdmin) => {
  admin.auth().setCustomUserClaims(uid, { admin: isAdmin }).then();
};

const mailTransport = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  secure: true,
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});
//メールテンプレート
const mailContents = (data) => {
  return `以下内容でホームページよりお問い合わせを受けました。
  お名前${data.name}
  内容:${data.message}
`;
};
//メール送信
exports.sendMail = functions.https.onCall((data) => {
  const email = {
    from: gmailEmail,
    to: adminEmail,
    subject: 'boxing-labフィードバック',
    text: mailContents(data),
  };
  mailTransport.sendMail(email, (err) => {
    if (err) {
      return alert(err.message);
    }
  });
});
