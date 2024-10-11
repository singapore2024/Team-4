import { Link } from "next-view-transitions";
import { usePathname } from 'next/navigation';

const menuItems = ["Orders", "Inventory", "Supplier Request"];

export default function NavBar() {
    const pathname = usePathname();

    const isLinkActive = (href: string) => pathname === href;
    const formatMenuItem = (item: string): string => {
        return item.toLowerCase().replace(/\s+/g, '');
    };

    return (
        <nav className="flex items-center justify-between h-20 bg-black-navbar text-white px-24">
            <div className="flex items-center">
                {menuItems.map((menuItem, index) => {
                    const formattedItem = formatMenuItem(menuItem);
                    return (
                        <div className="ml-8" key={index}>
                            <Link
                                href={`/${formattedItem}`}
                                className={`text-lg relative ${isLinkActive(`/${formattedItem}`) ? 'text-white' : 'text-gray-300'}`}
                            >
                                {menuItem}
                                {isLinkActive(`/${formattedItem}`) && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white"></span>}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </nav>
    )
}