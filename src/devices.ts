import fs from 'fs/promises';
import path from 'path';

const filePath = path.join(__dirname, 'devices.json');

export class Devices {
    public static async add(device: PushSubscription): Promise<void> {
        const devices = await this.getAll();
        if (devices.has(device.endpoint)) { return; }
        devices.set(device.endpoint, device);
        await this.save(devices)
    }

    public static async getAll(): Promise<Map<string, PushSubscription>> {
        let devices: PushSubscription[] = [];
        try {
            devices = JSON.parse((await fs.readFile(filePath)).toString());
        } catch (e) {}
        return new Map(devices.map(d => [d.endpoint, d]));
    }

    private static async save(devices: Map<string, PushSubscription>): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify([...devices.values()]));
    }
}