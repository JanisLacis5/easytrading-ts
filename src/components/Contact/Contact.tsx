import "./contact.css"
import ContactForm from "./contactForm"

const Contact = () => {
    return (
        <section className="contact">
            <h1>Contact</h1>
            <div className="contact-main">
                <ContactForm />
                <div className="contact-other">
                    <h2>You can also: </h2>
                    <div>
                        <ul>
                            <li>
                                <h3>Send us an email</h3>
                                <a href="mailto: jaislacis06@gmail.com">
                                    Send Email
                                </a>
                            </li>
                            <li>
                                <h3>Call</h3>
                                <a href="tel:26418946">+371 26418946</a>
                            </li>
                            <li>
                                <h3>
                                    Send a direct message on all social media
                                </h3>
                                <p>@easytrading.co</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default Contact
