import TagBadge from '@/components/custom-ui/tag-badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import type Link from '@/types/link'
import type Tag from '@/types/tags'
import { type ColumnDef } from '@tanstack/react-table'
import { ArrowUpRight, Copy, Plus } from 'lucide-react'

export const columns: ColumnDef<Link>[] = [
    {
        accessorKey: 'name',
        header: 'Nombre',
        cell: ({ row }) => {
            const name: string = row.getValue('name')
            const description: string = row.original.description
            const createdDate: string = row.original.created.toLocaleString()
            const updatedDate: string = row.original.updated.toLocaleString()

            return (
                <div className="flex flex-row min-w-75 gap-5">
                    <Popover>
                        <PopoverTrigger>
                            <Plus />
                        </PopoverTrigger>
                        <PopoverContent className="w-100 h-auto">
                            <div className="flex flex-col gap-2 ">
                                <div className="h-auto w-full object-contain object-center overflow-hidden rounded-xl">
                                    <img src={row.original.og_image} className="mx-auto" />
                                </div>
                                <div className="text-xs">Creado: {createdDate.toLocaleString()}</div>
                                <div className="text-xs">Actualizado: {updatedDate.toLocaleString()}</div>
                                <div className="font-semibold">{name || 'Sin nombre'} </div>
                                <div
                                    className="text-wrap"
                                    dangerouslySetInnerHTML={{ __html: description || 'Sin descripción' }}
                                ></div>
                            </div>
                        </PopoverContent>
                    </Popover>

                    <a href={row.original.url} className="hover:underline" target="_blank">
                        <span className="text-lg">{name || ''} </span>
                    </a>
                </div>
            )
        },
    },
    {
        accessorKey: 'tags',
        header: 'Etiquetas',
        cell: ({ row, table }) => {
            const tags: Tag[] = row.getValue('tags')
            const selectedTags = table.options.meta?.tagsFilters || []
            const onClickTag = table.options.meta?.onClickTag || undefined

            return (
                <div key={row.id} className="flex flex-wrap gap-1 items-center min-w-75">
                    {tags.map((tag) => {
                        return (
                            <TagBadge
                                key={tag.id}
                                selected={selectedTags.includes(tag.id)}
                                onClick={onClickTag}
                                tag={tag}
                            />
                        )
                    })}
                </div>
            )
        },
    },
    {
        accessorKey: 'url',
        header: 'Enlace',
        cell: ({ row }) => {
            const url: string = row.getValue('url')

            const copyUrl = async () => {
                await navigator.clipboard.writeText(url)
            }

            return (
                <div className="flex flex-row gap-3 items-center ">
                    <a href={url} className="max-w-50 underline underline-offset-2 wrap-break overflow-clip">
                        {url}
                    </a>
                    <Button variant="outline" size="sm" onClick={copyUrl}>
                        <Copy />
                    </Button>
                    <a href={url}>
                        <Button variant="outline" size="sm" onClick={copyUrl}>
                            <ArrowUpRight />
                        </Button>
                    </a>
                </div>
            )
        },
    },
]
