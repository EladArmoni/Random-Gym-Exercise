import Button from "../components/Button";
const Home = () => {
    return (
        <>
            <div className="container-fluid text-light p-5 background d-flex" id="main">
                <div className="text-center m-auto">
                    <h1 className="h1 mb-4 mainHeader">Maximize Results With <br /> <span style={{ color: "#019AF7" }}>Random Exercise</span></h1>
                    <Button text="START NOW" handleFunction={()=>window.location.href = '/muscles'} />
                </div>
            </div>
        </>
    )
};

export default Home;
