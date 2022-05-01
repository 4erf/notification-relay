import { Router } from "express";
import webpush from 'web-push';
import { Devices } from "./devices";
import { PushSubscription } from 'web-push';
import { ErrorRes } from "./types/error-response";
import { RelayNotificationRes } from "./types/relay-notification-response";
import { Notification } from "./types/notification";

const router = Router();

router.post<void, ErrorRes, PushSubscription>('/register-subscription', async (req, res) => {
    const missing = [
        !req.body?.endpoint,
        !req.body?.keys?.auth,
        !req.body?.keys?.p256dh,
    ]
    if (missing.some(Boolean)) {
        res.status(400).json({
            error: `Invalid Push Subscription`
        })
        return;
    }
    await Devices.add({
        ...req.body,
        userAgent: req.headers["user-agent"] || '',
    });
    res.status(201).end()
})

router.post<
    void, RelayNotificationRes[] | ErrorRes, Notification
>('/relay-notification', async (req, res) => {
    const missing = [
        !req.body?.title,
        !req.body?.body,
        !req.body?.url,
    ]
    if (missing.some(Boolean)) { 
        res.status(400).json({
            error: "Invalid Notification Content"
        });
        return;
    }
    const devices = await Devices.getAll();
    const results = [...devices.values()].map(device => {
        try {
            webpush.sendNotification(device, JSON.stringify(req.body));
            return { userAgent: device.userAgent, success: true }
        } catch (e: any) {
            return { userAgent: device.userAgent, success: false, error: e.message }
        }
    })
    res.status(200).json(results)
})

export default router;