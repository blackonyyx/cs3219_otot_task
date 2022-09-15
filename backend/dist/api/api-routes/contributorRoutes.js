"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var contactController = _interopRequireWildcard(require("../controller/contributorController.js"));

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const router = (0, _express.default)(); // Set default API response

router.get("/", function (req, res) {
  res.json({
    status: "API Its Working",
    message: "Welcome to Contacts API!",
    root: "/server/contributor",
    routes: ["GET/POST: /contributor", "GET/POST/PUT/DELETE: contributor/:contributor_id"]
  });
});
router.route("/contributor").get(contactController.showAllContributor).post(contactController.createContributor);
router.route("/contributor/:contributor_id").get(contactController.viewContributor).patch(contactController.updateContributor).put(contactController.updateContributor).delete(contactController.deleteContributor); // Export API routes

var _default = router;
exports.default = _default;