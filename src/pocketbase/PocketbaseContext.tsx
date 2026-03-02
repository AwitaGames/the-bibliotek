import type Link from '@/types/link'
import { parseLinkList } from '@/types/link'
import type TagGroup from '@/types/tag-groups'
import { parseTagGroupList } from '@/types/tag-groups'
import type Tag from '@/types/tags'
import { parseTagList } from '@/types/tags'
import PocketBase from 'pocketbase'
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

const API_URL = import.meta.env.VITE_POCKETBASE_URL

const PocketbaseContext = createContext<PocketBaseContext | null>(null)

export interface PocketBaseContext {
    links: Link[]
    setLinks: (t: Link[]) => void

    tags: Tag[]
    setTags: (t: Tag[]) => void

    tagGroups: TagGroup[]
    setTagGroups: (t: TagGroup[]) => void

    textFilter: string
    setTextFilter: (t: string) => void

    nameFilter: boolean
    setNameFilter: (t: boolean) => void

    descFilter: boolean
    setDescFilter: (t: boolean) => void

    urlFilter: boolean
    setUrlFilter: (t: boolean) => void

    forceTagsFilter: boolean
    setForceTagsFilter: (t: boolean) => void

    tagsFilter: string[]
    setTagsFilter: (t: string[]) => void

    currentPage: number
    setCurrentPage: (t: number) => void

    onTagClick: (t: string) => void
}

export function PocketbaseProvider({ children }: { children: ReactNode }) {
    // Data
    const [links, setLinks] = useState<Link[]>([])
    // Tags
    const [tags, setTags] = useState<Tag[]>([])
    // Tag Groups
    const [tagGroups, setTagGroups] = useState<TagGroup[]>([])
    // Filters
    const [textFilter, setTextFilter] = useState<string>('')
    const [nameFilter, setNameFilter] = useState<boolean>(true)
    const [descFilter, setDescFilter] = useState<boolean>(true)
    const [urlFilter, setUrlFilter] = useState<boolean>(true)
    const [forceTagsFilter, setForceTagsFilter] = useState<boolean>(false)
    const [tagsFilter, setTagsFilter] = useState<string[]>([])
    // Settings
    const [currentPage, setCurrentPage] = useState<number>(1)

    const onTagClick = (tagId: string) => {
        setTagsFilter((prev: string[]) => {
            if (prev.includes(tagId)) return prev.filter((prevTagId) => prevTagId !== tagId)
            return [...prev, tagId]
        })
    }

    useEffect(() => {
        const getData = async () => {
            const pocket_base_url = API_URL || 'http://127.0.0.1:8090'

            console.log('Connecting to Pocketbase at: ' + pocket_base_url)

            const pb = new PocketBase(pocket_base_url)

            const textFilterStrings: string[] = []
            const tagFilterStrings: string[] = []

            let filters = '('

            if (nameFilter) {
                textFilterStrings.push(`name ~ '${textFilter}'`)
            }
            if (descFilter) {
                textFilterStrings.push(`description ~ '${textFilter}'`)
            }
            if (urlFilter) {
                textFilterStrings.push(`url ~ '${textFilter}'`)
            }

            filters += textFilterStrings.join(' || ')

            filters += ')'

            if (tagsFilter.length > 0) {
                filters += '&& ( '
                for (const tagFilter of tagsFilter) {
                    tagFilterStrings.push(`tags ~ '${tagFilter}'`)
                }
                if (forceTagsFilter) {
                    filters += tagFilterStrings.join(' && ')
                } else {
                    filters += tagFilterStrings.join(' || ')
                }
                filters += ')'
            }

            // Links
            const linksResult = await pb.collection('links').getList(currentPage, 500, {
                expand: 'tags,tags.tag_group',
                filter: filters,
                sort: 'created',
            })

            // Page Settings
            setCurrentPage(linksResult.page)

            const links: Link[] = parseLinkList(linksResult.items)
            setLinks(links)

            // Tags
            const tagsResult = await pb.collection('tags').getList(1, 999, { expand: 'tag_group' })

            const tags: Tag[] = parseTagList(tagsResult.items)
            tags.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            setTags(tags)

            // Tag groups
            const tagGroupsResult = await pb.collection('tag_groups').getList(1, 999, {})

            const tagGroups: TagGroup[] = parseTagGroupList(tagGroupsResult.items)
            tagGroups.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
            setTagGroups(tagGroups)

            // Filters
        }

        getData()
    }, [currentPage, textFilter, nameFilter, descFilter, urlFilter, tagsFilter, forceTagsFilter])

    return (
        <PocketbaseContext.Provider
            value={{
                links,
                setLinks,
                tags,
                setTags,
                tagGroups,
                setTagGroups,
                textFilter,
                setTextFilter,
                nameFilter,
                setNameFilter,
                descFilter,
                setDescFilter,
                urlFilter,
                setUrlFilter,
                forceTagsFilter,
                setForceTagsFilter,
                tagsFilter,
                setTagsFilter,
                currentPage,
                setCurrentPage,
                onTagClick,
            }}
        >
            {children}
        </PocketbaseContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function usePocketbase() {
    const ctx = useContext(PocketbaseContext)
    if (!ctx) {
        throw new Error('Pocketbase must be used inside <PocketbaseProvider>')
    }
    return ctx
}
