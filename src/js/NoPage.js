import "../css/Home.css";

function NoPage() {
    return (
        <div id="home-content" className="page-root d-flex flex-column min-vh-100 min-vw-100 justify-content-center align-items-center">
            <h1 id="my-name" className="display-4 text-uppercase seq-anim">404 Not Found</h1>
        </div>
    )
}

export default NoPage;