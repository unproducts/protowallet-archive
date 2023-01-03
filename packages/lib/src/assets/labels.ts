import feed from '../feeds';
import { Label } from '../lookups';

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

function recordifyLabelData(labels: Label[]): Record<string, Label> {
    const labelsRecord: Record<string, Label> = {}
    for (let index = 0; index < labels.length; index++) {
        const label = labels[index];
        labelsRecord[label.id] = label;
    }
    return labelsRecord;
}
