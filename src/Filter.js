import { useSelector } from "react-redux"
import { selectUser } from "./app/userSlice"

export const Filter = ({ category, setCategory }) => {
    const categories = useSelector(selectUser).categories
    return (
        <select
            value={category}
            onChange={e => setCategory(e.target.value)}
        >
            <option value="">All</option>
            {categories.map((category, index) =>
                <option
                    key={`category${index}`}
                    value={category._id}
                >
                    {category.name}
                </option>
            )}
        </select>
    )
}