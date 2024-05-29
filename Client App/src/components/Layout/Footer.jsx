function Footer() {
  return (
    <>
      <footer className="container bg-black pt-4">
        <ul className="mx-auto mt-8 grid w-4/5 grid-cols-3 pb-7 italic text-slate-100">
          <li>
            <div className="mb-4">CUSTOMER SERVICES</div>
            <ul>
              <li>Help & Contact Us</li>
              <li>Returns & Refunds</li>
              <li>Online Stores</li>
              <li>Terms & Conditions</li>
            </ul>
          </li>
          <li>
            <div className="mb-4">COMPANY</div>
            <ul>
              <li>What We Do</li>
              <li>Available Services</li>
              <li>Latest Posts</li>
              <li>FAQs</li>
            </ul>
          </li>
          <li>
            <div className="mb-4">SOCIAL MEDIA</div>
            <ul>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Pinterest</li>
            </ul>
          </li>
        </ul>
      </footer>
    </>
  );
}

export default Footer;
