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
