import feed from '../feeds';
import { Label } from '../lookups';
import { generateRandomColor, generateRandomStringOfLength } from '../utils';

export type CreateLabelOptions = {
    value: string;
    accent?: string;
}

export async function createLabel(options: CreateLabelOptions): Promise<Label> {
    const label: Label = {
        id: generateRandomStringOfLength(3),
        value: options.value,
        accent: options.accent || generateRandomColor()
    }
    return feed.labels.insert(label);
}

export async function getLabels(query: string[]): Promise<Record<string, Label>> {
    const labels: Label[] = feed.labels.find({
        id: {
            $in: query
        }
    });
    return recordifyLabelData(labels);   
}

export async function getAllLabels(): Promise<Record<string, Label>> {
    const labels: Label[] = feed.labels.find();
    return recordifyLabelData(labels);
}

export async function getAllLabels_Flat(): Promise<Label[]> {
    return feed.labels.find();
}

function recordifyLabelData(labels: Label[]): Record<string, Label> {
    const labelsRecord: Record<string, Label> = {}
    for (let index = 0; index < labels.length; index++) {
        const label = labels[index];
        labelsRecord[label.id] = label;
    }
    return labelsRecord;
}
