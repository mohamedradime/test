import Image from "next/image";
import {
    faArrowUpRightFromSquare,
    faBars,
    faCalendar,
    faFolderOpen,
    faGraduationCap,
    faHome,
    faLaptopCode,
    faNewspaper,
    faUser,
    faUsers,
} from "@fortawesome/free-solid-svg-icons";
import MainBtn from "./MainBtn";
import NavLink, { INavLink } from "./NavLink";
import tokens from "@/app/style.tokens";

const Pages: INavLink[] = [
    { text: "Home", icon: faHome, href: "/" },
    { text: "Learn", icon: faGraduationCap, isSoon: true },
    {
        text: "Programs",
        icon: faBars,
        href: "/programs",
        pages: [
            { text: "Our Programs", icon: faBars, href: "/programs#our-programs", section: true },
            { text: "Available Programs", icon: faArrowUpRightFromSquare, href: "/programs#available-programs", section: true },
            { text: "Events", icon: faCalendar, href: "/programs#events", section: true },
            { text: "Hackathons", icon: faLaptopCode, href: "/programs#hackathons", section: true },
        ],
    },
    { text: "Jobs", icon: faUser, href: "/jobs" },
    { text: "Directory", icon: faFolderOpen, isSoon: true },
    { text: "Blog", icon: faNewspaper, isSoon: true },
    { text: "About", icon: faUsers, href: "/about" },
];

export default function NavBar() {
    return (
        <nav
            style={{
                padding: "0.75rem",
                display: "flex",
                columnGap: "2.5rem",
                backgroundColor: tokens.coloring.dark.self,
            }}
        >
            <div>
                <Image src="/logos/mini-white-adjusted.png" alt="logo" quality={100} width={100} height={(100 / 200) * 109} />
            </div>
            <div
                style={{
                    flexGrow: "1",
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1.5rem",
                }}
            >
                {Pages.map((p) => (
                    <NavLink {...p} />
                ))}
            </div>
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <MainBtn variant="contained" size="medium">
                    Get Your Mentorship
                </MainBtn>
            </div>
        </nav>
    );
}
