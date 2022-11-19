export const Categories = ({categories}) => {
    return(
        <div>
            {categories.map((category, index) => 
                <button key={`category${index}`}>
                    {category.name}
                </button>
            )}
            <button>
                + Add Category
            </button>
        </div>
    )
}