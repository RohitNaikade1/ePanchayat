const express=require('express');
const app=express();
const cors=require('cors');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
// const passport=require('passport');
const keys = require('./config/keys');
const path=require('path');
const authRouter=require('./routes/authRouter')
const schemeRouter=require('./routes/schemeRouter')
const popRouter=require('./routes/popRouter')
const notifyRouter=require('./routes/notifyRouter')
const villagerRouter=require('./routes/villagerRoute')
const ResRouter=require('./routes/ResRouter')
const paymentRouter=require('./routes/paymentRouter')
const currComRouter=require('./routes/currCommitteeRouter.js')
const prevComRouter=require('./routes/prevCommitteeRouter.js')
const RevenueRouter=require('./routes/revenueRoute')
const litRouter=require('./routes/litRouter')
// const cookieSession=require('cookie-session');
const fileUpload=require('express-fileupload');
app.use(fileUpload());

const PORT=process.env.PORT || 5001;
mongoose.connect("mongodb+srv://eGram:@TeamIAF@grampanchayat.jtyap.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
{ useNewUrlParser: true,
    useUnifiedTopology: true,
     useFindAndModify: false },()=>{
    console.log("Connected to DB");
});
// app.use(cookieSession({
//     maxAge:30*24*60*60*1000,
//     keys:[keys.COOKIEKEY]
// }));

// const parseUrl = express.urlencoded({ extended: false });
// const parseJson = express.json({ extended: false });

app.use(cors());
// app.use(passport.initialize());
app.use(express.json());
// app.use(passport.session());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/public',express.static(path.join(__dirname,'schemeUploads')));
app.use('/residence',express.static(path.join(__dirname,'/controller/images/Residence certificate')));
app.use('/revenue',express.static(path.join(__dirname,'/controller/images/Revenue tax receipt')));
app.use('/user',authRouter);
app.use('/populate',popRouter);
app.use('/literate',litRouter);
app.use('/residence',ResRouter);
app.use('/revenue',RevenueRouter);
app.use('/villager',villagerRouter);
app.use('/schemes',schemeRouter);
app.use('/currCommittee',currComRouter);
app.use('/prevCommittee',prevComRouter);
app.use('/notify',notifyRouter);
app.use('/pay',paymentRouter);
require('./models/userSchema');
// require('./services/passport');
// require('./routes/oAuthRouter')(app);
app.listen(PORT,()=>{
    console.log("Server connected successfully on "+PORT);
});