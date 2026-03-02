import CustomCheckbox from '@/components/custom-ui/checkbox'
import TagBadge from '@/components/custom-ui/tag-badge'
import TagFilter from '@/components/custom-ui/tag-filter'

import LinksList from '@/components/custom-ui/links-list'
import SearchBar from '@/components/custom-ui/searchbar'
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarProvider,
} from '@/components/ui/sidebar'
import { usePocketbase } from '@/pocketbase/PocketbaseContext'

export default function HomePage() {
    const { forceTagsFilter, setForceTagsFilter, tagsFilter, tags } = usePocketbase()

    return (
        <>
            <SidebarProvider>
                <Sidebar>
                    <SidebarHeader />
                    <SidebarContent>
                        <SidebarGroup>
                            <div className="flex flex-col gap-5">
                                <h1 className="text-4xl font-extrabold tracking-tight text-balance">The Bibliotek</h1>

                                <SearchBar />

                                <CustomCheckbox
                                    inputId="filter-tags-or"
                                    text="Filtrar que contenga todas las etiquetas seleccionadas."
                                    value={forceTagsFilter}
                                    onChange={setForceTagsFilter}
                                />
                                {tagsFilter.length > 0 && (
                                    <div className="flex flex-row gap-2">
                                        <span>Etiquetas filtradas: </span>
                                        {tags.map((tag) => {
                                            if (tagsFilter.includes(tag.id)) {
                                                return <TagBadge key={tag.id} tag={tag} />
                                            }
                                        })}
                                    </div>
                                )}
                                <TagFilter />
                            </div>
                        </SidebarGroup>
                    </SidebarContent>
                    <SidebarFooter />
                </Sidebar>

                <main className="w-full p-10">
                    <LinksList />
                </main>
            </SidebarProvider>
        </>
    )
}
