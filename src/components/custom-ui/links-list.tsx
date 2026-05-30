import LinkPopover from '@/components/custom-ui/link-popover'
import TagBadge from '@/components/custom-ui/tag-badge'
import { usePocketbase } from '@/pocketbase/PocketbaseContext'

export default function LinksList() {
    const { links } = usePocketbase()

    return (
        <div className="w-full px-5 flex flex-col gap-5 justify-center mx-auto">
            <div className="flex flex-col gap-5 rounded-lg overflow-hidden">
                <div>
                    {links.map((link) => {
                        return (
                            <div
                                className={`group relative flex flex-row gap-10 duration-500 hover:p-2 hover:ml-1 hover:bg-secondary`}
                            >
                                <div className="flex flex-row gap-5 w-[30%]">
                                    <LinkPopover link={link} />

                                    <div className="flex flex-col">
                                        <a href={link.url} className="hover:underline" target="_blank">
                                            <span className="text-lg">{link.name || ''} </span>
                                        </a>

                                        {link.description && (
                                            <p className="text-primary/75 pt-0 overflow-hidden h-0 group-hover:block group-hover:h-20 group-hover:pt-3 duration-500">
                                                <div
                                                    className="text-wrap"
                                                    dangerouslySetInnerHTML={{
                                                        __html: link.description || 'Sin descripción',
                                                    }}
                                                ></div>
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div key={link.id} className="flex flex-wrap gap-1 items-center w-[50%]">
                                    {link.tags.map((tag, idx) => {
                                        return (
                                            <TagBadge
                                                key={tag.id}
                                                tag={tag}
                                                append={idx < link.tags.length - 1 ? ',' : ''}
                                            />
                                        )
                                    })}
                                </div>

                                <div className="w-[10%] object-right overflow-visible rounded-xl h-full ">
                                    <img
                                        src={link.og_image}
                                        className="scale-1 hidden h-0 mx-auto group-hover:scale-250 group-hover:block group-hover:h-full transition-500 "
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
