"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("reflect-metadata");

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

require("express-async-errors");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

require("../../container");

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _AppError = require("../../errors/AppError");

var _typeorm = _interopRequireDefault(require("../typeorm"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import cors from "cors";
// import * as Sentry from "@sentry/node";
// import * as Tracing from "@sentry/tracing";
// import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
(0, _typeorm.default)();
const app = (0, _express.default)(); // app.use(rateLimiter);
// Sentry.init({
//   dsn: process.env.SENTRY_DSN,
//   integrations: [
//     new Sentry.Integrations.Http({ tracing: true }),
//     new Tracing.Integrations.Express({ app }),
//   ],
//   tracesSampleRate: 1.0,
// });
// app.use(Sentry.Handlers.requestHandler());
// app.use(Sentry.Handlers.tracingHandler());

exports.app = app;
app.use(_express.default.json());
app.use("/api-docs", _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_swagger.default));
app.use("/avatar", _express.default.static(`${_upload.default.tmpFolder}/avatar`));
app.use("/cars", _express.default.static(`${_upload.default.tmpFolder}/cars`)); // app.use(cors());

app.use(_routes.router); // app.use(Sentry.Handlers.errorHandler());

app.use((err, request, response, next) => {
  if (err instanceof _AppError.AppError) {
    return response.status(err.statusCode).json({
      message: err.message
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  });
});