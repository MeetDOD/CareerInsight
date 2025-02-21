const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();
require('./Config/db');
const cookieParser = require('cookie-parser');
const userRoute = require('./Routes/user.route');
const courseRoutes = require('./Routes/usercourse.route');
const resumeRoutes = require('./Routes/userresume.route');
const  insightsRoutes = require("./Routes/insights.route")
const fileUpload = require('express-fileupload');
const { cloudnairyconnect } = require("./Config/cloudinary");
require('./jobs/schedular')

const port = process.env.PORT || 4000;

app.use(cors({ origin: "*" }));
app.use(cookieParser());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.json({ limit: '50mb' }));
app.use(fileUpload({ useTempFiles: true }))
app.use(express.static(path.join(__dirname, 'deployments')));

cloudnairyconnect();

app.use("/api/user", userRoute);
app.use("/api/usercourse", courseRoutes);
app.use("/api/userresume", resumeRoutes);
app.use("/api/insights", insightsRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}
);