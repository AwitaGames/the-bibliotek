import type { RecordModel } from 'pocketbase'

export default interface Tag {
    id: string
    name: string
    description: string
}

export function parseTag(record: RecordModel): Tag {
    return {
        id: record.id,
        name: record.name,
        description: record.description,
    }
}

export function parseTagList(records: RecordModel[]): Tag[] {
    const tags: Tag[] = []

    for (const record of records) {
        tags.push(parseTag(record))
    }
    return tags
}
