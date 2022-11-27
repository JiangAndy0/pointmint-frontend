export const Categories = ({ categories, setPage, setCategory}) => {
    return(
        <div className="tab-page">
            {categories.length === 0 && <p style={{textAlign: 'left'}}>No categories, tap on +Add Category to create one.</p>}
            {categories.map((category, index) => 
                <button 
                    className="category-entry"
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
                className="link"
                onClick={() => setPage('addCategory')}
            >
                + Add Category
            </button>
        </div>
    )
}