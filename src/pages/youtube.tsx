import type Link from '@/types/link'
import { parseLinkList } from '@/types/link'
import { parseTag } from '@/types/tags'
import PocketBase from 'pocketbase'
import { useEffect, useState } from 'react'

const API_URL = import.meta.env.VITE_POCKETBASE_URL

export default function YoutubePage() {
    const [tagLinks, setTagLinks] = useState<Record<string, Link[]>>({})

    useEffect(() => {
        const getData = async () => {
            const pocket_base_url = API_URL || 'http://127.0.0.1:8090'

            console.log('Connecting to Pocketbase at: ' + pocket_base_url)

            const pb = new PocketBase(pocket_base_url)

            const youtube_tag = await pb.collection('tags').getFirstListItem("name ~ 'Youtube'")
            const youtube_tag_model = parseTag(youtube_tag)

            if (youtube_tag_model == null) {
                console.log('Tag de Youtube no encontrado.')
                return
            }

            // Links
            const linksResult = await pb.collection('links').getList(1, 999, {
                filter: `tags ?~ "${youtube_tag_model.id}"`,
                expand: 'tags,tags.tag_group',
                sort: 'created',
            })
            const links: Link[] = parseLinkList(linksResult.items)

            const groupedTags: Record<string, Link[]> = {}

            links.forEach((link) => {
                link.tags.forEach((tag) => {
                    if (groupedTags[tag.id] == null) {
                        groupedTags[tag.id] = []
                    }

                    groupedTags[tag.id].push(link)
                })
            })

            setTagLinks(groupedTags)
        }

        getData()
    }, [])

    return (
        <>
            <h1>Youtube</h1>

            <div className="flex flex-col p-5 mx-auto gap-5">
                {Object.entries(tagLinks).map(([tagId, group]) => (
                    <div key={tagId} className="p-5">
                        <h4>{tagId}</h4>

                        {group.map((link) => (
                            <div key={link.id} className="border">
                                <a href={link.url} className="text-xl">
                                    {link.name}
                                </a>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}
