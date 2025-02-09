import React from "react";
import { NomNomSDK } from "../jsrepo-blocks/blocks";

export function Footer() {
  const sdk = new NomNomSDK("https://nomnom-backend-dbsv.onrender.com/api");
  sdk
    .getCurrentMenus("6c90ed83-a3f4-4836-a22a-40099491b047")
    .then((data) => {
      console.log("SDK", data);
    })
    .catch((error) => {
      console.error("Error fetching menus:", error);
    });
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center space-y-8 md:space-y-0">
        <div className="flex flex-col items-start">
          <img src="/logo.png" alt="Logo" className="w-40 h-auto" />
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-black">Godziny zamówień</h3>
          <p className="text-black">
            Pon-Pt 11:00-22:00
            <br />
            Pt-Sob 11:00-23:00
            <br />
            Nd 11:00-22:00
          </p>
        </div>
        <div className="flex flex-col items-start">
          <h3 className="text-lg font-semibold text-black">
            Nasza lokalizacja
          </h3>
          <p className="text-black">
            Głodny Smok
            <br />
            08-110, Siedlce
            <br />
            ul. Henryka Sienkiewicza 26
            <br />
            tel: +48 793 778 899
            <br />
            bzagalski@wp.p
          </p>
        </div>
      </div>
      <div className="container mx-auto mt-8 border-t pt-4 flex justify-between items-center text-sm text-black">
        <span>Copyright © 2025 Głodny Smok</span>
        <span>Designed by Hubert Kolejko</span>
      </div>
    </footer>
  );
}