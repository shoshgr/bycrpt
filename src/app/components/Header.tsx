'use client'
import Link from 'next/link';

const Header = () => {
  const links = [
    { href: '/pages/login', label: 'כניסה' },
    { href: '/pages/about', label: 'אודות' },
    { href: '/pages/register', label: 'הרשמה ' },
    { href: '/pages/contact', label: 'צור קשר' },
    
  ];

  return (
    <header className="bg-teal-500">
      <nav className="flex justify-end p-4 space-x-4">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="text-white hover:text-gray-300">
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;
