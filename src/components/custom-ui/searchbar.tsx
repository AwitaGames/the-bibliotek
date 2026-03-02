import CustomCheckbox from '@/components/custom-ui/checkbox'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { usePocketbase } from '@/pocketbase/PocketbaseContext'
import { Search } from 'lucide-react'

export default function SearchBar() {
    const { textFilter, descFilter, setDescFilter, setTextFilter, nameFilter, setNameFilter, urlFilter, setUrlFilter } =
        usePocketbase()

    return (
        <InputGroup>
            <InputGroupInput
                value={textFilter}
                onChange={(e) => setTextFilter(e.target.value)}
                placeholder="Buscar..."
            />
            <InputGroupAddon>
                <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
                <div className="flex flex-row gap-5 px-2">
                    <CustomCheckbox inputId="filter-name" text="Nombre" value={nameFilter} onChange={setNameFilter} />
                    <CustomCheckbox
                        inputId="filter-description"
                        text="Descripción"
                        value={descFilter}
                        onChange={setDescFilter}
                    />
                    <CustomCheckbox inputId="filter-url" text="Url" value={urlFilter} onChange={setUrlFilter} />
                </div>
            </InputGroupAddon>
        </InputGroup>
    )
}
