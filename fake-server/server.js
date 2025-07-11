// این سرورِ فیک برای تستِ گاردِ لاگینِ روت‌های بعد از لاگین
// با json-server و jwt ساخته شده
const jsonServer = require('json-server');
const jwt        = require('jsonwebtoken');

const server      = jsonServer.create();
const router      = jsonServer.router('fake-server/db.json');
const middlewares = jsonServer.defaults();
const SECRET      = 'SuperSecretKey';


server.use(middlewares);
server.use(jsonServer.bodyParser);

// ۱) اِندپوینت لاگین
server.post('/users/login', (req, res) => {
  const { username, password } = req.body;
// اگر نام کاربری و رمز عبور ادمین بود، توکن بساز
  if (username === 'admin' && password === 'admin') {
    const token = jwt.sign({ username: 'admin',role: 'admin' }, SECRET, { expiresIn: '2h' });
    return res.json({ token });
  }
  res.status(401).json({ error: 'نام کاربری یا رمز عبور اشتباه' });
});

// ۲) گاردِ همهٔ مسیرهای بعد از لاگین
server.use((req, res, next) => {
  // اجازه بده لاگینِ بالا آزاد رد شه
  if (req.path === '/users/login') return next();

  // Authorization: Bearer <token>
  const authHeader = req.headers.authorization || '';
  const [, token]  = authHeader.split(' ');

  try {
    jwt.verify(token, SECRET); //برسی توکن
    next();
  } catch {
    res.sendStatus(401);  //توکن نامعتبره میاد اینجا
  }
});

// ۳) بقیهٔ روت‌های REST خود json-server
server.use(router);
server.listen(3000, () => console.log('Fake server is running on http://localhost:3000'));
console.log(router.db.getState());


// node fake-server/server.js

