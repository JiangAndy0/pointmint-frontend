export const Title = ({ title, setPage, setPageTo }) => {
    return (
        <div>
            <h2>{title}</h2>
            <button
                onClick={() => setPage(setPageTo ? setPageTo : 'home')}
            >
                ✖
            </button>
        </div>
    )
}