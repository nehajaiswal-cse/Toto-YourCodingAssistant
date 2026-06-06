const express = require("express");
const { generateCodeController } = require("../controllers/ai.controller");
const { fixCode } = require("../controllers/ai.controller");

const router = express.Router();

router.post("/generate", generateCodeController);
router.post("/fix",fixCode)

module.exports = router;