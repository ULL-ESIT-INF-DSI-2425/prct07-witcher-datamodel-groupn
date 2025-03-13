import { describe, expect, test } from "vitest";
import { streamable, searchByName,searchByYear,info } from "../src/ejercicio-1/streamable";
import { basicStreamableCollection } from "../src/ejercicio-1/basicStreamableCollection";
import { series } from "../src/ejercicio-1/series";
import { peliculas } from "../src/ejercicio-1/peliculas";
import { documentales } from "../src/ejercicio-1/documentales";

let serie1, serie2: info;
serie1 = {name: "nombreSerie1", year: 2020};
serie2 = {name: "nombreSerie2", year:2021};

let coleccionSeries = new series([serie1]);

let pelicula1, pelicula2: info;
pelicula1 = {name: "nombrePelicula1", year: 2020};
pelicula2 = {name: "nombrePelicula2", year:2021};

let coleccionPeliculas = new peliculas([pelicula1]);

let doc1, doc2: info;
doc1 = {name: "nombreDoc1", year: 2020};
doc2 = {name: "nombreDoc2", year:2021};

let coleccionDocumentales = new documentales([doc1]);


//let series = new coleccionSeries()

describe("Tests Ejercicio-1", () => {
    coleccionSeries.add(serie2)
    test("add", () => {
      expect(coleccionSeries.allInfo()).toEqual([serie1, serie2]);
    });

    test("searchByName", () => {
        expect(coleccionSeries.searchByName("nombreSerie1")).toEqual([serie1]);
    });
    test("searchByYear", () => {
        expect(coleccionSeries.searchByYear(2021)).toEqual([serie2]);
    });

    coleccionPeliculas.add(pelicula2)
    test("add", () => {
      expect(coleccionPeliculas.allInfo()).toEqual([pelicula1, pelicula2]);
    });

    test("searchByName", () => {
        expect(coleccionPeliculas.searchByName("nombrePelicula1")).toEqual([pelicula1]);
    });
    test("searchByYear", () => {
        expect(coleccionPeliculas.searchByYear(2021)).toEqual([pelicula2]);
    });

    coleccionDocumentales.add(doc2)
    test("add", () => {
      expect(coleccionDocumentales.allInfo()).toEqual([doc1, doc2]);
    });

    test("searchByName", () => {
        expect(coleccionDocumentales.searchByName("nombreDoc1")).toEqual([doc1]);
    });
    test("searchByYear", () => {
        expect(coleccionDocumentales.searchByYear(2021)).toEqual([doc2]);
    });

  });
