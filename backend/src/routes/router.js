import { Router } from "express";
import { User, FoundItem, LostItem, Mail, Image } from "../models/schema.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import bodyParser from "body-parser";
const router = Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "/uploads/"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.fieldname + "-" + Date.now());
//   },
// });

// const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    let data = await FoundItem.find({})
      .select({ category: 1, found_location: 1, time: 1, remark: 1 })
      .exec();
    res.status(200).send({ dataList: data });
  } catch (err) {
    res.status(403).send({ dataList: [] });
  }
});

router.get("/search", async (req, res) => {
  // parse the query string
  const {
    queryType,
    category,
    location,
    startTime,
    endTime,
    name,
    student_id,
  } = req.query;

  // make a mongoose query object
  let query = {};
  if (category) {
    query.category = category;
  }
  if (location) {
    query.found_location = location;
  }
  if (startTime || endTime) {
    query.time = {};
    if (startTime) {
      let startDate = new Date(startTime);
      query.time.$gte = startDate.toISOString();
    }
    if (endTime) {
      let endDate = new Date(endTime);
      query.time.$lte = endDate.toISOString();
    }
  }
  if (name) {
    query["mislayer_clue.name"] = name;
  }
  if (student_id) {
    query["mislayer_clue.student_id"] = student_id;
  }

  // actual query
  try {
    const data = await FoundItem.find(query)
      .select({
        category: 1,
        found_location: 1,
        time: 1,
        remark: 1,
        mislayer_clue: 1,
      })
      .exec();
    res.status(200).send({ dataList: data });
  } catch (err) {
    res.status(403).send({ dataList: [] });
  }
});

// router.post("/checkPassword", jsonParser, async (req, res) => {
//   await Mail.findOne({
//     ID: req.body.params.ID,
//     info: req.body.params.location + " " + req.body.params.time,
//   }).exec(async function (err, data) {
//     if (err) {
//       res.status(403).send({ messages: "error" });
//     } else {
//       if (data.checkPassword === parseInt(req.body.params.password)) {
//         await Card.updateOne(
//           {
//             ID: req.body.params.ID,
//             time: req.body.params.time,
//             location: req.body.params.location,
//           },
//           { founded: "True" }
//         )
//           .then(() => res.status(200).send({ messages: "correct" }))
//           .catch((err) => {
//             console.log(err);
//             res.status(403).send({ messages: "error" });
//           });
//       } else {
//         res.status(200).send({ messages: "wrong" });
//       }
//     }
//   });
// });
export default router;
