import type Tag from '@/types/tags'
import { parseTag } from '@/types/tags'
import type { RecordModel } from 'pocketbase'

export default interface Link {
    id: string
    name: string
    description: string
    url: string
    created: Date
    updated: Date
    tags: Tag[]
}

export function parseLink(record: RecordModel): Link {
    const tags: Tag[] = []

    if (record.expand && record.expand.tags) {
        for (const tagRecord of record.expand.tags) {
            tags.push(parseTag(tagRecord))
        }
    }

    tags.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))

    return {
        id: record.id,
        name: record.name,
        description: record.description,
        url: record.url,
        created: new Date(record.created),
        updated: new Date(record.updated),
        tags: tags,
    }
}

export function parseLinkList(records: RecordModel[]): Link[] {
    const links: Link[] = []

    for (const record of records) {
        links.push(parseLink(record))
    }
    return links
}
