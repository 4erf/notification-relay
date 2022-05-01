import { Router } from "express";
import webpush from 'web-push';
import { Devices } from "./devices";

const router = Router();

router.post('/register-subscription', async (req, res) => {
    await Devices.add(req.body);
    res.status(201).end()
})

export default router;