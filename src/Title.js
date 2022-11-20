export const Title = ({ title, setPage, setPageTo, setTab, setTabTo }) => {
    return (
        <div>
            <h2>{title}</h2>
            <button
                onClick={() => {
                    setPage(setPageTo ? setPageTo : 'home')
                    if(setTab && setTabTo){
                        setTab(setTabTo)
                    }
                }}
            >
                ✖
            </button>
        </div>
    )
}