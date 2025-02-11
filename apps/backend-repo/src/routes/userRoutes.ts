import { Router } from "express";
import {
  createUser,
  fetchUser,
  modifyUser,
  removeUser,
} from "../controller/api";
import { authMiddleware } from "../middleware/auth";

const router = Router();

router.get(
  "/fetch-user-data",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  fetchUser
);
router.post(
  "/add-user-data",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  createUser
);
router.put(
  "/update-user-data/:id",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  modifyUser
);
router.delete(
  "/delete-user-data/:id",
  (req, res, next) => {
    authMiddleware(req, res, next);
  },
  removeUser
);

export default router;
