import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Nav = () => {
  const router = useRouter();
  let pathname;
  useEffect(() => {
    //console.log("cambio pagina");
  }, [router]);

  const rutes = [
    { to: "/", name: "Estadisticas" },
    { to: "/libros-leidos", name: "Libros leidos" },
    { to: "/libros-por-leer", name: "Libros por leer" },
  ];
  return (
    <div className="  bg-primary py-3 px-3 text-white md:text-xl">
      <div>Aplicación - Axel Gonzalez</div>
      <div className="flex flex-wrap gap-5 mt-5">
        {rutes.map((rute, index) => (
          <div key={index}>
            <Link className={`rounded-md px-3 py-2 text-white text-sm uppercase font-bold ${router.pathname === router.to ? "bg-primary/50" : ""} `} href={rute.to}>
              {rute.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Nav;
