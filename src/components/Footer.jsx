import React from 'react'
import "../components/footer.css"

const Footer = () => {
    return (
        <>
            <footer>
                <div className="footer">
                    <p> &copy; {new Date().getFullYear()} created by Meshv Patel</p>
                </div>
            </footer>
        </>
    )
}

export default Footer
