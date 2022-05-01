import fs from 'fs/promises';
import path from 'path';
import { Device } from './types/device';

const filePath = path.join(__dirname, 'devices.json');

export class Devices {
    public static async add(device: Device): Promise<void> {
        const devices = await this.getAll();
        if (devices.has(device.endpoint)) { return; }
        devices.set(device.endpoint, device);
        await this.save(devices)
    }

    public static async getAll(): Promise<Map<string, Device>> {
        let devices: Device[] = [];
        try {
            devices = JSON.parse((await fs.readFile(filePath)).toString());
        } catch (e) {}
        return new Map(devices.map(d => [d.endpoint, d]));
    }

    private static async save(devices: Map<string, Device>): Promise<void> {
        await fs.writeFile(filePath, JSON.stringify([...devices.values()]));
    }
}