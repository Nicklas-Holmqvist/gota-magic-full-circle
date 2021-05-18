import { Link } from 'react-router-dom'
import '../main.css'
import '../css/footer.css'
import Divider from '@material-ui/core/Divider';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import HomeIcon from '@material-ui/icons/Home';
import { useState } from 'react';

function Footer() {
  const [divider, rotateDivider] = useState(false)
  
  const dividerOrientation = () => {
    if (window.innerWidth <= 600) {
      rotateDivider(true)
    } else {
      rotateDivider(false)
    }
  }

  window.addEventListener('resize', dividerOrientation)

  return (
    <footer>
      <div className="flex content">

        <div className="footer-column flex column">
          <h4>Göta Magic</h4>
          <ul>
            <li>
              <Link to='/ProductList' className="li-item">
                Våra Produkter
              </Link>
            </li>
            <li>
              <Link to='/Tournaments' className="li-item">
                Turneringar
              </Link>
            </li>
            <li>
              <Link to='/AboutUs' className="li-item">
                Om Oss
              </Link>
            </li>
          </ul>
        </div>

        <div className="divider-container">
          {divider ? (
            <Divider orientation="horizontal" />
          ) : (
            <Divider orientation="vertical" />
          )}
        </div>

        <div className="footer-column flex column">
          <h4>Produkter</h4>
          <ul>
            <li>
              <Link to='/ProductList' className="li-item">
                Se alla våra produkter här
              </Link>
            </li>
          </ul>
        </div>

        <div className="footer-column flex column">
          <h4>Kontakt</h4>
          <ul>
            <li className="flex alignItemsCenter">
              <a href="mailto:Gotamagic@gmail.com" className="li-item">
                <MailIcon style={{ marginRight: '1rem' }} />
                Maila Oss
              </a>
            </li>
            <li className="flex alignItemsCenter">
              <a href="tel:0737141414" className="li-item">
                <PhoneIcon style={{ marginRight: '1rem' }} />
                Ring Oss
              </a>
            </li>
            <li className="flex alignItemsCenter">
              <HomeIcon style={{ marginRight: '1rem' }} />
              <p className="li-item">Helleforsgatan 10B, 41875 Göteborg</p>
            </li>
          </ul>
        </div>

      </div>
        
        <div className="copyright-section">
          <p>Copyright © | Göta Magic. All rights reserved.</p>
        </div>

    </footer>
  )
}

export default Footer
