import "../css/Contact.css"

function Contact() {
    const contactSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        const form = e.target;
        const formData = new FormData(form);

        fetch("https://formspree.io/f/xqaboogp", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                alert("Your message has been sent!");
                form.reset();
            } else {
                alert("Failed to send. Please try again.");
            }
        }).catch(error => {
            alert("Error occurred. Please check your connection.");
        });
    }

    return (
        <div id="contact-content" className="page-root contents min-vh-100 min-vw-50 justify-content-center align-items-center d-flex flex-column seq-anim" translate="yes">
            <p className="content-p seq-anim">
                Feel free to contact me by filling out a form below!
            </p>
            <div className="seq-anim contact-container">
                <form className="contact-form seq-anim" id="contact-form" onSubmit={contactSubmit}>
                    <div className="form-content seq-anim">
                        <label>Name:</label>
                        <input type="text" name="name" placeholder="Your name" required />
                    </div>
                    <div className="form-content seq-anim">
                        <label>E-mail:</label>
                        <input type="email" name="email" placeholder="email@example.xyz" required />
                    </div>
                    <div className="form-content seq-anim">
                        <label>Messages:</label>
                        <textarea name="message" placeholder="Type your message here" rows="6" required autoComplete="off"></textarea>
                    </div>
                    <button type="submit" className="seq-anim">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Contact;