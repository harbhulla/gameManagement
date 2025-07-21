import { Outlet, Link } from "react-router-dom";
import myImage from "../images/pika.png";
export default function Layout() {
  return (
    <div>
    <nav className="flex justify-center">
    <Link to ="/"><img src={myImage} className="w-60 h-auto"></img></Link>
    </nav>
    <Outlet />
    </div>

  )}