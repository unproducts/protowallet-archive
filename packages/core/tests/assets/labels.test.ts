import { describe, it, expect } from "vitest";
import { labels } from "../../src";
import feed from '../../src/feeds';
import { Label } from "../../src/lookups";

describe('Assets > Labels', async () => {
    let label: Label;
    it('createLabel()', async () => {
        label = await labels.createLabel({
            value: 'label1',
        })
        expect(label.id).not.toBeNull();
        expect(label.accent).not.toBeNull();

        const n = feed.labels.count();
        expect(n).toBe(1);
    })
    it('getAllLabels()',async () => {
        const allLabels = await labels.getAllLabels();
        expect(allLabels[label.id].value).toBe(label.value);
        expect(Object.keys(allLabels).length).toBe(1);
    })
    it('getLabels()', async () => {
        const labelData = await labels.getLabels([label.id]);
        expect(labelData[label.id].value).toBe(label.value);
        expect(Object.keys(labelData).length).toBe(1);
    })
})