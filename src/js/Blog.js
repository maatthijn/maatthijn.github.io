import "../css/Blog.css";
import Table from 'react-bootstrap/Table';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useState, useEffect } from "react";
import dayjs from "dayjs";

function Blog() {
    function estimateReadingTime(paragraphs) {
        const text = paragraphs.join(" ");
        const wordCount = text.trim().split(/\s+/).length;
        const readingTime = Math.floor(wordCount / 250);
        return { wordCount, readingTime };
    }

    function sortBlogsByDate(data) {
        return Object.entries(data).sort(
            (a, b) => new Date(b[1].datetime) - new Date(a[1].datetime)
        );
    }

    function formatBlogDate(dateString, includeTime = false) {
        const format = includeTime ? "MMM D YYYY, h:mm A" : "MMM D YYYY";
        return dayjs(dateString).format(format);
    }

    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        document.title = "Blog | HAFIDH MAULANA MATIN"
        fetch('/blog.json')
            .then((res) => res.json())
            .then((data) => {
                const sorted = sortBlogsByDate(data);
                setBlogs(sorted);
            })
            .catch((err) => console.error("Failed to fetch blog data:", err));
    }, []);

    const [show, setShow] = useState(false);
    const [shouldRender, setShouldRender] = useState(false);

    const handleShow = () => {
        setShouldRender(true);
        setTimeout(() => setShow(true), 10)
    };
    const handleClose = () => {
        setShow(false)
        setTimeout(() => setShouldRender(false), 800);
    };

    return (
        <>
            <div id="blog-content" className="page-root contents min-vh-100 min-vw-50 justify-content-center align-items-center d-flex flex-column seq-anim" translate="yes">
                <h1 id="blog-main-title" className="display-4 text-uppercase seq-anim">Blog</h1>
                <p id="blog-main-desc" className="seq-anim">I usually interesting topics, such as football, politic, or something random. Enjoy my writings!</p>
                <div className="seq-anim">
                    <div>
                        <Table striped className="blog-table">
                            <thead>
                                <tr>
                                    <th>Date Created</th>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Reading Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(([key, blog]) => {
                                    const { readingTime } = estimateReadingTime(blog.paragraphs);
                                    return (
                                        <tr
                                            key={key}
                                            className="blog-row"
                                        >
                                            <td>{formatBlogDate(blog.datetime)}</td>
                                            <td>
                                                <span
                                                    data-bs-toggle="offcanvas"
                                                    data-bs-target="#demo"
                                                    className="blog-table-title"
                                                    onClick={() => { setSelectedBlog(blog); handleShow() }}
                                                >
                                                    {blog.title}
                                                </span>
                                            </td>
                                            <td>{blog.author}</td>
                                            <td>{readingTime} min</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            {
                shouldRender &&
                <Offcanvas
                    backdrop="static"
                    placement="end"
                    show={show}
                    onHide={handleClose}
                    className={`blog-offcanvas-end ${!show ? "fade-out" : ""}`}
                    id="demo"
                    translate="yes"
                >
                    <Offcanvas.Header className="blog-offcanvas-header">
                        <Offcanvas.Title id="blog-title">{selectedBlog.title}</Offcanvas.Title>
                        <h6 id="blog-meta">
                            By {selectedBlog.author} •{" "}
                            {dayjs(selectedBlog.datetime).format("MMM D YYYY, h:mm A")}
                        </h6>
                        <hr />
                        <span className="close" data-bs-dismiss="offcanvas" onClick={handleClose}>&times;</span>
                    </Offcanvas.Header>
                    <Offcanvas.Body className="blog-offcanvas-body" onScroll={() => window.scrollTo(0, 0)}>
                        <div id="blog-para">
                            {selectedBlog.paragraphs.map((p, i) => (
                                <p key={i}>{p}</p>
                            ))}
                        </div>
                    </Offcanvas.Body>
                </Offcanvas>
            }
        </>
    )
}

export default Blog;