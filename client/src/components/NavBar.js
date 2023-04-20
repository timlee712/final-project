import React from 'react';
import { BiFilm } from 'react-icons/bi';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoPersonCircle } from 'react-icons/io5';
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

export default function NavBar() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = React.useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    navigate(`/search/${searchQuery}`);
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Navbar expand="lg" className="pb-1 skyblue">
      <Navbar.Toggle aria-controls="navbarNav" className="p-1">
        <GiHamburgerMenu className="hamburger-menu text-white" />
      </Navbar.Toggle>
      <Navbar.Brand className="text-white">
        <Link to="/" className="text-white" >
          <BiFilm className="film-icon mx-1 mt-lg-2" />
          <span className="title">WatchIt</span>
        </Link>
      </Navbar.Brand>
      <Nav className="mr-auto">
        <Link to="/login" className="nav-link text-white d-none d-lg-block">Watchlist</Link>
      </Nav>
      <Nav className="ml-auto d-flex flex-row">
        <Form inline className="mr-lg-2 d-flex d-lg-none" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-1 rounded-pill mt-1 search-bar"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={(event) => event.key === 'Enter' && handleSubmit(event)}
          />
        </Form>
        <IoPersonCircle className="person-icon text-white ml-1 d-lg-none" />
      </Nav>
      <Navbar.Collapse id="navbarNav">
        <Nav className="ml-auto d-lg-none">
          <Link to="/login" className="nav-link text-white">Watchlist</Link>
        </Nav>
      </Navbar.Collapse>
      <Nav className="d-none d-lg-flex">
        <Form inline className="mr-lg-2 d-none d-lg-flex" onSubmit={handleSubmit}>
          <FormControl
            type="text"
            placeholder="Search"
            className="mr-2 rounded-pill mt-1 ml-auto search-bar h-75"
            value={searchQuery}
            onChange={handleChange}
            onKeyPress={(event) => event.key === 'Enter' && handleSubmit(event)}
          />
        </Form>
        <IoPersonCircle className="person-icon text-white ml-1 mb-1" />
      </Nav>
    </Navbar>
  );
}
