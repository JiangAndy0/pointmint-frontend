export const Categories = ({ categories, setPage, setCategory}) => {
    return(
        <div>
            {categories.map((category, index) => 
                <button 
                    key={`category${index}`}
                    onClick={() => {
                        setCategory(category)
                        setPage("editCategory")
                    }}
                >
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