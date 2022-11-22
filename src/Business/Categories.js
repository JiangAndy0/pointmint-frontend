export const Categories = ({categories, setPage}) => {
    return(
        <div>
            {categories.map((category, index) => 
                <button key={`category${index}`}>
                    {category.name}
                </button>
            )}
            <button
                onClick={() => setPage('addCategory')}
            >
                + Add Category
            </button>
        </div>
    )
}